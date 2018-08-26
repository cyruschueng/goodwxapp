package com.sl.dao;

import com.sl.bean.CarDeal;
import com.sl.util.DBLink;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class CarOrderHistory {
    Connection conn;
    Statement stat;
    ResultSet rs;
    CarDeal deal = new CarDeal();
    List<CarDeal> list = new ArrayList<CarDeal>();

    public List<CarDeal> getAllDeal(String phone) throws SQLException {
        conn = DBLink.getConnection();
//        String sql = "SELECT licence_plate,start_time,end_time,price FROM deal WHERE completed=1 AND user_id IN (" + "SELECT user_id from user WHERE phone=" + phone + ")";
        String sql = "SELECT licence_plate,start_time,end_time,price FROM deal WHERE completed=1 AND licence_plate IN (" + "SELECT licence_plate from car WHERE user_id IN (" + "SELECT user_id from user WHERE phone=" + phone + ")"+")";
        stat = conn.createStatement();
        rs = stat.executeQuery(sql);
        while (rs.next()) {
            deal = new CarDeal();
            deal.setLicence_plate(rs.getString("licence_plate"));
            deal.setStart_time(rs.getString("start_time"));
            deal.setEnd_time(rs.getString("end_time"));
            deal.setPrice(rs.getDouble("price"));
            list.add(deal);
        }
        return list;
    }
}

