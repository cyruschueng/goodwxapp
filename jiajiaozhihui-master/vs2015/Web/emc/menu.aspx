<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="menu.aspx.cs" Inherits="SfSoft.web.emc.menu" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>菜单设置</title>

</head>
<body style=" padding-top:50px;">
<form id="form1" runat="server">
    <div class=" container">
        <div class="row">
            <div class=" col-md-12">
                <div class="form-group">
                    <label for="weixinname" >微信名称</label>
                    <asp:DropDownList CssClass="form-control" ID="weixinname" AutoPostBack="true" 
                        runat="server" onselectedindexchanged="weixinname_SelectedIndexChanged"></asp:DropDownList>
                </div>
                <div class="form-group">
                    <label for="menu" >菜单</label>
                    <asp:TextBox CssClass="form-control" ID="menuitem" TextMode="MultiLine" Rows="30" runat="server"></asp:TextBox>
                </div>

                <div class="form-group">
                    <label for="btnSubmit" class=" sr-only" >提交</label>
                    <asp:Button ID="btnSubmit"  CssClass="btn btn-default"  Text="提交"  
                        runat="server" onclick="btnSubmit_Click" />
                </div>
                <p>
                    <asp:Label ID="lbMenuMsg" runat="server"></asp:Label>
                </p>
            </div>
        </div>
    </div>
    <asp:HiddenField ID="hfAppID" runat="server" />
    <asp:HiddenField ID="hfAppSect" runat="server" />
 </form>
</body>
</html>
