package com.sl.dao;

import com.sl.bean.ParkingSpace;
import com.sl.util.DBLink;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class CheckParkingSpace {
    Connection conn;
    Statement stat;
    ResultSet rs;
    ParkingSpace parking_space = new ParkingSpace();
    List<ParkingSpace> list = new ArrayList<ParkingSpace>();

    public List<ParkingSpace> getAllParking_space(String phone) {
        conn = DBLink.getConnection();
        String sql = "SELECT hardware_id,location,address,state FROM equipment WHERE user_id IN (" + "SELECT user_id from user WHERE phone=" + phone + ")";
        try {
            stat = conn.createStatement();
            rs = stat.executeQuery(sql);
            while (rs.next()) {
                parking_space = new ParkingSpace();
                parking_space.setHardware_id(rs.getString("hardware_id"));
                parking_space.setLocation(rs.getString("location"));
                parking_space.setAddress(rs.getString("address"));
                parking_space.setState(rs.getInt("state"));
                list.add(parking_space);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }
}
