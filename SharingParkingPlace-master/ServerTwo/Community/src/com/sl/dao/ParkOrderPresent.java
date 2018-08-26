package com.sl.dao;

import com.sl.bean.ParkDeal;
import com.sl.util.DBLink;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class ParkOrderPresent {
    Connection conn;
    Statement stat;
    ResultSet rs;
    ParkDeal deal=new ParkDeal();
    List<ParkDeal> list = new ArrayList<ParkDeal>();

    public List<ParkDeal> getAllDeal(String phone) throws SQLException {
        conn = DBLink.getConnection();
//        String sql = "SELECT licence_plate,start_time,end_time,price FROM deal WHERE completed=1 AND user_id IN (" + "SELECT user_id from user WHERE phone=" + phone + ")";
        String sql = "SELECT hardware_id,licence_plate,start_time,end_time,price FROM deal WHERE completed=0 AND hardware_id IN (" + "SELECT hardware_id from equipment WHERE user_id IN (" + "SELECT user_id from user WHERE phone=" + phone + ")"+")";
        stat = conn.createStatement();
        rs = stat.executeQuery(sql);
        while (rs.next()) {
            deal = new ParkDeal();
            deal.setHardware_id(rs.getString("hardware_id"));
            deal.setLicence_plate(rs.getString("licence_plate"));
            deal.setStart_time(rs.getString("start_time"));
            deal.setEnd_time(rs.getString("end_time"));
            deal.setPrice(rs.getDouble("price"));
            list.add(deal);
        }
        return list;
    }
}
