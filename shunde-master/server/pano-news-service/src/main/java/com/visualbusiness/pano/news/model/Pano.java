package com.visualbusiness.pano.news.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class Pano implements Serializable {
	private static final long serialVersionUID = 1L;

	private String panoId;
	private String panoName;
	private String panoInfo;
	private String captureDate;
	private double lat;
	private double lng;
	private double panoHeading;
	private double panoPitch;
	private String thumbnailUrl;
	private String dayNight;
	private String season;
	private String viewAngle;
	private String isWithMarkers;
	private List<Map<String, String>> markers = new ArrayList<Map<String, String>>();
	//相册包含用属性
	private String albumIncludedId;
	private String albumName;
	private String type;

	public String getPanoId() {
		return panoId;
	}
	public void setPanoId(String panoId) {
		this.panoId = panoId;
	}
	public String getPanoName() {
		return panoName;
	}
	public void setPanoName(String panoName) {
		this.panoName = panoName;
	}
	public String getPanoInfo() {
		return panoInfo;
	}
	public void setPanoInfo(String panoInfo) {
		this.panoInfo = panoInfo;
	}
	public String getCaptureDate() {
		return captureDate;
	}
	public void setCaptureDate(String captureDate) {
		this.captureDate = captureDate;
	}
	public String getThumbnailUrl() {
		return thumbnailUrl;
	}
	public void setThumbnailUrl(String thumbnailUrl) {
		this.thumbnailUrl = thumbnailUrl;
	}
	public double getLat() {
		return lat;
	}
	public void setLat(double lat) {
		this.lat = lat;
	}
	public double getLng() {
		return lng;
	}
	public void setLng(double lng) {
		this.lng = lng;
	}
	public double getPanoHeading() {
		return panoHeading;
	}
	public void setPanoHeading(double panoHeading) {
		this.panoHeading = panoHeading;
	}
	public double getPanoPitch() {
		return panoPitch;
	}
	public void setPanoPitch(double panoPitch) {
		this.panoPitch = panoPitch;
	}
	public String getDayNight() {
		return dayNight;
	}
	public void setDayNight(String dayNight) {
		this.dayNight = dayNight;
	}
	public String getSeason() {
		return season;
	}
	public void setSeason(String season) {
		this.season = season;
	}
	public String getViewAngle() {
		return viewAngle;
	}
	public void setViewAngle(String viewAngle) {
		this.viewAngle = viewAngle;
	}
	public String getIsWithMarkers() {
		return isWithMarkers;
	}
	public void setIsWithMarkers(String isWithMarkers) {
		this.isWithMarkers = isWithMarkers;
	}
	public List<Map<String, String>> getMarkers() {
		return markers;
	}
	public void setMarkers(List<Map<String, String>> markers) {
		this.markers = markers;
	}

	public String getAlbumIncludedId() {
		return albumIncludedId;
	}
	public void setAlbumIncludedId(String albumIncludedId) {
		this.albumIncludedId = albumIncludedId;
	}
	public String getAlbumName() {
		return albumName;
	}
	public void setAlbumName(String albumName) {
		this.albumName = albumName;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}

}
