$(document).ready(function() {
	var hash = window.location.hash;
	initSearch(hash);
	init();
	$('select').select2();
	
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
	var pageIndex = parseInt(hash.substr(1,1000000)) - 1;
	//获取店铺
	var url = yshurl + "GETProBaseList"
	var view = $("#view")
	var tpl = $("#tpl").html()
	var param = {
		MerchantId: $("#shop").val(),
		pageindex: pageIndex * 10,
		pagesize: 10
	}
	getDataList(url, param, function(ret) {
		for(var num in ret.many[0]) {
			if(!ret.many[0][num].picurl)
				ret.many[0][num].picurl = 'noimg.jpg'
		}
		view.empty()
		showData(view, tpl, ret.many[0])
		window.parent.goTop()
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
}

//删除基地
function deletePB(id) {
	ysh_confirm("确认删除么？", "确认", "取消", function(ret) {
		if(ret) {
			var url = yshurl + "DeleteProbaseinfo"
			var param = {
					"probaseid": id
				}
				//获取数据
			getDataList(url, param, function(ret) {
				if(ret.aaData.affectedRows == 1) {
					ysh_msg("删除成功")
					window.location.reload()
				} else if(ret.aaData && ret.aaData.affectedRows != 1) {
					ysh_alert("该基地正在被使用，不允许删除", "error")
				} else {
					ysh_alert("删除失败", "error")
				}
			}, false)
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
