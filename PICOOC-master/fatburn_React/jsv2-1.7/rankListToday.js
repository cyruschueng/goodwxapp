webpackJsonp([14],{

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
//var RankListError = require("./RankListError");
//var RankListContainer = require("./RankListContainer");
//var PubSub = require("pubsub-js");
var Public_error = __webpack_require__(3);
var SPaiHangBang = {
	SCategory_SPaiHangBang: 5061400,
	SPaiHangBang_TiaoZhuanGeRenZhuYe: 5061401, //跳转个人主页
	SPaiHangBang_FenXiangPaiHangBang: 5061402 //分享排行榜
};
var RankListContainer = React.createClass({
	displayName: "RankListContainer",

	getInitialState: function getInitialState() {
		var me = this;
		me.getRankListFc();
		return {
			warningShow: false, //是否显示不再提示
			RankData: {}
		};
	},
	render: function render() {
		//render渲染两次
		var me = this;
		var list = [];
		var data = me.state.RankData;
		var rankTime = "";
		var campName = "";
		var rankLists = "";
		var infoUrl = "";
		var targetRoleId = getParamByUrl("roleId");
		var classID = getParamByUrl("campId");
		if (data.resp != undefined && data.resp.stuList.length > 0) {
			rankLists = data.resp.stuList;
			rankTime = data.resp.day;
			var isOverCamp = getParamByUrl("targetCampId") == "false" ? false : true;
			if (isOverCamp) {
				campName = data.resp.campName;
			} else {
				campName = "第" + data.resp.week + "周减脂排名";
			}

			me.clientControlFun(data.resp.roleName);
		}

		if (typeof me.state.RankData.resp != "undefined") {
			var listLength = data.resp.stuList.length;
			var num = [];
			var rankIcon = [];

			var warningStr = React.createElement(
				"div",
				{ className: "warningBox", style: { display: me.state.warningShow == true ? 'block' : 'none' }, key: 999 },
				React.createElement("span", { className: "leftBorder" }),
				React.createElement(
					"p",
					{ className: "tips" },
					"\u6253\u5361\u6B21\u6570\u4E3A\u4ECA\u65E5\u65E9\u9910\u3001\u5348\u9910\u3001\u665A\u9910\u548C\u8FD0\u52A8\u6253\u5361\u6570\u603B\u548C\uFF0C\u540C\u7C7B\u6807\u7B7E\u591A\u6B21\u6253\u5361\u4E0D\u91CD\u590D\u8BA1\u7B97\u3002"
				),
				React.createElement(
					"span",
					{ className: "notShow", onClick: me.notShowFun },
					"\u4E0D\u518D\u63D0\u793A"
				)
			);
			list.push(warningStr);

			for (var i = 0; i < listLength; i++) {
				if (i < 3) {
					var name = "userRank userRank" + (i + 1);
					num = React.createElement(
						"span",
						{ className: name, key: i },
						i + 1
					);
					var iconImg = "";
					if (i == 0) {
						iconImg = "http://cdn2.picooc.com/web/res/fatburn/image/rankList/jin.png";
					} else if (i == 1) {
						iconImg = "http://cdn2.picooc.com/web/res/fatburn/image/rankList/yin.png";
					} else {
						iconImg = "http://cdn2.picooc.com/web/res/fatburn/image/rankList/tong.png";
					}
					rankIcon = React.createElement("img", { className: "rankIcon", src: iconImg, key: i + 3 });
				} else {
					var name = "userRank userRank" + (i + 1);
					num = React.createElement(
						"span",
						{ className: name, key: i },
						i + 1
					);
					rankIcon = [];
				}

				infoUrl = "studentOtherInfo.html" + window.location.search + "&targetRoleId=" + rankLists[i].roleId + "&targetCampId=" + classID;
				if (roleId == rankLists[i].roleId) {
					infoUrl = "studentStudentInfo.html" + window.location.search + "&targetRoleId=" + rankLists[i].roleId + "&targetCampId=" + classID;
				} else {
					infoUrl = "studentOtherInfo.html" + window.location.search + "&targetRoleId=" + rankLists[i].roleId + "&targetCampId=" + classID;
				}

				list.push(React.createElement(
					"div",
					{ className: "row rankItem", key: i, "data-index": i, onClick: me.getNewWebView, "data-info-url": infoUrl },
					React.createElement(
						"div",
						{ className: "rankLeft col-xs-6 col-sm-6" },
						React.createElement("img", { className: "userHeader", src: data.resp.stuList[i].url, onError: imgError.bind(this, data.resp.stuList[i].sex) }),
						React.createElement(
							"span",
							{ className: "userName" },
							data.resp.stuList[i].name
						),
						rankIcon,
						React.createElement("img", { className: "userSex", style: { 'display': 'none' }, src: data.resp.stuList[i].sex == 0 ? "http://cdn2.picooc.com/web/res/fatburn/image/rankList/girl.png" : "http://cdn2.picooc.com/web/res/fatburn/image/rankList/boy.png" }),
						num
					),
					React.createElement(
						"div",
						{ className: "rankRight col-xs-6 col-sm-6" },
						React.createElement(
							"div",
							{ className: "row" },
							React.createElement(
								"div",
								{ className: "col-xs-6 col-sm-6 checkNumBox" },
								React.createElement(
									"div",
									{ className: "paramName" },
									"\u6253\u5361\u6B21\u6570"
								),
								React.createElement(
									"div",
									null,
									React.createElement(
										"span",
										{ className: "fatNum" },
										data.resp.stuList[i].checkNum
									),
									"\u6B21"
								)
							),
							React.createElement(
								"div",
								{ className: "col-xs-6 col-sm-6" },
								React.createElement(
									"div",
									{ className: "paramName" },
									"\u5E73\u5747\u5206\u6570"
								),
								React.createElement(
									"div",
									null,
									React.createElement(
										"span",
										{ className: "fatNum" },
										data.resp.stuList[i].average
									),
									"\u5206"
								)
							)
						)
					)
				));
			}
		}

		return React.createElement(
			"div",
			{ className: "container" },
			React.createElement(
				"div",
				{ className: "row rankTitle", style: { 'display': 'none' } },
				React.createElement(
					"div",
					null,
					React.createElement("img", { src: "http://cdn2.picooc.com/web/res/fatburn/image/rankList/start.png" }),
					React.createElement(
						"span",
						{ className: "title" },
						campName
					),
					React.createElement("img", { src: "http://cdn2.picooc.com/web/res/fatburn/image/rankList/start.png" })
				),
				React.createElement(
					"div",
					{ className: "rankTime" },
					"\u66F4\u65B0\u65F6\u95F4: ",
					rankTime
				)
			),
			React.createElement(
				"div",
				{ className: "row rankList" },
				list
			)
		);
	},
	getRankListFc: function getRankListFc() {
		var me = this;
		var targetRoleId = getParamByUrl("roleId");
		var classID = getParamByUrl("campId");
		var host = window.location.protocol + "//" + window.location.host;
		var finalUrl = host + "/v1/api/campCommon/dailyCampList" + window.location.search;
		//var finalUrl="http://pm.picooc.com:9989/v1/api/campCommon/dailyCampList"+window.location.search;
		//console.info(finalUrl);
		$.ajax({
			type: "get",
			url: finalUrl,
			dataType: "json",
			success: function success(data) {
				console.log(data);
				if (data.code == 200) {

					if (typeof me.state.RankData.resp != "undefined") {
						if (me.state.RankData.resp.stuList.length > 0) {
							data.resp.stuList = me.state.RankData.resp.stuList.concat(data.resp.stuList);
						}
					}
					me.setState({ RankData: data });

					if (getCookie('rankListTodayTip') != 1) {
						me.setState({ warningShow: true });
					}
				} else {
					// alert("服务器开小差了～");
					$(".error-main-t").html("服务器开小差了～");
					$(".errorAlert").css("display", "block");
					$(".error-main").css("margin-top", -$(".error-main").height() / 2);
				}
			}
		});
	},

	//点击：不再提示
	notShowFun: function notShowFun() {
		var me = this;
		setCookie('rankListTodayTip', 1, 365);
		me.setState({ warningShow: false });
	},

	//打开一个新的webWiew
	getNewWebView: function getNewWebView(event) {

		//$(event.currentTarget).addClass('rankItemActive');

		var url = absoluteUrl + event.currentTarget.getAttribute("data-info-url");

		//setMaiDian(SPaiHangBang.SCategory_SPaiHangBang,SPaiHangBang.SPaiHangBang_TiaoZhuanGeRenZhuYe);
		console.info(url);
		var getPageInfo = function getPageInfo() {
			var data = {
				link: url,
				animation: 1 //默认1从右到左，2从下到上
			};
			return JSON.stringify(data);
		};
		//appFc.openWebview(getPageInfo());
		var deviceType = isMobile();
		if (deviceType == "isApp" && getParamByUrl("testtype") != "tanchao") {
			if (getParamByUrl('webver') > 2) {
				appFc.openWebview(getPageInfo());
			} else {
				mobileApp.openWebview(getPageInfo());
			}
		} else {
			window.location.href = url;
		}
	},

	//客户端控制left, title, right
	clientControlFun: function clientControlFun(userName) {

		//控制左上角
		if (getParamByUrl('webver') > 2) {
			var getPageInfo1 = function getPageInfo1() {
				var data = {
					iconType: 0,
					iconColor: "",
					backNum: 1,
					closeWebview: 0,
					hidden: false,
					isHandle: false,
					functionName: ""
				};
				return JSON.stringify(data);
			};
			appFc.controlLeft(getPageInfo1());
		} else {
			var getPageInfo11 = function getPageInfo11() {
				var data = {
					iconType: 0, //0:默认箭头，1：叉，2：iconUrl传图片
					backNum: 1,
					closeWebview: 0, //默认为0
					iconUrl: "",
					hidden: false,
					isHandle: false,
					functionName: ""
				};
				return JSON.stringify(data);
			};
			if (deviceType == "isApp" && typeof mobileApp != "undefined") {
				mobileApp.showLeftBtn(getPageInfo11());
			}
			document.documentElement.style.webkitTouchCallout = 'none';
		}

		//title right
		if (getParamByUrl('webver') > 2) {
			//高版本

			//控制title
			var titleData = {
				title: "今日打卡排名",
				color: "",
				opacity: "",
				backgroundColor: "",
				backgroundOpacity: ""
			};
			titleData = JSON.stringify(titleData);
			appFc.controlTitle(titleData);

			//右上角：设置截图分享数据
			var iconUrl = "";
			var iconShare = ["https://cdn2.picooc.com/web/res/event/chrome/android_share.png", "https://cdn2.picooc.com/web/res/event/chrome/ios_share.png"];
			//var iconShare = ["https://cdn2.picooc.com/web/res/event/chrome/android_shareNew.png", "https://cdn2.picooc.com/web/res/event/chrome/ios_shareNew.png"];
			if (getParamByUrl("os") == "android") {
				iconUrl = iconShare[0];
			} else {
				iconUrl = iconShare[1];
			}
			var getPageInfo2 = function getPageInfo2() {
				var data5 = {
					iconType: 0, //0走图片逻辑，1走文案逻辑
					rightStr: {
						str: "",
						color: "",
						opacity: "",
						id: "0"
					},
					rightIcon: [{
						type: "1",
						id: "1",
						functionName: "",
						iconUrl: iconUrl,
						iconName: "分享",
						redDotType: "1",
						redDotShow: false,
						redDotNum: "0",
						nativeType: "0",
						content: {
							shareTitle: '有品·燃脂营',
							shareUrl: "",
							shareIcon: "",
							shareDesc: '#有品燃脂营，随时减脂有效塑形#@有品PICOOC',
							shareTag: "",
							shareType: 1,
							shareBackgroundColor: "#eeeff3",
							shareTypeDesc: "有品燃脂营 · 打卡排名",
							fatBurnName: userName
						}
					}]
				};
				return JSON.stringify(data5);
			};
			appFc.controlRight(getPageInfo2());
		} else {
			//低版本
			var getPageInfo4 = function getPageInfo4() {
				var data = {
					title: '今日打卡排名',
					backgroundColor: '#eeeff3',
					isShare: true,
					shareTitle: '有品·燃脂营',
					shareUrl: "",
					shareIcon: '',
					shareDesc: '#有品燃脂营，随时减脂有效塑形#@有品PICOOC',
					shareType: 1,
					shareTypeDesc: "",
					color: "",
					opacity: "",
					backgroundOpacity: ""
				};
				return JSON.stringify(data);
			};
			var deviceType = isMobile();
			if (deviceType == "isApp" && typeof mobileApp != "undefined") {
				mobileApp.getShareInfo(getPageInfo4());
			}
			document.documentElement.style.webkitTouchCallout = 'none';
		}
	}
});

var Component = React.createClass({
	displayName: "Component",


	render: function render() {
		return React.createElement(
			"div",
			null,
			React.createElement(RankListContainer, null),
			React.createElement(Public_error, null)
		);
	}
});

ReactDOM.render(React.createElement(Component, null), document.getElementById('main'));

/***/ })

},[247]);