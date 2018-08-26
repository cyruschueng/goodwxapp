package com.visualbusiness.pano.news.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.visualbusiness.pano.news.dao.FunctionManagementDao;
import com.visualbusiness.pano.news.dao.UserPermissionGroupDao;
import com.visualbusiness.pano.news.model.FunctionManagement;
import com.visualbusiness.pano.news.model.UserPermissionGroup;
import com.visualbusiness.pano.news.service.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;

@Service("userService")
public class UserServiceImpl implements UserService {

    @Resource
    UserPermissionGroupDao userPermissionGroupDao;
    @Resource
    FunctionManagementDao functionManagementDao;

    /**
     * 根据权限id获取权限目录
     *
     * @param roleId
     * @return
     */
    @Override
    public List<Map<String, Object>> getFunctionByRoleId(String roleId) {
        //根据权限id获取所具有的权限
        UserPermissionGroup userPermissionGroup = userPermissionGroupDao.findByGroupId(Integer.parseInt(roleId));
        String groupPermission = userPermissionGroup.getGroupPermission();
        JSONArray array = JSONArray.parseArray(groupPermission);
        List<Map<String, Object>> result = new LinkedList<Map<String, Object>>();
        for (int i = 0; i < array.size(); i++) {
            Map<String, Object> map = new LinkedHashMap<String, Object>();
            JSONObject obj = (JSONObject) array.get(i);
            String fatherId = obj.getString("key");
            FunctionManagement functionManagement = functionManagementDao.findByFunctionManagementId(Integer.parseInt(fatherId));
            map.put("name", functionManagement.getFunctionName());
            List<Integer> children = (List<Integer>) obj.get(fatherId);
            List<Map<String,Object>> list = new LinkedList<Map<String,Object>>();
            for (Integer id : children) {
                Map<String,Object> info = new HashMap<String,Object>();
                FunctionManagement child = functionManagementDao.findByFunctionManagementId(id);
                info.put("name",child.getFunctionName());
                info.put("link",child.getFunctionUrl());
                info.put("type",child.getType());
                list.add(info);
            }
            map.put("children", list);
            result.add(map);
        }
        return result;
    }
}
