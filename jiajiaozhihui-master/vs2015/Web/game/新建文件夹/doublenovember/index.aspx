<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="SfSoft.web.game.doublenovember.index" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>亲子书法圈</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .menu{ font-size:16px;}
    </style>
    
</head>
<body>
    <div class="container" style=" padding-top:60px; padding-bottom:60px;">
        <div class="row">
            <div class="col-xs-12">
                <ul class=" media-list" id="media-list">
                    
                </ul>
                <div id="next" class=" btn" style="background:#eee; width:100%;">下一页</div>
            </div>
        </div>
    </div>
    <nav class="navbar  navbar-fixed-top" style="min-height:45px;">
        <div class="container">
            <div class="row">
                <div class=" col-xs-4 text-center" style=" background:#337AB7; padding:5px 3px "><a id="btnLatest" class=" btn btn-primary menu" href="javascript:void(0)" style=" width:100%;">最新</a></div>
                <div class=" col-xs-4 text-center" style=" background:#337AB7; padding:5px 3px "><a id="btnHot" class=" btn btn-primary menu" href="javascript:void(0)" style=" width:100%;">最热</a></div>
                <div class=" col-xs-4 text-center" style=" background:#337AB7; padding:5px 3px "><a id="btnWeekRank" class=" btn btn-primary menu" href="rankings.aspx" style=" width:100%;">优秀作品</a></div>
            </div>
        </div>
    </nav>
    <nav class="navbar  navbar-fixed-bottom" style="min-height:45px;">
        <div class="container">
            <div class="row">
                <div class="col-xs-4 text-center" style=" background:#337AB7; padding:5px 3px "><a class=" btn btn-primary menu" href="<%=HTMLUpLoadLink %>" style=" width:100%;" >上传作品</a></div>
                <div class="col-xs-4 text-center" style=" background:#337AB7; padding:5px 3px "><a class=" btn btn-primary menu" href="<%=HTMLPartinLink %>" style=" width:100%;">我要参与</a></div>
                <div class="col-xs-4 text-center  " style=" background:#337AB7; padding:5px 3px "><a class=" btn btn-primary menu" href="<%=HTMLMyInfoLink %>" style=" width:100%;">我的</a></div>
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
        <asp:HiddenField ID="hfID" runat="server" />
        <asp:HiddenField ID="hfMyLikeData" runat="server" />
    </form>
     <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
     <script src="js/checkbrower.js" type="text/javascript"></script>
     <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src="js/index.js" type="text/javascript"></script>
     <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
     <script>        
         wx.config({
             debug: false,
             appId: '<%=HTMLAppid %>',
             timestamp: <%=HTMLTimestamp %>,
             nonceStr: '<%=HTMLNoncestr %>',
             signature: '<%=HTMLSignature %>',
             jsApiList: [
                 'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone' 
                ]
         });
    </script> 
    <script src="js/wxshare.js" type="text/javascript"></script>
</body>
</html>
