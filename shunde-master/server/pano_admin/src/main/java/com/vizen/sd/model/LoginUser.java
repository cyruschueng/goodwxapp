package com.vizen.sd.model;

import com.vizen.framework.aop.AuthenticatedUser;

import java.io.Serializable;
import java.util.Date;

/**
 * 系统被认证的用户
 * 
 * 
 * @author Mark
 *
 */
public class LoginUser implements AuthenticatedUser, Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Long userId;

	private String userName;

	/**
	 * ����
	 */
	private String name;

	/**
	 * �ֻ��
	 */
	private String phone;

	/**
	 * ����
	 */
	private String email;

	/**
	 * ����
	 */
	private String password;

	/**
	 * ����ʱ��
	 */
	private Date createTime;

	/**
	 * �û�״̬Ԥ���ֶ�
	 */
	private Byte userStatus;

	/**
	 * ����
	 */
	private String description;

	/**
	 * �û���
	 */
	private String userCode;

	/**
	 * ����޸�ʱ��
	 */
	private Date lastEditTime;

	/**
	 * ������
	 */
	private Long createUserId;

	/**
	 * ����޸���
	 */
	private Long lastEditUserId;

	/**
	 * ��������id
	 */
	private Long departmentId;

	/**
	 * �߼�ɾ���ʶ(0��Ч:,1:��Ч)
	 */
	private Byte isValid;

	/**
	 * Ȩ�޽�ɫid
	 */
	private Byte roleId;

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
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

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Byte getUserStatus() {
		return userStatus;
	}

	public void setUserStatus(Byte userStatus) {
		this.userStatus = userStatus;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getUserCode() {
		return userCode;
	}

	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}

	public Date getLastEditTime() {
		return lastEditTime;
	}

	public void setLastEditTime(Date lastEditTime) {
		this.lastEditTime = lastEditTime;
	}

	public Long getCreateUserId() {
		return createUserId;
	}

	public void setCreateUserId(Long createUserId) {
		this.createUserId = createUserId;
	}

	public Long getLastEditUserId() {
		return lastEditUserId;
	}

	public void setLastEditUserId(Long lastEditUserId) {
		this.lastEditUserId = lastEditUserId;
	}

	public Long getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(Long departmentId) {
		this.departmentId = departmentId;
	}

	public Byte getIsValid() {
		return isValid;
	}

	public void setIsValid(Byte isValid) {
		this.isValid = isValid;
	}

	public Byte getRoleId() {
		return roleId;
	}

	public void setRoleId(Byte roleId) {
		this.roleId = roleId;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((createTime == null) ? 0 : createTime.hashCode());
		result = prime * result
				+ ((createUserId == null) ? 0 : createUserId.hashCode());
		result = prime * result
				+ ((departmentId == null) ? 0 : departmentId.hashCode());
		result = prime * result
				+ ((description == null) ? 0 : description.hashCode());
		result = prime * result + ((email == null) ? 0 : email.hashCode());
		result = prime * result + ((isValid == null) ? 0 : isValid.hashCode());
		result = prime * result
				+ ((lastEditTime == null) ? 0 : lastEditTime.hashCode());
		result = prime * result
				+ ((lastEditUserId == null) ? 0 : lastEditUserId.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result
				+ ((password == null) ? 0 : password.hashCode());
		result = prime * result + ((phone == null) ? 0 : phone.hashCode());
		result = prime * result + ((roleId == null) ? 0 : roleId.hashCode());
		result = prime * result
				+ ((userCode == null) ? 0 : userCode.hashCode());
		result = prime * result + ((userId == null) ? 0 : userId.hashCode());
		result = prime * result
				+ ((userName == null) ? 0 : userName.hashCode());
		result = prime * result
				+ ((userStatus == null) ? 0 : userStatus.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		LoginUser other = (LoginUser) obj;
		if (createTime == null) {
			if (other.createTime != null)
				return false;
		} else if (!createTime.equals(other.createTime))
			return false;
		if (createUserId == null) {
			if (other.createUserId != null)
				return false;
		} else if (!createUserId.equals(other.createUserId))
			return false;
		if (departmentId == null) {
			if (other.departmentId != null)
				return false;
		} else if (!departmentId.equals(other.departmentId))
			return false;
		if (description == null) {
			if (other.description != null)
				return false;
		} else if (!description.equals(other.description))
			return false;
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		if (isValid == null) {
			if (other.isValid != null)
				return false;
		} else if (!isValid.equals(other.isValid))
			return false;
		if (lastEditTime == null) {
			if (other.lastEditTime != null)
				return false;
		} else if (!lastEditTime.equals(other.lastEditTime))
			return false;
		if (lastEditUserId == null) {
			if (other.lastEditUserId != null)
				return false;
		} else if (!lastEditUserId.equals(other.lastEditUserId))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (password == null) {
			if (other.password != null)
				return false;
		} else if (!password.equals(other.password))
			return false;
		if (phone == null) {
			if (other.phone != null)
				return false;
		} else if (!phone.equals(other.phone))
			return false;
		if (roleId == null) {
			if (other.roleId != null)
				return false;
		} else if (!roleId.equals(other.roleId))
			return false;
		if (userCode == null) {
			if (other.userCode != null)
				return false;
		} else if (!userCode.equals(other.userCode))
			return false;
		if (userId == null) {
			if (other.userId != null)
				return false;
		} else if (!userId.equals(other.userId))
			return false;
		if (userName == null) {
			if (other.userName != null)
				return false;
		} else if (!userName.equals(other.userName))
			return false;
		if (userStatus == null) {
			if (other.userStatus != null)
				return false;
		} else if (!userStatus.equals(other.userStatus))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "LoginUser [userId=" + userId + ", userName=" + userName
				+ ", name=" + name + ", phone=" + phone + ", email=" + email
				+ ", password=" + password + ", createTime=" + createTime
				+ ", userStatus=" + userStatus + ", description=" + description
				+ ", userCode=" + userCode + ", lastEditTime=" + lastEditTime
				+ ", createUserId=" + createUserId + ", lastEditUserId="
				+ lastEditUserId + ", departmentId=" + departmentId
				+ ", isValid=" + isValid + ", roleId=" + roleId + "]";
	}
	
	
}