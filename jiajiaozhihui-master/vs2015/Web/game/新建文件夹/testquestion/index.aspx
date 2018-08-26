<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="SfSoft.web.game.testquestion.index" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <title>梦回唐朝，你会是哪位诗人呢？</title>
    <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1" />
    <script src="../../js/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../js/jquery.validate.js" type="text/javascript"></script>
    <script src="../../js/jquery.metadata.js" type="text/javascript"></script>
    <script src="../../js/jquery.validate.extend.js" type="text/javascript"></script>
    <script src="../../js/jquery.validate.messages_cn.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var clientHeight = $(window).height();
        })
    </script>
    <style type="text/css">
        ul,p{ margin:0px; padding:0px;}
        a{ text-decoration:none;}
        a:visited{ color:#fff;}
        .list{ text-align:center; width:100%;margin-top:10px;}
        ul a:visited{ color:#000;}
        ul{ list-style-type:none; }
        ul li{ float:left; height:20px; line-height:20px; width:50%; text-align:justify;margin-bottom:10px;font-size:16px;}
        ul li a{ font-size:16px; text-align:center;}
        .content{ padding:10px; position:relative;}
        .footer{ position:absolute; bottom:0px; left:0px; text-align:center;   margin-bottom:10px;float:left; width:100%;}
        
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div class="content">
        <img style=" width:100%; " src="../../images/gamebg.jpg" alt="" />
        <div class="footer">
            <a class="start" href="<%=Start %>"><img src="../../images/gamestart.jpg" alt="" style=" width:35%;" /></a>
            <div class="list">
                <ul>
                <%=ListPass %>
                <div style="clear:both; line-height:0px; height:0px; display:none;"></div>
                </ul>
                <div style=" margin-top:50px; width:100%; height:100px; text-align:center; font-size:medium; color:#ccc;">活动动升级中。。。<br /> 感谢你的支持 </div>
            </div>
        </div>
    </div>
    
    <asp:HiddenField ID="hfOpenid" runat="server" />
    <asp:HiddenField ID="hfGoodsid" runat="server" />
    <asp:HiddenField ID="hfAppid" runat="server" />
    <asp:HiddenField ID="hfMode" runat="server" />
    <asp:HiddenField ID="hfFriendid" runat="server" />
    <asp:HiddenField ID="hfAuthURL" runat="server" />
    <asp:HiddenField ID="hfShareImgUrl" runat="server" />
    <asp:HiddenField ID="hfWeekIndex" runat="server" />
    <asp:HiddenField ID="hfShareUrl" runat="server" />

    <asp:HiddenField ID="hfTicket" runat="server" />
    <asp:HiddenField ID="hfNoncestr" runat="server" />
    <asp:HiddenField ID="hfTimestamp" runat="server" />
    <asp:HiddenField ID="hfSignature" runat="server" />

    <asp:HiddenField ID="hfProvince" runat="server" />
    <asp:HiddenField ID="hfCity" runat="server" />
    <asp:HiddenField ID="hfRight" runat="server" />
    <asp:HiddenField ID="hfShareTitle" runat="server" />
    </form>
</body>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js" type="text/javascript"></script>

<script>
    var appid = document.getElementById("hfAppid").value;
    var authurl = document.getElementById("hfAuthURL").value;
    var imgUrl = $("#hfShareImgUrl").val();  //注意必须是绝对路径
    var lineLink = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa0f624ad8cdb46c4&redirect_uri=http%3A%2F%2Fweixin.jiajiaozhihui.cn%2Fgame%2Ftestquestion%2Findex.aspx&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
    var descContent = "太好玩了，梦回唐朝，我成功挑战了“诗杰王勃”，你也来试试~";
    var shareTitle = "梦回唐朝，你会是哪位诗人呢？";  //分享title
    var appid = ''; //apiID，可留空
    wx.config({
        //debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: $("#hfAppid").val(), // 必填，公众号的唯一标识
        timestamp: $("#hfTimestamp").val(), // 必填，生成签名的时间戳
        nonceStr: $("#hfNoncestr").val(), // 必填，生成签名的随机串
        signature: $("#hfSignature").val(), // 必填，签名，见附录1
        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'showOptionMenu', 'onMenuShareQQ', 'onMenuShareWeibo'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.ready(function () {
        wx.onMenuShareAppMessage({
            title: shareTitle, // 分享标题
            desc: descContent, // 分享描述
            link: lineLink, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function (res) {
                // 用户确认分享后执行的回调函数
                alert("分享成功");
            },
            cancel: function (res) {
                // 用户取消分享后执行的回调函数
                alert("分享取消");
            }
        });

        wx.onMenuShareTimeline({
            title: descContent, // 分享标题
            desc: shareTitle, // 分享描述
            link: lineLink, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function (res) {
                // 用户确认分享后执行的回调函数
                alert("分享成功");
            },
            cancel: function (res) {
                // 用户取消分享后执行的回调函数
                alert("分享取消");
            }
        });
        wx.onMenuShareQQ({
            title: shareTitle, // 分享标题
            desc: descContent, // 分享描述
            link: lineLink, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                //alert("分享成功");
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                //alert("分享取消");
            }
        });
        wx.onMenuShareWeibo({
            title: shareTitle, // 分享标题
            desc: descContent, // 分享描述
            link: lineLink, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                //alert("分享成功");
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                //alert("分享取消");
            }
        });
        wx.showOptionMenu();
    })
</script>
</html>


