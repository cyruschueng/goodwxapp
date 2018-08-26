webpackJsonp([23],{

/***/ 226:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
//var  $ = require('jquery');
var Public_error = __webpack_require__(3);
// 下单成功的icon
var OrderSuccessIcon = React.createClass({
    displayName: "OrderSuccessIcon",

    getInitialState: function getInitialState() {
        var titleData = {
            title: "下单成功",
            color: "",
            opacity: "",
            backgroundColor: "",
            backgroundOpacity: ""
        };
        titleData = JSON.stringify(titleData);
        appFc.controlTitle(titleData);
        return {};
    },
    //leftFunction
    leftFunction: function leftFunction() {
        window.location.href = 'productDetails.html?eventName=fatBurn&typeSize=1&refer=1&linkId=' + getParamByUrl('linkId');
    },
    render: function render() {
        var me = this;
        return React.createElement(
            "div",
            null,
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
                "div",
                { className: "head" },
                "\u606D\u559C\u60A8\u4E0B\u5355\u6210\u529F\uFF01"
            )
        );
    }
});
// 无称，下单成功提示
var OutAppTips = React.createClass({
    displayName: "OutAppTips",

    ClickHandle: function ClickHandle() {
        window.location.href = 'myInfo.html' + removeParamByUrl('orderId');
    },
    DownladClick: function DownladClick() {
        window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.picooc&g_f=991653';
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "bodytext" },
            React.createElement(
                "div",
                { className: "orderedtips" },
                React.createElement(
                    "div",
                    { className: "OutTips" },
                    React.createElement(
                        "p",
                        null,
                        "\u6FC0\u6D3B\u7801\u5DF2\u7ECF\u77ED\u4FE1\u53D1\u9001\u81F3\u60A8\u7684\u624B\u673A"
                    ),
                    React.createElement(
                        "p",
                        null,
                        "\u8BF7\u60A8",
                        React.createElement(
                            "em",
                            null,
                            "\u4E0B\u8F7D\u5E76\u6CE8\u518C"
                        ),
                        "\u6709\u54C1\xB7PICOOC\uFF0C"
                    ),
                    React.createElement(
                        "p",
                        null,
                        "\u6FC0\u6D3B\u60A8\u7684\u71C3\u8102\u8425\u670D\u52A1~"
                    )
                ),
                React.createElement("div", { className: "picoocIcon" })
            ),
            React.createElement(
                "div",
                { className: "searchBtnCon" },
                React.createElement(
                    "button",
                    { onClick: this.ClickHandle },
                    "\u67E5\u770B\u6211\u7684\u8BA2\u5355"
                ),
                React.createElement(
                    "button",
                    { onClick: this.DownladClick },
                    "\u4E0B\u8F7D\u6709\u54C1\xB7PICOOC"
                )
            )
        );
    }
});
// 有称，app版本过低，下单成功提示
var OrderedCon = React.createClass({
    displayName: "OrderedCon",

    ClickHandle: function ClickHandle() {
        window.location.href = 'myInfo.html' + removeParamByUrl('orderId');
    },
    DownladClick: function DownladClick() {
        window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.picooc&g_f=991653';
        console.log('2');
    },
    render: function render() {
        if (getParamByUrl('os') == 'android') {
            var buttonStyle = {
                'textAlign': 'center'
            };
            var shengji = {
                'display': 'none'
            };
        }
        return React.createElement(
            "div",
            { className: "bodytext" },
            React.createElement(
                "div",
                { className: "orderedtips" },
                React.createElement(
                    "div",
                    { className: "OutTips" },
                    React.createElement(
                        "p",
                        null,
                        "\u6FC0\u6D3B\u7801\u5DF2\u7ECF\u77ED\u4FE1\u53D1\u9001\u81F3\u60A8\u7684\u624B\u673A\uFF0C"
                    ),
                    React.createElement(
                        "p",
                        null,
                        " \u8BF7\u60A8",
                        React.createElement(
                            "em",
                            null,
                            "\u5347\u7EA7\u5E76\u767B\u5F55"
                        ),
                        "\u6709\u54C1\xB7PICOOC\uFF0C"
                    ),
                    React.createElement(
                        "p",
                        null,
                        "\u5728",
                        React.createElement(
                            "em",
                            null,
                            "\u3010\u6211\u7684-\u6211\u7684\u71C3\u8102\u8425\u3011"
                        ),
                        "\u4E2D\uFF0C\u6FC0\u6D3B\u60A8\u7684\u71C3\u8102\u8425\u670D\u52A1~"
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "searchBtnCon", style: buttonStyle },
                React.createElement(
                    "button",
                    { className: "searchBtn", onClick: this.ClickHandle },
                    "\u67E5\u770B\u6211\u7684\u8BA2\u5355"
                ),
                React.createElement(
                    "button",
                    { className: "updateBtn", onClick: this.DownladClick, style: shengji },
                    "\u5347\u7EA7\u6709\u54C1\xB7PICOOC"
                )
            )
        );
    }
});

// 有称，下单成功提示
var InnerAppTips = React.createClass({
    displayName: "InnerAppTips",

    ClickHandle: function ClickHandle() {
        window.location.href = 'myInfo.html' + removeParamByUrl('orderId');
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "bodytext" },
            React.createElement(
                "div",
                { className: "orderedtips innerappText" },
                React.createElement(
                    "div",
                    { className: "OutTips" },
                    React.createElement(
                        "p",
                        null,
                        "\u6FC0\u6D3B\u7801\u5DF2\u7ECF\u77ED\u4FE1\u53D1\u9001\u81F3\u60A8\u7684\u624B\u673A\uFF0C"
                    ),
                    React.createElement(
                        "p",
                        null,
                        " \u8BF7\u60A8",
                        React.createElement(
                            "em",
                            null,
                            "\u767B\u5F55\u6709\u54C1\xB7PICOOC\uFF0C"
                        )
                    ),
                    React.createElement(
                        "p",
                        null,
                        "\u5728",
                        React.createElement(
                            "em",
                            null,
                            "\u3010\u6211\u7684-\u6211\u7684\u71C3\u8102\u8425\u3011"
                        ),
                        "\u4E2D\uFF0C\u6FC0\u6D3B\u60A8\u7684\u71C3\u8102\u8425\u670D\u52A1~"
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "searchorder searchBtnCon" },
                React.createElement(
                    "button",
                    { onClick: this.ClickHandle },
                    "\u67E5\u770B\u6211\u7684\u8BA2\u5355"
                )
            )
        );
    }
});

var ContentBox = React.createClass({
    displayName: "ContentBox",


    render: function render() {
        var is_balance = getParamByUrl('isOwnPicooc');
        var webver = getParamByUrl('webver');
        var Content;
        if (is_balance == 1) {
            if (webver < 2) {
                Content = React.createElement(OrderedCon, null);
            } else {
                Content = React.createElement(InnerAppTips, null);
            }
        } else {
            Content = React.createElement(OutAppTips, null);
        }
        return React.createElement(
            "div",
            null,
            Content
        );
    }
});
ReactDOM.render(React.createElement(
    "div",
    null,
    React.createElement(OrderSuccessIcon, null),
    React.createElement(ContentBox, null)
), document.getElementById('orderedBox'));

/***/ })

},[226]);