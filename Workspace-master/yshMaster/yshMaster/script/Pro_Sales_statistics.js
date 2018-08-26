$(document).ready(function() {
	window.parent.goTop(0)
	var hash = window.location.hash;
	initSearch(hash);
})

//初始化方法
var initSearch = function(hash) {
	$("#paginator").empty()
	$(".pageFlag").each(function() {
		$(this).remove()
	});
	var PageIndex = parseInt(hash.substr(1,1000000)) - 1;
	var startTime = $("#StartTime").val() || null
	var endTime = $("#EndTime").val() || null
	var productname = $("#productname").val() || ''
	var view = $("#view")
	var tpl = $("#tpl").html()
	var url = yshurl + "GEtproductOrderListByDate"

	var obj = {
		"startdate": startTime,
		"enddate": endTime,
		"productname": productname,
		"pageindex": PageIndex * 10,
		"pagesize": 10
	}

	if (endTime && startTime) {
		getDataList(url, obj, function(ret) {
			$("#StartTimeHide").val(startTime)
			$("#EndTimeHide").val(endTime)
			if (ret.aaData instanceof Array && ret.aaData.length > 0) {
				//数据处理
				view.empty()
				showData(view, tpl, ret.many[0])
				var pageIndex = Math.ceil(ret.aaData[0].counts / obj.pagesize) || 0
				$("#pageTotal").text(pageIndex)
				$("#itemTotal").text(ret.aaData[0].counts)

				for (var num = 1; num <= pageIndex; num++) {
					var str = "<li class=''><a href='#" + num + "' class='page-number' onclick='setHash(" + num + ")'>" + num + "</a></li>"
					if ((PageIndex + 1) == num)
						str = "<li class='active pageFlag'><a href='#" + num + "' class='page-number'>" + num + "</a></li>"
					$("#paginator").append(str)
				}

			} else {
				view.html("暂时没有更多数据！")
			}
		}, true)
	} else {
		ysh_alert("请输入正确的", "error")
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
 function setHash (num){
 	window.location.hash = num;
 	var hash = window.location.hash;
   	initSearch(hash);
 }
 window.onhashchange = function() {
 	var hash = window.location.hash;
 	initSearch(hash);
 }