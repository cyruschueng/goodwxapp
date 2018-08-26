<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>H登录</title>
    <link rel="shortcut icon" href="favicon.ico"> <link href="../css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/font-awesome.min.css" rel="stylesheet">

    <link href="../css/animate.min.css" rel="stylesheet">
    <link href="../css/style.min.css" rel="stylesheet">
    <!--[if lt IE 9]>
    <meta http-equiv="refresh" content="0;ie.html" />
    <![endif]-->
    <script>if(window.top !== window.self){ window.top.location = window.location;}</script>
</head>
<body>
<%
    String phone= (String) session.getAttribute("phone");
    if(session.getAttribute(phone)!=null){
        boolean res= (boolean) session.getAttribute(phone);
        if(res){
            response.sendRedirect("content.jsp");
        }
    }
%>

<div class="middle-box text-center loginscreen  animated fadeInDown">
    <div>
        <div style="margin-top: 120px">
            <h1 style="font-size: 28px">智慧社区-共享车位系统</h1>
        </div>
        <h3>欢迎使用</h3>

        <form class="m-t" role="form" action="/LoginServlet" method="post">
            <div class="form-group">
                <input type="text" name="phone" class="form-control" placeholder="手机号" required="">
            </div>
            <div class="form-group">
                <input type="password" name="password" class="form-control" placeholder="密码" required="">
            </div>
            <button type="submit" class="btn btn-primary block full-width m-b">登 录</button>


            <p class="text-muted text-center"> <a href="#"><small>忘记密码了？</small></a> | <a href="register.jsp">注册一个新账号</a>
            </p>

        </form>
    </div>
</div>
<script src="../js/jquery.min.js"></script>
<script src="../js/bootstrap.min.js"></script>

</body>
</html>
