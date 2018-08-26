<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="gxdr.aspx.cs" Inherits="SfSoft.web.game.brainsexpert.gxdr" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>课程练习</title>
    <script src="http://cdn.bootcss.com/jquery/1.11.2/jquery.min.js"></script>
    <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <script src="../js/gxdr.js" type="text/javascript"></script>
    
    <link href="../css/layoutit.css" rel="stylesheet" type="text/css" />
    <link href="../css/gxdr.css" rel="stylesheet" type="text/css" />
    <link href="../../css/button.css" rel="stylesheet" type="text/css" />
    
</head>
<body style=" background:url(../images/answerbg.jpg) repeat-x #00e6fb;  padding:0px; margin:0px;" >
        <div style="background-color: #eee;padding:15px 0;">
            <div class="media" style="margin-left:15px;margin-right:15px;">
                <div class="media-left">
                    <img style="width:64px; height: 64px; margin-top:10px;margin-bottom:10px;" class="media-object img-circle" src="<%=HTMLHeadUrl %>" alt="...">
                </div>
                <div class="media-body" style="position: relative">
                    <h4 class="media-heading" style="margin-bottom:20px;"><%=HTMLCourseName %> 练习</h4>
                    <div style="position: absolute; bottom:5px; left: 0;width:100%;">
                        <div class="container">
                            <div class="row">
                                <div class="col-xs-6" style="height: 33px; line-height: 33px;">
                                    <span class="text-info" ><%=HTMLNickName %></span>
				    &nbsp;&nbsp;&nbsp;分数：
                                    <span id="score" class="text-success"><%=HTMLScore %></span>
                                </div>
                                <div class="col-xs-3">
                                    <span id="time"  style="background-color: #fff;color:#000; font-size:27px;" class="badge">10</span>
                                </div>
                                <div class="col-xs-3 text-center" style="height: 33px; line-height: 33px;">
                                    <span id="currlabel"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	    <div class="row" style="margin-right:0px;">
		    <div class="col-xs-12">
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
</html>
