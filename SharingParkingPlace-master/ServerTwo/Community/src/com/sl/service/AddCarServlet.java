package com.sl.service;

import com.sl.bean.Car;
import com.sl.dao.AddCar;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet("/AddCarServlet")
public class AddCarServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        Car car=new Car();
        car.setLicence_plate(request.getParameter("licence_plate"));
        HttpSession session=request.getSession();
        String phone= (String) session.getAttribute("phone");
        AddCar addCar=new AddCar();
        boolean res=addCar.register(car,phone);
        System.out.println(car.getLicence_plate()+"\n"+phone+"111");
        response.setContentType("text/html;charset=UTF-8");
        if(res){
            response.getWriter().write("<script>alert('注册成功')</script>");
        }else {
            response.getWriter().write("<script>alert('车牌号已经注册')</script>");
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
