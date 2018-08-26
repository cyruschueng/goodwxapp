<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="course.aspx.cs" Inherits="SfSoft.web.wxpay.order.course" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="format-detection" content="telephone=no" />
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>在线支付</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/weui.min.css" rel="stylesheet" type="text/css" />
    <style>
        .error{ color:#f00; font-size:11px;}
        .form-group input, .form-group textarea{ font-size:14px;}
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div class="container" style=" padding-bottom:60px; ">
        <div class="row">
            <div class="col-xs-12">
                
            </div>
            <div class="col-xs-12">
                <img src="<%=HtmlImage %>" style=" width:100%;"  alt="" />
            </div>
            <div class="col-xs-12" >
                <article class="weui_article">
                    <h4><%=HtmlCaption %></h4>
                    <section>
                            <%=HtmlIntro %>
                    </section>
                </article>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12" id="reminder">
                
            </div>
        </div>
    </div>
    <div id="loadingToast" class="weui_loading_toast" runat="server" style="display:none;">
        <div class="weui_mask_transparent"></div>
        <div class="weui_toast">
            <div class="weui_loading">
                <div class="weui_loading_leaf weui_loading_leaf_0"></div>
                <div class="weui_loading_leaf weui_loading_leaf_1"></div>
                <div class="weui_loading_leaf weui_loading_leaf_2"></div>
                <div class="weui_loading_leaf weui_loading_leaf_3"></div>
                <div class="weui_loading_leaf weui_loading_leaf_4"></div>
                <div class="weui_loading_leaf weui_loading_leaf_5"></div>
                <div class="weui_loading_leaf weui_loading_leaf_6"></div>
                <div class="weui_loading_leaf weui_loading_leaf_7"></div>
                <div class="weui_loading_leaf weui_loading_leaf_8"></div>
                <div class="weui_loading_leaf weui_loading_leaf_9"></div>
                <div class="weui_loading_leaf weui_loading_leaf_10"></div>
                <div class="weui_loading_leaf weui_loading_leaf_11"></div>
            </div>
            <p class="weui_toast_content">数据加载中</p>
        </div>
    </div>
    <nav class="navbar  navbar-fixed-bottom" style=" background:#eee; min-height:46px; ">
        <div class="container">
            <div class="row">
                <div class="col-xs-2 text-center"   ></div>
                <div class="col-xs-6 text-center" style=" height:46px; line-height:46px;" ><span  >总金额：</span><span style="color:#f00">&#65509;</span> <span id="totalprice" style="color:#f00; font-size:16px;"><%=HtmlPrice%></span></div>
                <div class="col-xs-4 text-right"><span id="btnPay" class="btn btn-lg btn-danger" style=" background-color:#F28F3A;border-radius:0;border-color:#F28F3A; ">确认付款</span></div>
            </div>
        </div>
    </nav>
    <asp:HiddenField ID="hfArea" runat="server" />
    <asp:HiddenField ID="hfAddress" runat="server" />
    <asp:HiddenField ID="hfTradeno" runat="server" />
    <asp:HiddenField ID="hfOpenId" runat="server" />
    <asp:HiddenField ID="hfAddressParameters" runat="server" />
    <asp:HiddenField ID="hfProvince" runat="server" />
    <asp:HiddenField ID="hfCity" runat="server" />
    <asp:HiddenField ID="hfDistrict" runat="server" />
    <asp:HiddenField ID="hfPostCode" runat="server" />
    </form>
    <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
    <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script>
        //$("#loadingToast").show();
    </script>
    <script src='http://res.wx.qq.com/open/js/jweixin-1.0.0.js'></script>
    <script src="../../weixinconfig/wxconfig.js" type="text/javascript"></script>
    <script src="../js/course.js" type="text/javascript"></script>
    <script>
        
    </script>
</body>
</html>
