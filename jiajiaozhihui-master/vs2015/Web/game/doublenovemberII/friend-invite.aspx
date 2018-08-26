<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="friend-invite.aspx.cs" Inherits="SfSoft.web.game.doublenovemberII.friend_invite" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>我要参与</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .error{ color:#f00; font-size:13px;}
        .menu{ font-size:16px; padding:6px 8px; border:none; width:100%;}
        .right-line{ border-right:1px solid #fff; border-top-right-radius:0;border-bottom-right-radius:0;}
        .left-line{ border-left:1px solid #fff; border-top-left-radius:0;border-bottom-left-radius:0;}
        #alert_orderstatus
        {
            position:fixed;
            left:0px;
            top:0px;
            width:100%;
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
    <div class="container" style=" padding-top:0px; padding-bottom:80px;">
	<div class="row" style=" background:#eee; margin-bottom:10px;">
           <div class=" alert alert-info" style='margin-bottom:0'>
                
                <span id="bntshare"  href="<%=HTMLPartinLink %>" class=" btn btn-xs btn-success glyphicon glyphicon-ice-lolly-tasted"> 立刻邀请好友</span>
           </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <table class="table">
                    <tr>
                        <td ><img style=" width:48px; height:48px;" src="<%=HTMLHeadImgUrl %>" /></td>
                        <td style=" font-size:medium"><strong style=" color:#0034FF"> <%=HTMLNickName%></strong>  参与亲子书法活动<%=HTMLAwayDays %>天，已有<%=HTMLWorksNumber %>个作品</td>
                    </tr>
                    <tr>
                        <th colspan="2">我的最新作品</th>
                    </tr>
                </table>
            </div>
            <div class=" col-xs-12">
                <ul class=" media-list" id="media-list">
                    
                </ul>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <%=HTMLContent %>
            </div>
        </div>
	<div class="row" id="go">
            <div class="col-xs-12">
                <img class=" img-thumbnail" src="<%=HTMLImgUrl %>" />
            </div>
            <div class="col-xs-12">
                <h4><%=HTMLProductName%></h4>
            </div>
            <div class="col-xs-12 ">
                <p class=" bg-info" style=" font-size:16px; color:#f00;">活动价￥<span id="txtUnitPrice"><%=HTMLUnitPrice%></span></p>
            </div>
            <div class="col-xs-12">
                <p style=" color:#666; font-size:14px;">
                    价格：￥<s id="cost_price"><%=HTMLMarkPric%></s> &nbsp;&nbsp;&nbsp;<span>快递 免运费</span>
                    <span class="btn btn-xs glyphicon glyphicon-plus pull-right" id="btnAdd"></span>
                    <span class=" btn btn-xs pull-right" id="txtNumber">1</span>
                    <span class="btn btn-xs glyphicon glyphicon-minus pull-right" id="btnSubtract"></span>
                </p>
            </div>
        </div>
        <div class="row" >
            <form id="form1" runat="server">
                <div class=" col-sm-12" <%=HTMLRoseberStyle %>>
                <!--订单信息-->
                    <div  class=" alert alert-danger" style=" font-size:16px;">订购亲子书法教材，请在下面填写收货信息，然后点击“提交订单”按钮。</div> 
                    <div class=" form-group">
                        <label for="txtName">姓名</label>
                        <asp:TextBox ID="name" name="name" CssClass="form-control" placeholder="收货人姓名" runat="server"></asp:TextBox>
                    </div>
                    <div class=" form-group">
                        <label for="txtPhone">联系电话（请输入11个字符）</label>
                        <asp:TextBox ID="phone" name="phone" CssClass=" form-control"  placeholder="请提供可以联系得上的手机号码" runat="server"></asp:TextBox>
                    </div>
                    <div class=" form-group">
                        <label for="">省分</label>
                        <asp:DropDownList ID="province" name="province" CssClass=" form-control" runat="server"></asp:DropDownList>
                    </div>
                    <div class=" form-group">
                        <label for="">城市</label>
                        <asp:DropDownList ID="city" name="city" CssClass=" form-control" runat="server"></asp:DropDownList>
                    </div>
                    <div class="form-group">
                        <label for="">详细地址</label>
                        <asp:TextBox ID="address" name="address" CssClass="form-control" TextMode="MultiLine" Rows=3 runat="server"></asp:TextBox>
                    </div>
                    <div class=" form-group">
                        <label for="txtRemark">备注</label>
                        <asp:TextBox ID="remark" name=remark CssClass="form-control" TextMode="MultiLine" Rows=3 runat="server"></asp:TextBox>
                    </div>
                </div>
                <div class=" col-xs-12 text-center" <%=HTMLRoseberStyle %> >
                    <button type="button"  class="btn btn-success" id="btnSubmit"  >提交订单</button>
	            <div  class=" alert alert-danger" style=" margin-top:15px;">*注：《国学经典书法教材》（一套10册）定价为199元，您只需支付&nbsp;<span style="color:#f00; font-size:16px;"><b>119</b></span>&nbsp;元的书法教材费(包邮)。</div> 
                </div>
                <div class="col-xs-12 text-center">
                    <a class="btn btn-lg btn-success" href="http://weixin.jiajiaozhihui.cn/wxpay/order/qzsf.aspx" <%=HTMLOnlinePaymentStyle %> >购买</a>
                </div>
                <asp:HiddenField ID="hfOpenid" runat="server" />
                <asp:HiddenField ID="hfFriendid" runat="server" />
                <asp:HiddenField ID="hfGoodsid" runat="server" />
                <asp:HiddenField ID="hfMode" runat="server" />
                <asp:HiddenField ID="hfArea" runat="server" />
                <asp:HiddenField ID="hfPrice" runat="server" />
                <asp:HiddenField ID="hfShare" runat="server" />
                <asp:HiddenField ID="hfWeixinID" runat="server" />
                <asp:HiddenField ID="hfOnlinePay" runat="server" />
            </form>
        </div>
    </div>
    <nav class="navbar navbar-inverse navbar-fixed-bottom" style="min-height:42px;">
        <div class="container">
            <div class="row">
                <div class="col-xs-3 text-center" style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLCommunityLink %>" >书法圈</a></div>
                <div class="col-xs-4 text-center" style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLUpLoadLink %>" >上传作品</a></div>
                <div class="col-xs-3 text-center" style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLPartinLink %>" ><%=HTMLMenuName%></a></div>
                <div class="col-xs-2 text-center  " style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLMyInfoLink %>" >我的</a></div>
            </div>
        </div>
    </nav>
    <!--处理提示-->
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
    <div id="share">
        <img src="images/guide.jpg" style=" width:100%;" />
    </div>
     <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
     <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>

     <script src="../../../js/jquery.validate.js" type="text/javascript"></script>
    <script src="../../../js/jquery.validate.extend.js" type="text/javascript"></script>
    <script src="../../../js/jquery.validate.messages_cn.js" type="text/javascript"></script>
    <script src="js/friend-invite.js" type="text/javascript"></script>
    <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script> 
	$("#turn").click(function () {
            	location.href = "<%=HTMLCommunityLink %>";
            });       
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
                'onMenuShareQZone',
                'previewImage'
                ]
         });

        wx.ready(function () {
            //分享内容
            var shareData = {
                title: '我娃亲子书法第<%=HTMLAwayDays %>天了，好棒，喊你娃一起学习！',
                desc: '家教智慧举办“亲子书法”活动，该活动是基于“书法+移动互联网”的创新理念，致力于打造一场万人书法盛宴',
                link: '<%=HTMLShareLink %>',
                imgUrl: 'http://weixin.jiajiaozhihui.cn/images/2015110908163066ea.jpg'
            };

            // 2. 分享接口
            // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
            wx.onMenuShareAppMessage(shareData);

            // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
            wx.onMenuShareTimeline(shareData);

            // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
            wx.onMenuShareQQ(shareData);

            // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
            wx.onMenuShareWeibo(shareData);

            // 2.5分享到QQ空间
            wx.onMenuShareQZone(shareData);


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
</body>
</html>
