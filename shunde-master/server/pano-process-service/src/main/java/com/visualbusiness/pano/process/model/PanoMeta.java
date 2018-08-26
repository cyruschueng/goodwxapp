package com.visualbusiness.pano.process.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.visualbusiness.common.model.AbstractBaseEntity;


/**
 * The persistent class for the PANO_META database table.
 * 
 */
@Entity
@Table(name="PANO_META")
public class PanoMeta extends AbstractBaseEntity  {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="PANO_META_ID")
	private Integer panoMetaId;

	@Column(name="PANO_ID")
	private String panoId;
	
	@Column(name="META_NAME")
	private String metaName;
	
	@Column(name="META_VALUE")
	private String metaValue;
	
	public PanoMeta() {
	}

	public Integer getPanoMetaId() {
		return panoMetaId;
	}

	public void setPanoMetaId(Integer panoMetaId) {
		this.panoMetaId = panoMetaId;
	}

	public String getPanoId() {
		return panoId;
	}

	public void setPanoId(String panoId) {
		this.panoId = panoId;
	}

	public String getMetaName() {
		return metaName;
	}

	public void setMetaName(String metaName) {
		this.metaName = metaName;
	}

	public String getMetaValue() {
		return metaValue;
	}

	public void setMetaValue(String metaValue) {
		this.metaValue = metaValue;
	}

	
}