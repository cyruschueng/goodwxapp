              <%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="SfSoft.web.game.brainsexpert.competition.index" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">   
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title></title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class=" container">
        <div class="row">
            <div class="col-xs-6 text-center">
                <a class="btn btn-primary" <%=HTMLPlayer %>>开始游戏</a>
            </div>
            <div class="col-xs-6 text-center">
                <a class="btn btn-primary" <%=HTMLRank %>>排名</a>
            </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                             
            <div class="col-xs-6 text-center">
                <a class="btn btn-primary" <%=HTMLGetPrize %>>奖品领取</a>
            </div>
            <div class="col-xs-6 text-center">
                <a class="btn btn-primary" <%=HTMLPrize %>>奖品</a>
            </div>
        </div>
    </div>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hfID" runat="server" />
        <asp:HiddenField ID="hfOpenID" runat="server" />
    </form>
    <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
    <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
</body>
</html>
