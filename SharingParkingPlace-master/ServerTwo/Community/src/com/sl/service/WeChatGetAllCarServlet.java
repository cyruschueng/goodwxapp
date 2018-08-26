package com.sl.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sl.bean.WeChatCar;
import com.sl.bean.WeChatEquipment;
import com.sl.dao.WeChatGetCar;
import com.sl.dao.WeChatGetEquipment;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/WeChatGetAllCarServlet")
public class WeChatGetAllCarServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        List<WeChatCar> list=new ArrayList<WeChatCar>();
        WeChatGetCar weChatGetCar=new WeChatGetCar();
        try {
            list=weChatGetCar.getAllCar();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        JSONArray jsonArray=new JSONArray();
        JSONObject jsonObject=new JSONObject();
        jsonArray.addAll(list);
        jsonObject.put("data",jsonArray);
        jsonObject.put("total",jsonArray.size());
        response.getWriter().write(jsonObject.toString());
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
