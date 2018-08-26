var React = require("react");
var ReactDOM = require("react-dom");
var PubSub = require("pubsub-js");

var canvasObj = {
	startX: 7,
	startY: 3.5,
	radius: 3.5,
	innerRadius: 3.2,
	startAngle: 135,
	endAngle: 45
}

var StudentInfo_trainInfo = React.createClass({
	getInitialState: function () {
		this.trainHistory();
		return {
			trainArr: []
		}
	},
	trainHistory: function () {
		var me = this;
		var host = window.location.protocol + "//" + window.location.host;
		var finalUrl = host + "/v1/api/campScheme/getSportData" + window.location.search;
		console.info(finalUrl);
		$.ajax({
			type: "get",
			url: finalUrl,
			dataType: "json",
			success: function (data) {
				if (data.code == 200) {
					me.setState({ trainArr: data });
				} else {
					$(".error-main-t").html("服务器开小差了～");
					$(".errorAlert").css("display", "block");
					$(".error-main").css("margin-top", -$(".error-main").height() / 2);
				}
			}
		})
	},
	componentDidUpdate: function () {
		var me = this;
		$(".canvas_bg").each(function (index) {
			var canvasIndex = $(this).attr("id");

			var percent = $(this).attr("data-percent");
			console.info("percent:" + percent);
			me.drawRate(canvasObj.startX, canvasObj.startY, canvasObj.radius, canvasObj.innerRadius, canvasObj.startAngle, canvasObj.endAngle, canvasIndex, percent);
			//console.info($(this).attr("id"));
		});
	},
	drawRate: function (x, y, radius, innerRadius, startAngle, endAngle, canvasId, process) {
		fontHeight = 16;
		x = x * fontHeight;
		y = y * fontHeight;
		radius = radius * fontHeight;
		innerRadius = innerRadius * fontHeight;
		var canvas = document.getElementById(canvasId);
		var context = canvas.getContext('2d');

		var deg = Math.PI / 180;
		var percent = process / 100;
		var endDeg = 0;
		if (percent < 5 / 6) {
			endDeg = 135 * deg + 270 * percent * deg;
		} else {
			console.info(12);
			endDeg = 135 * deg + 270 * percent * deg - 360 * deg;
		}

		//进度条已经进行的部分
		context.beginPath();
		context.arc(x, y, radius, startAngle * deg, endDeg);
		context.fillStyle = "#00c3b5";
		context.lineTo(x, y);
		context.fill();
		context.closePath();

		console.info(endDeg);
		//进度条底部
		context.beginPath();
		context.arc(x, y, radius, endDeg, endAngle * deg);
		context.fillStyle = "#bff0ec";
		context.lineTo(x, y);
		context.fill();
		context.closePath();


		//进度条内环
		context.beginPath();
		context.arc(x, y, innerRadius, 0, 360 * deg);
		context.fillStyle = "#FFF";
		context.lineTo(x, y);
		context.fill();
		context.closePath();
	},
	getTrainDetial: function (id) {
		var roleId = getParamByUrl("roleId");
		var campId = getParamByUrl("campId");
		if (publicData.reloadPage1 != undefined) {
			publicData.reloadPage1 = true;
		}
		var getPageInfo = function () {
			var data = {
				roleId: roleId,
				campId: campId,
				id: id
			};
			return JSON.stringify(data);
		};
		if (deviceType == "isApp") {
			if (getParamByUrl("os") == "android") {
				// alert("触发了getTrainDetial方法");
				mobileApp.getTrainDetial(getPageInfo());
			} else {
				window.webkit.messageHandlers.getTrainDetial.postMessage(getPageInfo());
			}
		}
		document.documentElement.style.webkitTouchCallout = 'none';
	},
	render: function () {
		var weekNum = 4;
		var dayNum = 7;
		var groupNum = 2;
		var canvasIndex = 0;
		var trainHistoryList = [];
		var data = this.state.trainArr;
		var minute = "";
		var second = "";
		if (data != "undefined" && data != "") {
			minute = parseInt(data.resp.times / 60);
			second = data.resp.times % 60;
			//未结营
			if (!data.resp.end) {
				weekNum = data.resp.weekSportDataDTOs.length;
				for (var i = 0; i < weekNum; i++) {
					var groupHistoryList = [];
					dayNum = data.resp.weekSportDataDTOs[i].daySportDataDTOs.length;
					for (var j = 0; j < dayNum; j++) {
						groupNum = data.resp.weekSportDataDTOs[i].daySportDataDTOs[j].sectionSportDataDTOs.length;
						var dayText = "第" + data.resp.weekSportDataDTOs[i].daySportDataDTOs[j].dayNum + "天";
						for (var k = 0; k < groupNum; k++) {
							if (k != 0) {
								dayText = "";
							}
							var dayTrainTime = parseInt(data.resp.weekSportDataDTOs[i].daySportDataDTOs[j].sectionSportDataDTOs[k].times / 60) + "分" + parseInt(data.resp.weekSportDataDTOs[i].daySportDataDTOs[j].sectionSportDataDTOs[k].times % 60) + "秒";
							if (data.resp.weekSportDataDTOs[i].daySportDataDTOs[j].sectionSportDataDTOs[k].percent == 100) {
								var parcentTextStyle = {
									'left': '1.6rem'
								}
							}
							else{
								var parcentTextStyle = {
									'left': '2.15rem'
								}
							}

							groupHistoryList.push(
								<div className="train_day_item row" key={canvasIndex} onClick={this.getTrainDetial.bind(this, data.resp.weekSportDataDTOs[i].daySportDataDTOs[j].sectionSportDataDTOs[k].id)}>
									<div className="train_day_date col-xs-2 col-sm-2">{dayText}</div>
									<div className="train_day_timeInfo col-xs-4 col-sm-4">
										<img src="http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/trainTime.png" />
										<span>{dayTrainTime}</span>
									</div>
									<div className="train_day_groupInfo col-xs-3 col-sm-3">
										<img src="http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/fire.png" />
										<span>{data.resp.weekSportDataDTOs[i].daySportDataDTOs[j].sectionSportDataDTOs[k].groups + "组"}</span>
									</div>
									<div className="train_day_rateInfo col-xs-3 col-sm-3">
										<canvas id={"canvas" + canvasIndex} className="canvas_bg" data-percent={data.resp.weekSportDataDTOs[i].daySportDataDTOs[j].sectionSportDataDTOs[k].percent}></canvas>
										<span className="parcentText" style={parcentTextStyle}><span>{data.resp.weekSportDataDTOs[i].daySportDataDTOs[j].sectionSportDataDTOs[k].percent}</span>%</span>
										<img src="http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/processText.png" />
									</div>
								</div>
							);
							canvasIndex++;
						}
					}
					data.resp.weekSportDataDTOs[i].startDate = data.resp.weekSportDataDTOs[i].startDate.substring(5, 7) + "月" + data.resp.weekSportDataDTOs[i].startDate.substring(8, 10) + "日";
					data.resp.weekSportDataDTOs[i].endDate = data.resp.weekSportDataDTOs[i].endDate.substring(5, 7) + "月" + data.resp.weekSportDataDTOs[i].endDate.substring(8, 10) + "日";
					trainHistoryList.push(
						<div className="train_week_list" key={"day" + i}>
							<div className="train_week_title">{"第" + data.resp.weekSportDataDTOs[i].weekNum + "周 " + data.resp.weekSportDataDTOs[i].startDate + "-" + data.resp.weekSportDataDTOs[i].endDate}</div>
							<div className="train_day_list row">{groupHistoryList}</div>
						</div>
					);
				}
			}
			//已结营
			else {
				var groupHistoryList = [];
				dayNum = data.resp.endSportDataDTOs.length;
				for (var i = 0; i < dayNum; i++) {
					groupNum = data.resp.endSportDataDTOs[i].sectionSportDataDTOs.length;
					var dayText = data.resp.endSportDataDTOs[i].dateNum;
					for (var j = 0; j < groupNum; j++) {
						if (j != 0) {
							dayText = "";
						}
						var dayTrainTime = parseInt(data.resp.endSportDataDTOs[i].sectionSportDataDTOs[j].times / 60) + "分" + parseInt(data.resp.endSportDataDTOs[i].sectionSportDataDTOs[j].times % 60) + "秒";
						groupHistoryList.push(
							<div className="train_day_item row" key={canvasIndex}>
								<div className="train_day_date col-xs-2 col-sm-2">{dayText}</div>
								<div className="train_day_timeInfo col-xs-4 col-sm-4">
									<img src="http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/trainTime.png" />
									<span>{dayTrainTime}</span>
								</div>
								<div className="train_day_groupInfo col-xs-3 col-sm-3">
									<img src="http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/fire.png" />
									<span>{data.resp.endSportDataDTOs[i].sectionSportDataDTOs[j].groups + "组"}</span>
								</div>
								<div className="train_day_rateInfo col-xs-3 col-sm-3">
									<canvas id={"canvas" + canvasIndex} className="canvas_bg" data-percent={data.resp.endSportDataDTOs[i].sectionSportDataDTOs[j].percent}></canvas>
									<span className="parcentText"><span>{data.resp.endSportDataDTOs[i].sectionSportDataDTOs[j].percent}</span>%</span>
									<img src="http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/processText.png" />
								</div>
							</div>
						);
						canvasIndex++;
					}
				}
				trainHistoryList = "";
				trainHistoryList = <div><div className="train_week_title">已结营</div><div className="train_day_list row">{groupHistoryList}</div></div>;
			}
		} else {

		}

		return (
			<div className="row page2">
				<div className="trainTime">
					<div className="train_title">您累计运动时长</div>
					<div className="trainTime_info">
						<span className="minute">{minute}</span>分
						<span className="second">{second}</span>秒
					</div>
				</div>
				<div className="trainList">
					{trainHistoryList}
				</div>
			</div>
		);
	}
});

module.exports = StudentInfo_trainInfo;