package com.sl.dao;

import com.sl.bean.CarDeal;
import com.sl.bean.WeChatCar;
import com.sl.util.DBLink;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class WeChatGetCar {
    Connection conn;
    Statement stat;
    ResultSet rs;
    WeChatCar weChatCar=new WeChatCar();
    List<WeChatCar> list = new ArrayList<WeChatCar>();
    public List<WeChatCar> getAllCar() throws SQLException{
        conn = DBLink.getConnection();
        String sql = "SELECT * From car";
        stat = conn.createStatement();
        rs = stat.executeQuery(sql);
        while (rs.next()) {
            weChatCar = new WeChatCar();
            weChatCar.setLicence_plate(rs.getString("licence_plate"));
            weChatCar.setUser_id(rs.getInt("user_id"));
            list.add(weChatCar);
        }
        return list;
    }
}
