$(function () {
	$(".container").css("minHeight", $(window).height() + "px");
	appNoShare("有品燃脂营");

	isComplete();
	//判断是否是最新版本App
	// isNewVersion();
	//alert(window.location.href);
	//alert(window.location.search);
	//$(".openContent").css("height",parseInt($(window).height()-$(".openTopInfo").height()-3.95*fontHeight)+"px");
	$(".gotoTips").unbind("click").click(function (event) {
		window.location.href = "http://detection.picooc.com/details358" + window.location.search;
		event.stopPropagation();
	});
	leftControl();

});
function isComplete() {
	/*alert("调用~");*/
	var targetRoleId = getParamByUrl("roleId");
	var orderId = getParamByUrl('orderId');
	var sex = getParamByUrl('sex');
	var host = window.location.protocol + "//" + window.location.host;
	var finalUrl = host + "/v1/api/campQuestion/complete" + window.location.search;
	/*alert(finalUrl);*/
	$.ajax({
		type: "get",
		url: finalUrl,
		dataType: "json",
		success: function (data) {

			if (data.code == 200) {
				// $("#questionnaire").unbind("click").bind("click", function () {
				// 	if (data.resp.profile == true) {

				// 		if (getParamByUrl('sourceType') == 1) {
				// 			var url = absoluteUrl + "questionnaireShow.html" + window.location.search;
				// 			var getPageInfo = function () {
				// 				var data = {
				// 					link: url,
				// 					animation: 1//默认1从右到左，2从下到上
				// 				};
				// 				return JSON.stringify(data);
				// 			};
				// 			var deviceType = isMobile();
				// 			if (deviceType == "isApp") {
				// 				appFc.openWebview(getPageInfo());
				// 			} else {
				// 				window.location.href = url;
				// 			}

				// 		}
				// 		else {
				// 			var url = absoluteUrl + "questionnaireShow1.html" + window.location.search;
				// 			var getPageInfo = function () {
				// 				var data = {
				// 					link: url,
				// 					animation: 1//默认1从右到左，2从下到上
				// 				};
				// 				return JSON.stringify(data);
				// 			};
				// 			var deviceType = isMobile();
				// 			if (deviceType == "isApp") {
				// 				appFc.openWebview(getPageInfo());
				// 			} else {
				// 				window.location.href = url;
				// 			}

				// 		}
				// 	} else {
				// 		// 判断订单购买来源是燃脂营APP内（if:1）|(else:)外,跳转不同的个人资料
				// 		if (getParamByUrl('sourceType') == 1) {
				// 			var url = absoluteUrl + "questionnaire2.html" + window.location.search;
				// 			var getPageInfo = function () {
				// 				var data = {
				// 					link: url,
				// 					animation: 1//默认1从右到左，2从下到上
				// 				};
				// 				return JSON.stringify(data);
				// 			};
				// 			var deviceType = isMobile();
				// 			if (deviceType == "isApp") {
				// 				appFc.openWebview(getPageInfo());
				// 			} else {
				// 				window.location.href = url;
				// 			}

				// 		} else {
				// 			var url = absoluteUrl + "questionnaire1.html" + window.location.search;
				// 			var getPageInfo = function () {
				// 				var data = {
				// 					link: url,
				// 					animation: 1//默认1从右到左，2从下到上
				// 				};
				// 				return JSON.stringify(data);
				// 			};
				// 			var deviceType = isMobile();
				// 			if (deviceType == "isApp") {
				// 				appFc.openWebview(getPageInfo());
				// 			} else {
				// 				window.location.href = url;
				// 			}

				// 		}
				// 	}
				// });


				// $("#sportTest").unbind("click").bind("click", function () {
				// 	if (data.resp.sportText == true) {
				// 		//window.location.href="trainExplain.html"+window.location.search;
				// 		//还没有做体侧视频
				// 		if (data.resp.sportVideo == false) {
				// 			// alert('false')
				// 			jumpSport(data.resp.campId);
				// 		} else {
				// 			getSportResult(data.resp.campId);
				// 		}
				// 	} else {
				// 		// + '&orderId=' + orderId + '&sex=' + sex
				// 		var url = absoluteUrl + "trainExplain.html" + window.location.search;
				// 		var getPageInfo = function () {
				// 			var data = {
				// 				link: url,
				// 				animation: 1//默认1从右到左，2从下到上
				// 			};
				// 			return JSON.stringify(data);
				// 		};
				// 		var deviceType = isMobile();
				// 		if (deviceType == "isApp") {
				// 			appFc.openWebview(getPageInfo());
				// 		} else {
				// 			window.location.href = url;
				// 		}
				// 		// window.location.href = "trainExplain.html" + window.location.search;
				// 	}
				// });

				if (data.resp.day >= 60) {
					$(".datumBottom").css("display", "block");
					$(".datumBottom").html("Tips: 您已经" + data.resp.day + "天未上秤测量啦~快去测量吧，以便教练综合您的身体与体测结果分配运动计划");
				}
				else if (data.resp.day < 0) {
					$(".datumBottom").css("display", "block");
					$(".datumBottom").html("Tips: 您还未上秤测量哦~快去测量吧，以便教练综合您的身体与体测结果分配运动计划");
				}
				else {
					$(".datumBottom").css("display", "none");
				}
				var nowDate = new Date(data.resp.beginTiem);
				var month = nowDate.getMonth() + 1;
				var days = nowDate.getDate();
				var weeks = "日一二三四五六".charAt(nowDate.getDay());
				$('.openTopTitle1').html(month + '月' + days + '日' + ' 星期' + weeks);
			} else {
				$(".error-main-t").html(data.message);
				$(".errorAlert").css("display", "block");
				$(".error-main").css("margin-top", -$(".error-main").height() / 2);
			}
		}

	});
}
$("#questionnaire").unbind("click").bind("click", function () {
	var targetRoleId = getParamByUrl("roleId");
	var orderId = getParamByUrl('orderId');
	var sex = getParamByUrl('sex');
	var host = window.location.protocol + "//" + window.location.host;
	var finalUrl = host + "/v1/api/campQuestion/complete" + window.location.search;
	$.ajax({
		url: finalUrl,
		type: "get",
		url: finalUrl,
		dataType: "json",
		success: function (data) {
			if (data.code == 200) {
				if (data.resp.profile == true) {
					if (getParamByUrl('sourceType') == 1) {
						var url = absoluteUrl + "questionnaireShow.html" + window.location.search;
						var getPageInfo = function () {
							var data = {
								link: url,
								animation: 1//默认1从右到左，2从下到上
							};
							return JSON.stringify(data);
						};
						var deviceType = isMobile();
						if (deviceType == "isApp") {
							appFc.openWebview(getPageInfo());
						} else {
							window.location.href = url;
						}
					}
					else {
						var url = absoluteUrl + "questionnaireShow1.html" + window.location.search;
						var getPageInfo = function () {
							var data = {
								link: url,
								animation: 1//默认1从右到左，2从下到上
							};
							return JSON.stringify(data);
						};
						var deviceType = isMobile();
						if (deviceType == "isApp") {
							appFc.openWebview(getPageInfo());
						} else {
							window.location.href = url;
						}

					}
				} else {
					// 判断订单购买来源是燃脂营APP内（if:1）|(else:)外,跳转不同的个人资料
					if (getParamByUrl('sourceType') == 1) {
						var url = absoluteUrl + "questionnaire2.html" + window.location.search;
						var getPageInfo = function () {
							var data = {
								link: url,
								animation: 1//默认1从右到左，2从下到上
							};
							return JSON.stringify(data);
						};
						var deviceType = isMobile();
						if (deviceType == "isApp") {
							appFc.openWebview(getPageInfo());
						} else {
							window.location.href = url;
						}

					} else {
						var url = absoluteUrl + "questionnaire1.html" + window.location.search;
						var getPageInfo = function () {
							var data = {
								link: url,
								animation: 1//默认1从右到左，2从下到上
							};
							return JSON.stringify(data);
						};
						var deviceType = isMobile();
						if (deviceType == "isApp") {
							appFc.openWebview(getPageInfo());
						} else {
							window.location.href = url;
						}

					}
				}
			}
			else {
				$(".error-main-t").html(data.message);
				$(".errorAlert").css("display", "block");
				$(".error-main").css("margin-top", -$(".error-main").height() / 2);
			}
		},
		error: function () {
			$(".error-main-t").html('网络错误~');
			$(".errorAlert").css("display", "block");
			$(".error-main").css("margin-top", -$(".error-main").height() / 2);
		}

	})

});

$("#sportTest").unbind("click").bind("click", function () {
	var targetRoleId = getParamByUrl("roleId");
	var orderId = getParamByUrl('orderId');
	var sex = getParamByUrl('sex');
	var host = window.location.protocol + "//" + window.location.host;
	var finalUrl = host + "/v1/api/campQuestion/complete" + window.location.search;
	$.ajax({
		url: finalUrl,
		type: "get",
		url: finalUrl,
		dataType: "json",
		success: function (data) {
			if (data.code == 200) {
				if (data.resp.sportText == true) {
					//window.location.href="trainExplain.html"+window.location.search;
					//还没有做体侧视频
					if (data.resp.sportVideo == false) {
						// alert('false')
						jumpSport(data.resp.campId);
					} else {
						getSportResult(data.resp.campId);
					}
				} else {
					// + '&orderId=' + orderId + '&sex=' + sex
					var url = absoluteUrl + "trainExplain.html" + window.location.search;
					var getPageInfo = function () {
						var data = {
							link: url,
							animation: 1//默认1从右到左，2从下到上
						};
						return JSON.stringify(data);
					};
					var deviceType = isMobile();
					if (deviceType == "isApp") {
						appFc.openWebview(getPageInfo());
					} else {
						window.location.href = url;
					}
					// window.location.href = "trainExplain.html" + window.location.search;
				}
			}
			else {
				$(".error-main-t").html(data.message);
				$(".errorAlert").css("display", "block");
				$(".error-main").css("margin-top", -$(".error-main").height() / 2);
			}
		},
		error:function(){
			$(".error-main-t").html('网络错误~');
			$(".errorAlert").css("display", "block");
			$(".error-main").css("margin-top", -$(".error-main").height() / 2);
		}

	})



});
var deviceType = isMobile();

//查看运动测试结果
function getSportResult(campId) {
	var roleId = getParamByUrl("roleId");
	var orderId = getParamByUrl("orderId");
	var getPageInfo = function () {
		var data = {
			roleId: roleId,
			campId: campId,
			orderId: orderId
		};
		return JSON.stringify(data);
	};
	if (deviceType == "isApp") {
		if (getParamByUrl("os") == "android") {
			mobileApp.getSportResult(getPageInfo());
		} else {
			window.webkit.messageHandlers.getSportResult.postMessage(getPageInfo());
		}
	}
	document.documentElement.style.webkitTouchCallout = 'none';
}

//设置跳到运动视频的方法
function jumpSport(campId) {
	//alert("campId:"+campId);
	var roleId = getParamByUrl("roleId");
	var orderId = getParamByUrl("orderId");
	var type = 1;
	var getPageInfo = function () {
		var data = {
			roleId: roleId,
			type: type,
			campId: campId,
			orderId: orderId
		};
		return JSON.stringify(data);
	};
	// alert(getPageInfo());
	if (deviceType == "isApp") {
		if (getParamByUrl("os") == "android") {
			// alert(data);
			mobileApp.jumpSport(getPageInfo());
		} else {
			window.webkit.messageHandlers.jumpSport.postMessage(getPageInfo());
		}
	}
	document.documentElement.style.webkitTouchCallout = 'none';
}
// 控制返回
function leftControl() {
	var getPageInfo = function () {
		var data = {
			iconType: 0,
			iconColor: "",
			backNum: 0,
			closeWebview: 1,
			hidden: false,
			isHandle: false,
			functionName: ""
			//isRefreshPage:true
		};
		return JSON.stringify(data);
	}
	var deviceType = isMobile();
	if (deviceType == "isApp" && (typeof mobileApp != "undefined")) {
		if (getParamByUrl("os") == "android") {
			mobileApp.controlLeft(getPageInfo());
		}
		else {
			window.webkit.messageHandlers.controlLeft.postMessage(getPageInfo());
		}
		//mobileApp.showLeftBtn(getPageInfo());
	}
	document.documentElement.style.webkitTouchCallout = 'none';
}


//设置标题
function appNoShare(title) {
	var getPageInfo = function () {
		var data = {
			title: title,
			/*isShare:false,
			backgroundColor:'#2c2f31'*/
			color: "",
			opacity: "",
			backgroundColor: "",
			backgroundOpacity: ""
		};
		return JSON.stringify(data);
	};
	appFc.controlTitle(getPageInfo());
	// if (deviceType == "isApp" && (typeof mobileApp != "undefined")) {
	// 	if (getParamByUrl("os") == "android") {
	// 		mobileApp.controlTitle(getPageInfo());
	// 	}
	// 	else {
	// 		mobileApp.controlTitle.postMessage(getPageInfo());
	// 	}
	// 	//mobileApp.getShareInfo(getPageInfo());
	// }
	// document.documentElement.style.webkitTouchCallout = 'none';
}