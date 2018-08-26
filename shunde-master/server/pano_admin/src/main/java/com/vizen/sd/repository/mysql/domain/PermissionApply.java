/*
 * Copyright (C) 2015 - 2017 Microscene Inc., All Rights Reserved.
 *
 */
package com.vizen.sd.repository.mysql.domain;

import com.vizen.framework.mybatis.BaseModel;
import java.io.Serializable;
import java.util.Date;

/**
 *
 * @author mark@visualbusiness.com
 * @date 2017-12-20
 *
 */
public class PermissionApply extends BaseModel implements Serializable {
    private Long applyId;

    /**
     * ������
     */
    private Long applyUserId;

    /**
     * �����
     */
    private Long auditUserId;

    /**
     * ����ʱ��
     */
    private Date createTime;

    /**
     * ���ʱ��
     */
    private Date auditTime;

    /**
     * ״̬
     */
    private Byte status;

    /**
     * ������Ϣ
     */
    private String description;

    /**
     * ����Ȩ�޵ȼ�
     */
    private Byte applyRoleType;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table permission_apply
     */
    private static final long serialVersionUID = 1L;

    /**
     * @return apply_id
     */
    public Long getApplyId() {
        return applyId;
    }

    /**
     * @param applyId
     */
    public void setApplyId(Long applyId) {
        this.applyId = applyId;
    }

    /**
     * ��ȡ������
     *
     * @return apply_user_id - ������
     */
    public Long getApplyUserId() {
        return applyUserId;
    }

    /**
     * ����������
     *
     * @param applyUserId ������
     */
    public void setApplyUserId(Long applyUserId) {
        this.applyUserId = applyUserId;
    }

    /**
     * ��ȡ�����
     *
     * @return audit_user_id - �����
     */
    public Long getAuditUserId() {
        return auditUserId;
    }

    /**
     * ���������
     *
     * @param auditUserId �����
     */
    public void setAuditUserId(Long auditUserId) {
        this.auditUserId = auditUserId;
    }

    /**
     * ��ȡ����ʱ��
     *
     * @return create_time - ����ʱ��
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * ���ô���ʱ��
     *
     * @param createTime ����ʱ��
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * ��ȡ���ʱ��
     *
     * @return audit_time - ���ʱ��
     */
    public Date getAuditTime() {
        return auditTime;
    }

    /**
     * �������ʱ��
     *
     * @param auditTime ���ʱ��
     */
    public void setAuditTime(Date auditTime) {
        this.auditTime = auditTime;
    }

    /**
     * ��ȡ״̬
     *
     * @return status - ״̬
     */
    public Byte getStatus() {
        return status;
    }

    /**
     * ����״̬
     *
     * @param status ״̬
     */
    public void setStatus(Byte status) {
        this.status = status;
    }

    /**
     * ��ȡ������Ϣ
     *
     * @return description - ������Ϣ
     */
    public String getDescription() {
        return description;
    }

    /**
     * ����������Ϣ
     *
     * @param description ������Ϣ
     */
    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    /**
     * ��ȡ����Ȩ�޵ȼ�
     *
     * @return apply_role_type - ����Ȩ�޵ȼ�
     */
    public Byte getApplyRoleType() {
        return applyRoleType;
    }

    /**
     * ��������Ȩ�޵ȼ�
     *
     * @param applyRoleType ����Ȩ�޵ȼ�
     */
    public void setApplyRoleType(Byte applyRoleType) {
        this.applyRoleType = applyRoleType;
    }

    @Override
    public String toString() {
        return "PermissionApply [applyId=" + applyId + ",applyUserId=" + applyUserId + ",auditUserId=" + auditUserId + ",createTime=" + createTime + ",auditTime=" + auditTime + ",status=" + status + ",description=" + description + ",applyRoleType=" + applyRoleType + "->" + super.toString() + "]";
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table permission_apply
     */
    @Override
    public boolean equals(Object that) {
        if (this == that) {
            return true;
        }
        if (that == null) {
            return false;
        }
        if (getClass() != that.getClass()) {
            return false;
        }
        PermissionApply other = (PermissionApply) that;
        return (this.getApplyId() == null ? other.getApplyId() == null : this.getApplyId().equals(other.getApplyId()))
            && (this.getApplyUserId() == null ? other.getApplyUserId() == null : this.getApplyUserId().equals(other.getApplyUserId()))
            && (this.getAuditUserId() == null ? other.getAuditUserId() == null : this.getAuditUserId().equals(other.getAuditUserId()))
            && (this.getCreateTime() == null ? other.getCreateTime() == null : this.getCreateTime().equals(other.getCreateTime()))
            && (this.getAuditTime() == null ? other.getAuditTime() == null : this.getAuditTime().equals(other.getAuditTime()))
            && (this.getStatus() == null ? other.getStatus() == null : this.getStatus().equals(other.getStatus()))
            && (this.getDescription() == null ? other.getDescription() == null : this.getDescription().equals(other.getDescription()))
            && (this.getApplyRoleType() == null ? other.getApplyRoleType() == null : this.getApplyRoleType().equals(other.getApplyRoleType()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table permission_apply
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getApplyId() == null) ? 0 : getApplyId().hashCode());
        result = prime * result + ((getApplyUserId() == null) ? 0 : getApplyUserId().hashCode());
        result = prime * result + ((getAuditUserId() == null) ? 0 : getAuditUserId().hashCode());
        result = prime * result + ((getCreateTime() == null) ? 0 : getCreateTime().hashCode());
        result = prime * result + ((getAuditTime() == null) ? 0 : getAuditTime().hashCode());
        result = prime * result + ((getStatus() == null) ? 0 : getStatus().hashCode());
        result = prime * result + ((getDescription() == null) ? 0 : getDescription().hashCode());
        result = prime * result + ((getApplyRoleType() == null) ? 0 : getApplyRoleType().hashCode());
        return result;
    }
}