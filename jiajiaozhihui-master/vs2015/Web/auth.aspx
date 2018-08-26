<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="auth.aspx.cs" Inherits="SfSoft.web.auth1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
    <script>
        channel.on('openid', function (data) {
            localStorage.setItem("post", data);
        });
        $(function () {
            alert(localStorage.getItem("post"));
        })
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
            <asp:Button ID="btnOK" Text="测试" runat="server" onclick="btnOK_Click" />
    </div>
    </form>
</body>
</html>
