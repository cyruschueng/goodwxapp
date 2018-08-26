package com.visualbusiness.pano.news.web.rest;

import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.visualbusiness.common.auth.UserAuth;
import com.visualbusiness.common.auth.UserInfo;
import com.visualbusiness.common.config.SystemConfig;
import com.visualbusiness.common.web.rest.RestResult;
import com.visualbusiness.qcloud.service.CosService;

@RestController
@RequestMapping("/cos")
public class CosRestController {
	private static Logger logger = LogManager.getLogger(CosRestController.class);
	
	private static String PANO_NEWS_UPLOAD_BASE = "upload";
	
	@Autowired
	private CosService cosService;
	
	@CrossOrigin
	@RequestMapping(value="/signature")
	public RestResult<Map<String, String>> getSignature(
			@RequestParam String path) {

		String userName = UserAuth.getCurrentUserName();
		logger.info("用户" + userName + "获取文件签名,path=" + path);
		
		long expiredTime = System.currentTimeMillis() / 1000 + 60L * 2; //2分钟内有效
		
		return this.getSignature(path, expiredTime);
    }
	
	@CrossOrigin
	@RequestMapping(value="/signatureOnce")
	public RestResult<Map<String, String>> getSignatureOnce(
			@RequestParam String path) {

		String userName = UserAuth.getCurrentUserName();
		logger.info("用户" + userName + "获取单次文件签名,path=" + path);
		
		long expiredTime = 0;
		
		return this.getSignature(path, expiredTime);
    }
	
	private RestResult<Map<String, String>> getSignature(String path, long expiredTime) {
		path = path.trim();
		
		if (StringUtils.isEmpty(path)) {
			return RestResult.errorResult("没有指定path参数");
		}
		
		if (path.startsWith("../") || path.endsWith("/..") || path.contains("/../")) {
			return RestResult.errorResult("path参数不能包含..");
		}
		
		String fileId = getFileId(path);
		String signature = cosService.getPanoMediasSignature(fileId, expiredTime);

		Map<String, String> data = new HashMap<String, String>();
		data.put("appId", String.valueOf(SystemConfig.getCosAppId()));
		data.put("bucketName", SystemConfig.getCosPanoMediasBucketName());
		data.put("path", fileId);
		data.put("signature", signature);
		
		return RestResult.successResult(data);
	}
	
	private String getFileId(String path) {
		StringBuilder sb = new StringBuilder();
		String userName = UserAuth.getCurrentUserName();
		sb.append("/").append(PANO_NEWS_UPLOAD_BASE).append("/").append(userName);
		if(!path.startsWith("/")) {
			sb.append("/");
		}
		sb.append(path);
		
		return sb.toString();
	}
}
