package com.visualbusiness.pano.viewer.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.visualbusiness.common.model.AbstractUserlogBaseEntity;


/**
 * The persistent class for the PANO_ALBUM database table.
 * 
 */
@Entity
@Table(name="PANO_ALBUM")
public class PanoAlbum extends AbstractUserlogBaseEntity  {
	private static final long serialVersionUID = 1L;
	
	public static final String PANO_ALBUM_TYPE_NEWS = "news";
	
	@Id
	@Column(name="ALBUM_ID")
	private String albumId;
	
	private String vendor;
	
	private String type;
	
	@Column(name="ALBUM_CONTENT")
	private String albumContent;
	
	public PanoAlbum() {
	}

	public String getAlbumId() {
		return albumId;
	}

	public void setAlbumId(String albumId) {
		this.albumId = albumId;
	}

	public String getAlbumContent() {
		return albumContent;
	}

	public void setAlbumContent(String albumContent) {
		this.albumContent = albumContent;
	}

	public String getVendor() {
		return vendor;
	}

	public void setVendor(String vendor) {
		this.vendor = vendor;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	/////
	public Album<Pano> parseAlbum() {
		Gson gson = new Gson();
		try {
			Album<Pano> album = gson.fromJson(albumContent, new TypeToken<Album<Pano>>() {
			}.getType());
			return album;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}

	}
	
}