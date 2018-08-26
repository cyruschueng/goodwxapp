package com.sl.service;

import com.sl.dao.CreateOrder;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/CreateOrderServlet")
public class CreateOrderServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        String hardware_id=request.getParameter("hardware_id");
        String start_time=request.getParameter("start_time");
        String end_time=request.getParameter("end_time");
        CreateOrder createOrder=new CreateOrder();
        boolean res=createOrder.createOrder(start_time,end_time,hardware_id);
        response.setContentType("text/html;charset=UTF-8");
        if(res){
            response.getWriter().write("<script>alert('订单发布成功，请查看')</script>");
        }else{
            response.getWriter().write("<script>alert('出现故障，请稍后再试')</script>");
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
