package com.javen.dao;

import com.javen.model.User;


public interface IUserDao {
    int deleteByPrimaryKey(Integer id);

    // 注册接口，插入用户信息
    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(Integer id);
    
    // 登录接口，根据username获取用户相关信息
    User selectByUserName(String username);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);
}