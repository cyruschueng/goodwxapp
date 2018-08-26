package com.visualbusiness.common.auth;

import org.apache.shiro.authc.RememberMeAuthenticationToken;

public class LunaTokenUniqueIdToken implements RememberMeAuthenticationToken {

	private String token;
	private String uniqueId;
	private boolean rememberMe;
	
	public LunaTokenUniqueIdToken() {
	}

	public LunaTokenUniqueIdToken(String token, String uniqueId) {
		this(token, uniqueId, false);
	}
	
	public LunaTokenUniqueIdToken(String token, String uniqueId, boolean rememberMe) {
		this.token = token;
		this.uniqueId = uniqueId;
		this.rememberMe = rememberMe;
	}

	@Override
	public Object getPrincipal() {
		return getUniqueId();
	}

	@Override
	public Object getCredentials() {
		return getToken();
	}

	@Override
	public boolean isRememberMe() {
		return rememberMe;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getUniqueId() {
		return uniqueId;
	}

	public void setUniqueId(String uniqueId) {
		this.uniqueId = uniqueId;
	}

	public void setRememberMe(boolean rememberMe) {
		this.rememberMe = rememberMe;
	}
	
}
