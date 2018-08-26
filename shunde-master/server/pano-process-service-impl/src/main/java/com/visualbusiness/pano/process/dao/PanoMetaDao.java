package com.visualbusiness.pano.process.dao;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.visualbusiness.pano.process.model.PanoMeta;

public interface PanoMetaDao extends PagingAndSortingRepository<PanoMeta, Integer> {

	List<PanoMeta> findByPanoId(String panoId);

	PanoMeta findByPanoIdAndMetaName(String panoId, String metaName);

	List<PanoMeta> findByMetaNameAndMetaValue(String metaName, String metaValue);

	List<PanoMeta> findByPanoIdIn(List<String> panoIdList);

	int deletePanoMetaByPanoIdEquals(String panoId);
}
