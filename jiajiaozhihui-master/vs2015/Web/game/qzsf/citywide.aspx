<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="citywide.aspx.cs" Inherits="SfSoft.web.game.qzsf.citywide" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>同城_亲子书法</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/weui.min.css" rel="stylesheet" type="text/css" />
    <style>
        .menu{ font-size:16px; padding:6px 8px; border:none; width:100%;}
        .right-line{ border-right:1px solid #fff; border-top-right-radius:0;border-bottom-right-radius:0;}
        .left-line{ border-left:1px solid #fff; border-top-left-radius:0;border-bottom-left-radius:0;}
    </style>
</head>
<body>
    <div class="container"  style="padding-bottom:60px; ">
        <div class="row">
            <div class="col-xs-12" style=" padding-left:0; padding-right:0">
                <div class="jumbotron" style=" padding-top:5px; padding-bottom:5px; margin-bottom:0">
                    <div class="row">
                        <div class="col-xs-2"><img style=" width:60px; height:60px;" src="images/logo.png" /></div>
                        <div class="col-xs-10" style=" height:60px;">
                            <div class="row">
                                <div class="col-xs-4" style="height:60px; line-height:60px;"><h4 style=" color:#CC6633;height:40px; line-height:40px; "><%=HTMLCityName %></h4></div>
                                <div class="col-xs-4" style="height:60px; line-height:60px;"><span> 作品：<%=HTMLWorksNumber%></span></div>
                                <div class="col-xs-4" style="height:60px; line-height:60px;"><span>用户：<%=HTMLUserNumber%></span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xs-12" style=" padding-left:0; padding-right:0">
                <div class="table-responsive">
                    <table class="table" id="topmenu">
                        <tr >
                            <td class="menu-top text-center"><a   href="<%=HTMLLink.CommunityLink %>" > 最新</a></td>
                            <td class="menu-top text-center"><a id="btnKids"  href="<%=HTMLLink.KidsLink  %>" style=" width:100%;">小伙伴<span style=" color:#f00;background-color:#286090" class="badge"><%=HTMLNewKindsNumber%></span></a></td>
                            <td class="menu-top text-center"><a id="btnWeekRank1"  href="<%=HTMLLink.CityWideLink %>" style=" width:100%;">同城</a></td>
                            <td class="menu-top text-center"><a href="<%=HTMLLink.TopLink %>">精华</a></td> 
                            <td class="menu-top text-center"><a href="/game/qzsf/exchange/index.aspx">兑换</a></td> 
                        </tr>
                    </table>
                </div>
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
		<textarea id="comment-content" class="weui_textarea" placeholder="请输入评论" rows="3"></textarea>
	     </div>

            <div class="weui_dialog_ft">

                <a href="javascript:;" class="weui_btn_dialog default">取消</a>

                <a href="javascript:;" class="weui_btn_dialog primary" id="btnComment">确定</a>

            </div>

        </div>

    </div>
    <div class="weui_dialog_confirm" id="modal-friend" style="display: none;">
        <div class="weui_mask"></div>
        <div class="weui_dialog">
            <div class="weui_dialog_hd"><strong class="weui_dialog_title">邀请涵</strong></div>
            <div class="weui_dialog_bd"><span id="friend-content">邀请成为小伙伴一起学习。</span></div>
            <div class="weui_dialog_ft">
                <a href="javascript:;" class="weui_btn_dialog default">取消</a>
                <a href="javascript:;" class="weui_btn_dialog primary" id="btnFriend">确定</a>
            </div>
        </div>
    </div>
    <div id="modal-net-exception" class="modal fade" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <strong>提示</strong>
                </div>
                <div class="modal-body">
                    <h4 class="modal-title">网络异常，请稍后重试。。。。</h4>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hfOpenID" runat="server" />
        <asp:HiddenField ID="hfID" runat="server" />
        <asp:HiddenField ID="hfMyLikeData" runat="server" />
        <asp:HiddenField ID="hfNickName" runat="server" />
        <asp:HiddenField ID="hfWeixinID" runat="server" />
        <asp:HiddenField ID="hfCity" runat="server" />
    </form>
     <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
     <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src="js/citywide.js" type="text/javascript"></script>
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
