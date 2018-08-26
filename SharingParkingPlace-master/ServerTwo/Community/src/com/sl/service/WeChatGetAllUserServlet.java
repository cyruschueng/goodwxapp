package com.sl.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sl.bean.WeChatUser;
import com.sl.dao.WeChatGetCar;
import com.sl.dao.WeChatGetUser;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/WeChatGetAllUserServlet")
public class WeChatGetAllUserServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        List<WeChatUser> list=new ArrayList<WeChatUser>();
        WeChatGetUser weChatGetUser=new WeChatGetUser();
        try {
            list=weChatGetUser.getAllUser();
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
