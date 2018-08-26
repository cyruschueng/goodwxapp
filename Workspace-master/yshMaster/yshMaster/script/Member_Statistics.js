$(document).ready(function() {
	window.parent.goTop(0)
	var hash = window.location.hash;
	initSearch(hash);
})

//初始化方法
var initSearch = function(hash) {
	var PageIndex = parseInt(hash.substr(1,1000000)) - 1;
	$(".pageFlag").each(function() {
		$(this).remove()
	})
	var sex = $("#sex").val() || null
	var startTime = $("#StartTime").val() || null
	var endTime = $("#EndTime").val() || null
	var view = $("#view")
	var tpl = $("#tpl").html()
	var url = yshurl + "GEtStatisticsUserInfo"
	var obj = {
		"sex": sex,
		"startdate": startTime,
		"enddate": endTime,
		"pageindex": PageIndex * 10,
		"pagesize": 10
	}

	if(endTime && startTime) {
		getDataList(url, obj, function(ret) {
			//总数
			$("#StartTimeHide").val(startTime)
			$("#EndTimeHide").val(endTime)
			if(ret.aaData instanceof Array && ret.aaData.length > 0) {
				//性别人数
				$("#sexPeo").text(ret.aaData[0][0].total1)
					//会员数
				$("#memberNum").text(ret.aaData[3][0].total2)
					//有订单会员
				$("#OrderMemberNum").text(ret.aaData[4][0].total3)
					//购买率
				$("#buyPer").text(((ret.aaData[6][0].ratio1) * 100).toFixed(2))
					//复购率
				$("#ReBuyPer").text(((ret.aaData[7][0].ratio2) * 100).toFixed(2))
					//会员购物额
				if(!ret.aaData[5][0].dump)
					ret.aaData[5][0].dump = 0
				$("#dump").text((ret.aaData[5][0].dump))
					//会员购物数
				$("#total4").text((ret.aaData[5][0].total4))
					//地区列表
				view.empty()
				showData(view, tpl, ret.aaData[1])

				$("#paginator").empty()
				var pageIndex = Math.ceil(ret.aaData[2][0].areatotal / obj.pagesize) || 0
				$("#pageTotal").text(pageIndex)
				$("#itemTotal").text(ret.aaData[2][0].areatotal)
				for(var num = 1; num <= pageIndex; num++) {
					var str = "<li class=''><a href='#" + num + "' class='page-number' onclick='setHash(" + num + ")'>" + num + "</a></li>"
					if((PageIndex + 1) == num)
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
