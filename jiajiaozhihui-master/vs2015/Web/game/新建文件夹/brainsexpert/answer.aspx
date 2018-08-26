<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="answer.aspx.cs" Inherits="SfSoft.web.game.brainsexpert.answer" %>


<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>诗词大荟</title>
    <script src="http://cdn.bootcss.com/jquery/1.11.2/jquery.min.js"></script>
    <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <script src="../js/answer1.js" type="text/javascript"></script>
    
    <link href="../css/bootstrap-combined.min.css" rel="stylesheet" type="text/css" />
    <link href="../css/layoutit.css" rel="stylesheet" type="text/css" />
    <link href="../css/answer.css" rel="stylesheet" type="text/css" />
    <link href="../../css/button.css" rel="stylesheet" type="text/css" />
    
</head>
<body style=" background:url(../images/answerbg.jpg) repeat-x #00e6fb;  padding:0px; margin:0px;" >
    <div class="container" style=" padding:0px; position:relative; max-width:640px;">
        <div class="row " style="margin-right:0px;">
            <div id="answerheader">
                <div class="headerinfo">
                    <!--<img src="../images/answer_head.png" style=" width:100%" />-->
                    <img id="head_img" src="" style=" width:100%" />
                    <div class="left">
                        <img src="<%=HTMLHeadUrl %>" />
                        <span style="top:10%; color:#ff9ea9; display:block; width:20%; overflow:hidden;"><%=HTMLNickName%></span>
                        <span style=" color:#fff;"><%=HTMLGradeName %></span>
                    </div>
                    <div class="mid">
                        <span id="time"></span>
                    </div>
                    <div class="right">
                        <span id="score"><%=HTMLScore %></span>
                    </div>
                    <span id="currlabel"></span>
                </div>
            </div>
        </div>
	    <div class="row" style="margin-right:0px;">
		    <div class="span12">
                <h4 id="title" style="padding-top:0px;"></h4>
                <img src="" id="accessory_img" />
                <div id="answer" style=" display:none">
                    <span id="btnA"  class="button button-3d button-primary button-rounded full" style="margin-bottom:20px; background:#fff; padding:0px 5px; overflow:hidden;" onclick="answerquestion('a','btnA')"></span>
                    <span id="btnB"  class="button button-3d button-primary button-rounded full" style="margin-bottom:20px; background:#fff; padding:0px 5px; overflow:hidden;" onclick="answerquestion('b','btnB')"></span>
                    <span id="btnC"  class="button button-3d button-primary button-rounded full" style="margin-bottom:20px; background:#fff; padding:0px 5px; overflow:hidden;" onclick="answerquestion('c','btnC')"></span>
                    <span id="btnD"  class="button button-3d button-primary button-rounded full" style="margin-bottom:20px; background:#fff; padding:0px 5px; overflow:hidden;" onclick="answerquestion('d','btnD')"></span>
                    <div id="answerright">
                        <img src="../images/answerright.png" style=" width:90%; height:90%;" />
                    </div>
                    <div id="answererror">
                        <img src="../images/answererror.png" style=" width:90%; height:90%;" />
                    </div>
                </div>
		    </div>
	    </div>
    </div>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hfID" runat="server" />
        <asp:HiddenField ID="hfOpenID" runat="server" />
        <asp:HiddenField ID="hfWeiXinID" runat="server" />
        <asp:HiddenField ID="hfModel" runat="server" />
    </form>
    <!--游戏开始准备-->
    <div id="prepare">
        <audio autoplay="autoplay" id="audio">
            <!--<source src="../css/go.mp3" type="audio/mpeg" />-->
        </audio>
        <audio autoplay="autoplay" id="gamemusicbg" loop="loop"></audio>
        <img src="../images/prepare.png" />
    </div>
    <!--准备下一关-->
    <div id="next">
        <div class="number">
            <img src="../images/next.png" />
            <span id="sn"></span>
        </div>
    </div>
    <!---->
    <!---正在加载数据-->
    <div id="loading">
        <div></div>
    </div>
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
