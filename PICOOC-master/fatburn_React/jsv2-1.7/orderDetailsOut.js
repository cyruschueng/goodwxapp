webpackJsonp([25],{

/***/ 224:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
var Public_error = __webpack_require__(3);
var SDingDanXiangQing = {
    SCategory_SDingDanXiangQing: 5080500,
    SDingDanXiangQing_ShiFouQuXiaoDingDan: 5080501, //是否取消订单
    SDingDanXiangQing_QuXiaoDingDan: 5080502, //取消订单
    SDingDanXiangQing_ZanBuQuXiao: 5080503, //暂不取消
    SDingDanXiangQing_LianXiKeFu: 5080504, //联系客服
    SDingDanXiangQing_QuXiaoLianXiKeFu: 5080505, //取消联系客服
    SDingDanXiangQing_QianWangWeiXin: 5080506, //前往微信
    SDingDanXiangQing_QianWangShangPinXiangQing: 5080507, //前往商品详情页
    SDingDanXiangQing_QuZhiFu: 5080508 //去支付
};
//部分页面公用参数
var publicData = {
    outAppLogin: getCookie('appOutPhone') == false ? false : true
};
window.publicData = publicData;

var userAgentInfo = navigator.userAgent;
var isIOS = !!userAgentInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
var goodsId = "";
var arr1 = [React.createElement(
    "span",
    { className: "wait" },
    "\u7B49\u5F85\u4ED8\u6B3E"
), React.createElement(
    "span",
    { className: "nowait" },
    "\u5DF2\u5B8C\u6210"
), React.createElement(
    "span",
    { className: "nowait" },
    "\u5DF2\u53D6\u6D88"
), React.createElement(
    "span",
    { className: "nowait" },
    "\u5DF2\u5173\u95ED"
), React.createElement(
    "span",
    { className: "nowait" },
    "\u9000\u6B3E\u4E2D"
), React.createElement(
    "span",
    { className: "nowait" },
    "\u9000\u6B3E\u5B8C\u6210"
)];

var OrderDetailsContainer = React.createClass({
    displayName: "OrderDetailsContainer",


    getInitialState: function getInitialState() {
        var me = this;
        window.getOrderInfo = me.getOrderInfo;
        me.getOrderInfo();

        return {
            orderDetailsData: {}
        };
    },
    componentWillMount: function componentWillMount() {
        if (publicData.outAppLogin == false) {
            window.location.href = 'productDetails.html?linkId=' + getParamByUrl('linkId');
        }
    },
    componentDidMount: function componentDidMount() {
        // var goodsInfos = JSON.parse(localStorage.getItem('goodsInfos'));
        // 若有微信支付返回的code 则直接调起公众号（微信内）支付
        // if (getParamByUrl('code') != 'false') {
        //     this.goWechatPay(goodsInfos);
        // }
    },
    render: function render() {
        var me = this;
        var data = me.state.orderDetailsData;
        var objOrder;
        var displayState = "none";
        var payState = "none";
        var wechatState = "none";
        console.log(data);
        if (typeof data.resp != "undefined") {
            displayState = 'block'; //显示container
            var beginTime = data.resp.beginTime;
            var arr = beginTime.split('-');
            var beginTime2 = arr[0] + '年' + arr[1] + '月' + arr[2] + '日';
            var aboutCurrentPrice = "¥" + data.resp.currentPrice;
            if (data.resp.orderType == 0) {
                //如果状态为：等待付款
                payState = "block";
                me.timeDiffer(data.resp.nowDate, data.resp.endTime);
            }
            //var goodsUrl = JSON.parse(data.resp.goodsUrl);
            var wechatNum = "";
            wechatState = "block";
            wechatNum = data.resp.weChat;
            if (data.resp.weChat && data.resp.weChat != null && data.resp.weChat != "") {
                wechatState = "block";
                wechatNum = data.resp.weChat;
                if (wechatNum.length > 20) {
                    wechatNum = wechatNum.substring(0, 12) + "...";
                }
            }
            objOrder = React.createElement(
                "div",
                null,
                React.createElement(
                    "section",
                    { className: "container", style: { display: displayState } },
                    React.createElement(
                        "div",
                        { className: "row noAppTitle", style: { display: 'none' } },
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
                        "aside",
                        { className: "row order common" },
                        React.createElement(
                            "div",
                            { className: "row col-xs-12 col-sm-12 orderDetail" },
                            React.createElement(
                                "div",
                                { className: "col-xs-8 col-sm-8 left" },
                                "\u8BA2\u5355\u7F16\u53F7\uFF1A",
                                React.createElement(
                                    "span",
                                    { id: "orderId" },
                                    data.resp.orderId
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-xs-4 col-sm-4 right", id: "orderStatus" },
                                arr1[data.resp.orderType]
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "row col-xs-12 col-sm-12 info", onClick: me.infoFunction },
                            React.createElement(
                                "div",
                                { className: "col-xs-3 col-sm-3 infoImg" },
                                React.createElement("img", { id: "orderImg", src: data.resp.goodsUrl })
                            ),
                            React.createElement(
                                "div",
                                { className: "col-xs-9 col-sm-9 infoDesc" },
                                React.createElement(
                                    "h3",
                                    { id: "orderName" },
                                    data.resp.goodsName
                                ),
                                React.createElement(
                                    "div",
                                    { className: "infoDesc_bottom" },
                                    React.createElement(
                                        "p",
                                        { className: "campBegin" },
                                        "\u5F00\u8425\u65F6\u95F4\uFF1A",
                                        React.createElement(
                                            "span",
                                            { id: "beginTime" },
                                            beginTime2
                                        )
                                    ),
                                    React.createElement(
                                        "p",
                                        { className: "price", id: "price" },
                                        "\xA5",
                                        React.createElement(
                                            "span",
                                            { id: "totalPrice" },
                                            data.resp.origPrice
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "aside",
                        { className: "row common content content1", style: { height: "auto" } },
                        React.createElement(
                            "div",
                            { className: "borderTop jiHuo content1-padding", style: { display: data.resp.orderType == 1 && data.resp.activationCode != null ? "block" : "none" } },
                            React.createElement(
                                "div",
                                { className: "col-xs-7 col-sm-7 left", style: { 'display': isIOS == true ? "none" : "block" } },
                                "\u6FC0\u6D3B\u7801\uFF1A",
                                React.createElement("input", { className: "activationCode readonly", ref: "activationCode", id: "needCode", value: data.resp.activationCode, type: "text", readOnly: true, unselectable: "on" })
                            ),
                            React.createElement(
                                "div",
                                { className: "col-xs-7 col-sm-7 left", style: { 'display': isIOS == true ? "block" : "none" } },
                                "\u6FC0\u6D3B\u7801\uFF1A",
                                React.createElement(
                                    "span",
                                    { className: "activationCode2" },
                                    data.resp.activationCode
                                )
                            ),
                            React.createElement(
                                "div",
                                { style: { 'display': isIOS == true ? "none" : "block" }, className: "col-xs-5 col-sm-5 right", id: "copy" },
                                React.createElement(
                                    "span",
                                    { className: "copyText", "data-clipboard-target": "#needCode", "data-clipboard-action": "copy" },
                                    "\u590D\u5236"
                                )
                            ),
                            React.createElement(
                                "div",
                                { style: { 'display': isIOS == true ? "block" : "none" }, className: "col-xs-5 col-sm-5 right", id: "copy" },
                                React.createElement(
                                    "span",
                                    { className: "copyText", style: { 'border': 'none' } },
                                    "\u53EF\u957F\u6309\u590D\u5236"
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "row col-xs-12 col-sm-12 content1-padding" },
                            React.createElement(
                                "div",
                                { className: "col-xs-5 col-sm-5 left" },
                                "\u624B\u673A\u53F7"
                            ),
                            React.createElement(
                                "div",
                                { className: "col-xs-7 col-sm-7 right", id: "phoneNum" },
                                data.resp.phoneNo
                            )
                        )
                    ),
                    React.createElement(
                        "aside",
                        { className: "row common content content2" },
                        React.createElement(
                            "div",
                            { className: "row col-xs-12 col-sm-12" },
                            React.createElement(
                                "div",
                                { className: "col-xs-5 col-sm-5 left" },
                                "\u652F\u4ED8\u65B9\u5F0F"
                            ),
                            React.createElement(
                                "div",
                                { className: "col-xs-7 col-sm-7 right" },
                                "\u5FAE\u4FE1\u652F\u4ED8"
                            )
                        )
                    ),
                    React.createElement(
                        "aside",
                        { className: "row common content content3" },
                        React.createElement(
                            "div",
                            { className: "row col-xs-12 col-sm-12" },
                            React.createElement(
                                "div",
                                { className: "col-xs-5 col-sm-5 left" },
                                "\u5546\u54C1\u603B\u989D"
                            ),
                            React.createElement(
                                "div",
                                { className: "col-xs-7 col-sm-7 right right2" },
                                "\xA5",
                                React.createElement(
                                    "span",
                                    {
                                        id: "origPrice" },
                                    data.resp.origPrice
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-xs-5 col-sm-5 left" },
                                "\u4F18\u60E0\u5238"
                            ),
                            React.createElement(
                                "div",
                                { className: "col-xs-7 col-sm-7 right right2" },
                                "-\xA5",
                                React.createElement(
                                    "span",
                                    {
                                        id: "couponPrice" },
                                    data.resp.couponPrice
                                )
                            ),
                            React.createElement("div", { className: "col-xs-6 col-sm-6 left" }),
                            React.createElement(
                                "div",
                                { className: "col-xs-6 col-sm-6 right right2 right3" },
                                React.createElement(
                                    "span",
                                    null,
                                    "\u5B9E\u4ED8\u6B3E"
                                ),
                                React.createElement(
                                    "span",
                                    {
                                        id: "currentPrice", style: { marginLeft: '1rem' } },
                                    aboutCurrentPrice
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "aside",
                        { style: { 'display': isIOS == false ? "block" : "none" }, className: "row common content content4 service", id: "copyService", "data-clipboard-action": "copy", "data-clipboard-target": "#picooc" /* onClick={me.serviceFunction}*/ },
                        React.createElement(
                            "div",
                            { className: "row col-xs-12 col-sm-12 contact" },
                            React.createElement("img", { src: "https://cdn2.picooc.com/web/res/fatburn/image/sell/orderDetailsOut/server.png" }),
                            " ",
                            React.createElement(
                                "span",
                                null,
                                "\u8054\u7CFB\u5BA2\u670D"
                            )
                        ),
                        React.createElement("input", { ref: "picooc", id: "picooc", value: "picooc2", type: "text", readOnly: true, style: { position: 'absolute', opacity: '0', left: '0', zIndex: '-9' } })
                    ),
                    React.createElement(
                        "aside",
                        { style: { 'display': isIOS == true ? "block" : "none" }, className: "row common content content4 service", onClick: me.iOsServiceFunction },
                        React.createElement(
                            "div",
                            { className: "row col-xs-12 col-sm-12 contact" },
                            React.createElement("img", { src: "https://cdn2.picooc.com/web/res/fatburn/image/sell/orderDetailsOut/server.png" }),
                            " ",
                            React.createElement(
                                "span",
                                null,
                                "\u8054\u7CFB\u5BA2\u670D"
                            )
                        )
                    ),
                    React.createElement(
                        "aside",
                        { className: "row common content status", style: { display: payState } },
                        React.createElement(
                            "div",
                            { className: "row col-xs-12 col-sm-12" },
                            React.createElement(
                                "div",
                                { className: "row col-xs-6 col-sm-6 left" },
                                React.createElement(
                                    "div",
                                    { className: "col-xs-12 col-sm-12 time" },
                                    "\u5F85\u4ED8\u6B3E\u5269\u4F59\u65F6\u95F4"
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-xs-12 col-sm-12 timeNum" },
                                    React.createElement("span", { id: "hour" }),
                                    React.createElement("span", { id: "minute" }),
                                    React.createElement("span", { id: "second" })
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-xs-6 col-sm-6 right" },
                                React.createElement(
                                    "span",
                                    { className: "cancel", onClick: me.cancelOrderFunction,
                                        "data-order_id": data.resp.orderId,
                                        "data-goods_id": data.resp.goodsId },
                                    "\u53D6\u6D88\u8BA2\u5355"
                                ),
                                React.createElement(
                                    "span",
                                    {
                                        onClick: me.goToPayFunction, className: "gotoPay", "data-order": JSON.stringify(data.resp), "data-order_id": data.resp.orderId,
                                        style: { marginLeft: '1rem' } },
                                    "\u53BB\u652F\u4ED8"
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "aside",
                        { className: "alertBox", style: { display: "none" } },
                        React.createElement(
                            "div",
                            { className: "alerts" },
                            "\u590D\u5236\u6210\u529F"
                        )
                    )
                ),
                React.createElement(
                    "aside",
                    { className: "row fixbg" },
                    React.createElement(
                        "div",
                        { className: "col-xs-12 col-sm-12 fixbg-main" },
                        React.createElement(
                            "div",
                            { className: "row" },
                            React.createElement("div", { className: "col-xs-12 col-sm-12 fixbg-main-t" }),
                            React.createElement(
                                "div",
                                { className: "col-xs-12 col-sm-12 fixbg-main-btn" },
                                React.createElement(
                                    "div",
                                    { className: "row row1" },
                                    React.createElement("div", { className: "col-xs-12 col-sm-12 fixbg-main-btn1" })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "row row2", style: { 'display': "none" } },
                                    React.createElement("div", { className: "col-xs-6 col-sm-6 fixbg-main-btn1" }),
                                    React.createElement("div", { className: "col-xs-6 col-sm-6 fixbg-main-btn2" })
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    "aside",
                    { className: "row fixBg" },
                    React.createElement(
                        "div",
                        { className: "col-xs-12 col-sm-12 fixBg-main" },
                        React.createElement(
                            "div",
                            { className: "row" },
                            React.createElement(
                                "div",
                                { className: "col-xs-12 col-sm-12 fixBg-top" },
                                React.createElement(
                                    "div",
                                    { className: "row" },
                                    React.createElement("div", { className: "col-xs-12 col-sm-12 fixBg-p" })
                                )
                            )
                        )
                    )
                )
            );
        } else {
            objOrder = React.createElement("i", null);
        }
        return objOrder;
    },
    getOrderInfo: function getOrderInfo() {
        var me = this;
        var finalUrl = ajaxLink + "/v1/api/campOrder/orderInfo" + window.location.search;
        //var finalUrl = "http://172.17.1.233:8080/v1/api/campOrder/orderInfo" + window.location.search;
        $.ajax({
            type: "get",
            url: finalUrl,
            dataType: "json",
            success: function success(data) {
                if (data.code == 200) {
                    console.log(data);
                    console.log(finalUrl);
                    if (typeof me.state.orderDetailsData.resp != "undefined") {
                        if (me.state.orderDetailsData.resp.records.length > 0) {
                            data.resp.records = me.state.orderDetailsData.resp.records.concat(data.resp.records);
                        }
                    }
                    me.setState({ orderDetailsData: data });

                    //复制激活码
                    var clipboard = new Clipboard('.copyText');
                    var clipboard2 = new Clipboard('#copyService');

                    clipboard.on('success', function (e) {
                        console.log(e);
                        $('.alertBox').stop(true).fadeIn(200).delay(2000).fadeOut(200);
                    });

                    clipboard.on('error', function (e) {
                        console.log(e);
                    });
                    clipboard2.on('success', function (e) {
                        console.log(e);

                        $(".fixbg-main-t").html('已复制燃脂营售后客服微信号<span style="color:#35d0c5;">picooc2</span>，请前往微信，在顶部搜索中粘贴');
                        $(".fixbg-main-t").css("text-align", "left");
                        $(".fixbg-main-btn1").html("我知道了");
                        $(".fixbg-main-btn2").html("前往微信");
                        $(".fixbg").css("display", "block");
                        $(".fixbg-main").css("margin-top", -$(".fixbg-main").height() / 2);
                        $(".fixbg-main").css("width", "90%");
                        $(".fixbg-main").css("left", "5%");
                        /*$(".fixbg-main-btn2").unbind("click").click(function(){
                         setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing,SDingDanXiangQing.SDingDanXiangQing_QianWangWeiXin);
                         $(".fixbg").css("display","none");
                         var deviceType=isMobile();
                         if(deviceType == "isApp"){
                         if(getParamByUrl('webver')>2){
                         appFc.gotoWechat();
                         }else{
                         mobileApp.gotoWechat();
                         }
                         }
                         });*/
                        $(".fixbg-main-btn1").unbind("click").click(function () {
                            setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing, SDingDanXiangQing.SDingDanXiangQing_QuXiaoLianXiKeFu);
                            $(".fixbg").css("display", "none");
                        });
                    });

                    clipboard2.on('error', function (e) {
                        console.log(e);
                    });
                } else {
                    $(".error-main-t").html(data.result.message);
                    $(".errorAlert").css("display", "block");
                    $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                }
            },
            error: function error() {
                $(".error-main-t").html(data.message);
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".error-main").height() / 2);
            }
        });
    },

    iOsServiceFunction: function iOsServiceFunction() {
        $(".fixbg-main-t").html('如有疑问，请添加燃脂营售后客服微信哦~（微信号：<span style="color:#35d0c5;">picooc2</span>）');
        $(".fixbg-main-t").css("text-align", "left");
        $(".fixbg-main-btn1").html("我知道了");
        $(".fixbg-main-btn2").html("前往微信");
        $(".fixbg").css("display", "block");
        $(".fixbg-main").css("margin-top", -$(".fixbg-main").height() / 2);
        $(".fixbg-main").css("width", "90%");
        $(".fixbg-main").css("left", "5%");
        /*$(".fixbg-main-btn2").unbind("click").click(function(){
         setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing,SDingDanXiangQing.SDingDanXiangQing_QianWangWeiXin);
         $(".fixbg").css("display","none");
         var deviceType=isMobile();
         if(deviceType == "isApp"){
         if(getParamByUrl('webver')>2){
         appFc.gotoWechat();
         }else{
         mobileApp.gotoWechat();
         }
         }
         });*/
        $(".fixbg-main-btn1").unbind("click").click(function () {
            setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing, SDingDanXiangQing.SDingDanXiangQing_QuXiaoLianXiKeFu);
            $(".fixbg").css("display", "none");
        });
    },

    //点击进入详情页
    infoFunction: function infoFunction() {
        var me = this;
        var data = me.state.orderDetailsData;
        setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing, SDingDanXiangQing.SDingDanXiangQing_QianWangShangPinXiangQing);
        var linkId = data.resp.linkId;
        // alert(linkId);
        if (linkId != null) {
            window.location.href = "productDetails.html?refer=4&linkId=" + linkId; //refer=4从订单详情页进入
        }
    },
    //打开微信
    serviceFunction: function serviceFunction() {
        setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing, SDingDanXiangQing.SDingDanXiangQing_LianXiKeFu);

        //复制
        var me = this;
        console.log('me', me);
        me.refs.picooc.select(); // 选择对象
        console.log(me.refs.picooc);
        document.execCommand("Copy"); // 执行浏览器复制命令
        //alert("已复制好，可贴粘。");

        /*var deviceType=isMobile();
        if(deviceType == "isApp"){
            var getPageInfo = function (){
                var data = {
                    content:"picooc2"
                };
                return JSON.stringify(data);
            };
            //复制到手机剪贴板
            if(getParamByUrl('webver')>2){
                appFc.copyContent(getPageInfo());
            }else{
                mobileApp.copyContent(getPageInfo());
            }
        }*/

        // $(".fixbg-main-t").html('燃脂营售后服务微信号<span style="color:#c7b1a4;">picooc2</span>，已复制到剪贴板，请前往微信，在顶部搜索中粘贴');
        $(".fixbg-main-t").html('已复制燃脂营售后客服微信号<span style="color:#35d0c5;">picooc2</span>，请前往微信，在顶部搜索中粘贴');
        $(".fixbg-main-t").css("text-align", "left");
        $(".fixbg-main-btn1").html("我知道了");
        $(".fixbg-main-btn2").html("前往微信");
        $(".fixbg").css("display", "block");
        $(".fixbg-main").css("margin-top", -$(".fixbg-main").height() / 2);
        $(".fixbg-main").css("width", "90%");
        $(".fixbg-main").css("left", "5%");
        /*$(".fixbg-main-btn2").unbind("click").click(function(){
            setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing,SDingDanXiangQing.SDingDanXiangQing_QianWangWeiXin);
            $(".fixbg").css("display","none");
            var deviceType=isMobile();
            if(deviceType == "isApp"){
                if(getParamByUrl('webver')>2){
                    appFc.gotoWechat();
                }else{
                    mobileApp.gotoWechat();
                }
            }
        });*/
        $(".fixbg-main-btn1").unbind("click").click(function () {
            setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing, SDingDanXiangQing.SDingDanXiangQing_QuXiaoLianXiKeFu);
            $(".fixbg").css("display", "none");
        });
    },

    //取消订单
    cancelOrderFunction: function cancelOrderFunction() {
        var me = this;
        setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing, SDingDanXiangQing.SDingDanXiangQing_ShiFouQuXiaoDingDan);
        goodsId = $(".cancel").attr("data-goods_id");
        $(".fixbg-main-t").html("确认取消订单？");
        $(".fixbg-main-t").css("text-align", "center");
        $(".fixbg-main-btn1").html("取消订单");
        $(".fixbg-main-btn2").html("暂不取消");
        $(".fixbg .row1").css("display", "none");
        $(".fixbg .row2").css("display", "block");
        $(".fixbg").css("display", "block");
        $(".fixbg-main").css("margin-top", -$(".fixbg-main").height() / 2);
        $(".fixbg-main").css("width", "84%");
        $(".fixbg-main").css("left", "8%");
        $(".fixbg-main-btn2").unbind("click").click(function () {
            $(".fixbg .row1").css("display", "block");
            $(".fixbg .row2").css("display", "none");
            setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing, SDingDanXiangQing.SDingDanXiangQing_ZanBuQuXiao);
            $(".fixbg").css("display", "none");
        });
        $(".fixbg-main-btn1").unbind("click").click(function () {
            $(".fixbg .row1").css("display", "block");
            $(".fixbg .row2").css("display", "none");
            setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing, SDingDanXiangQing.SDingDanXiangQing_QuXiaoDingDan);
            //取消订单
            me.cancelOrder(2);
        });
    },
    //去支付
    goToPayFunction: function goToPayFunction(event) {
        var me = this;
        var data = me.state.orderDetailsData;
        setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing, SDingDanXiangQing.SDingDanXiangQing_QuZhiFu);
        setCookiePath("toOrderSuccess", "2", 1, "/;domain=picooc.com");
        var goodsInfo1 = JSON.parse(event.currentTarget.getAttribute("data-order"));
        var goodsInfo = {
            "goodsId": goodsInfo1.goodsId,
            "orderId": goodsInfo1.orderId,
            "userId": 0, //app外全部为0
            "phoneNo": goodsInfo1.phoneNo,
            "origPrice": goodsInfo1.originPrice,
            "currentPrice": goodsInfo1.currentPrice,
            "couponPrice": goodsInfo1.couponPrice,
            "isCoupon": goodsInfo1.isCoupon,
            "couponId": goodsInfo1.couponId,
            'orderUrl': goodsInfo1.orderUrl,
            "sourceType": goodsInfo1.sourceType,
            "trafficSource": goodsInfo1.trafficSource, //流量来源，开屏/push/短信/banner/其他
            "isOwnPicooc": goodsInfo1.isOwnPicooc //是否有秤
        };
        localStorage.setItem('goodsInfos', JSON.stringify(goodsInfo));
        var orderId = event.currentTarget.getAttribute("data-order_id");
        var currentPrice = event.currentTarget.getAttribute("data-price");
        var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
        // 判断当前页面是否在微信内，若在使用公众号（微信内）支付方式，若不在使用微信的h5支付方式
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            // alert(goodsInfo.sourceType);
            // var code = getParamByUrl('code');
            // 判断是否存在微信code，若没有使用微信api回调当前页面，返回code
            // if (getParamByUrl('code') == 'false') {
            if (goodsInfo.sourceType == '微信') {
                removeParamByUrl('phoneNo');
                var url = window.location.search.substring(1);
                var arr = url.split("&");
                var result = [];
                var str = '?';
                for (var i = 0; i < arr.length; i++) {
                    var param = arr[i].split("=");
                    if ('phoneNo' != param[0]) {
                        str += '&' + param[0] + '=' + param[1];
                        //return  param[1];
                    }
                }
                // alert('微信里')
                window.location.href = "payment.html" + str + '&phoneNo=' + goodsInfo.phoneNo + '&fromGo=1';
            } else if (goodsInfo.sourceType == '燃脂营APP' || goodsInfo.sourceType == '有赞') {
                $(".error-main-t").html('该订单在有品app上生成哒，请在同一个渠道完成支付~');
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
            } else if (goodsInfo.sourceType == '微博') {
                $(".error-main-t").html('该订单在微博上生成哒，请在同一个渠道完成支付~');
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
            } else if (goodsInfo.sourceType == 'QQ') {
                $(".error-main-t").html('该订单在qq上生成哒，请在同一个渠道完成支付~');
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
            } else if (goodsInfo.sourceType == '浏览器') {
                $(".error-main-t").html('该订单在浏览器上生成哒，请在同一个渠道完成支付~');
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
            }
        } else {
            // alert(goodsInfo.sourceType);
            if (goodsInfo.sourceType == '微信') {
                $(".error-main-t").html('该订单在微信上生成哒，请在同一个渠道完成支付~');
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
            } else if (goodsInfo.sourceType == '燃脂营APP' || goodsInfo.sourceType == '有赞') {
                $(".error-main-t").html('该订单在有品app上生成哒，请在同一个渠道完成支付~');
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
            } else {
                // alert('微信外');
                // 微信外
                removeParamByUrl('phoneNo');
                var url = window.location.search.substring(1);
                var arr = url.split("&");
                var result = [];
                var str = '?';
                for (var i = 0; i < arr.length; i++) {
                    var param = arr[i].split("=");
                    if ('phoneNo' != param[0]) {
                        str += '&' + param[0] + '=' + param[1];
                    }
                }
                // '&orderId=' + goodsInfo.orderId +
                window.location.href = "payment.html" + str + '&phoneNo=' + goodsInfo.phoneNo + '&orderUrl=' + goodsInfo.orderUrl + '&fromGo=1';
            }
            //    (goodsInfo.sourceType == '浏览器') else
            // else if (goodsInfo.sourceType == '微博'){
            //     $(".error-main-t").html('该订单在微博上生成哒，请在同一个渠道完成支付~');
            //     $(".errorAlert").css("display", "block");
            //     $(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
            // }
            // else if (goodsInfo.sourceType == 'QQ'){
            //     $(".error-main-t").html('该订单在qq上生成哒，请在同一个渠道完成支付~');
            //     $(".errorAlert").css("display", "block");
            //     $(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
            // }
        }
        event.stopPropagation();
    },
    timeDiffer: function timeDiffer(nowTime, endTime) {
        var me = this;
        if (getParamByUrl("os") == "iOS" || !!userAgentInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            endTime = endTime.replace(/-/g, "/");
            nowTime = nowTime.replace(/-/g, "/");
        } else {}
        var intDiff = new Date(endTime) - new Date(nowTime);
        // alert((new Date(endTime))+'|'+ (new Date(nowTime)));
        intDiff = parseInt(intDiff / 1000); //倒计时总秒数量
        console.log('intDiff', intDiff);
        var t1 = setInterval(function () {

            if (intDiff >= 0) {
                var day = Math.floor(intDiff / (60 * 60 * 24));
                var hour = Math.floor(intDiff / (60 * 60)) - day * 24;
                var minute = Math.floor(intDiff / 60) - day * 24 * 60 - hour * 60;
                var second = Math.floor(intDiff) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60;
                hour = (hour < 10 ? '0' : '') + hour;
                minute = (minute < 10 ? '0' : '') + minute;
                second = (second < 10 ? '0' : '') + second;
                $("#hour").html(hour + ':');
                $('#minute').html(minute + ':');
                $('#second').html(second);
                intDiff--;
            } else if (intDiff < 0) {
                console.log(intDiff);
                clearInterval(t1);
                me.cancelOrder(3); //关闭订单
            }
        }, 1000);
    },
    //订单取消或关闭；
    cancelOrder: function cancelOrder(orderType) {
        var me = this;
        console.log(goodsId);
        var finalUrl = ajaxLink + "/v1/api/campOrder/updateOrder" + window.location.search + "&goodsId=" + goodsId + "&orderType=" + orderType;
        //var finalUrl="http://172.17.1.233:8080/v1/api/campOrder/updateOrder"+window.location.search+"&goodsId="+goodsId+"&orderType="+orderType;
        $.ajax({
            type: "get",
            url: finalUrl,
            dataType: "json",
            success: function success(data) {
                console.log(finalUrl);
                if (data.code == 200) {
                    if (orderType == 2) {
                        $(".fixbg").css("display", "none");
                        $(".status").css("display", "none");
                        $(".wait").html("已取消");
                        $(".wait").css("color", "#adadad");

                        $(".fixBg").css("display", "block");
                        $(".fixBg-p").css("display", "block");
                        $(".fixBg-p").html("订单已取消");
                        $(".fixBg").css("height", $(window).height());
                        $(".fixBg-main").css("width", $(window).width() - 140);
                        $(".fixBg-main").css("margin-top", -$(".fixBg-main").height() / 2);
                        setTimeout(function () {
                            $(".fixBg").css("display", "none");
                            $(".fixBg-p").css("display", "none");
                        }, 1500);
                    } else if (orderType == 3) {
                        $(".status").css("display", "none");
                        $(".wait").html("已关闭");
                        $(".wait").css("color", "#adadad");
                    }
                } else {
                    $(".fixbg").css("display", "none");
                    $(".error-main-t").html(data.result.message);
                    $(".errorAlert").css("display", "block");
                    $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                }
            },
            error: function error() {
                $(".error-main-t").html(data.message);
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".error-main").height() / 2);
            }
        });
    },
    //长按复制
    copyFunction: function copyFunction() {

        /*var me = this;
        me.refs.activationCode.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令*/
        //alert("已复制好，可贴粘。");
        //$('.alertBox').stop(true).fadeIn(200).delay(2000).fadeOut(200);
    },

    //leftFunction
    leftFunction: function leftFunction() {
        window.location.href = 'productDetails.html?eventName=fatBurn&typeSize=1&refer=1&linkId=' + getParamByUrl('linkId');
    }
});

var Component = React.createClass({
    displayName: "Component",


    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(OrderDetailsContainer, null),
            React.createElement(Public_error, null)
        );
    }
});

ReactDOM.render(React.createElement(Component, null), document.getElementById('orderDetailsBox'));

/***/ })

},[224]);