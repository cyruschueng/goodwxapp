webpackJsonp([28],{

/***/ 221:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
var Public_error = __webpack_require__(3);
/*alert(getCookie('reloadBtn') == 'undefined');
if(getCookie('reloadBtn') == 'undefined'){
    //setCookie();
}
var reloadBtn = true;
//if(reloadBtn)*/
var SWoDeYouHuiQuan = {
    SCategory_SWoDeYouHuiQuan: 5080900,
    SWoDeYouHuiQuan_RanZhiYingYouHuiQuan: 5080901, //燃脂营优惠券
    SWoDeYouHuiQuan_GouChengYouHuiMa: 5080902, //购秤优惠码
    SWoDeYouHuiQuan_QianWangYouZan: 5080903, //前往有赞
    SWoDeYouHuiQuan_RanZhiYingDingDan: 5080904 //燃脂营订单
};

var SWoDeDingDan = {
    SCategory_SWoDeDingDan: 5080400,
    SWoDeDingDan_DengDaiFuKuan: 5080401, //等待付款
    SWoDeDingDan_YiWanCheng: 5080402, //已完成
    SWoDeDingDan_YiGuanBi: 5080403, //已关闭
    SWoDeDingDan_YiQuXiao: 5080404, //已取消
    SWoDeDingDan_QuZhiFu: 5080405 //去支付
};
var publicData = {
    outAppLogin: getCookie('appOutPhone') == false ? false : true
};
window.publicData = publicData;
var MyInfoBoxContainer = React.createClass({
    displayName: "MyInfoBoxContainer",


    getInitialState: function getInitialState() {
        var me = this;
        me.getOrders();
        me.findCoupon();
        //me.getCampCode();
        /*var titleData = {
            title: "燃脂营优惠券",
            color: "",
            opacity: "",
            backgroundColor: "",
            backgroundOpacity: ""
        };
        titleData = JSON.stringify(titleData);
        appFc.controlTitle(titleData);*/
        return {
            myOrderData: {},
            couponList: [],
            codeList: []
        };
    },
    componentWillMount: function componentWillMount() {
        if (publicData.outAppLogin == false) {
            window.location.href = 'productDetails.html?linkId=' + getParamByUrl('linkId') + "&innerToOut=1";
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
        var data = me.state.myOrderData;
        var str = "";

        if (typeof me.state.myOrderData.resp != "undefined") {

            if (data.resp.records.length > 0) {
                var str1 = "";
                var str2 = React.createElement(
                    "span",
                    { className: "wait" },
                    "\u7B49\u5F85\u4ED8\u6B3E"
                );
                var str3 = React.createElement(
                    "span",
                    { className: "ok" },
                    "\u5DF2\u5B8C\u6210"
                );
                var str4 = React.createElement(
                    "span",
                    { className: "ok" },
                    "\u5DF2\u5173\u95ED"
                );
                var str5 = React.createElement(
                    "span",
                    { className: "ok" },
                    "\u5DF2\u53D6\u6D88"
                );
                var str6 = "";
                var str7 = "";
                var str8 = React.createElement(
                    "span",
                    { className: "ok" },
                    "\u9000\u6B3E\u4E2D"
                );
                var str9 = React.createElement(
                    "span",
                    { className: "ok" },
                    "\u9000\u6B3E\u5B8C\u6210"
                );

                var list = [];
                for (var i = 0; i < data.resp.records.length; i++) {
                    if (data.resp.records[i].orderType == 0) {
                        str6 = str2;
                        str7 = React.createElement(
                            "div",
                            { className: "col-xs-4 col-sm-4 gotoPay" },
                            React.createElement(
                                "span",
                                { "data-order": JSON.stringify(data.resp.records[i]), onClick: me.payToFunction, className: "PayTo", "data-goods_type": data.resp.records[i].goodsType, "data-price": data.resp.records[i].currentPrice, "data-order_id": data.resp.records[i].orderId },
                                "\u53BB\u652F\u4ED8"
                            )
                        );
                    } else if (data.resp.records[i].orderType == 1) {
                        str6 = str3;
                        str7 = "";
                    } else if (data.resp.records[i].orderType == 2) {
                        str6 = str5;
                        str7 = "";
                    } else if (data.resp.records[i].orderType == 3) {
                        str6 = str4;
                        str7 = "";
                    } else if (data.resp.records[i].orderType == 4) {
                        str6 = str8;
                        str7 = "";
                    } else if (data.resp.records[i].orderType == 5) {
                        str6 = str9;
                        str7 = "";
                    }
                    //var goodsUrl = JSON.parse(data.resp.records[i].goodsUrl);
                    if (data.resp.records[i].goodsType == 1) {
                        list.push(React.createElement(
                            "aside",
                            { key: i, "data-index": i, className: "row order", "data-goods_type": data.resp.records[i].goodsType,
                                "data-order_id": data.resp.records[i].orderId, onClick: me.orderFunction },
                            React.createElement(
                                "div",
                                { className: "row col-xs-12 col-sm-12 orderDetail" },
                                React.createElement(
                                    "div",
                                    { className: "col-xs-8 col-sm-8 number" },
                                    "\u8BA2\u5355\u7F16\u53F7\uFF1A",
                                    data.resp.records[i].orderId
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-xs-4 col-sm-4 waitPay" },
                                    str6,
                                    React.createElement("img", {
                                        src: "http://cdn2.picooc.com/web/res/fatburn/image/myOrder/more.png" })
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "row col-xs-12 col-sm-12 info" },
                                React.createElement(
                                    "div",
                                    { className: "col-xs-3 col-sm-3 infoImg" },
                                    React.createElement("img", { src: data.resp.records[i].goodsUrl })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-xs-9 col-sm-9 infoDesc" },
                                    React.createElement(
                                        "h3",
                                        null,
                                        data.resp.records[i].goodsName
                                    ),
                                    React.createElement(
                                        "p",
                                        null,
                                        "\u5F00\u8425\u65F6\u95F4\uFF1A",
                                        data.resp.records[i].beginTime
                                    )
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "row col-xs-12 col-sm-12 pay" },
                                React.createElement(
                                    "div",
                                    { className: "col-xs-8 col-sm-8 payNum" },
                                    "\u5B9E\u4ED8\u6B3E\uFF1A",
                                    React.createElement(
                                        "span",
                                        {
                                            className: "payprice" },
                                        "\xA5",
                                        data.resp.records[i].currentPrice
                                    )
                                ),
                                str7
                            )
                        ));
                    } else if (data.resp.records[i].goodsType == 2) {
                        var saleTime = data.resp.records[i].createTime.substring(0, 10);
                        list.push(React.createElement(
                            "aside",
                            { key: i, "data-index": i, className: "row order", "data-goods_type": data.resp.records[i].goodsType,
                                "data-order_id": data.resp.records[i].orderId, onClick: me.orderFunction },
                            React.createElement(
                                "div",
                                { className: "row col-xs-12 col-sm-12 orderDetail" },
                                React.createElement(
                                    "div",
                                    { className: "col-xs-8 col-sm-8 number" },
                                    "\u8BA2\u5355\u7F16\u53F7\uFF1A",
                                    data.resp.records[i].orderId
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-xs-4 col-sm-4 waitPay" },
                                    str6,
                                    React.createElement("img", { src: "http://cdn2.picooc.com/web/res/fatburn/image/myOrder/more.png" })
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "row col-xs-12 col-sm-12 info" },
                                React.createElement(
                                    "div",
                                    { className: "col-xs-3 col-sm-3 infoImg" },
                                    React.createElement("img", { src: data.resp.records[i].goodsUrl })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-xs-9 col-sm-9 infoDesc" },
                                    React.createElement(
                                        "h3",
                                        null,
                                        data.resp.records[i].goodsName
                                    ),
                                    React.createElement(
                                        "p",
                                        null,
                                        "\u8D2D\u4E70\u65F6\u95F4\uFF1A",
                                        saleTime
                                    )
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "row col-xs-12 col-sm-12 pay" },
                                React.createElement(
                                    "div",
                                    { className: "col-xs-8 col-sm-8 payNum" },
                                    "\u5B9E\u4ED8\u6B3E\uFF1A",
                                    React.createElement(
                                        "span",
                                        { className: "payprice" },
                                        "\xA5",
                                        data.resp.records[i].currentPrice
                                    )
                                ),
                                str7
                            )
                        ));
                    }
                }
                str = list;
            } else {
                str = React.createElement(
                    "div",
                    { className: "row noOrder" },
                    "\u6682\u65E0\u76F8\u5173\u8BA2\u5355\u4FE1\u606F~"
                );
            }
        }

        var displayCoupon = me.state.couponList.length > 0 ? "none" : "block";
        var displayCode = me.state.codeList.length > 0 ? "none" : "block";
        var strCoupon = [];
        var strCode = [];
        return React.createElement(
            "section",
            { className: "container" },
            React.createElement(
                "div",
                { className: "row noAppTitle", style: { display: 'none' } },
                React.createElement(
                    "div",
                    { className: "col-xs-4 col-sm-4 left", onClick: me.leftFunction },
                    "\u8FD4\u56DE"
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
                { className: "row titleNew" },
                React.createElement(
                    "div",
                    { className: "col-xs-4 col-sm-4 tab activeTab", onClick: me.leftBoxFunction, ref: "leftBox" },
                    "\u8BA2\u5355"
                ),
                React.createElement(
                    "div",
                    { className: "col-xs-4 col-sm-4 tab", onClick: me.middleBoxFunction, ref: "middleBox" },
                    "\u4F18\u60E0\u5238"
                ),
                React.createElement(
                    "div",
                    { className: "col-xs-4 col-sm-4 tab", onClick: me.rightBoxFunction, ref: "rightBox" },
                    "\u8D2D\u79E4\u4F18\u60E0\u7801"
                )
            ),
            React.createElement(
                "div",
                { className: "myOrders" },
                str
            ),
            React.createElement(
                "aside",
                { className: "row coupons", style: { display: 'none' } },
                React.createElement(
                    "div",
                    { style: { display: displayCoupon }, className: "row noCoupon" },
                    "\u6682\u65E0\u53EF\u4F7F\u7528\u7684\u4F18\u60E0\u5238~"
                ),
                me.state.couponList.map(function (item, index) {
                    if (item.isUse == 0) {
                        if (!item.expire) {
                            strCoupon.push(React.createElement(
                                "div",
                                { key: index, className: "row col-xs-12 col-sm-12 avail isAvail" },
                                React.createElement(
                                    "div",
                                    { className: "msg msgActive" },
                                    React.createElement(
                                        "div",
                                        { className: "col-xs-6 col-sm-6 continue" },
                                        item.name
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "col-xs-6 col-sm-6 value" },
                                        React.createElement(
                                            "span",
                                            { className: "value1" },
                                            "\xA5"
                                        ),
                                        " ",
                                        React.createElement(
                                            "span",
                                            {
                                                className: "value2" },
                                            item.value
                                        )
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-xs-12 col-sm-12 term" },
                                    "\u6709\u6548\u671F\uFF1A",
                                    item.beginTime,
                                    " - ",
                                    item.endTime
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-xs-12 col-sm-12 require" },
                                    item.rule
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-xs-12 col-sm-12 goToSale goToSaleIsAlive", "data-link": item.link, onClick: me.goToLink },
                                    "\u7ACB\u5373\u4F7F\u7528"
                                )
                            ));
                        } else {
                            strCoupon.push(React.createElement(
                                "div",
                                { key: index, className: "row col-xs-12 col-sm-12 avail notAvail" },
                                React.createElement(
                                    "div",
                                    { className: "msg" },
                                    React.createElement(
                                        "div",
                                        { className: "col-xs-6 col-sm-6 continue" },
                                        item.name
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "col-xs-6 col-sm-6 value" },
                                        React.createElement(
                                            "span",
                                            {
                                                className: "value1" },
                                            "\xA5"
                                        ),
                                        " ",
                                        React.createElement(
                                            "span",
                                            {
                                                className: "value2" },
                                            item.value
                                        )
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-xs-12 col-sm-12 term" },
                                    "\u6709\u6548\u671F\uFF1A",
                                    item.beginTime,
                                    " - ",
                                    item.endTime
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-xs-12 col-sm-12 require" },
                                    item.rule
                                ),
                                React.createElement("img", { className: "status", src: "image/withoutCamp/coupon3.png" }),
                                React.createElement(
                                    "div",
                                    { className: "col-xs-12 col-sm-12 goToSale" },
                                    "\u7ACB\u5373\u4F7F\u7528"
                                )
                            ));
                        }
                    } else if (item.isUse == 1) {
                        strCoupon.push(React.createElement(
                            "div",
                            { key: index, className: "row col-xs-12 col-sm-12 avail notAvail" },
                            React.createElement(
                                "div",
                                { className: "msg" },
                                React.createElement(
                                    "div",
                                    { className: "col-xs-6 col-sm-6 continue" },
                                    item.name
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-xs-6 col-sm-6 value" },
                                    React.createElement(
                                        "span",
                                        { className: "value1" },
                                        "\xA5"
                                    ),
                                    " ",
                                    React.createElement(
                                        "span",
                                        {
                                            className: "value2" },
                                        item.value
                                    )
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-xs-12 col-sm-12 term" },
                                "\u6709\u6548\u671F\uFF1A",
                                item.beginTime,
                                " - ",
                                item.endTime
                            ),
                            React.createElement(
                                "div",
                                { className: "col-xs-12 col-sm-12 require" },
                                item.rule
                            ),
                            React.createElement("img", { className: "status", src: "image/withoutCamp/coupon2.png" }),
                            React.createElement(
                                "div",
                                { className: "col-xs-12 col-sm-12 goToSale" },
                                "\u7ACB\u5373\u4F7F\u7528"
                            )
                        ));
                    }
                }),
                strCoupon
            ),
            React.createElement(
                "aside",
                { className: "row couponCode", style: { display: 'none' } },
                React.createElement(
                    "div",
                    { style: { display: displayCode }, className: "row noCoupon" },
                    "\u6682\u65E0\u53EF\u4F7F\u7528\u7684\u4F18\u60E0\u7801~"
                ),
                me.state.codeList.map(function (item, index) {
                    if (!item.expire) {
                        strCode.push(React.createElement(
                            "div",
                            { key: index, className: "row col-xs-12 col-sm-12 avail isAvail divBox" },
                            React.createElement(
                                "div",
                                { className: "msg msgActive" },
                                React.createElement(
                                    "div",
                                    { className: "col-xs-8 col-sm-8 continue" },
                                    React.createElement(
                                        "p",
                                        { className: "zan" },
                                        item.name
                                    ),
                                    React.createElement("input", { type: "text", style: { position: 'absolute', zIndex: '-999' }, id: 'theCode' + index, ref: 'theCode' + index, value: item.coupon_code, readOnly: true }),
                                    React.createElement(
                                        "p",
                                        { className: "zanNum" },
                                        React.createElement(
                                            "span",
                                            { className: "aboutCouponCode" },
                                            item.coupon_code
                                        ),
                                        "\xA0",
                                        React.createElement(
                                            "span",
                                            { "data-index": index, "data-code": item.coupon_code, className: "copy copy3", id: "copyThisCode" + index, "data-clipboard-action": "copy", "data-clipboard-target": "#theCode" + index
                                                /*onClick={me.copyFunction}*/ },
                                            "\xA0\u590D\u5236\xA0"
                                        )
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-xs-4 col-sm-4 value" },
                                    React.createElement(
                                        "span",
                                        { className: "value1" },
                                        "\xA5"
                                    ),
                                    " ",
                                    React.createElement(
                                        "span",
                                        {
                                            className: "value2" },
                                        item.value
                                    )
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-xs-12 col-sm-12 term" },
                                "\u6709\u6548\u671F\uFF1A",
                                item.begin_time,
                                "- ",
                                item.end_time
                            ),
                            React.createElement(
                                "div",
                                { className: "col-xs-12 col-sm-12 require" },
                                item.rule
                            ),
                            React.createElement(
                                "div",
                                { className: "col-xs-12 col-sm-12 goTo", onClick: me.goToFunction },
                                "\u524D\u5F80\u6709\u8D5E\u4F7F\u7528"
                            )
                        ));
                    } else {
                        strCode.push(React.createElement(
                            "div",
                            { key: index, className: "row col-xs-12 col-sm-12 avail notAvail divBox" },
                            React.createElement(
                                "div",
                                { className: "msg" },
                                React.createElement(
                                    "div",
                                    { className: "col-xs-8 col-sm-8 continue" },
                                    React.createElement(
                                        "p",
                                        { className: "zan" },
                                        item.name
                                    ),
                                    React.createElement("input", { type: "text", style: { position: 'absolute', zIndex: '-999' }, id: 'theCode' + index, ref: 'theCode' + index, value: item.coupon_code, readOnly: true }),
                                    React.createElement(
                                        "p",
                                        { className: "zanNum zanNum2" },
                                        React.createElement(
                                            "span",
                                            { className: "aboutCouponCode" },
                                            item.coupon_code
                                        ),
                                        "\xA0",
                                        React.createElement(
                                            "span",
                                            { "data-index": index, "data-code": item.coupon_code, className: "copy copy2", id: "copyThisCode" + index, "data-clipboard-action": "copy", "data-clipboard-target": "#theCode" + index
                                                /*onClick={me.copyFunction}*/ },
                                            " \xA0\u590D\u5236\xA0"
                                        )
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-xs-4 col-sm-4 value" },
                                    React.createElement(
                                        "span",
                                        { className: "value1" },
                                        "\xA5"
                                    ),
                                    " ",
                                    React.createElement(
                                        "span",
                                        {
                                            className: "value2" },
                                        item.value
                                    )
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-xs-12 col-sm-12 term" },
                                "\u6709\u6548\u671F\uFF1A",
                                item.begin_time,
                                "- ",
                                item.end_time
                            ),
                            React.createElement(
                                "div",
                                { className: "col-xs-12 col-sm-12 require" },
                                item.rule
                            ),
                            React.createElement("img", { className: "status", src: "image/withoutCamp/coupon3.png" }),
                            React.createElement(
                                "div",
                                { className: "col-xs-12 col-sm-12 goTo goTo2", onClick: me.goToFunction },
                                "\u524D\u5F80\u6709\u8D5E\u4F7F\u7528"
                            )
                        ));
                    }
                }),
                strCode
            )
        );
    },
    /*获取优惠券列表*/
    findCoupon: function findCoupon() {
        var me = this;
        var finalUrl = ajaxLink + "/v1/api/campCoupon/findCouponOut" + window.location.search;
        //var finalUrl="http://172.17.1.233:8080/v1/api/campCoupon/findCouponOut"+window.location.search;
        $.ajax({
            type: "get",
            url: finalUrl,
            dataType: "json",
            success: function success(data) {
                console.log('获取优惠券列表', data);
                console.log(finalUrl);
                if (data.code == 200) {

                    me.setState({
                        couponList: data.resp.couponList,
                        codeList: data.resp.codeList
                    });

                    for (var i = 0; i < data.resp.codeList.length; i++) {
                        var clipboard = new Clipboard('#copyThisCode' + i);

                        clipboard.on('success', function (e) {
                            console.log(e);
                            $(".fixBg").css("height", $(window).height());
                            $(".fixBg-main").css("width", $(window).width() - 140);
                            $(".fixBg-p").css("display", "block");
                            $(".fixBg").css("display", "block");
                            $(".fixBg-p").html("复制成功，前往有赞去使用吧~");
                            $(".fixBg-main").css("margin-top", -$(".fixBg-main").height() / 2);
                            setTimeout(function () {
                                $(".fixBg").css("display", "none");
                                $(".fixBg-p").css("display", "none");
                            }, 1500);
                        });
                        clipboard.on('error', function (e) {
                            console.log(e);
                        });
                    }
                } else {
                    $(".error-main-t").html(data.result.message);
                    $(".errorAlert").css("display", "block");
                    $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                }
            }
        });
    },

    /*获取购秤优惠码列表*/
    getCampCode: function getCampCode() {
        var me = this;
        var finalUrl = ajaxLink + "/v1/api/campCode/getCampCode" + window.location.search;
        $.ajax({
            type: "get",
            url: finalUrl,
            dataType: "json",
            success: function success(data) {
                console.log(data);
                console.log(finalUrl);
                if (data.code == 200) {
                    console.log('获取购秤优惠码列表', data);
                    /*me.setState({
                        couponList:data.resp.couponList,
                        codeList:data.resp.codeList
                    });*/
                } else {
                    $(".error-main-t").html(data.result.message);
                    $(".errorAlert").css("display", "block");
                    $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                }
            }
        });
    },

    /*前往有赞使用*/
    goToFunction: function goToFunction() {
        setMaiDian(SWoDeYouHuiQuan.SCategory_SWoDeYouHuiQuan, SWoDeYouHuiQuan.SWoDeYouHuiQuan_QianWangYouZan);
        var deviceType = isMobile(); //判断是不是app的方法
        if (deviceType == "isApp") {
            var data = {
                link: "https://h5.koudaitong.com/v2/goods/361jk71ya1ddk",
                animation: 1 //默认1从右到左，2从下到上
            };
            data = JSON.stringify(data);
            appFc.openWebview(data);
        } else {
            window.location.href = "https://h5.koudaitong.com/v2/goods/361jk71ya1ddk";
        }
    },
    /*复制有赞优惠码*/
    copyFunction: function copyFunction(event) {
        var me = this;
        console.log(me);
        //alert($('.divBox').length);
        event.stopPropagation();
        var copycontent = event.currentTarget.getAttribute("data-code");
        var index = event.currentTarget.getAttribute("data-index");
        //alert(index);
        var aboutRef = 'theCode' + index;
        console.log('22', me.refs[aboutRef]);
        me.refs[aboutRef].select();
        document.execCommand("Copy"); // 执行浏览器复制命令
        //alert("已复制好，可贴粘。");

        //app复制内容到剪切板
        var deviceType = isMobile();
        if (deviceType == "isApp") {
            var getPageInfo = function getPageInfo() {
                var data = {
                    content: copycontent
                };
                return JSON.stringify(data);
            };
            appFc.copyContent(getPageInfo);
        }
        $(".fixBg").css("height", $(window).height());
        $(".fixBg-main").css("width", $(window).width() - 140);
        $(".fixBg-p").css("display", "block");
        $(".fixBg").css("display", "block");
        $(".fixBg-p").html("复制成功，前往有赞去使用吧~");
        $(".fixBg-main").css("margin-top", -$(".fixBg-main").height() / 2);
        setTimeout(function () {
            $(".fixBg").css("display", "none");
            $(".fixBg-p").css("display", "none");
        }, 1500);
    },
    /*切换到优惠券*/
    leftBoxFunction: function leftBoxFunction(event) {
        var me = this;
        setMaiDian(SWoDeYouHuiQuan.SCategory_SWoDeYouHuiQuan, SWoDeYouHuiQuan.SWoDeYouHuiQuan_RanZhiYingYouHuiQuan);
        $('.titleNew .tab').removeClass("activeTab");
        $(me.refs.leftBox).addClass('activeTab');
        $('.myOrders').show();
        $('.coupons,.couponCode').hide();
    },
    middleBoxFunction: function middleBoxFunction(event) {
        var me = this;
        setMaiDian(SWoDeYouHuiQuan.SCategory_SWoDeYouHuiQuan, SWoDeYouHuiQuan.SWoDeYouHuiQuan_RanZhiYingDingDan);
        $('.titleNew .tab').removeClass("activeTab");
        $(me.refs.middleBox).addClass('activeTab');
        $('.coupons').show();
        $('.myOrders,.couponCode').hide();
    },
    /*切换到优惠码*/
    rightBoxFunction: function rightBoxFunction(event) {
        var me = this;
        setMaiDian(SWoDeYouHuiQuan.SCategory_SWoDeYouHuiQuan, SWoDeYouHuiQuan.SWoDeYouHuiQuan_GouChengYouHuiMa);
        $('.titleNew .tab').removeClass("activeTab");
        $(me.refs.rightBox).addClass('activeTab');
        $('.couponCode').show();
        $('.myOrders,.coupons').hide();
    },

    //获取订单列表(原接口没有改)
    getOrders: function getOrders() {
        var me = this;
        var finalUrl = ajaxLink + "/v1/api/campOrder/findOrders" + window.location.search;
        //var finalUrl="http://172.17.1.233:8080/v1/api/campOrder/findOrders"+window.location.search;
        $.ajax({
            type: "get",
            url: finalUrl,
            dataType: "json",
            success: function success(data) {
                if (data.code == 200) {
                    console.log("获取订单列表", data);
                    //console.log(finalUrl);
                    if (typeof me.state.myOrderData.resp != "undefined") {
                        if (me.state.myOrderData.resp.records.length > 0) {
                            data.resp.records = me.state.myOrderData.resp.records.concat(data.resp.records);
                        }
                    }
                    me.setState({ myOrderData: data });
                } else {
                    $(".error-main-t").html(data.result.message);
                    $(".errorAlert").css("display", "block");
                    $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                }
            }
        });
    },

    //跳转到订单详情页
    orderFunction: function orderFunction(event) {
        event.stopPropagation();
        var me = this;
        var data = me.state.myOrderData;
        $(event.currentTarget).css("opacity", "0.6");
        var index = event.currentTarget.getAttribute("data-index"); //设置埋点
        if (data.resp.records[index].orderType == 0) {
            setMaiDian(SWoDeDingDan.SCategory_SWoDeDingDan, SWoDeDingDan.SWoDeDingDan_DengDaiFuKuan); //等待付款
        } else if (data.resp.records[index].orderType == 1) {
            setMaiDian(SWoDeDingDan.SCategory_SWoDeDingDan, SWoDeDingDan.SWoDeDingDan_YiWanCheng); //已完成
        } else if (data.resp.records[index].orderType == 2) {
            setMaiDian(SWoDeDingDan.SCategory_SWoDeDingDan, SWoDeDingDan.SWoDeDingDan_YiQuXiao); //已取消
        } else if (data.resp.records[index].orderType == 3) {
            setMaiDian(SWoDeDingDan.SCategory_SWoDeDingDan, SWoDeDingDan.SWoDeDingDan_YiGuanBi); //已关闭
        }
        var orderId = event.currentTarget.getAttribute("data-order_id");
        setCookiePath("toOrderDetails", "1", 1, "/;domain=picooc.com");
        // setCookie("toOrderDetails","1",1); //在cookie中存放跳转到订单详情页面的标识 1为从订单列表跳转的
        if (event.currentTarget.getAttribute("data-goods_type") == 1) {
            window.location.href = "orderDetailsOut.html" + window.location.search + "&orderId=" + orderId;
        } else if (event.currentTarget.getAttribute("data-goods_type") == 2) {
            window.location.href = "OrderDetailsOut.html" + window.location.search + "&orderId=" + orderId;
        }
    },

    //去支付
    payToFunction: function payToFunction(event) {
        event.stopPropagation();
        setMaiDian(SWoDeDingDan.SCategory_SWoDeDingDan, SWoDeDingDan.SWoDeDingDan_QuZhiFu); //去支付
        //$(event.currentTarget).css("opacity", "0.6");
        delCookie("toOrderSuccess");
        setCookiePath("toOrderSuccess", "1", 1, "/;domain=picooc.com");
        // alert("测试toOrderSuccess:"+getCookie("toOrderSuccess"));

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

                window.location.href = "payment.html" + str + '&phoneNo=' + goodsInfo.phoneNo + '&orderId=' + goodsInfo.orderId + '&fromGo=1';
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
                window.location.href = "payment.html" + str + '&phoneNo=' + goodsInfo.phoneNo + '&orderUrl=' + goodsInfo.orderUrl + '&orderId=' + goodsInfo.orderId + '&fromGo=1';
            }
            // if (goodsInfo.sourceType == '浏览器')
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
    //可用优惠券可点击，跳转到售卖页面
    goToLink: function goToLink(event) {
        var link = event.currentTarget.getAttribute("data-link"); //设置埋点
        window.location.href = link;
    },
    //leftFunction
    leftFunction: function leftFunction() {
        window.history.go(-1);
    }
});

var FixBg = React.createClass({
    displayName: "FixBg",

    render: function render() {
        return React.createElement(
            "div",
            null,
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
    }
});

var Component = React.createClass({
    displayName: "Component",


    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(MyInfoBoxContainer, null),
            React.createElement(Public_error, null),
            React.createElement(FixBg, null)
        );
    }
});

ReactDOM.render(React.createElement(Component, null), document.getElementById('myInfoBox'));

/***/ })

},[221]);