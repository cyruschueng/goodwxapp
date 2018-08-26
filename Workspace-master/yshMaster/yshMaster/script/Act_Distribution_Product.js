$(document).ready(function() {
	window.parent.goTop(0)
	var hash = window.location.hash;
	init(hash);
	
	//当分页只有一条数据被删除后加载上一页数据
	if($("#view").html() == "暂无数据"){
		var num = parseInt(hash.substr(1,1)) - 1;
		var preHash = "#" + num;
		init(preHash);
	}
})

//初始化
function init(hash) {
	getChannelSelect(function(ret) {
		var str = ""
		for(var num in ret.aaData) {
			str += "<option value=" + ret.aaData[num].Id + ">" + ret.aaData[num].ChannelName + "</option>"
		}
		$("#channel").append(str)
		initSearch(hash);
	})
}

//初始化查询
function initSearch(hash) {
	var PageIndex = parseInt(hash.substr(1,1)) - 1;
	var url = yshurl + "get_Act_Distri_Product_Map"
	var view = $("#view")
	var tpl = $("#tpl").html()
	var param = {
		channelId: $("#channel").val() || "",
		RuleName: $("#RuleName").val() || "",
		pageindex: PageIndex * 10,
		pagesize: 10
	}
	getDataList(url, param, function(ret) {
		view.empty();
		showData(view, tpl, ret.aaData)
		//分页条数
		url = yshurl + "get_Act_Distri_Product_count"
		$("#paginator").empty()
		getDataList(url, param, function(res) {
			var pageIndex = Math.ceil(res.aaData[0].COUNT / param.pagesize) || 0
			$("#itemTotal").text((res.aaData[0].COUNT || 0))
			$("#pageTotal").text(pageIndex)
			for(var num = 1; num <= pageIndex; num++) {
				var str = "<li class=''><a href='#" + num + "' class='page-number' onclick='setHash(" + num + ")'>" + num + "</a></li>"
				if((PageIndex + 1) == num)
					str = "<li class='active pageFlag'><a href='#" + num + "' class='page-number'>" + num + "</a></li>"
				$("#paginator").append(str)
			}
		}, true)
	}, true)
}

//获取渠道下拉
function getChannelSelect(callback) {
	var url = yshurl + "getChannelByAdmin"
	var param = {}
	getDataList(url, param, function(ret) {
		callback && callback(ret)
	}, true)
}

//删除规则
function deleteRule(ruleId) {
	var url = yshurl + "Product_deleteRule"
	var param = {
		ruleId: ruleId
	}
	ysh_confirm("是否确定删除", "确认", "取消", function(res) {
		if(res) {
			getDataList(url, param, function(ret) {
				if(ret.aaData.affectedRows == 1) {
					ysh_alert("删除成功", "success");
					setTimeout(function() {
						window.location.reload()
					}, 1000)
				} else {
					ysh_alert("删除失败", "error")
				}
			}, false);
		} else {
			return;
		}
	})
}

//点击翻页设置hash值
 function setHash (num){
 	window.location.hash = num;
 	var hash = window.location.hash;
   	initSearch(hash);
 }
 
 window.onhashchange = function() {
 	var hash = window.location.hash;
 	initSearch(hash);
 }