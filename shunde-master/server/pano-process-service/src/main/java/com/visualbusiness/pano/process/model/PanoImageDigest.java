package com.visualbusiness.pano.process.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.visualbusiness.common.model.AbstractBaseEntity;


/**
 * The persistent class for the PANO_IMAGE_DIGEST database table.
 * 
 */
@Entity
@Table(name="PANO_IMAGE_DIGEST")
public class PanoImageDigest extends AbstractBaseEntity  {
	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name="PANO_ID")
	private String panoId;

	@Column(name="ORGINAL_PHOTO_DIGEST")
	private String orginalPhotoDigest;
	
	public PanoImageDigest() {
	}

	public String getPanoId() {
		return this.panoId;
	}

	public void setPanoId(String panoId) {
		this.panoId = panoId;
	}

	public String getOrginalPhotoDigest() {
		return this.orginalPhotoDigest;
	}

	public void setOrginalPhotoDigest(String orginalPhotoDigest) {
		this.orginalPhotoDigest = orginalPhotoDigest;
	}

}