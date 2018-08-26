$(function() {
	window.parent.goTop(0)
	var hash = window.location.hash;
	var checkList = new Array();
	init(hash);
	$('select').select2();
	leftCancelShade('myModal');
	
	//结算总金额 //未结算  //已结算
	$("#totalStateMent").text(getCookie("totalStateMentkey"))
	$("#totalStateMent1").text(getCookie("totalStateMentkey1"))
	$("#totalStateMent2").text(getCookie("totalStateMentkey2"))
	
	//弹出框取消确定按钮操作
	$("#cancel,#sure").on("click",function(){
		initSearch(hash);
	})
	
})

//初始化
function init(hash) {
	initInputData();
	initSearch(hash);
	getChannelSelect(function(ret) {
		var str = ""
		for(var num in ret.aaData) {
			str += "<option value=" + ret.aaData[num].Id + ">" + ret.aaData[num].StoreName + "</option>"
		}
		$("#storeName").append(str)
	})
}

//获取店铺下拉列表
function getChannelSelect(callback) {
	var url = yshurl + "getstore"
	var param = {}
	getDataList(url, param, function(ret) {
		callback && callback(ret)
	}, true)
}

//查询数据
function initSearch(hash) {
	var PageIndex = parseInt(hash.substr(1, 1000000)) - 1;
	var url = yshurl + "GETStateMentlist"
	var view = $("#view")
	var tpl = $("#tpl").html()
	var param = {
		storeid: $("#storeName").val(),
		begindate: $("#dealTimeStart").val(),
		enddate: $("#dealTimeEnd").val(),
		StatementStatus: $("#StatementStatus").val(),
		pageindex: PageIndex * 10,
		pagezise: 10
	}
	
	//查询数据
	getDataList(url, param, function(ret) {
		if(ret.many.length != 0) {
			var totalStateMent = ret.many[2][0].totalStateMent;
			setCookie("totalStateMentkey", totalStateMent)
			$("#totalStateMent").text(totalStateMent)

			var totalStateMent1 = ret.many[3][0].totalStateMent1;
			setCookie("totalStateMentkey1", totalStateMent1)
			$("#totalStateMent1").text(totalStateMent1)

			var totalStateMent2 = ret.many[4][0].totalStateMent2;
			setCookie("totalStateMentkey2", totalStateMent2)
			$("#totalStateMent2").text(totalStateMent2)

		}
		
		//数据处理
		for(var num in ret.many[0]) {
			if(ret.many[0][num].StatementStatus == 0) {
				ret.many[0][num].StatementStatus = "可结算";
				var btn0 = "<button class='btn btn-danger' onclick='StatementStatusBtn(" + ret.many[0][num].Id + ")' type='button'>结算</button>"
				ret.many[0][num].btnStatus = btn0;
			} else if(ret.many[0][num].StatementStatus == 1) {
				ret.many[0][num].StatementStatus = "已结算";
				var btn1 = "<button class='btn btn-success' type='button' disabled='disabled'>已结算</button>"
				ret.many[0][num].btnStatus = btn1;
			} else {
				ret.many[0][num].StatementStatus = "部分结算";
				var btn0 = "<button class='btn btn-danger' onclick='StatementStatusBtn(" + ret.many[0][num].Id + ")' type='button'>结算</button>"
				ret.many[0][num].btnStatus = btn0;
			}
		}
		view.empty();
		showData(view, tpl, ret.many[0]);

		//分页条数
		$("#paginator").empty()
		var pageIndex = Math.ceil(ret.many[1][0].totals / param.pagezise) || 0
		$("#itemTotal").text((ret.many[1][0].totals || 0))
		$("#pageTotal").text(pageIndex)
		for(var num = 1; num <= pageIndex; num++) {
			var str = "<li class=''><a href='#" + num + "' class='page-number' onclick='setHash(" + num + ")'>" + num + "</a></li>"
			if((PageIndex + 1) == num)
				str = "<li class='active pageFlag'><a href='#" + num + "' class='page-number'>" + num + "</a></li>"
			$("#paginator").append(str)
		}

		//全选取消全选操作
		var checkListEles = $("input[type='checkbox']");
		$("#allChecked").toggle(function() {
			$.each(checkListEles, function() {
				$(this).attr("checked", true);
			});
		}, function() {
			$.each(checkListEles, function() {
				$(this).attr("checked", false);
			});
		})
	}, true)
}

//初始化搜索时间
function initInputData() {
	var myDate = new Date();
	var currentDate = myDate.Format("yyyy-MM-dd hh:mm:ss.S").substr(0, 10);
	myDate.setDate(myDate.getDate() + 1)
	
	//传参数日期
	var paramEndDate = myDate.Format("yyyy-MM-dd hh:mm:ss.S").substr(0, 10)
	
	//设置前7天日期
	myDate.setDate(myDate.getDate() - 8);
	var weekAgoDate = myDate.Format("yyyy-MM-dd hh:mm:ss.S").substr(0, 10);
	$("#dealTimeStart").val(weekAgoDate);
	$("#dealTimeEnd").val(currentDate);
	$("#dealTimeEnd").attr("endDate",paramEndDate)
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

//单个结算
function StatementStatusBtn(id) {
	var url = yshurl + "UPDATEStatementStatus";
	var param = new Object;
	param.OrderId = id;
	param.StatementStatus = 1;
	getDataList(url, param, function(msn) {
		if(msn.state == 0) {
			location.reload();
		} else {
			ysh_alert("结算失败", "error");
		}
	})
}

//批量修改
function batchStatementStatus() {
	if(getCheckIds().length == 0) {
		ysh_alert("请选择订单号再进行操作", "warning");
		return;
	}

	var ids = getCheckIds().join(",");
	var url = yshurl + "UPDATEStatementStatus";
	var param = new Object;
	param.OrderId = ids;
	param.StatementStatus = 1;
	getDataList(url, param, function(msn) {
		if(msn.state == 0) {
			location.reload();
		} else {
			ysh_alert("结算失败", "error");
		}
	})
}

//获取被选择的Id
function getCheckIds() {
	var checkList = new Array();
	var checkListEles = $("input[type='checkbox']");
	$.each(checkListEles, function() {
		if($(this).prop("checked")) {
			checkList.push($(this).attr("Id"))
		}
	});
	return checkList;
}

//订单明细
function getorderitem(orderid) {
	var url = yshurl + "GetOrderInfoById"
	var param = {
		orderId: orderid
	}

	getDataList(url, param, function(ret) {
		if(ret.aaData[1]) {
			for(var num in ret.aaData[1]) {
				if(ret.aaData[1][num].Congeal == 1) {
					ret.aaData[1][num].totalprice = ret.aaData[1][num].Price * ret.aaData[1][num].ItemWeight
					ret.aaData[1][num].StatementStatus = "订单冻结无法结算"
				} else if(ret.aaData[1][num].StatementStatus != 0) {
					ret.aaData[1][num].totalprice = ret.aaData[1][num].Price * ret.aaData[1][num].ItemWeight
					ret.aaData[1][num].StatementStatus = "已结算"
				} else {
					ret.aaData[1][num].totalprice = ret.aaData[1][num].Price * ret.aaData[1][num].ItemWeight
					ret.aaData[1][num].StatementStatus = "可结算"
				}
			}
			$("#view_bs").empty();
			showData($("#view_bs"), $("#tpl_bs").html(), ret.aaData[1]);
		} else {
			noData($("#view_bs").empty())
		}
	})
};

//更新订单结算价
function updateStatment(OrderItemId) {
		var StateMents = $("#StateMent").val() || null
	if(!StateMents) {
		ysh_alert("结算价不为空", "error")
	} else {
		var url = yshurl + "UpdateStatmentForOrderItem"
		var param = {
			StateMent: StateMents,
			OrderItemId: OrderItemId
		}
		getDataList(url, param, function(ret) {
			if(ret.aaData.changedRows > 0 || ret.aaData.affectedRows > 0) {
				ysh_msg("保存成功")
			}else{
				ysh_msg("保存失败")
			}
		})
	}
};
