<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pay.aspx.cs" Inherits="SfSoft.web.wxpay.jsapi.pay" %>

<!DOCTYPE html >

<html >
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <title>在线支付</title>
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/weui.min.css" rel="stylesheet" type="text/css" />
    <script src="http://cdn.bootcss.com/jquery/2.1.1/jquery.js"></script>
    <style>
        #cover{ position:fixed; left:0px; top:0px; width:100%; height:100%; background:url(images/pro.gif) #fff no-repeat 50% 50%; background-size:25%; opacity:0.57;filter:alpha(opacity=57); display:none; z-index:9999;}
        .error{ color:#f00; font-size:11px;}
        .form-group input, .form-group textarea{ font-size:14px;}
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div class="container" style=" padding-bottom:60px; ">
        <div class="row">
            <div class="col-xs-12">
                <asp:TextBox ID="txtLog" runat="server"></asp:TextBox>
                <asp:Label ID="lblLog" runat="server"></asp:Label>
                <input type="button" id="myinput" value="点击我" />
            </div>
            <div class="col-xs-12">
                <img style=" width:100%;" src="" alt="" />
            </div>
            <div class="col-xs-12">
                <h4>国学经典书法教材</h4>
            </div>
            <div class="col-xs-12" style=" font-size:14px;">
                <ul class="list-group">
                   <li class="list-group-item">
                        <div class="row">
                            <div class="col-xs-8">单价</div>
                            <div class="col-xs-4">
                                <span style="color:#f00">&#65509;</span><span id="price" style=" color:#f00"></span> 
                            </div>
                        </div>
                   </li>
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-xs-7">购买数量</div>
                            <div class="col-xs-5 text-right">
                                <span class="btn btn-xs btn-default" id="subtraction">&nbsp;-&nbsp;</span>
                                &nbsp; <span id="payNumber" runat="server">1</span>&nbsp;
                                <span class="btn btn-xs btn-default" id="add">&nbsp;+&nbsp;</span>
                            </div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-xs-8">配送方式</div>
                            <div class="col-xs-4">
                                快递 免费
                            </div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-xs-4">收货信息</div>
                            <div class="col-xs-8 text-right">
                                <span class=" btn btn-xs btn-default" id="btnEditAddress">选择与编辑收货信息</span>
                            </div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="row">
                                    <div class="col-xs-6">收货人： <span id="receivename"></span> </div>
                                    <div class="col-xs-6"><span id="telephone"></span></div>
                                    <div class="col-xs-12" style=" margin-top:10px;">详细地址：<span id="receiveaddress"></span></div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
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
    <nav class="navbar  navbar-fixed-bottom" style=" background:#eee; min-height:46px;">
        <div class="container">
            <div class="row">
                <div class="col-xs-2 text-center"   ></div>
                <div class="col-xs-6 text-center" style=" height:46px; line-height:46px;" ><span >总金额：</span><span style="color:#f00">&#65509;</span> <span id="totalprice" style="color:#f00; font-size:16px;"></span></div>
                <div class="col-xs-4 text-right"><span id="btnPay" class="btn btn-lg btn-danger">确认付款</span></div>
            </div>
        </div>
    </nav>
    <div id="cover"><div style=" position:absolute; top:60%; left:0; text-align:center; width:100%;"><span class=" alert" style=" color:#f00">正在处理中，请耐心等待。。。</span></div></div>
    <asp:HiddenField ID="hfArea" runat="server" />
    <asp:HiddenField ID="hfAddress" runat="server" />
    <asp:HiddenField ID="hfTradeno" runat="server" />
    <asp:HiddenField ID="hfOpenId" runat="server" />
    <asp:HiddenField ID="hfAddressParameters" runat="server" />
    <asp:HiddenField ID="hfProvince" runat="server" />
    <asp:HiddenField ID="hfCity" runat="server" />
    <asp:HiddenField ID="hfDistrict" runat="server" />
    <asp:HiddenField ID="hfPostCode" runat="server" />
    <asp:HiddenField ID="hfWxBaseConfig" runat="server" />
    <asp:HiddenField ID="hfWxPayConfig" runat="server" />
    <asp:HiddenField ID="hfWxAddressConfig" runat="server" />

    <asp:ScriptManager EnablePageMethods="true" runat="server"></asp:ScriptManager>
    </form>
    <script src='http://res.wx.qq.com/open/js/jweixin-1.0.0.js'></script>
    <script>
        function config() {
            var wxConfig = {},
                addressConfig = {};
            var getWxConfig = function () {
                var url=window.location.href;
                PageMethods.InitJs(url, wxConfigCallBack);
            } ();
            var getAddressConfig = function () {

            } ();
            function wxConfigCallBack(data) {
                wxConfig = jQuery.parseJSON(data);
                console.log(wxConfig);
            };
            return {
                wxConfig: wxConfig,
                addressConfig: addressConfig
                
            }
        };
        
    </script>
</body>
</html>
<!--
sb.Append("<script src='http://res.wx.qq.com/open/js/jweixin-1.0.0.js'></script>\r\n");
            sb.Append("<script>\r\n");
            sb.Append("     wx.config({\r\n");
            sb.Append("         debug:"+debug+",\r\n");
            sb.Append("         appId:'" + appId + "',\r\n");
            sb.Append("         timestamp:'" + timesTamp + "',\r\n");
            sb.Append("         nonceStr:'" + nonceStr + "',\r\n");
            sb.Append("         signature:'" + signature + "',\r\n");
            sb.Append("         jsApiList:[" + RightList + "]\r\n");
            sb.Append("     });\r\n");
            sb.Append("</script>\r\n");

-->