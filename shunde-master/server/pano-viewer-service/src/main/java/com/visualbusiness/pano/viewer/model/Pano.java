package com.visualbusiness.pano.viewer.model;

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

//	public static class Marker implements Serializable {
//
//		private String url;
//		private String urlName;
//		private String panoName;
//		private String panoNameEng;
//		private String panoId;
//		private String albumId;
//		private String heading;
//		private String pitch;
//		private String anchorX;
//		private String anchorY;
//		private String width;
//		private String height;
//		private String mtype;
//		private String htmlName;
//		private String htmlStr;
//		private String video;
//		private String radio;
//		private String label;
//		private String startTime;
//		private String endTime;
//
//		public String getUrl() {
//			return url;
//		}
//		public void setUrl(String url) {
//			this.url = url;
//		}
//		public String getUrlName() {
//			return urlName;
//		}
//		public void setUrlName(String urlName) {
//			this.urlName = urlName;
//		}
//		public String getPanoName() {
//			return panoName;
//		}
//		public void setPanoName(String panoName) {
//			this.panoName = panoName;
//		}
//		public String getPanoId() {
//			return panoId;
//		}
//		public void setPanoId(String panoId) {
//			this.panoId = panoId;
//		}
//		public String getAlbumId() {
//			return albumId;
//		}
//		public void setAlbumId(String albumId) {
//			this.albumId = albumId;
//		}
//		public String getHeading() {
//			return heading;
//		}
//		public void setHeading(String heading) {
//			this.heading = heading;
//		}
//		public String getPitch() {
//			return pitch;
//		}
//		public void setPitch(String pitch) {
//			this.pitch = pitch;
//		}
//		public String getAnchorX() {
//			return anchorX;
//		}
//		public void setAnchorX(String anchorX) {
//			this.anchorX = anchorX;
//		}
//		public String getAnchorY() {
//			return anchorY;
//		}
//		public void setAnchorY(String anchorY) {
//			this.anchorY = anchorY;
//		}
//		public String getWidth() {
//			return width;
//		}
//		public void setWidth(String width) {
//			this.width = width;
//		}
//		public String getHeight() {
//			return height;
//		}
//		public void setHeight(String height) {
//			this.height = height;
//		}
//		public String getMtype() {
//			return mtype;
//		}
//		public void setMtype(String mtype) {
//			this.mtype = mtype;
//		}
//		public String getPanoNameEng() {
//			return panoNameEng;
//		}
//		public void setPanoNameEng(String panoNameEng) {
//			this.panoNameEng = panoNameEng;
//		}
//		public String getHtmlName() {
//			return htmlName;
//		}
//		public void setHtmlName(String htmlName) {
//			this.htmlName = htmlName;
//		}
//		public String getHtmlStr() {
//			return htmlStr;
//		}
//		public void setHtmlStr(String htmlStr) {
//			this.htmlStr = htmlStr;
//		}
//		public String getVideo() {
//			return video;
//		}
//		public void setVideo(String video) {
//			this.video = video;
//		}
//		public String getRadio() {
//			return radio;
//		}
//		public void setRadio(String radio) {
//			this.radio = radio;
//		}
//		public String getLabel() {
//			return label;
//		}
//		public void setLabel(String label) {
//			this.label = label;
//		}
//		public String getStartTime() {
//			return startTime;
//		}
//		public void setStartTime(String startTime) {
//			this.startTime = startTime;
//		}
//		public String getEndTime() {
//			return endTime;
//		}
//		public void setEndTime(String endTime) {
//			this.endTime = endTime;
//		}
//
//	}

}
