package com.visualbusiness.pano.news.model;

import com.visualbusiness.common.model.AbstractUserlogBaseEntity;

import javax.persistence.*;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by marui on 2017/3/10.
 */
@Entity
@Table(name = "OPERATION_RECORD")
public class OperationRecord extends AbstractUserlogBaseEntity {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "OPERATION_RECORD_ID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer operationRecordId;



    @Column(name = "MODEL_ID")
    private String modelId;

    @Column(name = "MODEL_TYPE")
    private int modelType;

    private String vendor;

    private String status;

    private String content;

    @Transient
    private Map<Integer, String> statusMap = initStatusMap();

    private Map<Integer, String> initStatusMap(){
        Map<Integer, String> statusMap = new HashMap<>();
        statusMap.put(0, "draft");
        statusMap.put(1, "released");
        statusMap.put(2, "deleted");
        statusMap.put(3, "retraction");
        return statusMap;
    }

    public OperationRecord() {

    }

    public OperationRecord(String modelId, int modelType, String vendor, int status, String content, String createUser) {
        this.modelId = modelId;
        this.modelType = modelType;
        this.vendor = vendor;
        this.status = statusMap.get(status);
        this.content = content;
        setCreateUser(createUser);
    }

    public Integer getOperationRecordId() {
        return operationRecordId;
    }

    public void setOperationRecordId(Integer operationRecordId) {
        this.operationRecordId = operationRecordId;
    }

    public String getModelId() {
        return modelId;
    }

    public void setModelId(String modelId) {
        this.modelId = modelId;
    }

    public int getModelType() {
        return modelType;
    }

    public void setModelType(int modelType) {
        this.modelType = modelType;
    }

    public String getVendor() {
        return vendor;
    }

    public void setVendor(String vendor) {
        this.vendor = vendor;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }


}
