package com.visualbusiness.pano.news.model;

import com.visualbusiness.common.model.AbstractBaseEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


/**
 * The persistent class for the PANO_ALBUM database table.
 * 
 */
@Entity
@Table(name="PANO_ALBUM_MTA")
public class PanoAlbumMta extends AbstractBaseEntity  {
	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name="ALBUM_ID")
	private String albumId;
	
	@Column(name="SECRETE_ID")
	private String secreteId;
	
	public PanoAlbumMta() {
	}

	public String getAlbumId() {
		return albumId;
	}

	public void setAlbumId(String albumId) {
		this.albumId = albumId;
	}

	public String getSecreteId() {
		return secreteId;
	}

	public void setSecreteId(String secreteId) {
		this.secreteId = secreteId;
	}

}