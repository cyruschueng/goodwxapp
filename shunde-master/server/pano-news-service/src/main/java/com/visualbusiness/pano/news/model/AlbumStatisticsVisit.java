package com.visualbusiness.pano.news.model;

import com.visualbusiness.qcloud.model.MtaVisit;

import java.io.Serializable;
import java.util.Map;

public class AlbumStatisticsVisit implements Serializable {
	private static final long serialVersionUID = 1L;

	private String albumId;
	
	private String albumName;

	private MtaVisit todayVisit;

	private Integer newsStatus;

	private Map<String, MtaVisit> historyVisits;

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

	public MtaVisit getTodayVisit() {
		return todayVisit;
	}

	public void setTodayVisit(MtaVisit todayVisit) {
		this.todayVisit = todayVisit;
	}

	public Map<String, MtaVisit> getHistoryVisits() {
		return historyVisits;
	}

	public void setHistoryVisits(Map<String, MtaVisit> historyVisits) {
		this.historyVisits = historyVisits;
	}

	public Integer getNewsStatus() {
		return newsStatus;
	}

	public void setNewsStatus(Integer newsStatus) {
		this.newsStatus = newsStatus;
	}
}
