<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="help.aspx.cs" Inherits="SfSoft.web.game.brainsexpert.competition.help" %>

<!DOCTYPE html >

<html >
<head runat="server">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" />
    <title>活动规则</title>
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    
</head>
<body>
    <div class=" container" style=" margin-bottom:35px;">
        <div class="row">
            <div class="col-xs-12">
                <div class=" page-header">
                    <ul class="nav nav-pills">
                      <li role="presentation" class="active"><a href="prize.aspx">奖品</a></li>
                      <li role="presentation"><a href="info.aspx">奖品领取</a></li>
                      <li role="presentation"><a href="precedence.aspx">排行榜</a></li>
                      <li role="presentation"><a href="help.aspx?id=13">活动规则</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <h3> 活动规则：</h3>
            </div>
            <div class="col-xs-12">
                <%=HTMLBody %>
            </div>
        </div>
    </div>
    <div class=" panel-footer panel-success" style=" position:fixed; bottom:0; width:100%;padding-top:0; padding-bottom:0 ;background:rgba(255,255,255,1)">
        <ul class="nav nav-pills  text-center">
              <li role="presentation" style=" float:none;"><a href="<%=HtmlBackLink %>" style=" font-size:14px;" ><span class="glyphicon glyphicon-share-alt"></span>返回</a></li>
        </ul>
    </div>
    <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
    <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script>
        $(function () {
            $(".nav li").removeClass("active");
            $(".nav li").eq(3).addClass("active");
        })
    </script>
</body>
</html>
