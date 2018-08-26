<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="history.aspx.cs" Inherits="SfSoft.web.game.brainsexpert.history" %>

<!DOCTYPE html >

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" />
    <title>温故而知新</title>
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/history.css" rel="stylesheet" type="text/css" />
</head>
<body style=" padding-top:20px;">
    <div class=" container">
        <div class="row">
            <div class=" col-xs-12">
                <div class="navbar navbar-default" role="navigation">
                  <div class="navbar-header">
     　                <!-- .navbar-toggle样式用于toggle收缩的内容，即nav-collapse collapse样式所在元素 -->
                       <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-responsive-collapse">
                         <span class="sr-only">Toggle Navigation</span>
                         <span class="icon-bar"></span>
                         <span class="icon-bar "></span>
                         <span class="icon-bar"></span>
                       </button>
                       <!-- 确保无论是宽屏还是窄屏，navbar-brand都显示 -->
                       <a href="#" class="navbar-brand">答错历史</a>
                  </div>
                  <!-- 屏幕宽度小于768px时，div.navbar-responsive-collapse容器里的内容都会隐藏，显示icon-bar图标，当点击icon-bar图标时，再展开。屏幕大于768px时，默认显示。 -->
                  <div class="collapse navbar-collapse navbar-responsive-collapse">
    	                <ul class="nav navbar-nav">
      		                <li class="active"><a href="javascript:void(0)" id="btnError">答错历史</a></li>
      		                <li><a href="javascript:void(0)" id="btnRight">答对历史</a></li>
	 	                </ul>
                  </div>
                </div>
            </div>
        </div>
        <div class="col-xs-12">
            <div class="panel-group " id="accordion" role="tablist" aria-multiselectable="true">
                <%=HTMLHistory %>
            </div>
        </div>
    </div>
    <div id="request">
        <img src="../../images/processed.gif" style=" width:32px; height:32px;" />
    </div>
    <form id="form1" runat="server">
        <asp:HiddenField ID="hfOpenID" runat="server" />
        <asp:HiddenField ID="hfQuestionActiveid" runat="server" />
    </form>
    <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
    <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src="../js/history.js" type="text/javascript"></script>
    <script>
        
    </script>
</body>
</html>
