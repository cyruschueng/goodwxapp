package com.visualbusiness.pano.process.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


/**
 * The persistent class for the ACCESS_CODE database table.
 * 
 */
@Entity
@Table(name="ACCESS_CODE")
public class AccessCode implements Serializable  {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="ACCESS_CODE")
	private String accessCode;

	public AccessCode() {
	}

	public String getAccessCode() {
		return this.accessCode;
	}

	public void setAccessCode(String accessCode) {
		this.accessCode = accessCode;
	}

}