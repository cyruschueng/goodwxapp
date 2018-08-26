<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="SfSoft.web.game.brainsexpert._default" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>诗词大荟</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">

     <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
     <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
     <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=HmpypsSlnhBrSidKOasHSQEb"></script>


    <script src="../js/index.js" type="text/javascript"></script>
    <script src="../js/buttons.js" type="text/javascript"></script>
    <link href="../css/bootstrap-combined.min.css" rel="stylesheet" type="text/css" />
    <link href="../css/layoutit.css" rel="stylesheet" type="text/css" />
    <link href="../css/index.css" rel="stylesheet" type="text/css" />
    <link href="../../css/button.css" rel="stylesheet" type="text/css" />
    <link href="../css/showcase.css" rel="stylesheet" type="text/css" />
    
    <link href="http://cdn.bootcss.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    
    <script>

        $(function () {
            $(".accordion-body").collapse({
                toggle: false,
                parent: '#accordion-984109'
            });
            $(".accordion-heading").click(function () {
                var self = this;
                var o = $(self).next("div").attr("aria-expanded");
                if (o == "true") {
                    $(".ex").removeClass("transition_show");
                    var o = $(self).nextAll().eq(0);
                    o.addClass("transition_hide");
                    o.attr("aria-expanded", "false");
                    o.removeClass("ex");
                } else {
                    var o = $(self).nextAll().eq(0);
                    $(".accordion-body").removeClass("transition_hide");
                    $.each($(".ex"), function (index, item) {
                        $(".ex").eq(index).attr("aria-expanded", "false");
                        $(".ex").eq(index).removeClass("transition_show");
                        $(".ex").eq(index).removeClass("ex");
                    });
                    o.removeAttr("style");
                    o.attr("aria-expanded", "true");
                    o.addClass("ex");
                    o.addClass("transition_show");
                }
            })
        })
    </script>
</head>
<body style=" padding:0px; margin:0px; background:rgb(126,75,255)">
    <div class="container" style=" padding:0px; position:relative; max-width:640px;">
        <div class="row" style=" margin-right:0px; border-top:1px solid #fff; position:fixed; top:0px; left:0px; height:70px; z-index:9999; width:100%;">
            <div id="activityheader">
                <div class="left">
                    <div class="head">
                        <img src="<%=HTMLHeadUrl %>" />
                        <div class="headinfo">
                            <span style=" color:#ff9ea9; width:80%;height:20px;overflow:hidden;"><%=HTMLNickName%></span>
                            <span style=" color:#fff;"><%=HTMLGradeName %></span>
                        </div>
                    </div>
                    <div class="score">
                        <a href="javascript:void(0)" class="button button-glow button-rounded button-raised button-primary custom" >积分：<%=HTMLScore %></a>
                    </div>
                </div>
                <div class="mid">
                    <!--<img src="../images/grade.png" />-->
                    <img id="title_img" src="" />
                    <span><%=HTMLGrade %></span>
                </div>
                <div class="right">
                    <div class="head" style="">
                        <span class="button-dropdown button-dropdown-primary" data-buttons="dropdown" >
                            <button class="button button-primary button-large" style="color:#ffc023; background:#212542; height:40px; line-height:40px;">
                              <span class="glyphicon glyphicon-th-list"></span>
                            </button>
                            <ul class="button-dropdown-list is-below" style=" background:#09ccf4; color:#fff;">
                              <li><a href="home.aspx?openid=<%=HTMLOpenID %>"><span class="glyphicon glyphicon-user"></span>个人中心</a></li>
                              <li class="button-dropdown-divider">
                                    <a href="shop.aspx?openid=<%=HTMLOpenID %>">金币商城</a>
                              </li>
                              <li class="button-dropdown-divider">
                                    <a id="munu_competition" href="competition/prize.aspx?openid=<%=HTMLOpenID %>">擂台赛</a>
                              </li>
                            </ul>
                          </span>
                    </div>
                    <div class="score">
                        <a href="javascript:void(0)" id="ranking" class="button button-glow button-rounded button-raised button-primary custom" >排行榜</a>
                    </div>
                </div>
            </div>
            <div class=" badge-warning text-center">
                <div class="row">
                    <div class="col-xs-6">
                        <a href="http://courses.jiajiaozhihui.cn/link/parents_course.html" style=" color:#fff;">父母特训营</a>
                    </div>
                    <div class="col-xs-6" style="color:#fff;">
                        <span id="playersNumber"></span><span >人气</span> 
                    </div>
                </div>
            </div>
        </div>
	    <div class="row" style="margin-right:0px; margin-top:70px;margin-bottom:20px;">
                     <!--广告-->
		    <div class="col-xs-12" style="margin-bottom:25px;">
                	<div  id="ad" style="margin-bottom:0px;position:relative">
                    
                	</div>
            	    </div>
            		
		    <div class="col-xs-12">
			    <div class="accordion" id="accordion-984109">
                    
                    <div id="matchctivity"  <%=HTMLCompetitionStyle %>  style=" display:none;"> <!--<%=HTMLCompetitionStyle %>-->
                        <div class="list">
                            <%=HTMLCompetition.Content %>
                            <img id="matchctivity_img" src="" /> 
                        </div>
                        <a id="competition_help" class="label label-important"  href="/game/brainsexpert/competition/help.aspx?mode=wexin&weixinid=gh_9140bf8c1946&name=guoxuedaren&id=13" style=" margin-left:75%;">
                            擂台规则
                            <span class="glyphicon glyphicon-question-sign"></span>
                        </a>
                        <div id="cover" ></div>
                    </div>
                    <div id="newactivity">
                        <div class="list" >
                            <%=HTMLNewGame %>
                            <!--<img src="../images/boy.png"  />-->
                            <img id="newactivity_img" src="" />
                        </div>
                    </div>
                    <div id="allactivity">
                        <div class="list" >
                            <%=HTMLAllGame %>
                            <!--<img src="../images/girl.png"  />-->
                            <img id="allactivity_img" src=""  />
                        </div>
                    </div>
			    </div>
		    </div>
	    </div>
        
        <div class="row" style="margin-right:0px; margin-top:10px;margin-bottom:10px;">
            <div class="col-xs-12" style=" text-align:center">
                <a href="javascript:void(0)">
                    <span class="label">本游戏由【家教智慧】出品  </span>
                </a>
            </div>
        </div>
    </div>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hfOpenid" runat="server" />
        <asp:HiddenField ID="hfModel" runat="server" />
        <asp:HiddenField ID="hfWeiXinID" runat="server" />
        <asp:HiddenField ID="hfStartDate" runat="server" />
        <asp:HiddenField ID="hfEndDate" runat="server" />
        <asp:HiddenField ID="hfIsPartIn" runat="server" />
        <asp:HiddenField ID="hfServerTime" runat="server" />
    </form>
    <audio autoplay="autoplay" loop="loop" id="audio"></audio>
    
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
    var shareTitle="<%=HTMLNickName %> 喊你来挑战！TA在<国学达人>已成功晋升为[<%=HTMLGradeName %> ]你敢来吗？";
    var descContent="天下风云出我辈，驰骋题海较高低！群雄逐鹿，舍我其谁！来<国学达人>，一戳到底， 步步晋升，当上太子太傅，走向人生巅峰！快来，一起愉快地玩耍吧~~";
    var shareLink="http://weixin.jiajiaozhihui.cn/link/gxdr.html";
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
