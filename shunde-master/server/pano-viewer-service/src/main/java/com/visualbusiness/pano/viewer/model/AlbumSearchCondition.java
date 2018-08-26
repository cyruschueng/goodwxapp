/*
 * Copyright (c)  2015 - 2018 Microscene Inc., All Rights Reserved.
 *
 * @author: mark@vizen.cn
 * @Date: 2018.1.16
 */

package com.visualbusiness.pano.viewer.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * Album检索条件
 *
 * @author mark@vizen.cn
 * @date 2018-01-16
 */
public class AlbumSearchCondition implements Serializable {
    private String q;
    private String vendor;
    private String type;
    private int from = 0;
    private int size = 10;
    private List<String> sortList;

    private String tip;

    private Integer status;

    public Integer getStatus() {
        return status;
    }

    public AlbumSearchCondition setStatus(Integer status) {
        this.status = status;
        return this;
    }

    public String getTip() {
        return tip;
    }

    public AlbumSearchCondition setTip(String tip) {
        this.tip = tip;
        return this;
    }

    private Date fromDate;
    private Date toDate;

    public Date getFromDate() {
        return fromDate;
    }

    public AlbumSearchCondition setFromDate(Date fromDate) {
        this.fromDate = fromDate;
        return this;
    }

    public Date getToDate() {
        return toDate;
    }

    public AlbumSearchCondition setToDate(Date toDate) {
        this.toDate = toDate;
        return this;
    }

    private String userName;

    public String getUserName() {
        return userName;
    }

    public AlbumSearchCondition setUserName(String userName) {
        this.userName = userName;
        return this;
    }

    public String getQ() {
        return q;
    }

    public AlbumSearchCondition setQ(String q) {
        this.q = q;
        return this;
    }

    public String getVendor() {
        return vendor;
    }

    public AlbumSearchCondition setVendor(String vendor) {
        this.vendor = vendor;
        return this;
    }

    public String getType() {
        return type;
    }

    public AlbumSearchCondition setType(String type) {
        this.type = type;
        return this;
    }

    public int getFrom() {
        return from;
    }

    public AlbumSearchCondition setFrom(int from) {
        this.from = from;
        return this;
    }

    public int getSize() {
        return size;
    }

    public AlbumSearchCondition setSize(int size) {
        this.size = size;
        return this;
    }

    public List<String> getSortList() {
        return sortList;
    }

    public AlbumSearchCondition setSortList(List<String> sortList) {
        this.sortList = sortList;
        return this;
    }

    @Override
    public String toString() {
        return "AlbumSearchCondition{" +
                "q='" + q + '\'' +
                ", vendor='" + vendor + '\'' +
                ", type='" + type + '\'' +
                ", from=" + from +
                ", size=" + size +
                ", sortList=" + sortList +
                ", fromDate=" + fromDate +
                ", toDate=" + toDate +
                ", userName='" + userName + '\'' +
                '}';
    }
}
