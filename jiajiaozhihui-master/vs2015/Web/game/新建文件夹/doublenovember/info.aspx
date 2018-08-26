<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="info.aspx.cs" Inherits="SfSoft.web.game.doublenovember.info" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>我的</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .menu{ font-size:16px;}
    </style>
    
</head>
<body>
    
    <div class="container" style=" padding-top:30px; padding-bottom:60px;">
        <div class="row">
            <div class="col-xs-12">
                <ul class=" media-list" id="media-list">
                    
                </ul>
                <div id="next" class=" btn" style="background:#eee; width:100%;">下一页</div>
            </div>
        </div>
        <div class="row">
            <div class=" col-xs-12" style="padding-top:20px;">
                <p class="bg-success" style="padding:5px">
                    如果你确认已发货，但是没有看到订单信息，请点击这里进入
                    <a class=" btn btn-bg-primary" href="<%=HTMLRepairUrl %>">进入</a>
                </p>
            </div>
        </div>
    </div>
   
    <nav class="navbar navbar-inverse navbar-fixed-bottom">
        <div class="container">
            <div class="row">
                <div class="col-xs-4 text-center" style=" background:#337AB7; padding:5px 3px "><a id="btnPersonal" class=" btn btn-primary menu" href="javascript:void(0)" style=" width:100%;" >个人作品</a></div>
                <div class="col-xs-4 text-center" style=" background:#337AB7; padding:5px 3px "><a id="btnOrderInfo" class=" btn btn-primary menu" href="javascript:void(0)" style=" width:100%;" >订单信息</a></div>
                <div class="col-xs-4 text-center" style=" background:#337AB7; padding:5px 3px "><a class=" btn btn-primary menu" href="<%=HTMLReturnUrl %>" style=" width:100%;" >亲子书法</a></div>
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
                        <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
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
<script src="js/checkbrower.js" type="text/javascript"></script>
     <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src="js/info.js" type="text/javascript"></script>
    <script>
        
    </script>
</body>
</html>
