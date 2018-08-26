package com.visualbusiness.pano.viewer.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.visualbusiness.pano.process.model.PanoMeta;
import com.visualbusiness.pano.process.service.PanoMetaService;
import com.visualbusiness.pano.viewer.model.AlbumSearchCondition;
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
import org.elasticsearch.search.aggregations.Aggregation;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.bucket.terms.StringTerms;
import org.elasticsearch.search.aggregations.bucket.terms.Terms;
import org.elasticsearch.search.aggregations.bucket.terms.TermsBuilder;
import org.elasticsearch.search.sort.SortBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.visualbusiness.common.auth.LunaRestResult;
import com.visualbusiness.common.auth.LunaUserInfo;
import com.visualbusiness.common.config.SystemConfig;
import com.visualbusiness.common.model.SearchResult;
import com.visualbusiness.common.rest.RestException;
import com.visualbusiness.common.rest.RestRequest;
import com.visualbusiness.common.rest.RestResult;
import com.visualbusiness.common.util.DateUtil;
import com.visualbusiness.pano.process.model.ProjectInfo;
import com.visualbusiness.pano.process.service.ProjectInfoService;
import com.visualbusiness.pano.viewer.dao.PanoAlbumDao;
import com.visualbusiness.pano.viewer.dao.PanoWithGroupInfoDao;
import com.visualbusiness.pano.viewer.model.Album;
import com.visualbusiness.pano.viewer.model.AlbumSearchResult;
import com.visualbusiness.pano.viewer.model.AlbumSearchResult.LangInfo;
import com.visualbusiness.pano.viewer.model.Pano;
import com.visualbusiness.pano.viewer.model.PanoAlbum;
import com.visualbusiness.pano.viewer.model.PanoAlbumLang;
import com.visualbusiness.pano.viewer.model.PanoWithGroupInfo;
import com.visualbusiness.pano.viewer.model.PanoWithThumbnails;
import com.visualbusiness.pano.viewer.service.AlbumLangService;
import com.visualbusiness.pano.viewer.service.AlbumService;
import com.visualbusiness.pano.viewer.service.PanoService;
import com.visualbusiness.pano.viewer.util.SortBuilderUtil;

@Service("albumService")
public class AlbumServiceImpl implements AlbumService {
    private static Logger logger = LogManager.getLogger(AlbumServiceImpl.class);

    public static final String EC_INDEX_NAME = "album";
    public static final String EC_TYPE_NAME = "album";

    private static final String META_NAME_PARENT_GROUP_NAME = "parentGroupName";

    @Autowired
    private PanoWithGroupInfoDao panoWithGroupInfoDao;

    @Autowired
    private PanoAlbumDao panoAlbumDao;

    @Autowired
    private PanoService panoService;

    @Autowired
    private PanoMetaService panoMetaService;

    @Autowired
    private AlbumLangService albumLangService;

    @Autowired
    private ProjectInfoService projectInfoService;

    @Autowired
    private TransportClient client;

    private Gson gson = new Gson();

    @Override
    public Album<PanoWithThumbnails> findByPanoIdWithFullInfoOld(String panoId) {
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
    public Album<PanoWithThumbnails> findByPanoIdWithFullInfo(String panoId) {
        PanoMeta panoMetaForparentGroupName = panoMetaService.findByPanoIdAndMetaName(panoId, META_NAME_PARENT_GROUP_NAME);

        if (panoMetaForparentGroupName == null) {
            return null;
        }
        String parentGroupName = panoMetaForparentGroupName.getMetaValue();
        List<PanoMeta> panoMetaListForId = panoMetaService.findByMetaNameAndMetaValue(META_NAME_PARENT_GROUP_NAME, parentGroupName);

        List<String> panoIdList = new ArrayList<>();
        for (PanoMeta panoMeta : panoMetaListForId) {
            panoIdList.add(panoMeta.getPanoId());
        }

        List<PanoMeta> panoMetaListForGroupInfo = panoMetaService.findByPanoIdIn(panoIdList);
        Map<String, Map<String, String>> albumMap = new HashMap<>();
        for (PanoMeta panoMeta : panoMetaListForGroupInfo) {
            Map<String, String> metaMap = albumMap.get(panoMeta.getPanoId());
            if (metaMap != null) {
                metaMap.put(panoMeta.getMetaName(), panoMeta.getMetaValue());
            } else {
                metaMap = new HashMap<>();
                metaMap.put(panoMeta.getMetaName(), panoMeta.getMetaValue());
                albumMap.put(panoMeta.getPanoId(), metaMap);
            }
        }

        String albumInfo = "";
        ProjectInfo projectInfo = projectInfoService.findByProjectName(parentGroupName);
        if (projectInfo != null) {
            albumInfo = projectInfo.getProjectInfo();
        }

        Album<PanoWithThumbnails> album = convertToAlbum(albumMap, albumInfo);
        return album;

    }


    @Override
    public List<Pano> getPanos(List<String> albumIds) {
        Map<String, Pano> panoMap = new LinkedHashMap<String, Pano>();

        Iterable<PanoAlbum> albums = this.panoAlbumDao.findAll(albumIds);
        for (PanoAlbum panoAlbum : albums) {
            Album<Pano> album = panoAlbum.parseAlbum();
            List<Pano> panos = album.extractPanos();
            for (Pano pano : panos) {
                if (!panoMap.containsKey(pano.getPanoId())) {
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

    private Album<PanoWithThumbnails> convertToAlbum(Map<String, Map<String, String>> albumMap, String albumInfo) {
        Album<PanoWithThumbnails> album = new Album<PanoWithThumbnails>();

        for (Map.Entry<String, Map<String, String>>  entry : albumMap.entrySet()) {
            Map<String, String> metaMap = entry.getValue();
            album.setAlbumName(metaMap.get("parentGroupName"));
            album.setAlbumInfo(albumInfo);

            String groupName = metaMap.get("groupName");
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

            PanoWithThumbnails pano = panoService.convertToPanoWithThumbnails(entry.getKey(), metaMap);
            subAlbum.getPanoList().add(pano);
        }

        return album;
    }

    @Override
    public PanoAlbum get(String albumId) {
        return panoAlbumDao.findOne(albumId);
    }

    @Override
    public List<PanoAlbum> findByAlbumIds(List<String> albumIds) {
        return panoAlbumDao.findByAlbumIdIn(albumIds);
    }

    @Transactional
    @Override
    public PanoAlbum saveOrUpdate(PanoAlbum panoAlbum) {
        //检查相册名称是否重复
        String albumId = panoAlbum.getAlbumId();
        String vendor = panoAlbum.getVendor();
        String albumName = panoAlbum.parseAlbum().getAlbumName();

        List<AlbumSearchResult> searchResult = this.searchByAlbumNameVendor(albumName, vendor).getResult();
        for (AlbumSearchResult albumSearchResult : searchResult) {
            if (!albumId.equals(albumSearchResult.getAlbumId())) {
                throw new RuntimeException("相册名称重复");
            }
        }

        //保存相册
        PanoAlbum updatedPanoAlbum = panoAlbumDao.save(panoAlbum);

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
        panoAlbumDao.delete(albumId);
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
        logger.warn("通过DB数据重建pano搜索索引");

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
        Iterable<PanoAlbum> panoAlbums = panoAlbumDao.findAll();

        logger.info("通过DB数据生成album搜索索引");
        for (PanoAlbum panoAlbum : panoAlbums) {
            recreateSearchIndex(panoAlbum);
        }

        return true;
    }

    private boolean recreateSearchIndex(PanoAlbum panoAlbum) {
        String albumId = panoAlbum.getAlbumId();
        return recreateSearchIndex(albumId);
    }

    @Override
    public boolean recreateSearchIndex(String albumId) {
        logger.debug("生成" + albumId + "的搜索索引");

        PanoAlbum panoAlbum = panoAlbumDao.findOne(albumId);
        Album<Pano> album = null;

        Map<String, Object> source = new HashMap<String, Object>();

        if (panoAlbum != null) {
            try {
                album = panoAlbum.parseAlbum();
            } catch (Exception e) {
                logger.error("相册内容解析失败:" + panoAlbum.getAlbumId() + "," + e.getMessage());
                album = null;
            }

            if (album != null) {
                source.put("albumId", albumId);
                source.put("tipsList", album.getTipsList());
                source.put("status", album.getStatus());
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
                source.put("albumNames", album.extractAlbumNames());
                source.put("albumInfos", album.extractAlbumInfos());
                source.put("albumDetails", album.extractAlbumDetails());
                source.put("panoIds", album.extractPanoIds());
                source.put("albumIncludedIds", album.extractAlbumIncludedIds());
                source.put("panoNames", album.extractPanoNames());
                source.put("completedSteps", album.getCompletedSteps());
            }

        } else {
            logger.warn("未找到相册数据" + albumId);
        }

        client.prepareDelete(EC_INDEX_NAME, EC_TYPE_NAME, albumId).get();

        if (panoAlbum == null || album == null) {
            return false;
        }

        IndexResponse response = client.prepareIndex(EC_INDEX_NAME, EC_TYPE_NAME, albumId).setSource(source).get();
        client.admin().indices().prepareRefresh(EC_INDEX_NAME).get();

        return true;
    }

    @Override
    public boolean deleteSearchIndex(String albumId) {
        logger.debug("删除" + albumId + "的搜索索引");

        client.prepareDelete(EC_INDEX_NAME, EC_TYPE_NAME, albumId).get();
        client.admin().indices().prepareRefresh(EC_INDEX_NAME).get();

        return true;
    }

//    @Override
//    public SearchResult<List<AlbumSearchResult>> search(AlbumSearchCondition condition) {
////            String q, int from, int size) {
//        return search(q, null, null, from, size, null);
//    }

    @Override
    public SearchResult<List<AlbumSearchResult>> search(AlbumSearchCondition condition) {
//            String q, String vendor, String type, int from, int size, List<String> sortList) {

        String q = condition.getQ();
        String vendor = condition.getVendor();
        String type = condition.getType();
        int from = condition.getFrom();
        int size = condition.getSize();
        String userName = condition.getUserName();
        Date fromDate = condition.getFromDate();
        Date toDate = condition.getToDate();

        String tip = condition.getTip();

        Integer status = condition.getStatus();

        List<String> sortList = condition.getSortList();

        BoolQueryBuilder qb = QueryBuilders.boolQuery();
        if (StringUtils.isBlank(q)) {
            qb.must(QueryBuilders.matchAllQuery());
        } else {
            q = QueryParser.escape(q);
            qb.must(QueryBuilders.queryStringQuery(q).defaultOperator(Operator.AND));
            qb.should(QueryBuilders.matchQuery("albumName", q).boost(10.0f));
        }

        if (!StringUtils.isBlank(userName)) {
            qb.must(QueryBuilders.termQuery("createUser", userName));
        }

        if (!StringUtils.isBlank(vendor)) {
            qb.must(QueryBuilders.termQuery("vendor", vendor));
        }

        if (!StringUtils.isBlank(type)) {
            qb.must(QueryBuilders.termQuery("type", type));
        }
        // 顺德需求：开始日查询
        if (fromDate != null) {
            qb.must(QueryBuilders.rangeQuery("updateTime").gte(fromDate.getTime()));
        }
        // 顺德需求：开始日查询
        if (toDate != null) {
            qb.must(QueryBuilders.rangeQuery("updateTime").lte(toDate.getTime()));
        }
        if (tip != null) {
            qb.must(QueryBuilders.termsQuery("tipsList", tip));
        }
        if (status != null) {
            qb.must(QueryBuilders.termQuery("status", status));
        }

        TermsBuilder termAggs = AggregationBuilders.terms("tipsSet").field("tipsList");
        SearchRequestBuilder srb = client.prepareSearch(EC_INDEX_NAME)
                .setTypes(EC_TYPE_NAME)
                .setSearchType(SearchType.DFS_QUERY_THEN_FETCH)
                .setQuery(qb)
                .addAggregation(termAggs)
                .setFrom(from).setSize(size);
        List<SortBuilder> sortBuilders = SortBuilderUtil.getSortBuilders(sortList);
        for (SortBuilder sortBuilder : sortBuilders) {
            srb.addSort(sortBuilder);
        }

        SearchResponse response = srb.execute().actionGet();

        long total = response.getHits().getTotalHits();
        SearchHit[] hits = response.getHits().getHits();

        // 获取统计信息
        List<SearchResult.MyPair> aggs = new ArrayList<>();
        StringTerms tipsSet = response.getAggregations().get("tipsSet");
        if (tipsSet != null) {
            List<Terms.Bucket> listBucket = tipsSet.getBuckets();
            if (listBucket != null) {
                for (Terms.Bucket bucket : listBucket) {
                    String key = String.class.cast(bucket.getKey());
                    long docCount = bucket.getDocCount();
                    SearchResult.MyPair pair = new SearchResult.MyPair();
                    pair.setKey(key);
                    pair.setValue(docCount);
                    aggs.add(pair);
                }
            }
        }

        List<AlbumSearchResult> albumSearchResults = new ArrayList<>();
        for (int i = 0; i < hits.length; i++) {
            Map<String, Object> source = hits[i].getSource();
            AlbumSearchResult albumSearchResult = convertToAlbumSearchResult(source);
            albumSearchResults.add(albumSearchResult);
        }

        // 设置多语言版本信息
        List<String> albumIds = new ArrayList<>();
        Map<String, AlbumSearchResult> albumSearchResultMap = new HashMap<String, AlbumSearchResult>();
        for (AlbumSearchResult albumSearchResult : albumSearchResults) {
            albumIds.add(albumSearchResult.getAlbumId());
            albumSearchResultMap.put(albumSearchResult.getAlbumId(), albumSearchResult);
        }

        List<PanoAlbumLang> panoAlbumLangs = albumLangService.findByAlbumIds(albumIds);
        for (PanoAlbumLang panoAlbumLang : panoAlbumLangs) {
            LangInfo langInfo = new LangInfo();
            langInfo.setLang(panoAlbumLang.getLang());
            langInfo.setCreateDate(DateUtil.convertTimeToDateTime(panoAlbumLang.getCreateTimeMillis()));
            langInfo.setUpdateDate(DateUtil.convertTimeToDateTime(panoAlbumLang.getUpdateTimeMillis()));
            albumSearchResultMap.get(panoAlbumLang.getAlbumId()).getLangs().add(langInfo);
        }

        SearchResult<List<AlbumSearchResult>> result = new SearchResult<>(albumSearchResults, total);
        result.setAggs(aggs);
        return result;
    }

    @Override
    public SearchResult<List<AlbumSearchResult>> searchByAlbumNameVendor(String albumName, String vendor) {
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

        List<AlbumSearchResult> albumSearchResults = new ArrayList<AlbumSearchResult>();
        for (int i = 0; i < hits.length; i++) {
            Map<String, Object> source = hits[i].getSource();
            AlbumSearchResult albumSearchResult = convertToAlbumSearchResult(source);
            albumSearchResults.add(albumSearchResult);
        }

        SearchResult<List<AlbumSearchResult>> result = new SearchResult<List<AlbumSearchResult>>(albumSearchResults, total);
        return result;
    }

    private AlbumSearchResult convertToAlbumSearchResult(Map<String, Object> source) {
        AlbumSearchResult albumSearchResult = new AlbumSearchResult();

        albumSearchResult.setAlbumId((String) source.get("albumId"));
        albumSearchResult.setAlbumName((String) source.get("albumName"));
        albumSearchResult.setAlbumInfo((String) source.get("albumInfo"));
        albumSearchResult.setAlbumDetail((String) source.get("albumDetail"));
        albumSearchResult.setThumbnailUrl((String) source.get("thumbnailUrl"));
        albumSearchResult.setCreateDate(DateUtil.convertTimeToDateTime(source.get("createTime").toString()));
        albumSearchResult.setUpdateDate(DateUtil.convertTimeToDateTime(source.get("updateTime").toString()));
        albumSearchResult.setCreateUser((String) source.get("createUser"));
        albumSearchResult.setUpdateUser((String) source.get("updateUser"));
        albumSearchResult.setCompletedSteps((Integer) source.get("completedSteps"));

        // 标签聚集
        albumSearchResult.setTipsList((List<String>)source.get("tipsList"));

        // 状态
        if (source.get("status") != null) {
            albumSearchResult.setStatus((int)source.get("status"));
        }
        return albumSearchResult;
    }

    private void createSearchIndex() {
        String mapping = "{\"album\" : {\n" +
                "\"properties\" : {\n" +
                "  \"albumId\" : {\n" +
                "    \"type\" : \"string\"\n" +
                "  },\n" +
                "  \"tipsList\" : {\n" +
                "    \"type\" : \"string\",\n" +
                "    \"index\": \"not_analyzed\"\n" +
                "  },\n" +

                "  \"status\" : {\n" +
                "    \"type\" : \"integer\",\n" +
                "    \"index\": \"not_analyzed\"\n" +
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
                "  \"completedSteps\" : {\n" +
                "    \"type\" : \"integer\"\n" +
                "  },\n" +
                "  \"albumDetail\" : {\n" +
                "    \"type\" : \"string\",\n" +
                "    \"analyzer\" : \"ik_smart\"\n" +
                "  },\n" +
                "  \"thumbnailUrl\" : {\n" +
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
                "}\n" +
                "}\n" +
                "}\n";
        client.admin().indices().prepareCreate(EC_INDEX_NAME).addMapping(EC_INDEX_NAME, mapping).get();
    }
}
