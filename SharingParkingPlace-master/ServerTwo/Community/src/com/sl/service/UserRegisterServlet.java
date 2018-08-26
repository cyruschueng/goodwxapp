package com.sl.service;

import com.sl.bean.User;
import com.sl.dao.UserRegister;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/UserRegisterServlet")
public class UserRegisterServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username=request.getParameter("username");
        String password=request.getParameter("password");
        String phone=request.getParameter("phone");
        User user =new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setPhone(phone);
        UserRegister register=new UserRegister();
        String res=register.register(user);
        response.setContentType("text/html;charset=UTF-8");
        if (res == "fail") {
            response.getWriter().write("<script>alert('手机号已经注册，请重新输入!')</script>");
        } else if (res == "true") {
            response.getWriter().write("<script>alert('注册成功，请登录吧!')</script>");
//            response.sendRedirect("jsp/login.jsp");
        } else {
            response.getWriter().write("<script>alert('手机号已经注册，请重新输入!')</script>");
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
