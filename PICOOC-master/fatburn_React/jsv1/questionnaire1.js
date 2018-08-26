var gaugeTime = ""; //称重时段
var goal = ""; //入营目的
var concern = ""; //关注
var position = ""; //关注身体部位
var habit = ""; //不良习惯
var diet = ""; //饮食方式
var sport = ""; //运动频率
var sportAddress = ""; //运动地址
var sportTime = ""; //运动时间
var sportMerchine = ""; //运动装备
var sportHurt = ""; //运动损伤
var sickness = ""; //疾病

var orderId = getParamByUrl("orderId");
/*var orderId = 100003;*/
var userId = getParamByUrl("userId");
$(function () {

	appNoShare("个人资料完善");
	var getPageInfo1 = function () {
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
	};
	appFc.controlLeft(getPageInfo1());
	//appNoShare();
	// $('.select1').click(function(){
	// 	$('.errorAlert').show();
	// 	$('.error-main').hide();
	// 	$('.errorAlert').unbind('click').click(function(){
	// 		$(this).hide();
	// 	})
	// });
	// $('.select2').click(function(){
	// 	$('.errorAlert').show();
	// 	$('.error-main').hide();
	// 	$('.errorAlert').unbind('click').click(function(){
	// 		$(this).hide();
	// 	})
	// });
	$(".select2").attr("disabled", "disabled");
	$(".select1").change(function () {
		// $('.errorAlert').hide();
		if ($(".select1").val() != "") {
			$(".select2").removeAttr("disabled");
		} else {
			$(".select2").attr("disabled", "disabled");
		}
	});
	// $(".select2").change(function () {
	// 	$('.errorAlert').hide();
	// });

	//称重时段点击事件
	$("#gaugeTime .radio").unbind("click").click(function () {
		$("#gaugeTime .radio").css("background-color", "#fff");
		$("#gaugeTime .radio").css("color", "#696969");
		$("#gaugeTime .radio").removeClass("active");
		$("#gaugeTime .radio img").attr("src", "image/withoutCamp/nocheck.png");
		$(this).addClass("active");
		$(this).css("background-color", "#7fa9ff");
		$(this).css("color", "#fff");
		$(this).children("img").attr("src", "image/withoutCamp/check.png");
		var index = $(this).index();
		gaugeTime = index;
	});
	//参加目标点击
	$("#goal .radio").unbind("click").click(function () {
		$("#goal .radio").css("background-color", "#fff");
		$("#goal .radio").css("color", "#696969");
		$("#goal .radio").removeClass("active");
		$("#goal .radio2").removeClass("active");
		$("#goal .radio img").attr("src", "image/withoutCamp/nocheck.png");
		$("#goal .radio3 img").attr("src", "image/withoutCamp/nocheck.png");
		$(this).addClass("active");
		$(this).css("background-color", "#7fa9ff");
		$(this).css("color", "#fff");
		$(this).children("img").attr("src", "image/withoutCamp/check.png");
		$("#goal textarea").val("");
		goal = $(this).children("span").html();
		// alert(goal);
	});
	$("#goal .radio2").unbind("click").click(function () {
		$("#goal .radio").css("background-color", "#fff");
		$("#goal .radio").css("color", "#696969");
		$("#goal .radio").removeClass("active");
		$("#goal .radio img").attr("src", "image/withoutCamp/nocheck.png");
		$(this).addClass("active");
		$("#goal .radio3 img").attr("src", "image/withoutCamp/check2.png");
		$("#goal textarea").focus();
		goal = "other";
	});
	//concern 关注 点击
	$("#concern .radio").unbind("click").click(function () {
		$("#concern .radio").css("background-color", "#fff");
		$("#concern .radio").css("color", "#696969");
		$("#concern .radio").removeClass("active");
		$("#concern .radio2").removeClass("active");
		$("#concern .radio img").attr("src", "image/withoutCamp/nocheck.png");
		$("#concern .radio3 img").attr("src", "image/withoutCamp/nocheck.png");
		$(this).addClass("active");
		$(this).css("background-color", "#7fa9ff");
		$(this).css("color", "#fff");
		$(this).children("img").attr("src", "image/withoutCamp/check.png");
		$("#concern textarea").val("");
		concern = $(this).children("span").html();
		// alert(concern);
	});
	$("#concern .radio2").unbind("click").click(function () {
		$("#concern .radio").css("background-color", "#fff");
		$("#concern .radio").css("color", "#696969");
		$("#concern .radio").removeClass("active");
		$("#concern .radio img").attr("src", "image/withoutCamp/nocheck.png");
		$(this).addClass("active");
		$("#concern .radio3 img").attr("src", "image/withoutCamp/check2.png");
		$("#concern textarea").focus();
		concern = "other";
	});
	//关注身体部位 position
	$("#position .radio").unbind("click").click(function () {
		var len = $("#position .active").length;

		// console.log(len);
		if (len < 2) {
			if ($(this).hasClass("active")) {
				$("#position textarea").attr('disabled', 'disabled');

				$(this).removeClass("active");
				$(this).css("background-color", "#fff");
				$(this).css("color", "#696969");
				$(this).children("img").attr("src", "image/withoutCamp/checkboxNo.png");
			} else {
				$("#position textarea").attr('disabled', 'disabled');
				$(this).addClass("active");
				$(this).css("background-color", "#7fa9ff");
				$(this).css("color", "#fff");
				$(this).children("img").attr("src", "image/withoutCamp/checkboxYes.png");
			}
		} else if (len == 2) {
			$("#position textarea").attr('disabled', 'disabled');
			if ($(this).hasClass("active")) {
				$(this).removeClass("active");
				$(this).css("background-color", "#fff");
				$(this).css("color", "#696969");
				$(this).children("img").attr("src", "image/withoutCamp/checkboxNo.png");
			}
		}
	});
	$("#position .radio2").unbind("click").click(function () {
		var len = $("#position .active").length;
		console.log(len);
		if (len < 2) {
			if ($(this).hasClass("active")) {
				$(this).removeClass("active");
				$("#position .radio3 img").attr("src", "image/withoutCamp/checkboxNo.png");
				$("#position textarea").val('');
				position = "";
			} else {
				$(this).addClass("active");
				$("#position textarea").val('');
				$("#position .radio3 img").attr("src", "image/withoutCamp/checkboxYes3.png");
				$("#position textarea").removeAttr('disabled', 'disabled');
				$("#position textarea").focus();
				position = "other";
			}
			$("#position .radio2 textarea").unbind("click").click(function (event) {
				event.stopPropagation();
			})
		} else if (len == 2) {
			if ($(this).hasClass("active")) {
				$(this).removeClass("active");
				$("#position textarea").val('');
				$("#position .radio3 img").attr("src", "image/withoutCamp/checkboxNo.png");
				position = "";
			}
		}
	});
	//不良习惯 habit
	$("#habit .radio").unbind("click").click(function () {

		if ($(this).hasClass("active")) {
			$(this).removeClass("active");
			$(this).css("background-color", "#fff");
			$(this).css("color", "#696969");
			$(this).children("img").attr("src", "image/withoutCamp/checkboxNo.png");
		} else {
			$(this).addClass("active");
			$(this).css("background-color", "#7fa9ff");
			$(this).css("color", "#fff");
			$(this).children("img").attr("src", "image/withoutCamp/checkboxYes.png");
		}
	});
	$("#habit .radio2").unbind("click").click(function () {
		if ($(this).hasClass("active")) {
			$(this).removeClass("active");
			$("#habit textarea").val('');
			$("#habit .radio3 img").attr("src", "image/withoutCamp/checkboxNo.png");
			habit = "";
		} else {
			$(this).addClass("active");
			$("#habit .radio3 img").attr("src", "image/withoutCamp/checkboxYes3.png");
			$("#habit textarea").focus();
			habit = "other";
		}
		$("#habit .radio2 textarea").unbind("click").click(function (event) {
			event.stopPropagation();
		});
	});
	//diet 饮食方式
	$("#diet .radio").unbind("click").click(function () {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active')
				.css("background-color", "#fff")
				.css("color", "#696969").children("img")
				.attr("src", "image/withoutCamp/checkboxNo.png");
		}
		else {
			$(this).addClass("active")
				.css("background-color", "#7fa9ff")
				.css("color", "#fff")
				.children("img").attr("src", "image/withoutCamp/checkboxYes.png");
		}
	});

	//获取缓存的答案
	getUserResult();
	//提交
	//$(".submit").unbind("click").bind("click",function(){
	// $("#submitBtn").on("click", function () {
	$("#submitBtn").on('touchstart', function () {
		
		event.stopPropagation();
		// $("#submitBtn").unbind("click").bind("click", function () {
		var str = "";
		var isGoal = false, isConcern = false, isPosition = false, isHabit = false, isSport = false, isSportAddress = false, isSportMerchine = false, isSickness = false;

		var province = $("#question-map2 .select1 option:selected").attr("title"); //省份
		var city = $("#question-map2 .select2 option:selected").attr("title");	//市
		if (province == "请选择" || province == undefined) {
			province = "";
		}

		if (city == "请选择" || city == undefined) {
			city = "";
		}
		var area = province + '-' + city;
		var wechatName = $.trim($("#wechatName").val()); //微信昵称
		var wechatNum = $.trim($("#wechatNum").val()); //微信账号
		// var phoneNum = $.trim($("#phoneNum").val()); //手机号
		var occupation = $.trim($("#occupation").val()); //职业
		//gaugeTime 称重时段
		console.log(occupation);
		console.log(wechatName);
		if ($("#goal .radio.active").length > 0) {
			isGoal = true;
		}
		if ($("#goal .radio2.active").length > 0) {
			goal = 'other-' + $.trim($("#goal textarea").val()); //入营目标
		}
		if ($("#concern .radio.active").length > 0) {
			isConcern = true;
		}
		if ($("#concern .radio2.active").length > 0) {
			concern = 'other-' + $.trim($("#concern textarea").val());
		}
		if ($("#position .radio2.active").length > 0) {
			isPosition = true;
			position = 'other-' + $.trim($("#position textarea").val());
			var len2 = $("#position .radio.active").length;
			console.log("len2:" + len2);
			if (len2 > 0) {
				position += "|" + $.trim($("#position .radio.active").eq(0).children("span").html());
			}
			console.log(position);
		} else {
			position = "";
			var len2 = $("#position .radio.active").length;
			console.log("len2:" + len2);
			if (len2 > 0) {
				for (i = 0; i < len2; i++) {
					if (i == len2 - 1) {
						position += '|' + $.trim($("#position .radio.active").eq(i).children("span").html());
					} else {
						position += '|' + $.trim($("#position .radio.active").eq(i).children("span").html()) + "|";
					}
				}
			}
			console.log(position);
		}

		if ($("#habit .radio2.active").length > 0) {
			isHabit = true;
			habit = 'other-' + $.trim($("#habit textarea").val());
			var len2 = $("#habit .radio.active").length;
			console.log("len2:" + len2);
			if (len2 > 0) {
				for (i = 0; i < len2; i++) {
					habit += "|" + $.trim($("#habit .radio.active").eq(i).children("span").html());
				}
			}
			console.log(habit);
		} else {
			habit = "";
			var len2 = $("#habit .radio.active").length;
			console.log("len2:" + len2);
			if (len2 > 0) {
				for (i = 0; i < len2; i++) {
					if (i == len2 - 1) {
						habit += '|' + $.trim($("#habit .radio.active").eq(i).children("span").html());
					} else {
						habit += '|' + $.trim($("#habit .radio.active").eq(i).children("span").html()) + "|";
					}
				}
			}
			console.log(habit);
		}
		if ($('#diet .radio.active').length > 0) {
			for (var m = 0; m < $('#diet .radio.active').length; m++) {
				console.log($('#diet radio.active').eq(m));
				diet += "|" + $.trim($("#diet .radio.active").eq(m).children("span").html());
			}
		}
		else {
			diet = '';
		}
		if (wechatName == "") {
			str += " 1";
		}
		if (wechatNum == "") {
			str += " 2";
		}
		// if (phoneNum == "") {
		// 	str += " 3";
		// }
		if (occupation == "") {
			str += " 3";
		}
		if (province == "" || city == "") {
			str += " 4";
		}

		if (!isGoal && goal == "") {
			str += " 5";
		}
		console.log('concern:' + concern);
		if (!isConcern && concern == "") {
			str += " 6";
		}
		if (!isPosition && position == "") {
			str += " 7";
		}
		if (!isHabit && habit == "") {
			str += " 8";
		}
		if (diet == "") {
			str += " 9";
		}

		if (gaugeTime === "") {
			str += " 10";
		}

		/*添加缓存完毕*/
		var questionData = "{" + '"wechatName":' + '"' + wechatName + '"' + ',"wechatApp":' + '"' + wechatNum + '"' + ',"orderId":' + '"' + orderId + '"' + ',"userId":' + '"' + userId + '"' + ',"career":' + '"' + occupation + '"' + ',"area":' + '"' + area + '"' + ',"weightPeriod":' + '"' + gaugeTime + '"' + ',"mostTargt":' + '"' + goal + '"' + ',"careContent":' + '"' + concern + '"' + ',"bodyParts":' + '"' + position + '"' + ',"badEat":' + '"' + habit + '"' + ',"eatType":' + '"' + diet + '"' + "}";

		// var questionData = "{" + '"wechatName":' + '"' + wechatName + '"' + ',"wechatApp":' + '"' + wechatNum + '"' + ',"phoneApp":' + '"' + phoneNum + '"' + ',"orderId":' + '"' + orderId + '"' + ',"userId":' + '"' + userId + '"' + ',"career":' + '"' + occupation + '"' + ',"area":' + '"' + area + '"' + ',"weightPeriod":' + '"' + gaugeTime + '"' + ',"mostTargt":' + '"' + goal + '"' + ',"careContent":' + '"' + concern + '"' + ',"bodyParts":' + '"' + position + '"' + ',"badEat":' + '"' + habit + '"' + ',"eatType":' + '"' + diet + '"' + "}";
		//缓存:
		var questionResult = "questionResult_" + orderId;
		console.log(questionData);
		setCookie(questionResult, questionData, 30);
		//localStorage.setItem(questionResult,questionData)
		if (str == "") {
			$(".returnAlert").css("display", "block");
			$(".return-main-btn1").unbind("click").click(function () {
				$(".returnAlert").hide();

				//questionData="{"+'"wechatName":'+'"'+wechatName+'"'+',"orderId":'+'"'+orderId+'"'+',"userId":'+'"'+userId+'"'+',"career":'+'"'+occupation+'"'+',"area":'+'"'+area+'"'+',"weightPeriod":'+'"'+gaugeTime+'"'+',"physicalPeriod":'+'"'+physicalPeriod+'"'+',"mostTargt":'+'"'+goal+'"'+',"careContent":'+'"'+concern+'"'+',"bodyParts":'+'"'+position+'"'+',"badEat":'+'"'+habit+'"'+',"eatType":'+'"'+diet+'"'+',"sportTimes":'+'"'+sport+'"'+',"sportVenues":'+'"'+sportAddress+'"'+',"sportlong":'+'"'+sportTime+'"'+',"sportEquip":'+'"'+sportMerchine+'"'+',"sportInjury":'+'"'+sportHurt+'"'+',"injuryDesc":'+'"'+sportHurtContent+'"'+',"sick":'+'"'+sickness+'"'+"}";
				//questionData="{}";
				var host = window.location.protocol + "//" + window.location.host;
				var finalUrl = host + "/v1/api/campQuestion/insertQuestion" + window.location.search;
				console.info(questionData);
				console.info(finalUrl);
				$.ajax({
					type: "POST",
					data: questionData,
					url: finalUrl,
					dataType: "json",
					contentType: 'application/json',
					success: function (data) {
						if (data.code == 200) {
							var deviceType = isMobile();
							if (deviceType == "isApp" && (getParamByUrl("testtype") != "tanchao")) {
								var data = {
									backNum: 0,//默认为1，
									closeWebview: 1,//默认为0
									reload: true
								};
								data = JSON.stringify(data);
								appFc.deleteHistory(data);
							}
							else {
								window.location.href = "myFatBurn.html" + removeParamByUrl('orderId');
								// window.location.href = linkJump + "friendrequest.html" + window.location.search;
							}

						} else {
							$(".error-main-t").html(data.message);
							$(".error-main").show();
							$(".errorAlert").css("display", "block");
							$(".error-main").css("margin-top", -$(".error-main").height() / 2);
						}
					},
					error: function () {
						$(".error-main-t").html('请检查网络连接');
						$(".error-main").show();
						$(".errorAlert").css("display", "block");
						$(".error-main").css("margin-top", -$(".error-main").height() / 2);
					}

				});
			});
			$(".return-main-btn0").unbind("click").click(function () {
				$(".returnAlert").css("display", "none");
			});
		} else {
			$(".error-main-t").html("请您填写完第" + $.trim(str) + "道题，再来提交吧~");
			$(".error-main").show();
			$(".errorAlert").css("display", "block");
			$(".error-main").css("margin-top", -$(".error-main").height() / 2);
		}
	});
})


function getUserResult() {
	var questionResult = "questionResult_" + orderId;
	var result = getCookie(questionResult);
	//var result={"wechatName":"委屈翁","orderId":"100003","userId":"925135","career":"委屈翁","area":"辽宁省鞍山市","weightPeriod":"0","mostTargt":"地方郭德纲","careContent":"饮食计划","bodyParts":"胸背","badEat":"偏爱油腻油炸食品和肉肉等","eatType":"食堂"}
	console.info(result);
    /*var questionResult="questionResult_"+orderId;
    localStorage.getItem(questionResult);
    console.info(localStorage.getItem(questionResult));*/
	if (result != "" && result != null) {
		//var result=localStorage.getItem(questionResult);
		console.info(typeof result);
		result = eval('(' + result + ')');
		console.info(typeof result);
		console.info(result.wechatName);
		//WX名称
		$("#wechatName").val(result.wechatName);
		// wx账号
		$("#wechatNum").val(result.wechatApp);
		// 手机号
		// $("#phoneNum").val(result.phoneApp);
		//职业
		$("#occupation").val(result.career);
		// 地址
		if (result.area != null || result.area != '') {
			var area = result.area.split('-');
			console.log(area);
			var timer = null;
			timer = setTimeout(function () {
				for (var i = 0; i < $('.select1 option').length; i++) {
					// console.log($('.select1 option').eq(i).attr('title'));
					if ($('.select1 option').eq(i).attr('title') == area[0]) {
						$('.select1 option').eq(i).attr('selected', 'selected');
					}
				}
			}, 100)
			// clearTimeout(timer);
			var option2 = '<option selected="selected" class="selectCity" title=' + area[1] + '>' + area[1] + '</option>';
			$('.select2').append(option2);
		}
		//目标
		var goal = result.mostTargt;
		// console.log(goal);
		var goalResult = false;
		if (goal != '' && goal != null) {
			$("#goal .radio").each(function () {
				if ($(this).children("span").text() == goal) {
					// alert(3);
					$(this).click();
					goalResult = true;
				}
			});
			console.log(goalResult);
			if (!goalResult) {
				// console.log(3);
				$("#goal .radio3").click();
				$("#goal textarea").val(goal.split('-')[1]);
			}
		}

		//关注
		var concern = result.careContent;
		var concernResult = false;
		if (concern != '' && concern != null) {
			$("#concern .radio").each(function () {
				if ($(this).children("span").text() == concern) {
					$(this).click();
					concernResult = true;
				}
			});
			if (!concernResult) {
				$("#concern .radio3").click();
				$("#concern textarea").val(concern.split('-')[1]);
			}
		}
		//身体部位
		if (result.bodyParts != '' && result.bodyParts != null) {
			var bodyParts = result.bodyParts.split("|");
			var bodyPartsResult = false;
			$("#position .radio").each(function () {
				for (var i = 0; i < bodyParts.length; i++) {
					if ($(this).children("span").text() == bodyParts[i]) {
						$(this).click();
						// bodyPartsResult = true;
						break;
					}
				}
			});
			if (!bodyPartsResult) {
				// if (bodyParts[0].split('-')[1] != '' && bodyParts[0].split('-')[1] != null) {
					$("#position .radio3").click();
					$("#position textarea").val(bodyParts[0].split('-')[1]);
				// }

			}
		}
		//不良选项
		if (result.badEat != '' && result.badEat != null) {
			var badEat = result.badEat.split("|");
			var badEatResult = false;
			$("#habit .radio").each(function () {
				for (var i = 0; i < badEat.length; i++) {
					if ($(this).children("span").text() == badEat[i]) {
						$(this).click();
						// badEatResult = true;
						break;
					}
				}
			});
			if (!badEatResult) {
				if (badEat[0].split('-')[1] != '' && badEat[0].split('-')[1] != null) {
					$("#habit .radio3").click();
				$("#habit textarea").val(badEat[0].split('-')[1]);
				}
				
			}
		}
		//日常饮食方式
		var eatType = result.eatType.split('|');
		$("#diet .radio").each(function () {
			for (var n = 0; n < eatType.length; n++) {
				if ($(this).children("span").text() == eatType[n]) {
					$(this).click();
					// eatTypeResult = true;
				}
			}
		});
		//上称时段
		var weightPeriod = parseInt(result.weightPeriod);
		$("#gaugeTime .radio").eq(weightPeriod).click();

	}
}

var deviceType = isMobile();
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
}