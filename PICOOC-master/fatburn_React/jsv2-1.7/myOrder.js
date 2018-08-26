webpackJsonp([27],{

/***/ 222:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
var Public_error = __webpack_require__(3);
var SWoDeDingDan = {
	SCategory_SWoDeDingDan: 5080400,
	SWoDeDingDan_DengDaiFuKuan: 5080401, //等待付款
	SWoDeDingDan_YiWanCheng: 5080402, //已完成
	SWoDeDingDan_YiGuanBi: 5080403, //已关闭
	SWoDeDingDan_YiQuXiao: 5080404, //已取消
	SWoDeDingDan_QuZhiFu: 5080405 //去支付
};
var MyOrderContainer = React.createClass({
	displayName: "MyOrderContainer",


	getInitialState: function getInitialState() {
		var me = this;
		window.getOrders = me.getOrders;
		me.getOrders();
		return {
			myOrderData: {}
		};

		if (getParamByUrl('webver') > 2) {
			var titleData = {
				title: "燃脂营订单",
				color: "",
				opacity: "",
				backgroundColor: "",
				backgroundOpacity: ""
			};
			titleData = JSON.stringify(titleData);
			appFc.controlTitle(titleData);
		} else {
			var getPageInfo = function getPageInfo() {
				var data = {
					title: "燃脂营订单",
					isShare: false,
					backgroundColor: '#2c2f31'
				};
				return JSON.stringify(data);
			};
			var deviceType = isMobile();
			if (deviceType == "isApp" && typeof mobileApp != "undefined") {
				mobileApp.getShareInfo(getPageInfo());
			}
			document.documentElement.style.webkitTouchCallout = 'none';
		}
	},
	render: function render() {
		var me = this;
		var data = me.state.myOrderData;
		console.log(data);
		var str = "";
		if (typeof me.state.myOrderData.resp != "undefined") {
			if (data.resp.records.length > 0) {
				var str1 = "";
				var str2 = React.createElement(
					"span",
					{ className: "wait" },
					"\u7B49\u5F85\u4ED8\u6B3E"
				);
				var str3 = React.createElement(
					"span",
					{ className: "ok" },
					"\u5DF2\u5B8C\u6210"
				);
				var str4 = React.createElement(
					"span",
					{ className: "ok" },
					"\u5DF2\u5173\u95ED"
				);
				var str5 = React.createElement(
					"span",
					{ className: "ok" },
					"\u5DF2\u53D6\u6D88"
				);
				var str6 = "";
				var str7 = "";
				var str8 = React.createElement(
					"span",
					{ className: "ok" },
					"\u9000\u6B3E\u4E2D"
				);
				var str9 = React.createElement(
					"span",
					{ className: "ok" },
					"\u9000\u6B3E\u5B8C\u6210"
				);

				var list = [];
				for (var i = 0; i < data.resp.records.length; i++) {
					if (data.resp.records[i].orderType == 0) {
						str6 = str2;
						str7 = React.createElement(
							"div",
							{ className: "col-xs-4 col-sm-4 gotoPay" },
							React.createElement(
								"span",
								{ onClick: me.payToFunction, className: "PayTo", "data-goods_type": data.resp.records[i].goodsType, "data-price": data.resp.records[i].currentPrice, "data-order_id": data.resp.records[i].orderId, "data-source_type": data.resp.records[i].sourceType },
								"\u53BB\u652F\u4ED8"
							)
						);
					} else if (data.resp.records[i].orderType == 1) {
						str6 = str3;
						str7 = "";
					} else if (data.resp.records[i].orderType == 2) {
						str6 = str5;
						str7 = "";
					} else if (data.resp.records[i].orderType == 3) {
						str6 = str4;
						str7 = "";
					} else if (data.resp.records[i].orderType == 4) {
						str6 = str8;
						str7 = "";
					} else if (data.resp.records[i].orderType == 5) {
						str6 = str9;
						str7 = "";
					}

					//var goodsUrl = JSON.parse(data.resp.records[i].goodsUrl);
					//var goodsUrl = JSON.parse(data.resp.records[i].goodsUrl);
					if (data.resp.records[i].goodsType == 1) {
						list.push(React.createElement(
							"aside",
							{ key: i, "data-index": i, className: "row order", "data-goods_type": data.resp.records[i].goodsType,
								"data-order_id": data.resp.records[i].orderId, onClick: me.orderFunction },
							React.createElement(
								"div",
								{ className: "row col-xs-12 col-sm-12 orderDetail" },
								React.createElement(
									"div",
									{ className: "col-xs-8 col-sm-8 number" },
									"\u8BA2\u5355\u7F16\u53F7\uFF1A",
									data.resp.records[i].orderId
								),
								React.createElement(
									"div",
									{ className: "col-xs-4 col-sm-4 waitPay" },
									str6,
									React.createElement("img", {
										src: "http://cdn2.picooc.com/web/res/fatburn/image/myOrder/more.png" })
								)
							),
							React.createElement(
								"div",
								{ className: "row col-xs-12 col-sm-12 info" },
								React.createElement(
									"div",
									{ className: "col-xs-3 col-sm-3 infoImg" },
									React.createElement("img", { src: data.resp.records[i].goodsUrl })
								),
								React.createElement(
									"div",
									{ className: "col-xs-9 col-sm-9 infoDesc" },
									React.createElement(
										"h3",
										null,
										data.resp.records[i].goodsName
									),
									React.createElement(
										"p",
										null,
										"\u5F00\u8425\u65F6\u95F4\uFF1A",
										data.resp.records[i].beginTime
									)
								)
							),
							React.createElement(
								"div",
								{ className: "row col-xs-12 col-sm-12 pay" },
								React.createElement(
									"div",
									{ className: "col-xs-8 col-sm-8 payNum" },
									"\u5B9E\u4ED8\u6B3E\uFF1A",
									React.createElement(
										"span",
										{
											className: "payprice" },
										"\xA5",
										data.resp.records[i].currentPrice
									)
								),
								str7
							)
						));
					} else if (data.resp.records[i].goodsType == 2) {
						var saleTime = data.resp.records[i].createTime.substring(0, 10);
						list.push(React.createElement(
							"aside",
							{ key: i, "data-index": i, className: "row order", "data-goods_type": data.resp.records[i].goodsType,
								"data-order_id": data.resp.records[i].orderId, onClick: me.orderFunction },
							React.createElement(
								"div",
								{ className: "row col-xs-12 col-sm-12 orderDetail" },
								React.createElement(
									"div",
									{ className: "col-xs-8 col-sm-8 number" },
									"\u8BA2\u5355\u7F16\u53F7\uFF1A",
									data.resp.records[i].orderId
								),
								React.createElement(
									"div",
									{ className: "col-xs-4 col-sm-4 waitPay" },
									str6,
									React.createElement("img", { src: "http://cdn2.picooc.com/web/res/fatburn/image/myOrder/more.png" })
								)
							),
							React.createElement(
								"div",
								{ className: "row col-xs-12 col-sm-12 info" },
								React.createElement(
									"div",
									{ className: "col-xs-3 col-sm-3 infoImg" },
									React.createElement("img", { src: data.resp.records[i].goodsUrl })
								),
								React.createElement(
									"div",
									{ className: "col-xs-9 col-sm-9 infoDesc" },
									React.createElement(
										"h3",
										null,
										data.resp.records[i].goodsName
									),
									React.createElement(
										"p",
										null,
										"\u8D2D\u4E70\u65F6\u95F4\uFF1A",
										saleTime
									)
								)
							),
							React.createElement(
								"div",
								{ className: "row col-xs-12 col-sm-12 pay" },
								React.createElement(
									"div",
									{ className: "col-xs-8 col-sm-8 payNum" },
									"\u5B9E\u4ED8\u6B3E\uFF1A",
									React.createElement(
										"span",
										{ className: "payprice" },
										"\xA5",
										data.resp.records[i].currentPrice
									)
								),
								str7
							)
						));
					}
				}
				str = list;
			} else {
				str = React.createElement(
					"div",
					{ className: "row noOrder" },
					"\u6682\u65E0\u76F8\u5173\u8BA2\u5355\u4FE1\u606F~"
				);
			}
		}
		return React.createElement(
			"section",
			{ className: "container" },
			React.createElement(
				"div",
				{ className: "myOrders" },
				str
			)
		);
	},

	//获取订单列表
	getOrders: function getOrders() {
		var me = this;
		var finalUrl = ajaxLink + "/v1/api/campOrder/findOrders" + window.location.search;
		//var finalUrl='http://172.17.1.233:8080/v1/api/campOrder/findOrders'+window.location.search;
		console.log(finalUrl);
		$.ajax({
			type: "get",
			url: finalUrl,
			dataType: "json",
			success: function success(data) {
				if (data.code == 200) {
					//console.log(data);
					//console.log(finalUrl);
					if (typeof me.state.myOrderData.resp != "undefined") {
						if (me.state.myOrderData.resp.records.length > 0) {
							data.resp.records = me.state.myOrderData.resp.records.concat(data.resp.records);
						}
					}
					me.setState({ myOrderData: data });
				} else {
					$(".error-main-t").html(data.result.message);
					$(".errorAlert").css("display", "block");
					$(".error-main").css("margin-top", -$(".error-main").height() / 2);
				}
			}
		});
	},

	//跳转到订单详情页
	orderFunction: function orderFunction(event) {
		event.stopPropagation();
		var me = this;
		var data = me.state.myOrderData;
		$(event.currentTarget).css("opacity", "0.6");
		var index = event.currentTarget.getAttribute("data-index"); //设置埋点
		if (data.resp.records[index].orderType == 0) {
			setMaiDian(SWoDeDingDan.SCategory_SWoDeDingDan, SWoDeDingDan.SWoDeDingDan_DengDaiFuKuan); //等待付款
		} else if (data.resp.records[index].orderType == 1) {
			setMaiDian(SWoDeDingDan.SCategory_SWoDeDingDan, SWoDeDingDan.SWoDeDingDan_YiWanCheng); //已完成
		} else if (data.resp.records[index].orderType == 2) {
			setMaiDian(SWoDeDingDan.SCategory_SWoDeDingDan, SWoDeDingDan.SWoDeDingDan_YiQuXiao); //已取消
		} else if (data.resp.records[index].orderType == 3) {
			setMaiDian(SWoDeDingDan.SCategory_SWoDeDingDan, SWoDeDingDan.SWoDeDingDan_YiGuanBi); //已关闭
		}
		var orderId = event.currentTarget.getAttribute("data-order_id");
		setCookiePath("toOrderDetails", "1", 1, "/;domain=picooc.com");
		// setCookie("toOrderDetails","1",1); //在cookie中存放跳转到订单详情页面的标识 1为从订单列表跳转的
		if (event.currentTarget.getAttribute("data-goods_type") == 1) {
			window.location.href = "orderDetails.html" + window.location.search + "&orderId=" + orderId;
		} else if (event.currentTarget.getAttribute("data-goods_type") == 2) {
			window.location.href = "hdOrderDetails.html" + window.location.search + "&orderId=" + orderId;
		}
	},

	//去支付
	payToFunction: function payToFunction(event) {
		event.stopPropagation();
		setMaiDian(SWoDeDingDan.SCategory_SWoDeDingDan, SWoDeDingDan.SWoDeDingDan_QuZhiFu); //去支付
		//$(event.currentTarget).css("opacity","0.6");
		delCookie("toOrderSuccess");
		setCookiePath("toOrderSuccess", "1", 1, "/;domain=picooc.com");
		// alert("测试toOrderSuccess:"+getCookie("toOrderSuccess"));

		var orderId = event.currentTarget.getAttribute("data-order_id");
		var currentPrice = event.currentTarget.getAttribute("data-price");
		var sourceType = $.trim(event.currentTarget.getAttribute("data-source_type"));
		// alert(sourceType);
		var deviceType = isMobile();
		if (event.currentTarget.getAttribute("data-goods_type") == 1) {
			if (sourceType == '燃脂营APP' || sourceType == '有赞') {
				if (deviceType == "isApp") {
					var getPageInfo = function getPageInfo() {
						var paydata = {
							orderId: orderId,
							url: absoluteUrl + "orderSuccess.html" + window.location.search + "&orderId=" + orderId,
							price: currentPrice,
							isRefresh: true,
							function: ""
						};
						return JSON.stringify(paydata);
					};
					if (getParamByUrl('webver') > 2) {
						appFc.gotoPay(getPageInfo());
					} else {
						mobileApp.gotoPay(getPageInfo());
					}
				}
			} else if (sourceType == '微信') {
				$(".error-main-t").html('该订单在微信上生成哒，请在同一个渠道完成支付~');
				$(".errorAlert").css("display", "block");
				$(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
			} else if (sourceType == '微博') {
				$(".error-main-t").html('该订单在微博上生成哒，请在同一个渠道完成支付~');
				$(".errorAlert").css("display", "block");
				$(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
			} else if (sourceType == 'QQ') {
				$(".error-main-t").html('该订单在qq上生成哒，请在同一个渠道完成支付~');
				$(".errorAlert").css("display", "block");
				$(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
			} else {
				$(".error-main-t").html('该订单在浏览器上生成哒，请在同一个渠道完成支付~');
				$(".errorAlert").css("display", "block");
				$(".error-main").css("margin-top", -$(".fixbg-main").height() / 2);
			}
		} else if (event.currentTarget.getAttribute("data-goods_type") == 2) {
			if (deviceType == "isApp") {
				var getPageInfo2 = function getPageInfo2() {
					var paydata = {
						orderId: orderId,
						url: absoluteUrl + "hdPaySuccess.html" + window.location.search + "&orderId=" + orderId,
						price: currentPrice,
						isRefresh: true,
						function: "getOrders"
					};
					return JSON.stringify(paydata);
				};
				if (getParamByUrl('webver') > 2) {
					appFc.gotoPay(getPageInfo2());
				} else {
					mobileApp.gotoPay(getPageInfo2());
				}
			}
		}
	}
});

var Component = React.createClass({
	displayName: "Component",


	render: function render() {
		return React.createElement(
			"div",
			null,
			React.createElement(MyOrderContainer, null),
			React.createElement(Public_error, null)
		);
	}
});

ReactDOM.render(React.createElement(Component, null), document.getElementById('myOrderBox'));

/***/ })

},[222]);