package com.visualbusiness.pano.process.web.rest;

import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.visualbusiness.common.auth.UserAuth;
import com.visualbusiness.common.auth.UserInfo;
import com.visualbusiness.common.web.rest.RestResult;
import com.visualbusiness.qcloud.service.CosService;

@RestController
@RequestMapping("/cos")
public class CosRestController {
	private static Logger logger = LogManager.getLogger(CosRestController.class);
	
	@Autowired
	private CosService cosService;
	
	@RequestMapping(value="/signature")
	public RestResult<Map<String, String>> getSignature(
			@RequestParam String userToken,
			@RequestParam(required = false) String appId, //暂未使用
			@RequestParam(required = false) String expired,
			@RequestParam(required = false) String fileId,
			@RequestParam(required = false) String bucket) { //暂未使用
		
		userToken = userToken.trim();
		if (StringUtils.isEmpty(userToken)) {
			return RestResult.errorResult("userToken参数未指定");
		}
		
		if (StringUtils.isEmpty(appId)) {
			appId = null;
		}
		if (StringUtils.isEmpty(expired)) {
			expired = null;
		}
		if (StringUtils.isEmpty(fileId)) {
			fileId = null;
		}
		if (StringUtils.isEmpty(bucket)) {
			bucket = null;
		}
		
		UserInfo userInfo = UserAuth.getUserInfo(userToken);
		if (userInfo == null) {
			logger.warn("Cos签名获取用户未登录或登录已超时, userToken=" + userToken);
			return RestResult.errorResult("用户未登录或登录已超时");
		}
//		if (!userInfo.getRoles().contains(UserInfo.ROLE_VBPANO_OPERATOR)) {
//			logger.warn("Cos签名获取用户权限不足, userToken=" + userToken);
//			return RestResult.errorResult("用户权限不足");
//		}

		long expiredTime = 0;
		if (StringUtils.isEmpty(expired) || expired.equals("0")) {
			expiredTime = 0;
		} else if (expired.equals("1DAY")) {
			// FIXME 全景相机认证用特殊处理
			expiredTime = System.currentTimeMillis() / 1000 + 60L * 60 * 24;
		} else {
			expiredTime = System.currentTimeMillis() / 1000 + 60L * 60 * 1;
		}
		
		String signature = cosService.getResourceSignature(fileId, expiredTime);

		Map<String, String> data = new HashMap<String, String>();
		data.put("signature", signature);
		
		return RestResult.successResult(data);
    }
}
