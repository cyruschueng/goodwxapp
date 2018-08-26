package com.visualbusiness.pano.process.web.rest;

import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.visualbusiness.common.config.SystemConfig;
import com.visualbusiness.common.web.rest.RestResult;
import com.visualbusiness.pano.process.model.PanoImage;
import com.visualbusiness.pano.process.service.PanoImageService;
import com.visualbusiness.qcloud.service.CosService;

@RestController
@RequestMapping("/panoresources")
public class PanoResourcesRestController {
	private static Logger logger = LogManager.getLogger(PanoResourcesRestController.class);

	@Autowired
	private PanoImageService panoImageService;
	
	@Autowired
	private CosService cosService;
	
	/**
	 * 全景资源下载链接。
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/downloadLink", method = {RequestMethod.GET})
	public RestResult<Map<String, String>> downloadLink(
			@RequestParam String panoId,
			@RequestParam String resourceType) {
		
		panoId = panoId.trim();
		if (StringUtils.isEmpty(panoId)) {
			return RestResult.errorResult("panoId参数未指定");
		}
		
		resourceType = resourceType.trim();
		if (StringUtils.isEmpty(resourceType)) {
			return RestResult.errorResult("resourceType参数未指定");
		}

		PanoImage panoImage = panoImageService.get(panoId);
		
		if (panoImage == null) {
			return RestResult.errorResult("全景图不存在:" + panoId);
		}
		
		String metaPath = panoImage.getPanoMeta();
		
		String resourcePath = getResourcePath(metaPath, resourceType);
		
		long expiredTime = System.currentTimeMillis() / 1000 + 60L * 60 * 1; //一小时内有效
		String signature = cosService.getResourceSignature(resourcePath, expiredTime);
		
		String url = SystemConfig.getCosResourcesUrl();
		if (url.endsWith("/")) {
			url = url.substring(0, url.length() - 1);
		}
		
		String link = url + resourcePath + "?sign=" + signature;
		
		Map<String, String> data = new HashMap<String, String>();
		data.put("link", link);
		
		return RestResult.successResult(data);
    }
	
	private String getResourcePath(String metaPath, String resourceType) {
		String fileName = null;
		if ("orginal".equals(resourceType)) {
			fileName = "sphere_orginal.jpg";
		} else if ("sphere".equals(resourceType)) {
			fileName = "sphere.jpg";
		} else if ("cube".equals(resourceType)) {
			fileName = "cube.jpg";
		} else if ("01".equals(resourceType) || "02".equals(resourceType) || "03".equals(resourceType) || "04".equals(resourceType) || "05".equals(resourceType) || "06".equals(resourceType)) {
			fileName = resourceType + ".jpg";
		} else if ("meta".equals(resourceType)) {
			fileName = "panoimg.meta";
		} else if ("template".equals(resourceType)) {
			fileName = "Template.pto";
		} else {
			throw new IllegalArgumentException("资源类型不正确：" + resourceType);
		}
		
		int idx = metaPath.lastIndexOf("/");
		if (idx < 0) {
			throw new IllegalArgumentException("metaPath不正确：" + metaPath);
		}
		
		String resourcePath = metaPath.substring(0, idx + 1) + fileName;
		if (!resourcePath.startsWith("/")) {
			resourcePath = "/" + resourcePath;
		}
		return resourcePath;
	}
}
