package com.sl.dao;

import com.sl.bean.WeChatDeal;
import com.sl.util.DBLink;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class WeChatGetDeal {
    Connection conn;
    Statement stat;
    ResultSet rs;
    WeChatDeal weChatDea1=new WeChatDeal();
    List<WeChatDeal> list = new ArrayList<WeChatDeal>();
    public List<WeChatDeal> getAllDeal() throws SQLException {
        conn = DBLink.getConnection();
        String sql = "SELECT * From deal";
        stat = conn.createStatement();
        rs = stat.executeQuery(sql);
        while (rs.next()) {
            weChatDea1 = new WeChatDeal();
            weChatDea1.setId(rs.getInt("id"));
            weChatDea1.setUser_id(rs.getInt("user_id"));
            weChatDea1.setHardware_id(rs.getString("hardware_id"));
            weChatDea1.setLicence_plate(rs.getString("licence_plate"));
            weChatDea1.setPirce(rs.getDouble("price"));
            weChatDea1.setStart_time(rs.getString("start_time"));
            weChatDea1.setEnd_time(rs.getString("end_time"));
            weChatDea1.setPressure(rs.getInt("pressure"));
            weChatDea1.setUser_controller(rs.getInt("user_controller"));
            weChatDea1.setCompleted(rs.getInt("completed"));
            list.add(weChatDea1);
        }
        return list;
    }
}
