package com.visualbusiness.pano.process.service.impl;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.visualbusiness.pano.process.dao.ProjectInfoDao;
import com.visualbusiness.pano.process.model.ProjectInfo;
import com.visualbusiness.pano.process.service.ProjectInfoService;

@Service("projectInfoService")
public class ProjectInfoServiceImpl implements ProjectInfoService {
	private static Logger logger = LogManager.getLogger(ProjectInfoServiceImpl.class);

	@Autowired
	private ProjectInfoDao projectInfoDao;

	@Override
	public ProjectInfo findByProjectName(String projectName) {
		return projectInfoDao.findByProjectName(projectName);
	}

}
