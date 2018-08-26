package com.visualbusiness.pano.news.service;

import java.util.List;
import java.util.Map;

public interface UserService {
	/**
	 * 根据权限id获取权限目录
	 * @param roleId
	 * @return
     */
	public List<Map<String,Object>> getFunctionByRoleId(String roleId);
}
