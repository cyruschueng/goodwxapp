package com.visualbusiness.pano.process.web.rest;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.visualbusiness.common.auth.LunaUserInfo;
import com.visualbusiness.common.auth.UserAuth;
import com.visualbusiness.common.auth.UserInfo;
import com.visualbusiness.common.web.rest.RestResult;
import com.visualbusiness.pano.process.model.ProjectInfo;
import com.visualbusiness.pano.process.service.ProjectInfoService;

@RestController
@RequestMapping("/projectInfo")
public class ProjectInfoRestController {
	private static Logger logger = LogManager.getLogger(ProjectInfoRestController.class);
	
	@Autowired
	private ProjectInfoService projectInfoService;
	
	/**
	 * 项目信息保存。
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/save", method = {RequestMethod.POST})
	public RestResult<Object> create(
			@RequestParam String userToken,
			@RequestBody List<ProjectInfo> data) {
		
		userToken = userToken.trim();
		if (StringUtils.isEmpty(userToken)) {
			return RestResult.errorResult("userToken参数未指定");
		}

		if (data.isEmpty()) {
			return RestResult.errorResult("没有数据");
		}
		
		UserInfo userInfo = UserAuth.getUserInfo(userToken);
		if (userInfo == null) {
			logger.warn("项目信息保存用户未登录或登录已超时, userToken=" + userToken);
			return RestResult.errorResult("用户未登录或登录已超时");
		}
//		if (!userInfo.getRoles().contains(UserInfo.ROLE_VBPANO_OPERATOR)) {
//			logger.warn("项目信息保存用户权限不足, userToken=" + userToken);
//			return RestResult.errorResult("用户权限不足");
//		}

		for (ProjectInfo projectInfo : data) {
			projectInfoService.saveProjectInfo(projectInfo.getProjectName(), projectInfo.getProjectInfo());
		}
		
		return RestResult.successResult();
    }
}
