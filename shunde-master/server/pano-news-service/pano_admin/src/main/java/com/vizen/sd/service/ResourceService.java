package com.vizen.sd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vizen.sd.repository.mysql.domain.UserPermission;
import com.vizen.sd.repository.mysql.mapper.ResourceMapper;
import com.vizen.sd.utils.ValidateUtil;

/**
 * 名片业务逻辑
 *
 */
@Service
public class ResourceService {

	@Autowired
	private ResourceMapper resourceMapper;

	public List<UserPermission> selectUserPermission(String userName) {
		ValidateUtil.notEmpty(userName, "userName不能为空");
		return resourceMapper.selectUserPermission(userName);
	};
}
