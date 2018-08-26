package com.visualbusiness.pano.news.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;


/**
 * The persistent class for the PANO_WITH_GROUP_INFO database table.
 * 
 */
@Entity
@Table(name="PANO_WITH_GROUP_INFO")
public class PanoWithGroupInfo implements Serializable  {
	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name="PANO_ID")
	private String panoId;

	@Column(name="PANO_NAME")
	private String panoName;
	
	@Column(name="PANO_INFO")
	private String panoInfo;
	
	@Column(name="GROUP_NAME")
	private String groupName;
	
	@Column(name="PARENT_GROUP_NAME")
	private String parentGroupName;
	
	private String lat;
	
	private String lng;
	
	private String heading;
	
	private String pitch;

	@Column(name="DAY_NIGHT")
	private String dayNight;

	private String season;

	@Column(name="VIEW_ANGLE")
	private String viewAngle;

	@Column(name="CAPTURE_TIME")
	private String captureTime;
	
	public PanoWithGroupInfo() {
	}

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

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getParentGroupName() {
		return parentGroupName;
	}

	public void setParentGroupName(String parentGroupName) {
		this.parentGroupName = parentGroupName;
	}

	public String getCaptureTime() {
		return captureTime;
	}

	public void setCaptureTime(String captureTime) {
		this.captureTime = captureTime;
	}

	public String getLat() {
		return lat;
	}

	public void setLat(String lat) {
		this.lat = lat;
	}

	public String getLng() {
		return lng;
	}

	public void setLng(String lng) {
		this.lng = lng;
	}

	public String getHeading() {
		return heading;
	}

	public void setHeading(String heading) {
		this.heading = heading;
	}

	public String getPitch() {
		return pitch;
	}

	public void setPitch(String pitch) {
		this.pitch = pitch;
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
	
	
}