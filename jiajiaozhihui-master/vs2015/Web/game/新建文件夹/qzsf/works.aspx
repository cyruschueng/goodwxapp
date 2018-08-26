<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="works.aspx.cs" Inherits="SfSoft.web.game.qzsf.works" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>获奖作品</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">    
    <style>
        .menu{ font-size:16px; padding:6px 8px;}
    </style>
</head>
<body>
    <div class="container" style=" padding-top:70px; padding-bottom:60px;">
        <div class="row">
            <div class="col-xs-12">
                <form runat="server">
                    <asp:Button ID="btnA" runat="server" Text="上传作品" onclick="btnA_Click"  />
                </form>
            </div>
        </div>
    </div>
     <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
     <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
</body>
</html>