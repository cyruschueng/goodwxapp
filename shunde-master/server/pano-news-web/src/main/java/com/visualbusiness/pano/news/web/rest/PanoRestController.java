package com.visualbusiness.pano.news.web.rest;

import java.text.SimpleDateFormat;
import java.util.*;

import com.alibaba.fastjson.JSONObject;
import com.visualbusiness.pano.news.model.DeviceInfo;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.visualbusiness.common.auth.UserAuth;
import com.visualbusiness.common.model.SearchResult;
import com.visualbusiness.common.web.rest.RestResult;
import com.visualbusiness.pano.news.model.PanoWithProject;
import com.visualbusiness.pano.news.service.PanoService;

@RestController
@RequestMapping("/pano")
public class PanoRestController {
	private static Logger logger = LogManager.getLogger(PanoRestController.class);

	@Autowired
	private PanoService panoService;

	private static String SORT_ITEM_TIME_DESC = "captureTime:desc";


	/**
	 * 新查询全景图
	 * @param q
	 * @param project
	 * @param from
	 * @param fromPage
	 * @param size
	 * @param deviceModel
	 * @param fromTime yyyyMMdd
	 * @param toTime yyyyMMdd
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value = "/search", method = {RequestMethod.GET})
	public RestResult<Map<String, Object>> search(@RequestParam(required= false) String q,
												  @RequestParam(required= false) String project,
												  @RequestParam(defaultValue = "0") int from,
												  @RequestParam(defaultValue = "1") int fromPage,
												  @RequestParam(defaultValue = "10") int size,
												  @RequestParam(required = false) String deviceModel,
												  @RequestParam(required= false) String fromTime,
												  @RequestParam(required= false) String toTime) {

		if (from == 0) {
			from = (fromPage - 1) * size;
		}

		String userName = UserAuth.getCurrentUserName();
		JSONObject jsonObject = new JSONObject();
		if (StringUtils.isEmpty(q)) {
			jsonObject.put("sort", SORT_ITEM_TIME_DESC);
		}
		else {
			jsonObject.put("q", q.trim());
		}
		jsonObject.put("project", project);
		// vbpro账户可以查看所有的全景数据
		if (!"vbpro".equalsIgnoreCase(userName)) {
			jsonObject.put("vendor", userName);
		}
		jsonObject.put("from", from);
		jsonObject.put("size", size);
		jsonObject.put("deviceModel", deviceModel);

		SimpleDateFormat sdf= new SimpleDateFormat("yyyyMMdd");
		try {
			if(!StringUtils.isEmpty(fromTime)) {
				jsonObject.put("fromTime", sdf.parse(fromTime.trim()).getTime());
				logger.info("时间检索，fromTime: "+jsonObject.get("fromTime"));

			}
			if(!StringUtils.isEmpty(toTime)) {
				jsonObject.put("toTime", sdf.parse(toTime.trim()).getTime()+ 24*3600*1000L);
				logger.info("时间检索，toTime: "+jsonObject.get("toTime"));

			}


		} catch (Exception e) {
			return RestResult.errorResult("解析时间失败");
		}
		SearchResult<List<PanoWithProject>> searchResult = panoService.search(jsonObject);

		Map<String, Object> data = new HashMap<String, Object>();
		data.put("total", searchResult.getTotal());
		data.put("totalPage", (long)Math.ceil(searchResult.getTotal() / (double)size));
		data.put("searchResult", searchResult.getResult());

		return RestResult.successResult(data);

	}

	/**
	 * 获取用户设备
	 */
	@CrossOrigin
	@RequestMapping(value = "/getDeviceModels", method = {RequestMethod.GET})
	public RestResult<List<String>> getDeviceModels() {

		String vendor = UserAuth.getCurrentUserName();
		List<DeviceInfo> deviceInfoList = panoService.getDeviceInfoByVendor(vendor);

		List<String> result = new ArrayList<>();
		for(DeviceInfo deviceInfo: deviceInfoList) {
			result.add(deviceInfo.getDeviceModel());
		}
		return RestResult.successResult(result);

	}


	/**
	 * 查询全景图。
	 * @param q
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/searchOld", method = {RequestMethod.GET})
	public RestResult<Map<String, Object>> search(@RequestParam String q,
												  @RequestParam(required= false) String project,
												  @RequestParam(defaultValue = "0") int from,
												  @RequestParam(defaultValue = "1") int fromPage,
												  @RequestParam(defaultValue = "10") int size,
												  @RequestParam(required= false) String fromTime,
												  @RequestParam(required= false) String toTime) {
		
		q = q.trim();
		if (StringUtils.isEmpty(q)) {
			return RestResult.errorResult("q参数未指定");
		}
		
		if (from == 0) {
			from = (fromPage - 1) * size;
		}
		
		String userName = UserAuth.getCurrentUserName();
		SearchResult<List<PanoWithProject>> searchResult = panoService.search(q, project, userName, from, size, null, fromTime, toTime);

		Map<String, Object> data = new HashMap<String, Object>();
		data.put("total", searchResult.getTotal());
		data.put("totalPage", (long)Math.ceil(searchResult.getTotal() / (double)size));
		data.put("searchResult", searchResult.getResult());
		
		return RestResult.successResult(data);
    }

	/**
	 * 重建指定的全景图或者全部全景图的搜索索引。
	 * @param panoId
	 * @return
	 */
	@RequestMapping(value="/recreateSearchIndex", method = {RequestMethod.PUT, RequestMethod.GET})
	public RestResult<Object> recreateSearchIndex(@RequestParam(required= false) String panoId,
												  @RequestParam(required= false) String magic) {

		String userName = UserAuth.getCurrentUserName();
		logger.info("用户" + userName + "重建全景图的搜索索引，panoId=" + panoId);

		boolean success = false;
		if (StringUtils.isEmpty(panoId)) {
			if (StringUtils.isEmpty(magic) || !"admin".equals(magic)) {
				logger.warn("非管理员执行的重建所有全景图索引");
				success = false;
			} else {
				success = panoService.recreateSearchIndex();
			}
		} else {
			success = panoService.recreateSearchIndex(panoId);
		}

		if (success) {
			return RestResult.successResult();
		} else {
			return RestResult.errorResult();
		}
	}



}
