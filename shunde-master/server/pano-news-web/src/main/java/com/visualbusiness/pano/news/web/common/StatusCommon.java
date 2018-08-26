package com.visualbusiness.pano.news.web.common;

/**
 * Copyright (C) 2015 - 2017 MICROSCENE Inc., All Rights Reserved.
 *
 * @author: ray@visualbusiness.com
 * @date: 2017-03-07
 */
public class StatusCommon {

    //草稿
    public static final int DRAFT = 0;
    //已发布
    public static final int RELEASED = 1;
    //已删除
    public static final int DELETED = 2;
    //彻底删除
    public static final int RETRACTION = 3;


    public static Boolean checkStatusChange(int fromStatus, int toStatus) {
        switch (fromStatus) {
            case DRAFT:
                return toStatus == RELEASED || toStatus == DELETED || toStatus == 3;
            case RELEASED:
                return toStatus == DRAFT || toStatus == DELETED || toStatus == 3;
            case DELETED:
                return toStatus == DRAFT || toStatus == RETRACTION;
            default:
                return false;
        }
    }
}
