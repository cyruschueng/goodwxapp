package com.visualbusiness.pano.process.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.visualbusiness.common.model.AbstractBaseEntity;


/**
 * The persistent class for the PROJECT_INFO database table.
 * 
 */
@Entity
@Table(name="PROJECT_INFO")
public class ProjectInfo extends AbstractBaseEntity  {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="PROJECT_INFO_ID")
	private Integer projectInfoId;

	@Column(name="PROJECT_NAME")
	private String projectName;
	
	@Column(name="PROJECT_INFO")
	private String projectInfo;
	
	public ProjectInfo() {
	}

	public Integer getProjectInfoId() {
		return projectInfoId;
	}

	public void setProjectInfoId(Integer projectInfoId) {
		this.projectInfoId = projectInfoId;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public String getProjectInfo() {
		return projectInfo;
	}

	public void setProjectInfo(String projectInfo) {
		this.projectInfo = projectInfo;
	}


}