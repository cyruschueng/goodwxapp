package com.visualbusiness.pano.process.service;

import com.visualbusiness.pano.process.model.ProjectInfo;

public interface ProjectInfoService {
    public ProjectInfo findByProjectName(String projectName);
}
