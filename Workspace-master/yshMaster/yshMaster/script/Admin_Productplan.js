$(document).ready(function() {
	var hash = window.location.hash;
	initSearch(hash);
	init();
})

function init() {
	var url = yshurl + "Admin_GetInMarketMerchart"
	var param = {
		"Names": " "
	}
	getDataList(url, param, function(ret) {
		var str = ""
		for(var num in ret.aaData) {
			str += '<option value="' + ret.aaData[num].Id + '">' + ret.aaData[num].text + '</option>'
		}
		$("#shop").append(str)
	}, true)
}

//初始化查询
function initSearch(hash) {
	$("#paginator").empty()
	var pageIndex = parseInt(hash.substr(1, 1)) - 1;
	//获取规则
	var url = yshurl + "GetStroeSaleRule"
	var view = $("#view")
	var tpl = $("#tpl").html()
	var param = {
		PlanType: $("#shop").val(),
		pageindex: pageIndex * 10,
		pagesize: 10
	}
	getDataList(url, param, function(ret) {
		view.empty()
		showData(view, tpl, ret.aaData)
		window.parent.goTop()
		url = yshurl + "GetStroeSaleRuleCount"
		getDataList(url, param, function(ret) {
			//获取分页数量
			var pageIndexs = Math.ceil(ret.aaData[0].counts / param.pagesize) || 0
			$("#pageTotal").text(pageIndexs)
			$("#itemTotal").text(ret.aaData[0].counts)
			for(var num = 1; num <= pageIndexs; num++) {
				var str = "<li class=''><a href='#" + num + "' class='page-number' onclick='setHash(" + num + ")'>" + num + "</a></li>"
				if((pageIndex + 1) == num)
					str = "<li class='active'><a href='#" + num + "' class='page-number'>" + num + "</a></li>"
				$("#paginator").append(str)
			}
		}, true)
	}, true)
}

//删除基地
function deletePB(id) {
	var surl = yshurl + "check_DeleteTheRle_Cate"
	getDataList(surl, {
		pid: id
	}, function(res) {
		if(res.aaData[0].count && res.aaData[0].count > 0) {
			ysh_alert("该规则正在被使用，不允许删除！", "error")
		} else {
			ysh_confirm("确认删除么？", "确认", "取消", function(ret) {
				if(ret) {
					var url = yshurl + "deleteAct_PlanRule"
					var param = {
							"DisId": id
						}
						//获取数据
					getDataList(url, param, function(ret) {
						if(ret.aaData.affectedRows == 1) {
							ysh_msg("删除成功")
							window.location.reload()
						} else {
							ysh_alert("删除失败", "error")
						}
					}, false)
				}
			})
		}
	}, true)

}

//点击翻页设置hash值
function setHash(num) {
	window.location.hash = num;
	var hash = window.location.hash;
	initSearch(hash);
}

window.onhashchange = function() {
	var hash = window.location.hash;
	initSearch(hash);
}