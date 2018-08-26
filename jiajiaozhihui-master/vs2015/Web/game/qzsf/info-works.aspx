<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="info-works.aspx.cs" Inherits="SfSoft.web.game.qzsf.info_works" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>我的作品</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/weui.min.css" rel="stylesheet" type="text/css" />
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
                <a  href="<%=HTMLLink.PartinLink  %>" class=" btn btn-xs btn-success glyphicon glyphicon-ice-lolly-tasted"> 结伴学习</a>
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
   <audio id="audio"></audio>
    <nav class="navbar  navbar-fixed-bottom" style="min-height:42px;">
        <div class="container">
            <div class="row">
                <div class="col-xs-4 text-center" style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLLink.CommunityLink %>" >书法圈</a></div>
                <div class="col-xs-4 text-center" style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLLink.UpLoadLink %>" >上传作品</a></div>
                <div class="col-xs-4 text-center  " style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLLink.MyInfoLink %>" >我的</a></div>
            </div>
        </div>
    </nav>
    <!--数据处理-->
    <div id="loadingToast" class="weui_loading_toast" style="display:none;">
        <div class="weui_mask_transparent"></div>
        <div class="weui_toast">
            <div class="weui_loading">
                <div class="weui_loading_leaf weui_loading_leaf_0"></div>
                <div class="weui_loading_leaf weui_loading_leaf_1"></div>
                <div class="weui_loading_leaf weui_loading_leaf_2"></div>
                <div class="weui_loading_leaf weui_loading_leaf_3"></div>
                <div class="weui_loading_leaf weui_loading_leaf_4"></div>
                <div class="weui_loading_leaf weui_loading_leaf_5"></div>
                <div class="weui_loading_leaf weui_loading_leaf_6"></div>
                <div class="weui_loading_leaf weui_loading_leaf_7"></div>
                <div class="weui_loading_leaf weui_loading_leaf_8"></div>
                <div class="weui_loading_leaf weui_loading_leaf_9"></div>
                <div class="weui_loading_leaf weui_loading_leaf_10"></div>
                <div class="weui_loading_leaf weui_loading_leaf_11"></div>
            </div>
            <p class="weui_toast_content">数据加载中</p>
        </div>
    </div>
   
    <!--评论-->
    <div class="weui_dialog_confirm" id="modal-comment" style="display: none;">

        <div class="weui_mask"></div>

        <div class="weui_dialog">

            <div class="weui_dialog_hd"><strong class="weui_dialog_title">评论</strong></div>

            <div class="weui_dialog_bd">
		<div class="weui_cell weui_cell_select">
                  <div class="weui_cell_bd weui_cell_primary">
                    <select class="weui_select" name="select1" id="fastComment">
                    </select>
                  </div>
                </div>
		<textarea id="comment-content"  class="weui_textarea" placeholder="请输入评论" rows="3"></textarea>
	    </div>

            <div class="weui_dialog_ft">

                <a href="javascript:;" class="weui_btn_dialog default">取消</a>

                <a href="javascript:;" class="weui_btn_dialog primary" id="btnComment">确定</a>

            </div>

        </div>

    </div>
    <!--评论-->
    <div class="weui_dialog_confirm" id="modal-delete" style="display: none;">
        <div class="weui_mask"></div>
        <div class="weui_dialog">
            <div class="weui_dialog_hd"><strong class="weui_dialog_title">删除</strong></div>
            <div class="weui_dialog_bd"><strong>提示！</strong>你确定要删除吗</div>
            <div class="weui_dialog_ft">
                <a href="javascript:;" class="weui_btn_dialog default">取消</a>
                <a href="javascript:;" class="weui_btn_dialog primary" id="btnDelete">确定</a>
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
        <asp:HiddenField ID="hfCommontNickName" runat="server" />
    </form>
     <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
     <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
     <script src="js/audio.js" type="text/javascript"></script>
    <script src="js/info.js" type="text/javascript"></script>  
     <script>        
         wx.ready(function () {
             //分享内容
            var shareData = {
                title: '我娃亲子书法第<%=HTMLStudyDay %>天，<%=HTMLWorksNumber %>个作品，给咱娃鼓励吧',
                desc: '家教智慧举办“亲子书法”活动，该活动是基于“书法+移动互联网”的创新理念，致力于打造一场万人书法盛宴',
                link: '<%=HTMLLink.ShareLink %>',
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
                if (src.indexOf("http://") > 0) {
                    var index = src.lastIndexOf("?");
                    src = src.substr(0, index);
                    src = src + '?imageView2/2/w/500';
                } else {
                    src ="http://"+ window.location.host + src;
                }
                wx.previewImage({
                    current: src,
                    urls: [
                        src
                      ]
                });
            })
            wx.getLocation({
                success: function (res) {

                    $.ajax({
                        url: "./server/index.ashx",
                        type: "POST",
                        dataType: "json",
                        data: { 'openid': '' + $("#hfOpenID").val() + '', 'latitude': '' + res.latitude + '', 'longitude': '' + res.longitude + '', 'method': 'location' },
                        success: function (data) {

                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {

                        }
                    });
                },
                cancel: function (res) {

                }
            });
        })
    </script>
</body>
</html>
