package com.javen.service;  

import com.javen.model.User;
  
  
public interface IUserService {  
	
	// 测试接口方法，根据id获取当前用户信息
    public User getUserById(int userId); 
    
    // 登录接口方法，根据username获取用户信息
    public User getUserByUserName(String username);
    
    // 注册接口方法，插入用户信息
    public Integer insert(User record);
    
}  