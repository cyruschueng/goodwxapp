$(document).ready(function() {
	var ruleId = ysh_GetQueryString("ruleId") || null
	var action = ysh_GetQueryString("action") || null
	var cid = ysh_GetQueryString("cid") || null
	var PlanRuleId = ysh_GetQueryString("PlanRuleId") || null
	init(action, ruleId, cid, PlanRuleId);
	//返回操作
	$("#cancel").click(function() {
		history.back();
	});

})

//初始化方法
function init(action, ruleId, cid, PlanRuleId) {
	switch(action) {
		case "editor":
			$("#saveButtons").show()
			$("#saveButtons").click(function() {
				subForm("editor", ruleId)
			})
			getChannel(function() {
				initSearch(ruleId, cid, PlanRuleId)
			})
			$("#cancels").click(function() {
				history.back()
			})
			break;
		case "search":
			$("input").each(function() {
				$(this).attr("readonly", true)
			})
			$("select").each(function() {
				$(this).prop("disabled", true)
			})
			$("#cancels").click(function() {
				history.back()
			})
			getChannel(function() {
				initSearch(ruleId, cid, PlanRuleId)
			})
			break;
		case "add":

			$("#saveButtons").show()
			$("#saveButtons").click(function() {
				subForm("add")
			})
			$("#cancels").click(function() {
				history.back()
			})
			getChannel()
			break;
	}
}

//初始化查询
function initSearch(ruleId, cid, PlanRuleId) {
	var url = yshurl + "getCateById"
	var param = {
		cid: cid
	}
	var strzz = ''
	getDataList(url, param, function(ret) {
		strzz += "<option value=" + ret.aaData[0].Id + ">" + ret.aaData[0].CateName + "</option>"
		$("#channel").append(strzz)
		$("#channel").val(ret.aaData[0].Id)
		$("#RuleName").val(PlanRuleId)
	}, true)
}

//获取商品列表
function getChannel(callback) {
	var url = yshurl + "SelectCategoryListSaleRule"
	var param = new Object()
	var str = ""
	var surl = yshurl + "GetStroeSaleRule"
	var sparam = {
		pageindex: 0,
		pagesize: 10000,
		PlanType: 0
	}
	var str2 = ""
	getDataList(url, "", function(ret) {
		for(var num in ret.aaData) {
			str += "<option value=" + ret.aaData[num].CategoryId + ">" + ret.aaData[num].CateName + "</option>"
		}
		$("#channel").append(str)
		getDataList(surl, sparam, function(ret) {
			for(var num in ret.aaData) {
				str2 += "<option value=" + ret.aaData[num].Id + ">" + ret.aaData[num].PlanName + "</option>"
			}

			$("#RuleName").append(str2)
			callback && callback()
		})
	})

}

//提交表单
function subForm(action, ruleId) {
	var url = ""
	var param = {
		CategoryId: $("#channel").val(),
		PlanRuleId: $("#RuleName").val(),
		sId: ruleId
	}
	switch(action) {
		case "add":
			url = yshurl + "InsertTheRule_Cate"
			break;
		case "editor":
			url = yshurl + "upDateTheRule_Cate"
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