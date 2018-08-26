package com.visualbusiness.qcloud.model;

import java.io.Serializable;

public class MtaVisit implements Serializable {
	private static final long serialVersionUID = 1L;

	private String pv;
	private String uv;
	private String vv;
	private String iv;
	public String getPv() {
		return pv;
	}
	public void setPv(String pv) {
		this.pv = pv;
	}
	public String getUv() {
		return uv;
	}
	public void setUv(String uv) {
		this.uv = uv;
	}
	public String getVv() {
		return vv;
	}
	public void setVv(String vv) {
		this.vv = vv;
	}
	public String getIv() {
		return iv;
	}
	public void setIv(String iv) {
		this.iv = iv;
	}
	

}
