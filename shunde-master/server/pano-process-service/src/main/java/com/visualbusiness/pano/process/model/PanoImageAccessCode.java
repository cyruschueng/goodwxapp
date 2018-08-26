package com.visualbusiness.pano.process.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.visualbusiness.common.model.AbstractBaseEntity;


/**
 * The persistent class for the PANO_IMAGE_ACCESS_CODE database table.
 * 
 */
@Entity
@Table(name="PANO_IMAGE_ACCESS_CODE")
public class PanoImageAccessCode extends AbstractBaseEntity  {
	private static final long serialVersionUID = 1L;
	
	/**
	 * 未被提取。
	 */
	public static final int STATUS_UNACCESSED = 0;

	/**
	 * 已被提取。
	 */
	public static final int STATUS_ACCESSED = 10;

	@Id
	@Column(name="PANO_ID")
	private String panoId;

	@Column(name="ACCESS_CODE")
	private String accessCode;
	
	private Integer status;

	public PanoImageAccessCode() {
	}

	public String getPanoId() {
		return this.panoId;
	}

	public void setPanoId(String panoId) {
		this.panoId = panoId;
	}

	public String getAccessCode() {
		return this.accessCode;
	}

	public void setAccessCode(String accessCode) {
		this.accessCode = accessCode;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	
}