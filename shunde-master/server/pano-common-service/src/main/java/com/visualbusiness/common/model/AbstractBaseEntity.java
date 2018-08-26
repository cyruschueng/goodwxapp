package com.visualbusiness.common.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Version;

@MappedSuperclass
public abstract class AbstractBaseEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Column(name="CREATE_TIME_MILLIS", updatable=false)
	private long createTimeMillis;
	
	@Column(name="UPDATE_TIME_MILLIS")
	private long updateTimeMillis;
	
	@Version
	@Column(name="OPT_VERSION")
	private int optVersion;
	
	//
	
	@PrePersist
	protected void prePersist() {
		setCreateTimeMillis(System.currentTimeMillis());
	}

	@PreUpdate
	protected void preUpdate() {
		setUpdateTimeMillis(System.currentTimeMillis());
	}
	
	//
	
	public long getCreateTimeMillis() {
		return createTimeMillis;
	}

	protected void setCreateTimeMillis(long createTimeMillis) {
		this.createTimeMillis = createTimeMillis;
	}

	public long getUpdateTimeMillis() {
		return updateTimeMillis;
	}

	protected void setUpdateTimeMillis(long updateTimeMillis) {
		this.updateTimeMillis = updateTimeMillis;
	}

	public int getOptVersion() {
		return optVersion;
	}

	protected void setOptVersion(int optVersion) {
		this.optVersion = optVersion;
	}

}