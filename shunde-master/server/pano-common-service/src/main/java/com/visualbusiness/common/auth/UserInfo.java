package com.visualbusiness.common.auth;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class UserInfo implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String userId;
	private String userToken;
	private String userName;
	private String name;
	private List<String> roles = new ArrayList<String>();
	private List<String> permissions = new ArrayList<String>();
	private String vendor;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserToken() {
		return userToken;
	}
	public void setUserToken(String userToken) {
		this.userToken = userToken;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<String> getPermissions() {
		return permissions;
	}
	public void setPermissions(List<String> permissions) {
		this.permissions = permissions;
	}
	public List<String> getRoles() {
		return roles;
	}
	public void setRoles(List<String> roles) {
		this.roles = roles;
	}

	public String getVendor() {
		return vendor;
	}

	public void setVendor(String vendor) {
		this.vendor = vendor;
	}

	@Override
	public String toString() {
		return "UserInfo{" +
				"userId='" + userId + '\'' +
				", userToken='" + userToken + '\'' +
				", userName='" + userName + '\'' +
				", name='" + name + '\'' +
				", roles=" + roles +
				", permissions=" + permissions +
				", vendor='" + vendor + '\'' +
				'}';
	}
}
