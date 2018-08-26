<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="works.aspx.cs" Inherits="SfSoft.web.game.doublenovemberII.works" %>

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
                <ul class=" media-list" id="media-list">
                    
                </ul>
            </div>
        </div>
    </div>
    <nav class="navbar  navbar-fixed-bottom" style="min-height:45px;">
        <div class="container">
            <div class="row">
                <div class="col-xs-4 text-center" style=" background:#337AB7; padding:5px 2px "><a class=" btn btn-primary menu" href="<%=HTMLReturnUrl %>" style=" width:100%; " >返回</a></div>
            </div>
        </div>
    </nav>
    <div id="modal-progress" class="modal fade" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">正在处理中，请稍等。。。</h4>
                </div>
                <div class="modal-body">
                    <div class="progress">
                        <div class="progress-bar  progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                        <span class="sr-only">80% Complete (danger)</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <form id="form1" runat="server">
        <asp:HiddenField ID="hfOpenID" runat="server" />
        <asp:HiddenField ID="hfProductID" runat="server" />
    </form>
     <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
     <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
</body>
</html>