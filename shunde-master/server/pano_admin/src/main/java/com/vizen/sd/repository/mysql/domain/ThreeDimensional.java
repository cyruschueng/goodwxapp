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
public class ThreeDimensional extends BaseModel implements Serializable {
    private String threeDimensionalId;

    /**
     * ����
     */
    private String threeDimensionalName;

    /**
     * ���
     */
    private Long area;

    /**
     * �ֱ���(����)
     */
    private Long resolutionRatio;

    /**
     * γ��
     */
    private String latitude;

    /**
     * ����
     */
    private String longitude;

    /**
     * ����
     */
    private String description;

    /**
     * ����ͼurl
     */
    private String thumbnailUrl;

    /**
     * ��ά��url
     */
    private String qrcodeUrl;

    /**
     * �߼�ɾ����ʶ(0��Ч:,1:��Ч)
     */
    private Byte isValid;

    /**
     * ����ʱ��
     */
    private Date createTime;

    /**
     * �޸�ʱ��
     */
    private Date modifyTime;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table three_dimensional
     */
    private static final long serialVersionUID = 1L;

    /**
     * @return three_dimensional_id
     */
    public String getThreeDimensionalId() {
        return threeDimensionalId;
    }

    /**
     * @param threeDimensionalId
     */
    public void setThreeDimensionalId(String threeDimensionalId) {
        this.threeDimensionalId = threeDimensionalId == null ? null : threeDimensionalId.trim();
    }

    /**
     * ��ȡ����
     *
     * @return three_dimensional_name - ����
     */
    public String getThreeDimensionalName() {
        return threeDimensionalName;
    }

    /**
     * ��������
     *
     * @param threeDimensionalName ����
     */
    public void setThreeDimensionalName(String threeDimensionalName) {
        this.threeDimensionalName = threeDimensionalName == null ? null : threeDimensionalName.trim();
    }

    /**
     * ��ȡ���
     *
     * @return area - ���
     */
    public Long getArea() {
        return area;
    }

    /**
     * �������
     *
     * @param area ���
     */
    public void setArea(Long area) {
        this.area = area;
    }

    /**
     * ��ȡ�ֱ���(����)
     *
     * @return resolution_ratio - �ֱ���(����)
     */
    public Long getResolutionRatio() {
        return resolutionRatio;
    }

    /**
     * ���÷ֱ���(����)
     *
     * @param resolutionRatio �ֱ���(����)
     */
    public void setResolutionRatio(Long resolutionRatio) {
        this.resolutionRatio = resolutionRatio;
    }

    /**
     * ��ȡγ��
     *
     * @return latitude - γ��
     */
    public String getLatitude() {
        return latitude;
    }

    /**
     * ����γ��
     *
     * @param latitude γ��
     */
    public void setLatitude(String latitude) {
        this.latitude = latitude == null ? null : latitude.trim();
    }

    /**
     * ��ȡ����
     *
     * @return longitude - ����
     */
    public String getLongitude() {
        return longitude;
    }

    /**
     * ���þ���
     *
     * @param longitude ����
     */
    public void setLongitude(String longitude) {
        this.longitude = longitude == null ? null : longitude.trim();
    }

    /**
     * ��ȡ����
     *
     * @return description - ����
     */
    public String getDescription() {
        return description;
    }

    /**
     * ��������
     *
     * @param description ����
     */
    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    /**
     * ��ȡ����ͼurl
     *
     * @return thumbnail_url - ����ͼurl
     */
    public String getThumbnailUrl() {
        return thumbnailUrl;
    }

    /**
     * ��������ͼurl
     *
     * @param thumbnailUrl ����ͼurl
     */
    public void setThumbnailUrl(String thumbnailUrl) {
        this.thumbnailUrl = thumbnailUrl == null ? null : thumbnailUrl.trim();
    }

    /**
     * ��ȡ��ά��url
     *
     * @return qrcode_url - ��ά��url
     */
    public String getQrcodeUrl() {
        return qrcodeUrl;
    }

    /**
     * ���ö�ά��url
     *
     * @param qrcodeUrl ��ά��url
     */
    public void setQrcodeUrl(String qrcodeUrl) {
        this.qrcodeUrl = qrcodeUrl == null ? null : qrcodeUrl.trim();
    }

    /**
     * ��ȡ�߼�ɾ����ʶ(0��Ч:,1:��Ч)
     *
     * @return is_valid - �߼�ɾ����ʶ(0��Ч:,1:��Ч)
     */
    public Byte getIsValid() {
        return isValid;
    }

    /**
     * �����߼�ɾ����ʶ(0��Ч:,1:��Ч)
     *
     * @param isValid �߼�ɾ����ʶ(0��Ч:,1:��Ч)
     */
    public void setIsValid(Byte isValid) {
        this.isValid = isValid;
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
     * ��ȡ�޸�ʱ��
     *
     * @return modify_time - �޸�ʱ��
     */
    public Date getModifyTime() {
        return modifyTime;
    }

    /**
     * �����޸�ʱ��
     *
     * @param modifyTime �޸�ʱ��
     */
    public void setModifyTime(Date modifyTime) {
        this.modifyTime = modifyTime;
    }

    @Override
    public String toString() {
        return "ThreeDimensional [threeDimensionalId=" + threeDimensionalId + ",threeDimensionalName=" + threeDimensionalName + ",area=" + area + ",resolutionRatio=" + resolutionRatio + ",latitude=" + latitude + ",longitude=" + longitude + ",description=" + description + ",thumbnailUrl=" + thumbnailUrl + ",qrcodeUrl=" + qrcodeUrl + ",isValid=" + isValid + ",createTime=" + createTime + ",modifyTime=" + modifyTime + "->" + super.toString() + "]";
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table three_dimensional
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
        ThreeDimensional other = (ThreeDimensional) that;
        return (this.getThreeDimensionalId() == null ? other.getThreeDimensionalId() == null : this.getThreeDimensionalId().equals(other.getThreeDimensionalId()))
            && (this.getThreeDimensionalName() == null ? other.getThreeDimensionalName() == null : this.getThreeDimensionalName().equals(other.getThreeDimensionalName()))
            && (this.getArea() == null ? other.getArea() == null : this.getArea().equals(other.getArea()))
            && (this.getResolutionRatio() == null ? other.getResolutionRatio() == null : this.getResolutionRatio().equals(other.getResolutionRatio()))
            && (this.getLatitude() == null ? other.getLatitude() == null : this.getLatitude().equals(other.getLatitude()))
            && (this.getLongitude() == null ? other.getLongitude() == null : this.getLongitude().equals(other.getLongitude()))
            && (this.getDescription() == null ? other.getDescription() == null : this.getDescription().equals(other.getDescription()))
            && (this.getThumbnailUrl() == null ? other.getThumbnailUrl() == null : this.getThumbnailUrl().equals(other.getThumbnailUrl()))
            && (this.getQrcodeUrl() == null ? other.getQrcodeUrl() == null : this.getQrcodeUrl().equals(other.getQrcodeUrl()))
            && (this.getIsValid() == null ? other.getIsValid() == null : this.getIsValid().equals(other.getIsValid()))
            && (this.getCreateTime() == null ? other.getCreateTime() == null : this.getCreateTime().equals(other.getCreateTime()))
            && (this.getModifyTime() == null ? other.getModifyTime() == null : this.getModifyTime().equals(other.getModifyTime()));
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table three_dimensional
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getThreeDimensionalId() == null) ? 0 : getThreeDimensionalId().hashCode());
        result = prime * result + ((getThreeDimensionalName() == null) ? 0 : getThreeDimensionalName().hashCode());
        result = prime * result + ((getArea() == null) ? 0 : getArea().hashCode());
        result = prime * result + ((getResolutionRatio() == null) ? 0 : getResolutionRatio().hashCode());
        result = prime * result + ((getLatitude() == null) ? 0 : getLatitude().hashCode());
        result = prime * result + ((getLongitude() == null) ? 0 : getLongitude().hashCode());
        result = prime * result + ((getDescription() == null) ? 0 : getDescription().hashCode());
        result = prime * result + ((getThumbnailUrl() == null) ? 0 : getThumbnailUrl().hashCode());
        result = prime * result + ((getQrcodeUrl() == null) ? 0 : getQrcodeUrl().hashCode());
        result = prime * result + ((getIsValid() == null) ? 0 : getIsValid().hashCode());
        result = prime * result + ((getCreateTime() == null) ? 0 : getCreateTime().hashCode());
        result = prime * result + ((getModifyTime() == null) ? 0 : getModifyTime().hashCode());
        return result;
    }
}