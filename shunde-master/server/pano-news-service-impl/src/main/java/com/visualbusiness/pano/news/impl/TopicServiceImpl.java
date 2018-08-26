package com.visualbusiness.pano.news.impl;

import com.visualbusiness.common.model.SearchResult;
import com.visualbusiness.pano.news.dao.PanoTopicDao;
import com.visualbusiness.pano.news.model.PanoTopic;
import com.visualbusiness.pano.news.model.TopicSearchResult;
import com.visualbusiness.pano.news.service.TopicService;
import org.apache.log4j.Logger;
import org.elasticsearch.action.admin.indices.delete.DeleteIndexResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchRequestBuilder;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.search.SearchType;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Copyright (C) 2015 - 2017 MICROSCENE Inc., All Rights Reserved.
 *
 * @author: ray@visualbusiness.com
 * @date: 2017-03-07
 */
@Service("topicService")
public class TopicServiceImpl implements TopicService {

    private Logger logger = Logger.getLogger(TopicService.class);

    private final static String ES_INDEX_NAME = "news";
    private final static String ES_TYPE_NAME = "topic";

    @Autowired
    private TransportClient client;

    @Autowired
    private PanoTopicDao panoTopicDao;

    @Override
    public PanoTopic get(String topicId) {
        return panoTopicDao.findOne(topicId);
    }

    public PanoTopic saveOrUpdate(PanoTopic panoTopic) {

        String topicId = panoTopic.getTopicId();
        String vendor = panoTopic.getVendor();
        String albumName = panoTopic.parseTopic().getTopicName();

        List<TopicSearchResult> topicSearchResultList = this.searchByTopicNameAndVendor(albumName, vendor).getResult();

        for (TopicSearchResult topicSearchResult : topicSearchResultList) {
            if (!topicId.equals(topicSearchResult.getTopicId())) {
                throw new RuntimeException("专题名称重复");
            }
        }
        return panoTopicDao.save(panoTopic);
    }

    public SearchResult<List<TopicSearchResult>> searchByTopicNameAndVendor(String topicName, String vendor) {

        BoolQueryBuilder qb = QueryBuilders.boolQuery();
        qb.must(QueryBuilders.termQuery("topicName.verbatim", topicName));
        if (vendor == null) {
            qb.mustNot(QueryBuilders.existsQuery("vendor"));
        } else {
            qb.must(QueryBuilders.termQuery("vendor", vendor));
        }

        SearchRequestBuilder srb = client.prepareSearch(ES_INDEX_NAME).setTypes(ES_TYPE_NAME).setSearchType(SearchType.DFS_QUERY_THEN_FETCH).setQuery(qb);


        SearchResponse response = srb.execute().actionGet();

        long total = response.getHits().getTotalHits();
        SearchHit[] hits = response.getHits().getHits();

        List<TopicSearchResult> topicSearchResultList = new ArrayList<>();
        for (int i = 0; i < hits.length; i++) {
            Map<String, Object> source = hits[i].getSource();
            TopicSearchResult topicSearchResult = convertToTopicSearchResult(source);
            topicSearchResultList.add(topicSearchResult);
        }

        SearchResult<List<TopicSearchResult>> result = new SearchResult<>(topicSearchResultList, total);
        return result;
    }

    private TopicSearchResult convertToTopicSearchResult(Map source) {
        TopicSearchResult topicSearchResult = new TopicSearchResult();
        return topicSearchResult;
    }

    public boolean recreateSearchIndex() {
        logger.info("通过DB重建索引,index:" + ES_INDEX_NAME + " type:" + ES_TYPE_NAME);
        this.deleteSearchIndex();
        this.createSearchIndex();
        this.indexByDBData();
        return true;
    }

    private void indexByDBData() {
        Iterable<PanoTopic> panoTopicList = panoTopicDao.findAll();
        for (PanoTopic panoTopic : panoTopicList) {
            recreateSearchIndex(panoTopic);
        }
    }

    public boolean recreateSearchIndex(String topicId) {
        PanoTopic panoTopic = panoTopicDao.findOne(topicId);
        return recreateSearchIndex(panoTopic);
    }

    private boolean recreateSearchIndex(PanoTopic panoTopic) {
        logger.debug("生成索引开始,index:" + ES_INDEX_NAME + " type:" + ES_TYPE_NAME + " topicId:" + panoTopic.getTopicId());

        Map<String, Object> source = new HashMap<>();
        if (panoTopic == null) {
            return false;
        }
        source.put("topicId", panoTopic.getTopicId());
        source.put("topicName", panoTopic.parseTopic().getTopicName());
        source.put("type", panoTopic.getType());
        source.put("vendor", panoTopic.getVendor());
        source.put("topicStatus", panoTopic.getTopicStatus());
        source.put("createTime", panoTopic.getCreateTimeMillis());
        source.put("updateTime", panoTopic.getUpdateTimeMillis());
        source.put("createUser", panoTopic.getCreateUser());
        source.put("updateUser", panoTopic.getUpdateUser());
        client.admin().indices().prepareDelete(ES_INDEX_NAME, ES_TYPE_NAME, panoTopic.getTopicId()).get();
        IndexResponse response = client.prepareIndex(ES_INDEX_NAME, ES_TYPE_NAME, panoTopic.getTopicId()).setSource(source).get();
        client.admin().indices().prepareRefresh(ES_INDEX_NAME).get();
        return true;
    }

    public boolean deleteSearchIndex() {
        try {
            logger.info("删除topic搜索索引");
            DeleteIndexResponse response = client.admin().indices().prepareDelete(ES_INDEX_NAME).get();
            logger.info("删除topic搜索索引成功");
            return true;
        } catch (Exception e) {
            logger.error(e);
            return false;
        }
    }


    private void createSearchIndex() {

        String mapping = "{\"topic\" : {\n" +
                "\"properties\" : {\n" +
                "  \"topicID\" : {\n" +
                "    \"type\" : \"string\"\n" +
                "  },\n" +
                "  \"topicName\" : {\n" +
                "    \"type\" : \"string\",\n" +
                "    \"analyzer\" : \"ik_smart\"\n" +
                "  },\n" +
                "  \"type\" : {\n" +
                "    \"type\" : \"string\",\n" +
                "    \"index\": \"not_analyzed\"\n" +
                "  },\n" +
                "  \"vendor\" : {\n" +
                "    \"type\" : \"string\",\n" +
                "    \"index\": \"not_analyzed\"\n" +
                "  },\n" +
                "  \"topicStatus\" : {\n" +
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
                "  }\n" +
                "}\n" +
                "}\n" +
                "}\n";
        client.admin().indices().prepareCreate(ES_INDEX_NAME).addMapping(ES_INDEX_NAME, mapping).get();
    }

}
