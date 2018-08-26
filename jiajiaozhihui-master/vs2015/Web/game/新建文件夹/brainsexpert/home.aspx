<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="home.aspx.cs" Inherits="SfSoft.web.game.brainsexpert.home" %>

<!DOCTYPE html >

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" />
    <title>个人中心</title>
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/home.css" rel="stylesheet" type="text/css" />
</head>
<body style=" padding-top:50px;">
    <div class=" container">
        <div class="row">
            <div class="col-xs-12">
                <div id="info_left" style=" width:50%; float:left;">
                    <img src="../images/info_left.png" width="100%;" />
                    <img class="gradeImg" src="<%=HTMLGradeImg %>" />
                    <img class="book" src="../images/book.png" />
                    <div class="progress pro">
                            <div class="progress-bar progress-bar-success"  role="progressbar" aria-valuenow="<%=HTMLCurrProcess %>" aria-valuemin="0" aria-valuemax="<%=HTMLMaxProcess %>" style="width:<%=HTMLRate %>"><%=HTMLRate %></div>  
                    </div>
                    <div class="lv"><%=HTMLProcessName %></div>
                </div>
                <div id="info-right" style=" width:50%; float:left;">
                    <img src="../images/info_right.png" width="100%;" />
                    <img class="headerImg img-circle" src="<%=HTMLHeadUrl %>" />
                    <div class=" lead nickname" style=" text-ov"><%=HTMLNickName %></div>
                    <div class="info">
                        <div class="col-xs-12"><p class=" line"><span>头衔：</span><%=HTMLGradeName %></p></div>
                        <div class="col-xs-12"><p class=" line"><span>积分：</span><%=HTMLScore %></p></div>
                        <div class="col-xs-12"><p class=" line"><span>金币：</span><%=HTMLGold %></p></div>
                        <div class="col-xs-10 text-center">
                            <span class="glyphicon glyphicon-hand-right"></span>
                            <a class=" btn btn-success btn-xs" href="shop.aspx?openid=<%=HTMLOpenID %>"  >金币商城</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-6 text-center"></div>
            <div class="col-xs-6 text-center"></div>
        </div>
        <div class="row" style=" margin-top:50px">
            <div class=" col-xs-12">
                <img src="../images/part_1.png" style=" width:50%; position:absolute; top:-3%; margin-left:50%; left:-25%;" />
                <div class="row" style="border:8px solid #246fdc; border-radius:40px; padding-top:50px; padding-bottom:30px;">
                    <%=HTMLHistory %>
                </div>
            </div>
        </div>
    </div>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hfOpenID" runat="server" />
    </form>
</body>
</html>
