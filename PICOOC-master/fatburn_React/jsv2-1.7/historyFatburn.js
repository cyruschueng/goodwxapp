webpackJsonp([31],{

/***/ 216:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
var Public_Error = __webpack_require__(3);
var PubSub = __webpack_require__(2);

var HistoryList = React.createClass({
    displayName: "HistoryList",


    render: function render() {
        var HistoryListData = this.props.HistoryListData;
        var index = this.props.index;
        var hrefUrl = "student.html" + window.location.search + "&targetCampId=";
        return React.createElement(
            "a",
            { className: "historyItem row", key: index, href: hrefUrl + HistoryListData[index].id },
            React.createElement(
                "div",
                { className: "title" },
                React.createElement(
                    "span",
                    null,
                    "\u71C3\u8102\u8425 ",
                    React.createElement(
                        "span",
                        { className: "theBlod" },
                        HistoryListData[index].name
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "date" },
                React.createElement(
                    "span",
                    null,
                    HistoryListData[index].beginTime + '-',
                    HistoryListData[index].endTime
                )
            )
        );
    }
});

var HistoryContainer = React.createClass({
    displayName: "HistoryContainer",

    getInitialState: function getInitialState() {
        var tdata = {
            title: '历史燃脂营',
            color: "",
            opacity: "",
            backgroundColor: "",
            backgroundOpacity: ""
        };
        tdata = JSON.stringify(tdata);
        appFc.controlTitle(tdata);
        return {
            hrefUrl: '',
            HistoryListData: []
        };
    },
    componentWillMount: function componentWillMount() {
        var campId = getParamByUrl("campId");
        var host = window.location.protocol + "//" + window.location.host;
        var finalUrl = host + "/v1/api/campStu/getCampHistory" + window.location.search + "&campId=" + campId;
        this.serverRequet = $.get(finalUrl, function (data) {
            if (data.code == 200) {
                var searchUrl = removeParamByUrl("targetCampId");
                this.setState({
                    HistoryListData: data.resp
                });
            } else {
                $(".error-main-t").html(data.result.message);
                $(".errorAlert").css("display", "block");
                $(".error-main").css("margin-top", -$(".error-main").height() / 2);
            }
        }.bind(this));
    },
    componentWillUnmount: function componentWillUnmount() {
        this.serverRequet.abort();
    },
    componentDidMount: function componentDidMount() {
        $(".container").css("minHeight", $(window).height());
    },
    render: function render() {
        var HistoryListData = this.state.HistoryListData;
        var listHTML = [];
        for (var i = 0; i < HistoryListData.length; i++) {
            listHTML.push(React.createElement(HistoryList, { HistoryListData: HistoryListData, key: i, index: i }));
        }
        return React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                { className: "historyList row" },
                listHTML
            ),
            React.createElement(Public_Error, null)
        );
    }
});

ReactDOM.render(React.createElement(HistoryContainer, null), document.getElementById('container'));

/***/ })

},[216]);