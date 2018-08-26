$(document).ready(function() {
	window.parent.goTop(0);
	var hash = window.location.hash;
	initSearch(hash);
})

//初始化方法
var initSearch = function(hash) {
	var PageIndex = parseInt(hash.substr(1,1000000)) - 1;
	$(".pageFlag").each(function() {
		$(this).remove()
	})
	var startTime = $('#StartTime').val() || null
	var endTime = $('#EndTime').val() || null
	var view = $("#view")
	var tpl = $("#tpl").html()
	var url = yshurl + "GETORderAmountPaidDisplayList"

	var obj = {
		"starttime": startTime,
		"endtime": endTime,
		"PageIndex": PageIndex * 10,
		"PageSize": 10
	}

	if(endTime && startTime) {
		getDataList(url, obj, function(ret) {
			console.info(ret)
			$("#StartTimeHide").val(startTime)
			$("#EndTimeHide").val(endTime)
			if(ret.aaData instanceof Array && ret.aaData.length > 0) {
				//数据处理
				for(var num in ret.aaData) {
					if(!ret.aaData[num].picurl){
						//ret.aaData[num].picurl = 'noimg.jpg'
						ret.aaData[num].picurl = 'images/head-default.png'
					}else{
						ret.aaData[num].picurl = seturl + ret.aaData[num].picurl
					}

					ret.aaData[num].sumap = formatCurrency(ret.aaData[num].sumap || 0)
				}
				view.empty();
				showData(view, tpl, ret.aaData)
				url = yshurl + "GETORderAmountPaidDisplayListCount"
				$("#paginator").empty()
				getDataList(url, obj, function(res) {
					var pageIndex = Math.ceil(res.aaData[0].count / obj.PageSize) || 0
					$("#itemTotal").text((res.aaData[0].count || 0))
					$("#pageTotal").text(pageIndex)
					for(var num = 1; num <= pageIndex; num++) {
						var str = "<li class=''><a href='#" + num + "' class='page-number' onclick='setHash(" + num + ")'>" + num + "</a></li>"
						if((PageIndex + 1) == num)
							str = "<li class='active pageFlag'><a href='#" + num + "' class='page-number'>" + num + "</a></li>"
						$("#paginator").append(str)
					}
				}, true)
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
	var etime = encodeURI($("#EndTimeHide").val() || "2020-1-1")
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
