package com.visualbusiness.pano.news.model;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.visualbusiness.common.model.AbstractUserlogBaseEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Copyright (C) 2015 - 2017 MICROSCENE Inc., All Rights Reserved.
 *
 * @author: ray@visualbusiness.com
 * @date: 2017-03-07
 */

@Entity
@Table(name = "PANO_TOPIC")
public class PanoTopic extends AbstractUserlogBaseEntity {
    private static final long serialVersionUID = 1L;


    @Id
    @Column(name="TOPIC_ID")
    private String topicId;

    private String vendor;

    private String type;

    @Column(name="TOPIC_CONTENT")
    private String topicContent;

    @Column(name = "TOPIC_STATUS")
    private Integer topicStatus;


    public PanoTopic() {
    }

    public String getTopicId() {
        return topicId;
    }

    public void setTopicId(String topicId) {
        this.topicId = topicId;
    }

    public String getVendor() {
        return vendor;
    }

    public void setVendor(String vendor) {
        this.vendor = vendor;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTopicContent() {
        return topicContent;
    }

    public void setTopicContent(String topicContent) {
        this.topicContent = topicContent;
    }

    public Integer getTopicStatus() {
        return topicStatus;
    }

    public void setTopicStatus(Integer topicStatus) {
        this.topicStatus = topicStatus;
    }

    public Topic<Album> parseTopic() {
        Gson gson = new Gson();
        try {
            Topic<Album> topic = gson.fromJson(topicContent, new TypeToken<Topic<Album>>() {
            }.getType());
            return topic;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
