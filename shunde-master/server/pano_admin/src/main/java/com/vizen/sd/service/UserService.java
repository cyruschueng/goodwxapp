package com.vizen.sd.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.vizen.framework.exception.base.MyBaseException;
import com.vizen.sd.repository.mysql.domain.PermissionApply;
import com.vizen.sd.repository.mysql.domain.User;
import com.vizen.sd.repository.mysql.domain.UserCriteria;
import com.vizen.sd.repository.mysql.mapper.PermissionApplyMapper;
import com.vizen.sd.repository.mysql.mapper.UserMapper;
import com.vizen.sd.utils.RandomUtil;
import com.vizen.sd.utils.ValidateUtil;
import com.vizen.sd.utils.DateUtils;

import freemarker.template.Configuration;
import freemarker.template.Template;

/**
 * 名片业务逻辑
 *
 */
@Service
public class UserService {

	@Autowired
	RedisTemplate<String, String> redisTemplate;

	@Autowired
	private UserMapper userMapper;

	@Autowired
	private PermissionApplyMapper permissionApplyMapper;
	
	@Autowired
	private MailService mailService;

	@Autowired
	private Configuration configuration; 

	public void regist(String userName, String password, String confirmPassword, String phone, String email, Long departmentId) {
		ValidateUtil.notEmpty(userName, "用户名不能为空!");
		ValidateUtil.notEmpty(password, "密码不能为空!");
		ValidateUtil.notEmpty(confirmPassword, "确认密码不能为空!");
		ValidateUtil.notEmpty(phone, "手机号不能为空!");
		ValidateUtil.notEmpty(email, "邮箱不能为空!");
		ValidateUtil.notNull(departmentId, "部门不能为空");

		UserCriteria userNameExample = new UserCriteria();
		userNameExample.createCriteria().andUserNameEqualTo(userName).andIsValidEqualTo((byte) 1);
		long countByUserNameExample = userMapper.countByExample(userNameExample);
		if (countByUserNameExample > 0) {
			throw new MyBaseException("用户名已经被使用!");
		}

		UserCriteria phoneExample = new UserCriteria();
		phoneExample.createCriteria().andPhoneEqualTo(phone).andIsValidEqualTo((byte) 1);
		long countByPhoneExample = userMapper.countByExample(phoneExample);
		if (countByPhoneExample > 0) {
			throw new MyBaseException("手机号已经被使用!");
		}

		UserCriteria emailExample = new UserCriteria();
		emailExample.createCriteria().andEmailEqualTo(email).andIsValidEqualTo((byte) 1);
		long countByEmailExample = userMapper.countByExample(emailExample);
		if (countByEmailExample > 0) {
			throw new MyBaseException("邮箱已经被使用!");
		}

		if (!password.equals(confirmPassword)) {
			throw new MyBaseException("两次输入密码不一致!");
		}

		User record = new User();
		record.setCreateTime(new Date());
		record.setDepartmentId(departmentId);
		record.setEmail(email);
		record.setLastEditTime(new Date());
		record.setPassword(password);
		record.setPhone(phone);
		record.setRoleId((byte) 1);
		record.setUserName(userName);
		userMapper.insertSelective(record);

	}

	public User login(String userName, String password) {
		UserCriteria example = new UserCriteria();
		example.createCriteria().andUserNameEqualTo(userName).andPasswordEqualTo(password).andIsValidEqualTo((byte) 1);
		long countByExample = userMapper.countByExample(example);
		if (countByExample < 0) {
			throw new MyBaseException("用户名或密码错误,请重试");
		}
		List<User> selectByExample = userMapper.selectByExample(example);

		return selectByExample.get(0);
	}

	public User sendCode(String userName, int type) {

		UserCriteria example = new UserCriteria();
		example.createCriteria().andUserNameEqualTo(userName).andIsValidEqualTo((byte) 1);

		List<User> selectByExample = userMapper.selectByExample(example);
		if (CollectionUtils.isEmpty(selectByExample)) {
			throw new MyBaseException(String.format("该用户【%s】不存在", userName));
		}
		User user = selectByExample.get(0);
		// if ()
		long resendseconds = 60;
		String resendLimitKey = getResendLimitKey(userName);

		// 查询是否能发送,resendLimitKey秒前有没有发送过
		String sendLimit = redisTemplate.opsForValue().get(resendLimitKey);
		if (!StringUtils.isEmpty(sendLimit)) {
			throw new MyBaseException("发送频繁，" + resendseconds + "秒内不能重复发送。");
		}

		// 生成验证码
		String verifyCode = RandomUtil.generateNum(6, true);

		// TODO发送信息
		if (type == 1) {
			// TODO发送短信
			String msg = "【顺德区地区国情监测全景平台】，你的验证码是：{1}，验证码5分钟内有效。";
			msg = msg.replaceAll("\\{1\\}", verifyCode);
		} else {
			String url = "http://www.baidu.com";
			Map<String, Object> model = new HashMap<String, Object>();
			model.put("time", DateUtils.nowToString());
			model.put("verifyCode", verifyCode);
			model.put("userName", userName);
			model.put("url", url);
			
			try {
				Template t = configuration.getTemplate("reset.ftl");
				String content = FreeMarkerTemplateUtils.processTemplateIntoString(t, model);
				mailService.sendHtmlMail(user.getEmail(), "\"顺德区地理国情监测全景平台\"密码重置", content);
			} catch (Exception e) {
				throw new MyBaseException("发送邮件失败", e);
			}
		}

		// 验证码写入redis
		String verifyKey = getVerifyKey(userName);
		redisTemplate.opsForValue().set(verifyKey, verifyCode, 60 * 5, TimeUnit.SECONDS);
		// 过期时间写入redis
		redisTemplate.opsForValue().set(resendLimitKey, "lock", resendseconds, TimeUnit.SECONDS);
		return user;
	}

	private String getVerifyKey(String userName) {
		return userName + "_sendcode_verify";
	}

	private String getResendLimitKey(String userName) {
		return userName + "__sendcode_limit";
	}

	public void resetPwd(String userName, String verifyCode, String password) {
		ValidateUtil.notEmpty(userName, "用户名不能为空!");
		ValidateUtil.notEmpty(verifyCode, "验证码不能为空!");
		ValidateUtil.notEmpty(password, "新密码不能为空!");
		checkVerifyCode(userName, verifyCode);
		
		UserCriteria example = new UserCriteria();
		example.createCriteria().andUserNameEqualTo(userName).andIsValidEqualTo((byte) 1);
		User record = new User();
		record.setPassword(password);
		record.setLastEditTime(new Date());
		userMapper.updateByExampleSelective(record, example);
	}

	public boolean checkVerifyCode(String userName, String verifyCode) {
		String verifyKey = getVerifyKey(userName);
		String resendLimitKey = getResendLimitKey(userName);
		String redisVerifyCode = redisTemplate.opsForValue().get(verifyKey);
		if (StringUtils.isEmpty(redisVerifyCode)) {
			throw new MyBaseException("验证码已过期，请重新发送。");
		}
		// 验证码正确删除掉redis的值
		if (verifyCode.equals(redisVerifyCode)) {
			redisTemplate.delete(verifyKey);
			redisTemplate.delete(resendLimitKey);
			return true;
		} else {
			throw new MyBaseException("验证码错误。");
		}
	}

	public void updatePwd(Long userId, String password, String newPassword, String confirmPassword) {
		ValidateUtil.notEmpty(password, "当前密码不能为空!");
		ValidateUtil.notEmpty(newPassword, "新密码不能为空!");
		ValidateUtil.notEmpty(confirmPassword, "确认密码不能为空!");
		User selectByPrimaryKey = userMapper.selectByPrimaryKey(userId);
		if (!password.equals(selectByPrimaryKey.getPassword())) {
			throw new MyBaseException("当前密码不正确!");
		}

		if (!newPassword.equals(confirmPassword)) {
			throw new MyBaseException("两次密码输入不一致!");
		}

		User record = new User();
		record.setUserId(userId);
		record.setPassword(newPassword);
		record.setLastEditTime(new Date());
		userMapper.updateByPrimaryKeySelective(record);
	}

	public Object listDetailUsers(Integer pageNo, Integer pageSize) {
		Page<User> page = PageHelper.offsetPage((pageNo - 1) * pageSize, pageSize, true);
		List<User> o = userMapper.selectDetailUsers();
		JSONObject data = new JSONObject();
		data.put("list", o);
		data.put("total", page.getTotal());
		return data;
	}

	public void audit(Long userId, Integer status, Long applyId) {
		ValidateUtil.notNull(status, "审核状态不能为空!");
		ValidateUtil.notNull(applyId, "审核Id不能为空!");
		if (status != 0 && status != 1) {
			throw new MyBaseException("审核状态不正确!");
		}
		PermissionApply record = new PermissionApply();
		record.setApplyId(applyId);
		record.setAuditUserId(userId);
		record.setAuditTime(new Date());
		// 审核通过
		if (status == 1) {
			record.setStatus((byte) 2);
			permissionApplyMapper.updateByPrimaryKeySelective(record);
			PermissionApply selectByPrimaryKey = permissionApplyMapper.selectByPrimaryKey(applyId);
			User userRecord = new User();
			userRecord.setUserId(selectByPrimaryKey.getApplyUserId());
			userRecord.setRoleId(selectByPrimaryKey.getApplyRoleType());
			userRecord.setLastEditTime(new Date());
			userRecord.setLastEditUserId(userId);
			userMapper.updateByPrimaryKeySelective(userRecord);
		} else {
			record.setStatus((byte) 3);
			permissionApplyMapper.updateByPrimaryKeySelective(record);
		}

	}

	public void apply(Long userId) {
		User selectByPrimaryKey = userMapper.selectByPrimaryKey(userId);
		Byte roleId = selectByPrimaryKey.getRoleId();
		if (roleId == 3) {
			throw new MyBaseException("当前用户已经为管理员不能提升等级!");
		}
		PermissionApply record = new PermissionApply();
		record.setApplyRoleType((byte) (roleId + 1));
		record.setApplyUserId(userId);
		record.setCreateTime(new Date());
		permissionApplyMapper.insertSelective(record);
	}

	public void delete(Long userId) {
		ValidateUtil.notNull(userId, "userId不能为空!");
		User record = new User();
		record.setUserId(userId);
		record.setIsValid((byte) 0);
		userMapper.updateByPrimaryKey(record);
	}

	public void update(Long userId, Long departmentId, Byte roleId, Long loginUserId) {
		ValidateUtil.notNull(userId, "修改用户ID不能为空!");
		User record = new User();
		record.setUserId(userId);
		record.setDepartmentId(departmentId);
		record.setRoleId(roleId);
		record.setLastEditUserId(loginUserId);
		record.setLastEditTime(new Date());
		userMapper.updateByPrimaryKey(record);
	}

	public void createUser(String userName, String password, String confirmPassword, String phone, String email, Long departmentId, Byte roleId) {
		
		ValidateUtil.notEmpty(userName, "用户名不能为空!");
		ValidateUtil.notEmpty(password, "密码不能为空!");
		ValidateUtil.notEmpty(confirmPassword, "确认密码不能为空!");
		ValidateUtil.notEmpty(phone, "手机号不能为空!");
		ValidateUtil.notEmpty(email, "邮箱不能为空!");
		ValidateUtil.notNull(departmentId, "部门不能为空");
		ValidateUtil.notNull(roleId, "权限等级不能为空");
		
		if (roleId != 1 && roleId != 2 && roleId != 3) {
			throw new MyBaseException("权限等级不正确!");
		}
		
		UserCriteria userNameExample = new UserCriteria();
		userNameExample.createCriteria().andUserNameEqualTo(userName).andIsValidEqualTo((byte) 1);
		long countByUserNameExample = userMapper.countByExample(userNameExample);
		if (countByUserNameExample > 0) {
			throw new MyBaseException("用户名已经被使用!");
		}

		UserCriteria phoneExample = new UserCriteria();
		phoneExample.createCriteria().andPhoneEqualTo(phone).andIsValidEqualTo((byte) 1);
		long countByPhoneExample = userMapper.countByExample(phoneExample);
		if (countByPhoneExample > 0) {
			throw new MyBaseException("手机号已经被使用!");
		}

		UserCriteria emailExample = new UserCriteria();
		emailExample.createCriteria().andEmailEqualTo(email).andIsValidEqualTo((byte) 1);
		long countByEmailExample = userMapper.countByExample(emailExample);
		if (countByEmailExample > 0) {
			throw new MyBaseException("邮箱已经被使用!");
		}

		if (!password.equals(confirmPassword)) {
			throw new MyBaseException("两次输入密码不一致!");
		}

		User record = new User();
		record.setCreateTime(new Date());
		record.setDepartmentId(departmentId);
		record.setEmail(email);
		record.setLastEditTime(new Date());
		record.setPassword(password);
		record.setPhone(phone);
		record.setUserName(userName);
		record.setRoleId(roleId);
		userMapper.insertSelective(record);

	}
}
