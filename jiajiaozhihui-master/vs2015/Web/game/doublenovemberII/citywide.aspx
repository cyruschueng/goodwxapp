<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="citywide.aspx.cs" Inherits="SfSoft.web.game.doublenovemberII.citywide" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>同城_亲子书法</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .menu{ font-size:16px; padding:6px 8px; border:none; width:100%;}
        .right-line{ border-right:1px solid #fff; border-top-right-radius:0;border-bottom-right-radius:0;}
        .left-line{ border-left:1px solid #fff; border-top-left-radius:0;border-bottom-left-radius:0;}
    </style>
</head>
<body>
    <div class="container" style="padding-bottom:60px; ">
<!--
        <div class="row">
            <div class=" col-xs-12" style=" background:url(images/city.png); background-size:100%; margin-bottom:15px;">
                <div class=" page-header" style="border-bottom:none;"><h4 style=" color:#CC6633 "><%=HTMLCityName %></h4></div>
                <div class="row bg-danger" >
                    <div class=" col-xs-4  bg-danger"><span >作品：<%=HTMLWorksNumber%></span></div>
                    <div class=" col-xs-4 bg-danger"><span >用户：<%=HTMLUserNumber%></span></div>
                    <div class="col-xs-4"></div>
                </div>
            </div>
        </div>
-->
	<div class="row">
            <div class="col-xs-12" style=" padding-left:0; padding-right:0">
                <div class="jumbotron" style=" padding-top:5px; padding-bottom:5px; margin-bottom:0">
                    <div class="row">
                        <div class="col-xs-3"><img style=" width:60px; height:60px;" src="images/logo.png" /></div>
                        <div class="col-xs-9" style=" height:60px;">
                            <div class="row">
                                <div class="col-xs-4" style="height:60px; line-height:60px;"><h4 style=" color:#CC6633;height:40px; line-height:40px; "><%=HTMLCityName %></h4></div>
                                <div class="col-xs-4 " style="height:60px; line-height:60px;"><span> 作品：<%=HTMLWorksNumber%></span></div>
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
                            <td class="menu-top text-center"><a id=""  href="<%=HTMLCommunityLink %>" > 最新</a></td>
                            <td class="menu-top text-center"><a id="btnKids"  href="<%=HTMLKidsLink %>" style=" width:100%;">小伙伴<span style=" color:#f00;background-color:#286090" class="badge"><%=HTMLNewKindsNumber%></span></a></td>
                            <td class="menu-top text-center"><a id="btnWeekRank1"  href="<%=HTMLCityWideLink %>" style=" width:100%;">同城</a></td>
                            <td class="menu-top text-center"><a href="<%=HTMLTopLink %>">精华</a></td> 
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
                <div class="col-xs-3 text-center" style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLCommunityLink %>" >书法圈</a></div>
                <div class="col-xs-4 text-center" style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLUpLoadLink %>" >上传作品</a></div>
                <div class="col-xs-3 text-center" style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLPartinLink %>" ><%=HTMLMenuName %></a></div>
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
    <div id="modal-friend" class="modal fade" data-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h5 class="modal-title">邀请涵</h5>
                </div>
                <div class="modal-body">
                    <!--<textarea id="friend-content1" class="form-control" rows="3"></textarea>-->
                    <span id="friend-content">邀请成为小伙伴一起学习。</span>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" id="btnFriend" class="btn btn-primary">邀请</button>
                </div>
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
                'hideOptionMenu'
                ]
         });
         wx.ready(function () {
            wx.hideOptionMenu();
            // 5.2 图片预览
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
    <script>
        $("#topmenu a").eq(2).css({ 'border-bottom': '1px solid #4CAE4C' })
    </script>
</body>
</html>
