var PubSub = require("pubsub-js");
var Fc_comment = {};
Fc_comment.dataAddMsg = {};
Fc_comment.dataAddMsg.placeText = "";//保留新版输入框取消的内容
Fc_comment.dataAddMsg.placeTextCommentId = "";//保留新版输入框取消时的评论id

Fc_comment.level = 0;//评论等级
Fc_comment.partIndex = 0;//点击了哪个部分
Fc_comment.commentHeight = 3.1875 * parseInt($("html").css("font-size"));//评论高度
Fc_comment.scrollTime1;//inputSelect的延迟时间
Fc_comment.arrStrLen = [];//输入框输入换行的字数
Fc_comment.arrScrollHeight = [];//输入框换行的高度
Fc_comment.nBtn = false;//评论是否回车
Fc_comment.msgBtn = true;//防止连续点击
Fc_comment.msgScrollAddBtn = false;//评论滚动按钮
var windowH = $(window).height();
Fc_comment.bindMsg = function (event) {
	event.stopPropagation();
	setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing, SXiaoXiXiangQing.SXiaoXiXiangQing_BangDingHuiFuShiJian);
	Fc_comment.level = 2;
	
	//var index=$(".msgInfo-msg").index(this);
	console.log('apptype',event.currentTarget.getAttribute("data-apptype"));
	if (event.currentTarget.getAttribute("data-apptype") == 1) {
		if (roleId != event.currentTarget.getAttribute("data-reply_role_id")) {
			if (event.currentTarget.getAttribute("data-reply_id") != Fc_comment.dataAddMsg.replyId) {
				$("#comment2-msg1").val("");
				$("#comment2-msg2").val("");
				$("#comment2-msg1").css("height", Fc_comment.commentHeight);
				$("#comment2-msg2").css("height", Fc_comment.commentHeight);
				$(".imgContainer").css("height", Fc_comment.commentHeight);
				$(".comment2 .btn").css("height", Fc_comment.commentHeight);
				Fc_comment.arrStrLen = [];
				Fc_comment.arrScrollHeight = [];
			}
			Fc_comment.partIndex = event.currentTarget.getAttribute("data-part_index");
			Fc_comment.dataAddMsg.level = 2;
			Fc_comment.dataAddMsg.checkId = event.currentTarget.getAttribute("data-check_id");
			Fc_comment.dataAddMsg.replyId = event.currentTarget.getAttribute("data-reply_id");
			Fc_comment.dataAddMsg.replyRoleId = event.currentTarget.getAttribute("data-reply_role_id");
			Fc_comment.dataAddMsg.msgType = parseInt(event.currentTarget.getAttribute("data-msg_type"));


			$("#comment2-msg1").attr("placeholder", '回复' + event.currentTarget.getAttribute("data-role_name"));
			publicData.msgScrollTop = $(window).scrollTop();
			//msgScrollTop=$(".msgInfo-msg").eq(index).offset().top;
			if (getParamByUrl("webver") > 4) {
				var popupCommentText = "";
				if (Fc_comment.dataAddMsg.placeText != "" && Fc_comment.dataAddMsg.placeTextCommentId == Fc_comment.dataAddMsg.replyId) {
					popupCommentText = Fc_comment.dataAddMsg.placeText;
				}
				Fc_comment.dataAddMsg.placeTextCommentId = Fc_comment.dataAddMsg.replyId;
				var getPageInfo = function () {
					var data = {
						text: popupCommentText,
						placeHolder: '回复' + event.currentTarget.getAttribute("data-role_name"),
					};
					return JSON.stringify(data);
				};
				appFc.popupComment(getPageInfo());
			}
			else {
				Fc_comment.newComment2();
				$(".comment2").css("position", "static");
				$(".comment2").css("top", "auto");
				$(".comment2").css("bottom", "0");
				$(".comment2").css("display", "block");
				$(".comment3").css("display", "block");

				$(".setcard").css("display", "none");
				var x = parseInt(event.currentTarget.getAttribute("data-part_index"));
				$(".part").css("display", "none");
				$(".partRight").css("display", "none");
				$(".studentListOrder").css("display", "none");
				for (var i = 0; i < x + 1; i++) {
					$(".msgType" + publicData.pageIndex + " .part").eq(i).css("display", "block");
					$(".msgType" + publicData.pageIndex + " .partRight").eq(i).css("display", "block");
					$(".msgType" + publicData.pageIndex + " .studentListOrder").eq(i).css("display", "block");
				}
				//隐藏周数显示
				var campstatus = $(".campstatus");
				if (campstatus.length > 0) {
					for (i = 0; i < campstatus.length; i++) {
						var campstatusIndex = $(".campstatus").eq(i).attr("data-part_index");
						console.log("campstatusIndex1:" + campstatusIndex);
						if (campstatusIndex > x) {
							$(".campstatus").eq(i).css("visibility", "hidden");
						}
					}
				}

				if (getParamByUrl("os") == "android") {
					$(".comment2").css("padding-bottom", "1.5rem");
				}
				$("#comment2-msg1").focus();
			}


			Fc_comment.nBtn = false;
			
		}
	} else {
		if (roleId == event.currentTarget.getAttribute("data-reply_role_id")) {
			$(".fixbg-main-t").html("您确定要删除此评论吗？删除后就不能恢复了～");
			$(".fixbg").css("display", "block");
			$(".fixbg-main").css("margin-top", -$(".fixbg-main").height() / 2);
			$(".fixbg-main-btn1").unbind("click").click(function () {
				setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing, SXiaoXiXiangQing.SXiaoXiXiangQing_QuXiaoShanChuZiJiPingLun);
				$(".fixbg").css("display", "none");
			});
			var target = event.currentTarget;
			$(".fixbg-main-btn2").unbind("click").click(function () {
				setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing, SXiaoXiXiangQing.SXiaoXiXiangQing_ShanChuZiJiPingLun);
				var finalUrl = ajaxLink + "/v1/api/camp/deleteReply" + window.location.search + '&Id=' + target.getAttribute("data-reply_id");
				$.ajax({
					type: "get",
					url: finalUrl,
					dataType: "json",
					success: function (data) {
						if (data.code == 200) {
							var deleteCommentData = {
								pageIndex: publicData.pageIndex,
								partIndex: parseInt(target.getAttribute("data-part_index")),
								deleteCommentIndex: parseInt(target.getAttribute("data-comment_index"))

							}
							PubSub.publish("deleteComment", deleteCommentData);
							$(".fixbg").css("display", "none");
						}
						else {
							// alert(data.result.message);
							$(".error-main-t").html(data.result.message);
							$(".errorAlert").css("display", "block");
							$(".error-main").css("margin-top", -$(".error-main").height() / 2);
						}
					}
				})
			});
		}
		else {

			if (event.currentTarget.getAttribute("data-reply_id") != Fc_comment.dataAddMsg.replyId) {
				$("#comment2-msg1").val("");
				$("#comment2-msg2").val("");
				$("#comment2-msg1").css("height", Fc_comment.commentHeight);
				$("#comment2-msg2").css("height", Fc_comment.commentHeight);
				$(".imgContainer").css("height", Fc_comment.commentHeight);
				$(".comment2 .btn").css("height", Fc_comment.commentHeight);
				Fc_comment.arrStrLen = [];
				Fc_comment.arrScrollHeight = [];
			}
			Fc_comment.partIndex = event.currentTarget.getAttribute("data-part_index");
			Fc_comment.dataAddMsg.level = 2;
			Fc_comment.dataAddMsg.checkId = event.currentTarget.getAttribute("data-check_id");
			Fc_comment.dataAddMsg.replyId = event.currentTarget.getAttribute("data-reply_id");
			Fc_comment.dataAddMsg.replyRoleId = event.currentTarget.getAttribute("data-reply_role_id");
			Fc_comment.dataAddMsg.msgType = parseInt(event.currentTarget.getAttribute("data-msg_type"));


			$("#comment2-msg1").attr("placeholder", '回复' + event.currentTarget.getAttribute("data-role_name"));
			publicData.msgScrollTop = $(window).scrollTop();
			//msgScrollTop=$(".msgInfo-msg").eq(index).offset().top;
			if (getParamByUrl("webver") > 4) {
				var popupCommentText = "";
				if (Fc_comment.dataAddMsg.placeText != "" && Fc_comment.dataAddMsg.placeTextCommentId == Fc_comment.dataAddMsg.replyId) {
					popupCommentText = Fc_comment.dataAddMsg.placeText;
				}
				Fc_comment.dataAddMsg.placeTextCommentId = Fc_comment.dataAddMsg.replyId;
				var getPageInfo = function () {
					var data = {
						text: popupCommentText,
						placeHolder: '回复' + event.currentTarget.getAttribute("data-role_name"),
					};
					return JSON.stringify(data);
				};
				appFc.popupComment(getPageInfo());
			}
			else {
				Fc_comment.newComment2();
				$(".comment2").css("position", "static");
				$(".comment2").css("top", "auto");
				$(".comment2").css("bottom", "0");
				$(".comment2").css("display", "block");
				$(".comment3").css("display", "block");

				$(".setcard").css("display", "none");
				var x = parseInt(event.currentTarget.getAttribute("data-part_index"));
				$(".part").css("display", "none");
				$(".partRight").css("display", "none");
				$(".studentListOrder").css("display", "none");
				for (var i = 0; i < x + 1; i++) {
					$(".msgType" + publicData.pageIndex + " .part").eq(i).css("display", "block");
					$(".msgType" + publicData.pageIndex + " .partRight").eq(i).css("display", "block");
					$(".msgType" + publicData.pageIndex + " .studentListOrder").eq(i).css("display", "block");
				}
				//隐藏周数显示
				var campstatus = $(".campstatus");
				if (campstatus.length > 0) {
					for (i = 0; i < campstatus.length; i++) {
						var campstatusIndex = $(".campstatus").eq(i).attr("data-part_index");
						console.log("campstatusIndex1:" + campstatusIndex);
						if (campstatusIndex > x) {
							$(".campstatus").eq(i).css("visibility", "hidden");
						}
					}
				}

				if (getParamByUrl("os") == "android") {
					$(".comment2").css("padding-bottom", "1.5rem");
				}
				$("#comment2-msg1").focus();
			}


			Fc_comment.nBtn = false;



		}
	}

	event.stopPropagation();
}
// Fc_comment.bindMsg = function (event) {
// 	event.stopPropagation();
// 	setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing, SXiaoXiXiangQing.SXiaoXiXiangQing_BangDingHuiFuShiJian);
// 	Fc_comment.level = 2;
// 	//var index=$(".msgInfo-msg").index(this);

// 	if (roleId == event.currentTarget.getAttribute("data-reply_role_id")) {
// 		$(".fixbg-main-t").html("您确定要删除此评论吗？删除后就不能恢复了～");
// 		$(".fixbg").css("display", "block");
// 		$(".fixbg-main").css("margin-top", -$(".fixbg-main").height() / 2);
// 		$(".fixbg-main-btn1").unbind("click").click(function () {
// 			setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing, SXiaoXiXiangQing.SXiaoXiXiangQing_QuXiaoShanChuZiJiPingLun);
// 			$(".fixbg").css("display", "none");
// 		});
// 		var target = event.currentTarget;
// 		$(".fixbg-main-btn2").unbind("click").click(function () {
// 			setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing, SXiaoXiXiangQing.SXiaoXiXiangQing_ShanChuZiJiPingLun);
// 			var finalUrl = ajaxLink + "/v1/api/camp/deleteReply" + window.location.search + '&Id=' + target.getAttribute("data-reply_id");
// 			$.ajax({
// 				type: "get",
// 				url: finalUrl,
// 				dataType: "json",
// 				success: function (data) {
// 					if (data.code == 200) {
// 						var deleteCommentData = {
// 							pageIndex: publicData.pageIndex,
// 							partIndex: parseInt(target.getAttribute("data-part_index")),
// 							deleteCommentIndex: parseInt(target.getAttribute("data-comment_index"))

// 						}
// 						PubSub.publish("deleteComment", deleteCommentData);
// 						$(".fixbg").css("display", "none");
// 					}
// 					else {
// 						// alert(data.result.message);
// 						$(".error-main-t").html(data.result.message);
// 						$(".errorAlert").css("display", "block");
// 						$(".error-main").css("margin-top", -$(".error-main").height() / 2);
// 					}
// 				}
// 			})
// 		});
// 	}
// 	else {

// 		if (event.currentTarget.getAttribute("data-reply_id") != Fc_comment.dataAddMsg.replyId) {
// 			$("#comment2-msg1").val("");
// 			$("#comment2-msg2").val("");
// 			$("#comment2-msg1").css("height", Fc_comment.commentHeight);
// 			$("#comment2-msg2").css("height", Fc_comment.commentHeight);
// 			$(".imgContainer").css("height", Fc_comment.commentHeight);
// 			$(".comment2 .btn").css("height", Fc_comment.commentHeight);
// 			Fc_comment.arrStrLen = [];
// 			Fc_comment.arrScrollHeight = [];
// 		}
// 		Fc_comment.partIndex = event.currentTarget.getAttribute("data-part_index");
// 		Fc_comment.dataAddMsg.level = 2;
// 		Fc_comment.dataAddMsg.checkId = event.currentTarget.getAttribute("data-check_id");
// 		Fc_comment.dataAddMsg.replyId = event.currentTarget.getAttribute("data-reply_id");
// 		Fc_comment.dataAddMsg.replyRoleId = event.currentTarget.getAttribute("data-reply_role_id");
// 		Fc_comment.dataAddMsg.msgType = parseInt(event.currentTarget.getAttribute("data-msg_type"));


// 		$("#comment2-msg1").attr("placeholder", '回复' + event.currentTarget.getAttribute("data-role_name"));
// 		publicData.msgScrollTop = $(window).scrollTop();
// 		//msgScrollTop=$(".msgInfo-msg").eq(index).offset().top;
// 		if (getParamByUrl("webver") > 4) {
// 			var popupCommentText = "";
// 			if (Fc_comment.dataAddMsg.placeText != "" && Fc_comment.dataAddMsg.placeTextCommentId == Fc_comment.dataAddMsg.replyId) {
// 				popupCommentText = Fc_comment.dataAddMsg.placeText;
// 			}
// 			Fc_comment.dataAddMsg.placeTextCommentId = Fc_comment.dataAddMsg.replyId;
// 			var getPageInfo = function () {
// 				var data = {
// 					text: popupCommentText,
// 					placeHolder: '回复' + event.currentTarget.getAttribute("data-role_name"),
// 				};
// 				return JSON.stringify(data);
// 			};
// 			appFc.popupComment(getPageInfo());
// 		}
// 		else {
// 			Fc_comment.newComment2();
// 			$(".comment2").css("position", "static");
// 			$(".comment2").css("top", "auto");
// 			$(".comment2").css("bottom", "0");
// 			$(".comment2").css("display", "block");
// 			$(".comment3").css("display", "block");

// 			$(".setcard").css("display", "none");
// 			var x = parseInt(event.currentTarget.getAttribute("data-part_index"));
// 			$(".part").css("display", "none");
// 			$(".partRight").css("display", "none");
// 			$(".studentListOrder").css("display", "none");
// 			for (var i = 0; i < x + 1; i++) {
// 				$(".msgType" + publicData.pageIndex + " .part").eq(i).css("display", "block");
// 				$(".msgType" + publicData.pageIndex + " .partRight").eq(i).css("display", "block");
// 				$(".msgType" + publicData.pageIndex + " .studentListOrder").eq(i).css("display", "block");
// 			}
// 			//隐藏周数显示
// 			var campstatus = $(".campstatus");
// 			if (campstatus.length > 0) {
// 				for (i = 0; i < campstatus.length; i++) {
// 					var campstatusIndex = $(".campstatus").eq(i).attr("data-part_index");
// 					console.log("campstatusIndex1:" + campstatusIndex);
// 					if (campstatusIndex > x) {
// 						$(".campstatus").eq(i).css("visibility", "hidden");
// 					}
// 				}
// 			}

// 			if (getParamByUrl("os") == "android") {
// 				$(".comment2").css("padding-bottom", "1.5rem");
// 			}
// 			$("#comment2-msg1").focus();
// 		}


// 		Fc_comment.nBtn = false;



// 	}
// 	event.stopPropagation();
// }
Fc_comment.clickAddMsg = function (event) {
	event.stopPropagation();

	//event.stopPropagation();
	//event.stopPropagation();
	if ($(".cardListMessage").length > 0) {
		$(".cardListMessage").css("display", "none");
	}
	//setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing,SXiaoXiXiangQing.SXiaoXiXiangQing_PingLunXiaoXi);


	Fc_comment.level = 1;
	if (Fc_comment.dataAddMsg.replyId != event.currentTarget.getAttribute("data-reply_id") || Fc_comment.dataAddMsg.checkId != event.currentTarget.getAttribute("data-check_id")) {
		$("#comment2-msg1").val("");
		$("#comment2-msg2").val("");
		$("#comment2-msg1").css("height", Fc_comment.commentHeight);
		$("#comment2-msg2").css("height", Fc_comment.commentHeight);
		$(".imgContainer").css("height", Fc_comment.commentHeight);
		$(".comment2 .btn").css("height", Fc_comment.commentHeight);
		Fc_comment.arrStrLen = [];
		Fc_comment.arrScrollHeight = [];
	}
	Fc_comment.partIndex = event.currentTarget.getAttribute("data-part_index");
	Fc_comment.dataAddMsg.level = 1;
	Fc_comment.dataAddMsg.checkId = event.currentTarget.getAttribute("data-check_id");
	Fc_comment.dataAddMsg.replyId = event.currentTarget.getAttribute("data-reply_id");
	Fc_comment.dataAddMsg.replyRoleId = event.currentTarget.getAttribute("data-reply_role_id");


	publicData.commentBtn = false;

	publicData.msgScrollTop = $(window).scrollTop();
	if (getParamByUrl("webver") > 4) {
		var popupCommentText = "";
		if (Fc_comment.dataAddMsg.placeText != "" && Fc_comment.dataAddMsg.placeTextCommentId == Fc_comment.dataAddMsg.replyId) {
			popupCommentText = Fc_comment.dataAddMsg.placeText;
		}
		Fc_comment.dataAddMsg.placeTextCommentId = Fc_comment.dataAddMsg.replyId;
		var getPageInfo = function () {
			var data = {
				text: popupCommentText,
				placeHolder: '回复：',
			};
			return JSON.stringify(data);
		};
		appFc.popupComment(getPageInfo());
	}
	else {
		$("#comment2-msg1").attr("placeholder", '回复:');
		$(".comment2").css("position", "static");
		$(".comment2").css("top", "auto");
		$(".comment2").css("bottom", "0");
		$(".comment2").css("display", "block");
		$(".comment3").css("display", "block");
		$(".setcard").css("display", "none");


		var x = parseInt(event.currentTarget.getAttribute("data-part_index"));
		var xueYuanDaKaIndex = parseInt(event.currentTarget.getAttribute("data-xue-yuan-da-ka-index"));
		//$(".part").css("display","none");
		$(".studentListOrder").css("display", "none");
		//$(".weekSummaryWrap").css("display","none");
		//$(".partRight").css("display","none");
		for (var i = 0; i < x + 1; i++) {
			//$(".part").eq(i).css("display","block");
			$(".studentListOrder").eq(i).css("display", "block");
			//$(".partRight").eq(i).css("display","block");
		}
		//隐藏没有更多了
		$(".cardListMessage").css("display", "none");
		//隐藏周数显示
		var campstatus = $(".campstatus");
		if (campstatus.length > 0) {
			for (i = 0; i < campstatus.length; i++) {
				var campstatusIndex = $(".campstatus").eq(i).attr("data-part_index");
				console.log("campstatusIndex1:" + campstatusIndex);
				if (campstatusIndex > x) {
					console.log("campstatusIndex2:" + campstatusIndex);
					$(".campstatus").eq(i).css("visibility", "hidden");
					$(".campstatus").eq(i).css("display", "none");
				}
			}
		}
		$("#comment2-msg1").focus();
		if (getParamByUrl("os") == "android") {
			$(".comment2").css("padding-bottom", "1.5rem");
		}
		Fc_comment.newComment2();
	}

}

Fc_comment.focus = function (event) {
	//alert('focus');
	/*if(getParamByUrl("os")=="android"){
		$('body').animate({scrollTop:$('html').height()+50},500);
	}*/
	event.stopPropagation();
	publicData.commentBtn = true;
	console.log(1);
	if (publicData.functionType == 4) {
		if ($(".msgType2").height() < windowH + 50) {
			//$(".msgType2").eq(0).css("top","500px");
			$(".msgType2").css("min-height", 0);
			publicData.firstInputSelect = true;

			$(".msgType2 .list").css("margin-top", windowH - fontHeight * 3.5 - 50);
			//$(".msgType2 .list").css("margin-top",windowH-fontHeight*3.5-50);
			//$(".msgType2").eq(0).css("margin-top",windowH-fontHeight*3.5-50);
		}
	}
	else if (publicData.functionType == 3) {
		if ($(".msgType2").height() < windowH + 50) {
			//$(".msgType2").eq(0).css("top","500px");
			$(".msgType2").css("min-height", 0);
			publicData.firstInputSelect = true;

			//$(".msgType2").css("min-height",windowH-fontHeight*3.5);
			//$(".msgType2 .list").css("margin-top",windowH-fontHeight*3.5-50);
			//$(".msgType2 .list").css("margin-top",windowH-fontHeight*3.5-50);
			//$(".container").eq(0).css("margin-top",windowH-fontHeight*3.5-50);
		}
	}
	else if (publicData.functionType == 'info') {
		if ($(".msgType2").height() < windowH + 50) {
			//$(".msgType2").eq(0).css("top","500px");
			$(".msgType2").css("min-height", 0);
			publicData.firstInputSelect = true;
			$(".msgType2").eq(0).css("margin-top", windowH - fontHeight * 3.5 - 50);
		}
	}
	else {
		if ($(".msgType1 .list").length > 0) {
			$(".msgType1 .list").eq(0).css("margin-bottom", "1rem");
		}
	}
	$('body').animate({ scrollTop: $('html').height() + 50 }, 500);
	var scrollTime2 = setTimeout(function () {

		clearTimeout(scrollTime2);
		//$('body').animate({scrollTop:$('html').height()-$(window).height()},600);
	}, 100);

	/*if($(".msgType2")!=undefined){
		if($(".msgType2 .list").eq(0).height()<800){
			//card2Margin=$(".msgType2 .list").css("margin-top");
			$(".msgType2 .list").css("margin-top","400px");
			firstInputSelect=true;
		}
	}*/
	Fc_comment.scrollTime1 = setTimeout(function () {
		publicData.inputSelect = true;
		clearTimeout(Fc_comment.scrollTime1);
	}, 500);
}
Fc_comment.blur = function (event) {
	//alert('blur');
	event.stopPropagation();
	clearTimeout(Fc_comment.scrollTime1);
	publicData.inputSelect = false;
	publicData.firstInputSelect = false;
	if (publicData.functionType == 4) {
		$(".msgType2").css("min-height", windowH - fontHeight * 3.5 - Fc_comment.commentHeight);
		$(".msgType2 .list").css("margin-top", "1.875rem");
		//$(".msgType2").eq(0).css("margin-top",0);
	}
	else if (publicData.functionType == 3) {
		$(".msgType2").css("min-height", windowH - fontHeight * 3.5 - Fc_comment.commentHeight);
		//$(".msgType2 .list").css("margin-top",0);
		$(".container").eq(0).css("margin-top", 0);
	}
	else if (publicData.functionType == 'info') {
		//$(".msgType2").eq(0).css("top","500px");
		$(".msgType2").css("min-height", $(window).height() - Fc_comment.commentHeight);

		//$(".msgType2").css("min-height",windowH-fontHeight*3.5);
		//$(".msgType2 .list").css("margin-top",windowH-fontHeight*3.5-50);
		//$(".msgType2 .list").css("margin-top",windowH-fontHeight*3.5-50);
		$(".msgType2").eq(0).css("margin-top", 0);
	}
	else if (publicData.functionType1 == 'studentInfo') {

		if ($(".msgType1").height() < windowH + 50) {
			$(".msgType1").css("min-height", windowH - fontHeight * 3.5 - Fc_comment.commentHeight);
			publicData.firstInputSelect = true;
			$(".msgType1").css("margin-top", 0);
		}
	}
	if ($(".msgType1 .list").length > 0) {
		$(".msgType1 .list").eq(0).css("margin-bottom", "3.5rem");
	}
}
//燃脂营1.2评论

Fc_comment.newComment2 = function (event) {

	$(".cardListMessage").css("display", "none");
	var time2 = setTimeout(function () {
		$(".setcard").css("display", "none");
		clearTimeout(time2);
	}, 550);
	publicData.commentBtn = true;
	$("#comment2-msg1").unbind("click").click(function (event) {
		setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing, SXiaoXiXiangQing.SXiaoXiXiangQing_HuiFuShuRuKuang);
		event.stopPropagation;
	});
	var scrollHeight = 0;
	var height = 3.1875 * parseInt($("html").css("font-size"));
	var fontSize = parseInt($("html").css("font-size"));
	var padding = parseInt($("html").css("font-size"));
	var border = 2;
	var totleHeight = height + padding + fontSize * 2;
	var addBtn = true;
	var addLen = 0;
	var deleteValBtn = false;

	$("#comment2-msg1").unbind('input propertychange').bind('input propertychange', function () {

		var valbtn = false;
		if ($("#comment2-msg1").val() == "") {
			Fc_comment.nBtn = false;
			valbtn = true;
		}
		if ($("#comment2-msg1").val().length == 1) {
			valbtn = true;
		}
		if ($("#comment2-msg1").val().length >= addLen) {
			addBtn = true;
		}
		else {
			addBtn = false;
		}
		addLen = $("#comment2-msg1").val().length;
		console.log($("#comment2-msg2")[0].scrollHeight);
		console.log(scrollHeight + "|" + $("#comment2-msg1")[0].scrollHeight);
		//隐藏的输入框的值，通过隐藏的输入框的长度，来判断删除时是否需要换行
		$("#comment2-msg2").val($("#comment2-msg1").val().substring(0, $("#comment2-msg1").val().length - 1));
		//判断有无回车
		if ($("#comment2-msg1").val().substr($("#comment2-msg1").val().length - 1, 1).indexOf("\n") >= 0) {
			Fc_comment.nBtn = true;
		}
		else {
			Fc_comment.nBtn = false;
		}
		console.log((valbtn && Fc_comment.arrStrLen.length == 0));
		//将有回车换行时的字数和评论框高度存起来
		if ((Fc_comment.nBtn && Fc_comment.arrStrLen.length < 4 && (Fc_comment.arrStrLen.length == 0 || $("#comment2-msg1").val().length > Fc_comment.arrStrLen[Fc_comment.arrStrLen.length - 1])) || (valbtn && Fc_comment.arrStrLen.length == 0)) {
			Fc_comment.arrStrLen.push($("#comment2-msg1").val().length);
			Fc_comment.arrScrollHeight.push($("#comment2-msg2")[0].scrollHeight);
		}
		//将正常输入换行时的字数和评论框高度存起来
		if (!Fc_comment.nBtn && (deleteValBtn || ($("#comment2-msg1")[0].scrollHeight != scrollHeight && !valbtn))) {
			//strLen1=$("#comment-input").val().length;
			if (addBtn && Fc_comment.arrScrollHeight.length != 0 && $("#comment2-msg1")[0].scrollHeight < totleHeight) {
				var arrBtn = true;
				for (var i = 0; i < Fc_comment.arrScrollHeight.length; i++) {
					if ($("#comment2-msg1")[0].scrollHeight == Fc_comment.arrScrollHeight[i]) {
						arrBtn = false;
					}
				}
				if (arrBtn) {
					Fc_comment.arrStrLen.push($("#comment2-msg1").val().length);
					Fc_comment.arrScrollHeight.push($("#comment2-msg1")[0].scrollHeight);

					$('body').animate({ scrollTop: $('html').height() + 50 }, 200);
				}
			}
			else if (Fc_comment.arrScrollHeight.length == 0) {
				Fc_comment.arrStrLen.push($("#comment2-msg1").val().length);
				Fc_comment.arrScrollHeight.push($("#comment2-msg1")[0].scrollHeight);
			}

		}
		//设置换行时的高度
		if ($("#comment2-msg1")[0].scrollHeight < totleHeight) {
			$("#comment2-msg1").css("height", $("#comment2-msg1")[0].scrollHeight);
			$(".imgContainer").css("height", $("#comment2-msg1")[0].scrollHeight);
			$(".comment2 .btn").css("height", $("#comment2-msg1")[0].scrollHeight);
		}
		scrollHeight = $("#comment2-msg1")[0].scrollHeight;

		//设置删除时评论框的高度
		if (deleteValBtn && $("#comment2-msg1").val().length < Fc_comment.arrStrLen[Fc_comment.arrStrLen.length - 1]) {
			console.log(Fc_comment.arrScrollHeight);
			$("#comment2-msg1").css("height", Fc_comment.arrScrollHeight[Fc_comment.arrScrollHeight.length - 2]);
			$(".imgContainer").css("height", Fc_comment.arrScrollHeight[Fc_comment.arrScrollHeight.length - 2]);
			$(".comment2 .btn").css("height", Fc_comment.arrScrollHeight[Fc_comment.arrScrollHeight.length - 2]);
			Fc_comment.arrStrLen.splice(Fc_comment.arrStrLen.length - 1, 1);
			Fc_comment.arrScrollHeight.splice(Fc_comment.arrScrollHeight.length - 1, 1);
		}
		//判断是否在删除
		if ($("#comment2-msg1").val().length < Fc_comment.arrStrLen[Fc_comment.arrStrLen.length - 1] && $("#comment2-msg2")[0].scrollHeight == Fc_comment.arrScrollHeight[Fc_comment.arrScrollHeight.length - 2]) {
			deleteValBtn = true;
		}
		else {
			deleteValBtn = false;
		}
		//为空是输入框初始化
		if ($("#comment2-msg1").val() == "") {
			console.log('b' + $("#comment2-msg1").val());
			console.log("输入清空");
			$("#comment2-msg1").css("height", height);
			$(".imgContainer").css("height", height);
			$(".comment2 .btn").css("height", height);
			Fc_comment.arrStrLen = [];
			Fc_comment.arrScrollHeight = [];
		}

	});
}

//隐藏评论框
Fc_comment.hiddenComment2 = function () {
	event.stopPropagation();
	$(".cardListMessage").css("display", "block");
	if ($(".comment2").css("display") == "block") {
		console.log('hiddenComment2执行了');
		$("#comment2-msg1").blur();
		$("#comment2-msg2").blur();
		if (!Fc_comment.msgScrollAddBtn) {
			$(window).scrollTop(publicData.msgScrollTop);
		}
		Fc_comment.msgScrollAddBtn = false;
		$(".comment").css("display", "none");
		$(".comment3").css("display", "none");
		$(".comment2").css("display", "none");
		publicData.commentBtn = false;
		$(".part").css("display", "block");
		$(".partRight").css("display", "block");
		$(".studentListOrder").css("display", "block");
		$(".campstatus").css("visibility", "visible");
		$(".campstatus").css("display", "block");
		//显示没有更多了
		$(".cardListMessage").css("display", "block");
		var time1 = setTimeout(function () {
			if (publicData.pageIndex == 1) {
				$(".setcard").css("display", "block");
			}
			else {
				$(".setcard").css("display", "none");
			}
			publicData.commentBtn = false;
			clearTimeout(time1);
		}, 550);
	}
}

Fc_comment.sendMsg = function (event) {
	//alert('sendMsg');
	commentDisplayBtn = true;
	event.stopPropagation();
	$("#comment2-msg1").blur();
	var commentDisplayTime = setTimeout(function () {
		commentDisplayBtn = false;
		clearTimeout(commentDisplayTime);
	}, 500);
	setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing, SXiaoXiXiangQing.SXiaoXiXiangQing_DianJiFaSong);
	//alert(1);
	if ($("#comment2-msg1").val().replace(/\s/g, "") == '') {
		// alert("留言不能为空");
		$(".error-main-t").html("留言不能为空");
		$(".errorAlert").css("display", "block");
		$(".error-main").css("margin-top", -$(".error-main").height() / 2);
	} else {
		Fc_comment.dataAddMsg.content = $("#comment2-msg1").val();
		Fc_comment.addmsg(Fc_comment.dataAddMsg);
		$(".part").css("display", "block");
		$(".partRight").css("display", "block");
		$(".studentListOrder").css("display", "block");
		$(".campstatus").css("visibility", "visible");
	}
};
//添加评论方法，将评论插入页面

Fc_comment.addmsg = function (dataAddMsg) {
	if (Fc_comment.msgBtn) {
		Fc_comment.msgBtn = false;
		Fc_comment.dataAddMsg.content = Fc_comment.dataAddMsg.content.replace(/\%/g, "%25");
		Fc_comment.dataAddMsg.content = Fc_comment.dataAddMsg.content.replace(/\&/g, "%26");
		Fc_comment.dataAddMsg.content = Fc_comment.dataAddMsg.content.replace(/\+/g, "%2B");
		Fc_comment.dataAddMsg.content = Fc_comment.dataAddMsg.content.replace(/\#/g, "%23");
		Fc_comment.dataAddMsg.content = Fc_comment.dataAddMsg.content.replace(/\n/g, "<br />");
		console.log(Fc_comment.dataAddMsg.content);
		var finalUrl = ajaxLink + "/v1/api/camp/reply" + window.location.search + '&checkId=' + Fc_comment.dataAddMsg.checkId + '&level=' + Fc_comment.dataAddMsg.level + '&replyId=' + Fc_comment.dataAddMsg.replyId + '&replyRoleId=' + Fc_comment.dataAddMsg.replyRoleId + '&content=' + Fc_comment.dataAddMsg.content;
		console.log('回复评论对应的url', finalUrl);
		//var finalUrl='http://pm.picooc.com:9989/v1/api/camp/reply?checkId=123&roleId=1300&content=heihei&level=1&replyId=56&replyRoleId=1206526';
		$.ajax({
			type: "get",
			url: finalUrl,
			dataType: "json",
			success: function (data) {
				if (data.code == 200) {
					$("#comment2-msg1").val("");
					$("#comment2-msg2").val("");
					$("#comment2-msg1").css("height", Fc_comment.commentHeight);
					$("#comment2-msg2").css("height", Fc_comment.commentHeight);
					$(".imgContainer").css("height", Fc_comment.commentHeight);
					$(".comment2 .btn").css("height", Fc_comment.commentHeight);
					Fc_comment.arrStrLen = [];
					Fc_comment.arrScrollHeight = [];
					Fc_comment.nBtn = false;
					console.log(Fc_comment);
					console.log(Fc_comment.partIndex);
					//if(Fc_comment.dataAddMsg.msgType==3){}//教练端评论

					//bindMsg();
					//bindName();
					var addMsgData = {
						pageIndex: publicData.pageIndex,
						partIndex: Fc_comment.partIndex,
						resp: data.resp
					}
					PubSub.publish("addMsg", addMsgData);
					Fc_comment.msgScrollAddBtn = true;

					if (getParamByUrl("webver") > 4) {
						var getPageInfo = function () {
							var data1 = {
								code: 1,
								desc: "发布成功",
							};
							return JSON.stringify(data1);
						};
						appFc.commentStatusCallback(getPageInfo());
					}
					Fc_comment.hiddenComment2();
					$("#comment2-msg1").val("");
					$("#comment2-msg2").val("");
					$("#comment2-msg1").css("height", Fc_comment.commentHeight);
					$("#comment2-msg2").css("height", Fc_comment.commentHeight);
					$(".imgContainer").css("height", Fc_comment.commentHeight);
					$(".comment2 .btn").css("height", Fc_comment.commentHeight);
					Fc_comment.arrStrLen = [];
					Fc_comment.arrScrollHeight = [];
					Fc_comment.nBtn = false;
				}
				else {
					// alert(data.result.message);
					if (getParamByUrl("webver") > 4) {
						var getPageInfo = function () {
							var data1 = {
								code: 0,
								desc: data.result.message,
							};
							return JSON.stringify(data1);
						};
						appFc.commentStatusCallback(getPageInfo());
					}
					else {
						$(".error-main-t").html(data.result.message);
						$(".errorAlert").css("display", "block");
						$(".error-main").css("margin-top", -$(".error-main").height() / 2);
					}

				}
				Fc_comment.msgBtn = true;
			},
			error: function (data) {
				console.log(data);
				if (data.status == 400) {
					if (getParamByUrl("webver") > 4) {
						var getPageInfo = function () {
							var data1 = {
								code: 0,
								desc: "您输入的字数超出最大长度",
							};
							return JSON.stringify(data1);
						};
						appFc.commentStatusCallback(getPageInfo());
					}
					else {
						// alert("您输入的字数超出最大长度");
						$(".error-main-t").html("您输入的字数超出最大长度");
						$(".errorAlert").css("display", "block");
						$(".error-main").css("margin-top", -$(".error-main").height() / 2);
					}
				}
				else {
					var getPageInfo = function () {
						var data1 = {
							code: 0,
							desc: data.result.message,
						};
						return JSON.stringify(data1);
					};
					appFc.commentStatusCallback(getPageInfo());
				}
				Fc_comment.msgBtn = true;
			}
		})
	}
}
window.getComment = function (data) {
	if (data.type == 0) {
		Fc_comment.dataAddMsg.placeText = data.text;
	}
	else if (data.type == 1) {
		Fc_comment.dataAddMsg.placeText = "";
		if (data.text == '') {
			var getPageInfo = function () {
				var data = {
					code: 0,
					desc: "留言不能为空",
				};
				return JSON.stringify(data);
			};
			appFc.commentStatusCallback(getPageInfo());
		}
		Fc_comment.dataAddMsg.content = data.text;
		Fc_comment.addmsg(Fc_comment.dataAddMsg);
	}
}
module.exports = Fc_comment; 