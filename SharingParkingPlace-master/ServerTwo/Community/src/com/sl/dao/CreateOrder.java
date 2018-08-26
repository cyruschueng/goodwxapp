package com.sl.dao;

import com.sl.bean.BCrypt;
import com.sl.util.DBLink;

import java.sql.*;

public class CreateOrder {
    Connection conn;
    Statement stat;
    ResultSet rs;
    public boolean createOrder(String start_time,String end_time,String hardware_id){
        conn= DBLink.getConnection();
        String sql="UPDATE equipment SET start_time='"+start_time+"',end_time='"+end_time+"',state=0 WHERE hardware_id='"+hardware_id+"'";
//        String sql="UPDATE equipment SET state=0 WHERE hardware_id='"+hardware_id+"'";
        try {
            stat=conn.createStatement();
            stat.executeUpdate(sql);
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}
