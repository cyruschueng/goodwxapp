<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="info-activity.aspx.cs" Inherits="SfSoft.web.game.qzsf.info_activity" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>我的活动</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <style>
         .menu{ font-size:16px; padding:6px 8px; border:none; width:100%;}
        .right-line{ border-right:1px solid #fff; border-top-right-radius:0;border-bottom-right-radius:0;}
        .left-line{ border-left:1px solid #fff; border-top-left-radius:0;border-bottom-left-radius:0;}
    </style>
</head>
<body>
    <div class="container" style=" padding-top:30px; padding-bottom:60px;">
        <div class="row">
            <div class="col-xs-12">
                <table class="table table-striped">
                    <tr>
                        <td colspan="2" class=" bg-success" style=" font-size:medium">我的活动</td>
                    </tr>
                    <tr>
                        <td>活动状态：</td>
                        <td><%=HTMLSendStatus %></td>
                    </tr>
                    <tr>
                        <td>活动开始日期：</td>
                        <td><%=HTMLStartDate%></td>
                    </tr>
                    <tr>
                        <td data-container="body" data-toggle="popover" data-placement="top" data-content="从第一次上传作品开始计算">已持续<span class="glyphicon glyphicon-question-sign"></span>：</td>
                        <td><%=HTMLAwayDay%></td>
                    </tr>
<!--
                    <tr>
                        <td data-container="body" data-toggle="popover" data-placement="top" data-content="从发货日期延迟6个月">活动最早完成时间<span class="glyphicon glyphicon-question-sign"></span>：</td>
                        <td><%=HTMLLatestDate%></td>
                    </tr>
                    <tr>
                        <td data-container="body" data-toggle="popover" data-placement="top" data-content="从发货日期延迟10个月">活动最迟完成日期<span class="glyphicon glyphicon-question-sign"></span>：</td>
                        <td><%=HTMLLongestDate%></td>
                    </tr>
-->
                </table>
            </div>
        </div>
    </div>
    <nav class="navbar navbar-fixed-bottom" style="min-height:42px;">
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
     <script>
         $('[data-toggle="popover"]').popover()
     </script>
</body>
</html>
