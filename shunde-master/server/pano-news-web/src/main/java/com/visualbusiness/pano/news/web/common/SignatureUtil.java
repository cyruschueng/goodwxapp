package com.visualbusiness.pano.news.web.common;

import com.alibaba.fastjson.JSONObject;
import com.google.gson.Gson;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;

/**
 * Copyright (C) 2015 - 2017 MICROSCENE Inc., All Rights Reserved.
 *
 * @author: shawn@visualbusiness.com
 * @date: 2017-02-21
 */
public class SignatureUtil {
    private final static Logger logger = Logger.getLogger(SignatureUtil.class);

    public static Boolean checkSign(JSONObject jsonData, String secretKey) {
        String signFromWX = jsonData.getString("sign");
        if(StringUtils.isBlank(signFromWX)) {
            return false;
        }
        String sign = reCalculateSign(jsonData, secretKey);
        return signFromWX.equals(sign);
    }

    public static String sign(JSONObject json, String key) {
        ArrayList<String> list = new ArrayList<String>();
        for (Map.Entry<String, Object> entry : json.entrySet()) {
            if (StringUtils.isNotBlank(entry.getValue().toString())) {
                list.add(entry.getKey() + "=" + entry.getValue() + "&");
            }
        }
        int size = list.size();
        String[] arrayToSort = list.toArray(new String[size]);
        Arrays.sort(arrayToSort, String.CASE_INSENSITIVE_ORDER);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < size; i++) {
            sb.append(arrayToSort[i]);
        }
        String result = sb.toString();
        result += "key=" + key;
        result = MD5.stringToMD5(result);
        if(StringUtils.isBlank(result)) {
            logger.error("Failed to sign message");
            return "";
        }
        return result.toUpperCase();
    }

    private static String reCalculateSign(JSONObject jsonData, String secretKey) {
        // 清掉返回数据对象里面的Sign数据（不能把这个数据也加进去进行签名），然后用签名算法进行签名
        JSONObject cloneObj = (JSONObject) jsonData.clone();
        cloneObj.put("sign", "");
        // 将API返回的数据根据用签名算法进行计算新的签名，用来跟API返回的签名进行比较
        return sign(cloneObj, secretKey);
    }

    public static void main(String[] args) {
        Gson json = new Gson();

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("unique_id", "ec5da382a58345c5b21028d257041103");
        long ts = System.currentTimeMillis();
        jsonObject.put("ts", ts);
        String sign = SignatureUtil.sign(jsonObject, "sdoiwelw%#432dsk");
        System.out.println(String.format("sign: %s, ts: %d", sign, ts));
    }
}
