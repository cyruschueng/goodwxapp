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
@Table(name="VENDOR_MTA")
public class VendorMta extends AbstractBaseEntity  {
	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name="VENDOR_ID")
	private String vendorId;
	
	@Column(name="SECRETE_ID")
	private String secreteId;
	
	public VendorMta() {
	}

	public String getVendorId() {
		return vendorId;
	}

	public void setVendorId(String vendorId) {
		this.vendorId = vendorId;
	}

	public String getSecreteId() {
		return secreteId;
	}

	public void setSecreteId(String secreteId) {
		this.secreteId = secreteId;
	}


}