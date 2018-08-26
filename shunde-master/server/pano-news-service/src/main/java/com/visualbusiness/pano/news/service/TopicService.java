package com.visualbusiness.pano.news.service;

import com.visualbusiness.pano.news.model.PanoTopic;

/**
 * Copyright (C) 2015 - 2017 MICROSCENE Inc., All Rights Reserved.
 *
 * @author: ray@visualbusiness.com
 * @date: 2017-03-07
 */
public interface TopicService {

    public PanoTopic get(String topicId);

    public PanoTopic saveOrUpdate(PanoTopic panoTopic);

    public boolean recreateSearchIndex();

    public boolean recreateSearchIndex(String topicId);

}
