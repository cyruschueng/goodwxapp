var orderId,
	paymentStatusId = 0;

function chageTheWay() {
	if($("#shipway").val() != 2) {
		$("#wocao").hide()
		setIframeHeight();
	} else {
		$("#wocao").show()
		setIframeHeight();
	}
}

function parseUrl() {
	var url = location.href;
	var i = url.indexOf('?');
	if(i == -1) return;
	var querystr = url.substr(i + 1);
	var arr1 = querystr.split('&');
	var arr2 = new Object();
	for(i in arr1) {
		var ta = arr1[i].split('=');
		arr2[ta[0]] = ta[1];
	}
	return arr2;
}

function initSearch() {

	if(parseUrl()) {
		orderId = parseUrl().orderid;
	} else {
		orderId = 112;
	}
	getDataList(yshurl + "GetOrderInfoById", {
		orderId: orderId
	}, function(d) {
		var data = d.aaData[0][0],
			productNames = "",
			isUsePoint = data.IsUsePoint;

		if(isUsePoint) {
			var html = '<div class="col-lg-1"><div class="btn btn-success" id="ediCredit">修改</div></div>';
			$("#credit").parent().after(html);
		}
		for(var i = 0; i < d.aaData[1].length; i++) {
			productNames += d.aaData[1][i].ProductName + " ";
		}
		$("#orderNum").text(data.OrderNumber || "无");
		$("#createdTime").text(new Date(data.CreatedOnUtc).Format("yyyy-MM-dd hh:mm:ss"));
		$("#productName").text(productNames || "无");
		$("#productCount").text(d.aaData[1].length || 0);
		$("#orderComment").val(data.BuyerComment || "无备注");
		$("#orderStatu").val(data.OrderStatusId);
		$("#logisticStatu").val(data.ShippingStatusId || 14);
		$("#credit").val(data.OrderPoint || 0);
		$("#payType").text(data.PayTypeName);
		$("#price").val(data.OrderTotal || 0);
		$("#buyerPrice").val(data.AmountPaid || 0);
		$("#logistic").text(data.LogisticsStatusName || "暂无信息");
		$("#deliverName").val(data.Person || "暂无");
		$("#deliverPhone").val(data.PhoneNumb || "暂无");
		$("#sellerName").text(data.StoreName || "暂无");
		$("#buyerName").text(data.BuyerName || "暂无");
		$("#buyerPhone").text(data.BuyerTel || "暂无");
		$("#deliverPlace").val(data.ShippingAddress || "暂无");
		$("#shipway").val(data.ShippingMethod || "")
		laytpl($("#tplTable").html()).render(d.aaData[1], function(html) {
			$("#orderDetailTableBody").html(html);
			$(".sss").each(function() {
				if($(this).text() == '0')
					$(this).text("暂无")
			})
			chageTheWay()
		});
		paymentStatusId = data.PaymentStatusId;
		setIframeHeight();
	});
}

$(document).ready(function() {
	setIframeHeight();
	initSearch()
		//bindEvent
	$(document).on("click", "#ediOrderComment", function() {
			document.getElementById("orderComment").readOnly = false;
		}).on("click", "#ediOrderStatu", function() {
			if($("#orderStatu").val() != 30 && $("#orderStatu").val() != 20) {
				$("#orderStatu").removeAttr("disabled");
			}
		}).on("click", "#ediLogisticStatu", function() {
			$("#logisticStatu").removeAttr("disabled");
		}).on("click", "#ediCredit", function() {
			document.getElementById("credit").readOnly = false;
		}).on("click", "#ediPrice", function() {
			document.getElementById("price").readOnly = false;
		}).on("click", "#ediBuyerPrice", function() {
			document.getElementById("buyerPrice").readOnly = false;
		}).on("click", "#deliverPlace", function() {
			document.getElementById("deliverPlace").readOnly = false;
		})
		.on("click", "#deliverPhone", function() {
			document.getElementById("deliverPhone").readOnly = false;
		})
		.on("click", "#deliverName", function() {
			document.getElementById("deliverName").readOnly = false;
		})
		.on("click", "#submit", function() {
			var shipway = $("#shipway").val()
			if(shipway == 2) {
				if(!($("#deliverName").val()) || !($("#deliverPlace").val()) || !($("#deliverPhone").val()) || $("#deliverPhone").val() == "暂无" || $("#deliverPlace").val() == "暂无" || $("#deliverName").val() == "暂无") {
					ysh_alert("快递方式不允许收货人、收货人电话、收货地址为空")
				} else {
					var regNum1 = /^[0-9]+(.[0-9]{2})?$/;
					var regNum2 = /^[0-9]+(.[0-9])?$/;
					var orderComment = $("#orderComment").val() || "无备注",
						orderStatu = $("#orderStatu").val(),
						logisticStatu = $("#logisticStatu").val(),
						credit = $("#credit").val() || 0,
						price = $("#price").val() || 0,
						buyerPrice = $("#buyerPrice").val() || 0,
						valid = [1, ""];
					if(!(regNum1.test(buyerPrice) || regNum2.test(buyerPrice))) {
						valid = [0, "支付金额输入有误"];
					}
					if(!(regNum1.test(price) || regNum2.test(price))) {
						valid = [0, "应付金额输入有误"];
					}
					if(!(regNum1.test(credit) || regNum2.test(credit))) {
						valid = [0, "积分输入有误"];
					}

					if(valid[0]) {
						var orderObj = {
							BuyerComment: orderComment,
							OrderStatusId: orderStatu,
							ShippingStatusId: logisticStatu,
							OrderTotal: price,
							AmountPaid: buyerPrice,
							OrderId: orderId,
							DiscountPoint: credit,
							ShippingMethod: $("#shipway").val(),
							Person: $("#deliverName").val(),
							PhoneNumb: $("#deliverPhone").val(),
							ShippingAddress: $("#deliverPlace").val(),
							PaymentStatusId: paymentStatusId
						}

						if($("#orderStatu").val() != 10)
							orderObj.PaymentStatusId = 30

						if(orderObj.ShippingStatusId == 40)
							orderObj.OrderStatusId = 30

						getDataList(yshurl + "UpdateSpecialOrder", orderObj, function(d) {
							if(d && d.state == 0) {
								ysh_msg("修改成功！");
								setTimeout(function() {
									window.history.back();
								}, 1000);
							} else {
								ysh_msg("修改失败" + d.state + d.msg);
							}
							setIframeHeight();
						})
					} else {
						ysh_msg(valid[1]);
						setIframeHeight();
					}
				}
			} else {
				var regNum1 = /^[0-9]+(.[0-9]{2})?$/;
				var regNum2 = /^[0-9]+(.[0-9])?$/;
				var orderComment = $("#orderComment").val() || "无备注",
					orderStatu = $("#orderStatu").val(),
					logisticStatu = $("#logisticStatu").val(),
					credit = $("#credit").val() || 0,
					price = $("#price").val() || 0,
					buyerPrice = $("#buyerPrice").val() || 0,
					valid = [1, ""];
				if(!(regNum1.test(buyerPrice) || regNum2.test(buyerPrice))) {
					valid = [0, "支付金额输入有误"];
				}
				if(!(regNum1.test(price) || regNum2.test(price))) {
					valid = [0, "应付金额输入有误"];
				}
				if(!(regNum1.test(credit) || regNum2.test(credit))) {
					valid = [0, "积分输入有误"];
				}
				if(valid[0]) {
					var orderObjj = {
						BuyerComment: orderComment,
						OrderStatusId: orderStatu,
						ShippingStatusId: logisticStatu,
						OrderTotal: price,
						AmountPaid: buyerPrice,
						OrderId: orderId,
						DiscountPoint: credit,
						ShippingMethod: $("#shipway").val(),
						Person: $("#deliverName").val(),
						PhoneNumb: $("#deliverPhone").val(),
						ShippingAddress: $("#deliverPlace").val(),
						PaymentStatusId: paymentStatusId
					}
					if($("#orderStatu").val() != 10)
						orderObjj.PaymentStatusId = 30
					getDataList(yshurl + "UpdateSpecialOrder", orderObjj, function(d) {
						if(d && d.state == 0) {
							ysh_msg("修改成功！");
							setTimeout(function() {
								window.history.back();
							}, 1000);
						} else {
							ysh_msg("修改失败" + d.state + d.msg);
						}
						setIframeHeight();
					})
				} else {
					ysh_msg(valid[1]);
					setIframeHeight();
				}
			}
		})
		.on("click","#cancel",function(){
			window.history.back();
		})
});

//物流单号
function wuliu(pid, SKUId, oid, LogisticsNumber) {
	if(!LogisticsNumber)
		LogisticsNumber = ''
	var url = yshurl + "SelectLogisticsNumber"
	var param = {
		OrderId: oid,
		SkuID: SKUId
	}
	var orderNum = ''
	getDataList(url, param, function(ret) {
		$("#logisticsNum").val("")
		orderNum = ret.aaData[0].LogisticsNumber
	}, true)
	$("#logisticsNumHid").val(pid)
	$("#logisticsNum").val(orderNum)
	$("#myModal").modal();
	$("#logisticsNum").val(LogisticsNumber)
	setIframeHeight();
}

function savelogisticsNum() {
	var url = yshurl + "UpdaetLogisticsNumber"
	var param = {
		oorderId: $("#logisticsNumHid").val(),
		LogisticsNumber: $("#logisticsNum").val()

	}
	$("#myModal").modal('hide');
	if(!param.LogisticsNumber) {
		param.LogisticsNumber = 0
		initSearch()
		setIframeHeight();
		getDataList(url, param, function(ret) {
			if(ret && ret.state == 0) {
				initSearch()
			} else {
				ysh_alert("物流单号保存失败，请稍后再试", "error")
			}
		}, false)
	} else {
		//填写物流单号
		getDataList(url, param, function(ret) {
			if(ret && ret.state == 0) {
				initSearch()
			} else {
				ysh_alert("物流单号保存失败，请稍后再试", "error")
			}
		}, false)
	}
}

//模态框隐藏时方法
function clearData() {
	$("#modalForm #modalLabel").text("");
	$("#modalForm #modalSelectList").empty();
	$("#modalTitle").text("");
	setIframeHeight();
}

function trzz() {
	setTimeout(function() {
		setIframeHeight();
	}, 1000);
}