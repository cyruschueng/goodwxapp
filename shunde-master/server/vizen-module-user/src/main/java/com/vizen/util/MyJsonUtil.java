package com.vizen.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author: mark@visualbusiness.com
 * @date: 2017-12-06
 */

public final class MyJsonUtil {
    private static Logger logger = LoggerFactory.getLogger(MyJsonUtil.class);

    public MyJsonUtil() {
    }

    public static JSONObject success(Object model, String msg) {
        JSONObject result = new JSONObject();
        result.put("code", Integer.valueOf(0));
        result.put("data", JSON.toJSON(model));
        result.put("msg", msg);
        return result;
    }

    public static JSONObject success(String msg) {
        return success((Object)null, msg);
    }

    public static JSONObject success(Object model) {
        return success(model, "success");
    }

    public static JSONObject error(int code, String msg) {
        JSONObject result = new JSONObject();
        result.put("code", code);
        result.put("msg", msg);
        logger.error(result.toJSONString());
        return result;
    }

    public static JSONObject error(String msg) {
        return error(-1, msg);
    }
}
