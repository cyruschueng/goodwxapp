<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="info.aspx.cs" Inherits="SfSoft.web.game.brainsexpert.competition.info" %>

<!DOCTYPE html >

<html >
<head runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>奖品领取</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .error{ font:11px; color:Red}
        #request{ position:fixed; width:100%; height:100%; left:0px; top:0px; display:none; z-index:900; background:#eee}
        #request img{ position:absolute; margin-left:50%; left:-16px; top:50%;}
    </style>
</head>
<body>
    <div class=" container" style=" margin-bottom:28px;">
        <div class="row">
            <div class=" col-xs-12">
                <div class=" page-header">
                    <ul class="nav nav-pills">
                      <li role="presentation" class="active"><a href="prize.aspx">奖品</a></li>
                      <li role="presentation"><a href="info.aspx">奖品领取</a></li>
                      <li role="presentation"><a href="precedence.aspx">排行榜</a></li>
                      <li role="presentation"><a href="help.aspx">活动规则</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                 <h3>系统维护中，我们将在2015-9-25 14:00点之前开放，带来的不便请大家原谅！</h3>
            </div>
        </div>
    </div>
    
    
    <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
    <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src="../../../js/jquery.validate.js" type="text/javascript"></script>
    <script src="../../../js/jquery.validate.extend.js" type="text/javascript"></script>
    <script src="../../../js/jquery.validate.messages_cn.js" type="text/javascript"></script>
    <%--<script src="js/info.js" type="text/javascript"></script>--%>
    <script>
        $(function () {
            $(".nav li").removeClass("active");
            $(".nav li").eq(1).addClass("active");
        })
    </script>
</body>
</html>
