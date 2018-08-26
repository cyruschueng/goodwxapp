package com.sl.dao;

import com.sl.bean.BCrypt;
import com.sl.util.DBLink;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Login {
    Connection conn;
    Statement stat;
    ResultSet rs;
    public boolean check(String phone,String password){
        conn= DBLink.getConnection();
        String sql="SELECT password,phone from user";
        try {
            stat=conn.createStatement();
            rs=stat.executeQuery(sql);
            while (rs.next()){
                if(rs.getString("phone").equals(phone)){
                    boolean res=BCrypt.checkpw(password,rs.getString("password"));
                    if(res){
                        return true;
                    }else {
                        return false;
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
}
