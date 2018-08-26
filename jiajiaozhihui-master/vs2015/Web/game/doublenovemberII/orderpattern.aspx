<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="orderpattern.aspx.cs" Inherits="SfSoft.web.game.doublenovemberII.orderpattern" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>订购方式</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class=" container">
        <div class="row">
            <div class="jumbotron" style="background-color:#fff;">
                <h3>请选择付款方式</h3>
                <br />
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <a href="<%=HtmlOnlinePay %>" class=" btn btn-success" <%=HTMLOnlinePayStyle %>>在线支付</a>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <a href="<%=HTMLPartinLink %>" class=" btn btn-primary" <%=HTMLLocalPayStyle %>>货到付款</a>
                <p></p>
            </div>
        </div>
    </div>
</body>
</html>
