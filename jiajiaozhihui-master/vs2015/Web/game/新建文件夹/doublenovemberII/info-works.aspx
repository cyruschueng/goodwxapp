<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="info-works.aspx.cs" Inherits="SfSoft.web.game.doublenovemberII.info_works" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>我的作品</title>
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
        #share
        {
             position:absolute;
             left:0;
             top:0;
             width:100%;   
             display:none;
        }
    </style>
    
</head>
<body>
    
    <div class="container" style=" padding-top:0px; padding-bottom:60px;">
	<div class="row" style=" background:#eee; margin-bottom:10px;" id="alert-invite">
           <div class=" alert alert-info" style='margin-bottom:0'>
                <h4>立刻邀请好友</h4>
                <span id="bntshare" class=" btn btn-xs btn-success glyphicon glyphicon-heart"> 为我加油</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a  href="<%=HTMLPartinLink %>" class=" btn btn-xs btn-success glyphicon glyphicon-ice-lolly-tasted"> 结伴学习</a>
           </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <ul class=" media-list" id="media-list">
                    
                </ul>
                <div id="next" class=" btn" style="background:#eee; width:100%;">更多</div>
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
                    <button type="button" class="btn btn-default " data-dismiss="modal">关闭</button>
                    <button type="button" id="btnComment" class="btn btn-primary">提交</button>
                </div>
            </div>
        </div>
    </div>
    <div id="modal-delete" class="modal fade" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h5 class="modal-title">删除</h5>
                </div>
                <div class="modal-body">
                    <strong>提示！</strong>
                    你确定要删除吗
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default " data-dismiss="modal">关闭</button>
                    <button type="button" id="btnDelete" class="btn btn-primary">确定</button>
                </div>
            </div>
        </div>
    </div>
    <div id="share">
        <img src="images/guide.jpg" style=" width:100%;" />
    </div>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hfOpenID" runat="server" />
        <asp:HiddenField ID="hfProductID" runat="server" />
        <asp:HiddenField ID="hfNickName" runat="server" />
        <asp:HiddenField ID="hfMode" runat="server" />
        <asp:HiddenField ID="hfGoodsid" runat="server" />
        <asp:HiddenField ID="hfShare" runat="server" />
        <asp:HiddenField ID="hfFriendid" runat="server" />
        <asp:HiddenField ID="hfWeixinID" runat="server" />
    </form>
     <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
     <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src="js/info.js" type="text/javascript"></script>
    <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
     
     <script>        
         wx.config({
             debug: false,
             appId: '<%=HTMLAppid %>',
             timestamp: <%=HTMLTimestamp %>,
             nonceStr: '<%=HTMLNoncestr %>',
             signature: '<%=HTMLSignature %>',
             jsApiList: [
                'previewImage',
                'onMenuShareTimeline',
                'onMenuShareAppMessage'
                ]
         });
         wx.ready(function () {
            
             //分享内容
            var shareData = {
                title: '我娃亲子书法第<%=HTMLStudyDay %>天，<%=HTMLWorksNumber %>个作品，给咱娃鼓励吧',
                desc: '家教智慧举办“亲子书法”活动，该活动是基于“书法+移动互联网”的创新理念，致力于打造一场万人书法盛宴',
                link: '<%=HTMLShareLink %>',
		//link: 'http://weixin.jiajiaozhihui.cn/start/doublenovember3.ashx',
                imgUrl: 'http://weixin.jiajiaozhihui.cn/images/2015110908163066ea.jpg'
            };

            // 2. 分享接口
            // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
            wx.onMenuShareAppMessage(shareData);

            // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
            wx.onMenuShareTimeline(shareData);

            // 图片预览
            $(document).on("click", ".privewimg", function (event) {
                var src = $(this).attr("src");
                var index = src.lastIndexOf("?");
                src = src.substr(0, index);
                src = src + '?imageView2/2/w/768';
                wx.previewImage({
                    current: src,
                    urls: [
                        src
                      ]
                });
            })
        })
    </script>
</body>
</html>
