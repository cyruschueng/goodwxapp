package com.visualbusiness.pano.process.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.visualbusiness.common.model.AbstractBaseEntity;


/**
 * The persistent class for the PTO_TEMPLATE database table.
 * 
 */
@Entity
@Table(name="PTO_TEMPLATE")
public class PtoTemplate extends AbstractBaseEntity  {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="PTO_TEMPLATE_ID")
	private Integer ptoTemplateId;

	@Column(name="DEVICE_ID")
	private String deviceId;
	
	private String template;

	private String ptoType;

	public String getPtoType() {
		return ptoType;
	}

	public void setPtoType(String ptoType) {
		this.ptoType = ptoType;
	}

	public PtoTemplate() {
	}

	public Integer getPtoTemplateId() {
		return ptoTemplateId;
	}

	public void setPtoTemplateId(Integer ptoTemplateId) {
		this.ptoTemplateId = ptoTemplateId;
	}

	public String getDeviceId() {
		return deviceId;
	}

	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}

	public String getTemplate() {
		return template;
	}

	public void setTemplate(String template) {
		this.template = template;
	}


}