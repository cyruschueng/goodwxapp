package com.visualbusiness.pano.news.dao;

import com.visualbusiness.pano.news.model.PanoWithGroupInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PanoWithGroupInfoDao extends JpaRepository<PanoWithGroupInfo, String> {

	List<PanoWithGroupInfo> findByParentGroupName(String parentGroupName);
}
