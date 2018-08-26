webpackJsonp([26],{

/***/ 223:
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

        var deviceType = isMobile();
        if (getParamByUrl('webver') > 2) {
            var titleData = {
                title: "订单详情",
                color: "",
                opacity: "",
                backgroundColor: "",
                backgroundOpacity: ""
            };
            titleData = JSON.stringify(titleData);
            appFc.controlTitle(titleData);
        } else {
            var getPageInfoTitle = function getPageInfoTitle() {
                var data = {
                    title: "订单详情",
                    isShare: false,
                    backgroundColor: '#2c2f31'
                };
                return JSON.stringify(data);
            };
            if (deviceType == "isApp" && typeof mobileApp != "undefined") {
                mobileApp.getShareInfo(getPageInfoTitle());
            }
            document.documentElement.style.webkitTouchCallout = 'none';
        }

        //控制左上角
        if (deviceType == "isApp") {
            if (getCookie("toOrderDetails") == "1") {
                //从订单列表进入订单详情页面
                if (getParamByUrl('webver') > 2) {
                    var getPageInfo11 = function getPageInfo11() {
                        var data = {
                            iconType: 0,
                            iconColor: "",
                            backNum: 1,
                            closeWebview: 0,
                            hidden: false,
                            isHandle: false,
                            functionName: "",
                            isRefreshPage: true
                        };
                        return JSON.stringify(data);
                    };
                    appFc.controlLeft(getPageInfo11());
                } else {
                    var getPageInfo12 = function getPageInfo12() {
                        var data = {
                            iconType: 0, //0:默认箭头，1：叉，2：iconUrl传图片
                            backNum: 1,
                            closeWebview: 0, //默认为0
                            iconUrl: "",
                            isRefreshPage: true
                        };
                        return JSON.stringify(data);
                    };
                    mobileApp.showLeftBtn(getPageInfo12());
                }
            } else if (getCookie("toOrderDetails") == "2") {
                //从下单成功页进入订单详情页面
                if (getCookie("toOrderSuccess") == "1") {
                    //从订单列表进入的下单成功页
                    if (getParamByUrl('webver') > 2) {
                        var getPageInfo21 = function getPageInfo21() {
                            var data = {
                                iconType: 0,
                                iconColor: "",
                                backNum: 1,
                                closeWebview: 0,
                                hidden: false,
                                isHandle: false,
                                functionName: "",
                                isRefreshPage: true
                            };
                            return JSON.stringify(data);
                        };
                        appFc.controlLeft(getPageInfo21());
                    } else {
                        var getPageInfo22 = function getPageInfo22() {
                            var data = {
                                iconType: 0, //0:默认箭头，1：叉，2：iconUrl传图片
                                backNum: 1,
                                closeWebview: 0, //默认为0
                                iconUrl: "",
                                isRefreshPage: true
                            };
                            return JSON.stringify(data);
                        };
                        mobileApp.showLeftBtn(getPageInfo22());
                    }
                } else if (getCookie("toOrderSuccess") == "2") {
                    //从订单详情进入的下单成功页
                    if (getParamByUrl('webver') > 2) {
                        var getPageInfo31 = function getPageInfo31() {
                            var data = {
                                iconType: 0,
                                iconColor: "",
                                backNum: 1,
                                closeWebview: 0,
                                hidden: false,
                                isHandle: false,
                                functionName: "",
                                isRefreshPage: true
                            };
                            return JSON.stringify(data);
                        };
                        appFc.controlLeft(getPageInfo31());
                    } else {
                        var getPageInfo32 = function getPageInfo32() {
                            var data = {
                                iconType: 0, //0:默认箭头，1：叉，2：iconUrl传图片
                                backNum: 1,
                                closeWebview: 0, //默认为0
                                iconUrl: "",
                                isRefreshPage: true
                            };
                            return JSON.stringify(data);
                        };
                        mobileApp.showLeftBtn(getPageInfo32());
                    }
                } else {
                    //从确认订单页面进入下单成功页
                    if (getParamByUrl('webver') > 2) {
                        var getPageInfo41 = function getPageInfo41() {
                            var data = {
                                iconType: 0,
                                iconColor: "",
                                backNum: 1,
                                closeWebview: 0,
                                hidden: false,
                                isHandle: false,
                                functionName: "",
                                isRefreshPage: true
                            };
                            return JSON.stringify(data);
                        };
                        appFc.controlLeft(getPageInfo41());
                    } else {
                        var getPageInfo42 = function getPageInfo42() {
                            var data = {
                                iconType: 0, //0:默认箭头，1：叉，2：iconUrl传图片
                                backNum: 1,
                                closeWebview: 0, //默认为0
                                iconUrl: "",
                                isRefreshPage: true
                            };
                            return JSON.stringify(data);
                        };
                        mobileApp.showLeftBtn(getPageInfo42());
                    }
                }
            }
        }

        return {
            orderDetailsData: {}
        };
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
                        { className: "row common content content5", style: { display: data.resp.activationCode == null ? "block" : "none" } },
                        React.createElement(
                            "div",
                            { className: "row col-xs-12 col-sm-12" },
                            React.createElement(
                                "div",
                                { className: "col-xs-5 col-sm-5 left" },
                                "\u53C2\u8425\u4EBA"
                            ),
                            React.createElement(
                                "div",
                                { className: "col-xs-7 col-sm-7 right", id: "userName" },
                                data.resp.userName
                            )
                        )
                    ),
                    React.createElement(
                        "aside",
                        { className: "row common content content1", style: { height: data.resp.activationCode == null ? "6.25rem" : "auto" } },
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
                        ),
                        React.createElement(
                            "div",
                            { className: "row col-xs-12 col-sm-12 borderTop content1-padding", style: { display: data.resp.activationCode == null ? "block" : "none" } },
                            React.createElement(
                                "div",
                                { className: "col-xs-5 col-sm-5 left" },
                                "\u5FAE\u4FE1\u53F7"
                            ),
                            React.createElement(
                                "div",
                                { className: "col-xs-7 col-sm-7 right", id: "wechatNum" },
                                wechatNum
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
                        { className: "row common content content4 service", onClick: me.serviceFunction },
                        React.createElement(
                            "div",
                            { className: "row col-xs-12 col-sm-12 contact" },
                            React.createElement("img", { src: "https://cdn2.picooc.com/web/res/fatburn/image/sell/orderDetailsOut/server.png" }),
                            " ",
                            React.createElement(
                                "span",
                                null,
                                "\u54A8\u8BE2\u552E\u540E\u5BA2\u670D"
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
                                        onClick: me.goToPayFunction, className: "gotoPay", "data-order_id": data.resp.orderId, "data-source_type": data.resp.sourceType,
                                        style: { marginLeft: '1rem' } },
                                    "\u53BB\u652F\u4ED8"
                                )
                            )
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
                                    { className: "row" },
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
                } else {
                    $(".error-main-t").html(data.result.message);
                    $(".errorAlert").css("display", "block");
                    $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                }
            }
        });
    },
    //点击进入详情页
    infoFunction: function infoFunction() {
        var me = this;
        var data = me.state.orderDetailsData;
        setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing, SDingDanXiangQing.SDingDanXiangQing_QianWangShangPinXiangQing);
        //removeParamByUrl('orderId');
        var url = window.location.search.substring(1);
        var arr = url.split("&");
        var result = [];
        var str = '';
        for (var i = 0; i < arr.length; i++) {
            var param = arr[i].split("=");
            if ('orderId' != param[0] && 'refer' != param[0]) {
                str += '&' + param[0] + '=' + param[1];
            }
        }
        var linkId = data.resp.linkId;
        // alert(data.resp.linkId);
        if (linkId != null) {
            window.location.href = "productDetails.html?urlSign=1&refer=4" + str + '&linkId=' + linkId; //refer=4从订单详情页进入
        }
        //window.location.href = "productDetails.html" + window.location.search  + "&refer=4&urlSign=1" + "&typeSize=" + data.resp.goodsType;
    },
    //打开微信
    serviceFunction: function serviceFunction() {
        setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing, SDingDanXiangQing.SDingDanXiangQing_LianXiKeFu);
        var deviceType = isMobile();
        if (deviceType == "isApp") {
            var getPageInfo = function getPageInfo() {
                var data = {
                    content: "picooc2"
                };
                return JSON.stringify(data);
            };
            //复制到手机剪贴板
            if (getParamByUrl('webver') > 2) {
                appFc.copyContent(getPageInfo());
            } else {
                mobileApp.copyContent(getPageInfo());
            }
        }

        // $(".fixbg-main-t").html('燃脂营售后服务微信号<span style="color:#c7b1a4;">picooc2</span>，已复制到剪贴板，请前往微信，在顶部搜索中粘贴');
        $(".fixbg-main-t").html('已复制燃脂营售后客服微信号<span style="color:#35d0c5;">picooc2</span>，请前往微信，在顶部搜索中粘贴');
        $(".fixbg-main-t").css("text-align", "left");
        $(".fixbg-main-btn1").html("取消");
        $(".fixbg-main-btn2").html("前往微信");
        $(".fixbg").css("display", "block");
        $(".fixbg-main").css("margin-top", -$(".fixbg-main").height() / 2);
        $(".fixbg-main").css("width", "90%");
        $(".fixbg-main").css("left", "5%");
        $(".fixbg-main-btn2").unbind("click").click(function () {
            setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing, SDingDanXiangQing.SDingDanXiangQing_QianWangWeiXin);
            $(".fixbg").css("display", "none");
            var deviceType = isMobile();
            if (deviceType == "isApp") {
                if (getParamByUrl('webver') > 2) {
                    appFc.gotoWechat();
                } else {
                    mobileApp.gotoWechat();
                }
            }
        });
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
        $(".fixbg").css("display", "block");
        $(".fixbg-main").css("margin-top", -$(".fixbg-main").height() / 2);
        $(".fixbg-main").css("width", "84%");
        $(".fixbg-main").css("left", "8%");
        $(".fixbg-main-btn2").unbind("click").click(function () {
            setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing, SDingDanXiangQing.SDingDanXiangQing_ZanBuQuXiao);
            $(".fixbg").css("display", "none");
        });
        $(".fixbg-main-btn1").unbind("click").click(function () {
            setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing, SDingDanXiangQing.SDingDanXiangQing_QuXiaoDingDan);
            //取消订单
            me.cancelOrder(2);
        });
    },
    //去支付
    goToPayFunction: function goToPayFunction(event) {
        var me = this;
        var data = me.state.orderDetailsData;
        var sourceType = $.trim(event.currentTarget.getAttribute("data-source_type"));
        setMaiDian(SDingDanXiangQing.SCategory_SDingDanXiangQing, SDingDanXiangQing.SDingDanXiangQing_QuZhiFu);
        setCookiePath("toOrderSuccess", "2", 1, "/;domain=picooc.com");
        var deviceType = isMobile();

        if (sourceType == '燃脂营APP' || sourceType == '有赞') {
            if (deviceType == "isApp") {
                var getPageInfo = function getPageInfo() {
                    var paydata = {
                        orderId: data.resp.orderId,
                        url: absoluteUrl + "orderSuccess.html" + window.location.search,
                        price: data.resp.currentPrice,
                        isRefresh: true,
                        function: "getOrderInfo"
                    };
                    return JSON.stringify(paydata);
                };
                if (getParamByUrl('webver') > 2) {
                    appFc.gotoPay(getPageInfo());
                } else {
                    mobileApp.gotoPay(getPageInfo());
                }
            }
        } else if (sourceType == '微信') {
            $(".error-main-t").html('该订单在微信上生成哒，请在同一个渠道完成支付~');
            $(".errorAlert").css("display", "block");
            $(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
        } else if (sourceType == '微博') {
            $(".error-main-t").html('该订单在微博上生成哒，请在同一个渠道完成支付~');
            $(".errorAlert").css("display", "block");
            $(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
        } else if (sourceType == 'QQ') {
            $(".error-main-t").html('该订单在qq上生成哒，请在同一个渠道完成支付~');
            $(".errorAlert").css("display", "block");
            $(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
        } else {
            $(".error-main-t").html('该订单在浏览器上生成哒，请在同一个渠道完成支付~');
            $(".errorAlert").css("display", "block");
            $(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
        }
    },
    timeDiffer: function timeDiffer(nowTime, endTime) {
        var me = this;
        if (getParamByUrl("os") == "iOS") {
            endTime = endTime.replace(/-/g, "/");
            nowTime = nowTime.replace(/-/g, "/");
        } else {}
        var intDiff = new Date(endTime) - new Date(nowTime);
        // alert((new Date(endTime))+'|'+ (new Date(nowTime)));
        intDiff = parseInt(intDiff / 1000); //倒计时总秒数量
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
        // var finalUrl="http://172.17.1.233:8080/v1/api/campOrder/updateOrder"+window.location.search+"&goodsId="+goodsId+"&orderType="+orderType;
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
            }
        });
    },
    //长按复制
    copyFunction: function copyFunction() {
        var me = this;
        me.refs.activationCode.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        //alert("已复制好，可贴粘。");
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

},[223]);