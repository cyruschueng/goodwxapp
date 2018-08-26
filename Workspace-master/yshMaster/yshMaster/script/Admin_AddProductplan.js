$(document).ready(function() {
	window.parent.goTop(0)
	initSearch(true);
})

//初始化方法
var initSearch = function(is_init) {
	var hash = window.location.hash || "#1";
	selectRule(is_init, function() {
		$("#paginator").empty()
		$(".pageFlag").each(function() {
			$(this).remove()
		})
		var PageIndex = parseInt(hash.substr(1, 1)) - 1;
		var startTime = $("#StartTime").val() || null
		var endTime = $("#EndTime").val() || null
		var productname = $("#productname").val() || ''
		var view = $("#view")
		var tpl = $("#tpl").html()
		var url = yshurl + "getSalRule"
		var obj = {
			"PlanRuleId": $("#saleRule").val() || 0,
			"Cid": $("#catgro").val() || 0,
			"pageindex": PageIndex * 10,
			"pagesize": 10
		}
		getDataList(url, obj, function(ret) {
			$("#StartTimeHide").val(startTime)
			$("#EndTimeHide").val(endTime)
			if(ret.aaData instanceof Array && ret.aaData.length > 0) {
				//数据处理
				view.empty()
				showData(view, tpl, ret.many[0])
				var pageIndex = Math.ceil(ret.many[1][0].counts / obj.pagesize) || 0
				$("#pageTotal").text(pageIndex)
				$("#itemTotal").text(ret.many[1][0].counts)
				for(var num = 1; num <= pageIndex; num++) {
					var str = "<li class=''><a href='#" + num + "' class='page-number' onclick='setHash(" + num + ")'>" + num + "</a></li>"
					if((PageIndex + 1) == num)
						str = "<li class='active pageFlag'><a href='#" + num + "' class='page-number'>" + num + "</a></li>"
					$("#paginator").append(str)
				}
			} else {
				view.html("暂时没有更多数据！")
			}
		})

	}, true)
}

function selectRule(is_init, callback) {
	if(is_init) {
		var seurl = yshurl + "GetStroeSaleRule"
		var param = {
			PlanType: 0,
			pageindex: 0,
			pagesize: 1000
		}
		var strr = "<option value='0'>全部</option>"
		getDataList(seurl, param, function(ret) {
			for(var num in ret.aaData) {
				strr += "<option value=" + ret.aaData[num].Id + ">" + ret.aaData[num].PlanName + "</option>"
			}
			$("#saleRule").empty()
			$("#saleRule").append(strr)
			var curl = yshurl + "SelectCategoryListFront"
			var crr = "<option value='0'>全部</option>"
			getDataList(curl, "", function(res) {
				for(var num in res.aaData) {
					crr += "<option value=" + res.aaData[num].CategoryId + ">" + res.aaData[num].CateName + "</option>"
				}
				$("#catgro").empty()
				$("#catgro").append(crr)
				callback && callback()
			}, true)
		}, true)
	} else {
		callback && callback()
	}
}

//跳转购物详情
function ShoppingDetial(user_name, user_Id) {
	var user_id = user_Id
	var user_name = encodeURI(user_name || "匿名")
	var stime = encodeURI($("#StartTimeHide").val() || "1970-1-1")
	var etime = encodeURI($("#EndTimeHide").val() || "1970-1-1")
	window.location.href = 'Ranking_ProList.html?user_name=' + user_name + "&stime=" + stime + "&etime=" + etime + "&user_id=" + user_id
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

function deleteThePlan(id) {
	//删除方法
	ysh_confirm("确认删除么？", "确认", "取消", function(ret) {
			if(ret) {
				var url = yshurl + "DeleteTheRule_Cate"
				var param = {
					pid: id
				}
				getDataList(url, param, function(ret) {
					if(ret && ret.aaData && ret.aaData.affectedRows && ret.aaData.affectedRows == 1) {
						ysh_msg("删除成功")
						initSearch(window.location.hash)
					} else {
						ysh_alert("删除失败", "error")
					}
				}, false)
			}
	});
}