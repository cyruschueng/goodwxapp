// Use Morris.Area instead of Morris.Line

$(document).ready(function() {
	init()
	initSearch()
		//蓝线条
})

function init() {
	var EndTimeTemp = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).Format("yyyy-MM-dd")
	var StartTimeTemp = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 7).Format("yyyy-MM-dd")
	$('#EndTime', window.parent.document).val(EndTimeTemp)
	$('#StartTime', window.parent.document).val(StartTimeTemp)
}

function initSearch(timeWay) {
	var startTime = window.parent.document.getElementById("StartTime").value
	var endTime = window.parent.document.getElementById("EndTime").value
	var url = yshurl + "GetOrderTotalByDate"
	var data = {
		"begindate": startTime,
		"enddate": endTime,
	}
	if(!timeWay)
		timeWay = $('.active').eq(0).attr("timeWay")

	$('.active').each(function() {
		$(this).removeClass("active")
	})
	switch(timeWay) {
		case "day":
			$("#day").addClass("active")
			data.method = 1
			break;
		case "mounth":
			$("#mounth").addClass("active")
			data.method = 30
			break;
		case "year":
			$("#year").addClass("active")
			data.method = 365
			break;
	}

	getDataList(url, data, function(ret) {
		if(ret.aaData[0].length > 20) {
			window.parent.ysh_confirm("时间跨度较大，生成数据较多，确认生成么？", "是", "否", function(res) {
				if(res) {
					var money = 0
					var orderNum = 0
					var dataTemp = []
					var totalTemp = []
					var d1 = []
						//红线条
					var d2 = [];
					var timeArray = []
					var objArray = []
					var timeArraytemp = []
					for(var num in ret.aaData[0]) {
						dataTemp = []
						timeArraytemp = []
						totalTemp = []
						objArray = ret.aaData[0][num].dates.split("--")
						objStartTime = objArray[0].substr(2)
						objEndTime = objArray[1].substr(2)
						timeArraytemp[0] = num
						timeArraytemp[1] = objStartTime + "-" + objEndTime
						dataTemp[0] = num
						dataTemp[1] = ret.aaData[0][num].dump
						money += ret.aaData[0][num].dump
						totalTemp[0] = num
						totalTemp[1] = ret.aaData[0][num].totals
						orderNum += ret.aaData[0][num].totals || 0
						d1.push(totalTemp)
						d2.push(dataTemp)
						timeArray.push(timeArraytemp)
					}
					var totalMoneys = ret.aaData[1][0].sum_dump.toFixed(2) || 0

					if(totalMoneys == "null")
						totalMoneys = 0

					$("#totalMoney").text(totalMoneys)
					$("#totalOrder").text(orderNum)
					drawPic(d1, d2, timeArray)
				}
			})
		} else {
			var money = 0
			var orderNum = 0
			var dataTemp = []
			var totalTemp = []
			var d1 = []
				//红线条
			var d2 = [];
			var timeArray = []
			var objArray = []
			var timeArraytemp = []
			for(var num in ret.aaData[0]) {
				dataTemp = []
				timeArraytemp = []
				totalTemp = []
				objArray = ret.aaData[0][num].dates.split("--")
				objStartTime = objArray[0].substr(2)
				objEndTime = objArray[1].substr(2)
				timeArraytemp[0] = num
				timeArraytemp[1] = objStartTime + "-" + objEndTime
				dataTemp[0] = num
				dataTemp[1] = ret.aaData[0][num].dump
				money += ret.aaData[0][num].dump
				totalTemp[0] = num
				totalTemp[1] = ret.aaData[0][num].totals
				orderNum += ret.aaData[0][num].totals
				d1.push(totalTemp)
				d2.push(dataTemp)
				timeArray.push(timeArraytemp)
			}
			$("#totalMoney").text((ret.aaData[1][0].sum_dump.toFixed(2) || 0))
			$("#totalOrder").text(orderNum)
			drawPic(d1, d2, timeArray)
		}
	}, true)
}

function drawPic(d1, d2, timeArray) {
	var data = ([{
		label: "订单",
		data: d1,
		lines: {
			show: true,
			fill: true,
			fillColor: {
				colors: ["rgba(255,255,255,.4)", "rgba(183,236,240,.4)"]
			}
		}
	}, {
		label: "订单总额",
		data: d2,
		lines: {
			show: true,
			fill: true,
			fillColor: {
				colors: ["rgba(255,255,255,.0)", "rgba(253,96,91,.7)"]
			}
		}
	}]);
	var options = {
		grid: {
			backgroundColor: {
				colors: ["#ffffff", "#f4f4f6"]
			},
			hoverable: true,
			clickable: true,
			tickColor: "#eeeeee",
			borderWidth: 1,
			borderColor: "#eeeeee"
		},
		// Tooltip
		tooltip: true,
		tooltipOpts: {
			content: "%s X: %x Y: %y",
			shifts: {
				x: -60,
				y: 25
			},
			defaultTheme: false
		},
		legend: {
			labelBoxBorderColor: "#000000",
			container: $("#main-chart-legend"), //remove to show in the chart
			noColumns: 0
		},
		series: {
			stack: true,
			shadowSize: 0,
			highlightColor: 'rgba(000,000,000,.2)'
		},
		lines: {
			show: true,
			fill: true

		},
		xaxis: {
			ticks: timeArray
		},
		points: {
			show: true,
			radius: 3,
			symbol: "circle"
		},
		colors: ["#5abcdf", "#ff8673"]
	};

	$.plot($("#main-chart #main-chart-container"), data, options);
}