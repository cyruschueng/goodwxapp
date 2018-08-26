package com.visualbusiness.pano.process.web.rest;

import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.visualbusiness.common.web.rest.RestResult;
import com.visualbusiness.pano.process.model.PanoImagePatcher;
import com.visualbusiness.pano.process.service.PanoImagePatcherService;

@RestController
@RequestMapping("/panopatcher")
public class PanoPatcherRestController {
	private static Logger logger = LogManager.getLogger(PanoPatcherRestController.class);

	@Autowired
	private PanoImagePatcherService panoImagePatcherService;
	
	/**
	 * 更新指定全景图补修的处理状态。
	 * @param panoId
	 * @return
	 */
	@RequestMapping(value="/status", method = {RequestMethod.PUT})
	public RestResult<Map<String, String>> statusUpdate(
			@RequestParam String panoId,
			@RequestParam String status,
			@RequestParam(required=false) String thumbnail) {
		
		panoId = panoId.trim();
		if (StringUtils.isEmpty(panoId)) {
			return RestResult.errorResult("panoId参数未指定");
		}
		
		status = status.trim();
		if (StringUtils.isEmpty(status)) {
			return RestResult.errorResult("status参数未指定");
		}
		
		PanoImagePatcher panoImagePatcher = panoImagePatcherService.get(panoId);
		
		if (panoImagePatcher == null) {
			return RestResult.errorResult("全景图补修不存在:" + panoId);
		}
		
		panoImagePatcherService.updateStatus(panoId, status, thumbnail);
		
		return RestResult.successResult();
    }

	/**
	 * 重新进行全景图补修处理。
	 * @param panoId
	 * @return
	 */
	@RequestMapping(value="/reprocess", method = {RequestMethod.PUT, RequestMethod.GET}) //TODO GET只是测试时用的
	public RestResult<Map<String, String>> reprocess(
			@RequestParam String panoId) {

		panoId = panoId.trim();
		if (StringUtils.isEmpty(panoId)) {
			return RestResult.errorResult("panoId参数未指定");
		}
		
		PanoImagePatcher panoImagePatcher = panoImagePatcherService.get(panoId);
		
		if (panoImagePatcher == null) {
			return RestResult.errorResult("全景图补修不存在:" + panoId);
		}

		panoImagePatcherService.reprocessPanoImagePatcher(panoId);
		
		return RestResult.successResult();
    }

	/**
	 * 启动全景图补修处理。
	 * @param panoId
	 * @param panoMeta
	 * @return
	 */
	@RequestMapping(value="/start", method = {RequestMethod.POST, RequestMethod.GET}) //TODO GET只是测试时用的
	public RestResult<Map<String, String>> startPatcher() {

		panoImagePatcherService.startPatcher();
		
		return RestResult.successResult();
    }

}
