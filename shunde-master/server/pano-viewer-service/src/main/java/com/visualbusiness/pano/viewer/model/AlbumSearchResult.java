package com.visualbusiness.pano.viewer.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


public class AlbumSearchResult implements Serializable {
	private static final long serialVersionUID = 1L;

	private String albumId;
	
	private String albumName;

	private String albumInfo;

	private String albumDetail;

	private String thumbnailUrl;
	
	private String createDate;
	
	private String updateDate;
	
	private String createUser;
	
	private String updateUser;

	private List<String> tipsList = new ArrayList<>();

	private int status = 0;

	public int getStatus() {
		return status;
	}

	public AlbumSearchResult setStatus(int status) {
		this.status = status;
		return this;
	}

	public List<String> getTipsList() {
		return tipsList;
	}

	public AlbumSearchResult setTipsList(List<String> tipsList) {
		this.tipsList = tipsList;
		return this;
	}

	private Integer completedSteps;

	private List<LangInfo> langs = new ArrayList<LangInfo>();

	public String getAlbumId() {
		return albumId;
	}

	public void setAlbumId(String albumId) {
		this.albumId = albumId;
	}

	public String getAlbumName() {
		return albumName;
	}

	public void setAlbumName(String albumName) {
		this.albumName = albumName;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public String getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
	}

	public String getCreateUser() {
		return createUser;
	}

	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}

	public String getUpdateUser() {
		return updateUser;
	}

	public void setUpdateUser(String updateUser) {
		this.updateUser = updateUser;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getAlbumInfo() {
		return albumInfo;
	}

	public void setAlbumInfo(String albumInfo) {
		this.albumInfo = albumInfo;
	}
	
	public String getAlbumDetail() {
		return albumDetail;
	}

	public void setAlbumDetail(String albumDetail) {
		this.albumDetail = albumDetail;
	}

	public String getThumbnailUrl() {
		return thumbnailUrl;
	}

	public void setThumbnailUrl(String thumbnailUrl) {
		this.thumbnailUrl = thumbnailUrl;
	}

	public static final class LangInfo implements Serializable {
		private static final long serialVersionUID = 1L;

		private String lang;
		private String createDate;
		private String updateDate;
		
		public String getLang() {
			return lang;
		}
		public void setLang(String lang) {
			this.lang = lang;
		}
		public String getCreateDate() {
			return createDate;
		}
		public void setCreateDate(String createDate) {
			this.createDate = createDate;
		}
		public String getUpdateDate() {
			return updateDate;
		}
		public void setUpdateDate(String updateDate) {
			this.updateDate = updateDate;
		}
	}



	public List<LangInfo> getLangs() {
		return langs;
	}

	public void setLangs(List<LangInfo> langs) {
		this.langs = langs;
	}

	public Integer getCompletedSteps() {
		return completedSteps;
	}

	public void setCompletedSteps(Integer completedSteps) {
		this.completedSteps = completedSteps;
	}
}
