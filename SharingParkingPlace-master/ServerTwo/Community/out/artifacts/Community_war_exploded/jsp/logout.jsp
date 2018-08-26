<%@ page import="org.apache.catalina.Session" %><%--
  Created by IntelliJ IDEA.
  User: 矢量
  Date: 2018/4/7
  Time: 11:22
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<%
    String phone= (String) session.getAttribute("phone");
    session.setAttribute(phone,false);
    session.setAttribute("phone",null);
    response.sendRedirect("../index.jsp");
%>
</body>
</html>
