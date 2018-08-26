package com.vizen.sd.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vizen.framework.util.MyJsonUtil;
import com.vizen.sd.model.LoginUser;
import com.vizen.sd.repository.mysql.domain.Resource;
import com.vizen.sd.repository.mysql.domain.User;
import com.vizen.sd.repository.mysql.domain.UserPermission;
import com.vizen.sd.service.MailService;
import com.vizen.sd.service.ResourceService;
import com.vizen.sd.service.UserService;

import freemarker.template.Configuration;
import freemarker.template.Template;

/**
 * 用户相关
 */
@RestController("userCtrl")
@RequestMapping(value = "/user")
public class UserCtrl {

	@Autowired
	private UserService userService;

	@Autowired
	private ResourceService resourceService;
	@Autowired
	private MailService mailService;

	@Autowired
	private Configuration configuration; 

	@RequestMapping(value = "/login", produces = "application/json;charset=UTF-8")
	public Object login(@RequestParam(name = "userName") String userName, @RequestParam(name = "password") String password, HttpSession session) {
		User user = userService.login(userName, password);
		List<UserPermission> selectUserPermission = resourceService.selectUserPermission(userName);
		List<Resource> userResources = new ArrayList<Resource>();
		if (!CollectionUtils.isEmpty(selectUserPermission)) {
			for (UserPermission userPermission : selectUserPermission) {
				List<Resource> resources = userPermission.getResources();
				userResources.addAll(resources);
			}
		}
		session.setAttribute("userResources", userResources);
		LoginUser loginUser = new LoginUser();
		BeanUtils.copyProperties(user, loginUser);
		loginUser.setPassword(null);
		session.setAttribute("user", loginUser);
		return MyJsonUtil.success(selectUserPermission).toJSONString();
	}

	@RequestMapping(value = "/info", produces = "application/json;charset=UTF-8")
	public Object info(String account, String password, HttpSession session) {
		LoginUser user = (LoginUser) session.getAttribute("user");
		return MyJsonUtil.success(user).toJSONString();
	}

	@RequestMapping(value = "/list", produces = "application/json;charset=UTF-8")
	public Object listDetailUsers(HttpSession session, @RequestParam(name = "pageNo") Integer pageNo, @RequestParam(name = "pageSize") Integer pageSize) {
		Object users = userService.listDetailUsers(pageNo, pageSize);
		return MyJsonUtil.success(users).toJSONString();
	}

	@RequestMapping(value = "/getSessionId")
	public String getSessionId(HttpServletRequest request) {

		Object o = request.getSession().getAttribute("springboot");
		if (o == null) {
			o = "spring boot 牛逼了!!!有端口" + request.getLocalPort() + "生成";
			request.getSession().setAttribute("springboot", o);
		}

		return "端口=" + request.getLocalPort() + " sessionId=" + request.getSession().getId() + "<br/>" + o;
	}

	@RequestMapping(value = "/regist")
	public Object regist(@RequestParam(name = "userName") String userName, @RequestParam(name = "password") String password,
			@RequestParam(name = "confirmPassword") String confirmPassword, @RequestParam(name = "phone") String phone,
			@RequestParam(name = "email") String email, @RequestParam(name = "departmentId") Long departmentId) {
		userService.regist(userName, password, confirmPassword, phone, email, departmentId);
		return MyJsonUtil.success("注册成功").toJSONString();
	}

	@RequestMapping(value = "/delete")
	public Object delete(@RequestParam(name = "userId") Long userId) {
		userService.delete(userId);
		return MyJsonUtil.success("删除成功").toJSONString();
	}

	@RequestMapping(value = "/sendCode")
	public Object sendCode(@RequestParam(name = "userName") String userName, @RequestParam(name = "type") int type) {
		User user = userService.sendCode(userName, type);
		return MyJsonUtil.success(user).toJSONString();
	}

	@RequestMapping(value = "/resetPwd")
	public Object resetPwd(@RequestParam(name = "userName") String userName, @RequestParam(name = "verifyCode") String verifyCode,
			@RequestParam(name = "password") String password) {
		userService.resetPwd(userName, verifyCode, password);
		return MyJsonUtil.success("修改成功").toJSONString();
	}

	/**
	 * 用户中心修改密码
	 */
	@RequestMapping(value = "/updatePwd")
	public Object updatePwd(@RequestParam(name = "password") String password, @RequestParam(name = "confirmPassword") String newPassword,
			@RequestParam(name = "confirmPassword") String confirmPassword, HttpSession session) {
		LoginUser loginUser = (LoginUser) session.getAttribute("user");
		userService.updatePwd(loginUser.getUserId(), password, newPassword, confirmPassword);
		return MyJsonUtil.success("修改成功").toJSONString();
	}

	/**
	 * 提升下一级权限申请
	 */
	@RequestMapping(value = "/apply")
	public Object apply(HttpSession session) {
		LoginUser loginUser = (LoginUser) session.getAttribute("user");
		userService.apply(loginUser.getUserId());
		return MyJsonUtil.success("success").toJSONString();
	}

	/**
	 * 审核用户提升权限申请 status 0驳回,1通过
	 */
	@RequestMapping(value = "/audit")
	public Object audit(@RequestParam(name = "status") Integer status, @RequestParam(name = "applyId") Long applyId, HttpSession session) {
		LoginUser loginUser = (LoginUser) session.getAttribute("user");
		userService.audit(loginUser.getUserId(), status, applyId);
		return MyJsonUtil.success("success").toJSONString();
	}

	/**
	 * 修改用户信息
	 */
	@RequestMapping(value = "/update")
	public Object update(@RequestParam(name = "userId") Long userId, @RequestParam(name = "departmentId", required = false) Long departmentId,
			@RequestParam(name = "roleId", required = false) Byte roleId, HttpSession session) {
		LoginUser loginUser = (LoginUser) session.getAttribute("user");
		userService.update(userId, departmentId, roleId, loginUser.getUserId());
		return MyJsonUtil.success("success").toJSONString();
	}

	@RequestMapping(value = "/createUser")
	public Object createUser(@RequestParam(name = "userName") String userName, @RequestParam(name = "password") String password,
			@RequestParam(name = "confirmPassword") String confirmPassword, @RequestParam(name = "phone") String phone,
			@RequestParam(name = "email") String email, @RequestParam(name = "departmentId") Long departmentId, 
			@RequestParam(name = "roleId") Byte roleId) {
		userService.createUser(userName, password, confirmPassword, phone, email, departmentId, roleId);
		return MyJsonUtil.success("注册成功").toJSONString();
	}
}
