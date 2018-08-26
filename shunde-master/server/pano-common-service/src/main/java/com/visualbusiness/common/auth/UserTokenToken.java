package com.visualbusiness.common.auth;

import org.apache.shiro.authc.AuthenticationToken;

public class UserTokenToken implements AuthenticationToken {

	private String userName;
	
	private String userToken;
	
	public UserTokenToken() {
	}

	public UserTokenToken(String userToken) {
		this.userToken = userToken;
	}

	@Override
	public Object getPrincipal() {
		return getUserName();
	}

	@Override
	public Object getCredentials() {
		return getUserToken();
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserToken() {
		return userToken;
	}

	public void setUserToken(String userToken) {
		this.userToken = userToken;
	}

}
