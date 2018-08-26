package com.visualbusiness.pano.process.web.rest;

import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.visualbusiness.common.auth.UserAuth;
import com.visualbusiness.common.auth.UserInfo;
import com.visualbusiness.common.web.rest.RestResult;

@RestController
@RequestMapping("/vendor")
public class VendorRestController {
	private static Logger logger = LogManager.getLogger(VendorRestController.class);
	
	@RequestMapping(value="/login", method = {RequestMethod.POST})
	public RestResult<Map<String, String>> login(
			@RequestBody Map<String, String> requestData) {
		
		if (requestData == null) {
			return RestResult.errorResult("未指定请求数据");
		}
		
		String userName = requestData.get("userName");
		if (StringUtils.isEmpty(userName)) {
			return RestResult.errorResult("数据中未包含userName");
		}

		String password = requestData.get("password");
		if (StringUtils.isEmpty(password)) {
			return RestResult.errorResult("数据中未包含password");
		}

		UserInfo userInfo = UserAuth.lunaUserNameLogin(userName, password);
		
		if (userInfo != null) {
			logger.info("vendor " + userName + " 登录成功, userToken=" + userInfo.getUserToken());

			Map<String, String> data = new HashMap<String, String>();
			data.put("userName", userInfo.getUserName());
			data.put("name", userInfo.getName());
			data.put("userToken", userInfo.getUserId());
			return RestResult.successResult(data);
		} else {
			logger.warn("vendor " + userName + " 登录失败");
			return RestResult.errorResult("登录失败");
		}
    }
	
}
