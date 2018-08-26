<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="tangshi.aspx.cs" Inherits="SfSoft.web.game.testquestion.tangshi" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <title></title>
    <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1" />
    <script src="../../js/jquery-1.7.2.js" type="text/javascript"></script>
    <script src="../../js/jquery.validate.js" type="text/javascript"></script>
    <script src="../../js/jquery.metadata.js" type="text/javascript"></script>
    <script src="../../js/jquery.validate.extend.js" type="text/javascript"></script>
    <script src="../../js/jquery.validate.messages_cn.js" type="text/javascript"></script>
    <script type="text/javascript">
        var questionData; //所有的题目
        var interval=null;//周期调用的手柄
        var timeout; //到期执行的手柄
        var errors=""; //错答题行标
        var index = -1;
        var answerNumber = 0; //目前答题个数
        var questionNumber = 0; //试题个数
        var startmilliseconds; //开始答题时间（秒）
        var endmilliseconds; //结束答题时间（秒）
        var intervaltime = 0;
        var everytime = 0;
        var array = [];

        $(function () {
            questionNumber = $("#hfAmount").val();
            intervaltime = parseInt($("#hfEveryTime").val());
            window.document.title = "本次第" + $("#hfGrade").val() + "关挑战【" + $("#hfPassName").val() + "】";
            questionData = $.parseJSON($("#hfTestQuestion").val());
            initQuestion();
            interval = setInterval(autoAnswerQuestion, intervaltime * 1000);
            timetip();
            setInterval(timetip, 1000);
            var starttime = new Date();
            var minutes = starttime.getMinutes();
            var seconds = starttime.getSeconds();
            startmilliseconds = minutes * 60 * 1000 + seconds * 1000 + starttime.getMilliseconds();
            showerror();
            guide();
            back();
            gz();
        })
        function getRandom() {
            index = Math.floor(Math.random() * 37);
            var flag = 0;
            do {
                for (var j = 0; j < array.length; j++) {
                    if (array[j] == index) {
                        flag = 1;
                        break;
                    }
                }
                if (!flag) {
                    array[array.length] = index;
                } else {
                    index = Math.floor(Math.random() * 37);
                }
            } while (!flag);
            return index;     
        }
        //手动答题
        function handAnswerQuestion() {
            if (questionNumber == answerNumber) {
                stop();
            }

            var item=questionData.ds[getRandom()];
            showquestion(item);
            answerNumber += 1;
        }
        //自动答题
        function autoAnswerQuestion() {
            
            if (questionNumber == answerNumber) {
                stop();
            }
            var item = questionData.ds[getRandom()];
            //alert("自动答题");
            errors += index + ",";
            showquestion(item);
            answerNumber += 1;
        }
        //初始试题
        function initQuestion() {
            var item = questionData.ds[getRandom()];
            showquestion(item);
        }
        function showquestion(item) {
            everytime = parseInt($("#hfEveryTime").val());
            $("#title").text(item.TestQuestion);
            $("#title").data("answer", item.RightAnswer);
            $("#answer1").text(ShowLetter(item.Answer1).toUpperCase() + "：" + AnswerWithOutLetter(item.Answer1));
            $("#answer1").data("answer", ShowLetter(item.Answer1));
            $("#answer2").text(ShowLetter(item.Answer2).toUpperCase() + "：" + AnswerWithOutLetter(item.Answer2));
            $("#answer2").data("answer", ShowLetter(item.Answer2));
            $("#answer3").text(ShowLetter(item.Answer3).toUpperCase() + "：" + AnswerWithOutLetter(item.Answer3));
            $("#answer3").data("answer", ShowLetter(item.Answer3));
            $("#answer4").text(ShowLetter(item.Answer4).toUpperCase() + "：" + AnswerWithOutLetter(item.Answer4));
            $("#answer4").data("answer", ShowLetter(item.Answer4));
        }

        function stop() {
            clearInterval(interval);
            var endtime = new Date();
            var minutes = endtime.getMinutes();
            var seconds = endtime.getSeconds();
            endmilliseconds = minutes * 60 * 1000 + seconds * 1000 + endtime.getMilliseconds();
            $("#page1").css("display","none");
            var time= endmilliseconds - startmilliseconds;
            result(time);
        }
        function select(id) {
            var rightanswer = $("#title").data("answer").toLocaleLowerCase();
            var selectanswer = $("#" + id).data("answer").toLocaleLowerCase();
            if (rightanswer != selectanswer) {
                if (index != -1) {
                    //alert("选择答题")
                    errors += index + ",";
                }
            }
            clearInterval(interval);
            handAnswerQuestion();
            interval = setInterval(autoAnswerQuestion, intervaltime * 1000);
        }
        function result(time) {
            //是否及格算法：及格分数*总题目数/100 算出来的要达到的个数
            //var upperLimit = $("#hfUpperLimit").val();
            //及格线：
            var issuccess = 0;
            var n = parseInt($("#hfUpperLimit").val()) * parseInt(questionNumber) / 100;
            var array = new Array();
             array = errors.split(',');
             var rightnumber = parseInt(questionNumber) - array.length + 1;
             if (rightnumber > n || rightnumber == n) {
                 issuccess = 1;
             }
             $.ajax({
                 url: "../../Service/game.ashx",
                 type: "POST",
                 dataType: "text",
                 data: "openid=" + $("#hfOpenid").val() + "&type=" + $("#hfQestionType").val() + "&grade=" + $("#hfGrade").val() + "&score=" + rightnumber * 100 / parseInt(questionNumber) + "&usertime=" + time + "&issuccess=" + issuccess + "&statsu=" + $("#status").val(),
                 beforeSend: function (e, xhr, o) {
                     $("#canv").css({ "width": "100%", "height": "100%", "display": "block" });
                     $(".adv").css("display", "none");
                 },
                 success: function (data) {
                     $("#page1").css("display", "none");
                     $("#page2").css("display", "block");
                     if (issuccess == 1) {
                         $("#page2 img").attr("src", "../../images/result-1.jpg");
                         //$("#result").text("您本次挑战获得【" + rightnumber * 100 / parseInt(questionNumber) + "分】击败了" + data + "的挑战者，恭喜过关！勇敢挑战下一关吧 ！");
                         $("#result").text(data);
                         $("#action-start").attr("src", "../../images/next.jpg");
                         if ($("#hfGrade").val() == $("#hfMaxPass").val()) {
                             //$("#result").text("您本次挑战获得【" + rightnumber * 100 / parseInt(questionNumber) + "分】击败了" + data + "的挑战者，恭喜过关！您的唐诗水平已经达到了诗仙李白级别，天下无人可敌！分享到朋友圈，嘚瑟一下吧 ！");
                             $("#result").text(data);
                         } else {
                             $("#a-start").attr("href", "tangshi.aspx?type=" + $("#hfQestionType").val() + "&grade=" + (parseInt($("#hfGrade").val()) + 1).toString());
                         }
                         $("#replay").attr("href", "tangshi.aspx?type=" + $("#hfQestionType").val() + "&grade=" + $("#hfGrade").val() + "");
                     } else {
                         $("#page2 img").attr("src", "../../images/result-2.jpg");
                         $("#action-start").attr("src", "../../images/again.jpg");
                         //$("#result").text("您本次挑战获得【" + rightnumber * 100 / parseInt(questionNumber) + "分】真遗憾，差一点点就成功啦，再试一次吧！");
                         $("#result").text(data);
                         $("#replay").css("display","none");
                     }
                     $("#action-share").attr("src", "../../images/sharetimeline.jpg");
                 },
                 complete: function () {
                     $("#canv").css("display", "none");
                 }
             });

            if (array.length > 1) {
                var item = "<ul>";
                for (var i = 0; i < (array.length - 1); i++) {
                    item += "<li>";
                    item += "<h3 data-right='" + questionData.ds[array[i]].RightAnswer + "'>" + questionData.ds[array[i]].TestQuestion + "</h3>";
                    item += "<blockquote>";
                    item += "<p data-answer='" + ShowLetter(questionData.ds[array[i]].Answer1) + "'>" + ShowLetter(questionData.ds[array[i]].Answer1).toUpperCase() + "：" + AnswerWithOutLetter(questionData.ds[array[i]].Answer1) + "</p>"
                    item += "<p data-answer='" + ShowLetter(questionData.ds[array[i]].Answer2) + "'>" + ShowLetter(questionData.ds[array[i]].Answer2).toUpperCase() + "：" + AnswerWithOutLetter(questionData.ds[array[i]].Answer2) + "</p>"
                    item += "<p data-answer='" + ShowLetter(questionData.ds[array[i]].Answer3) + "'>" + ShowLetter(questionData.ds[array[i]].Answer3).toUpperCase() + "：" + AnswerWithOutLetter(questionData.ds[array[i]].Answer3) + "</p>"
                    item += "<p data-answer='" + ShowLetter(questionData.ds[array[i]].Answer4) + "'>" + ShowLetter(questionData.ds[array[i]].Answer4).toUpperCase() + "：" + AnswerWithOutLetter(questionData.ds[array[i]].Answer4) + "</p>"
                    item += "</blockquote>"
                    item+= "</li>";
                }
                item+= "</ul>";
                $("#page3").append(item);
                findRightAnswer();
            }
        }
        function AnswerWithOutLetter(item) {
            return item.substr(0, item.length - 2)
        }
        function ShowLetter(item) {
            return item.substring(item.length - 1, item.length)
        }
        function showerror() {
            $("#errorquestion").click(function () {
                $("#page3").show();
                $("#page1,#page2").hide();
            });
        }
        function timetip() {
            if (everytime != 0) {
                everytime = everytime - 1
            }
            $("#tip").text("剩余时间还有："+everytime+"秒");
        }
        function guide() {
            $("#a-share").click(function () {
                $("#shareimg").show();
                setTimeout("$('#shareimg').fadeOut()", 3000);
            });
        }
        function back(){
            $("#return").click(function(){
                $("#page2").show();
                $("#page1,#page3").hide();
            });
        }
        function findRightAnswer() {
            $("#page3 li").each(function (index) {
                var right = $(this).find("h3").data("right");
                $.each($(this).find("p"), function (index, data) {
                    if ($(data).data("answer") == right) {
                        $(data).css("color", "#f00");
                    }
                })
            });
        }
        function gz() {
            $("#guanzhu").click(function () {
                window.open("http://mp.weixin.qq.com/s?__biz=MzA4MjExMjkwNQ==&mid=202380789&idx=1&sn=7b89a13984cdc8c28260567f00cc2d19#rd");
            });
        }
    </script>
    <style type="text/css">
        footer,ul,p{ margin:0px; padding:0px; list-style-type:none;}
        a{ text-decoration:none;}
        blockquote p{ height:40px; line-height:40px; font-size:18px;}
        #page1,#page2,#page3,.adv{ padding:10px;}
        #page2,#page3{ display:none; position:relative;}
        .detail{ position:absolute; top:40%; left:0px; text-align:center; width:100%;}
        .detail p{ margin-bottom:20px; font-size:14px; display:block; width:60%; margin:0 auto; height:95px;}
        #tip{ display:block; height:20px; line-height:20px; color:#666; width:100%; font-size:14px; padding-left:10px; }
        .action{ position:absolute; top:70%; left:0px; text-align:center;}
        .action a{  display:block; margin:0 auto; margin-bottom:15px; width:100%; }
        .action a img{display:block; margin:0 auto;  width:35%; }
        .adv{ position:fixed; bottom:0px; left:0px; font-size:16px; }
        .select-answer{ font-size:16px;}
        
        .select-answer p {
          display: block;
          height: 40px;
          line-height: 40px;
          padding-right: 10px;
          padding-left: 10px;
          position: relative;
          background-color:rgb(0,153,51);
          color:rgb(255,255,255);
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 10px;
  
          border-radius: 5px;
          -moz-border-radius: 5px;
          -webkit-border-radius: 5px;
          text-shadow:0px 1px 0px rgba(0,0,0,0.5);
        -ms-filter:"progid:DXImageTransform.Microsoft.dropshadow(OffX=0,OffY=1,Color=#ff123852,Positive=true)";zoom:1;
        filter:progid:DXImageTransform.Microsoft.dropshadow(OffX=0,OffY=1,Color=#ff123852,Positive=true);
          -moz-box-shadow:0px 2px 2px rgba(0,0,0,0.2);
          -webkit-box-shadow:0px 2px 2px rgba(0,0,0,0.2);
          box-shadow:0px 2px 2px rgba(0,0,0,0.2);
          -ms-filter:"progid:DXImageTransform.Microsoft.dropshadow(OffX=0,OffY=2,Color=#33000000,Positive=true)";
        filter:progid:DXImageTransform.Microsoft.dropshadow(OffX=0,OffY=2,Color=#33000000,Positive=true);
        }
        .questiontitle{ position:relative; width:100%; height:80px; border-bottom:5px solid rgb(0,153,51); border-top:5px solid rgb(0,153,51); padding:5px 0px; margin-bottom:15px;}
        .questiontitle h2{ }
        #result{ font-size:18px;}
        @media screen and (max-height: 480px)
        {
                .adv{ position:static; }
                .detail{ position:absolute; top:38%; left:0px; text-align:center; width:100%;}
                #result{ font-size:14px;}
        }
        @media screen and (max-height: 640px)
        {
                .adv{ position:static; }
                .detail{ position:absolute; top:38%; left:0px; text-align:center; width:100%;}
                #result{ font-size:14px;}
        }
        #shareimg{ position:absolute; z-index:999; top:0px; left:0px; display:none;opacity:0.8; filter:alpha(opacity=80);}
        
        #page3 footer{position:fixed; bottom:0px; left:0px; background:#ebebeb; border-top:1ps solid #666; width:100%; display:block; z-index:999;}
        #page3 footer ul{ height:40px; line-height:40px; width:100%; list-style-type:none;}
        #page3 footer ul li { float:left; width:100%; height:30px; line-height:30px;  text-align:center; position:relative; border-left:1px solid #fff; margin-top:5px; }
        #page3 footer ul li a{ color:#000; font-size:18px;height:30px; line-height:30px; text-align:center; display:block; }
        #page3 li h3{ font-size:16px;}
        #page3 li p{ font-size:14px;}
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div id="page1">
            <span id="tip"></span>
            <div class="questiontitle">
                <h2 id="title"></h2>
            </div>
            <div class="select-answer">
                <p id="answer1" onclick="select('answer1')" ></p>
                <p id="answer2" onclick="select('answer2')"></p>
                <p id="answer3" onclick="select('answer3')"></p>
                <p id="answer4" onclick="select('answer4')"></p>
            </div>
        </div>
        <div id="page2">
            <img src="../../images/result-1.jpg" alt="" width="100%" />
            <div class="detail">
                <p id="result"></p>
                <a id="errorquestion" href="javascript:void(0)" style=" font-size:13px;">查看错误</a>
                <a id="replay" href="javascript:void(0)" style=" font-size:13px;">再试一次</a>
            </div>
            <div class="action">
                <a id="a-start" href=""><img id="action-start" src="" alt="" /></a>
                <a id="a-share" href="javascript:void(0)"><img id="action-share" src="" alt="" style=" width:50%;" /></a>
            </div>
        </div>
        <div id="page3">
            <footer>
                <ul>
                    <li><a class="btn" id="return" style=" background:url(../../images/return.png) no-repeat 40% -5px ; padding-left:30px; background-size:30px 30px;">返回</a></li>
                </ul>
            </footer>
        </div>
        <div id="canv" style=" display:none; text-align:center;">
            <img src="../../images/processed.gif" alt="" />
        </div>
        <div class="adv">
            <img style=" float:left; width:100%; margin-bottom:10px;" src="../../images/adv.jpg" alt="" />
            <span>关注教育，帮助孩子快乐成长！</span>
            <span id="guanzhu" style="color:#00f;">关注家教智慧 ☞ <strong id="strong">jiajiaoZH</strong></span>
        </div>
        <img id="shareimg" src="../../images/guide.jpg" width="100%" alt="" />
    <asp:HiddenField ID="hfOpenid" runat="server" />
    <asp:HiddenField ID="hfGoodsid" runat="server" />
    <asp:HiddenField ID="hfAppid" runat="server" />
    <asp:HiddenField ID="hfMode" runat="server" />
    <asp:HiddenField ID="hfFriendid" runat="server" />
    <asp:HiddenField ID="hfAuthURL" runat="server" />
    <asp:HiddenField ID="hfShareImgUrl" runat="server" />
    <asp:HiddenField ID="hfWeekIndex" runat="server" />
    <asp:HiddenField ID="hfShareTitle" runat="server" />

    <asp:HiddenField ID="hfTicket" runat="server" />
    <asp:HiddenField ID="hfNoncestr" runat="server" />
    <asp:HiddenField ID="hfTimestamp" runat="server" />
    <asp:HiddenField ID="hfSignature" runat="server" />

    <asp:HiddenField ID="hfTestQuestion" runat="server" />
    <asp:HiddenField ID="hfAmount" runat="server" />
    <asp:HiddenField ID="hfUpperLimit" runat="server" />
    <asp:HiddenField ID="hfQestionType" runat="server" />
    <asp:HiddenField ID="hfGrade" runat="server" />
    <asp:HiddenField ID="hfEveryTime" runat="server" />
    <asp:HiddenField ID="hfStatus" runat="server" />
    <asp:HiddenField ID="hfMaxPass" runat="server" />
    <asp:HiddenField ID="hfPassName" runat="server" />
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


