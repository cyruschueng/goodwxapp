package com.sl.dao;

import com.sl.bean.Car;
import com.sl.bean.ParkingSpace;
import com.sl.util.DBLink;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class CheckCars {
    Connection conn;
    Statement stat;
    ResultSet rs;
    Car car = new Car();
    List<Car> list = new ArrayList<Car>();

    public List<Car> getAllCars(String phone) {
        conn = DBLink.getConnection();
        String sql = "SELECT licence_plate FROM car WHERE user_id IN (" + "SELECT user_id from user WHERE phone=" + phone + ")";
        try {
            stat = conn.createStatement();
            rs = stat.executeQuery(sql);
            while (rs.next()) {
                car = new Car();
                car.setLicence_plate(rs.getString("licence_plate"));
                list.add(car);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return list;
    }

}
