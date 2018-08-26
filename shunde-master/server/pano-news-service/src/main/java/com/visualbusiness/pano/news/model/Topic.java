package com.visualbusiness.pano.news.model;

import java.io.Serializable;

/**
 * Copyright (C) 2015 - 2017 MICROSCENE Inc., All Rights Reserved.
 *
 * @author: ray@visualbusiness.com
 * @date: 2017-03-07
 */
public class Topic <A extends  Album> implements Serializable {
    private static final long serialVersionUID = 1L;

    private String topicName;

    public String getTopicName() {
        return topicName;
    }

    public void setTopicName(String topicName) {
        this.topicName = topicName;
    }
}
