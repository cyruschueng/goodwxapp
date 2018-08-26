<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="friend.aspx.cs" Inherits="SfSoft.web.game.qzsf.friend" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>小伙伴</title>
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
    </style>
</head>
<body>
    <div class="container" style="padding-bottom:60px;">
        <div class="row">
            <div class="col-xs-12" style=" padding-left:0; padding-right:0">
                <div class="jumbotron" style=" padding-top:5px; padding-bottom:5px; margin-bottom:0">
                    <div class="row">
                        <div class="col-xs-3"><img style=" width:60px; height:60px;" src="images/logo.png" /></div>
                        <div class="col-xs-9" style=" height:60px;">
                            <div class="row">
                                <div class="col-xs-4" style="height:60px; line-height:60px;"><a   href="<%=HTMLLink.FriendManageLink %>" > 小伙伴</a></div>
                                <div class="col-xs-5 " style="height:60px; line-height:60px;"><a   href="<%=HTMLLink.PartinLink %>" style=" width:100%;">邀请新朋友<span style=" color:#f00;background-color:#286090" class="badge"></span></a></div>
                                <div class="col-xs-3" style="height:60px; line-height:60px;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xs-12" style=" padding-left:0; padding-right:0">
                <div class="table-responsive">
                    <table class="table" id="topmenu">
                        <tr >
                            <td class="menu-top text-center"><a id=""  href="<%=HTMLLink.CommunityLink %>" > 最新</a></td>
                            <td class="menu-top text-center"><a id="btnKids"  href="<%=HTMLLink.KidsLink %>" style=" width:100%;">小伙伴<span style=" color:#f00;background-color:#286090" class="badge"><%=HTMLNewKindsNumber%></span></a></td>
                            <td class="menu-top text-center"><a id="btnWeekRank1"  href="<%=HTMLLink.CityWideLink %>" style=" width:100%;">同城</a></td>
                            <td class="menu-top text-center"><a href="<%=HTMLLink.TopLink %>">精华</a></td>
                            <td class="menu-top text-center"><a href="/game/qzsf/exchange/index.aspx">兑换</a></td>  
                        </tr>
                    </table>
                </div>
            </div>
            <div class="col-xs-12">
                <div class=" alert alert-danger">
                    独乐乐，不如众乐乐，快去邀请你的小伙伴一起来学习吧，成长的路上不孤单，点这里开始 <a  class=" btn btn-xs btn-success" href="<%=HTMLLink.InviteLink %>">邀请</a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12" >
                <ul class=" media-list" id="media-list">
                    
                </ul>
                <div id="next" class=" btn" style="background:#eee; width:100%;">更多</div>
            </div>
        </div>
    </div>
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
		<textarea id="comment-content" class="weui_textarea" placeholder="请输入评论" rows="3"></textarea>
	    </div>

            <div class="weui_dialog_ft">

                <a href="javascript:;" class="weui_btn_dialog default">取消</a>

                <a href="javascript:;" class="weui_btn_dialog primary" id="btnComment">确定</a>

            </div>

        </div>

    </div>
    <nav class="navbar  navbar-fixed-bottom" style="min-height:42px;">
        <div class="container">
            <div class="row">
                <div class="col-xs-4 text-center" style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLLink.CommunityLink  %>" >书法圈</a></div>
                <div class="col-xs-4 text-center" style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLLink.UpLoadLink  %>" >上传作品</a></div>
                <div class="col-xs-4 text-center  " style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLLink.MyInfoLink %>" >我的</a></div>
            </div>
        </div>
    </nav>
    
    <form id="form1" runat="server">
        <asp:HiddenField ID="hfOpenID" runat="server" />
        <asp:HiddenField ID="hfID" runat="server" />
        <asp:HiddenField ID="hfMyLikeData" runat="server" />
        <asp:HiddenField ID="hfNickName" runat="server" />
        <asp:HiddenField ID="hfWeixinID" runat="server" />
    </form>
    <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
     <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src="js/friend.js" type="text/javascript"></script>
    <script>
         wx.ready(function () {
            wx.hideOptionMenu();
            // 5.2 图片预览
             // 图片预览
            $(document).on("click", ".privewimg", function (event) {
                var src = $(this).attr("src");
                var index = src.lastIndexOf("?");
                src = src.substr(0, index);
                src = src + '?imageView2/2/w/1000';
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
