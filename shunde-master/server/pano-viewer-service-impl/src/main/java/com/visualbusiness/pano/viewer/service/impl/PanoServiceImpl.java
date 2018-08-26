package com.visualbusiness.pano.viewer.service.impl;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.elasticsearch.action.admin.indices.delete.DeleteIndexResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchRequestBuilder;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.search.SearchType;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.geo.GeoPoint;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.QueryStringQueryBuilder.Operator;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.sort.SortBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.visualbusiness.common.config.SystemConfig;
import com.visualbusiness.common.model.SearchResult;
import com.visualbusiness.common.util.DateUtil;
import com.visualbusiness.common.util.NumberUtil;
import com.visualbusiness.pano.process.model.PanoImage;
import com.visualbusiness.pano.process.model.PanoMeta;
import com.visualbusiness.pano.process.service.PanoImageService;
import com.visualbusiness.pano.process.service.PanoMetaService;
import com.visualbusiness.pano.viewer.dao.PanoWithGroupInfoDao;
import com.visualbusiness.pano.viewer.model.PanoWithGroupInfo;
import com.visualbusiness.pano.viewer.model.PanoWithProject;
import com.visualbusiness.pano.viewer.model.PanoWithThumbnails;
import com.visualbusiness.pano.viewer.service.PanoService;
import com.visualbusiness.pano.viewer.util.SortBuilderUtil;

@Service("panoService")
public class PanoServiceImpl implements PanoService {
	private static Logger logger = LogManager.getLogger(PanoServiceImpl.class);
	
	public static final String EC_INDEX_NAME = "pano";
	public static final String EC_TYPE_NAME = "pano";
	
	@Autowired
	private PanoImageService panoImageService;
	
	@Autowired
	private PanoMetaService panoMetaService;

	@Autowired
	private PanoWithGroupInfoDao panoWithGroupInfoDao;
	
	@Autowired
	private TransportClient client;
	
	private Gson gson = new Gson();

	@Override
	public PanoWithThumbnails findByPanoId(String panoId) {
		PanoWithGroupInfo panoWithGroupInfo = panoWithGroupInfoDao.findOne(panoId);
		if (panoWithGroupInfo == null) {
			return null;
		}
		
		PanoWithThumbnails pano = convertToPanoWithThumbnails(panoWithGroupInfo);
		return pano;
		
	}

	@Override
	public PanoWithThumbnails convertToPanoWithThumbnails(String panoId, Map<String, String> metaMap) {
		PanoWithThumbnails pano = new PanoWithThumbnails();
		pano.setPanoId(panoId);
		pano.setPanoName(metaMap.get("panoName"));
		pano.setPanoInfo(metaMap.get("panoInfo"));
		pano.setCaptureDate(DateUtil.convertTimeToDate(metaMap.get("captureTime")));
		pano.setLat(NumberUtil.parseDouble(metaMap.get("lat")));
		pano.setLng(NumberUtil.parseDouble(metaMap.get("lng")));
		pano.setPanoHeading(NumberUtil.parseDouble(metaMap.get("heading")));
		pano.setPanoPitch(NumberUtil.parseDouble(metaMap.get("pitch")));
		pano.setDayNight(metaMap.get("dayNight"));
		pano.setSeason(metaMap.get("season"));
		pano.setViewAngle(metaMap.get("viewAngle"));
		pano.setThumbnailUrl(SystemConfig.getCosTilesUrl() + panoId + "/flat/thumb1.jpg");
		pano.setFlatThumbnail1_720Url(SystemConfig.getCosTilesUrl() + panoId + "/flat/thumb1_720.jpg");
		pano.setFlatThumbnail12_360Url(SystemConfig.getCosTilesUrl() + panoId + "/flat/thumb12_360.jpg");

		return pano;
	}
	
	@Override
	public PanoWithThumbnails convertToPanoWithThumbnails(PanoWithGroupInfo panoWithGroupInfo) {
		PanoWithThumbnails pano = new PanoWithThumbnails();
		String panoId = panoWithGroupInfo.getPanoId();
		pano.setPanoId(panoId);
		pano.setPanoName(panoWithGroupInfo.getPanoName());
		pano.setPanoInfo(panoWithGroupInfo.getPanoInfo());
		pano.setCaptureDate(DateUtil.convertTimeToDate(panoWithGroupInfo.getCaptureTime()));
		pano.setLat(NumberUtil.parseDouble(panoWithGroupInfo.getLat()));
		pano.setLng(NumberUtil.parseDouble(panoWithGroupInfo.getLng()));
		pano.setPanoHeading(NumberUtil.parseDouble(panoWithGroupInfo.getHeading()));
		pano.setPanoPitch(NumberUtil.parseDouble(panoWithGroupInfo.getPitch()));
		pano.setDayNight(panoWithGroupInfo.getDayNight());
		pano.setSeason(panoWithGroupInfo.getSeason());
		pano.setViewAngle(panoWithGroupInfo.getViewAngle());
		pano.setThumbnailUrl(SystemConfig.getCosTilesUrl() + panoId + "/flat/thumb1.jpg");
		pano.setFlatThumbnail1_720Url(SystemConfig.getCosTilesUrl() + panoId + "/flat/thumb1_720.jpg");
		pano.setFlatThumbnail12_360Url(SystemConfig.getCosTilesUrl() + panoId + "/flat/thumb12_360.jpg");

		return pano;
	}
	
	@Override
	public boolean recreateSearchIndex() {
		logger.warn("通过DB数据重建pano搜索索引");
		
		this.deleteSearchIndex();
		this.createSearchIndex();
		this.indexByDBData();
		
		return true;
	}
	
	private boolean deleteSearchIndex() {
		try {
			logger.info("删除pano搜索索引");
			DeleteIndexResponse response = client.admin().indices().prepareDelete(EC_INDEX_NAME).get();
			client.admin().indices().prepareRefresh(EC_INDEX_NAME).get();
			logger.info("删除pano搜索索引成功");
			return true;
		} catch (Exception e) {
			logger.error(e);
			return false;
		}
	}
	
	private boolean indexByDBData() {
		Iterable<PanoImage> panoImages =  panoImageService.findAll();
		
		logger.info("通过DB数据生成pano搜索索引");
		for (PanoImage panoImage : panoImages) {
			recreateSearchIndex(panoImage);
		}
		
		return true;
	}
	
	private boolean recreateSearchIndex(PanoImage panoImage) {
		String panoId = panoImage.getPanoId();
		return recreateSearchIndex(panoId);
	}

	@Override
	public boolean recreateSearchIndex(String panoId) {
		logger.debug("生成" + panoId + "的搜索索引");

		List<PanoMeta> panoMetas = panoMetaService.findByPanoId(panoId);
		
		double lng = 0;
		double lat = 0;
		Map<String, Object> source = new HashMap<String, Object>();
		for (PanoMeta panoMeta : panoMetas) {
			if ("lng".equals(panoMeta.getMetaName())) {
				lng = NumberUtil.parseDouble(panoMeta.getMetaValue(), 0);
			} else if ("lat".equals(panoMeta.getMetaName())) {
				lat = NumberUtil.parseDouble(panoMeta.getMetaValue(), 0);
			} else {
				source.put(panoMeta.getMetaName(), panoMeta.getMetaValue());
			}
		}
		source.put("geo", lat + "," + lng);
		source.put("panoId", panoId);
		
		client.prepareDelete(EC_INDEX_NAME, EC_TYPE_NAME, panoId).get();

		if (panoMetas.isEmpty()) {
			logger.warn("未找到元数据" + panoId);
			return false;
		}

		IndexResponse response = client.prepareIndex(EC_INDEX_NAME, EC_TYPE_NAME, panoId).setSource(source).get();
		client.admin().indices().prepareRefresh(EC_INDEX_NAME).get();

		return true;
	}
	
	private void createSearchIndex() {
		String mapping = "{\"pano\" : {\n" +
				"\"properties\" : {\n" +
				"  \"panoId\" : {\n" +
				"    \"type\" : \"string\"\n" +
				"  },\n" +
				"  \"barometric\" : {\n" +
				"    \"type\" : \"double\"\n" +
				"  },\n" +
				"  \"cameraNumber\" : {\n" +
				"    \"type\" : \"double\"\n" +
				"  },\n" +
				"  \"captureTime\" : {\n" +
				"    \"type\" : \"date\",\n" +
				"    \"format\" : \"epoch_millis\"\n" +
				"  },\n" +
				"  \"city\" : {\n" +
				"    \"type\" : \"string\",\n" +
				"    \"analyzer\" : \"ik_smart\"\n" +
				"  },\n" +
				"  \"compass\" : {\n" +
				"    \"type\" : \"double\"\n" +
				"  },\n" +
				"  \"county\" : {\n" +
				"    \"type\" : \"string\",\n" +
				"    \"analyzer\" : \"ik_smart\"\n" +
				"  },\n" +
				"  \"deviceId\" : {\n" +
				"    \"type\" : \"string\"\n" +
				"  },\n" +
				"  \"deviceModel\" : {\n" +
				"    \"type\" : \"string\"\n" +
				"  },\n" +
				"  \"dir\" : {\n" +
				"    \"type\" : \"double\"\n" +
				"  },\n" +
				"  \"groupId\" : {\n" +
				"    \"type\" : \"string\"\n" +
				"  },\n" +
				"  \"groupName\" : {\n" +
				"    \"type\" : \"string\",\n" +
				"    \"analyzer\" : \"ik_smart\"\n" +
				"  },\n" +
				"  \"hardwareVersion\" : {\n" +
				"    \"type\" : \"string\"\n" +
				"  },\n" +
				"  \"imagePath\" : {\n" +
				"    \"type\" : \"string\",\n" +
				"    \"analyzer\" : \"ik_smart\"\n" +
				"  },\n" +
				"  \"inertiaX\" : {\n" +
				"    \"type\" : \"double\"\n" +
				"  },\n" +
				"  \"inertiaY\" : {\n" +
				"    \"type\" : \"double\"\n" +
				"  },\n" +
				"  \"inertiaZ\" : {\n" +
				"    \"type\" : \"double\"\n" +
				"  },\n" +
				"  \"model\" : {\n" +
				"    \"type\" : \"string\"\n" +
				"  },\n" +
				"  \"panoInfo\" : {\n" +
				"    \"type\" : \"string\",\n" +
				"    \"analyzer\" : \"ik_smart\"\n" +
				"  },\n" +
				"  \"panoName\" : {\n" +
				"    \"type\" : \"string\",\n" +
				"    \"analyzer\" : \"ik_smart\"\n" +
				"  },\n" +
				"  \"parentGroupName\" : {\n" +
				"    \"type\" : \"string\",\n" +
				"    \"analyzer\" : \"ik_smart\",\n" +
				"    \"fields\": {\n" +
				"      \"verbatim\": {\n" +
				"        \"type\": \"string\",\n" +
				"        \"index\": \"not_analyzed\"\n" +
				"      }\n" +
				"    }\n" +
				"  },\n" +
				"  \"place\" : {\n" +
				"    \"type\" : \"string\",\n" +
				"    \"analyzer\" : \"ik_smart\"\n" +
				"  },\n" +
				"  \"province\" : {\n" +
				"    \"type\" : \"string\",\n" +
				"    \"analyzer\" : \"ik_smart\"\n" +
				"  },\n" +
				"  \"softwareVersion\" : {\n" +
				"    \"type\" : \"string\"\n" +
				"  },\n" +
				"  \"taskNo\" : {\n" +
				"    \"type\" : \"string\"\n" +
				"  },\n" +
				"  \"temperature\" : {\n" +
				"    \"type\" : \"double\"\n" +
				"  },\n" +
				"  \"type\" : {\n" +
				"    \"type\" : \"string\"\n" +
				"  },\n" +
				"  \"ugent\" : {\n" +
				"    \"type\" : \"boolean\"\n" +
				"  },\n" +
				"  \"userName\" : {\n" +
				"    \"type\" : \"string\"\n" +
				"  },\n" +
				"  \"vendor\" : {\n" +
				"    \"type\" : \"string\",\n" +
				"    \"index\": \"not_analyzed\"\n" +
				"  },\n" +
				"  \"panoHeading\" : {\n" +
				"    \"type\" : \"double\"\n" +
				"  },\n" +
				"  \"panoPitch\" : {\n" +
				"    \"type\" : \"double\"\n" +
				"  },\n" +
				"  \"dayNight\" : {\n" +
				"    \"type\" : \"string\"\n" +
				"  },\n" +
				"  \"season\" : {\n" +
				"    \"type\" : \"string\"\n" +
				"  },\n" +
				"  \"viewAngle\" : {\n" +
				"    \"type\" : \"string\"\n" +
				"  },\n" +
				"  \"deviceType\" : {\n" +
				"    \"type\" : \"string\"\n" +
				"  },\n" +
				"  \"markers\" : {\n" +
				"    \"type\" : \"string\"\n" +
				"  },\n" +
				"  \"geo\" : {\n" +
				"    \"type\" : \"geo_point\"\n" +
				"  }\n" +
				"}\n"+
				"}\n"+
				"}\n";
		client.admin().indices().prepareCreate(EC_INDEX_NAME).addMapping(EC_INDEX_NAME, mapping).get();
	}

	@Override
	public SearchResult<List<PanoWithProject>> search(String q, int from, int size) {
		return search(q, null, from, size);
	}

	@Override
	public SearchResult<List<PanoWithProject>> search(String q, String project, int from, int size) {
		return search(q, project, null, from, size, null);
	}
	
	@Override
	public SearchResult<List<PanoWithProject>> search(String q, String project, String vendor, int from, int size, List<String> sortList) {
		BoolQueryBuilder qb = QueryBuilders.boolQuery();
		if (StringUtils.isBlank(q)) {
			qb.must(QueryBuilders.matchAllQuery());
		} else {
			q = QueryParser.escape(q);
			qb.must(QueryBuilders.queryStringQuery(q).defaultOperator(Operator.AND));
		}

		if (!StringUtils.isBlank(project)) {
			qb.must(QueryBuilders.termQuery("parentGroupName.verbatim", project));
		}

		if (!StringUtils.isBlank(vendor)) {
			qb.must(QueryBuilders.termQuery("vendor", vendor));
		}

		SearchRequestBuilder srb = client.prepareSearch(EC_INDEX_NAME).setTypes(EC_TYPE_NAME).setSearchType(SearchType.DFS_QUERY_THEN_FETCH).setQuery(qb).setFrom(from).setSize(size);
		List<SortBuilder> sortBuilders = SortBuilderUtil.getSortBuilders(sortList);
		for (SortBuilder sortBuilder : sortBuilders) {
			srb.addSort(sortBuilder);
		}
		
		SearchResponse response = srb.execute().actionGet();
		
		long total = response.getHits().getTotalHits();
		SearchHit[] hits = response.getHits().getHits();

		List<PanoWithProject> panos = new ArrayList<PanoWithProject>();
		for (int i = 0; i < hits.length; i++) {
			Map<String, Object> source = hits[i].getSource();
			PanoWithProject pano = convertToPanoWithProject(source);
			panos.add(pano);
		}

		SearchResult<List<PanoWithProject>> result = new SearchResult<List<PanoWithProject>>(panos, total);
		return result;
	}
	
	private PanoWithProject convertToPanoWithProject(Map<String, Object> source) {
		PanoWithProject pano = new PanoWithProject();
		
		pano.setPanoId((String)source.get("panoId"));
		pano.setPanoName((String)source.get("panoName"));
		pano.setPanoInfo((String)source.get("panoInfo"));
		pano.setCaptureDate(DateUtil.convertTimeToDate((String)source.get("captureTime")));
		
		String geo = (String)source.get("geo");
		if (!StringUtils.isBlank(geo)) {
			GeoPoint geoPoint = GeoPoint.parseFromLatLon(geo);
			pano.setLat(geoPoint.getLat());
			pano.setLng(geoPoint.getLon());
		}
		
		pano.setPanoHeading(NumberUtil.parseDouble((String)source.get("panoHeading")));
		pano.setPanoPitch(NumberUtil.parseDouble((String)source.get("panoPitch")));
		pano.setDayNight((String)source.get("dayNight"));
		pano.setSeason((String)source.get("season"));
		pano.setViewAngle((String)source.get("viewAngle"));

		pano.setThumbnailUrl(SystemConfig.getCosTilesUrl() + pano.getPanoId() + "/flat/thumb1.jpg");
		pano.setProject((String)source.get("parentGroupName"));
		pano.setGroupName((String)source.get("groupName"));

		Type type = new TypeToken<List<Map<String, String>>>() {
		}.getType();
		List<Map<String, String>> markers = gson.fromJson((String)source.get("markers"), type);
		if (markers != null) {
			pano.setMarkers(markers);
		}

		return pano;
	}

}
