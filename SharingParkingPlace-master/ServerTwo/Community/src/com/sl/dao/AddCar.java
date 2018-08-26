package com.sl.dao;

import com.sl.bean.Car;
import com.sl.util.DBLink;

import java.sql.*;

public class AddCar {
    Connection conn;
    Statement stat;
    ResultSet rs;

    public boolean register(Car car, String phone) {
        //        查找是否有车牌重复
        String licence_plate = car.getLicence_plate();
        conn = DBLink.getConnection();
        String sql = "SELECT licence_plate from car";
        try {
            stat = conn.createStatement();
            rs = stat.executeQuery(sql);
            while (rs.next()) {
                if (rs.getString("licence_plate").equals(licence_plate)) {
                    return false;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        sql = "SELECT user_id from user WHERE phone=" + phone;
        try {
            stat = conn.createStatement();
            rs = stat.executeQuery(sql);
            int user_id = 0;
            while (rs.next()){
                user_id = rs.getInt("user_id");
            }
            sql = "INSERT INTO car(licence_plate,user_id) VALUES (?,?)";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, licence_plate);
            ps.setInt(2, user_id);
            ps.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}
