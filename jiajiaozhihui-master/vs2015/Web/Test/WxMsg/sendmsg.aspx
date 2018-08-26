<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="sendmsg.aspx.cs" Inherits="SfSoft.web.Test.WxMsg.sendmsg" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css"  crossorigin="anonymous">
</head>
<body>
    <div class="page-header">
        ddddddddddddddd
    </div>
    <form>
        <div class="form-group">
            <label for="accessToken">AccessToken</label>
            <asp:TextBox ID="accessToken" class="form-control" placeholder="AccessToken" runat="server"></asp:TextBox>
        </div>
        <div class="form-group">
            <label for="openId">OpenId</label>
            <asp:TextBox ID="openId" class="form-control" placeholder="openId" runat="server"></asp:TextBox>
        </div>
        <div class="form-group">
            <label for="exampleInputFile">OpenId txt文件</label>
            <asp:FileUpload id="openIdFile" runat="server" />
            <p class="help-block">上传要群发的openid文件 格式为.txt</p>
        </div>
        <div class="checkbox">
            <label>
            <input type="checkbox"> 测试
            </label>
        </div>
        <button type="submit" class="btn btn-default">发送</button>
    </form>
</body>
</html>
