package com.visualbusiness.pano.process.model;


import java.io.Serializable;

/**
 * Copyright (C) 2015 - 2017 MICROSCENE Inc., All Rights Reserved.
 *
 * @author: ray@visualbusiness.com
 * @date: 2017-06-13
 */
public class MesosTask implements Serializable{

    /**
     * 任务编号
     */
    private String mTaskId;

    /**
     * 任务名称
     */
    private String taskName;

    /**
     * 角色
     */
    private String role;

    /**
     * 执行command
     */
    private String execCommand;

    /**
     * 存储基础的部分command
     */
    private String taskCommand;

    /**
     * 需要的CPU数量
     */
    private Float cpus;

    /**
     * gpu数量
     */
    private Integer gpus;

    /**
     * 需要的内存数量
     */
    private Float mem;

    private String sourceQueueName;
    private String sourceHandle;

    public String getmTaskId() {
        return mTaskId;
    }

    public void setmTaskId(String mTaskId) {
        this.mTaskId = mTaskId;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getExecCommand() {
        return execCommand;
    }

    public void setExecCommand(String execCommand) {
        this.execCommand = execCommand;
    }

    public Integer getGpus() {
        return gpus;
    }

    public void setGpus(Integer gpus) {
        this.gpus = gpus;
    }

    public Float getCpus() {
        return cpus;
    }

    public void setCpus(Float cpus) {
        this.cpus = cpus;
    }

    public Float getMem() {
        return mem;
    }

    public void setMem(Float mem) {
        this.mem = mem;
    }

    public String getTaskCommand() {
        return taskCommand;
    }

    public void setTaskCommand(String taskCommand) {
        this.taskCommand = taskCommand;
    }

    public String getSourceQueueName() {
        return sourceQueueName;
    }

    public void setSourceQueueName(String sourceQueueName) {
        this.sourceQueueName = sourceQueueName;
    }

    public String getSourceHandle() {
        return sourceHandle;
    }

    public void setSourceHandle(String sourceHandle) {
        this.sourceHandle = sourceHandle;
    }
}
