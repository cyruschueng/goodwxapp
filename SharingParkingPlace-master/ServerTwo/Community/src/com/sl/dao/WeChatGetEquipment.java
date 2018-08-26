package com.sl.dao;

import com.sl.bean.WeChatCar;
import com.sl.bean.WeChatEquipment;
import com.sl.util.DBLink;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class WeChatGetEquipment {
    Connection conn;
    Statement stat;
    ResultSet rs;
    WeChatEquipment weChatEquipment=new WeChatEquipment();
    List<WeChatEquipment> list = new ArrayList<WeChatEquipment>();
    public List<WeChatEquipment> getAllEquipment() throws SQLException {
        conn = DBLink.getConnection();
        String sql = "SELECT * From equipment";
        stat = conn.createStatement();
        rs = stat.executeQuery(sql);
        while (rs.next()) {
            weChatEquipment = new WeChatEquipment();
            weChatEquipment.setHardware_id(rs.getString("hardware_id"));
            weChatEquipment.setUser_id(rs.getInt("user_id"));
            weChatEquipment.setLocation(rs.getString("location"));
            weChatEquipment.setAddress(rs.getString("address"));
            weChatEquipment.setState(rs.getInt("state"));
            list.add(weChatEquipment);
        }
        return list;
    }
}
