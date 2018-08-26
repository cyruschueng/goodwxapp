<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="unscramble.aspx.cs" Inherits="SfSoft.web.game.qzsf.unscramble" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>亲子书法_注解</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .page{ display:none; border-top:2px solid #ddd; border-bottom:2px solid #ddd; padding-top:15px; padding-bottom:15px;}
    </style>
</head>
<body >
    <div class="container">
        <div class="row">
            <div class="col-xs-12 " style=" padding-left:0; padding-right:0;">
                <div class="navbar navbar-default" role="navigation" style="background:#337AB7">
                  <div class="navbar-header">
     　                <!-- .navbar-toggle样式用于toggle收缩的内容，即nav-collapse collapse样式所在元素 -->
                       <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-responsive-collapse">
                         <span class="glyphicon glyphicon-th-list" style=" color:#fff;"></span>
                         
                       </button>
                       <!-- 确保无论是宽屏还是窄屏，navbar-brand都显示 -->
                       <a  class="navbar-brand "   href="<%=HTMLLink.CommunityLink %>"><span class="glyphicon glyphicon-triangle-left" style=" color:#fff;"></span></a>
                       <a href="javascript:void(0)" class="navbar-brand"  ><span id="curBookName" style=" color:#fff;"></span></a>
                  </div>
                  <!-- 屏幕宽度小于768px时，div.navbar-responsive-collapse容器里的内容都会隐藏，显示icon-bar图标，当点击icon-bar图标时，再展开。屏幕大于768px时，默认显示。 -->
                  <div class="collapse navbar-collapse navbar-responsive-collapse">
    	                <ul class="nav navbar-nav" id="menu">
      		                
	 	                </ul>
                  </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class=" col-xs-12" >
                <div class=" page-header h4" style="color:#000;"><%=HTMLTitle%><small class=" pull-right">第<%=HTMLPageIndex%>页</small></div>
            </div>
            <div class=" col-xs-12"></div>
            <div class=" col-xs-12"><%=HTMLContent%></div>
        </div>
    </div> 
    <form id="form1" runat="server">
        <asp:HiddenField ID="hfBookName" runat="server" />
        <asp:HiddenField ID="hfPageIndex" runat="server" />
        <asp:HiddenField ID="hfWeixinID" runat="server" />
        <asp:HiddenField ID="hfOpenID" runat="server" />
    </form>   
     <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
     <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src="js/unscramble.js" type="text/javascript"></script>
     <script>
         
     </script>
</body>
</html>