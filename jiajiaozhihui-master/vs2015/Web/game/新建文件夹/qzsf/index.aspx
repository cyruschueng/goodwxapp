<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="SfSoft.web.game.qzsf.index" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>亲子书法圈</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/weui.min.css" rel="stylesheet" type="text/css" />
    <style>
        .menu{ font-size:16px; padding:6px 8px; border:none; width:100%;}
        .right-line{ border-right:1px solid #fff; border-top-right-radius:0;border-bottom-right-radius:0;}
        .left-line{ border-left:1px solid #fff; border-top-left-radius:0;border-bottom-left-radius:0;}
        .menu-top{ font-size:12px; padding-right:5px;}
    </style>
</head>
<body>
    <div class="container" style=" padding-bottom:60px; ">
        <div class="row">
            <div class="col-xs-12" style=" padding-left:0; padding-right:0; ">
                <div class="jumbotron" style=" padding-top:5px; padding-bottom:5px; margin-bottom:0">
                    <div class="row">
                        <div class="col-xs-3"><a href="javascript:void(0)" id="mlogo"><img id="logo" style=" width:60px; height:60px;" src="images/logo.png" /></a></div>
                        <div class="col-xs-9" style=" height:60px;">
                            <div class="row">
				<div class="col-xs-6">
                                    <div class="row">
                                        <div class="col-xs-12" style="height:30px; line-height:30px;">作品：<%=HTMLAllWorksNumber %></div>
                                        <div class="col-xs-12" style="height:30px; line-height:30px;">今日新增：<%=HTMLTodayWoksNumber %></div>
                                    </div>
                                </div>
                                <div class="col-xs-6" style="height:60px; line-height:60px;">
                                    <a href="https://shop13294926.wxrrd.com/goods/101477238" style="width:100%;" class=" btn btn-default ">购买书法帖</a>
                                    <!--<a href="http://weixin.jiajiaozhihui.cn/game/qzsf/order.aspx?mode=database&id=76" style="width:100%;" class=" btn btn-default ">购买书法帖</a>-->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xs-12" style=" padding-left:0; padding-right:0">
                <div class="table-responsive">
                    <table class="table" id="topmenu">
                        <tr >
                            <td class="menu-top text-center"><a id="btnLatest"  href="javascript:void(0)" > 最新</a></td>
                            <td class="menu-top text-center"><a id="btnKids"  href="<%= HTMLLink.KidsLink %>" style=" width:100%;">小伙伴<span style=" color:#f00;background-color:#286090" class="badge"><%=HTMLNewKindsNumber%></span></a></td>
                            <td class="menu-top text-center"><a id="btnWeekRank1"  href="<%=HTMLLink.CityWideLink %>" style=" width:100%;">同城</a></td>
                            <td class="menu-top text-center"><a href="<%=HTMLLink.TopLink %>">精华</a></td> 
                            <td class="menu-top text-center"><a href="/game/qzsf/exchange/index.aspx">兑换</a></td> 
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12" id="jiajiaoguwen">
                <div class="alert alert-danger" role="alert">
                        <p>亲子收法社是家教智慧家庭教育顾问学习平台，</p>
                        <p>您尚未加入，<a href="jiajiaoguwen.html"><span class="glyphicon glyphicon-hand-right text-primary">点这里免费加入</span></a>，和 10万人一起学习。</p>
                    </div>
            </div>
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
		<textarea id="comment-content" class="weui_textarea" placeholder="请输入评论" rows="3"></textarea>
	    </div>
            <div class="weui_dialog_ft">
                <a href="javascript:;" class="weui_btn_dialog default">取消</a>
                <a href="javascript:;" class="weui_btn_dialog primary" id="btnComment">确定</a>
            </div>
        </div>
    </div>
    <div class="weui_dialog_confirm" id="modal-top" style="display: none;">
        <div class="weui_mask"></div>
        <div class="weui_dialog">
            <div class="weui_dialog_hd"><strong class="weui_dialog_title">设置精华</strong></div>
            <div class="weui_dialog_bd"><h4 class="modal-title">是否确认设置精华</h4></div>
            <div class="weui_dialog_ft">
                <a href="javascript:;" class="weui_btn_dialog default">取消</a>
                <a href="javascript:;" class="weui_btn_dialog primary" id="btnTop">确定</a>
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

    <form id="form1" runat="server">
        <asp:HiddenField ID="hfOpenID" runat="server" />
        <asp:HiddenField ID="hfID" runat="server" />
        <asp:HiddenField ID="hfMyLikeData" runat="server" />
        <asp:HiddenField ID="hfNickName" runat="server" />
        <asp:HiddenField ID="hfWeixinID" runat="server" />
        <asp:HiddenField ID="hfA" runat="server" />
    </form>
     <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
     <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
     <script src="js/audio.js" type="text/javascript"></script>
    <script src="js/index.js" type="text/javascript"></script>
     
    <script>
        wx.ready(function () {
            //分享内容
            var shareData = {
                title: '家教智慧万人书法行动，一点小坚持，人生大变化',
                desc: '家教智慧举办“亲子书法”活动，该活动是基于“书法+移动互联网”的创新理念，致力于打造一场万人书法盛宴',
                link: '<%=HTMLLink.ShareLink %>',
                imgUrl: 'http://weixin.jiajiaozhihui.cn/images/2015110908163066ea.jpg'
            };

            // 2. 分享接口
            // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
            wx.onMenuShareAppMessage(shareData);

            // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
            wx.onMenuShareTimeline(shareData);


            // 5.2 图片预览
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
            });
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

    <script type="text/javascript">        var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://"); document.write(unescape("%3Cspan id='cnzz_stat_icon_1256994400'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s4.cnzz.com/stat.php%3Fid%3D1256994400' type='text/javascript'%3E%3C/script%3E"));</script>
    <script>
        $("#cnzz_stat_icon_1256994400 a").text("");
        if ($("#hfOpenID").val() == "oc6zzsxgkqgsBCHeF08hMGkqIn6Q" || $("#hfOpenID").val()=="oc6zzs1y_A_7RgGi6EGLBUrPCfRk") {
            $("#mlogo").attr("href", "http://weixin.jiajiaozhihui.cn/game/qzsf/exchange/index.aspx");
        }
    </script>
</body>
</html>
