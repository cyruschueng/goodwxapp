package com.visualbusiness.common.web.auth;

import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.visualbusiness.common.auth.LunaTokenUniqueIdToken;
import com.visualbusiness.common.auth.UserAuth;
import com.visualbusiness.common.auth.UserInfo;
import com.visualbusiness.common.web.rest.RestResult;

/**
 * 用户登录、登出、用户信息获取用Controller。
 * @author dengbo
 *
 */
@RestController
@RequestMapping("/auth")
public abstract class AuthBaseRestController {
	private static Logger logger = LogManager.getLogger(AuthBaseRestController.class);
	
	/**
	 * 提示用户需要登录。用户未登录时被重定向到此网址。
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/needLogin", method={RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
	public RestResult<Object> needLogin() {
		return RestResult.needLoginResult();
	}

	/**
	 * 提示用户权限不足。用户权限不足时被重定向到此网址。
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/permissionDenied", method={RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
	public RestResult<Object> permissionDenied() {
		return RestResult.permissionDeniedResult();
	}

	/**
	 * 取得当前用户的信息。
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/myInfo")
	public RestResult<Map<String, String>> myInfo() {
		Subject currentUser = SecurityUtils.getSubject();
		if (!currentUser.isAuthenticated()) {
			return RestResult.needLoginResult();
		}
		
		UserInfo userInfo = UserAuth.getCurrentUserInfo();
		Map<String, String> data = new HashMap<String, String>();
		data.put("userName", userInfo.getUserName());
		data.put("name", userInfo.getName());
		data.put("userToken", userInfo.getUserToken());
		return RestResult.successResult(data);
	}

	/**
	 * 通过皓月平台用户名、密码登录。
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/login", method = {RequestMethod.POST})
	public RestResult<Map<String, String>> login(
			@RequestParam String userName,
			@RequestParam String password,
			@RequestParam(defaultValue = "false") boolean rememberMe) {
		
		if (StringUtils.isEmpty(userName)) {
			return RestResult.errorResult("userName参数未指定");
		}

		if (StringUtils.isEmpty(password)) {
			return RestResult.errorResult("password参数未指定");
		}

		AuthenticationToken authToken = new UsernamePasswordToken(userName, password, rememberMe);
		Subject currentUser = SecurityUtils.getSubject();
		try {
			currentUser.login(authToken);
			if (!currentUser.isPermitted(this.getLoginPermision())) {
				currentUser.logout();
				logger.warn("没有此系统权限的用户尝试登录：" + userName);
				return RestResult.permissionDeniedResult();
			}
			logger.info(userName + " 登录成功");
		} catch (AuthenticationException e) {
			logger.warn(userName + "登录失败");
			return RestResult.errorResult("登录失败");
		}
		
		UserInfo userInfo = UserAuth.getCurrentUserInfo();
		Map<String, String> data = new HashMap<String, String>();
		data.put("userName", userInfo.getUserName());
		data.put("name", userInfo.getName());
		data.put("userToken", userInfo.getUserToken());
		return RestResult.successResult(data);
    }

	/**
	 * 通过皓月平台token、uniqueId登录。
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/tokenLogin", method = {RequestMethod.POST})
	public RestResult<Map<String, String>> tokenLogin(
			@RequestParam(value = "token") String token,
			@RequestParam(value = "uniqueId") String uniqueId,
			@RequestParam(defaultValue = "false") boolean rememberMe) {

		if (StringUtils.isEmpty(token)) {
			return RestResult.errorResult("token参数未指定");
		}

		if (StringUtils.isEmpty(uniqueId)) {
			return RestResult.errorResult("uniqueId参数未指定");
		}

		AuthenticationToken authToken = new LunaTokenUniqueIdToken(token, uniqueId, rememberMe);
		Subject currentUser = SecurityUtils.getSubject();
		try {
			currentUser.login(authToken);
			if (!currentUser.isPermitted(this.getLoginPermision())) {
				currentUser.logout();
				logger.warn("没有此系统权限的用户尝试登录：" + token);
				return RestResult.permissionDeniedResult();
			}
			logger.info(token + " 登录成功");
		} catch (AuthenticationException e) {
			logger.warn(token + "登录失败");
			return RestResult.errorResult("登录失败");
		}

		UserInfo userInfo = UserAuth.getCurrentUserInfo();
		Map<String, String> data = new HashMap<String, String>();
		data.put("userName", userInfo.getUserName());
		data.put("name", userInfo.getUserName());
		data.put("userToken", userInfo.getUserToken());
		return RestResult.successResult(data);
    }

	/**
	 * 用户登出。
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/logout", method = {RequestMethod.GET})
	public RestResult<Object> logout() {
		Subject currentUser = SecurityUtils.getSubject();
		if (currentUser.getPrincipal() != null) {
			String userName = currentUser.getPrincipal().toString();
			logger.info(userName + "登出");
		}
		currentUser.logout();
			
		return RestResult.successResult();
	}
	
	protected abstract String getLoginPermision();
}
