webpackJsonp([18],{

/***/ 234:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
var Public_error = __webpack_require__(3);

var SGongGaoLieBiao = {
	SCategory_SGongGaoLieBiao: 5061500,
	SGongGaoLieBiao_TiaoZhuanGongGaoXiangQing: 5061501 //跳转到公告详情页
};

var ReportList = React.createClass({
	displayName: "ReportList",

	getInitialState: function getInitialState() {
		var me = this;
		me.getReportList();
		var titleData = {
			title: "公告列表",
			color: "",
			opacity: "",
			backgroundColor: "",
			backgroundOpacity: ""
		};
		titleData = JSON.stringify(titleData);
		appFc.controlTitle(titleData);
		return {
			reportList: []
		};
	},
	getReportList: function getReportList() {
		var me = this;
		var host = window.location.protocol + "//" + window.location.host;
		var finalUrl = host + "/v1/api/campStu/noticeList" + window.location.search;
		console.info(finalUrl);
		$.ajax({
			type: "get",
			url: finalUrl,
			dataType: "json",
			success: function success(data) {
				console.info(data);
				if (data.code == 200) {
					me.setState({ reportList: data.resp });
				} else {
					$(".error-main-t").html(data.result.message);
					$(".errorAlert").css("display", "block");
					$(".error-main").css("margin-top", -$(".error-main").height() / 2);
				}
			}
		});
	},
	//打开一个新的webWiew
	getNewWebWiew: function getNewWebWiew(url) {
		url = absoluteUrl + url;
		console.info(url);
		setMaiDian(SGongGaoLieBiao.SCategory_SGongGaoLieBiao, SGongGaoLieBiao.SGongGaoLieBiao_TiaoZhuanGongGaoXiangQing);
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
		document.documentElement.style.webkitTouchCallout = 'none';
	},
	render: function render() {
		var me = this;
		var reportList = [];
		if (me.state.reportList != "") {
			for (var i = 0; i < me.state.reportList.length; i++) {
				me.state.reportList[i].content = escapeContent(me.state.reportList[i].content);
				var reportDetialUrl = "reportDetial.html" + location.search + "&noticeId=" + me.state.reportList[i].id;

				reportList.push(React.createElement(
					"div",
					{ className: "report-item", key: i, onClick: me.getNewWebWiew.bind(this, reportDetialUrl) },
					React.createElement(
						"div",
						{ className: "item-title" },
						me.state.reportList[i].title
					),
					React.createElement("div", { className: "item-content", dangerouslySetInnerHTML: { __html: me.state.reportList[i].content } }),
					React.createElement(
						"div",
						{ className: "item-date" },
						me.state.reportList[i].createTime
					),
					React.createElement("div", { className: "item-icon" })
				));
			}
		} else {
			reportList.push(React.createElement("i", null));
		}
		return React.createElement(
			"div",
			{ className: "row reportList" },
			reportList
		);
	}
});

var Component = React.createClass({
	displayName: "Component",

	render: function render() {
		return React.createElement(
			"div",
			null,
			React.createElement(ReportList, null),
			React.createElement(Public_error, null)
		);
	}
});

ReactDOM.render(React.createElement(Component, null), document.getElementById('reportMain'));

/***/ })

},[234]);