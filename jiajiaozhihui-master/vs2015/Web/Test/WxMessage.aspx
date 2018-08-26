<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WxMessage.aspx.cs" Inherits="SfSoft.web.Test.WxMessage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css"  crossorigin="anonymous">
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:TextBox ID="txtAccessToken" runat="server" Width="600px"></asp:TextBox>
       <br />
        <br />
        <br />
        <br />
        <asp:TextBox ID="txtOpenId" runat="server" Width="200px"></asp:TextBox>
        <asp:Button ID="btnSend" runat="server"  Text="测试发送补收货信息" OnClick="btnSend_Click"/>

        <br />
        <br />
        <asp:Button ID="btnMultSend" runat="server"  Text="群发送补收货信息" OnClick="btnMultSend_Click"/>
    </div>
    <div style="margin-top:100px;">

        <asp:Button ID="bntTestOrder" runat="server" style=" "  Text="测试发送订单信息" OnClick="bntTestOrder_Click" />

        <br />
        <asp:Button ID="bntOrder" runat="server"  Text="群发送订单信息" OnClick="bntOrder_Click" />
    </div>
    


    <div style="margin-top:100px;">

        <asp:Button ID="btnTestWL" runat="server"  Text="测试发货信息" OnClick="btnTestWL_Click"  />

        <br />
        <asp:Button ID="btnWL" runat="server"  Text="群发发货信" OnClick="btnWL_Click"  />
    </div>

    </form>
</body>
</html>
