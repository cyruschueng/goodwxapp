webpackJsonp([20],{

/***/ 232:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
var Public_error = __webpack_require__(3);
var STianWenJuanLingQuan = {
    SCategory_STianWenJuanLingQuan: 5081100,
    STianWenJuanLingQuan_LiJiXuYing: 5081101, //立即续营
    STianWenJuanLingQuan_WoZhiDaoLe: 5081102 //我知道了
};
var windowSearch = getCookie("windowSearch");
var ReceiveCouponContainer = React.createClass({
    displayName: "ReceiveCouponContainer",

    getInitialState: function getInitialState() {
        var me = this;
        $('body').height($(window).height());
        me.getCoupon();
        var titleData = {
            title: "有品燃脂营",
            color: "",
            opacity: "",
            backgroundColor: "",
            backgroundOpacity: ""
        };
        titleData = JSON.stringify(titleData);
        appFc.controlTitle(titleData);

        var getPageInfo = function getPageInfo() {
            var data = {
                iconType: 1,
                iconColor: "",
                backNum: 2,
                closeWebview: 0,
                hidden: false,
                isHandle: false,
                functionName: ""
            };
            return JSON.stringify(data);
        };
        appFc.controlLeft(getPageInfo());

        return {
            receiveCouponData: []
        };
    },

    render: function render() {
        var me = this;
        var data = [];
        var receiveCouponStr = "";
        var continueName = "";
        if (me.state.receiveCouponData.resp != undefined) {
            var showAside = me.state.receiveCouponData.resp.success ? "block" : "none";
            var hideAside = me.state.receiveCouponData.resp.success ? "none" : "block";
            data = me.state.receiveCouponData;
            receiveCouponStr = React.createElement(
                "section",
                { className: "container" },
                React.createElement(
                    "aside",
                    { className: "row receive receive1", style: { display: showAside } },
                    React.createElement(
                        "div",
                        { className: "col-xs-12 col-sm-12 status" },
                        React.createElement("img", { src: "image/_receiveCoupon/true.png", alt: "" })
                    ),
                    React.createElement(
                        "div",
                        { className: "col-xs-12 col-sm-12 status2" },
                        "\u9886\u53D6\u6210\u529F!"
                    ),
                    React.createElement(
                        "div",
                        { className: "col-xs-12 col-sm-12 content1", id: "rule" },
                        "\u606D\u559C\u60A8\u83B7\u5F97\u7EED\u8425\u4F18\u60E0\u5238\u53CA\u63D0\u524D\u8D2D\u4E70\u8D44\u683C\uFF0C\u70B9\u51FB\u4E0B\u65B9\u201C\u7ACB\u5373\u7EED\u8425\u201D"
                    ),
                    React.createElement(
                        "div",
                        { className: "row col-xs-12 col-sm-12 xuying" },
                        React.createElement(
                            "div",
                            { className: "col-xs-6 col-sm-6 continue", id: "name" },
                            data.resp.coupon.name
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
                                { className: "value2", id: "value" },
                                data.resp.coupon.value
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-xs-12 col-sm-12 term" },
                            "\u6709\u6548\u671F\uFF1A",
                            React.createElement(
                                "span",
                                { id: "beginTime" },
                                data.resp.coupon.beginTime
                            ),
                            " - ",
                            React.createElement(
                                "span",
                                { id: "endTime" },
                                data.resp.coupon.endTime
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-xs-12 col-sm-12 now saveCamp", onClick: me.saveCampFunction },
                        "\u7ACB\u5373\u7EED\u8425"
                    )
                ),
                React.createElement(
                    "aside",
                    { className: "row receive receive2", style: { display: hideAside } },
                    React.createElement(
                        "div",
                        { className: "col-xs-12 col-sm-12 status" },
                        React.createElement("img", { src: "image/_receiveCoupon/false.png" })
                    ),
                    React.createElement(
                        "div",
                        { className: "col-xs-12 col-sm-12 status2 statusFalse" },
                        "\u9886\u53D6\u5931\u8D25!"
                    ),
                    React.createElement(
                        "div",
                        { className: "col-xs-12 col-sm-12 content2" },
                        "\u5DF2\u7ECF\u9886\u8FC7\u672C\u5238\u4E86\u54E6\uFF5E"
                    ),
                    React.createElement(
                        "div",
                        { className: "col-xs-12 col-sm-12 girl" },
                        React.createElement("img", { src: "image/_receiveCoupon/girl.png" })
                    ),
                    React.createElement(
                        "div",
                        { className: "col-xs-12 col-sm-12 now iknow", onClick: me.iknowFunction },
                        "\u6211\u77E5\u9053\u4E86"
                    )
                )
            );
        }
        return React.createElement(
            "div",
            null,
            receiveCouponStr
        );
    },

    /*获取优惠券信息*/
    getCoupon: function getCoupon() {
        var me = this;
        var finalUrl = ajaxLink + "/v1/api/campCoupon/getCoupon" + windowSearch;
        //var finalUrl = ajaxLink + "/v1/api/campCoupon/getCoupon?userId=1620003&campId=20";//测试
        $.ajax({
            type: "get",
            url: finalUrl,
            dataType: "json",
            success: function success(data) {
                console.log(data);
                console.log(finalUrl);
                if (data.code == 200) {
                    me.setState({
                        receiveCouponData: data
                    });
                } else {
                    $(".error-main-t").html(data.result.message);
                    $(".errorAlert").css("display", "block");
                    $(".error-main").css("margin-top", -$(".error-main").height() / 2);
                }
            }
        });
    },

    /*我知道了*/
    iknowFunction: function iknowFunction() {
        setMaiDian(STianWenJuanLingQuan.SCategory_STianWenJuanLingQuan, STianWenJuanLingQuan.STianWenJuanLingQuan_WoZhiDaoLe);
        var getPageInfo = function getPageInfo() {
            var data = {
                backNum: 2, //默认为1，
                closeWebview: 0 //默认为0
            };
            return JSON.stringify(data);
        };
        appFc.deleteHistory(getPageInfo);
    },

    /*立即续营*/
    saveCampFunction: function saveCampFunction() {
        var me = this;
        setCookiePath("saveCampFrom", "1", 1, "/;domain=picooc.com");
        setMaiDian(STianWenJuanLingQuan.SCategory_STianWenJuanLingQuan, STianWenJuanLingQuan.STianWenJuanLingQuan_LiJiXuYing);
        var link = me.state.receiveCouponData.resp.link;
        var linkSearch = "";
        if (link.indexOf("?") >= 0) {
            linkSearch = '&' + link.split("?")[1];
            link = link.split("?")[0];
        }
        window.location.href = link + windowSearch + linkSearch;
    }
});

var Component = React.createClass({
    displayName: "Component",


    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(ReceiveCouponContainer, null),
            React.createElement(Public_error, null)
        );
    }
});

ReactDOM.render(React.createElement(Component, null), document.getElementById('receiveCouponBox'));

/***/ })

},[232]);