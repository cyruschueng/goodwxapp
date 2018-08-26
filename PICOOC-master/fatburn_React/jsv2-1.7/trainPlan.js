webpackJsonp([17],{

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
var myRoleId = getParamByUrl("roleId");
var targetRoleId = getParamByUrl("targetRoleId");
//数据错误提示
var Public_error = __webpack_require__(3);

var SWoDeFangAn = {
	SCategory_SWoDeFangAn: 5060200,
	SWoDeFangAn_YinShiFangAn: 5060201, //饮食方案
	SWoDeFangAn_YunDongFangAn: 5060202, //运动方案
	SWoDeFangAn_FangAnXiangQing: 5060203 //方案详情
};

var ClassTag = React.createClass({
	displayName: "ClassTag",

	getInitialState: function getInitialState() {
		var me = this;

		return {
			trainPlanArr: [],
			userDatumStyle: {
				'display': 'none'
			}
		};
	},
	componentDidMount: function componentDidMount() {
		var that = this;
		var userId = getParamByUrl('userId');
		var campId = getParamByUrl('campId');
		// var host = window.location.protocol + "//" + window.location.hostname + ":9989";
		var targetCampId = getParamByUrl('targetCampId');
		if (myRoleId != targetRoleId && targetRoleId != "false") {
			that.getTrainPlan();
		} else {
			if (targetCampId > 237) {
				$.ajax({
					// url: location.origin + '/v1/api/campScheme/queryFianco?userId=' + userId + '&campId=' + campId,
					url: location.origin + '/v1/api/campScheme/queryFianco' + location.search,
					type: 'get',
					dataType: 'json',
					success: function success(data) {
						if (data.code == 200) {
							console.info(data);
							if (data.resp == false) {
								that.setState({
									userDatumStyle: {
										'display': 'block'
									}
								});
							} else {
								that.getTrainPlan();
							}
						} else {
							$(".error-main-t").html(data.resp.message);
							$(".errorAlert").css("display", "block");
							$(".error-main").css("margin-top", -$(".error-main").height() / 2);
						}
					},
					error: function error() {
						$(".error-main-t").html("网络错误～");
						$(".errorAlert").css("display", "block");
						$(".error-main").css("margin-top", -$(".error-main").height() / 2);
					}
				});
			} else {
				that.getTrainPlan();
			}
		}
	},
	getTrainPlan: function getTrainPlan() {
		var me = this;
		var host = window.location.protocol + "//" + window.location.host;
		var finalUrl = host + "/v1/api/camp/getScheme" + window.location.search;
		console.info(finalUrl);
		$.ajax({
			type: "get",
			url: finalUrl,
			dataType: "json",
			success: function success(data) {
				if (data.code == 200) {
					me.setState({ trainPlanArr: data });
				} else {
					$(".error-main-t").html("服务器开小差了～");
					$(".errorAlert").css("display", "block");
					$(".error-main").css("margin-top", -$(".error-main").height() / 2);
				}
			}
		});
	},
	jumpTrainPlan: function jumpTrainPlan(url) {
		var me = this;
		setMaiDian(SWoDeFangAn.SCategory_SWoDeFangAn, SWoDeFangAn.SWoDeFangAn_FangAnXiangQing);
		me.openNewWebview(url);
	},
	openNewWebview: function openNewWebview(url) {
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
	trainPlan: function trainPlan(weekIndex) {
		setMaiDian(SWoDeFangAn.SCategory_SWoDeFangAn, SWoDeFangAn.SWoDeFangAn_FangAnXiangQing);
		this.getWeekTrain(weekIndex);
	},
	//获得一周的运动计划
	getWeekTrain: function getWeekTrain(weekIndex) {
		var campId = getParamByUrl("campId");
		var roleId = getParamByUrl("roleId");
		var getPageInfo = function getPageInfo() {
			var data = {
				campId: campId,
				roleId: roleId,
				weekIndex: weekIndex
			};
			return JSON.stringify(data);
		};
		var deviceType = isMobile();
		/*if (getParamByUrl("os") == "android") {
  	mobileApp.getWeekTrain(getPageInfo());
  }
  else {
  	window.webkit.messageHandlers.getWeekTrain.postMessage(getPageInfo());
  }*/
		appFc.getWeekTrain(getPageInfo());
		document.documentElement.style.webkitTouchCallout = 'none';
	},
	toSportTest: function toSportTest(event) {
		var _$$ajax;

		event.stopPropagation();
		var me = this;
		setCookiePath("toQuestionSource", 1, 1, "/;domain=picooc.com");
		// var targetRoleId = getParamByUrl("roleId");
		var orderId = getParamByUrl('orderId');
		// var sex = getParamByUrl('sex');
		var host = window.location.protocol + "//" + window.location.host;
		var finalUrl = host + "/v1/api/campQuestion/complete" + window.location.search;
		$.ajax((_$$ajax = {
			url: finalUrl,
			type: "get"
		}, _defineProperty(_$$ajax, "url", finalUrl), _defineProperty(_$$ajax, "dataType", "json"), _defineProperty(_$$ajax, "success", function success(data) {
			if (data.code == 200) {
				if (data.resp.sportText == true) {
					//window.location.href="trainExplain.html"+window.location.search;
					//还没有做体侧视频
					if (data.resp.sportVideo == false) {
						// alert('false')
						me.jumpSport(data.resp.campId, orderId);
					} else {
						me.getSportResult(data.resp.campId, orderId);
					}
				} else {
					// + '&orderId=' + orderId + '&sex=' + sex
					var url = absoluteUrl + "trainExplain.html" + window.location.search;
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
	},
	//查看运动测试结果
	getSportResult: function getSportResult(campId, orderId) {
		var roleId = getParamByUrl("roleId");
		// var orderId = getParamByUrl("orderId");

		var deviceType = isMobile();
		var getPageInfo = function getPageInfo() {
			var data = {
				roleId: roleId,
				campId: campId,
				orderId: orderId
			};
			return JSON.stringify(data);
		};
		if (deviceType == "isApp") {
			if (getParamByUrl("os") == "android") {
				mobileApp.getSportResult(getPageInfo());
			} else {
				window.webkit.messageHandlers.getSportResult.postMessage(getPageInfo());
			}
		}
		document.documentElement.style.webkitTouchCallout = 'none';
	},
	//设置跳到运动视频的方法
	jumpSport: function jumpSport(campId, orderId) {
		//alert("campId:"+campId);
		var roleId = getParamByUrl("roleId");
		// var orderId = getParamByUrl("orderId");

		var deviceType = isMobile();
		var type = 1;
		var getPageInfo = function getPageInfo() {
			var data = {
				roleId: roleId,
				type: type,
				campId: campId,
				orderId: orderId
			};
			return JSON.stringify(data);
		};
		// alert(getPageInfo());
		if (deviceType == "isApp") {
			if (getParamByUrl("os") == "android") {
				// alert(data);
				mobileApp.jumpSport(getPageInfo());
			} else {
				window.webkit.messageHandlers.jumpSport.postMessage(getPageInfo());
			}
		}
		document.documentElement.style.webkitTouchCallout = 'none';
	},
	render: function render() {
		var trainList = [];
		var me = this;
		var data = me.state.trainPlanArr;
		var userDatumStyle = this.state.userDatumStyle;
		var changeRoleId = removeParamByUrl("roleId");
		console.log(changeRoleId);
		if (typeof data.resp != "undefined") {
			if (myRoleId != targetRoleId && targetRoleId != "false") {
				for (var i = 0; i < data.resp.length; i++) {
					var weekIndex = data.resp[i].weekIndex;
					if (data.resp[i].url == '' || data.resp[i].url == null) {
						if (data.resp[i].weekIndex == 0) {
							trainList.push(React.createElement(
								"a",
								{ key: i, href: data.resp[i].url + window.location.search, className: "sportPlan-item" },
								data.resp[i].weekNum + '  ' + data.resp[i].title
							));
						} else {
							trainList.push(React.createElement(
								"a",
								{ key: i, href: location.origin + "/web/trainer1.7/getWeekScheme.html" + changeRoleId + '&roleId=' + targetRoleId + '&weekIndex=' + weekIndex, className: "sportPlan-item" },
								" ",
								data.resp[i].weekNum + '  ' + data.resp[i].title
							));
						}
					} else {
						trainList.push(React.createElement(
							"a",
							{ key: i, onClick: me.jumpTrainPlan.bind(this, data.resp[i].url + window.location.search), className: "sportPlan-item" },
							data.resp[i].weekNum + '  ' + data.resp[i].title
						));
					}
				}
			} else {
				for (var i = 0; i < data.resp.length; i++) {
					var weekIndex = data.resp[i].weekIndex;
					if (data.resp[i].url == '' || data.resp[i].url == null) {
						if (data.resp[i].weekIndex == 0) {
							trainList.push(React.createElement(
								"a",
								{ key: i, href: data.resp[i].url + window.location.search, className: "sportPlan-item" },
								data.resp[i].weekNum + '  ' + data.resp[i].title
							));
						} else {
							trainList.push(React.createElement(
								"a",
								{ key: i, onClick: this.trainPlan.bind(this, weekIndex), className: "sportPlan-item" },
								" ",
								data.resp[i].weekNum + '  ' + data.resp[i].title
							));
						}
					} else {
						trainList.push(React.createElement(
							"a",
							{ key: i, onClick: me.jumpTrainPlan.bind(this, data.resp[i].url + window.location.search), className: "sportPlan-item" },
							data.resp[i].weekNum + '  ' + data.resp[i].title
						));
					}
				}
			}
		}
		return React.createElement(
			"div",
			{ className: "row planContent" },
			React.createElement(
				"div",
				{ className: "row part1" },
				trainList,
				React.createElement(
					"div",
					{ className: "userDatum", id: "sportTest", style: userDatumStyle, onClick: this.toSportTest },
					React.createElement(
						"div",
						null,
						React.createElement("img", { src: "http://cdn2.picooc.com/web/res/fatburn/image/openTrain/plan.png" })
					),
					React.createElement(
						"div",
						{ className: "datumTitle1" },
						"\u8FD0\u52A8\u80FD\u529B\u6D4B\u8BD5"
					),
					React.createElement(
						"div",
						{ className: "datumTitle2" },
						"\u6559\u7EC3\u4F1A\u6839\u636E\u60A8\u7684\u8EAB\u4F53\u7D20\u8D28\u5B9A\u5236\u8FD0\u52A8\u8BA1\u5212"
					)
				)
			),
			React.createElement(
				"div",
				{ className: "row part2" },
				React.createElement(
					"a",
					{ className: "eatPlan-item", href: "javascript:void(0);", onClick: me.jumpTrainPlan.bind(this, 'http://detection.picooc.com/details255' + window.location.search) },
					"\u996E\u98DF\u7ED3\u6784 \uFF08\u5403\u4EC0\u4E48\uFF09"
				),
				React.createElement(
					"a",
					{ className: "eatPlan-item", href: "javascript:void(0);", onClick: me.jumpTrainPlan.bind(this, 'http://detection.picooc.com/details256' + window.location.search) },
					"\u996E\u98DF\u65B9\u6CD5 \uFF08\u600E\u4E48\u5403\uFF09"
				)
			)
		);
	}
});

var TrainPlan = React.createClass({
	displayName: "TrainPlan",

	getInitialState: function getInitialState() {
		var me = this;
		var myRoleId = getParamByUrl("roleId");
		var targetRoleId = getParamByUrl("targetRoleId");
		var titleName = "";
		//教练查看我的方案
		if (myRoleId != targetRoleId && targetRoleId != "false") {
			titleName = "Ta的方案";
		} else {
			titleName = "我的方案";
		}
		var titleData = {
			title: titleName,
			color: "",
			opacity: "",
			backgroundColor: "",
			backgroundOpacity: ""
		};
		titleData = JSON.stringify(titleData);
		appFc.controlTitle(titleData);
		return {};
	},
	changeTag: function changeTag(index) {
		if (index == 0) {
			setMaiDian(SWoDeFangAn.SCategory_SWoDeFangAn, SWoDeFangAn.SWoDeFangAn_YinShiFangAn);
		} else if (index == 1) {
			setMaiDian(SWoDeFangAn.SCategory_SWoDeFangAn, SWoDeFangAn.SWoDeFangAn_YunDongFangAn);
		}
		$(".tagItem").eq(index).addClass("active").siblings().removeClass("active");
		if (index == 0) {
			$(".part1").css("display", "block");
			$(".part2").css("display", "none");
		} else {
			$(".part1").css("display", "none");
			$(".part2").css("display", "block");
		}
	},
	render: function render() {
		var me = this;
		return React.createElement(
			"div",
			{ className: "container" },
			React.createElement(
				"ul",
				{ className: "row classTag" },
				React.createElement(
					"li",
					{ className: "tagItem  active col-xs-6 col-sm-6", onClick: me.changeTag.bind(this, 0) },
					React.createElement(
						"span",
						null,
						"\u8FD0\u52A8\u65B9\u6848"
					)
				),
				React.createElement(
					"li",
					{ className: "tagItem col-xs-6 col-sm-6", onClick: me.changeTag.bind(this, 1) },
					React.createElement(
						"span",
						null,
						"\u996E\u98DF\u65B9\u6848"
					)
				)
			),
			React.createElement(ClassTag, null)
		);
	}
});

var Component = React.createClass({
	displayName: "Component",

	render: function render() {
		return React.createElement(
			"div",
			null,
			React.createElement(TrainPlan, null),
			React.createElement(Public_error, null)
		);
	}
});
ReactDOM.render(React.createElement(Component, null), document.getElementById('planMain'));

/***/ })

},[244]);