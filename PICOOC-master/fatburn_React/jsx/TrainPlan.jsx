
var React = require("react");
var ReactDOM = require("react-dom");
var myRoleId = getParamByUrl("roleId");
var targetRoleId = getParamByUrl("targetRoleId");
//数据错误提示
var Public_error = require("./Public_error.jsx");

var SWoDeFangAn = {
	SCategory_SWoDeFangAn: 5060200,
	SWoDeFangAn_YinShiFangAn: 5060201,//饮食方案
	SWoDeFangAn_YunDongFangAn: 5060202,//运动方案
	SWoDeFangAn_FangAnXiangQing: 5060203//方案详情
};


var ClassTag = React.createClass({
	getInitialState: function () {
		var me = this;

		return {
			trainPlanArr: [],
			userDatumStyle: {
				'display': 'none'
			}
		}
	},
	componentDidMount: function () {
		var that = this;
		var userId = getParamByUrl('userId');
		var campId = getParamByUrl('campId');
		// var host = window.location.protocol + "//" + window.location.hostname + ":9989";
		var targetCampId = getParamByUrl('targetCampId');
		if (myRoleId != targetRoleId && targetRoleId != "false") {
			that.getTrainPlan();
		}
		else {
			if (targetCampId > 237) {
				$.ajax({
					// url: location.origin + '/v1/api/campScheme/queryFianco?userId=' + userId + '&campId=' + campId,
					url: location.origin + '/v1/api/campScheme/queryFianco' + location.search,
					type: 'get',
					dataType: 'json',
					success: function (data) {
						if (data.code == 200) {
							console.info(data);
							if (data.resp == false) {
								that.setState({
									userDatumStyle: {
										'display': 'block'
									}
								})
							}
							else {
								that.getTrainPlan();
							}
						}
						else {
							$(".error-main-t").html(data.resp.message);
							$(".errorAlert").css("display", "block");
							$(".error-main").css("margin-top", -$(".error-main").height() / 2);
						}

					},
					error: function () {
						$(".error-main-t").html("网络错误～");
						$(".errorAlert").css("display", "block");
						$(".error-main").css("margin-top", -$(".error-main").height() / 2);
					}
				})
			}
			else {
				that.getTrainPlan();
			}
		}
	},
	getTrainPlan: function () {
		var me = this;
		var host = window.location.protocol + "//" + window.location.host;
		var finalUrl = host + "/v1/api/camp/getScheme" + window.location.search;
		console.info(finalUrl);
		$.ajax({
			type: "get",
			url: finalUrl,
			dataType: "json",
			success: function (data) {
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
	jumpTrainPlan: function (url) {
		var me = this;
		setMaiDian(SWoDeFangAn.SCategory_SWoDeFangAn, SWoDeFangAn.SWoDeFangAn_FangAnXiangQing);
		me.openNewWebview(url);
	},
	openNewWebview: function (url) {
		var getPageInfo = function () {
			var data = {
				link: url,
				animation: 1//默认1从右到左，2从下到上
			};
			return JSON.stringify(data);
		};

		var deviceType = isMobile();
		if (deviceType == "isApp" && (getParamByUrl("testtype") != "tanchao")) {
			appFc.openWebview(getPageInfo());
		} else {
			window.location.href = url;
		}

	},
	trainPlan: function (weekIndex) {
		setMaiDian(SWoDeFangAn.SCategory_SWoDeFangAn, SWoDeFangAn.SWoDeFangAn_FangAnXiangQing);
		this.getWeekTrain(weekIndex);
	},
	//获得一周的运动计划
	getWeekTrain: function (weekIndex) {
		var campId = getParamByUrl("campId");
		var roleId = getParamByUrl("roleId");
		var getPageInfo = function () {
			var data = {
				campId: campId,
				roleId: roleId,
				weekIndex: weekIndex
			};
			return JSON.stringify(data);
		};
		var deviceType = isMobile();
		if (getParamByUrl("os") == "android") {
			mobileApp.getWeekTrain(getPageInfo());
		}
		else {
			window.webkit.messageHandlers.getWeekTrain.postMessage(getPageInfo());
		}
		//appFc.getWeekTrain(getPageInfo());
		document.documentElement.style.webkitTouchCallout = 'none';
	},
	toSportTest: function (event) {
		event.stopPropagation();
		var me = this;
		setCookiePath("toQuestionSource", 1, 1, "/;domain=picooc.com");
		// var targetRoleId = getParamByUrl("roleId");
		var orderId = getParamByUrl('orderId');
		// var sex = getParamByUrl('sex');
		var host = window.location.protocol + "//" + window.location.host;
		var finalUrl = host + "/v1/api/campQuestion/complete" + window.location.search;
		$.ajax({
			url: finalUrl,
			type: "get",
			url: finalUrl,
			dataType: "json",
			success: function (data) {
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
						var getPageInfo = function () {
							var data = {
								link: url,
								animation: 1//默认1从右到左，2从下到上
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
				}
				else {
					$(".error-main-t").html(data.message);
					$(".errorAlert").css("display", "block");
					$(".error-main").css("margin-top", -$(".error-main").height() / 2);
				}
			},
			error: function () {
				$(".error-main-t").html('网络错误~');
				$(".errorAlert").css("display", "block");
				$(".error-main").css("margin-top", -$(".error-main").height() / 2);
			}

		})
	},
	//查看运动测试结果
	getSportResult: function (campId, orderId) {
		var roleId = getParamByUrl("roleId");
		// var orderId = getParamByUrl("orderId");

		var deviceType = isMobile();
		var getPageInfo = function () {
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
	jumpSport: function (campId, orderId) {
		var roleId = getParamByUrl("roleId");
		var deviceType = isMobile();
		var type = 1;
		var getPageInfo = function () {
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
	render: function () {
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
							trainList.push(<a key={i} href={data.resp[i].url + window.location.search} className="sportPlan-item">{data.resp[i].weekNum + '  ' + data.resp[i].title}</a>)
						}
						else {
							trainList.push(<a key={i} href={location.origin + "/web/trainer1.7/getWeekScheme.html" + changeRoleId + '&roleId=' + targetRoleId + '&weekIndex=' + weekIndex} className="sportPlan-item" > {data.resp[i].weekNum + '  ' + data.resp[i].title}</a >)
						}
					}
					else {
						trainList.push(<a key={i} onClick={me.jumpTrainPlan.bind(this, data.resp[i].url + window.location.search)} className="sportPlan-item">{data.resp[i].weekNum + '  ' + data.resp[i].title}</a>);
					}

				}
			} else {
				for (var i = 0; i < data.resp.length; i++) {
					var weekIndex = data.resp[i].weekIndex;
					if (data.resp[i].url == '' || data.resp[i].url == null) {
						if (data.resp[i].weekIndex == 0) {
							trainList.push(<a key={i} href={data.resp[i].url + window.location.search} className="sportPlan-item">{data.resp[i].weekNum + '  ' + data.resp[i].title}</a>)
						}
						else {
							trainList.push(<a key={i} onClick={this.trainPlan.bind(this, weekIndex)} className="sportPlan-item" > {data.resp[i].weekNum + '  ' + data.resp[i].title}</a >)
						}
					} else {
						trainList.push(<a key={i} onClick={me.jumpTrainPlan.bind(this, data.resp[i].url + window.location.search)} className="sportPlan-item">{data.resp[i].weekNum + '  ' + data.resp[i].title}</a>);
					}

				}
			}

		}
		return (
			<div className="row planContent">
				<div className="row part1">
					{trainList}
					<div className="userDatum" id="sportTest" style={userDatumStyle} onClick={this.toSportTest}>
						<div>
							<img src="http://cdn2.picooc.com/web/res/fatburn/image/openTrain/plan.png" />
						</div>
						<div className="datumTitle1">运动能力测试</div>
						<div className="datumTitle2">教练会根据您的身体素质定制运动计划</div>
					</div>
				</div>
				<div className="row part2">
					<a className="eatPlan-item" href="javascript:void(0);" onClick={me.jumpTrainPlan.bind(this, 'http://detection.picooc.com/details255' + window.location.search)}>饮食结构 （吃什么）</a>
					<a className="eatPlan-item" href="javascript:void(0);" onClick={me.jumpTrainPlan.bind(this, 'http://detection.picooc.com/details256' + window.location.search)}>饮食方法 （怎么吃）</a>
				</div>
			</div>
		);
	}
})

var TrainPlan = React.createClass({
	getInitialState: function () {
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
		return {}
	},
	changeTag: function (index) {
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
	render: function () {
		var me = this;
		return (
			<div className="container">
				<ul className="row classTag">
					<li className="tagItem  active col-xs-6 col-sm-6" onClick={me.changeTag.bind(this, 0)} ><span>运动方案</span></li>
					<li className="tagItem col-xs-6 col-sm-6" onClick={me.changeTag.bind(this, 1)} ><span>饮食方案</span></li>
				</ul>
				<ClassTag />
			</div>
		);
	}
})


var Component = React.createClass({
	render: function () {
		return (
			<div>
				<TrainPlan />
				<Public_error />
			</div>
		);
	}
})
ReactDOM.render(
	<Component />, document.getElementById('planMain')
);