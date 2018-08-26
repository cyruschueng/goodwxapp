webpackJsonp([24],{

/***/ 225:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
var Public_error = __webpack_require__(3);

var SXiaDanChengGong = {
    SCategory_SXiaDanChengGong: 5080600,
    SXiaDanChengGong_LiJiTianXieWenJuan: 5080601 //立即填写问卷
};

var OrderSuccess = React.createClass({
    displayName: "OrderSuccess",

    getInitialState: function getInitialState() {
        var getPageInfo = function getPageInfo() {
            var data = {
                title: "下单成功",
                /*isShare:false,
                backgroundColor:'#2c2f31'*/
                color: "",
                opacity: "",
                backgroundColor: "",
                backgroundOpacity: ""
            };
            return JSON.stringify(data);
        };
        appFc.controlTitle(getPageInfo());
        var getControl = function getControl() {
            setCookiePath("toOrderDetails", "2", 1, "/;domain=picooc.com");
            // setCookie("toOrderDetails","2",1); //在cookie中存放跳转到订单详情页面的标识 2为从下单成功页面跳转的
            window.location.href = "orderDetails.html" + window.location.search;
        };
        window.getControl = getControl;
        var getPageInfo6 = function getPageInfo6() {
            var data = {
                iconType: 1, //0走图片逻辑，1走文案逻辑
                rightStr: {
                    str: "查看",
                    color: "",
                    opacity: "",
                    id: "0",
                    type: "0",
                    functionName: "getControl",
                    redDotType: "1",
                    redDotShow: false,
                    redDotNum: "0",
                    nativeType: "",
                    content: ""
                },
                rightIcon: []
            };
            return JSON.stringify(data);
        };
        appFc.controlRight(getPageInfo6());
        var deviceType = isMobile();
        if (deviceType == "isApp" && getParamByUrl("testtype") != "tanchao") {
            // alert(getCookie("toOrderSuccess"));
            if (getCookie("toOrderSuccess") == "1") {
                //如果是从订单列表支付
                var getPageInfo = function getPageInfo() {
                    var data = {
                        iconType: 1,
                        iconColor: "",
                        backNum: 1,
                        closeWebview: 0,
                        hidden: false,
                        isHandle: false,
                        functionName: ""
                        //isRefreshPage:true
                    };
                    return JSON.stringify(data);
                };
                appFc.controlLeft(getPageInfo());
            } else if (getCookie("toOrderSuccess") == "2") {
                var getPageInfo = function getPageInfo() {
                    //如果是从订单详情支付
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
            } else {
                //如果是从确认订单支付
                var getPageInfo = function getPageInfo() {
                    var data = {
                        iconType: 1,
                        iconColor: "",
                        backNum: 0,
                        closeWebview: 1,
                        hidden: false,
                        isHandle: false,
                        functionName: ""
                        //isRefreshPage:true
                    };
                    return JSON.stringify(data);
                };
                appFc.controlLeft(getPageInfo());
            }
        }
        return {};
    },
    ToQuestion: function ToQuestion(event) {
        var _$$ajax;

        event.stopPropagation();
        var ele = event.currentTarget;
        $(ele).css("opacity", "0.6");
        setMaiDian(SXiaDanChengGong.SCategory_SXiaDanChengGong, SXiaDanChengGong.SXiaDanChengGong_LiJiTianXieWenJuan);
        setCookie("toQuestionnaire", "1", 1);
        var finalUrl = location.origin + "/v1/api/campQuestion/complete" + window.location.search;
        $.ajax((_$$ajax = {
            url: finalUrl,
            type: "get"
        }, _defineProperty(_$$ajax, "url", finalUrl), _defineProperty(_$$ajax, "dataType", "json"), _defineProperty(_$$ajax, "success", function success(data) {
            if (data.code == 200) {
                // 填写过问卷
                if (data.resp.profile == true) {
                    var url = absoluteUrl + "questionnaireShow.html" + window.location.search;
                    var getPageInfo = function getPageInfo() {
                        var data = {
                            link: url,
                            animation: 1 //默认1从右到左，2从下到上
                        };
                        return JSON.stringify(data);
                    };
                    var deviceType = isMobile();
                    if (deviceType == "isApp") {
                        appFc.openWebview(getPageInfo());
                    } else {
                        window.location.href = url;
                    }
                } else {
                    // 未填写过
                    var url = absoluteUrl + "questionnaire2.html" + window.location.search;
                    var getPageInfo = function getPageInfo() {
                        var data = {
                            link: url,
                            animation: 1 //默认1从右到左，2从下到上
                        };
                        return JSON.stringify(data);
                    };
                    var deviceType = isMobile();
                    if (deviceType == "isApp") {
                        appFc.openWebview(getPageInfo());
                    } else {
                        window.location.href = url;
                    }
                }
            } else {
                $(".error-main-t").html(data.message);
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".error-main").height() / 2);
            }
        }), _defineProperty(_$$ajax, "error", function error() {
            $(".error-main-t").html('网络错误~');
            $(".errorAlert").css("display", "block");
            $(".error-main").css("margin-top", -$(".error-main").height() / 2);
        }), _$$ajax));
        var getPageInfo = function getPageInfo() {
            var data = {
                link: url,
                animation: 1 //默认1从右到左，2从下到上
            };
            return JSON.stringify(data);
        };
        var deviceType = isMobile();
        if (deviceType == "isApp" && getParamByUrl("testtype") != "tanchao") {
            appFc.openWebview(getPageInfo());
        } else {
            window.location.href = url;
        }
    },
    render: function render() {

        return React.createElement(
            "section",
            { className: "container" },
            React.createElement(
                "aside",
                { className: "row sucess" },
                React.createElement("img", { src: "image/withoutCamp/order1.png", alt: "" }),
                React.createElement("br", null),
                React.createElement(
                    "span",
                    { className: "span1" },
                    "\u606D\u559C\u60A8\u4E0B\u5355\u6210\u529F!"
                ),
                React.createElement("br", null)
            ),
            React.createElement(
                "aside",
                { className: "row leadQuestion" },
                React.createElement(
                    "p",
                    null,
                    "\u7ACB\u5373\u586B\u5199",
                    React.createElement(
                        "span",
                        { className: "greenfont" },
                        "\u300A\u5165\u8425\u524D\u8C03\u67E5\u95EE\u5377\u300B"
                    )
                ),
                React.createElement(
                    "p",
                    null,
                    "\u83B7\u53D6\u60A8\u7684\u4E13\u5C5E\u5B9A\u5236\u670D\u52A1"
                )
            ),
            React.createElement(
                "aside",
                { className: "row questionImg" },
                React.createElement("img", { className: "Img1", src: "image/withoutCamp/bg14.png" })
            ),
            React.createElement(
                "aside",
                { className: "row" },
                React.createElement(
                    "div",
                    { className: "viewOrder toQuestion", onClick: this.ToQuestion },
                    "\u7ACB\u5373\u586B\u5199\u95EE\u5377"
                )
            )
        );
    }
});

ReactDOM.render(React.createElement(OrderSuccess, null), document.getElementById('orderSuccess_container'));

/***/ })

},[225]);