<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="info-user.aspx.cs" Inherits="SfSoft.web.game.qzsf.info_user" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>我的资料</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <style>
         .menu{ font-size:16px; padding:6px 8px; border:none; width:100%;}
        .right-line{ border-right:1px solid #fff; border-top-right-radius:0;border-bottom-right-radius:0;}
        .left-line{ border-left:1px solid #fff; border-top-left-radius:0;border-bottom-left-radius:0;}
    </style>
    
</head>
<body>
    
    <div class="container" style=" padding-top:30px; padding-bottom:30px;">
        <div class="row">
            <div class="col-xs-12">
                <table class="table">
                    <tr>
                        <td class=" bg-success" colspan="2" style=" font-size:medium">
                            <%=HTMLNickName%>个人信息：
                        </td>
                    </tr>
                    <tr>
                        <td>别名</td>
                        <td><%=HTMLAlias%></td>
                    </tr>
                    <tr>
                        <td>是否启用别名</td>
                        <td><%=HTMLIsAlias%></td>
                    </tr>
                    <tr>
                        <td>孩子性别</td>
                        <td><%=HTMLSex%></td>
                    </tr>
                    <tr>
                        <td>孩子年龄</td>
                        <td><%=HTMLYear%></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
   <div class="row">
        <div class="col-xs-3"></div>
        <div class="col-xs-6 text-center" ><a  class=" btn btn-success " href="<%=HTMLLink.HTMLEditMyInfo %>"  > <span class="glyphicon glyphicon-edit"></span> 编辑</a></div>
        <div class="col-xs-3"></div>
   </div>
    <nav class="navbar navbar-inverse navbar-fixed-bottom" style="min-height:42px;">
        <div class="container">
            <div class="row">
                <div class="col-xs-4 text-center" style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLLink.CommunityLink %>" >书法圈</a></div>
                <div class="col-xs-4 text-center" style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLLink.UpLoadLink %>" >上传作品</a></div>
                <div class="col-xs-4 text-center  " style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLLink.MyInfoLink %>" >我的</a></div>
            </div>
        </div>
    </nav>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hfOpenID" runat="server" />
        <asp:HiddenField ID="hfProductID" runat="server" />
        <asp:HiddenField ID="hfNickName" runat="server" />
        <asp:HiddenField ID="hfWeixinID" runat="server" />
    </form>
     <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
     <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
</body>
</html>
