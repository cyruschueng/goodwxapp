<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="JsApiPayPage.aspx.cs" Inherits="WxPayAPI.JsApiPayPage" %>

<!DOCTYPE html >

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <meta http-equiv="content-type" content="text/html;charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/> 
    <title>确认订单</title>
    <link rel="stylesheet" href="//cdn.bootcss.com/weui/1.1.1/style/weui.min.css">
    <link rel="stylesheet" href="//cdn.bootcss.com/jquery-weui/1.0.1/css/jquery-weui.min.css">
    <link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
</head>
<body>
    <form id="formPayOrder" runat="server">
        <div class=" weui-cells ">
            <div class="weui-cell weui-cell_access" id="address-area" style=" display:none">
                <div class=" weui-cell__hd"><span class="fa fa-map-marker "></span></div>
                <div class=" weui-cell__bd">
                    <h4 style="padding-left:15px;" id="consignee">收货人：</h4>
                    <p class=" weui-cells__title" id="address">收货地址：</p>
                </div>
                <div class=" weui-cell__ft"></div>
            </div>

            <div class="weui-cell" id="product-area">
                <div class=" weui-cell__hd">
                    <img style="width:80px;" src="http://weixin.jiajiaozhihui.cn/images/v3.jpg" />
                </div>
                <div class=" weui-cell__bd">
                    <div><%=productInfo.ProductIntro %></div>
                </div>
                <div class=" weui-cell__ft">
                    <div><span>¥</span> <%=productInfo.Price %></div>
                    <div>x <span class="paynumber">1</span></div>
                </div>
            </div>

            <div class="weui-cell" id="buynumber-area" style=" display:none">
                <div class=" weui-cell__hd">
                    <label class=" weui-label">购买数量</label>
                </div>
                <div class=" weui-cell__bd">
                    
                </div>
                <div class=" weui-cell__ft">
                    <div class=" weui-flex">
                        <div class=" weui-flex__item"><a class=" weui-btn weui-btn_mini weui-btn_default" id="sub" >-</a></div>
                        <div class=" weui-flex__item"><span style="padding:0 8px;" class="paynumber">1</span></div>
                        <div class=" weui-flex__item"><a class=" weui-btn weui-btn_mini weui-btn_default" id="add">+</a></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="weui-tabbar" id="pay-area">
            <a href="javascript:;" class="weui-tabbar__item weui-bar__item">
                <div class="weui-tabbar__label" style=" height:46px; line-height:46px; font-size:14px;">
                        共<span style=" color:#f00;" class="paynumber">1</span>件, 总金额  <span style=" color:#f00;">¥</span><span style=" color:#f00;" id="price" data-value='<%=productInfo.Price  %>' ><%= productInfo.Price %></span>
                </div>
            </a>
            <a href="javascript:;" id="btnPay" class="weui-tabbar__item--on weui-btn weui-btn_warn" style=" border-radius: 0">
               <span>提交订单</span>
            </a>
        </div>
        <asp:HiddenField runat="server" ID="hfProductId" />
        <asp:HiddenField runat="server" ID="hfOpenId" />
    </form>
    <script src="//cdn.bootcss.com/jquery/1.11.0/jquery.min.js"></script>
    <script src="http://res.wx.qq.com/open/js/jweixin-1.1.0.js"></script>
    <script>
        (function () {
            var configData = '<%=wxConfig %>';
            configData = JSON.parse(configData);
            wx.config({
                debug: true,
                appId: configData["appId"],
                timestamp: configData["timestamp"],
                nonceStr: configData["nonceStr"],
                signature: configData["signature"],
                jsApiList: [
                    'openAddress',
                    'chooseWXPay',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage'
                ]
            });
            var openId = $("#<%=hfOpenId.ClientID %>").val();
            var productid = $("#<%=hfProductId.ClientID %>").val();
            //下单
            var unifiedOrder = new UnifiedOrder(productid, openId);
            unifiedOrder.createUnifiedOrder(1);

            //最近使用的地址
            unifiedOrder.latestAddress(function (userAddress) {
                $("#consignee").append(userAddress.name + "      " + userAddress.mobile);
                $("#address").append(userAddress.province + " " + userAddress.city + " " + userAddress.district + " " + userAddress.address);
            });

            unifiedOrder.showArea(function () {
                var data = '<%=SetArea %>';
                data = JSON.parse(data);
                if (data != null && data != undefined) {
                    if (data.showAddress == 1) { $("#address-area").show(); } else { $("#address-area").hide(); };
                    if (data.showPayNumber == 1) { $("#buynumber-area").show(); } else { $("#buynumber-area").hide(); };
                }
            });
            $("#add").on('click', function () {
                var paynumber = $(".paynumber:first").text();
                if (typeof paynumber != undefined && typeof paynumber != null && !isNaN(paynumber)) {
                    paynumber = parseInt(paynumber) + 1;
                    $(".paynumber").each(function () {
                        $(this).text(paynumber);
                    })
                    var price = $("#price").data("value");
                    $("#price").text((paynumber * parseFloat(price, 2)).toFixed(2));
                    unifiedOrder.add(paynumber);
                }
            });
            $("#sub").on('click', function () {
                var paynumber = $(".paynumber:first").text();
                if (typeof paynumber != undefined && typeof paynumber != null && !isNaN(paynumber)) {
                    if (paynumber > 1) {
                        paynumber = parseInt(paynumber) - 1;
                        $(".paynumber").each(function () {
                            $(this).text(paynumber);
                        })
                        var price = $("#price").data("value");
                        $("#price").text((paynumber * parseFloat(price, 2)).toFixed(2));
                        unifiedOrder.add(paynumber);
                    }
                }
            });
            $("#btnPay").on('click', function () {
                unifiedOrder.createOrder(function () {
                    unifiedOrder.submit();
                })
            });
        })()
        function UnifiedOrder(productId,openId) {
            var _data = {
                outTradeNo: "",
                pay: {}
            };
            var _params={
                number:1,
                productId:productId,
                openId:openId
            };
            var _address={};


            console.log("......_data......");
            console.log(_data);
            console.log("......_address......");
            console.log(_address);
            console.log("......_params ......");
            console.log(_params);

            this.createUnifiedOrder = function (number) {
                $.ajax({
                    url: './service/UnifiedOrderController.ashx',
                    type: 'POST',
                    dataType: "JSON",
                    data: { product_id: _params.productId, number: number, openId: _params.openId },
                    success: function (res) {
                        _params.number = number;
                        _data.outTradeNo = res.outTradeNo;
                        _data.pay = res.payParameters;
                        console.log(res);
                    }
                })
            };

            this.add = function (number) {
                this.createUnifiedOrder(number);
            };
            this.sub = function (number) {
                this.createUnifiedOrder(number);
            };
            this.openAddress = function (fun) {
                wx.openAddress({
                    trigger: function (res) {
                        alert('用户开始拉出地址');
                    }, success: function (res) {
                        var address = JSON.stringify(res);
                        $.ajax({
                            url: './Service/AddressController.ashx?method=update',
                            type: 'POST',
                            data: { address: address, openId: _params.openId },
                            dataType: 'JSON',
                            success: function (res) {
                                if (res.name!=null) {
                                    _address = JSON.parse(res);
                                    fun(res);
                                }
                            }
                        })
                    }, cancel: function (res) {
                        alert('用户取消拉出地址');
                    }, fail: function (res) {
                        alert(JSON.stringify(res));
                    }
                });
            };
            this.latestAddress = function (fun) {
                $.ajax({
                    url: './Service/AddressController.ashx?method=get',
                    type: 'POST',
                    data: { openId: _params.openId },
                    dataType: 'JSON',
                    success: function (res) {
                        console.log(res);
                        if (res.name != null) {
                            _address = res;
                            fun(res);
                        }
                    }
                })
            };
            this.submit = function () {
                wx.chooseWXPay({
                    timestamp: _data.pay.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: _data.pay.nonceStr, // 支付签名随机串，不长于 32 位
                    package: _data.pay.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                    signType: _data.pay.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: _data.pay.paySign, // 支付签名
                    success: function (res) {
                        // 支付成功后的回调函数
                    }, error: function (res) {
                        alert(JSON.stringify(res));
                    }, fail: function (res) {
                        alert(JSON.stringify(res));
                    }
                });
            };
            this.showArea = function (fun) {
                if (typeof fun == "function") {
                    fun();
                }
            };
            this.createOrder = function (fun) {
                $.ajax({
                    url: './Service/OrderController.ashx',
                    type: 'POST',
                    data: { openId: _params.openId, number: _params.number, tradeno: _data.outTradeNo, product_id: _params.productId },
                    dataType: 'text',
                    success: function (res) {
                        if (res != "") {
                            console.log(res);
                            if (typeof fun == "function") {
                                fun();
                            }
                        }
                    }
                })
            }
        };
    </script>
</body>
</html>
