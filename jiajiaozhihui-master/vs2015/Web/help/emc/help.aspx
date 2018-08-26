 
<%@ Page Language="C#" AutoEventWireup="true" Codebehind="help.aspx.cs" Inherits="SfSoft.web.help.emc.help" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>神尔EMC-企业协同办公管理系统->系统帮助</title>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312">
    <link href="../../../emc/css/emccss.css" rel="stylesheet">
    
</head>
<frameset border="0" name="topset" framespacing="0" rows="35,*,5" frameborder="NO">
    <frame name="topFrame" src="top.aspx" noresize scrolling="no">
    <frameset border="0" name="middleset" framespacing="0" rows="*" frameborder="no"
        cols="145,*">
        <frame name="leftFrame" src="left.aspx" noresize>
        <frameset border="0" framespacing="0" rows="*" frameborder="NO" cols="5,*">
            <frame name="spliterFrame" src="../../emc/spliter.aspx" noresize scrolling="no">
            <frame name="mainFrame" src="main.aspx?HelpID=<%=HelpID %>">
        </frameset>
    </frameset>
    <frame name="BottonFrame" src="../../emc/botton.aspx" noresize scrolling="no">
</frameset>
</html>
