<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="report.aspx.cs" Inherits="SfSoft.web.game.qzsf.report" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>上传记录</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/weui.min.css" rel="stylesheet" type="text/css" />
    <style>
        .menu{ font-size:16px; padding:6px 8px; border:none; width:100%;}
        .week{ padding:2px 0;}
    </style>
</head>
<body>
    <div class=" container">
        <div class="row" style=" margin-bottom:30px; padding-top:15px;">
            <div class="col-xs-12">
                <ul class=" media-list" id="media-list">
                    
                </ul>
            </div>
        </div>
        <form runat="server">
            <asp:HiddenField ID="hfOpenID" runat="server" />
        </form>
    </div>
    <audio id="audio"></audio>
    <nav class="navbar  navbar-fixed-bottom" style="min-height:42px;" id="navbar">
        <div class="container">
            <div class="row">
                <div class="col-xs-12 text-center" style=" background:#337AB7; padding:8px 2px " id="selectWeek"><a class=" btn btn-primary menu " href="javascript:void(0)" >选择第几周</a> </div>
            </div>
        </div>
    </nav>

    <div id="actionSheet_wrap">
        <div class="weui_mask_transition" id="mask"></div>
        <div class="weui_actionsheet" id="weui_actionsheet">
            <div class="weui_actionsheet_menu">
                <div class=" container">
                    <div class="row">
                        <div class="col-xs-3 text-center week" data-week=1><span class="btn btn-xs btn-default">第1周</span></div>
                        <div class="col-xs-3 text-center week" data-week=2 ><span class="btn btn-xs btn-default">第2周</span></div>
                        <div class="col-xs-3 text-center week" data-week=3 ><span class="btn btn-xs btn-default">第3周</span></div>
                        <div class="col-xs-3 text-center week" data-week=4 ><span class="btn btn-xs btn-default">第4周</span></div>
                        <div class="col-xs-3 text-center week" data-week=5 ><span class="btn btn-xs btn-default">第5周</span></div>
                        <div class="col-xs-3 text-center week" data-week=6 ><span class="btn btn-xs btn-default">第6周</span></div>
                        <div class="col-xs-3 text-center week" data-week=7 ><span class="btn btn-xs btn-default">第7周</span></div>
                        <div class="col-xs-3 text-center week" data-week=8 ><span class="btn btn-xs btn-default">第8周</span></div>
                        <div class="col-xs-3 text-center week" data-week=9 ><span class="btn btn-xs btn-default">第9周</span></div>
                        <div class="col-xs-3 text-center week" data-week=10 ><span class="btn btn-xs btn-default">第10周</span></div>
                        <div class="col-xs-3 text-center week" data-week=11 ><span class="btn btn-xs btn-default">第11周</span></div>
                        <div class="col-xs-3 text-center week" data-week=12 ><span class="btn btn-xs btn-default">第12周</span></div>
                        <div class="col-xs-3 text-center week" data-week=13 ><span class="btn btn-xs btn-default">第13周</span></div>
                        <div class="col-xs-3 text-center week" data-week=14 ><span class="btn btn-xs btn-default">第14周</span></div>
                        <div class="col-xs-3 text-center week" data-week=15 ><span class="btn btn-xs btn-default">第15周</span></div>
                        <div class="col-xs-3 text-center week" data-week=16 ><span class="btn btn-xs btn-default">第16周</span></div>
                        <div class="col-xs-3 text-center week" data-week=17 ><span class="btn btn-xs btn-default">第17周</span></div>
                        <div class="col-xs-3 text-center week" data-week=18 ><span class="btn btn-xs btn-default">第18周</span></div>
                        <div class="col-xs-3 text-center week" data-week=19 ><span class="btn btn-xs btn-default">第19周</span></div>
                        <div class="col-xs-3 text-center week" data-week=20><span class="btn btn-xs btn-default">第20周</span></div>
                        <div class="col-xs-3 text-center week" data-week=21 ><span class="btn btn-xs btn-default">第21周</span></div>
                        <div class="col-xs-3 text-center week" data-week=22 ><span class="btn btn-xs btn-default">第22周</span></div>
                        <div class="col-xs-3 text-center week" data-week=23 ><span class="btn btn-xs btn-default">第23周</span></div>
                        <div class="col-xs-3 text-center week" data-week=24 ><span class="btn btn-xs btn-default">第24周</span></div>
                        <div class="col-xs-3 text-center week" data-week=25 ><span class="btn btn-xs btn-default">第25周</span></div>
                        <div class="col-xs-3 text-center week" data-week=26 ><span class="btn btn-xs btn-default">第26周</span></div>
                        <div class="col-xs-3 text-center week" data-week=27 ><span class="btn btn-xs btn-default">第27周</span></div>
                        <div class="col-xs-3 text-center week" data-week=28 ><span class="btn btn-xs btn-default">第28周</span></div>
                    </div>
                </div>
            </div>
            <div class="weui_actionsheet_action">
                <div class="weui_actionsheet_cell" id="actionsheet_cancel">取消</div>
            </div>
        </div>
    </div>
    <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
    <script src="js/audio.js" type="text/javascript"></script>
    <script src="js/report.js" type="text/javascript"></script>
</body>
</html>
