package com.visualbusiness.pano.process.model;

/**
 * Copyright (C) 2015 - 2017 MICROSCENE Inc., All Rights Reserved.
 *
 * @author: ray@visualbusiness.com
 * @date: 2017-06-13
 */
public class MesosTaskMessage<T extends MesosTask> {

    private String type;

    private String ver;

    private T task;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getVer() {
        return ver;
    }

    public void setVer(String ver) {
        this.ver = ver;
    }

    public T getTask() {
        return task;
    }

    public void setTask(T task) {
        this.task = task;
    }
}
