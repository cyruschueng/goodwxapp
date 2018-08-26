<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ranking.aspx.cs" Inherits="SfSoft.web.game.brainsexpert.ranking" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>诗词大荟</title>
    <script src="http://cdn.bootcss.com/jquery/1.11.2/jquery.min.js"></script>
    <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src="../js/ranking.js" type="text/javascript"></script>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    
    <link href="../css/layoutit.css" rel="stylesheet" type="text/css" />
    <link href="../css/ranking.css" rel="stylesheet" type="text/css" />
    <link href="../../css/button.css" rel="stylesheet" type="text/css" />

</head>
<body>
    <div class="container"  style=" padding:0px; position:relative; max-width:640px;">
	    <div class="row" style="margin-left:0px; margin-right:0px;">
		    <div class=" col-xs-12" >
                    <div style=" z-index:-1;" id="rankinglist">
                        <div class=" text-center" style="  font-size:16px; color:#fff; font-weight:bold;"><span class="" id="cityName"></span>参与人数:<span id="playersNumber" ></span></div>
                        <table class="table" style=" margin-bottom:0px;">
                            <tbody> 
                                
                            </tbody>
                        </table>
                        <div id="ranking-do" style="margin-bottom:0px; border-bottom-left-radius:10px; border-bottom-right-radius:10px;">
                            <img id="area_city_ranking" style=" padding:2px;"   src="../images/area_city.png" />
                            <img id="area_province_ranking" src="../images/area_province.png" />
                            <img id="area_nationwide_ranking" src="../images/area_nation.png" />
                        </div>
                    </div>
		    </div>
	    </div>
    </div>
    <div id="shine" style=" height:150px;"></div>
    <div id="rankingtitle"><img src="../images/rankingtitle.png" style="width:100%;" /></div>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hfOpenid" runat="server" />
        <asp:HiddenField ID="hfID" runat="server" />
        <asp:HiddenField ID="hfWeiXinID" runat="server" />
        <asp:HiddenField ID="hfModel" runat="server" />
        <asp:HiddenField ID="hfProvince" runat="server" />
        <asp:HiddenField ID="hfCity" runat="server" />
    </form>
</body>

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
            'showMenuItems'
      ]
    });
    var shareTitle="<%=HTMLNickName %> 喊你来挑战！TA在《国学达人》已成功晋升为【<%=HTMLGradeName %> 】你敢来吗？";
    var descContent="天下风云出我辈，驰骋题海较高低！群雄逐鹿，舍我其谁！来《国学达人》，一戳到底， 步步晋升，当上太子太傅，走向人生巅峰！快来，一起愉快地玩耍吧~~";
    var shareLink="<%=HTMLShareLink %>";
    var imgUrl="http://weixin.jiajiaozhihui.cn/game/images/brainsexpert-head.gif";
    wx.ready(function () {
          wx.onMenuShareAppMessage({
              title: shareTitle, // 分享标题
              desc: descContent, // 分享描述
              link: shareLink, // 分享链接
              imgUrl: imgUrl, // 分享图标
              success: function (res) {
                  // 用户确认分享后执行的回调函数
                  share();
                  alert("分享成功");
              },
              cancel: function (res) {
                  // 用户取消分享后执行的回调函数
                  alert("分享取消");
              }
          });
          wx.onMenuShareTimeline({
              title: shareTitle, // 分享标题
              link: shareLink, // 分享链接
              imgUrl: imgUrl, // 分享图标
              success: function (res) {
                  // 用户确认分享后执行的回调函数
                  share();
                  alert("分享成功");
              },
              cancel: function (res) {
                  // 用户取消分享后执行的回调函数
                  alert("分享取消");
              }
          });
          wx.showOptionMenu();
    })
</script>
</html>
