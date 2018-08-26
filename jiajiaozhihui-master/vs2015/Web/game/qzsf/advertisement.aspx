<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="advertisement.aspx.cs" Inherits="SfSoft.web.game.qzsf.advertisement" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>亲子书法</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">    
    
</head>
<body>
    <div class="container" style="  padding-bottom:60px;">
        <div class="row">
            <div class="col-xs-12" style=" padding-left:0; padding-right:0;">
                <div class="navbar navbar-default" role="navigation" style="background:#337AB7">
                  <div class="navbar-header">
                       <a  class="navbar-brand  "   href="<%=HTMLLink.CommunityLink %>"><span class="glyphicon glyphicon-triangle-left" style=" color:#fff;"></span></a>
                  </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <%=HTMLImage %>
            </div>
            <div class="col-xs-12" style=" padding:15px; font-size:14px;" id="body"><%=HTMLBody %></div>
        </div>
    </div>
    <form runat="server">
        <asp:HiddenField ID="hfOpenID" runat="server" />
        <asp:HiddenField ID="hfWeixinID" runat="server" />
    </form>
     <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
     <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
     <script>
         
     </script>
</body>
</html>
