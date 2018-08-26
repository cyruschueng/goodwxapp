package com.visualbusiness.common.auth;

import com.alibaba.fastjson.JSONObject;
import com.visualbusiness.common.rest.RestException;
import com.visualbusiness.common.rest.RestResult;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.client.methods.HttpGet;
import org.junit.Test;

/**
 * Created by marui on 2017/3/15.
 */

public class TestLunaRequest {

    public static void main(String []args) {
        String url = "http://luna-test.visualbusiness.cn/luna-web/api/user";

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("unique_id", "ec5da382a58345c5b21028d257041103");
        jsonObject.put("ts", 1489549261201L);
        jsonObject.put("sign", "D7B9043B108181183D83677A0406225A");

        jsonObject.put("source", "company_media");
        jsonObject.put("offset", 0);
        jsonObject.put("limit", 10);
        LunaRequest<JSONObject> lunaRequest = new LunaRequest(new HttpGet(), url, jsonObject);
        try {
            LunaRestResult<JSONObject> result = lunaRequest.request();

            if ("0".equals(result.getCode())) {
                System.out.println(result.getData());
            } else {
                System.out.println("异常");
            }

        } catch (RestException e) {
            throw new RuntimeException(e);
        }
    }
}
