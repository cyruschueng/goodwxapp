<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="info.aspx.cs" Inherits="SfSoft.web.game.qzsf.info" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>我的</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .header{ position:relative; }
        .header .header-img{ position:absolute; top:25%; left:10%; }
        .header .header-info{ position:absolute; bottom:0px; left:0px; margin-left:0; margin-right:0;}
        .header .header-info .padding-top{ padding-top:5px; }
        .header .header-info .padding-bottom{ padding-bottom:5px; }
        
         .menu{ font-size:16px; padding:6px 8px; border:none; width:100%;}
        .right-line{ border-right:1px solid #fff; border-top-right-radius:0;border-bottom-right-radius:0;}
        .left-line{ border-left:1px solid #fff; border-top-left-radius:0;border-bottom-left-radius:0;}
    </style>
</head>
<body>
    <div class="container">
        <div class="row" style=" margin-bottom:30px;">
            <div class="header">
                <img  class=" img-thumbnail"  src="images/xj.jpg" />
                <div class="row header-img" >
                    <div class="col-xs-2">
                        <img  src="<%=ItemUser.HeadImgUrl %>" style=" width:48px; height:48px;" />        
                    </div>
                    <div class="col-xs-10" style=" font-size:medium; margin-top:5px;">
                        <div class="row">
                            <div class="col-xs-12 " style=" color:#23527C"><%=ItemUser.NickName %></div>
                            <div class="col-xs-12">
                                <span style="  font-size:13px;">LV</span><span style="  font-size:11px; "><%=HTMLGrade %></span>&nbsp;<span style="  color:#A94442; font-size:11px;"><%=HTMLGradeName %></span>&nbsp;&nbsp;&nbsp;
                                <span style="  color:#3C763D" ><%=HTMLIntegralEarn %></span>&nbsp;<span  style=" font-size:11px;">积分</span>&nbsp;&nbsp;&nbsp;
                                <span style=" color:#8A6D3B"><%=HTMLGoldEarn %></span>&nbsp;<span style=" font-size:11px;" >金币</span>&nbsp;&nbsp;&nbsp;
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row header-info">
                    <div class="col-xs-3 text-center bg-info padding-top" >作品</div>
                    <div class="col-xs-3 text-center bg-info padding-top" data-container="body" data-toggle="popover" data-placement="bottom" data-content="从第一次上传作品开始计算">练习<span class="glyphicon glyphicon-question-sign bg-info"></span></div>
                    <div class="col-xs-3 text-center bg-info padding-top" >评论</div>
                    <div class="col-xs-3 text-center bg-info padding-top" style=" padding-right:30px;">赞</div>
                    <div class="col-xs-3 text-center bg-info padding-bottom"><%=HTMLWorksNumber%>个</div>
                    <div class="col-xs-3 text-center bg-info padding-bottom"><%=HTMLStudyDay%>天</div>
                    <div class="col-xs-3 text-center bg-info padding-bottom"><%=HTMLCommentNumber%>个</div>
                    <div class="col-xs-3 text-center bg-info padding-bottom" style=" padding-right:30px;"><%=HTMLLikeNumber%>个</div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class=" col-xs-12">
                <ul class=" list-group">
                    <li class=" list-group-item list-group-item-success"><a href="<%=HTMLLink.MyWorksLink %>" style=" display:block; font-size:14px;">我的作品</a></li>
                    <li class=" list-group-item list-group-item-info"><a href="<%=HTMLLink.MyAdditionInfoLink %>" style=" display:block; font-size:14px;">我的资料</a></li>
                    <li class=" list-group-item list-group-item-warning"><a href="<%=HTMLLink.MyActiveLink %>" style=" display:block; font-size:14px;">我的活动</a></li>
                    <li class=" list-group-item list-group-item-success"><a href="<%=HTMLLink.MyCommentLink %>" style=" display:block; font-size:14px;">我的评论</a></li>
                    <!--<li class=" list-group-item list-group-item-info"><a href="agreementlist.aspx" style=" display:block; font-size:14px;">上传协议书</a></li>-->
                    <!--<li class=" list-group-item list-group-item-success"><a href="reportlist.html" style=" display:block; font-size:14px;">退款说明</a></li>-->
                </ul>
            </div>
        </div>
<!--
        <div class="row" style=" margin-bottom:30px;">
            <div class=" col-xs-12" style="padding-top:20px;">
                <p class="bg-success" style="padding:5px">
                    如果你的订单已审核，但还是显示 <span style='color:#f00'>订单正在审核中。。。</span> ,请点击这里进入
                    <a class=" btn btn-bg-primary" href="<%=HTMLLink.RepairLink %>">进入</a>
                </p>
            </div>
        </div>
-->
    </div>
   
    <nav class="navbar  navbar-fixed-bottom" style="min-height:42px;">
        <div class="container">
            <div class="row">
                <div class="col-xs-4 text-center" style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLLink.CommunityLink %>" >书法圈</a></div>
                <div class="col-xs-4 text-center" style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLLink.UpLoadLink %>" >上传作品</a></div>
                <div class="col-xs-4 text-center  " style=" background:#337AB7; padding:8px 2px "><a class=" btn btn-primary menu " href="<%=HTMLLink.MyInfoLink %>" >我的</a></div>
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
                        <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                        <span class="sr-only">80% Complete (danger)</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hfOpenID" runat="server" />
        <asp:HiddenField ID="hfProductID" runat="server" />
        <asp:HiddenField ID="hfWeixinID" runat="server" />
    </form>
     <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
     <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script>
        $(function () {
            $('[data-toggle="popover"]').popover()
        })
    </script>
</body>
</html>
