webpackJsonp([22],{

/***/ 227:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
var Public_Error = __webpack_require__(3);

var roleId = getParamByUrl('roleId');
var userId = getParamByUrl('userId');
var resp, couponId, couponPrice, currentPrice, goodsId, isCoupon, origPrice, phoneNo, sourceType, weChat;
// var baseUrl = 'https://a.picooc.com:10000/';
// var baseUrl = 'https://a.picooc.com/';

var userAgentInfo = navigator.userAgent;
//部分页面公用参数
var publicData = {
    outAppLogin: getCookie('appOutPhone') == false ? false : true
};
// alert(window.location.href);
window.publicData = publicData;
// const Public_error = require('./Public_error.jsx');
var PaymentCont = React.createClass({
    displayName: "PaymentCont",

    getInitialState: function getInitialState() {
        var titleData = {
            title: "支付",
            color: "",
            opacity: "",
            backgroundColor: "",
            backgroundOpacity: ""
        };
        // alert("1+1");
        titleData = JSON.stringify(titleData);
        if (!isOutAppAndLowVersion()) {
            appFc.controlTitle(titleData);
        }

        // alert('2+2');
        return {
            goodsInfos: {},
            // minute: '',
            // second: '',
            // hour: '',
            endTime: '',
            startTime: '',
            btnColor: {
                "backgroundColor": '#35D0C5'
            },
            bgStyle: {
                'display': 'none'
            }
        };
    },
    componentWillMount: function componentWillMount() {
        if (publicData.outAppLogin == false) {
            window.location.href = 'productDetails.html?linkId=' + getParamByUrl('linkId');
        }
    },
    componentDidMount: function componentDidMount() {
        var that = this;
        var code = getParamByUrl('code');
        var fromGo = getParamByUrl('fromGo');
        $.ajax({
            url: ajaxLink + "/v1/api/campOrder/orderInfo" + window.location.search,
            type: 'get',
            success: function success(data) {
                if (data.code == 200) {
                    var resp = data.resp;
                    // var endTime = new Date(resp.endTime).getTime();
                    // 获取订单详情
                    var goodsInfo = {
                        couponId: resp.couponId,
                        couponPrice: resp.couponPrice,
                        currentPrice: resp.currentPrice,
                        goodsId: resp.goodsId,
                        isCoupon: resp.isCoupon,
                        origPrice: resp.origPrice,
                        phoneNo: resp.phoneNo,
                        sourceType: resp.sourceType,
                        weChat: resp.weChat,
                        orderType: resp.orderType
                    };
                    that.setState({
                        goodsInfos: goodsInfo
                    });
                    // 倒计时十分钟，十分钟后取消订单
                    var endTime = new Date(resp.endTime).getTime();
                    if (getParamByUrl("os") == "iOS" || !!userAgentInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
                        // alert('这是iOS')
                        endTime = new Date(resp.endTime.replace(/-/g, "/")).getTime();
                    }
                    // alert(endTime);
                    // alert(new Date().getTime());

                    var timer = null;
                    timer = setInterval(function () {
                        var startTime = new Date().getTime();

                        if (startTime <= endTime) {
                            var leftTime = endTime - startTime;
                            var leftsecond = parseInt(leftTime / 1000);
                            var day1 = Math.floor(leftsecond / (60 * 60 * 24));
                            // alert('day1:'+typeof(day1));
                            var hour = Math.floor((leftsecond - day1 * 24 * 60 * 60) / 3600);
                            // alert('hour:'+typeof(hour));
                            var minute = Math.floor((leftsecond - day1 * 24 * 60 * 60 - hour * 3600) / 60);
                            //  alert('minute:'+typeof(minute));
                            var second = Math.floor(leftsecond - day1 * 24 * 60 * 60 - hour * 3600 - minute * 60);
                            // alert('second:'+typeof(second));
                            hour = (hour < 10 ? '0' : '') + hour;
                            minute = (minute < 10 ? '0' : '') + minute;
                            second = (second < 10 ? '0' : '') + second;
                            $("#hour").html(hour + ':');
                            $('#minute').html(minute + ':');
                            $('#second').html(second);
                        } else if (startTime > endTime) {
                            that.setState({
                                btnColor: {
                                    'backgroundColor': "#999"
                                }
                            });
                            $("#hour").html('00:');
                            $('#minute').html('00:');
                            $('#second').html('00');
                            clearInterval(timer);
                        }
                    }, 1000);

                    // localStorage.getItem('goodsInfos',JSON.stringify(goodsInfo));
                    if (fromGo == 'false') {
                        that.setState({
                            bgStyle: {
                                'display': 'block'
                            }
                        });
                    }
                } else {
                    $(".error-main-t").html(datamessage);
                    $(".errorAlert").css("display", "block");
                    $(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
                }
            },
            error: function error() {
                $(".error-main-t").html('网络错误');
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
            }
        });
    },
    goWechatPay: function goWechatPay(goodsInfos) {
        // 公众号（微信内）支付方式
        // 获取订单详情
        // var goodsInfos = goodsInfos;
        var orderId = getParamByUrl('orderId');
        // var search = location.search;
        $.ajax({
            url: ajaxLink + '/v1/api/picooc/getPublicPayOrder?payType=1' + '&orderId=' + orderId,
            type: 'get',
            dataType: "json",
            contentType: 'application/json',
            success: function success(data) {
                if (data.code == 200) {
                    //微信签名 diao
                    //公众号（微信内）支付
                    var onBridgeReady = function onBridgeReady() {
                        WeixinJSBridge.invoke('getBrandWCPayRequest', {
                            "appId": appId, //公众号名称，由商户传入     
                            "timeStamp": timeStamp, //时间戳，自1970年以来的秒数     
                            "nonceStr": nonceStr, //随机串     
                            "package": packages,
                            "signType": signType, //微信签名方式：     
                            "paySign": paySign //微信签名 
                        }, function (res) {
                            if (res.err_msg == "get_brand_wcpay_request:ok") {
                                // 判断前端返回,res.err_msg =ok将在用户支付成功后返回 
                                location.href = 'https://a.picooc.com/web/fatburn/ordered.html' + location.search;
                            }
                            if (res.err_msg == "get_brand_wcpay_request:fail" || res.err_msg == "get_brand_wcpay_request:cancel") {//判断前端返回,res.err_msg ==fail || cancel将在用户支付失败或者取消后 
                                //alert('支付异常');
                            }
                        });
                    };
                    //调起微信支付


                    // 获取公众号支付的各个参数
                    var appId = data.resp.appId; //公众号名称，由商户传入   
                    var packages = data.resp.package;
                    var timeStamp = data.resp.timeStamp; //时间戳，自1970年以来的秒数  
                    var nonceStr = data.resp.nonceStr; //随机串   
                    var signType = data.resp.signType; //微信签名方式： 
                    var paySign = data.resp.paySign;if (typeof WeixinJSBridge == "undefined") {
                        if (document.addEventListener) {
                            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                        } else if (document.attachEvent) {
                            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                        }
                    } else {
                        onBridgeReady();
                    }
                } else {
                    $(".error-main-t").html(data.message);
                    $(".errorAlert").css("display", "block");
                    $(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
                }
            },
            error: function error() {
                $(".error-main-t").html('网络错误');
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
            }
        });
    },
    ClickHandle: function ClickHandle() {
        //点击支付
        var goodsInfos = this.state.goodsInfos;
        var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
        // 判断当前页面是否在微信内，若在使用公众号（微信内）支付方式，若不在使用微信的h5支付方式
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            // var code = getParamByUrl('code');
            // 判断是否存在微信code，若没有使用微信api回调当前页面，返回code
            this.goWechatPay();
        } else {
            var url = decodeURIComponent(getParamByUrl('orderUrl'));
            // alert('url:'+url);
            var gotoUlr = location.origin + location.pathname + removeParamByUrl('fromGo');
            var redirect_url = encodeURIComponent(gotoUlr);
            // alert('redirect_url:'+redirect_url);
            location.href = url + '&redirect_url=' + redirect_url;
        }
    },
    CompletePay: function CompletePay(event) {
        event.stopPropagation();
        var goodsInfos = this.state.goodsInfos;

        var orderType = goodsInfos.orderType;
        $('.fixbg').hide();
        // alert('orderType:' + orderType)
        $.ajax({
            url: ajaxLink + "/v1/api/campOrder/orderInfo" + window.location.search,
            type: 'get',
            success: function success(data) {
                if (data.code == 200) {
                    if (data.resp.orderType == 0) {
                        $('.alerts').stop(true).fadeIn(200).delay(2000).fadeOut(200); //订单还未完成支付，请重新支付～
                    } else if (data.resp.orderType == 1) {
                        location.href = 'ordered.html' + removeParamByUrl('orderUrl');

                        // location.href = 'ordered.html' + removeParamByUrl('orderUrl');
                    }
                }
            }
        });
    },
    ErrorPay: function ErrorPay(event) {
        event.stopPropagation();
        $('.fixbg').hide();
    },
    //leftFunction
    leftFunction: function leftFunction() {
        window.location.href = 'productDetails.html?eventName=fatBurn&typeSize=1&refer=1&linkId=' + getParamByUrl('linkId');
    },
    render: function render() {
        var me = this;
        // var minute = parseInt(this.state.minute);
        // var second = parseInt(this.state.second);
        // var hour = this.state.hour;
        // hour = (hour < 10 ? '0' : '') + hour;
        // minute = (minute < 10 ? '0' : '') + minute;
        // second = (second < 10 ? '0' : '') + second;
        // console.log(minute); console.log(second);
        var goodsInfos = this.state.goodsInfos;
        var price = goodsInfos.currentPrice;
        var btnColor = this.state.btnColor;
        var bgStyle = this.state.bgStyle;
        var time = '';
        var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            time = '10';
        } else {
            time = '5';
        }
        return React.createElement(
            "div",
            { className: "PaymentCont" },
            React.createElement(
                "div",
                { className: "row noAppTitle" },
                React.createElement(
                    "div",
                    { className: "col-xs-4 col-sm-4 left", onClick: me.leftFunction },
                    "\u5173\u95ED"
                ),
                React.createElement(
                    "div",
                    { className: "col-xs-4 col-sm-4 middle" },
                    React.createElement("img", { src: "https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/logoLeft.png" })
                ),
                React.createElement("div", { className: "col-xs-4 col-sm-4" })
            ),
            React.createElement(
                "div",
                { className: "timetips" },
                '请' + time + '分钟内付款，超时未付款订单将被取消'
            ),
            React.createElement(
                "div",
                { className: "payway" },
                "\u5FAE\u4FE1\u652F\u4ED8",
                React.createElement("div", { className: "wechatOption" })
            ),
            React.createElement(
                "div",
                { className: "payfooter" },
                React.createElement(
                    "div",
                    { className: "nowPay" },
                    React.createElement(
                        "span",
                        null,
                        "\u5B9E\u4ED8\u6B3E\uFF1A"
                    ),
                    React.createElement(
                        "span",
                        null,
                        '￥' + price
                    )
                ),
                React.createElement(
                    "div",
                    { className: "paybtn", onClick: this.ClickHandle, style: btnColor },
                    React.createElement(
                        "p",
                        { className: "ljpay" },
                        "\u7ACB\u5373\u652F\u4ED8"
                    ),
                    React.createElement(
                        "p",
                        { className: "payTime" },
                        React.createElement("span", { id: "hour" }),
                        React.createElement("span", { id: "minute" }),
                        React.createElement("span", { id: "second" })
                    )
                )
            ),
            React.createElement(Public_Error, null),
            React.createElement(
                "aside",
                { className: "row fixbg", style: bgStyle },
                React.createElement(
                    "div",
                    { className: "col-xs-12 col-sm-12 fixbg-main", style: { 'top': '35%' } },
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(
                            "div",
                            { className: "col-xs-12 col-sm-12 fixbg-main-t" },
                            "\u8BF7\u786E\u8BA4\u5FAE\u4FE1\u652F\u4ED8\u662F\u5426\u5DF2\u5B8C\u6210"
                        ),
                        React.createElement(
                            "div",
                            { className: "col-xs-12 col-sm-12 fixbg-main-btn" },
                            React.createElement(
                                "div",
                                { className: "row" },
                                React.createElement(
                                    "div",
                                    { className: "col-xs-12 col-sm-12 fixbg-main-btn1", onClick: this.CompletePay },
                                    "\u5DF2\u652F\u4ED8\u5B8C\u6210"
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-xs-12 col-sm-12 fixbg-main-btn2", onClick: this.ErrorPay },
                                    "\u53D6\u6D88"
                                )
                            )
                        )
                    )
                )
            ),
            React.createElement(
                "aside",
                { className: "alertBox" },
                React.createElement(
                    "div",
                    { className: "alerts", style: { "display": "none" } },
                    "\u60A8\u7684\u8BA2\u5355\u8FD8\u672A\u5B8C\u6210\u652F\u4ED8\uFF0C\u8BF7\u91CD\u65B0\u652F\u4ED8\uFF5E"
                )
            )
        );
    }
});

ReactDOM.render(React.createElement(PaymentCont, null), document.getElementById('paymentCont'));

/***/ })

},[227]);