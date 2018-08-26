package com.visualbusiness.pano.viewer.dao;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.visualbusiness.pano.viewer.model.MtaInfo;

public interface MtaInfoDao extends PagingAndSortingRepository<MtaInfo, String> {
}
