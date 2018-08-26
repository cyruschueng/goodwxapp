webpackJsonp([37],{

/***/ 206:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
var Public_error = __webpack_require__(3);
var BodyChange = React.createClass({
	displayName: "BodyChange",

	getInitialState: function getInitialState() {
		var bodyTitleData = {
			title: "指标对比",
			color: "",
			opacity: "",
			backgroundColor: "",
			backgroundOpacity: ""
		};
		bodyTitleData = JSON.stringify(bodyTitleData);
		appFc.controlTitle(bodyTitleData);
		var getPageInfo = function getPageInfo() {
			var data = {
				iconType: 0,
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
		return {
			bodyData: [],
			showAge: '',
			startTime: '',
			endTime: '',
			periodDetail: '',
			period: '',
			iconImgUrl: ''
		};
	},
	componentDidMount: function componentDidMount() {
		var _this = this;
		var host = window.location.protocol + "//" + window.location.host;
		var finalUrl = host + "/v1/api/camp/getContrast" + window.location.search;
		this.serverRequest = $.get(finalUrl, function (data) {
			if (data.code == 200) {
				var targetRoleId = getParamByUrl("targetRoleId");
				var roleId = getParamByUrl("roleId");
				if (data.resp.flag == 1) {
					this.refs.bodyChange.style.display = 'block';
					this.refs.message.style.display = 'none';
					/*获取对比周期数据交互--开始与结束*/
					var startTime = data.resp.start,
					    endTime = data.resp.end;
					// 获取各项指标数据
					var bodyData = data.resp.data;
					// 获取身体年龄的标识
					var showAge = data.resp.showAge;
					// 获取数据来源
					var period = data.resp.period,
					    periodDetail = data.resp.periodDetail,
					    iconImgUrl = data.resp.url;
					// 存储获取的数据
					this.setState({
						'bodyData': bodyData,
						'showAge': showAge,
						'startTime': startTime,
						'endTime': endTime,
						'period': period,
						'periodDetail': periodDetail,
						'iconImgUrl': iconImgUrl
					});
					/*测量时段数据交互--结束*/
					if (targetRoleId == "false" || targetRoleId == "" || targetRoleId == roleId) {
						this.appShare(true, data.resp.roleName);
					} else {
						this.appShare(false, data.resp.roleName);
					}
				} else {
					this.refs.bodyChange.style.display = 'none';
					this.refs.message.style.display = 'block';
					appShare(false, data.resp.roleName);
				}
			} else {
				this.refs.bodyChange.style.display = 'none';
				this.refs.message.style.display = 'block';
				this.refs.message.textContent = "服务器开小差了，请稍候再试~";
			}
		}.bind(this));
	},
	componentWillUnmount: function componentWillUnmount() {
		this.serverRequest.abort();
	},
	appShare: function appShare(isShare, userName) {
		//中间title
		var getPageInfo = function getPageInfo() {
			var data = {
				title: "指标对比",
				color: "",
				opacity: "",
				backgroundColor: "",
				backgroundOpacity: ""
			};
			return JSON.stringify(data);
		};
		appFc.controlTitle(getPageInfo());
		//右上角
		if (isShare) {
			var iconUrl = "";
			var iconShare = ["https://cdn2.picooc.com/web/res/event/chrome/android_share.png", "https://cdn2.picooc.com/web/res/event/chrome/ios_share.png"];
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
							shareType: 1, //截图分享
							shareBackgroundColor: "#ffffff",
							shareTypeDesc: "有品燃脂营 · 指标对比",
							fatBurnName: userName
						}
					}]
				};
				return JSON.stringify(data5);
			};
			appFc.controlRight(getPageInfo2());
		}
	},
	render: function render() {
		var bodyChange_title = {
			'height': $(window).width() / 750 * 80,
			'lineHeight': $(window).width() / 750 * 80 + "px"
		},
		    dataList = this.state.bodyData,
		    showAge = this.state.showAge,
		    period = this.state.period,
		    periodDetail = this.state.periodDetail,
		    iconImgUrl = this.state.iconImgUrl,
		    startTime = this.state.startTime,
		    endTime = this.state.endTime;
		var list = [];
		var BodyChange_li_info = [{
			icon: "http://cdn2.picooc.com/web/res/fatburn/image/bodyChange/weight.png",
			name: "体重"
		}, {
			icon: "http://cdn2.picooc.com/web/res/fatburn/image/bodyChange/fat.png",
			name: "脂肪"
		}, {
			icon: "http://cdn2.picooc.com/web/res/fatburn/image/bodyChange/muscle.png",
			name: "肌肉"
		}, {
			icon: "http://cdn2.picooc.com/web/res/fatburn/image/bodyChange/innerFat.png",
			name: "内脏脂肪"
		}, {
			icon: "http://cdn2.picooc.com/web/res/fatburn/image/bodyChange/circulation.png",
			name: "基础代谢"
		}, {
			icon: "http://cdn2.picooc.com/web/res/fatburn/image/bodyChange/protein.png",
			name: "蛋白质"
		}, {
			icon: "http://cdn2.picooc.com/web/res/fatburn/image/bodyChange/bone.png",
			name: "骨量"
		}, {
			icon: "http://cdn2.picooc.com/web/res/fatburn/image/bodyChange/water.png",
			name: "水分"
		}, {
			icon: "http://cdn2.picooc.com/web/res/fatburn/image/bodyChange/bmi.png",
			name: "BMI"
		}, {
			icon: "http://cdn2.picooc.com/web/res/fatburn/image/bodyChange/bodyAge.png",
			name: "身体年龄"
		}];
		for (var i = 0; i < dataList.length; i++) {
			list.push(React.createElement(BodyChange_li, { BodyChange_li_info: BodyChange_li_info, dataList: dataList, index: i, key: i }));
		};
		return React.createElement(
			"div",
			null,
			React.createElement(
				"div",
				{ className: "bodyChange", ref: "bodyChange" },
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"div",
						{ className: "bodyChange-title", style: bodyChange_title, ref: "bodyChange_title" },
						React.createElement(
							"span",
							{ className: "start-time", ref: "start_time" },
							startTime
						),
						React.createElement(
							"span",
							{ className: "end-time", ref: "end_time" },
							endTime
						)
					)
				),
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"div",
						{ className: "col-xs-12 col-sm-12 bodyChange-content", ref: "bodyChange_content" },
						list
					)
				),
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"div",
						{ className: "bodyChange-bottom" },
						React.createElement(
							"div",
							{ className: "measure-time" },
							"\u6570\u636E\u6765\u6E90\uFF1A",
							React.createElement("img", { src: iconImgUrl }),
							React.createElement(
								"span",
								null,
								period + '[' + periodDetail + ']'
							)
						)
					)
				)
			),
			React.createElement(
				"div",
				{ className: "message", ref: "message" },
				"\u6682\u65E0\u53EF\u5BF9\u6BD4\u7684\u6570\u636E\u54E6\uFF0C\u8D76\u7D27\u4E0A\u79E4\u6D4B\u91CF\u5427~"
			)
		);
	}
});
var BodyChange_li = React.createClass({
	displayName: "BodyChange_li",

	render: function render() {
		var bodyChange_container = {
			'height': $(window).width() / 750 * 90,
			'lineHeight': $(window).width() / 750 * 90 + "px"
		},
		    bodyChange_tagName = {
			"lineHeight": $(window).width() / 750 * 90 + "px"
		},
		    bodyChange_lowNum = {
			"lineHeight": $(window).width() / 750 * 90 + "px"
		},
		    bodyChange_highNum = {
			"lineHeight": $(window).width() / 750 * 90 + "px"
		},
		    bodyChange_lastImg = {
			"top": ($(window).width() / 750 * 90 - 0.4375 * parseInt($("html").css("font-size")) * 15 / 12) / 2
		},
		    bodyChange_icon = {
			"top": ($(window).width() / 750 * 90 - 1.25 * parseInt($("html").css("font-size"))) / 2
		};
		var BodyChange_li_info = this.props.BodyChange_li_info;
		var dataList = this.props.dataList;
		var index = this.props.index;
		var imgarr = [];
		if (dataList[index][2] == 0) {
			imgarr.push(React.createElement("img", { className: "bodyChange-lastImg", key: 0, src: "http://cdn2.picooc.com/web/res/fatburn/image/bodyChange/4-10.png", style: bodyChange_lastImg }));
		} else if (dataList[index][2] == 1) {
			imgarr.push(React.createElement("img", { className: "bodyChange-lastImg", key: 1, src: "http://cdn2.picooc.com/web/res/fatburn/image/bodyChange/4-12.png", style: bodyChange_lastImg }));
		} else if (dataList[index][2] == 2) {
			imgarr.push(React.createElement("img", { className: "bodyChange-lastImg", key: 2, src: "http://cdn2.picooc.com/web/res/fatburn/image/bodyChange/4-11.png", style: bodyChange_lastImg }));
		} else if (dataList[index][2] == 3) {
			imgarr.push(React.createElement("img", { className: "bodyChange-lastImg", key: 3, src: "http://cdn2.picooc.com/web/res/fatburn/image/bodyChange/4-13.png", style: bodyChange_lastImg }));
		} else {
			imgarr.push(React.createElement("img", { className: "bodyChange-lastImg", key: 4, src: "http://cdn2.picooc.com/web/res/fatburn/image/bodyChange/4-14.png", style: bodyChange_lastImg }));
		}
		return React.createElement(
			"div",
			{ className: "bodyChange-container", style: bodyChange_container, key: index },
			React.createElement("img", { className: "bodyChange-icon", style: bodyChange_icon, src: BodyChange_li_info[index].icon }),
			React.createElement(
				"span",
				{ className: "bodyChange-tagName", style: bodyChange_tagName },
				BodyChange_li_info[index].name
			),
			React.createElement(
				"span",
				{ className: "bodyChange-lowNum", style: bodyChange_lowNum },
				dataList[index][0]
			),
			React.createElement(
				"span",
				{ className: "bodyChange-highNum", style: bodyChange_highNum },
				dataList[index][1]
			),
			imgarr
		);
	}
});
ReactDOM.render(React.createElement(
	"div",
	null,
	React.createElement(BodyChange, null),
	React.createElement(Public_error, null)
), document.getElementById('bodyChangeBox'));

/***/ })

},[206]);