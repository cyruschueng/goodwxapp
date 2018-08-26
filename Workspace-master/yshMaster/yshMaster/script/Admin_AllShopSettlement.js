$(function(){
	window.parent.goTop(0)
	var hash = window.location.hash;
	init(hash);
})

//初始化
function init(hash) {
	initInputData();
	initSearch(hash);
}

//查询数据
function initSearch(hash) {
	var PageIndex = parseInt(hash.substr(1,1000000)) - 1;
	var url = yshurl + "GETStateMentStorelist"
	var view = $("#view")
	var tpl = $("#tpl").html()
	var param = {
//		storeName: $("#storeName").val() || "",
		begindate: $("#dealTimeStart").val(),
		enddate: $("#dealTimeEnd").val(),
		pageindex: PageIndex * 10,
		pagesize: 10
	}
	getDataList(url, param, function(ret) {
		
		if(ret.aaData.length !=0)
			var StateMentSUM = ret.aaData[0].StateMentSUM;
			if (StateMentSUM == null){
				StateMentSUM = 0
			}
			$("#totalStateMent").text(StateMentSUM)
		
		view.empty();
		showData(view, tpl, ret.many[0]);
		
		//分页条数
		$("#paginator").empty()
		var pageIndex = Math.ceil(ret.many[1][0].totals / param.pagesize) || 0
		$("#itemTotal").text((ret.many[1][0].totals || 0))
		$("#pageTotal").text(pageIndex)
		for(var num = 1; num <= pageIndex; num++) {
			var str = "<li class=''><a href='#" + num + "' class='page-number' onclick='setHash(" + num + ")'>" + num + "</a></li>"
			if((PageIndex + 1) == num)
				str = "<li class='active pageFlag'><a href='#" + num + "' class='page-number'>" + num + "</a></li>"
			$("#paginator").append(str)
		}
	}, true)
}

//初始化搜索时间
function initInputData (){
	var myDate = new Date();
	var currentDate = myDate.Format("yyyy-MM-dd hh:mm:ss.S").substr(0,10);
	//设置前7天日期
	myDate.setDate(myDate.getDate() - 7);
	var weekAgoDate = myDate.Format("yyyy-MM-dd hh:mm:ss.S").substr(0,10);
	$("#dealTimeStart").val(weekAgoDate);
	$("#dealTimeEnd").val(currentDate);
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