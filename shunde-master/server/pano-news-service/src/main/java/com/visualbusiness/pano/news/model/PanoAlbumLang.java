package com.visualbusiness.pano.news.model;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.visualbusiness.common.model.AbstractUserlogBaseEntity;

import javax.persistence.*;


/**
 * The persistent class for the PANO_ALBUM_LANG database table.
 * 
 */
@Entity
@Table(name="PANO_ALBUM_LANG")
public class PanoAlbumLang extends AbstractUserlogBaseEntity  {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="PANO_ALBUM_LANG_ID")
	private Integer panoAlbumLangId;

	@Column(name="ALBUM_ID")
	private String albumId;
	
	@Column(name="LANG")
	private String lang;
	
	@Column(name="ALBUM_CONTENT")
	private String albumContent;
	
	public PanoAlbumLang() {
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

	public Integer getPanoAlbumLangId() {
		return panoAlbumLangId;
	}

	public void setPanoAlbumLangId(Integer panoAlbumLangId) {
		this.panoAlbumLangId = panoAlbumLangId;
	}

	public String getLang() {
		return lang;
	}

	public void setLang(String lang) {
		this.lang = lang;
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