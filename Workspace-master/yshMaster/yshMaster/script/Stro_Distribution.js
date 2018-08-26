var action = ysh_GetQueryString("action") || null;
var ruleId = ysh_GetQueryString("ruleId") || null;
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

//初始化方法
function init(action, ruleId) {
	switch(action) {
		case "editor":
			$("#saveButton").click(function() {

			})
			getChannel(function() {
				initSearch(ruleId)
			})
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

			})
			getChannel()
			break;
	}
}

function initSearch(ruleId) {
	var disUrl = yshurl + "GetStroeSaleRuleDetial"
	var param = {
		DisId: ruleId
	}
	getDataList(disUrl, param, function(ret) {
		if(ret.aaData.length > 0) {
			$("#saleRuleName").val(ret.aaData[0].PlanName)
			$("#StartTime").val(ret.aaData[0].BeginDateTime);
			$("#EndTime").val(ret.aaData[0].EndDateTime);
		}

	}, true);
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
function subForm() {
	var count = 0
	$(".formData").each(function() {
		if(!$(this).val())
			count++
	})
	if(count == 0) {
		if(checkTheTime($("#StartTime").val(), $("#EndTime").val())) {
			var url = ""
			param.PlanName = $("#saleRuleName").val();
			param.PlanRuleId = ruleId
			param.PlanTypeId = $("#PlanTypeId").val();
			param.BeginDateTime = $("#StartTime").val();
			param.EndDateTime = $("#EndTime").val();
			switch(action) {
				case "add":
					url = yshurl + "InsertACTplanRule"
					break;
				case "editor":
					url = yshurl + "UpdateActPlanRule"
					break;
			}
			getDataList(url, param, function(ret) {
				if(ret || ret.aaData || ret.aaData.insertId) {
					ysh_msg("售卖规则保存成功！")
					history.back()
				}
			}, false)
		} else {
			ysh_alert("结束时间必须晚于开始时间！", "error")
		}
	} else {
		ysh_alert("有必填项未填写!")
	}
}

//验证时间
function checkTheTime(stime, etime) {
	stimeA = stime.split(":")
	etimeA = etime.split(":")
	if(stimeA[0] > etimeA[0]) {
		return false
	} else if(stimeA[0] < etimeA[0]) {
		return true
	} else {
		if(stimeA[1] > etimeA[1]) {
			return false
		} else {
			return true
		}
	}
}