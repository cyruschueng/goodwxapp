package com.visualbusiness.pano.process.dao;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.visualbusiness.pano.process.model.ProjectInfo;

public interface ProjectInfoDao extends PagingAndSortingRepository<ProjectInfo, Integer> {

	ProjectInfo findByProjectName(String projectName);
}
