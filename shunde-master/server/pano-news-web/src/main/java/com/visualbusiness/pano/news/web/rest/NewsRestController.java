//package com.visualbusiness.pano.news.web.rest;
//
//import java.util.Arrays;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.UUID;
//
//import com.visualbusiness.common.auth.UserInfo;
//import com.visualbusiness.pano.news.model.*;
//import com.visualbusiness.pano.news.web.common.StatusCommon;
//import org.apache.commons.lang.StringUtils;
//import org.apache.logging.log4j.LogManager;
//import org.apache.logging.log4j.Logger;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.google.gson.Gson;
//import com.visualbusiness.common.auth.UserAuth;
//import com.visualbusiness.common.model.SearchResult;
//import com.visualbusiness.common.web.rest.RestResult;
//import com.visualbusiness.pano.news.service.NewsService;
//
///**
// * Copyright (C) 2015 - 2017 MICROSCENE Inc., All Rights Reserved.
// *
// * @author: ray@visualbusiness.com
// * @date: 2017-03-05
// */
//
//
//@RestController
//@RequestMapping("/album")
//public class NewsRestController {
//    private static Logger logger = LogManager.getLogger(NewsRestController.class);
//
//    @Autowired
//    private NewsService newsService;
//
//
//    /**
//     * 新建相册。
//     *
//     * @return
//     */
//    @CrossOrigin
//    @RequestMapping(value = "/create", method = {RequestMethod.POST})
//    public RestResult<PanoAlbum> create(
//            @RequestBody Map<String, String> data,
//            @RequestParam String newsType) {
//
//        String albumContent = data.get("albumContent");
//
//        if (StringUtils.isBlank(albumContent)) {
//            return RestResult.errorResult("没有数据");
//        }
//
//        if (StringUtils.isBlank(newsType)) {
//            return RestResult.errorResult("没有稿件类型:" + albumContent);
//        }
//
//        String albumId = UUID.randomUUID().toString().replaceAll("-", "").toUpperCase();
//
//        UserInfo userInfo = UserAuth.getCurrentUserInfo();
//
//        logger.info("vendor:" + userInfo.getVendor() + " 用户:" + userInfo.getUserName() + " 新建稿件,albumId=" + albumId);
//        PanoAlbum panoAlbum = new PanoAlbum();
//        panoAlbum.setAlbumId(albumId);
//        panoAlbum.setType("news");
//        panoAlbum.setVendor(userInfo.getVendor());
//        panoAlbum.setAlbumContent(albumContent);
//        panoAlbum.setCreateUser(userInfo.getUserName());
//        panoAlbum.setUpdateUser(userInfo.getUserName());
//        panoAlbum.setNewsStatus(StatusCommon.NewsStatus.DRAFT.statusValue);
//
//        newsService.saveOrUpdate(panoAlbum);
//
//        boolean indexResult = newsService.recreateSearchIndex(albumId);
//        if (!indexResult) {
//            return RestResult.errorResult("稿件保存成功，但是稿件数据格式有错误");
//        }
//
//        PanoAlbum updatedPanoAlbum = newsService.get(albumId);
//
//        return RestResult.successResult(updatedPanoAlbum);
//    }
//
//    /**
//     * 根据指定panoId的基础数据定义的层级关系，创建默认相册。
//     *
//     * @return
//     */
//    @CrossOrigin
//    @RequestMapping(value = "/createDefault", method = {RequestMethod.POST})
//    public RestResult<PanoAlbum> createDefault(
//            @RequestParam String panoId) {
//
//        panoId = panoId.trim();
//        if (StringUtils.isBlank(panoId)) {
//            return RestResult.errorResult("panoId参数未指定");
//        }
//
//        Album album = newsService.findByPanoIdWithFullInfo(panoId);
//
//        if (album == null) {
//            return RestResult.errorResult("指定的panoId没有默认稿件");
//        }
//
//        String albumId = UUID.randomUUID().toString().replaceAll("-", "").toUpperCase();
//
//        UserInfo userInfo = UserAuth.getCurrentUserInfo();
//
//        logger.info("vendor:" + userInfo.getVendor() + " 用户:" + userInfo.getUserName() + " 新建稿件,albumId=" + albumId);
//        Gson gson = new Gson();
//        String albumContent = gson.toJson(album);
//
//        PanoAlbum panoAlbum = new PanoAlbum();
//        panoAlbum.setAlbumId(albumId);
//        panoAlbum.setType(PanoAlbum.PANO_ALBUM_TYPE_NEWS);
//        panoAlbum.setVendor(userInfo.getVendor());
//        panoAlbum.setAlbumContent(albumContent);
//        panoAlbum.setCreateUser(userInfo.getUserName());
//        panoAlbum.setUpdateUser(userInfo.getUserName());
//        panoAlbum.setNewsStatus(StatusCommon.NewsStatus.DRAFT.statusValue);
//
//        newsService.saveOrUpdate(panoAlbum);
//
//        boolean indexResult = newsService.recreateSearchIndex(albumId);
//        if (!indexResult) {
//            return RestResult.errorResult("稿件保存成功，但是稿件数据格式有错误");
//        }
//
//        PanoAlbum updatedPanoAlbum = newsService.get(albumId);
//
//        return RestResult.successResult(updatedPanoAlbum);
//    }
//
//    /**
//     * 更新稿件
//     * 更新只校验当前稿件状态，不校验是否多人操作。
//     *
//     * @return
//     */
//    @CrossOrigin
//    @RequestMapping(value = "/update", method = {RequestMethod.POST})
//    public RestResult<? extends Object> update(
//            @RequestBody PanoAlbum panoAlbum,
//            @RequestParam String curState,
//            @RequestParam(defaultValue = "false") boolean updateMeta) {
//
//        if (panoAlbum == null) {
//            return RestResult.errorResult("没有数据");
//        }
//
//        String albumId = panoAlbum.getAlbumId();
//
//        UserInfo userInfo = UserAuth.getCurrentUserInfo();
//        logger.info("用户" + userInfo.getUserName() + "删除稿件,albumId=" + albumId);
//
//        PanoAlbum existPanoAlbum = newsService.get(albumId);
//        if (existPanoAlbum == null) {
//            return RestResult.errorResult("要更新的稿件不存在");
//        }
//
//
//        if (!StringUtils.equals(existPanoAlbum.getVendor(), userInfo.getVendor())) {
//            return RestResult.errorResult("只能更新所在媒体下的稿件");
//        }
//
////        if (existPanoAlbum.getOptVersion() != panoAlbum.getOptVersion()) {
////            return RestResult.errorResult("稿件已被其他人更新过");
////        }
//
//        if (StatusCommon.NewsStatus.valueOf(curState.toUpperCase()).statusValue != panoAlbum.getNewsStatus()) {
//            return RestResult.errorResult("数据已过期，请刷新页面");
//        }
//
//        existPanoAlbum.setAlbumContent(panoAlbum.getAlbumContent());
//        existPanoAlbum.setUpdateUser(userInfo.getUserName());
//
//        newsService.saveOrUpdate(existPanoAlbum);
//
//        boolean indexResult = newsService.recreateSearchIndex(albumId);
//        if (!indexResult) {
//            return RestResult.errorResult("相册保存成功，但是相册数据格式有错误");
//        }
//
//        final PanoAlbum updatedPanoAlbum = newsService.get(albumId);
//
//        if (updateMeta) {
//            Runnable r = new Runnable() {
//                @Override
//                public void run() {
//                    newsService.updatePanoMetasByAlbum(updatedPanoAlbum);
//                }
//            };
//
//            new Thread(r).start();
//        }
//
//        return RestResult.successResult(updatedPanoAlbum);
//
//    }
//
//    @CrossOrigin
//    @RequestMapping("/statusChange")
//    public RestResult<PanoAlbum> statusChange(
//            @RequestParam String albumId,
//            @RequestParam String curState,
//            @RequestParam String newState) {
//        if (StringUtils.isBlank(albumId)) {
//            return RestResult.errorResult("albumId参数未指定");
//        }
//        if (StringUtils.isBlank(curState)) {
//            return RestResult.errorResult("curState参数未指定");
//        }
//        if (StringUtils.isBlank(newState)) {
//            return RestResult.errorResult("newState参数未指定");
//        }
//
//        UserInfo userInfo = UserAuth.getCurrentUserInfo();
//        PanoAlbum panoAlbum = newsService.get(albumId);
//        if (panoAlbum == null) {
//            return RestResult.errorResult("指定的稿件不存在");
//        }
//        if (StatusCommon.NewsStatus.valueOf(curState.toUpperCase()).statusValue != panoAlbum.getNewsStatus()) {
//            return RestResult.errorResult("数据已过期，请刷新页面");
//        }
//
//        if (!StringUtils.equals(panoAlbum.getVendor(), userInfo.getVendor())) {
//            return RestResult.errorResult("只能删除所在媒体下的稿件");
//        }
//        if (!StatusCommon.checkStatusChange(StatusCommon.NewsStatus.valueOf(curState.toUpperCase()), StatusCommon.NewsStatus.valueOf(newState.toUpperCase()))) {
//            return RestResult.errorResult("操作不允许");
//        }
//
//        panoAlbum.setNewsStatus(StatusCommon.NewsStatus.valueOf(newState.toUpperCase()).statusValue);
//        panoAlbum.setUpdateUser(userInfo.getUserName());
//        logger.info(newState + "操作的稿件内容如下：" + panoAlbum.getAlbumContent());
//
//        newsService.saveOrUpdate(panoAlbum);
//        newsService.recreateSearchIndex(albumId);
//
//        return RestResult.successResult();
//    }
//
//
//    /**
//     * 取得稿件。
//     *
//     * @return
//     */
//    @CrossOrigin
//    @RequestMapping(value = "/get")
//    public RestResult<? extends Object> get(
//            @RequestParam String albumId,
//            @RequestParam Integer newsState) {
//
//        if (StringUtils.isBlank(albumId)) {
//            return RestResult.errorResult("albumId参数未指定");
//        }
//
//        if (newsState != null) {
//            return RestResult.errorResult("newsState参数未指定");
//        }
//
//        // 默认语言相册
//        PanoAlbum panoAlbum = newsService.findByAlbumIdAndNewsStatus(albumId, newsState);
//        if (panoAlbum == null) {
//            return RestResult.errorResult("指定的相册不存在");
//        }
//
//        return RestResult.successResult(panoAlbum);
//    }
//
//    /**
//     * 复制相册。
//     *
//     * @return
//     */
//    @CrossOrigin
//    @RequestMapping(value = "/copy", method = {RequestMethod.POST})
//    public RestResult<PanoAlbum> copy(
//            @RequestParam String albumId,
//            @RequestParam String albumName) {
//
//        if (StringUtils.isBlank(albumId)) {
//            return RestResult.errorResult("albumId参数未指定");
//        }
//
//        if (StringUtils.isBlank(albumName)) {
//            return RestResult.errorResult("albumName参数未指定");
//        }
//
//        PanoAlbum panoAlbum = newsService.get(albumId);
//        if (panoAlbum == null) {
//            return RestResult.errorResult("指定的相册不存在");
//        }
//
//        String userName = UserAuth.getCurrentUserName();
//        logger.info("用户" + userName + "复制相册,albumId=" + albumId);
//
//        PanoAlbum panoAlbumCopied = newsService.copy(albumId, albumName, userName);
//
//        boolean indexResult = newsService.recreateSearchIndex(panoAlbumCopied.getAlbumId());
//        if (!indexResult) {
//            return RestResult.errorResult("相册复制成功，但是相册数据格式有错误");
//        }
//
//        return RestResult.successResult(panoAlbumCopied);
//    }
//
//    /**
//     * 取得相册内容。
//     *
//     * @return
//     */
//    @CrossOrigin(allowCredentials = "false")
//    @RequestMapping(value = "/view/{albumId}", produces = "application/json;charset=UTF-8")
//    public Object getAlbumContent(
//            @PathVariable String albumId) {
//
//        // 默认语言相册
//        PanoAlbum panoAlbum = newsService.get(albumId);
//        if (panoAlbum == null) {
//            return RestResult.errorResult("找不到指定的相册");
//        }
//
//        String result = "{\"result\":0,\"msg\":\"正常\",\"data\":" + panoAlbum.getAlbumContent() + "}";
//        return result;
//    }
//
//    /**
//     * 查询相册。
//     *
//     * @param q
//     * @return
//     */
//    @CrossOrigin
//    @RequestMapping(value = "/search", method = {RequestMethod.GET})
//    public RestResult<Map<String, Object>> search(
//            @RequestParam String q,
//            @RequestParam(defaultValue = "RELEASED") String curState,
//            @RequestParam(defaultValue = "0") int from,
//            @RequestParam(defaultValue = "1") int fromPage,
//            @RequestParam(defaultValue = "10") int size) {
//
//        q = q.trim();
//        if (StringUtils.isBlank(q)) {
//            return RestResult.errorResult("q参数未指定");
//        }
//
//        if (from == 0) {
//            from = (fromPage - 1) * size;
//        }
//
//
//        //TODO 确认按时间排序是否合理
////        List sortList = Arrays.asList("createTimeMillis:desc");
//
//        int newsState = StatusCommon.NewsStatus.valueOf(curState).statusValue;
//        String vendor = UserAuth.getCurrentUserInfo().getVendor();
////        String vendor = null;
//        SearchResult<List<NewsSearchResult>> searchResult = newsService.search(q, vendor, null, newsState, from, size, null);
//
//        Map<String, Object> data = new HashMap<String, Object>();
//        data.put("total", searchResult.getTotal());
//        data.put("totalPage", (long) Math.ceil(searchResult.getTotal() / (double) size));
//        data.put("searchResult", searchResult.getResult());
//
//        return RestResult.successResult(data);
//    }
//
//
//
//    /**
//     * 取得所有相册。
//     *
//     * @param
//     * @return
//     */
//    @CrossOrigin
//    @RequestMapping(value = "/all", method = {RequestMethod.GET})
//    public RestResult<Map<String, Object>> all(
//            @RequestParam(defaultValue = "0") int from,
//            @RequestParam(defaultValue = "1") int fromPage,
//            @RequestParam(defaultValue = "10") int size,
//            @RequestParam(required = false) String curState,
//            @RequestParam(required = false) String newsType,
//            @RequestParam(required = false) List<String> sort) {
//
//        if (sort == null || sort.size() == 0) {
//            sort = Arrays.asList("createTime:desc");
//        }
//
//        if (from == 0) {
//            from = (fromPage - 1) * size;
//        }
//
//        String vendor = UserAuth.getCurrentUserInfo().getVendor();
//        String type = null;
//        if (!StringUtils.isBlank(newsType)) {
//            type = "news";
//        }
//
//        int newsState = StatusCommon.NewsStatus.valueOf(curState).statusValue;
//        SearchResult<List<NewsSearchResult>> searchResult = newsService.search(null, vendor, type, newsState, from, size, sort);
//
//        Map<String, Object> data = new HashMap<>();
//        data.put("total", searchResult.getTotal());
//        data.put("totalPage", (long) Math.ceil(searchResult.getTotal() / (double) size));
//        data.put("searchResult", searchResult.getResult());
//
//        return RestResult.successResult(data);
//    }
//
//    /**
//     * 重建指定的相册或者全部相册的搜索索引。
//     *
//     * @param
//     * @return
//     */
//    @RequestMapping(value = "/recreateSearchIndex", method = {RequestMethod.PUT, RequestMethod.GET}) //TODO GET方法只在测试时使用
//    public RestResult<Object> recreateSearchIndex(
//            @RequestParam(required = false) String albumId,
//            @RequestParam(required = false) String magic) {
//
//        String userName = UserAuth.getCurrentUserName();
//        logger.info("用户" + userName + "重建相册的搜索索引，albumId=" + albumId);
//
//        boolean success = false;
//        if (StringUtils.isBlank(albumId)) {
//            if (StringUtils.isBlank(magic) || !"admin".equals(magic)) {
//                logger.warn("非管理员执行的重建所有相册索引");
//                success = false;
//            } else {
//                success = newsService.recreateSearchIndex();
//            }
//        } else {
//            success = newsService.recreateSearchIndex(albumId);
//        }
//
//        if (success) {
//            return RestResult.successResult();
//        } else {
//            return RestResult.errorResult();
//        }
//    }
//
//    /**
//     * 修改相册所属供应商
//     *
//     * @param albumId
//     * @param vendor
//     * @return
//     */
//    @CrossOrigin
//    @RequestMapping(value = "/changeVendor", method = {RequestMethod.PUT, RequestMethod.GET})
//    public RestResult<Map<String, String>> changeVendor(
//            @RequestParam String albumId,
//            @RequestParam String vendor,
//            @RequestParam(required = false) String type) {
//
//        if (StringUtils.isBlank(albumId)) {
//            return RestResult.errorResult("albumId参数未指定");
//        }
//        if (StringUtils.isBlank(vendor)) {
//            return RestResult.errorResult("vendor参数未指定");
//        }
//
//        String userName = UserAuth.getCurrentUserName();
//
//        PanoAlbum panoAlbum = newsService.get(albumId);
//        if (panoAlbum == null) {
//            return RestResult.errorResult("指定的相册不存在");
//        }
//
//        panoAlbum.setVendor(vendor);
//        panoAlbum.setType(type);
//        panoAlbum.setUpdateUser(userName);
//
//        newsService.saveOrUpdate(panoAlbum);
//
//        newsService.recreateSearchIndex(albumId);
//
//        return RestResult.successResult();
//    }
//
//}
