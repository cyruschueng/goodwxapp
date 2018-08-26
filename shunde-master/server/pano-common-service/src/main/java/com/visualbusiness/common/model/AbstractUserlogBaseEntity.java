package com.visualbusiness.common.model;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class AbstractUserlogBaseEntity extends AbstractBaseEntity {
	private static final long serialVersionUID = 1L;

	@Column(name="CREATE_USER", updatable=false)
	private String createUser;
	
	@Column(name="UPDATE_USER")
	private String updateUser;

	public String getCreateUser() {
		return createUser;
	}

	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}

	public String getUpdateUser() {
		return updateUser;
	}

	public void setUpdateUser(String updateUser) {
		this.updateUser = updateUser;
	}


}