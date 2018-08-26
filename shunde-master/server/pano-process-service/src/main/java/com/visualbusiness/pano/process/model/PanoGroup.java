package com.visualbusiness.pano.process.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.visualbusiness.common.model.AbstractBaseEntity;


/**
 * The persistent class for the PANO_GROUP database table.
 * 
 */
@Entity
@Table(name="PANO_GROUP")
public class PanoGroup extends AbstractBaseEntity  {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="PANO_GROUP_ID")
	private Integer panoGroupId;

	@Column(name="GROUP_NAME")
	private String groupName;
	
	public PanoGroup() {
	}

	public Integer getPanoGroupId() {
		return panoGroupId;
	}

	public void setPanoGroupId(Integer panoGroupId) {
		this.panoGroupId = panoGroupId;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

}