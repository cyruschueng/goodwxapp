package com.visualbusiness.pano.viewer.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.visualbusiness.pano.viewer.model.PanoWithGroupInfo;

public interface PanoWithGroupInfoDao extends JpaRepository<PanoWithGroupInfo, String> {

	List<PanoWithGroupInfo> findByParentGroupName(String parentGroupName);
}
