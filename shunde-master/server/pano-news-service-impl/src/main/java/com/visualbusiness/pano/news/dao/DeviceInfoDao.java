package com.visualbusiness.pano.news.dao;

import com.visualbusiness.pano.news.model.DeviceInfo;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

/**
 * Copyright (C) 2015 - 2017 MICROSCENE Inc., All Rights Reserved.
 *
 * @author: ray@visualbusiness.com
 * @date: 2017-03-28
 */
public interface DeviceInfoDao extends PagingAndSortingRepository<DeviceInfo, String> {
    List<DeviceInfo> findDeviceModelByVendorId(String vendor);
}
