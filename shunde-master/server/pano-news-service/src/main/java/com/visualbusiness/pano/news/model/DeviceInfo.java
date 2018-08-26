package com.visualbusiness.pano.news.model;

import com.visualbusiness.common.model.AbstractBaseEntity;

import javax.persistence.*;

/**
 * Copyright (C) 2015 - 2017 MICROSCENE Inc., All Rights Reserved.
 *
 * @author: ray@visualbusiness.com
 * @date: 2017-03-28
 */
@Entity
@Table(name = "DEVICE_INFO")
public class DeviceInfo extends AbstractBaseEntity {

    @Id
    @Column(name = "DEVICE_INFO_ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer deviceInfoId;

    @Column(name="VENDOR_ID")
    private String vendorId;

    @Column(name = "DEVICE_ID")
    private String deviceID;

    @Column(name = "DEVICE_MODEL")
    private String deviceModel;

    @Column(name = "DEVICE_TYPE")
    private String deviceType;

    public String getVendorId() {
        return vendorId;
    }

    public void setVendorId(String vendorId) {
        this.vendorId = vendorId;
    }

    public String getDeviceID() {
        return deviceID;
    }

    public void setDeviceID(String deviceID) {
        this.deviceID = deviceID;
    }

    public String getDeviceModel() {
        return deviceModel;
    }

    public void setDeviceModel(String deviceModel) {
        this.deviceModel = deviceModel;
    }

    public String getDeviceType() {
        return deviceType;
    }

    public void setDeviceType(String deviceType) {
        this.deviceType = deviceType;
    }

    public Integer getDeviceInfoId() {
        return deviceInfoId;
    }

    public void setDeviceInfoId(Integer deviceInfoId) {
        this.deviceInfoId = deviceInfoId;
    }
}
