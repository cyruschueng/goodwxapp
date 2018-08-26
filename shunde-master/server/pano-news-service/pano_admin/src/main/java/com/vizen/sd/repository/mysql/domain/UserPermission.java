package com.vizen.sd.repository.mysql.domain;

import java.io.Serializable;
import java.util.List;

public class UserPermission implements Serializable {
	private String menuId;
	private String menuName;
	private List<Resource> resources;

	public String getMenuId() {
		return menuId;
	}

	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}

	public String getMenuName() {
		return menuName;
	}

	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}

	public List<Resource> getResources() {
		return resources;
	}

	public void setResources(List<Resource> resources) {
		this.resources = resources;
	}

}
