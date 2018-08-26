package com.sl.dao;

import com.sl.util.DBLink;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class GetUserId {
    Connection conn;
    Statement stat;
    ResultSet rs;

    public String getUserId(String phone) {
        conn = DBLink.getConnection();
        String sql = "SELECT user_id from user Where phone="+phone;
        try {
            stat = conn.createStatement();
            rs = stat.executeQuery(sql);
            return rs.getString("user_id");
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return "";
    }
}
