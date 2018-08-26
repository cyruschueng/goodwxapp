package com.sl.dao;

import com.sl.bean.BCrypt;
import com.sl.bean.User;
import com.sl.util.DBLink;

import java.sql.*;

public class UserRegister {
    Connection conn;
    Statement stat;
    ResultSet rs;
    public String register(User user){
        //        查找是否有用户名重复
        conn= DBLink.getConnection();
        String sql="SELECT phone from user";
        try {
            stat=conn.createStatement();
            rs=stat.executeQuery(sql);
            String phone= user.getPhone();
            while (rs.next()){
                if(rs.getString("phone").equals(phone)){
                    return "fail";
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        sql="INSERT INTO user(username,password,phone,money) VALUES (?,?,?,?)";
        String password= BCrypt.hashpw(user.getPassword(),BCrypt.gensalt());
        try {
            PreparedStatement ps=conn.prepareStatement(sql);
            ps.setString(1, user.getUsername());
            ps.setString(2, password);
            ps.setString(3, user.getPhone());
            ps.setDouble(4,0.0);
            ps.executeUpdate();
            return "true";
        } catch (SQLException e) {
            e.printStackTrace();
            return "false";
        }
    }
}
