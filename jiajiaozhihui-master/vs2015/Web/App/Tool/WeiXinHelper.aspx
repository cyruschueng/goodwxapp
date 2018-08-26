<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WeiXinHelper.aspx.cs" Inherits="SfSoft.web.App.Tool.WeiXinHelper" %>

<!DOCTYPE html >

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <form name="form1" role="form" runat="server">
        <div class=" container">
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label for="txtAppId">AppID</label>
                        <asp:TextBox class="form-control" id="txtAppId" placeholder="Enter AppID" runat="server"></asp:TextBox>
                      </div>
                      <div class="form-group">
                        <label for="AppSecret">AppSecret</label>
                        <asp:TextBox class="form-control" id="txtAppSecret" placeholder="AppSecret" runat="server"></asp:TextBox>
                      </div>
                      <div class="form-group">
                        <asp:RadioButtonList ID="rblType"  RepeatDirection="Horizontal" runat="server">
                            <asp:ListItem Value="AccessToken" Text="AccessToken" Selected="True"></asp:ListItem>
                            <asp:ListItem Value="Code" Text="Code"></asp:ListItem>
                        </asp:RadioButtonList>
                      </div>
                        <asp:Button ID="btnSubmit" class="btn btn-default" Text="提交" runat="server" />
                </div>
            </div>
            <div class="row" style=" margin-top:100px;">
                <div class="col-md-12" >
                    <asp:Label Id="lbResult" runat="server"></asp:Label>
                </div>
            </div>
        </div>
    </form>
    <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
</body>
</html>
