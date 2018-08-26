<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="deve-help.aspx.cs" Inherits="SfSoft.web.game.qzsf.deve_help" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:RadioButtonList ID="rblSel" runat="server">
            <asp:ListItem Text="加密" Value="1" Selected=True></asp:ListItem>
            <asp:ListItem Text="解密" Value="2"></asp:ListItem>
        </asp:RadioButtonList>
    </div>
    <div>
        要加密/解密字符：<asp:TextBox ID="txtOpenID" runat="server"></asp:TextBox>
    </div>
    <div>
        加密/解密后字符：<asp:TextBox ID="txtConvertOpenID" runat="server"></asp:TextBox>
    </div>

    <div>
        <asp:Button ID="btnConvert" runat="server" Text="运行" 
            onclick="btnConvert_Click" />
    </div>
    </form>
</body>
</html>
