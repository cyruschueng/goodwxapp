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
@Table(name="MTA_INFO")
public class MtaInfo extends AbstractBaseEntity  {
	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name="SECRETE_ID")
	private String secreteId;
	
	@Column(name="SECRETE_KEY")
	private String secreteKey;
	
	private String sid;
	
	private String cid;
	
	public MtaInfo() {
	}

	public String getSecreteId() {
		return secreteId;
	}

	public void setSecreteId(String secreteId) {
		this.secreteId = secreteId;
	}

	public String getSecreteKey() {
		return secreteKey;
	}

	public void setSecreteKey(String secreteKey) {
		this.secreteKey = secreteKey;
	}

	public String getSid() {
		return sid;
	}

	public void setSid(String sid) {
		this.sid = sid;
	}

	public String getCid() {
		return cid;
	}

	public void setCid(String cid) {
		this.cid = cid;
	}


}