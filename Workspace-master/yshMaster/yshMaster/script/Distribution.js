var ruleId = ysh_GetQueryString("ruleId") || null;
var action = ysh_GetQueryString("action") || null;
var param = {
	ruleId: "",
	ChannelId: "",
	RuleName: "",
	TotalProfit: "",
	ManagersProfit: "",
	InvestmentProfit: "",
	FirstDistributionProfit: "",
	DistributionProfit: "",
	StoreProfit: ""
}
init(action, ruleId)
checkSrs();

//返回操作
$("#cancel").click(function() {
	history.back();
});

//初始化方法
function init(action, ruleId) {
	switch(action) {
		case "editor":
			$("#saveButton").click(function() {
				if(sumSrs()[1] == 100) {
					if(sumSrs()[0] < param.TotalProfit) {
						if($("#RuleName").val()) {
							subForm("editor", ruleId)
						} else {
							ysh_msg("请输入规则名称")
						}
					} else {
						ysh_msg("平台分润和招商分润之和应小于总分润")
					}
				} else {
					ysh_msg("一级、二级、和店铺利润之和应为100%")
				}
			});
			getChannel(function() {
				initSearch(ruleId)
			});
			break;
		case "search":
			$("#saveButton").hide()
			$("input").each(function() {
				$(this).attr("readonly", true)
			})
			$("select").each(function() {
				$(this).prop("disabled", true)
			})
			getChannel(function() {
				initSearch(ruleId)
			})
			break;
		case "add":
			$("#saveButton").click(function() {
				if(sumSrs()[1] == 100) {
					if(sumSrs()[0] < param.TotalProfit) {
						if($("#RuleName").val()) {
							subForm("add")
						} else {
							ysh_msg("请输入规则名称")
						}
					} else {
						ysh_msg("平台分润和招商分润之和应小于总分润")
					}
				} else {
					ysh_msg("一级、二级、和店铺利润之和应为100%")
				}
			})
			getChannel()
			break;
	}
}

function initSearch(ruleId) {
	var disUrl = yshurl + "getChannelldByDisId"
	var param = {
		DisId: ruleId
	}
	getDataList(disUrl, param, function(ret) {
		if(ret.aaData[0].ChannelId)
			$("#channel").val(ret.aaData[0].ChannelId)
		if(ret.aaData[0].RuleName)
			$("#RuleName").val(ret.aaData[0].RuleName)
		if(ret.aaData[0].TotalProfit) {
			//				console.log(ret.aaData[0].TotalProfit)
			//$("#example-1").val(ret.aaData[0].TotalProfit)
			//$("#example-1").attr("value", ret.aaData[0].TotalProfit)
			$("#example-1").val(ret.aaData[0].TotalProfit)
				//if(ret.aaData[0].TotalProfit.indexOf(".") == -1) {
				//	$("#example-1").val(ret.aaData[0].TotalProfit)
				//} else {
				//	var totalTemp = ret.aaData[0].TotalProfit.split(".")
				//	$("#totalInt").val(totalTemp[0])
				//	$("#totalPrease").val(totalTemp[1])
				//}
		}
		if(ret.aaData[0].InvestmentProfit) {
			//$("#example-2").attr("value", ret.aaData[0].InvestmentProfit)
			$("#example-2").val(ret.aaData[0].InvestmentProfit)
				//if(ret.aaData[0].InvestmentProfit.indexOf(".") == -1) {
				//	$("#localInt").val(ret.aaData[0].InvestmentProfit)
				//} else {
				//	var InvestmentTemp = ret.aaData[0].InvestmentProfit.split(".")
				//	$("#localInt").val(InvestmentTemp[0])
				//	$("#localPrease").val(InvestmentTemp[1])
				//}
		}

		if(ret.aaData[0].FirstDistributionProfit) {
			//$("#example-3").attr("value", ret.aaData[0].FirstDistributionProfit)
			$("#example-3").val(ret.aaData[0].FirstDistributionProfit)
				//if(ret.aaData[0].FirstDistributionProfit.indexOf(".") == -1) {
				//	$("#oneAmountInt").val(ret.aaData[0].FirstDistributionProfit)
				//} else {
				//	var FirstDistributionTemp = ret.aaData[0].FirstDistributionProfit.split(".")
				//	$("#oneAmountInt").val(FirstDistributionTemp[0])
				//	$("#oneAmountPrease").val(FirstDistributionTemp[1])
				//}
		}
		if(ret.aaData[0].DistributionProfit) {
			//$("#example-4").attr("value", ret.aaData[0].DistributionProfit)
			$("#example-4").val(ret.aaData[0].DistributionProfit)
				//if(ret.aaData[0].DistributionProfit.indexOf(".") == -1) {
				//	$("#twoAmountInt").val(ret.aaData[0].DistributionProfit)
				//} else {
				//	var DistributionProfitTemp = ret.aaData[0].DistributionProfit.split(".")
				//	$("#twoAmountInt").val(DistributionProfitTemp[0])
				//	$("#twoAmountPrease").val(DistributionProfitTemp[1])
				//}
		}
		if(ret.aaData[0].StoreProfit) {
			//$("#example-5").attr("value", ret.aaData[0].StoreProfit)
			$("#example-5").val(ret.aaData[0].StoreProfit)
				//if(ret.aaData[0].StoreProfit.indexOf(".") == -1) {
				//	$("#twoAmountInt").val(ret.aaData[0].StoreProfit)
				//} else {
				//	var StoreProfitTemp = ret.aaData[0].StoreProfit.split(".")
				//	$("#shopInt").val(StoreProfitTemp[0])
				//	$("#shopPrease").val(StoreProfitTemp[1])
				//}
		}
	}, true)
}

//获取渠道列表
function getChannel(callback) {
	var url = yshurl + "getChannelByAdmin"
	var param = new Object()
	var str = ""
	getDataList(url, "", function(ret) {
		for(var num in ret.aaData) {
			str += "<option value=" + ret.aaData[num].Id + ">" + ret.aaData[num].ChannelName + "</option>"
		}
		$("#channel").append(str)
		callback && callback()
	})
}

//提交表单
function subForm(action, ruleId) {
	var url = ""
	switch(action) {
		case "add":
			url = yshurl + "insertTheRule"
			break;
		case "editor":
			url = yshurl + "updateTheRule"
			break;
	}
	param.ruleId = ruleId;
	param.ChannelId = $("#channel").val() || 0;
	param.RuleName = $("#RuleName").val();
	//var param = {
	//	ruleId: ruleId,
	//	ChannelId: $("#channel").val() || 0,
	//	RuleName: $("#RuleName").val() || 0,
	//	TotalProfit: +$("#example-1").val(),
	//	ManagersProfit:$("#adminInt").val(),
	//	InvestmentProfit: +$("#example-2").val(),
	//	FirstDistributionProfit: +$("#example-3").val(),
	//	DistributionProfit: +$("#example-4").val(),
	//	StoreProfit: +$("#example-5").val()
	//}
	getDataList(url, param, function(ret) {
		if(ret || ret.aaData || ret.aaData.insertId) {
			ysh_msg("规则保存成功！")
			history.back()
		}
	}, false)
}

//连接百分比
function contant(str1, str2) {
	return str1 + "." + str2
}

//计算百分比
function sumSrs() {
	var a = param.ManagersProfit = +$("#adminInt").val();
	var b = param.InvestmentProfit = +$("#example-2").val();
	var c = param.FirstDistributionProfit = +$("#example-3").val();
	var d = param.DistributionProfit = +$("#example-4").val();
	var e = param.StoreProfit = +$("#example-5").val();
	param.TotalProfit = +$("#example-1").val();
	return [a + b, c + d + e];
}

function checkSrs() {
	$("#totalFR").text(sumSrs()[1]);
	$("#pzFR").text(sumSrs()[0]);
	if(sumSrs()[1] == 100) {
		$("#totalFR").css("color", "green")
	} else {
		$("#totalFR").css("color", "red")
	}
	if(sumSrs()[0] < param.TotalProfit) {
		$("#pzFR").css("color", "green")
	} else {
		$("#pzFR").css("color", "red")
	}
}