<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="result.aspx.cs" Inherits="SfSoft.web.game.brainsexpert.competition.result" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>擂台赛-诗词大荟</title>

    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../../css/button.css" rel="stylesheet" type="text/css" />
    <link href="css/bootstrap-combined.min.css" rel="stylesheet" type="text/css" />
    <link href="css/layoutit.css" rel="stylesheet" type="text/css" />
    <link href="css/result.css" rel="stylesheet" type="text/css" />
    <link href="css/showcase.css" rel="stylesheet" type="text/css" />
    <link href="http://cdn.bootcss.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
   <script>
       
   </script>
</head>
<body style=" padding:0px; margin:0px; background:#00e4fa;">
    <div class="container" id="result" style=" padding:0px; position:relative; max-width:640px;">
        <div class="row" style=" margin-right:0px; border-top:1px solid #fff; position:fixed; top:0px; left:0px; height:70px; z-index:9999; width:100%; max-width:640px;">
        <div id="resultheader" >
                <div class="left">
                    <div class="head" style="width:auto;">
                        <div class="headinfo" style=" margin-top:15px;">
                            <span style=" color:#fff;"><%=HTMLGradeName %></span>
                        </div>
                    </div>
                    <div class="score" style=" margin-top:15px;">
                        <a href="javascript:void(0)" class="button button-raised button-primary button-pill custom" >积分：<%=HTMLScore %></a>
                    </div>
                </div>
                <div class="right" >
                    <div class="head" style=" width:auto;">
                        <span class="button-dropdown button-dropdown-primary" data-buttons="dropdown" style=" float:right; margin-top:8px;" >
                            <button class="button button-primary button-large" style="color:#ffc023; background:#212542; height:40px; line-height:40px; padding-left:20px; padding-right:5px;">
                              <span class="glyphicon glyphicon-th-list"></span>
                            </button>
                            <ul class="button-dropdown-list is-below" style=" background:#09ccf4; color:#fff; left:-50px; width:100px;">
                              <li><a href="../home.aspx?openid=<%=HTMLOpenID %>"><span class="glyphicon glyphicon-user"></span>个人中心</a></li>
                              <li class="button-dropdown-divider">
                                    <a href="../shop.aspx?openid=<%=HTMLOpenID %>">金币商城</a>
                              </li>
                            </ul>
                          </span>
                    </div>
                    <div class="score" style=" margin-top:15px;">
                        <a id="ranking" href="javascript:void(0)" class="button button-raised button-primary button-pill custom" >排行榜</a>
                    </div>
                </div>
            </div>
        </div>
	    <div class="row" style="margin-right:0px;">
		    <div class="span12">
                <div >
                    <div id="img">
                        <!--<img src="../images/result_001.png" style=" width:100%;" />-->
                        <img id="img001"  src="" style=" width:100%;" />
                    </div>
                    <div id="score">
                        <img src="<%=HTMLHeaderImgUrl %>" />
                        <span id="nickname"><%=HTMLNickName %></span>
                        <span id="appellation"><%=HTMLGradeName %></span>
                        <div id="currScore">本次得分：<span><%=HTMLCurrScore%></span></div>
                       <div id="gold">目前金币：<span id="cur_gold"><%=HTMLGold %></span>&nbsp;<span class="glyphicon glyphicon-yen" style=" color:#ffb200"></span></div>
                    </div>
                    <div id="result-do" >
                        <input type="button" id="btnshare" runat="server" class="button button-3d button-action button-pill" style=" background:#ffffff; box-shadow: 0px 7px 0px #425980, 0px 8px 3px rgba(0, 0, 0, 0.3); color:#000; margin-right:10px;" value="炫&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;耀" />
                        <input type="button" id="btnrank" runat="server"  class="button button-3d button-action button-pill" style=" background:#ff7502; box-shadow: 0px 7px 0px #964502, 0px 8px 3px rgba(0, 0, 0, 0.3);" value="排行榜" />
                        <br />
                        <br />
                        <a id="btnOther"   href="<%=HTMLNext %>" class="button button-3d button-action button-pill" style=" background:#ffffff; box-shadow: 0px 7px 0px #425980, 0px 8px 3px rgba(0, 0, 0, 0.3); color:#000; margin-right:10px;">返回</a>
                    </div>
                </div>
		    </div>
	    </div>
    </div>
    <div id="upgrade">
        
    </div>
    <div id="share">
        <img src="../../../images/guide.jpg" />
    </div>
    <div id="drowngold">
        <img  src="images/mygold.png" />
    </div>
    <audio autoplay="autoplay" id="audio"></audio>
    <audio autoplay="autoplay" id="goldaudio"></audio>


    <form id="form1" runat="server">
        <asp:HiddenField ID="hfID" runat="server" />
        <asp:HiddenField ID="hfOpenID" runat="server" />
        <asp:HiddenField ID="hfUpgrade" runat="server" />
        <asp:HiddenField ID="hfIsGetGold" runat="server" />
        <asp:HiddenField ID="hfWeiXinID" runat="server" />
        <asp:HiddenField ID="hfModel" runat="server" />
    </form>
    
    <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
    <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src="../../js/buttons.js" type="text/javascript"></script>
    <script src="js/dropGold.js" type="text/javascript"></script>
    <script src="js/result.js" type="text/javascript"></script>
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
    shareTitle="诗词大会擂台赛，好礼送不停~~我在《国学达人》等你来挑战！";
    var descContent="诗词大会擂台赛，好礼送不停~~我在《国学达人》等你来挑战！";
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
