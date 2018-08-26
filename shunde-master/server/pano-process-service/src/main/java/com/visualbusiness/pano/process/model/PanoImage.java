package com.visualbusiness.pano.process.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.visualbusiness.common.model.AbstractBaseEntity;


/**
 * The persistent class for the PANO_IMAGE database table.
 * 
 */
@Entity
@Table(name="PANO_IMAGE")
public class PanoImage extends AbstractBaseEntity  {
	private static final long serialVersionUID = 1L;
	
	/**
	 * 原始图片上传未完成。
	 */
	public static final int STATUS_PRIMITIVE_UPLOAD_UNFINISHED = 0;

	/**
	 * 原始图片上传完成。
	 */
	public static final int STATUS_PRIMITIVE_UPLOAD_FINISHED = 10;

	/**
	 * 原始图片下载完成。
	 */
	public static final int STATUS_PRIMITIVE_DOWNLOAD_FINISHED = 20;

	/**
	 * 拼接完成。
	 */
	public static final int STATUS_STITCH_FINISHED = 30;

	/**
	 * 切分完成。
	 */
	public static final int STATUS_SPLIT_FINISHED = 40;

	/**
	 * 切片上传完成。
	 */
	public static final int STATUS_TILE_UPLOAD_FINISHED = 50;

	/**
	 * 拼接图上传完成。
	 */
	public static final int STATUS_STITCH_UPLOAD_FINISHED = 60;

	/**
	 * 拼接错误。
	 */
	public static final int STATUS_ERROR = 90;

	/**
	 * 阿里云上传腾讯云完成
	 */
	public static final int STATUS_PRIMITIVE_COS_UPLOAD_INISHED = 140;

	/**
	 * 自动拼接原始图上传完成
	 */
	public static final int STATUS_PRIMITIVE_OSS_UPLOAD_UNFINISHED = 110;



	@Id
	@Column(name="PANO_ID")
	private String panoId;
	
	@Column(name="PANO_META")
	private String panoMeta;
	
	private String vendor;

	private Integer status;
	
	private String thumbnail;

	public PanoImage() {
	}

	public String getPanoId() {
		return this.panoId;
	}

	public void setPanoId(String panoId) {
		this.panoId = panoId;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Integer getStatus() {
		return status;
	}

	public String getThumbnail() {
		return thumbnail;
	}

	public void setThumbnail(String thumbnail) {
		this.thumbnail = thumbnail;
	}

	public String getPanoMeta() {
		return panoMeta;
	}

	public void setPanoMeta(String panoMeta) {
		this.panoMeta = panoMeta;
	}

	public String getVendor() {
		return vendor;
	}

	public void setVendor(String vendor) {
		this.vendor = vendor;
	}

	
}