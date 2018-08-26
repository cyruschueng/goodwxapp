package com.visualbusiness.pano.process.web.rest;

import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.visualbusiness.common.auth.UserAuth;
import com.visualbusiness.common.auth.UserInfo;
import com.visualbusiness.common.web.rest.RestResult;

@RestController
@RequestMapping("/operator")
public class OperatorRestController {
	private static Logger logger = LogManager.getLogger(OperatorRestController.class);
	
	@RequestMapping(value="/login")
	public RestResult<Map<String, String>> findByName(
			@RequestParam String userName,
			@RequestParam String password) {
		
		//TODO
		UserInfo userInfo = UserAuth.lunaUserNameLogin("dinglian", "AC!@3v");
		
		Map<String, String> data = new HashMap<String, String>();
		data.put("userName", userName);
		data.put("name", "张三");
		//data.put("userToken", userInfo.getUserToken());
		data.put("userToken", userInfo.getUserId());
		data.put("userType", "2");
		
		return RestResult.successResult(data);
    }
	
}
