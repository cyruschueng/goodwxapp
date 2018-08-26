$(document).ready(function() {
	var action = ysh_GetQueryString("action") || null;
	var skuId = ysh_GetQueryString("skuId") || null;
	init(action, skuId);
	if(action == "search"){
		$(".inputZid").attr("disabled", true);
	}
})

//初始化方法
function init(action, skuId) {
	switch(action) {
		case "editor":
			$("#saveButton").click(function() {
				editorSubForm(skuId);
			});
			$("select").each(function() {
				$(this).prop("disabled", true)
			});
			getChannel(function() {
				initSearch(skuId)
			});
			break;
		case "search":
			$("#saveButton").hide();
			$("input").each(function() {
				$(this).attr("disabled", true)
			});
			$("select,.btn-primary").each(function() {
				$(this).prop("disabled", true)
			});
			$(".btn-danger").html("返回");
			getChannel(function() {
				initSearch(skuId)
			});
			break;
		case "add":
			$("#saveButton").click(function() {
				subForm()
			});
			$("#addExpaln").show();
			getChannel(function() {
				addInitSearch();
			});
			break;
	}
}

//添加功能初始化查询
function addInitSearch() {
	var view = $("#view");
	var tpl = $("#tpl").html();
	var NowDate = new Date().Format("yyyy-MM-dd hh:mm:ss.S").substr(0,10);
	$("#entTime,#StartTime").attr("value",NowDate);
	var url = yshurl + "ShowSKUlistByProductId";
	var param = {
		ProductId: $("#channel").val()
	};
	getDataList(url, param, function(msn) {
		if(msn.aaData instanceof Array && msn.aaData.length > 0) {
			//获取规格单位
			var UnitDW;
			var url = yshurl + "getUnitByUnitId";
			for(var i=0;i<msn.aaData.length;++i){
				var param = new Object();
				param.UnitId=msn.aaData[i].UnitId
				getDataList(url,param,function(d){
					if(d.aaData)
					UnitDW = d.aaData[0].MeasureName;
					//处理规格单位
					msn.aaData[i].Specifications = msn.aaData[i].Specifications + UnitDW;
				})
			}
			view.empty();
			showData(view, tpl, msn.aaData);
		} else {
			view.html("暂时没有更多数据！")
		}
	});
}

//查看编辑功能初始化查询
function initSearch(skuId) {
	var view = $("#view");
	var tpl = $("#tpl").html();
	var url = yshurl + "ShowSKUInterBySKUId";
	var param = {
		SKUId: skuId
	};
	getDataList(url, param, function(msn) {
		if(msn.aaData instanceof Array && msn.aaData.length > 0) {
			//获取规格单位
			var UnitDW;
			var url = yshurl + "getUnitByUnitId";
			for(var i=0;i<msn.aaData.length;++i){
				var param = new Object();
				param.UnitId=msn.aaData[i].UnitId
				getDataList(url,param,function(d){
					UnitDW = d.aaData[0].MeasureName;
					//处理规格单位
					msn.aaData[i].Specifications = msn.aaData[i].Specifications + UnitDW;
				})
			}
			view.empty();
			showData(view, tpl, msn.aaData);
			$(".inputZid").attr("value", msn.aaData[0].SpecialPrice);
			$("#StartTime").attr("value", msn.aaData[0].BeginDate);
			$("#entTime").attr("value", msn.aaData[0].EndDate);
			$("#channel").html("<option>" + msn.aaData[0].ProductName + "</option>");
		} else {
			view.html("暂时没有更多数据！")
		}
	});
}

//获取商品列表
function getChannel(callback) {
	var url = yshurl + "Show_SpecialProductTable"
	var param = new Object()
	var str = ""
	getDataList(url, {
		ProductName: ""
	}, function(ret) {
		for(var num in ret.aaData) {
			str += "<option value=" + ret.aaData[num].Id + ">" + ret.aaData[num].ProductName + "</option>";
		}
		$("#channel").append(str);
		callback && callback();
	})
};

//编辑提交表单
function editorSubForm(skuId) {
	var url1 = yshurl + "UpdateSpecialSKUdateForUpdate";
	var SpecialPrice;
	$('.inputZid').each(function(){
		SpecialPrice = $(this).val();
	})
	var param = {
		SpecialPrice: SpecialPrice,
		BeginDate: $("#StartTime").val(),
		EndDate: $("#entTime").val(),
		SKUID: skuId
	};
	var param2 ={
		SKUId:skuId
	}
	var NowDate = new Date().Format("yyyy-MM-dd hh:mm:ss.S").replace(/-/g, "").substr(0,8);
	
	if(Number(param.EndDate.replace(/-/g, "")) < Number(NowDate)){
		ysh_msg("结束日期不能早于当前日期");
	} else if (Number(param.EndDate.replace(/-/g, "")) < Number(param.BeginDate.replace(/-/g, ""))){
		ysh_msg("结束日期不能早于开始日期");
	} else {
		var url = yshurl + "SelectSKUIdfromCoupsns";
		getDataList(url,param2,function(d){
			if(d.aaData[0].totals == 0){
				getDataList(url1, param, function(msn) {
					if(msn.state == 0) {
						ysh_msg("编辑成功！");
						history.back();
					} else ysh_msg("编辑失败！");
				}, false) 
			} else {
				ysh_msg("该商品规格已参加其他优惠活动！");
			}
		})	
	}
}

//添加提交表单
function subForm() {
	var url = yshurl + "UpdateSpecialSKUdate";
	var objArra = [];
	$('.inputZid').each(function(){
		var str = $(this).attr("zid") + "|" + $(this).val();
		objArra.push(str)
	})
	var skuids = objArra.join(',');
	var param = {
		BeginDate: $("#StartTime").val(),
		EndDate: $("#entTime").val(),
		skuids:skuids
	};
	var NowDate = new Date().Format("yyyy-MM-dd hh:mm:ss.S").replace(/-/g, "").substr(0,8);
	
	if(Number(param.EndDate.replace(/-/g, "")) < Number(NowDate)){
		ysh_msg("结束日期不能早于当前日期");
	} else if (Number(param.EndDate.replace(/-/g, ""))<Number(param.BeginDate.replace(/-/g, ""))){
		ysh_msg("结束日期不能早于开始日期");
	} else {
		getDataList(url, param, function(msn) {
			if(msn.state == 0) {
				ysh_msg("添加成功！");
				getDataList(yshurl + '', {}, function(){
					history.back();
				})

			} else{
				ysh_msg("添加失败！");
			}
		}, false);
	}
}

//输入优惠价验证
function SpecialPriceBlur(t) {
	var yjVal = t.parent().parent().parent().children().eq(3).children().eq(0).children().eq(0).val();
	var v = t.val();
	if(Number(v) - Number(yjVal) < 0 ) {
		t.parent().next().css("display", "none");
		$("#saveButton").prop("disabled", false);
	} else {
		t.parent().next().css("display", "block");
		$("#saveButton").prop("disabled", true);
	}
	
	//保存按钮状态判断
	var arr = []
	$(".tips").each(function(){
		arr.push($(this).css("display"))
	})
	
	//数组去重
	var n = [];
	for(var i = 0; i < arr.length; i++){
		if (n.indexOf(arr[i]) == -1) n.push(arr[i]);
	}
	if(n[0]=="block" || n[1] == "block"){
		$("#saveButton").prop("disabled", true);
	}
}

//点击取消
function JumpToCustomerCenter() {
	window.history.back();
}