<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="friend-works.aspx.cs" Inherits="SfSoft.web.game.doublenovemberII.friend_works" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>小伙伴</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <style>
         .menu{ font-size:16px; padding:6px 8px; border:none; width:100%;}
        .right-line{ border-right:1px solid #fff; border-top-right-radius:0;border-bottom-right-radius:0;}
        .left-line{ border-left:1px solid #fff; border-top-left-radius:0;border-bottom-left-radius:0;}
        .alert-menu 
        {
            padding-left:5px; 
            padding-right:5px; 
            -webkit-box-shadow:1px 0px 2px;
            -moz-box-shadow:1px 0px 2px;
            box-shadow:1px 0px 2px; 
            font-size:14px; 
            color:#fff;
            display:inline-block;
        }
    </style>
</head>
<body>
    <div class="container" style="padding-top:15px;padding-bottom:60px;">
        <div class="row">
            <div class="col-xs-12" >
                <ul class=" media-list" id="media-list">
                    
                </ul>
                <div id="next" class=" btn" style="background:#eee; width:100%;">更多</div>
            </div>
        </div>
    </div>

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
    <div id="modal-comment" class="modal fade" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h5 class="modal-title">我说两句。。。</h5>
                </div>
                <div class="modal-body">
                    <textarea id="comment-content" class="form-control" rows="3"></textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" id="btnComment" class="btn btn-primary">提交</button>
                </div>
            </div>
        </div>
    </div>
    <nav class="navbar  navbar-fixed-bottom" style="min-height:42px;">
        <div class="container">
            <div class="row">
                <div class="col-xs-3 text-center" style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLCommunityLink %>" >书法圈</a></div>
                <div class="col-xs-4 text-center" style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLUpLoadLink %>" >上传作品</a></div>
                <div class="col-xs-3 text-center" style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLPartinLink %>" ><%=HTMLMenuName%></a></div>
                <div class="col-xs-2 text-center  " style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLMyInfoLink %>" >我的</a></div>
            </div>
        </div>
    </nav>
    
    <form id="form1" runat="server">
        <asp:HiddenField ID="hfOpenID" runat="server" />
        <asp:HiddenField ID="hfID" runat="server" />
        <asp:HiddenField ID="hfMyLikeData" runat="server" />
        <asp:HiddenField ID="hfNickName" runat="server" />
        <asp:HiddenField ID="hfWeixinID" runat="server" />
        <asp:HiddenField ID="hfFriend" runat="server" />
    </form>
    <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
     <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src="js/friend-works.js" type="text/javascript"></script>
</body>
</html>
