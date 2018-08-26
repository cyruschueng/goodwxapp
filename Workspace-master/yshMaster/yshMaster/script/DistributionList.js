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
	var url = yshurl + "distributionRuleList"
	var view = $("#view")
	var tpl = $("#tpl").html()
	var param = {
		channelId: $("#channel").val() || "",
		RuleName: $("#RuleName").val() || "",
		PageIndex: PageIndex * 10,
		PageSize: 10
	}
	getDataList(url, param, function(ret) {
		view.empty()
		showData(view, tpl, ret.aaData)
		//分页条数
		url = yshurl + "distributionRuleListCount"
		$("#paginator").empty()
		getDataList(url, param, function(res) {
			var pageIndex = Math.ceil(res.aaData[0].count / param.PageSize) || 0
			$("#itemTotal").text((res.aaData[0].count || 0))
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
	var url = yshurl + "deleteRule"
	var param = {
		ruleId: ruleId
	}
	var url1 = yshurl + "get_Act_Distri_Product_msn";
	var arr = [];
	getDataList(url1,"",function(msn){
		for(var i = 0; i < msn.aaData.length;++i){
			if(msn.aaData[i].DistributionId == ruleId){
				arr.push(msn.aaData[i].DistributionId);
			} 
		};
		if(arr.length > 0 ){
			ysh_alert("该条规则存在分润商品，无法删除", "error");
		} 
		if(arr.length == 0) {
			ysh_confirm("是否确定删除", "确认", "取消",function(res){
				if(res){
					getDataList(url, param, function(ret) {
						if(ret.aaData.affectedRows == 1) {
							ysh_alert("删除成功","success");
							setTimeout(function(){
								window.location.reload()
							},1000)
						} else {
							ysh_alert("删除失败", "error")
						}
					}, false);
				}else{
					return
				}
			})
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
