package com.visualbusiness.pano.news.impl;

import com.alibaba.fastjson.JSONObject;
import com.google.gson.Gson;
import com.visualbusiness.common.config.SystemConfig;
import com.visualbusiness.common.model.SearchResult;
import com.visualbusiness.common.rest.RestException;
import com.visualbusiness.common.rest.RestRequest;
import com.visualbusiness.common.rest.RestResult;
import com.visualbusiness.common.util.DateUtil;
import com.visualbusiness.pano.news.dao.OperationRecordDao;
import com.visualbusiness.pano.process.model.ProjectInfo;
import com.visualbusiness.pano.process.service.ProjectInfoService;
import com.visualbusiness.pano.news.dao.PanoNewsDao;
import com.visualbusiness.pano.news.dao.PanoWithGroupInfoDao;
import com.visualbusiness.pano.news.model.*;
import com.visualbusiness.pano.news.model.NewsSearchResult.LangInfo;
import com.visualbusiness.pano.news.service.AlbumLangService;
import com.visualbusiness.pano.news.service.NewsService;
import com.visualbusiness.pano.news.service.PanoService;
import com.visualbusiness.pano.news.util.SortBuilderUtil;
import org.apache.commons.lang.StringUtils;
import org.apache.http.client.methods.HttpPut;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.elasticsearch.action.admin.indices.delete.DeleteIndexResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchRequestBuilder;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.search.SearchType;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.QueryStringQueryBuilder.Operator;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.sort.SortBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service("newsService")
public class NewsServiceImpl implements NewsService {
	private static Logger logger = LogManager.getLogger(NewsServiceImpl.class);

	public static final String EC_INDEX_NAME = "news";
	public static final String EC_TYPE_NAME = "news";

	public static final int MODEL_TYPE_NEWS = 0;
	
	@Autowired
	private PanoWithGroupInfoDao panoWithGroupInfoDao;
	
	@Autowired
	private PanoNewsDao panoNewsDao;
	
	@Autowired
	private PanoService panoService;

	@Autowired
	private OperationRecordDao operationRecordDao;
	
	@Autowired
	private AlbumLangService albumLangService;
	
	@Autowired
	private ProjectInfoService projectInfoService;
	
	@Autowired
	private TransportClient client;
	
	private Gson gson = new Gson();

	@Override
	public Album<PanoWithThumbnails> findByPanoIdWithFullInfo(String panoId) {
		PanoWithGroupInfo panoWithGroupInfo = panoWithGroupInfoDao.findOne(panoId);
		if (panoWithGroupInfo == null) {
			return null;
		}
		
		List<PanoWithGroupInfo> panoWithGroupInfoList = panoWithGroupInfoDao.findByParentGroupName(panoWithGroupInfo.getParentGroupName());
		if (panoWithGroupInfoList.isEmpty()) {
			return null;
		}
		
		String albumInfo = "";
		ProjectInfo projectInfo = projectInfoService.findByProjectName(panoWithGroupInfo.getParentGroupName());
		if (projectInfo != null) {
			albumInfo = projectInfo.getProjectInfo();
		}
		
		Album<PanoWithThumbnails> album = convertToAlbum(panoWithGroupInfoList, albumInfo);
		return album;
		
	}
	

	@Override
	public List<Pano> getPanos(List<String> albumIds) {
		Map<String, Pano> panoMap = new LinkedHashMap<String, Pano>();

		Iterable<PanoAlbum> albums = this.panoNewsDao.findAll(albumIds);
		for (PanoAlbum panoAlbum : albums) {
			Album<Pano> album = panoAlbum.parseAlbum();
			List<Pano> panos= album.extractPanos();
			for (Pano pano : panos) {
				if(!panoMap.containsKey(pano.getPanoId())) {
					panoMap.put(pano.getPanoId(), pano);
				}
			}
		}
		
		List<Pano> result = new ArrayList<Pano>();
		result.addAll(panoMap.values());
		
		return result;
	}

	private Album<PanoWithThumbnails> convertToAlbum(List<PanoWithGroupInfo> panoWithGroupInfoList, String albumInfo) {
		Album<PanoWithThumbnails> album = new Album<PanoWithThumbnails>();
		
		for (PanoWithGroupInfo panoWithGroupInfo : panoWithGroupInfoList) {
			album.setAlbumName(panoWithGroupInfo.getParentGroupName());
			album.setAlbumInfo(albumInfo);
			
			String groupName = panoWithGroupInfo.getGroupName();
			if (groupName == null) {
				continue;
			}
			
			Album<PanoWithThumbnails> subAlbum = null;
			for (Album<PanoWithThumbnails> existAlbum : album.getAlbumList()) {
				if (groupName.equals(existAlbum.getAlbumName())) {
					subAlbum = existAlbum;
					break;
				}
			}
			if (subAlbum == null) {
				subAlbum = new Album<PanoWithThumbnails>();
				subAlbum.setAlbumName(groupName);
				subAlbum.setAlbumInfo("");//TODO
				album.getAlbumList().add(subAlbum);
			}
			
			PanoWithThumbnails pano = panoService.convertToPanoWithThumbnails(panoWithGroupInfo);
			subAlbum.getPanoList().add(pano);
		}
		
		return album;
	}
	
	@Override
	public PanoAlbum get(String albumId) {
		return panoNewsDao.findOne(albumId);
	}

	public PanoAlbum findByAlbumIdAndNewsStatus(String albumId, Integer newsStatus) {
		return panoNewsDao.findByAlbumIdAndNewsStatus(albumId, newsStatus);
	}
	
	@Override
	public List<PanoAlbum> findByAlbumIds(List<String> albumIds) {
		return panoNewsDao.findByAlbumIdIn(albumIds);
	}
	
	@Transactional
	@Override
	public PanoAlbum saveOrUpdate(PanoAlbum panoAlbum) {
		//检查相册名称是否重复
//		String albumId = panoAlbum.getAlbumId();
//		String vendor = panoAlbum.getVendor();
//		String albumName = panoAlbum.parseAlbum().getAlbumName();
//
//		List<NewsSearchResult> searchResult = this.searchByAlbumNameVendor(albumName, vendor).getResult();
//		for (NewsSearchResult newsSearchResult : searchResult) {
//			if (!albumId.equals(newsSearchResult.getAlbumId())) {
//				throw new RuntimeException("相册名称重复");
//			}
//		}

		//保存相册
		PanoAlbum updatedPanoAlbum = panoNewsDao.save(panoAlbum);
		OperationRecord operationRecord = new OperationRecord(panoAlbum.getAlbumId(), MODEL_TYPE_NEWS,
				null, panoAlbum.getNewsStatus(), panoAlbum.getAlbumContent(), panoAlbum.getUpdateUser());
		operationRecordDao.save(operationRecord);

		return updatedPanoAlbum;
	}


	@Transactional
	@Override
	public void updatePanoMetasByAlbum(PanoAlbum panoAlbum) {
		Album<Pano> album = panoAlbum.parseAlbum();
		
		List<Pano> panos = album.extractPanos();
		
		try {
			String url = SystemConfig.getProcessServerUrl() + "rest/pano/meta/batchUpdate";
			RestRequest restRequest = new RestRequest(new HttpPut(), url);
			restRequest.addHeader("Content-Type", "application/json");
			restRequest.setEntity(panos);

			logger.info("使用相册信息更新基础数据开始");

			RestResult result = restRequest.request();
			if (result.getResult() != 0) {
				throw new RuntimeException("全景图元数据更新时发生错。result=" + result.getResult() + ", msg = " + result.getMsg());
			}
			
			logger.info("使用相册信息更新基础数据结束");
			
			for (Pano pano : panos) {
				panoService.recreateSearchIndex(pano.getPanoId());
			}
			logger.info("更新全景图检索索引结束");
		} catch (RestException e) {
			logger.error(e);
			throw new RuntimeException(e);
		}

	}

	@Transactional
	@Override
	public void delete(String albumId) {
		panoNewsDao.delete(albumId);
		albumLangService.deleteByAlbumId(albumId);
	}
	
	@Transactional
	@Override
    public PanoAlbum copy(String albumId, String albumName, String createUser) {
		PanoAlbum panoAlbumToCopy = get(albumId);
		
		Album<Pano> album = panoAlbumToCopy.parseAlbum();
		album.setAlbumName(albumName);
		String albumContent = gson.toJson(album);
		
		String targetAlbumId = UUID.randomUUID().toString().replaceAll("-", "").toUpperCase();

		PanoAlbum panoAlbum = new PanoAlbum();
		panoAlbum.setAlbumId(targetAlbumId);
		panoAlbum.setAlbumContent(albumContent);
		panoAlbum.setCreateUser(createUser);
		
		panoAlbum = saveOrUpdate(panoAlbum);
		return panoAlbum;
    }
	
	@Override
	public Album<Pano> fillIncludedAlbum(Album<Pano> album) {
		List<String> albumIncludedIds = album.extractAlbumIncludedIds();
		if (albumIncludedIds.isEmpty()) {
			return album;
		}
		
		List<PanoAlbum> includeAlbums = findByAlbumIds(albumIncludedIds);
		Map<String, Album<Pano>> includeAlbumMap = new HashMap<String, Album<Pano>>();
		for (PanoAlbum includeAlbum : includeAlbums) {
			includeAlbumMap.put(includeAlbum.getAlbumId(), includeAlbum.parseAlbum());
		}
		
		album.replaceIncludeAlbum(includeAlbumMap);
		
		return album;
	}
	
	@Override
	public boolean recreateSearchIndex() {
		logger.warn("通过DB数据重建album搜索索引");
		
		this.deleteSearchIndex();
		this.createSearchIndex();
		this.indexByDBData();
		
		return true;
	}
	
	private boolean deleteSearchIndex() {
		try {
			logger.info("删除album搜索索引");
			DeleteIndexResponse response = client.admin().indices().prepareDelete(EC_INDEX_NAME).get();
			logger.info("删除album搜索索引成功");
			return true;
		} catch (Exception e) {
			logger.error(e);
			return false;
		}
	}
	
	private boolean indexByDBData() {
		Iterable<PanoAlbum> panoAlbums =  panoNewsDao.findAll();
		
		logger.info("通过DB数据生成album搜索索引");
		for (PanoAlbum panoAlbum : panoAlbums) {
			recreateSearchIndex(panoAlbum);
		}
		
		return true;
	}
	
	public boolean recreateSearchIndex(PanoAlbum panoAlbum) {
		Album<Pano> album = null;

		Map<String, Object> source = new HashMap<>();

		if (panoAlbum != null) {
			try {
				album = panoAlbum.parseAlbum();
			} catch (Exception e) {
				logger.error("相册内容解析失败:" + panoAlbum.getAlbumId() + "," + e.getMessage());
				album = null;
			}

			if (album != null) {
				source.put("albumId", panoAlbum.getAlbumId());
				source.put("albumName", album.getAlbumName());
				source.put("type", panoAlbum.getType());
				source.put("vendor", panoAlbum.getVendor());
				source.put("createTime", panoAlbum.getCreateTimeMillis());
				source.put("updateTime", panoAlbum.getUpdateTimeMillis());
				source.put("createUser", panoAlbum.getCreateUser());
				source.put("updateUser", panoAlbum.getUpdateUser());
				source.put("albumInfo", album.getAlbumInfo());
				source.put("albumDetail", album.getAlbumDetail());
				source.put("thumbnailUrl", album.extractThumbnailUrl());
				String albumThumb = album.getAlbumThumb();
				if(StringUtils.isBlank(albumThumb)) {
					albumThumb = album.extractThumbnailUrl();
				}
				source.put("albumThumb", albumThumb);
				source.put("albumNames", album.extractAlbumNames());
				source.put("albumInfos", album.extractAlbumInfos());
				source.put("albumDetails", album.extractAlbumDetails());
				source.put("panoIds", album.extractPanoIds());
				source.put("albumIncludedIds", album.extractAlbumIncludedIds());
				source.put("panoNames", album.extractPanoNames());
				source.put("newsStatus", panoAlbum.getNewsStatus());
			}

		} else {
			logger.warn("未找到相册数据" + panoAlbum.getAlbumId());
		}

		client.prepareDelete(EC_INDEX_NAME, EC_TYPE_NAME, panoAlbum.getAlbumId()).get();

		if (panoAlbum == null || album == null) {
			return false;
		}

		IndexResponse response = client.prepareIndex(EC_INDEX_NAME, EC_TYPE_NAME, panoAlbum.getAlbumId()).setSource(source).get();
		client.admin().indices().prepareRefresh(EC_INDEX_NAME).get();

		return true;
	}

	@Override
	public boolean recreateSearchIndex(String albumId) {
		logger.debug("生成" + albumId + "的搜索索引");

		PanoAlbum panoAlbum = panoNewsDao.findOne(albumId);
		return recreateSearchIndex(panoAlbum);

	}
	
	@Override
	public boolean deleteSearchIndex(String newsId) {
		logger.debug("删除" + newsId + "的搜索索引");

		client.prepareDelete(EC_INDEX_NAME, EC_TYPE_NAME, newsId).get();
		client.admin().indices().prepareRefresh(EC_INDEX_NAME).get();

		return true;
	}

	@Override
	public SearchResult<List<NewsSearchResult>> search(JSONObject jsonObject) {
		String q = jsonObject.getString("q");
		String vendor = jsonObject.getString("vendor");
		String esType = jsonObject.getString("esType");
		Integer newsStatus = jsonObject.getInteger("newsStatus");

		Integer from = jsonObject.getInteger("from");
		Integer size = jsonObject.getInteger("size");
		Long fromTime = jsonObject.getLong("fromTime");
		Long toTime = jsonObject.getLong("toTime");


		BoolQueryBuilder qb = QueryBuilders.boolQuery();
		if (StringUtils.isBlank(q)) {
			qb.must(QueryBuilders.matchAllQuery());
		} else {
			q = QueryParser.escape(q);
			qb.must(QueryBuilders.queryStringQuery(q).defaultOperator(Operator.AND));
			qb.should(QueryBuilders.matchQuery("albumName", q).boost(10.0f));
		}

		if (!StringUtils.isBlank(vendor)) {
			qb.must(QueryBuilders.termQuery("vendor", vendor));
		}

		if (newsStatus != null) {
			qb.must(QueryBuilders.termQuery("newsStatus", newsStatus));
		}


		SearchRequestBuilder srb = client.prepareSearch(EC_INDEX_NAME).setSearchType(SearchType.DFS_QUERY_THEN_FETCH).setQuery(qb).setFrom(from).setSize(size);
		if(!StringUtils.isBlank(esType)) {
			srb.setTypes(esType);
		}
		if(fromTime != null || toTime != null) {
			srb.setPostFilter(QueryBuilders.rangeQuery("createTime").from(fromTime).to(toTime));
		}
		String sort = jsonObject.getString("sort");
		if(!StringUtils.isBlank(sort)) {
			List<SortBuilder> sortBuilders = SortBuilderUtil.getSortBuilders(Arrays.asList(sort));
			for (SortBuilder sortBuilder : sortBuilders) {
				srb.addSort(sortBuilder);
			}
		}

		SearchResponse response = srb.execute().actionGet();

		long total = response.getHits().getTotalHits();
		SearchHit[] hits = response.getHits().getHits();

		List<NewsSearchResult> newsSearchResults = new ArrayList<NewsSearchResult>();
		for (int i = 0; i < hits.length; i++) {
			Map<String, Object> source = hits[i].getSource();
			NewsSearchResult newsSearchResult = convertToAlbumSearchResult(source);
			newsSearchResults.add(newsSearchResult);
		}

		// 设置多语言版本信息
		List<String> albumIds = new ArrayList<String>();
		Map<String, NewsSearchResult> albumSearchResultMap = new HashMap<String, NewsSearchResult>();
		for (NewsSearchResult newsSearchResult : newsSearchResults) {
			albumIds.add(newsSearchResult.getAlbumId());
			albumSearchResultMap.put(newsSearchResult.getAlbumId(), newsSearchResult);
		}

		List<PanoAlbumLang> panoAlbumLangs = albumLangService.findByAlbumIds(albumIds);
		for (PanoAlbumLang panoAlbumLang : panoAlbumLangs) {
			LangInfo langInfo = new LangInfo();
			langInfo.setLang(panoAlbumLang.getLang());
			langInfo.setCreateDate(DateUtil.convertTimeToDateTime(panoAlbumLang.getCreateTimeMillis()));
			langInfo.setUpdateDate(DateUtil.convertTimeToDateTime(panoAlbumLang.getUpdateTimeMillis()));
			albumSearchResultMap.get(panoAlbumLang.getAlbumId()).getLangs().add(langInfo);
		}

		SearchResult<List<NewsSearchResult>> result = new SearchResult<List<NewsSearchResult>>(newsSearchResults, total);
		return result;
	}
	
	@Override
	public SearchResult<List<NewsSearchResult>> search(String q, int from, int size) {
		return search(q, null, null, from, size, null);
	}
	
	@Override
	public SearchResult<List<NewsSearchResult>> search(String q, String vendor, String type, int from, int size, List<String> sortList) {
		return search(q, vendor, type, null, from, size, sortList);

	}

	public SearchResult<List<NewsSearchResult>> search(String q, String vendor, String type, Integer newsStatus, int from, int size, List<String> sortList) {
		BoolQueryBuilder qb = QueryBuilders.boolQuery();
		if (StringUtils.isBlank(q)) {
			qb.must(QueryBuilders.matchAllQuery());
		} else {
			q = QueryParser.escape(q);
			qb.must(QueryBuilders.queryStringQuery(q).defaultOperator(Operator.AND));
			qb.should(QueryBuilders.matchQuery("albumName", q).boost(10.0f));
		}

		if (!StringUtils.isBlank(vendor)) {
			qb.must(QueryBuilders.termQuery("vendor", vendor));
		}

		if (!StringUtils.isBlank(type)) {
			qb.must(QueryBuilders.termQuery("type", type));
		}
		if (newsStatus != null) {
			qb.must(QueryBuilders.termQuery("newsStatus", newsStatus));
		}


		SearchRequestBuilder srb = client.prepareSearch(EC_INDEX_NAME).setTypes(EC_TYPE_NAME).setSearchType(SearchType.DFS_QUERY_THEN_FETCH).setQuery(qb).setFrom(from).setSize(size);
		List<SortBuilder> sortBuilders = SortBuilderUtil.getSortBuilders(sortList);
		for (SortBuilder sortBuilder : sortBuilders) {
			srb.addSort(sortBuilder);
		}

		SearchResponse response = srb.execute().actionGet();

		long total = response.getHits().getTotalHits();
		SearchHit[] hits = response.getHits().getHits();

		List<NewsSearchResult> newsSearchResults = new ArrayList<NewsSearchResult>();
		for (int i = 0; i < hits.length; i++) {
			Map<String, Object> source = hits[i].getSource();
			NewsSearchResult newsSearchResult = convertToAlbumSearchResult(source);
			newsSearchResults.add(newsSearchResult);
		}

		// 设置多语言版本信息
		List<String> albumIds = new ArrayList<String>();
		Map<String, NewsSearchResult> albumSearchResultMap = new HashMap<String, NewsSearchResult>();
		for (NewsSearchResult newsSearchResult : newsSearchResults) {
			albumIds.add(newsSearchResult.getAlbumId());
			albumSearchResultMap.put(newsSearchResult.getAlbumId(), newsSearchResult);
		}

		List<PanoAlbumLang> panoAlbumLangs = albumLangService.findByAlbumIds(albumIds);
		for (PanoAlbumLang panoAlbumLang : panoAlbumLangs) {
			LangInfo langInfo = new LangInfo();
			langInfo.setLang(panoAlbumLang.getLang());
			langInfo.setCreateDate(DateUtil.convertTimeToDateTime(panoAlbumLang.getCreateTimeMillis()));
			langInfo.setUpdateDate(DateUtil.convertTimeToDateTime(panoAlbumLang.getUpdateTimeMillis()));
			albumSearchResultMap.get(panoAlbumLang.getAlbumId()).getLangs().add(langInfo);
		}

		SearchResult<List<NewsSearchResult>> result = new SearchResult<List<NewsSearchResult>>(newsSearchResults, total);
		return result;
	}

	@Override
	public SearchResult<List<NewsSearchResult>> searchByAlbumNameVendor(String albumName, String vendor) {
		BoolQueryBuilder qb = QueryBuilders.boolQuery();
		qb.must(QueryBuilders.termQuery("albumName.verbatim", albumName));
		if (vendor == null) {
			qb.mustNot(QueryBuilders.existsQuery("vendor"));
		} else {
			qb.must(QueryBuilders.termQuery("vendor", vendor));
		}
		
		SearchRequestBuilder srb = client.prepareSearch(EC_INDEX_NAME).setTypes(EC_TYPE_NAME).setSearchType(SearchType.DFS_QUERY_THEN_FETCH).setQuery(qb);

		SearchResponse response = srb.execute().actionGet();
		
		long total = response.getHits().getTotalHits();
		SearchHit[] hits = response.getHits().getHits();

		List<NewsSearchResult> newsSearchResults = new ArrayList<NewsSearchResult>();
		for (int i = 0; i < hits.length; i++) {
			Map<String, Object> source = hits[i].getSource();
			NewsSearchResult newsSearchResult = convertToAlbumSearchResult(source);
			newsSearchResults.add(newsSearchResult);
		}
		
		SearchResult<List<NewsSearchResult>> result = new SearchResult<List<NewsSearchResult>>(newsSearchResults, total);
		return result;
	}
	
	private NewsSearchResult convertToAlbumSearchResult(Map<String, Object> source) {
		NewsSearchResult newsSearchResult = new NewsSearchResult();
		
		newsSearchResult.setAlbumId((String)source.get("albumId"));
		newsSearchResult.setAlbumName((String)source.get("albumName"));
		newsSearchResult.setAlbumInfo((String)source.get("albumInfo"));
		newsSearchResult.setAlbumDetail((String)source.get("albumDetail"));
		newsSearchResult.setThumbnailUrl((String)source.get("thumbnailUrl"));
		newsSearchResult.setAlbumThumb((String) source.get("albumThumb"));
		newsSearchResult.setCreateDate(DateUtil.convertTimeToDateTime(source.get("createTime").toString()));
		newsSearchResult.setUpdateDate(DateUtil.convertTimeToDateTime(source.get("updateTime").toString()));
		newsSearchResult.setCreateUser((String)source.get("createUser"));
		newsSearchResult.setUpdateUser((String)source.get("updateUser"));
		newsSearchResult.setNewsStatus((Integer) source.get("newsStatus"));
		
		return newsSearchResult;
	}

	private void createSearchIndex() {
		String mapping = "{\"news\" : {\n" +
				"\"properties\" : {\n" +
				"  \"albumId\" : {\n" +
				"    \"type\" : \"string\"\n" +
				"  },\n" +
				"  \"albumName\" : {\n" +
				"    \"type\" : \"string\",\n" +
				"    \"analyzer\" : \"ik_smart\",\n" +
				"    \"fields\": {\n" +
				"      \"verbatim\": {\n" +
				"        \"type\": \"string\",\n" +
				"        \"index\": \"not_analyzed\"\n" +
				"      }\n" +
				"    }\n" +
				"  },\n" +
				"  \"type\" : {\n" +
				"    \"type\" : \"string\",\n" +
				"    \"index\": \"not_analyzed\"\n" +
				"  },\n" +
				"  \"vendor\" : {\n" +
				"    \"type\" : \"string\",\n" +
				"    \"index\": \"not_analyzed\"\n" +
				"  },\n" +
				"  \"newsStatus\" : {\n" +
				"    \"type\" : \"integer\"\n" +
				"  },\n" +
				"  \"createTime\" : {\n" +
				"    \"type\" : \"date\",\n" +
				"    \"format\" : \"epoch_millis\"\n" +
				"  },\n" +
				"  \"updateTime\" : {\n" +
				"    \"type\" : \"date\",\n" +
				"    \"format\" : \"epoch_millis\"\n" +
				"  },\n" +
				"  \"createUser\" : {\n" +
				"    \"type\" : \"string\",\n" +
				"    \"index\": \"not_analyzed\"\n" +
				"  },\n" +
				"  \"updateUser\" : {\n" +
				"    \"type\" : \"string\",\n" +
				"    \"index\": \"not_analyzed\"\n" +
				"  },\n" +
				"  \"albumInfo\" : {\n" +
				"    \"type\" : \"string\",\n" +
				"    \"analyzer\" : \"ik_smart\"\n" +
				"  },\n" +
				"  \"albumDetail\" : {\n" +
				"    \"type\" : \"string\",\n" +
				"    \"analyzer\" : \"ik_smart\"\n" +
				"  },\n" +
				"  \"thumbnailUrl\" : {\n" +
				"    \"type\" : \"string\"\n" +
				"  },\n" +
				"  \"albumThumb\" : {\n" +
				"    \"type\" : \"string\"\n" +
				"  },\n" +
				"  \"albumNames\" : {\n" +
				"    \"type\" : \"string\",\n" +
				"    \"analyzer\" : \"ik_smart\"\n" +
				"  },\n" +
				"  \"albumInfos\" : {\n" +
				"    \"type\" : \"string\",\n" +
				"    \"analyzer\" : \"ik_smart\"\n" +
				"  },\n" +
				"  \"albumDetails\" : {\n" +
				"    \"type\" : \"string\",\n" +
				"    \"analyzer\" : \"ik_smart\"\n" +
				"  },\n" +
				"  \"panoIds\" : {\n" +
				"    \"type\" : \"string\"\n" +
				"  },\n" +
				"  \"albumIncludedIds\" : {\n" +
				"    \"type\" : \"string\"\n" +
				"  },\n" +
				"  \"panoNames\" : {\n" +
				"    \"type\" : \"string\",\n" +
				"    \"analyzer\" : \"ik_smart\"\n" +
				"  }\n" +
				"}\n"+
				"}\n"+
				"}\n";
		client.admin().indices().prepareCreate(EC_INDEX_NAME).addMapping(EC_INDEX_NAME, mapping).get();

	}
}
