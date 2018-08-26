package com.visualbusiness.pano.news.web.rest;

import com.alibaba.fastjson.JSONObject;
import com.visualbusiness.common.auth.*;
import com.visualbusiness.common.config.SystemConfig;
import com.visualbusiness.common.rest.RestException;
import com.visualbusiness.common.web.rest.RestResult;
import com.visualbusiness.pano.news.service.UserService;
import com.visualbusiness.pano.news.web.common.SignatureUtil;
import org.apache.commons.lang.StringUtils;
import org.apache.http.client.methods.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Copyright (C) 2015 - 2017 MICROSCENE Inc., All Rights Reserved.
 *
 * @author: ray@visualbusiness.com
 * @date: 2017-03-15
 */

@RestController
@RequestMapping("/user")
public class UserRestController {

    private static Logger logger = LogManager.getLogger(UserRestController.class);
    private static final String COMPANY_MEDIA_KEY = SystemConfig.getCompanyMediaKey();
    private static final String LUNA_API_BASE_URL = SystemConfig.getLunaApiBaseUrl();
    private final String COMPANY_MEDIA_TYPE = "company_media";
    private final int COMPANY_MEDIA_CATEGORY_ID = 7;

    @Autowired
    private UserService userService;




    /**
     * 获取邀请用户初始化数据
     * @return
     */
    @RequestMapping(method = RequestMethod.GET, value = "/invite", params = "data")
    @CrossOrigin
    public RestResult<JSONObject> inviteData() {
        JSONObject jsonObject = getSignedObject();
        String url = LUNA_API_BASE_URL + "/user/invite";
        jsonObject.put("data", null);
        LunaRequest<JSONObject> lunaRequest = new LunaRequest(new HttpGet(), url, jsonObject);
        try {
            LunaRestResult<JSONObject> result = lunaRequest.request();

            if ("0".equals(result.getCode())) {
                return RestResult.successResult(result.getData());
            } else {
                logger.info("获取创建用户初始数据失败, " + result.getMsg());
                return RestResult.errorResult("获取创建用户初始数据失败, " + result.getMsg());
            }

        } catch (RestException e) {
            logger.error(e);
            throw new RuntimeException(e);
        }
    }


    /**
     * 邀请用户
     * @param emails
     * @param roleId
     * @param auth
     * @return
     */
    @RequestMapping(method = RequestMethod.POST, value = "")
    @CrossOrigin
    public RestResult<JSONObject> invite(@RequestParam String emails,
                                             @RequestParam int roleId,
                                             @RequestParam String auth,
                                             @RequestParam int companyId) {
        if(StringUtils.isBlank(emails)) {
            return RestResult.errorResult("邮箱不能为空");
        }
        JSONObject jsonObject = getSignedObject();
        jsonObject.put("emails", emails);
        jsonObject.put("category_id", COMPANY_MEDIA_CATEGORY_ID);
        jsonObject.put("role_id", roleId);

        LunaUserInfo.Extra extra = new LunaUserInfo.Extra();
        extra.setAuth(auth);
        extra.setType(COMPANY_MEDIA_TYPE);
        extra.setValue(new int[]{companyId});

        jsonObject.put("extra", extra);

        String url = LUNA_API_BASE_URL+"/user";
        LunaRequest<JSONObject> lunaRequest = new LunaRequest(new HttpPost(), url, jsonObject);
        try {
            LunaRestResult<JSONObject> result = lunaRequest.request();

            if ("0".equals(result.getCode())) {
                return RestResult.successResult(result.getData());
            } else {
                logger.info("创建用户失败, " + result.getMsg());
                return RestResult.errorResult("创建用户失败, " + result.getMsg());
            }

        } catch (RestException e) {
            logger.error(e);
            throw new RuntimeException(e);
        }
    }


    /**
     * 获取管理的用户列表
     * @param offset
     * @param limit
     * @param keyword
     * @return
     */
    @RequestMapping(method = RequestMethod.GET, value = "")
    @CrossOrigin
    public RestResult<JSONObject> search(@RequestParam(defaultValue = "0") int offset,
                                             @RequestParam(defaultValue = "10") int limit,
                                             @RequestParam String keyword) {
        JSONObject jsonObject = getSignedObject();
        jsonObject.put("offset", offset);
        jsonObject.put("limit", limit);
        if(StringUtils.isNotBlank(keyword)) {
            jsonObject.put("keyword", keyword);
        }

        String url = LUNA_API_BASE_URL + "/user";

        LunaRequest<JSONObject> lunaRequest = new LunaRequest(new HttpGet(), url, jsonObject);
        try {
            LunaRestResult<JSONObject> result = lunaRequest.request();

            if ("0".equals(result.getCode())) {
                return RestResult.successResult(result.getData());
            } else {
                logger.info("用户查询失败, " + result.getMsg());
                return null;
            }

        } catch (RestException e) {
            logger.error(e);
            throw new RuntimeException(e);
        }
    }


    /**
     * 获取更新用户的初始化数据
     * @param id
     * @return
     */
    @RequestMapping(method = RequestMethod.GET, value = "/update/{id}", params = "data")
    @CrossOrigin
    public RestResult<JSONObject> updateData(@PathVariable String id) {


        String url = LUNA_API_BASE_URL + "user/" + id;
        JSONObject jsonObject = getSignedObject();
        jsonObject.put("data", null);
        LunaRequest<JSONObject> lunaRequest = new LunaRequest(new HttpGet(), url, jsonObject);
        try {
            LunaRestResult<JSONObject> result = lunaRequest.request();

            if ("0".equals(result.getCode())) {
                return RestResult.successResult(result.getData());
            } else {
                logger.info("获取用户待更新信息失败, " + result.getMsg());
                return RestResult.errorResult("获取用户待更新信息失败, " + result.getMsg());
            }

        } catch (RestException e) {
            logger.error(e);
            throw new RuntimeException(e);
        }
    }

    /**
     * 更新用户
     * @param id
     * @param extra
     * @param roleId
     * @return
     */
    @RequestMapping(method = RequestMethod.PUT, value = "/{id}")
    @CrossOrigin
    public RestResult<JSONObject> update(@PathVariable String id,
                                         @RequestParam String extra,
                                         @RequestParam String roleId) {

        JSONObject jsonObject = new JSONObject();
        String uniqueId = UserAuth.getCurrentUserInfo().getUserId();
        jsonObject.put("unique_id", uniqueId);
        long ts = System.currentTimeMillis();
        jsonObject.put("ts", ts);
        String sign = SignatureUtil.sign(jsonObject, COMPANY_MEDIA_KEY);
        jsonObject.put("sign", sign);
        jsonObject.put("source", COMPANY_MEDIA_TYPE);

        jsonObject.put("extra", extra);
        jsonObject.put("role_id", roleId);

        String url = LUNA_API_BASE_URL + "/user/" + id;
        LunaRequest<JSONObject> lunaRequest = new LunaRequest(new HttpPut(), url, jsonObject);
        try {
            LunaRestResult<JSONObject> result = lunaRequest.request();

            if ("0".equals(result.getCode())) {
                //TODO 更新用户缓存
                return RestResult.successResult(result.getData());
            } else {
                logger.info("更新用户失败, " + result.getMsg());
                return null;
            }

        } catch (RestException e) {
            logger.error(e);
            throw new RuntimeException(e);
        }
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    @CrossOrigin
    public RestResult<JSONObject> delete(@PathVariable String id) {

        JSONObject jsonObject = getSignedObject();
        jsonObject.put("id", id);

        String url = LUNA_API_BASE_URL + "/user/{id}";
        LunaRequest<JSONObject> lunaRequest = new LunaRequest(new HttpDelete(), url, jsonObject);
        try {
            LunaRestResult<JSONObject> result = lunaRequest.request();

            if ("0".equals(result.getCode())) {
                //删除ID用户的缓存
                UserAuth.deleteCachedUserInfo(id);
                return RestResult.successResult(result.getData());
            } else {
                logger.info("删除用户失败, " + result.getMsg());
                return null;
            }

        } catch (RestException e) {
            logger.error(e);
            throw new RuntimeException(e);
        }
    }

    @RequestMapping("/changeStatus/{id}")
    public RestResult<JSONObject> changeStatus(@PathVariable String id,
                                               @RequestParam String status) {
        if(StringUtils.isBlank(id)) {
            return RestResult.errorResult("id不能为空");
        }
        if(StringUtils.isBlank(status)) {
            return RestResult.errorResult("status不能为空");
        }

        JSONObject jsonObject = getSignedObject();
        jsonObject.put("status", status);

        String url = LUNA_API_BASE_URL + "/user/" + id + "/status";
        LunaRequest<JSONObject> lunaRequest = new LunaRequest(new HttpPost(), url, jsonObject);
        try {
            LunaRestResult<JSONObject> result = lunaRequest.request();

            if ("0".equals(result.getCode())) {
                //TODO 更新用户缓存
                return RestResult.successResult(result.getData());
            } else {
                logger.info("操作失败, " + result.getMsg());
                return null;
            }

        } catch (RestException e) {
            logger.error(e);
            throw new RuntimeException(e);
        }

    }


    /**
     * 获取人员权限目录
     *
     * @return
     */
    @CrossOrigin
    @RequestMapping(value = "/getDirectories", produces = "application/json;charset=UTF-8")
    public Object getDirectories() {
        Map<String,Object> result = new HashMap<String,Object>();
        UserInfo userInfo = UserAuth.getCurrentUserInfo();
        String roleId = userInfo.getRoles().get(0);
        logger.debug("roleId============="+roleId);
//        userInfo.
        //获取人员的roleId;
//        String roleId = "5";
        List<Map<String,Object>> msg = userService.getFunctionByRoleId(roleId);
        if(msg == null || msg.size()<1){
            return RestResult.errorResult("找不到权限id");
        }
        result.put("result",0);
        result.put("msg","");
        result.put("data",msg);
        return result;
    }

    private JSONObject getSignedObject() {
        JSONObject jsonObject = new JSONObject();
        String uniqueId = UserAuth.getCurrentUserInfo().getUserId();
        jsonObject.put("unique_id", uniqueId);
        long ts = System.currentTimeMillis();
        jsonObject.put("ts", ts);
        String sign = SignatureUtil.sign(jsonObject, COMPANY_MEDIA_KEY);
        jsonObject.put("sign", sign);
        jsonObject.put("source", COMPANY_MEDIA_TYPE);
        return jsonObject;
    }



}
