var React = require("react");
var ReactDOM = require("react-dom");
var Public_Error = require('./Public_error.jsx');

var roleId = getParamByUrl('roleId');
var userId = getParamByUrl('userId');
var resp, couponId, couponPrice, currentPrice, goodsId, isCoupon, origPrice, phoneNo, sourceType, weChat;
// var baseUrl = 'https://a.picooc.com:10000/';
// var baseUrl = 'https://a.picooc.com/';

var userAgentInfo = navigator.userAgent;
//部分页面公用参数
var publicData = {
    outAppLogin: (getCookie('appOutPhone') == false) ? false : true
};
// alert(window.location.href);
window.publicData = publicData;
// const Public_error = require('./Public_error.jsx');
var PaymentCont = React.createClass({
    getInitialState: function () {
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
        }
    },
    componentWillMount: function () {
        if (publicData.outAppLogin == false) {
            window.location.href = 'productDetails.html?linkId=' + getParamByUrl('linkId');
        }
    },
    componentDidMount: function () {
        var that = this;
        var code = getParamByUrl('code');
        var fromGo = getParamByUrl('fromGo');
        $.ajax({
            url: ajaxLink + "/v1/api/campOrder/orderInfo" + window.location.search,
            type: 'get',
            success: function (data) {
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
                    if ((getParamByUrl("os") == "iOS") || (!!userAgentInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/))) {
                        // alert('这是iOS')
                        endTime = new Date(resp.endTime.replace(/-/g, "/")).getTime()
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
                        }
                        else if (startTime > endTime) {
                            that.setState({
                                btnColor: {
                                    'backgroundColor': "#999"
                                },
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
            error: function () {
                $(".error-main-t").html('网络错误');
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
            }
        });
    },
    goWechatPay: function (goodsInfos) { // 公众号（微信内）支付方式
        // 获取订单详情
        // var goodsInfos = goodsInfos;
        var orderId = getParamByUrl('orderId');
        // var search = location.search;
        $.ajax({
            url: ajaxLink + '/v1/api/picooc/getPublicPayOrder?payType=1' + '&orderId=' + orderId,
            type: 'get',
            dataType: "json",
            contentType: 'application/json',
            success: function (data) {
                if (data.code == 200) {
                    // 获取公众号支付的各个参数
                    var appId = data.resp.appId; //公众号名称，由商户传入   
                    var packages = data.resp.package;
                    var timeStamp = data.resp.timeStamp;//时间戳，自1970年以来的秒数  
                    var nonceStr = data.resp.nonceStr;//随机串   
                    var signType = data.resp.signType;//微信签名方式： 
                    var paySign = data.resp.paySign;//微信签名 diao
                    //公众号（微信内）支付
                    function onBridgeReady() {
                        WeixinJSBridge.invoke(
                            'getBrandWCPayRequest', {
                                "appId": appId,     //公众号名称，由商户传入     
                                "timeStamp": timeStamp,         //时间戳，自1970年以来的秒数     
                                "nonceStr": nonceStr, //随机串     
                                "package": packages,
                                "signType": signType,         //微信签名方式：     
                                "paySign": paySign //微信签名 
                            },
                            function (res) {
                                if (res.err_msg == "get_brand_wcpay_request:ok") { // 判断前端返回,res.err_msg =ok将在用户支付成功后返回 
                                    location.href = 'https://a.picooc.com/web/fatburn/ordered.html' + location.search;

                                }
                                if (res.err_msg == "get_brand_wcpay_request:fail" || res.err_msg == "get_brand_wcpay_request:cancel") { //判断前端返回,res.err_msg ==fail || cancel将在用户支付失败或者取消后 
                                    //alert('支付异常');
                                }
                            }
                        );
                    }
                    //调起微信支付
                    if (typeof WeixinJSBridge == "undefined") {
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
            error: function () {
                $(".error-main-t").html('网络错误');
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
            }
        })
    },
    ClickHandle: function () { //点击支付
        var goodsInfos = this.state.goodsInfos;
        var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
        // 判断当前页面是否在微信内，若在使用公众号（微信内）支付方式，若不在使用微信的h5支付方式
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            // var code = getParamByUrl('code');
            // 判断是否存在微信code，若没有使用微信api回调当前页面，返回code
            this.goWechatPay();
        }
        else {
            var url = decodeURIComponent(getParamByUrl('orderUrl'));
            // alert('url:'+url);
            var gotoUlr = location.origin + location.pathname + removeParamByUrl('fromGo');
            var redirect_url = encodeURIComponent(gotoUlr);
            // alert('redirect_url:'+redirect_url);
            location.href = url + '&redirect_url=' + redirect_url;
        }
    },
    CompletePay: function (event) {
        event.stopPropagation();
        var goodsInfos = this.state.goodsInfos;

        var orderType = goodsInfos.orderType;
        $('.fixbg').hide();
        // alert('orderType:' + orderType)
        $.ajax({
            url: ajaxLink + "/v1/api/campOrder/orderInfo" + window.location.search,
            type: 'get',
            success: function (data) {
                if (data.code == 200) {
                    if (data.resp.orderType == 0) {
                        $('.alerts').stop(true).fadeIn(200).delay(2000).fadeOut(200);//订单还未完成支付，请重新支付～
                    }
                    else if (data.resp.orderType == 1) {
                        location.href = 'ordered.html' + removeParamByUrl('orderUrl');


                        // location.href = 'ordered.html' + removeParamByUrl('orderUrl');
                    }
                }
            }
        })

    },
    ErrorPay: function (event) {
        event.stopPropagation();
        $('.fixbg').hide();
    },
    //leftFunction
    leftFunction:function(){
        window.location.href = 'productDetails.html?eventName=fatBurn&typeSize=1&refer=1&linkId='+getParamByUrl('linkId');
    },
    render: function () {
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
        var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            time = '10';
        } else {
            time = '5';
        }
        return (
            <div className="PaymentCont">
                <div className="row noAppTitle">
                    <div className="col-xs-4 col-sm-4 left" onClick={me.leftFunction}>关闭</div>
                    <div className="col-xs-4 col-sm-4 middle"><img src="https://cdn2.picooc.com/web/res/fatburn/image/sell/productDetails/logoLeft.png" /></div>
                    <div className="col-xs-4 col-sm-4"></div>
                </div>
                <div className="timetips">{'请' + time + '分钟内付款，超时未付款订单将被取消'}</div>
                <div className="payway">
                    微信支付
                    <div className="wechatOption"></div>
                </div>
                <div className="payfooter">
                    <div className="nowPay"><span>实付款：</span><span>{'￥' + price}</span></div>
                    <div className="paybtn" onClick={this.ClickHandle} style={btnColor}>
                        <p className="ljpay">立即支付</p>
                        <p className="payTime">
                            {/* {hour + ':' + minute + ':' + second} */}
                            <span id="hour"></span>
                            <span id="minute"></span>
                            <span id="second"></span>
                        </p>
                    </div>
                </div>
                <Public_Error />
                <aside className="row fixbg" style={bgStyle}>
                    <div className="col-xs-12 col-sm-12 fixbg-main" style={{ 'top': '35%' }}>
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 fixbg-main-t">请确认微信支付是否已完成</div>
                            <div className="col-xs-12 col-sm-12 fixbg-main-btn">
                                <div className="row">
                                    <div className="col-xs-12 col-sm-12 fixbg-main-btn1" onClick={this.CompletePay}>已支付完成</div>
                                    <div className="col-xs-12 col-sm-12 fixbg-main-btn2" onClick={this.ErrorPay}>取消</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
                <aside className="alertBox">
                    <div className="alerts" style={{ "display": "none" }}>
                        您的订单还未完成支付，请重新支付～
                    </div>
                </aside>
            </div>
        )
    }
});

ReactDOM.render(<PaymentCont />, document.getElementById('paymentCont'));