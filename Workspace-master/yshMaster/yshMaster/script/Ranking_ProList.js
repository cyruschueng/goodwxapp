$(document).ready(function() {
	window.parent.goTop(0)
	var PageIndex = window.location.hash
	PageIndex = (PageIndex.replace("#", "")) - 1
	if(PageIndex < 0)
		PageIndex = 0
	init(PageIndex)
})

//初始化查询
function init(PageIndex) {
	$(".pageFlag").each(function() {
		$(this).remove()
	})
	var user_id = decodeURI(ysh_GetQueryString("user_id") || null)
	var user_name = decodeURI(ysh_GetQueryString("user_name") || null)

	var myDate = new Date();
	var etime = myDate.Format("yyyy-MM-dd hh:mm:ss.S").substr(0, 10);
	myDate.setDate(myDate.getDate() - 360);
	var stime = myDate.Format("yyyy-MM-dd hh:mm:ss.S").substr(0, 10);

	if(!user_name || !stime || !etime)
		history.back()

	//初始化页面
	$("#StartTime").val(stime)
	$("#EndTime").val(etime)
	$("#user").text(user_name)
		//初始化查询
	initSearch(user_id, stime, etime, PageIndex)
}

//初始化查询
function initSearch(user_id, stime, etime, PageIndex) {
	var url = yshurl + "GETBuyProductByUserId"
	var view = $("#view")
	var tpl = $("#tpl").html()
	var data = {
		"user_idd": user_id,
		"starttime": stime,
		"endtime": etime,
		"PageIndex": PageIndex * 10,
		"PageSize": 10
	}
	getDataList(url, data, function(ret) {
		for(var num in ret.aaData) {
			if(!ret.aaData[num].picurl) {
				ret.aaData[num].picurl = 'noimg.jpg'
			}
		}
		view.empty()
		showData(view, tpl, ret.aaData)
		$("#paginator").empty()
		url = yshurl + "GETBuyProductByUserIdCount"
		getDataList(url, data, function(res) {
			var pageIndex = Math.ceil(res.aaData[0].COUNT / data.PageSize) || 0
			$("#pageTotal").text(pageIndex)
			$("#itemTotal").text((res.aaData[0].COUNT || 0))
			for(var num = 1; num <= pageIndex; num++) {
				var str = "<li class=''><a href='#" + num + "' class='page-number' onclick='init(" + (num - 1) + ")'>" + num + "</a></li>"
				if((PageIndex + 1) == num)
					str = "<li class='active pageFlag'><a href='#" + num + "' class='page-number'>" + num + "</a></li>"
				$("#paginator").append(str)
			}
		}, true)
	}, true)
}