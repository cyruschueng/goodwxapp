package com.sl.service;

import com.sl.dao.Login;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String phone=request.getParameter("phone");
        String password=request.getParameter("password");
        Login login=new Login();
        boolean res=login.check(phone,password);
        response.setContentType("text/html;charset=UTF-8");
        if(res){
            HttpSession session=request.getSession();
            session.setAttribute("phone",phone);
            session.setAttribute(phone,true);

            response.sendRedirect("jsp/content.jsp");
            response.getWriter().write("<script>alert('登录成功!')</script>");
        }else{

            response.getWriter().write("<script>alert('手机号或密码错误,请重新输入!')</script>");
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
