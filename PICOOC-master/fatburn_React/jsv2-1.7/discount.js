webpackJsonp([35],{

/***/ 209:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
var Public_error = __webpack_require__(3);
var SWoDeYouHuiQuan = {
    SCategory_SWoDeYouHuiQuan: 5080900,
    SWoDeYouHuiQuan_RanZhiYingYouHuiQuan: 5080901, //燃脂营优惠券
    SWoDeYouHuiQuan_GouChengYouHuiMa: 5080902, //购秤优惠码
    SWoDeYouHuiQuan_QianWangYouZan: 5080903 //前往有赞
};

var DiscountContainer = React.createClass({
    displayName: "DiscountContainer",


    getInitialState: function getInitialState() {
        var me = this;
        me.findCoupon();
        var titleData = {
            title: "燃脂营优惠券",
            color: "",
            opacity: "",
            backgroundColor: "",
            backgroundOpacity: ""
        };
        titleData = JSON.stringify(titleData);
        appFc.controlTitle(titleData);
        return {
            couponList: [],
            codeList: []
        };
    },
    render: function render() {
        var me = this;
        var displayCoupon = me.state.couponList.length > 0 ? "none" : "block";
        var displayCode = me.state.codeList.length > 0 ? "none" : "block";
        var strCoupon = [];
        var strCode = [];
        return React.createElement(
            "section",
            { className: "container" },
            React.createElement(
                "aside",
                { className: "row title" },
                React.createElement(
                    "div",
                    { className: "col-xs-6 col-sm-6 leftTitle leftBox", onClick: me.leftBoxFunction, ref: "leftBox" },
                    "\u71C3\u8102\u8425\u4F18\u60E0\u5238"
                ),
                React.createElement(
                    "div",
                    { className: "col-xs-6 col-sm-6 rightBox", onClick: me.rightBoxFunction, ref: "rightBox" },
                    "\u8D2D\u79E4\u4F18\u60E0\u7801"
                )
            ),
            React.createElement(
                "aside",
                { className: "row coupons", style: { display: 'block' } },
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
                                    { className: "col-xs-12 col-sm-12 goToSale", onClick: me.aaa },
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
                                { className: "col-xs-12 col-sm-12 goToSale", onClick: me.aaa },
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
                            { key: index, className: "row col-xs-12 col-sm-12 avail isAvail" },
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
                                    React.createElement(
                                        "p",
                                        { className: "zanNum" },
                                        item.coupon_code,
                                        "\xA0",
                                        React.createElement(
                                            "span",
                                            {
                                                "data-code": item.coupon_code, className: "copy copy3",
                                                onClick: me.copyFunction },
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
                            { key: index, className: "row col-xs-12 col-sm-12 avail notAvail" },
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
                                    React.createElement(
                                        "p",
                                        { className: "zanNum zanNum2" },
                                        item.coupon_code,
                                        "\xA0",
                                        React.createElement(
                                            "span",
                                            {
                                                className: "copy copy2" },
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
                            React.createElement("img", { className: "status", src: "image/withoutCamp/coupon3.png" }),
                            React.createElement(
                                "div",
                                { className: "col-xs-12 col-sm-12 goTo goTo2" /*onClick={me.goToFunction}*/ },
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
        var finalUrl = ajaxLink + "/v1/api/campCoupon/findCoupon" + window.location.search;
        $.ajax({
            type: "get",
            url: finalUrl,
            dataType: "json",
            success: function success(data) {
                console.log(data);
                console.log(finalUrl);
                if (data.code == 200) {

                    me.setState({
                        couponList: data.resp.couponList,
                        codeList: data.resp.codeList
                    });
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
        event.stopPropagation();
        var copycontent = event.currentTarget.getAttribute("data-code");
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
        $(me.refs.leftBox).addClass('leftTitle').next().removeClass('rightTitle');
        $('.coupons').show();
        $('.couponCode').hide();
    },
    /*切换到优惠码*/
    rightBoxFunction: function rightBoxFunction(event) {
        var me = this;
        setMaiDian(SWoDeYouHuiQuan.SCategory_SWoDeYouHuiQuan, SWoDeYouHuiQuan.SWoDeYouHuiQuan_GouChengYouHuiMa);
        $(me.refs.rightBox).addClass('rightTitle').prev().removeClass('leftTitle');
        $('.couponCode').show();
        $('.coupons').hide();
    },

    //可用优惠券可点击，跳转到售卖页面
    goToLink: function goToLink(event) {
        var link = event.currentTarget.getAttribute("data-link"); //设置埋点
        window.location.href = link + '&' + window.location.search.substring(1);
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
            React.createElement(DiscountContainer, null),
            React.createElement(Public_error, null),
            React.createElement(FixBg, null)
        );
    }
});

ReactDOM.render(React.createElement(Component, null), document.getElementById('discountBox'));

/***/ })

},[209]);