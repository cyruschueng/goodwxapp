$(document).ready(function() {
	var ruleId = ysh_GetQueryString("ruleId") || null
	var action = ysh_GetQueryString("action") || null
	init(action, ruleId);

	//返回操作
	$("#cancel").click(function() {
		history.back();
	});
})

//初始化方法
function init(action, ruleId) {
	switch(action) {
		case "editor":
			$("#saveButton").click(function() {
				subForm("editor", ruleId)
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
				subForm("add")
			})
			getChannel()
			break;
	}
}

//初始化查询
function initSearch(ruleId) {
	var disUrl = yshurl + "Product_getChannelldByDisId"
	var param = {
		DisId: ruleId
	}
	getDataList(disUrl, param, function(ret) {
		var str = "";
		str += "<option class='zz' value=" + ret.aaData[0].pid + ">" + ret.aaData[0].pname + "</option>"
		$(".zz").each(function() {
			if($(this).val() == ret.aaData[0].pid)
				$(this).remove()
		})
		$("#channel").append(str)
		$("#channel").val(ret.aaData[0].pid)
		var str1 = ""
		str1 += "<option class='bb' value=" + ret.aaData[0].rid + ">" + ret.aaData[0].rname + "</option>"
		$(".bb").each(function() {
			if($(this).val() == ret.aaData[0].pid)
				$(this).remove()
		})
		$("#RuleName").append(str1)
		$("#RuleName").val(ret.aaData[0].rid)
	}, true)
}

//获取商品列表
function getChannel(callback) {
	var url = yshurl + "GetDistributionProduct"
	var param = new Object()
	var str = ""
	var surl = yshurl + "getRuleSelect"
	var sparam = new Object()
	var str2 = ""
	getDataList(url, "", function(ret) {
		for(var num in ret.aaData) {
			str += "<option value=" + ret.aaData[num].Id + ">" + ret.aaData[num].ProductName + "</option>"
		}
		$("#channel").append(str)
		callback && callback()
	})

	getDataList(surl, sparam, function(ret) {
		for(var num in ret.aaData) {
			str2 += "<option value=" + ret.aaData[num].Id + ">" + ret.aaData[num].RuleName + "</option>"
		}
		$("#RuleName").append(str2)
		callback && callback()
	})
}

//提交表单
function subForm(action, ruleId) {
	var url = ""
	var param = {
		ProductId: $("#channel").val(),
		DistributionId: $("#RuleName").val(),
		ruleId: ruleId
	}
	switch(action) {
		case "add":
			url = yshurl + "insertTheDP"
			break;
		case "editor":
			url = yshurl + "updateTheDP"
			break;
	}

	//参数
	getDataList(url, param, function(ret) {
		if(ret || ret.aaData || ret.aaData.insertId) {
			ysh_msg("规则保存成功！")
			history.back()
		}
	}, false)
}