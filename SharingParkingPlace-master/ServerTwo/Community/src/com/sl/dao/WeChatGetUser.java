package com.sl.dao;

import com.sl.bean.WeChatCar;
import com.sl.bean.WeChatUser;
import com.sl.util.DBLink;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class WeChatGetUser {
    Connection conn;
    Statement stat;
    ResultSet rs;
    WeChatUser weChatUser=new WeChatUser();
    List<WeChatUser> list = new ArrayList<WeChatUser>();
    public List<WeChatUser> getAllUser() throws SQLException {
        conn = DBLink.getConnection();
        String sql = "SELECT * From user";
        stat = conn.createStatement();
        rs = stat.executeQuery(sql);
        while (rs.next()) {
            weChatUser = new WeChatUser();
            weChatUser.setUser_id(rs.getInt("user_id"));
            weChatUser.setUsername(rs.getString("username"));
            weChatUser.setPassword(rs.getString("password"));
            weChatUser.setPhone(rs.getString("phone"));
            weChatUser.setMoney(rs.getDouble("money"));
            list.add(weChatUser);
        }
        return list;
    }
}
