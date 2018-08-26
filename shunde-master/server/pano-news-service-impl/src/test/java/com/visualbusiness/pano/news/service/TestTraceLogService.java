package com.visualbusiness.pano.news.service;

import com.alibaba.fastjson.JSONObject;

/**
 * Created by marui on 2017/3/10.
 */
public class TestTraceLogService {

    public static void main(String[] args) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("time", null);

        Long a = jsonObject.getLong("time");
        if(a > 0) {
            System.out.println(a);
        }
        else {
            System.out.println("test");
        }
    }
}
