package com.visualbusiness.pano.news.web.rest;

import com.visualbusiness.common.auth.UserAuth;
import com.visualbusiness.common.auth.UserInfo;
import com.visualbusiness.common.web.rest.RestResult;
import com.visualbusiness.pano.news.model.PanoAlbum;
import com.visualbusiness.pano.news.model.PanoTopic;
import com.visualbusiness.pano.news.service.TopicService;
import com.visualbusiness.pano.news.web.common.StatusCommon;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

/**
 * Copyright (C) 2015 - 2017 MICROSCENE Inc., All Rights Reserved.
 *
 * @author: ray@visualbusiness.com
 * @date: 2017-03-07
 */

@RestController
@RequestMapping("/topic")
public class TopicRestController {

    Logger logger = Logger.getLogger(TopicRestController.class);

    @Autowired
    private TopicService topicService;

    /**
     * 新建专题
     * @return
     */
    @CrossOrigin
    @RequestMapping(value="/create", method = {RequestMethod.POST})
    public RestResult<PanoTopic> create(@RequestBody Map<String, String> data) {

        String albumContent = data.get("albumContent");

        if (StringUtils.isBlank(albumContent)) {
            return RestResult.errorResult("没有数据");
        }

        String topicId = UUID.randomUUID().toString().replaceAll("-", "").toUpperCase();

        UserInfo userInfo = UserAuth.getCurrentUserInfo();

        logger.info("vendor:" + userInfo.getVendor() + " 用户:" + userInfo.getUserName() + " 新建专题,topicId=" + topicId);
        PanoTopic panoTopic = new PanoTopic();
        panoTopic.setTopicId(topicId);
        panoTopic.setVendor(userInfo.getVendor());
        panoTopic.setTopicContent(albumContent);
        panoTopic.setCreateUser(userInfo.getUserName());

        topicService.saveOrUpdate(panoTopic);

        boolean indexResult = topicService.recreateSearchIndex(topicId);
        if (!indexResult) {
            return RestResult.errorResult("稿件保存成功，但是稿件数据格式有错误");
        }

        final PanoTopic updatedPanoTopic = topicService.get(topicId);

        return RestResult.successResult(updatedPanoTopic);
    }

    /**
     * 重建指定专题或全部专题的搜索索引。
     * @return
     */
    @RequestMapping(value="/recreateSearchIndex", method = {RequestMethod.PUT, RequestMethod.GET}) //TODO GET方法只在测试时使用
    public RestResult<Object> recreateSearchIndex(@RequestParam(required= false) String topicId,
                                                  @RequestParam(required= false) String magic) {


        String userName = UserAuth.getCurrentUserName();
        logger.info("用户" + userName + "重建专题的搜索索引，topicId=" + topicId);

        boolean success = false;
        if (StringUtils.isBlank(topicId)) {
            if (org.springframework.util.StringUtils.isEmpty(magic) || !"admin".equals(magic)) {
                logger.warn("非管理员执行的重建所有专题索引");
                success = false;
            } else {
                success = topicService.recreateSearchIndex();
            }
        } else {
            success = topicService.recreateSearchIndex(topicId);
        }

        if (success) {
            return RestResult.successResult();
        } else {
            return RestResult.errorResult();
        }
    }

    /**
     * 发布、删除、撤稿、草稿操作
     * @param topicId
     * @param curStatus  当前状态
     * @param newStatus  将要变成的状态
     * @return
     */
    @CrossOrigin
    @RequestMapping("/statusChange")
    public RestResult<PanoAlbum> statusChange(@RequestParam String topicId,
                                              @RequestParam (defaultValue = "-1")int curStatus,
                                              @RequestParam (defaultValue = "-1")int newStatus) {

        if (StringUtils.isBlank(topicId)) {
            return RestResult.errorResult("topicId参数未指定");
        }
        if (curStatus == -1) {
            return RestResult.errorResult("curStatus参数未指定");
        }
        if (newStatus == -1) {
            return RestResult.errorResult("newStatus参数未指定");
        }

        UserInfo userInfo = UserAuth.getCurrentUserInfo();
        PanoTopic panoTopic = topicService.get(topicId);
        if (panoTopic == null) {
            return RestResult.errorResult("指定的专题不存在");
        }
        if (curStatus != panoTopic.getTopicStatus()) {
            return RestResult.errorResult("数据已过期，请刷新页面");
        }

        if (!StringUtils.equals(panoTopic.getVendor(), userInfo.getVendor())) {
            return RestResult.errorResult("只能删除所在媒体下的专题");
        }
        if (StatusCommon.checkStatusChange(curStatus, newStatus)) {
            return RestResult.errorResult("操作不允许");
        }

        panoTopic.setTopicStatus(newStatus);
        panoTopic.setUpdateUser(userInfo.getUserName());
        logger.info(newStatus + "操作的专题内容如下：" + panoTopic.getTopicContent());

        topicService.saveOrUpdate(panoTopic);
        topicService.recreateSearchIndex(topicId);

        return RestResult.successResult();
    }

}
