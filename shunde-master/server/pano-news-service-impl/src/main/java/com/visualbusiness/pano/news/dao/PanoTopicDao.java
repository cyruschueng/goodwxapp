package com.visualbusiness.pano.news.dao;

import com.visualbusiness.pano.news.model.PanoTopic;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Copyright (C) 2015 - 2017 MICROSCENE Inc., All Rights Reserved.
 *
 * @author: ray@visualbusiness.com
 * @date: 2017-03-07
 */
public interface PanoTopicDao extends PagingAndSortingRepository<PanoTopic, String> {
}
