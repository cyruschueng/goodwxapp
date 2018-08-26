$(function() {
	window.parent.goTop(0);
	var hash = window.location.hash;
	initSearch(hash);
	
	//当分页只有一条数据被删除后加载上一页数据
	if($("#view").html() == "暂时没有更多数据！"){
		var num = parseInt(hash.substr(1,1)) - 1;
		var preHash = "#" + num;
		initSearch(preHash);
	}
});

//初始化方法
var initSearch = function(hash) {
	var PageIndex = parseInt(hash.substr(1,1)) - 1;
	var ProductName = $('#ProductName').val() || "";
	var begindate = $('#StartTime').val() || null;
	var enddate = $('#EndTime').val() || null;
	var tpl = $("#tpl").html();
	var url = yshurl + "Get_SpecialProductList ";
	var view = $("#view");
	var obj = {
		"ProductName": ProductName,
		"begindate": begindate,
		"enddate": enddate,
		"pageindex": PageIndex * 10,
		"pagesize": 10
	};
	if(enddate && begindate) {
		getDataList(url, obj, function(msn) {
			if(msn.aaData instanceof Array && msn.aaData.length >= 0) {
				//数据处理
				for(var num in msn.aaData) {
					if(!msn.aaData[num].picurl){
						msn.aaData[num].picurl = 'noimg.jpg'
					} else{
						msn.aaData[num].sumap = formatCurrency(msn.aaData[num].sumap || 0)
					}
					if(msn.aaData[num].IsSpecial == 2){
						msn.aaData[num].IsSpecial = "正在优惠"
					} else if(msn.aaData[num].IsSpecial == 3) {
						msn.aaData[num].IsSpecial = "优惠结束"
					}
				}
				view.empty();
				showData(view, tpl, msn.aaData);
				url = yshurl + "Get_SpecialProductTotal";
				$("#paginator").empty();
				getDataList(url, obj, function(res) {
					var pageIndex = Math.ceil(res.aaData[0].totals / obj.pagesize) || 0;
					$("#itemTotal").text((res.aaData[0].totals || 0))
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
				$("#itemTotal").text('0')
				$("#pageTotal").text('0')
			}
		}, true);
	} else {
		ysh_alert("请输入正确的", "error");
	}
};

//删除
function deleteProduct(SKUID) {
	var url = yshurl + "deletePro_SKU_pro"
	var param = {
		SKUID: SKUID
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