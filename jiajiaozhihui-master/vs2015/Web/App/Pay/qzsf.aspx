<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="qzsf.aspx.cs" Inherits="SfSoft.web.wxpay.order1.qzsf" %>

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
        <div class="row" >
            <div class="col-xs-12">
                <%=GoodsInfo.Desc %>
            </div>
            <div class="col-xs-12">
                <img style=" width:100%;" src="<%= GoodsInfo.ImgURL %>" alt="" />
            </div>
            
            <div class="col-xs-12">
                <h4><%=GoodsInfo.GoodName %></h4>
            </div>
            <div class="col-xs-12" style=" font-size:14px;">
                <ul class="list-group">
                   <li class="list-group-item">
                        <div class="row">
                            <div class="col-xs-8">单价</div>
                            <div class="col-xs-4">
                                <span style="color:#f00">&#65509;</span><span id="price" style=" color:#f00"><%=GoodsInfo.PublicPrice%></span> 
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
                                <a href="javascript:void(0)" class=" btn btn-xs btn-default" id="btnEditAddress">选择与编辑收货信息</a>
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
        <div class="row">
            <div class="col-xs-12" id="Div1">
                <div class=" page-header"><h3>产品介绍</h3></div>
            </div>
        </div>
    </div>
    <div id="loadingToast" class="weui_loading_toast" name="cccc" runat="server" style="display:none;">
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
    </form>
    <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="../js/qzsf.js" type="text/javascript"></script>
    <script src="../js/address.js" type="text/javascript"></script>
    <script>
        var wxJsPayApiParam = jQuery.parseJSON('<%=wxJsPayApiParam %>');
        $("#btnEditAddress").shenerAddress({
            bodyId: "#form1",
            latestAddress: {
                "serverpath": "../server/address.ashx?type=latest",
                "openid": $("#hfOpenId").val(),
                "backfn": function (address) {
                    if (!$.isEmptyObject(address.ds)) {
                        $("#receivename").text(address.ds[0].Name);
                        $("#telephone").html(address.ds[0].Mobile);
                        $("#receiveaddress").text(address.ds[0].Province + " " + address.ds[0].City + " " + address.ds[0].District + " " + address.ds[0].Address);
                        $("#hfProvince").val(address.ds[0].Province);
                        $("#hfCity").val(address.ds[0].City);
                        $("#hfDistrict").val(address.ds[0].District);
                        $("#hfAddress").val(address.ds[0].Address);
                    }
                }
            },
            backSelectAddress: function (address) {
                var name = address.name;
                var mobile = address.mobile;
                var prvince = address.province;
                var city = address.city;
                var district = address.district;
                var detail = address.detail;
                $("#receivename").text(name);
                $("#telephone").html(mobile);
                $("#receiveaddress").text(prvince + " " + city + " " + district + " " + detail);
                $("#hfProvince").val(prvince);
                $("#hfCity").val(city);
                $("#hfDistrict").val(district)
                $("#hfAddress").val(detail)
            },
            saveAddress: {
                "serverpath": "../server/address.ashx?type=add",
                "openid": $("#hfOpenId").val()
            },
            getAllAddress: {
                "serverpath": "../server/address.ashx?type=list",
                "openid": $("#hfOpenId").val()
            },
            setLatestAddress: {
                "serverpath": "../server/address.ashx?type=set",
                "openid": $("#hfOpenId").val()
            }
        });
    </script>
</body>
</html>
