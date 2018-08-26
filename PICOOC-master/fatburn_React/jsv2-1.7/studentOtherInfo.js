webpackJsonp([2],{

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var Fc_bindBigImg = __webpack_require__(6);
//图片放大预览方法，需要单独引入Fc_bindBigImg.jsx
//引入方法
// PubSub.subscribe("bigImgData",function(evName,bigImgData){
//         	//添加大图预览
//           	this.setState({bigImgArr:bigImgData});
//         }.bind(this));
//bigImgArr为数组
// objImg:{

// }
var Public_bigImg = React.createClass({
	displayName: "Public_bigImg",

	render: function render() {
		var bigImgArr = this.props.bigImgArr;
		var list = [];
		var paginationList = [];
		console.log(publicData.objImg);
		for (var i = 0; i < bigImgArr.length; i++) {
			list.push(React.createElement("div", { className: "col-xs-12 col-sm-12 swiper-slide bigImg-li", key: i, "data-index": i, style: { backgroundImage: 'url(' + bigImgArr[i].url + ')' }, onTouchStart: Fc_bindBigImg.imgTouchStart.bind(this), onTouchMove: Fc_bindBigImg.imgTouchMove.bind(this), onTouchEnd: Fc_bindBigImg.imgTouchEnd.bind(this) }));
		}
		if (bigImgArr.length > 1) {
			for (var i = 0; i < bigImgArr.length; i++) {
				paginationList.push(React.createElement("span", { className: "swiper-pagination-bullet", key: i }));
			}
		}

		return React.createElement(
			"div",
			{ className: "row" },
			React.createElement(
				"aside",
				{ className: "row swiper-container swiper-container-bigImg bigImg" },
				React.createElement(
					"div",
					{ className: "row swiper-wrapper bigImg-main" },
					list
				),
				React.createElement(
					"div",
					{ className: "swiper-pagination swiper-pagination-bigImg swiper-pagination-report" },
					paginationList
				)
			),
			React.createElement(
				"div",
				{ className: "saveImg-ceng", onTouchStart: Fc_bindBigImg.saveImgCengTouchStart },
				React.createElement(
					"aside",
					{ className: "row saveImg" },
					React.createElement(
						"div",
						{ className: "col-xs-12 col-sm-12 saveImg-btn saveImg-item", onTouchStart: Fc_bindBigImg.saveImgBtnTouchStart },
						"\u4FDD\u5B58\u56FE\u7247"
					),
					React.createElement(
						"div",
						{ className: "col-xs-12 col-sm-12 cancelImg-btn saveImg-item", onTouchStart: Fc_bindBigImg.cancelImgBtnTouchStart },
						"\u53D6\u6D88"
					)
				)
			)
		);
	}
});
module.exports = Public_bigImg;

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Fc_MsgTotol = {};
Fc_MsgTotol.changeZan = __webpack_require__(31).changeZan;
Fc_MsgTotol.changeZanClick = function () {}
/*$(".partRight-type1-zan").unbind("click").click(function(){
	var index=$(".partRight-type1-zan").index(this);
	Fc_MsgTotol.changeZan(index);
});*/


//分享开始
;Fc_MsgTotol.shareBtn1 = true; //防止连续点击
Fc_MsgTotol.shareLink = function (event) {
	// $(".msgType2 .partRight-type1-share").unbind("click").click(function(event){
	// 	event.stopPropagation();
	// 	var checkId=$(this).attr("data-check_id");
	// 	var searchLink="";
	// 	if(getParamByUrl("checkId")!="false"){
	// 		searchLink=removeParamByUrl("checkId");
	// 	}else{
	//  		searchLink=window.location.search;
	// 	}
	// 	if(Fc_MsgTotol.shareBtn1){
	// 		Fc_MsgTotol.shareBtn1=false;
	// 		Fc_MsgTotol.setMessageStatus(0,searchLink,checkId,$(this),2);
	// 	}
	// });
	// $(".msgType1 .partRight-type1-share").unbind("click").click(function(event){
	// 	event.stopPropagation();

	// 	setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing,SXiaoXiXiangQing.SXiaoXiXiangQing_FenXiangXiaoXi);
	// 	var checkId=$(this).attr("data-check_id");
	// 	var searchLink="";

	// 	if(getParamByUrl("checkId")!="false"){
	// 		searchLink=removeParamByUrl("checkId");
	// 	}else{
	//  		searchLink=window.location.search;
	// 	}
	// 	if(Fc_MsgTotol.shareBtn1){
	// 		Fc_MsgTotol.shareBtn1=false;
	// 		Fc_MsgTotol.setMessageStatus(0,searchLink,checkId,$(this),1);
	// 	}
	// });

	event.stopPropagation();
	setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing, SXiaoXiXiangQing.SXiaoXiXiangQing_FenXiangXiaoXi);
	var checkId = event.currentTarget.getAttribute("data-check_id");
	var searchLink = "";

	if (getParamByUrl("checkId") != "false") {
		searchLink = removeParamByUrl("checkId");
	} else {
		searchLink = window.location.search;
	}
	if (Fc_MsgTotol.shareBtn1) {
		Fc_MsgTotol.shareBtn1 = false;
		Fc_MsgTotol.setMessageStatus(0, searchLink, checkId, $(this), 1);
	}
};
Fc_MsgTotol.setMessageStatus = function (replyId, searchLink, checkId, object, shareType) {
	console.info(searchLink);
	console.info(object.parents(".part"));
	event.stopPropagation();
	var host = window.location.protocol + "//" + window.location.host;
	var finalUrl = host + "/v1/api/camp/checkState" + window.location.search + "&replyId=" + replyId + "&checkId=" + checkId;
	$.ajax({
		type: "get",
		url: finalUrl,
		success: function success(data) {
			if (data.resp.check) {

				//打开一个新的webWiew
				var deviceType = isMobile(); //判断是不是app的方法
				if (deviceType == "isApp" && getParamByUrl("testtype") != "tanchao") {
					var data = {
						//link:absoluteUrl+"infoShare.html"+searchLink+"&checkId="+checkId,
						link: absoluteUrl + "cardShare.html" + searchLink + "&checkId=" + checkId,
						animation: 2 //默认1从右到左，2从下到上
					};
					data = JSON.stringify(data);
					appFc.openWebview(data);
					Fc_MsgTotol.shareBtn1 = true;
				} else {
					Fc_MsgTotol.shareBtn1 = true;
					//window.location.href="infoShare.html"+searchLink+"&checkId="+checkId;
					window.location.href = "cardShare.html" + searchLink + "&checkId=" + checkId;
				}
				event.stopPropagation();
			} else {
				$(".error-main-t").html("啊哦，该打卡已被删除~");
				$(".errorAlert").css("display", "block");
				$(".error-main").css("margin-top", -$(".error-main").height() / 2);
				Fc_MsgTotol.shareBtn1 = true;
				/*if(shareType==1){
    joinweek=0;
    time=0;
    pageIndex1=0;
    tabBtn=false;
    isFirstLoad=0;
    isCampOver=false;
    if(cardtype1 == 1){
    getList("hasDelete",1);
    }else{
    getList("hasDelete",0);
    }
    }else if(shareType ==2){
    	object.parents(".part").remove();
    }*/

				/* var noMsgNum=$("#noReadMessage li").length;
     $("#"+checkId).remove();
     if(noMsgNum == 1){
         $("#getDataButton").find("span").click();
     }*/
			}
		},
		error: function error() {
			$(".error-main-t").html("啊哦，您的网络不太给力~");
			$(".errorAlert").css("display", "block");
			$(".error-main").css("margin-top", -$(".error-main").height() / 2);
			Fc_MsgTotol.shareBtn1 = true;
		}
	});
};
//分享结束

//绑定跳转
Fc_MsgTotol.bindStudentInfo = function (event) {
	event.stopPropagation();

	//var isStutap1=$(".active").hasClass("tab1");新版本删除了
	//绑定a跳转cookie
	if (event.currentTarget.getAttribute("data-head_is_coach") != "yes") {
		var deviceType = isMobile();
		var targetCampIdHref = "";
		//var index=$(".msgInfo-name").index(this);
		//var targetRoleId=$(".msgInfo-name").eq(index).attr("targetRoleId");
		var targetRoleId = event.currentTarget.getAttribute("data-target_role_id");
		var targetCampIdHref = "";
		var jumpUrl = "";
		if (roleId == targetRoleId && targetRoleId != "false") {
			jumpUrl = "studentStudentInfo.html";
		} else {
			jumpUrl = "studentOtherInfo.html";
		}
		//如果是从营内动态进入的个人主页，返回的时候，将进行跳转到营内动态
		setCookie("stuPageJump", publicData.pageIndex, 1); //新版本营内动态为2
		if (event.currentTarget.getAttribute("data-target_camp_id") != "-1" && event.currentTarget.getAttribute("data-target_camp_id") != undefined && event.currentTarget.getAttribute("data-target_camp_id") != "undefined") {
			targetCampIdHref = "&targetCampId=" + event.currentTarget.getAttribute("data-target_camp_id");
		}
		if (deviceType == "isApp" && getParamByUrl("testtype") != "tanchao") {
			//var index=$(".msgInfo-name").index(this);
			if (getParamByUrl("targetRoleId") != "false") {
				var searchLink = removeParamByUrl("targetRoleId");
				var data = {
					link: absoluteUrl + jumpUrl + searchLink + "&targetRoleId=" + event.currentTarget.getAttribute("data-target_role_id") + targetCampIdHref,
					animation: 1 //默认1从右到左，2从下到上
				};
				data = JSON.stringify(data);
				appFc.openWebview(data);
				//mobileApp.openWebview(data);
			} else {
				var data = {
					link: absoluteUrl + jumpUrl + window.location.search + "&targetRoleId=" + event.currentTarget.getAttribute("data-target_role_id") + targetCampIdHref,
					animation: 1 //默认1从右到左，2从下到上
				};
				data = JSON.stringify(data);
				appFc.openWebview(data);
				//mobileApp.openWebview(data);
				//$(".msgInfo-name").attr("href","studentStudentInfo.html"+window.location.search+"&targetRoleId="+$(".msgInfo-name").eq(index).attr("targetRoleId"));	
			}
		} else {
			if (window.location.pathname == "/web/fatburn/student.html") {
				setCookie("studentStatu", publicData.pageIndex, 1);
			}
			//var index=$(".msgInfo-name").index(this);
			if (getParamByUrl("targetRoleId") != "false") {
				var searchLink = removeParamByUrl("targetRoleId");
				event.currentTarget.setAttribute("href", jumpUrl + searchLink + "&targetRoleId=" + event.currentTarget.getAttribute("data-target_role_id") + targetCampIdHref);
			} else {
				event.currentTarget.setAttribute("href", jumpUrl + window.location.search + "&targetRoleId=" + event.currentTarget.getAttribute("data-target_role_id") + targetCampIdHref);
			}
		}
	}
};
module.exports = Fc_MsgTotol;

/***/ }),

/***/ 130:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
var PubSub = __webpack_require__(2);

var StudentInfo_baseInfo = React.createClass({
	displayName: "StudentInfo_baseInfo",


	componentDidUpdate: function componentDidUpdate() {},
	/*changeInfo:function(){
 	var itemValue=$(this).children("input").val();
        var index=$(".noJump").index(this);
        console.info(index);
        console.info($(this).children("input").val());
        updateInfo(index,itemValue);
 },*/
	updateInfo: function updateInfo(index) {
		var itemValue = $(this).children("input").val();
		console.info(index);
		console.info(itemValue);
		var updateName = "";
		var birth = itemValue;
		if (itemIndex == 0) {
			//身高数据设置
			updateName = "height";
			if (itemValue.length == 5) {
				itemValue = itemValue.substring(0, 3);
			} else {
				itemValue = itemValue.substring(0, 2);
			}
		} else if (itemIndex == 1) {
			//生日数据设置
			updateName = "birthday";
			birth = birth.substring(0, 4) + "" + birth.substring(5, 7) + "" + birth.substring(8, 10);
			itemValue = itemValue.substring(0, 4) + "-" + itemValue.substring(5, 7) + "-" + itemValue.substring(8, 10);
			/*itemValue=itemValue.substring(0,4)+"/"+itemValue.substring(5,7)+"/"+itemValue.substring(8,10);
   itemValue=new Date(itemValue);*/
			console.info(itemValue);
		} else if (itemIndex == 2) {
			//生理期数据设置
			updateName = "physicalPeriod";
			itemValue = new Date().getYear() + 1900 + "-" + itemValue.substring(0, 2) + "-" + itemValue.substring(3, 5);
		} else if (itemIndex == 3) {
			//测量时段数据设置
			updateName = "weightPeriod";
			/*if(itemValue == "凌晨 (00:00-04:00)"){
       itemValue = 0 ;
   }else */
			if (itemValue == "上午时段 (04:00-12:00)") {
				itemValue = 1;
			} else if (itemValue == "下午时段 (12:00-16:00)") {
				itemValue = 2;
			} else if (itemValue == "傍晚时段 (16:00-20:00)") {
				itemValue = 3;
			} else if (itemValue == "夜晚时段 (20:00-24:00)") {
				itemValue = 4;
			}
			/*alert(itemValue);*/
		}
		var host = window.location.protocol + "//" + window.location.host;
		var finalUrl = host + "/v1/api/campStu/updateStudentInfo" + window.location.search + "&" + updateName + "=" + itemValue;
		console.info(finalUrl);
		$.ajax({
			type: "get",
			url: finalUrl,
			dataType: "json",
			success: function success(data) {
				if (data.code == 200) {
					if (itemIndex == 0) {
						getDataSame(itemValue, "");
					} else if (itemIndex == 1) {
						getDataSame("", birth);
					}
				} else {
					// alert("服务器开小差了～");
					$(".error-main-t").html("服务器开小差了～");
					$(".errorAlert").css("display", "block");
					$(".error-main").css("margin-top", -$(".error-main").height() / 2);
				}
			}
		});
	},
	render: function render() {
		var me = this;
		var data = me.props.baseInfo;
		console.info(data);
		var heightHtml = [];
		for (var i = 50; i <= 220; i++) {
			heightHtml.push(React.createElement(
				"li",
				{ "data-val": i + "CM", key: i },
				React.createElement(
					"p",
					null,
					i,
					"cm"
				)
			));
		}
		var weightTime = data.resp.weightPreiod;
		var weightTimeText = "";
		if (weightTime == 1) {
			weightTimeText = "上午时段 (04:00-12:00)";
		} else if (weightTime == 2) {
			weightTimeText = "下午时段 (12:00-16:00)";
		} else if (weightTime == 3) {
			weightTimeText = "傍晚时段 (16:00-20:00)";
		} else if (weightTime == 4) {
			weightTimeText = "夜晚时段 (20:00-24:00)";
		}

		return React.createElement(
			"div",
			{ className: "row page4" },
			React.createElement(
				"div",
				{ className: "col-xs-12 col-sm-12 info-item height" },
				React.createElement(
					"span",
					null,
					"\u8EAB\u9AD8"
				),
				React.createElement(
					"span",
					null,
					data.resp.height
				)
			),
			React.createElement(
				"div",
				{ className: "col-xs-12 col-sm-12 info-item age" },
				React.createElement(
					"span",
					null,
					"\u751F\u65E5"
				),
				React.createElement(
					"span",
					null,
					data.resp.birthday
				)
			),
			React.createElement(
				"div",
				{ className: "col-xs-12 col-sm-12 info-item career" },
				React.createElement(
					"span",
					null,
					"\u804C\u4E1A"
				),
				React.createElement(
					"span",
					null,
					data.resp.career == "" ? "暂无" : data.resp.career
				)
			),
			React.createElement(
				"div",
				{ className: "col-xs-12 col-sm-12 info-item area" },
				React.createElement(
					"span",
					null,
					"\u6240\u5728\u5730"
				),
				React.createElement(
					"span",
					null,
					data.resp.area == "" ? "暂无" : data.resp.area
				)
			)
		);
	}
});
module.exports = StudentInfo_baseInfo;

/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
//删除打卡，删除评论
//var PubSub = require("pubsub-js");
//alert("RankListError");
var Public_deleteComment = React.createClass({
    displayName: "Public_deleteComment",

    render: function render() {
        return React.createElement(
            "aside",
            { className: "row fixbg" },
            React.createElement(
                "div",
                { className: "col-xs-12 col-sm-12 fixbg-main" },
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "col-xs-12 col-sm-12 fixbg-main-t" },
                        "\u60A8\u786E\u5B9A\u5220\u9664\u8FD9\u6761\u8BC4\u8BBA\u5417\uFF1F"
                    ),
                    React.createElement(
                        "div",
                        { className: "col-xs-12 col-sm-12 fixbg-main-btn" },
                        React.createElement(
                            "div",
                            { className: "row" },
                            React.createElement(
                                "div",
                                { className: "col-xs-6 col-sm-6 fixbg-main-btn1" },
                                "\u53D6\u6D88"
                            ),
                            React.createElement(
                                "div",
                                { className: "col-xs-6 col-sm-6 fixbg-main-btn2" },
                                "\u786E\u5B9A"
                            )
                        )
                    )
                )
            )
        );
    }
});
module.exports = Public_deleteComment;

/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var PubSub = __webpack_require__(2);
var Fc_comment = __webpack_require__(9);

var Public_comment = React.createClass({
	displayName: "Public_comment",

	commentClick: function commentClick(event) {
		event.stopPropagation();
	},
	render: function render() {
		return React.createElement(
			"div",
			{ className: "row" },
			React.createElement(
				"div",
				{ className: "row footer  comment2", onClick: this.commentClick },
				React.createElement(
					"div",
					{ className: "col-xs-2 col-sm-2" },
					React.createElement(
						"div",
						{ className: "imgContainer", style: { width: "100%" } },
						React.createElement("img", { className: "img1", src: "image/student/student-19.png" }),
						React.createElement("div", { className: "shuxian" })
					)
				),
				React.createElement(
					"div",
					{ className: "footer-main1 col-xs-8 col-sm-8" },
					React.createElement("textarea", { id: "comment2-msg1", className: "", placeholder: "\u56DE\u590D:", onFocus: Fc_comment.focus, onBlur: Fc_comment.blur })
				),
				React.createElement(
					"div",
					{ className: "col-xs-2 col-sm-2" },
					React.createElement(
						"div",
						{ className: "btn", style: { width: "100%" }, onClick: Fc_comment.sendMsg },
						React.createElement("img", { className: "comment2-send", src: "image/student/send1.png" })
					)
				)
			),
			React.createElement(
				"div",
				{ className: "row footer comment3" },
				React.createElement(
					"div",
					{ className: "footer-main1 col-xs-8 col-sm-8" },
					React.createElement("textarea", { id: "comment2-msg2", className: "" })
				)
			)
		);
	}
});
module.exports = Public_comment;

/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var PubSub = __webpack_require__(2);
var arrbg1 = ["image/setcard/setcard-2.png", "image/setcard/all.png", "image/setcard/setcard-3.png", "image/setcard/diet.png", "image/setcard/setcard-4.png", "image/setcard/setcard-7.png", "image/setcard/setcard-5.png", "image/setcard/setcard-summary.png"];
var arrbg2 = ["image/setcard/setcard-31.png", "image/setcard/setcard-39.png", "image/setcard/setcard-32.png", "image/setcard/setcard-40.png", "image/setcard/setcard-33.png", "image/setcard/setcard-36.png", "image/setcard/setcard-34.png", "http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-summary2.png"];
var arrbg4 = [1];
var arrContent = ["早餐", "全部", "午餐", "饮食", "晚餐", "运动", "加餐", "小结"];
var arrContent3 = "全部";

var touchTime1;
var touchTime2;
var touchTime3;
var touchTime4;
var shaixuanFrom = ""; //判断是个人进展的筛选，还是我的个人主页，还是它的个人主页的筛选 0 1 2
shaixuanFrom = 0;
var shaixuanComment = false;
var touchmoveBtn = true;
var firstweek;
var shaixuan1ComeFrom = "";
$("body").on("touchmove", function (event) {
	$(".type-container1").css("display", "none");
	$(".typeContainer").css("display", "none");
	partPosition2();
});
function partPosition2() {

	if (!shaixuanComment) {
		var parttopheight = 0;
		if ($(".msgType1 .part").length > 0) {
			parttopheight = $(".msgType1 .part").eq(0).offset().top - $(window).scrollTop();
		}

		if (parttopheight == 0 || parttopheight >= fontHeight * 3 && $(".shaixuan1").css("position") != "relative" || parttopheight < fontHeight * 3 && $(".shaixuan1").css("position") != "fixed") {
			touchmoveBtn = true;
		} else {
			touchmoveBtn = false;
		}
		if (touchmoveBtn) {
			if (parttopheight >= fontHeight * 3 || parttopheight == 0) {
				$(".campstatusContainer1").css("margin-top", "0.6rem");
				$(".shaixuan1").css("position", "relative");
				$(".shaixuan1").css("top", 0);
				$(".shaixuan1").css("left", 0);
				$(".msgType1 .list").css("margin-top", 0);
			} else {
				$(".campstatusContainer1").css("margin-top", "0");
				$(".shaixuan1").css("position", "fixed");
				if (shaixuan1ComeFrom == "studentInfo") {
					$(".shaixuan1").css("top", 0);
					$(".shaixuan1").css("left", 0);
					$(".campstatusContainer1").css("margin-top", "0.6rem");
				} else {
					$(".shaixuan1").css("top", "3rem");
					$(".shaixuan1").css("left", 0);
				}
				$(".msgType1 .list").css("margin-top", $(".shaixuan1").height());
			}
		}
	}
	//替换第几周
	var campstatusContainer1 = $(".campstatus");
	if (campstatusContainer1.length > 0) {
		var isWeek = true;
		for (var i = 0; i < campstatusContainer1.length; i++) {
			var topheight2 = $(".campstatus").eq(i).offset().top - $(window).scrollTop();
			if (topheight2 < fontHeight * 5.15) {
				var week = $(".campstatus .campstatusContent").eq(i).html();
				$(".campstatus1 .campstatusContent").html(week);
				isWeek = false;
			} else {
				if (isWeek) {
					$(".campstatus1 .campstatusContent").html(firstweek);
				}
			}
		}
	}
}

$("body").on("touchend", function (event) {
	var timeIndex = 0;
	partPosition2();
	clearInterval(touchTime3);
	clearTimeout(touchTime4);
	//console.log("end执行");
	touchTime3 = setInterval(function () {
		partPosition2();
		timeIndex++;
		//console.log(timeIndex);
		if (timeIndex > 200) {
			clearInterval(touchTime3);
		}
	}, 10);
	touchTime4 = setTimeout(function () {
		clearInterval(touchTime3);
		clearTimeout(touchTime4);
	}, 2000);
});

var StudentMsgType1_shaixuan1 = React.createClass({
	displayName: "StudentMsgType1_shaixuan1",

	listDisplay: function listDisplay() {
		var display = $(".type-container1").css("display");

		if (display == "none") {
			var topheight = $(".shaixuan1").offset().top - $(window).scrollTop();
			// console.log("topheight-----"+topheight);
			if (topheight > $(window).height() / 2) {
				$(".type-container1").css("top", "-11.5rem");
				$(".type-container1").css("background-image", "url(image/studentList/bg2.png)");
				$(".type-container1").css("padding", "1rem 1rem");
			} else {
				$(".type-container1").css("top", "2.5rem");
				$(".type-container1").css("background-image", "url(image/studentList/bg.png)");
				$(".type-container1").css("padding", "1.3rem 1rem");
			}
			$(".type-container1").css("display", "block");
			$(".typeContainer").css("height", $(window).height());
			$(".typeContainer").css("display", "block");
			// $(".shaixuan1").css("z-index","120");
			$(".type-container1").css("z-index", "120");
		} else {
			$(".type-container1").hide();
		}
		event.stopPropagation();
	},
	iconClick: function iconClick(event) {
		//setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_DianJiQieHuanBiaoQian);
		//alert($(".icon1").index(event.currentTarget));
		event.stopPropagation();
		var index = $(".icon1").index(event.currentTarget);

		if (arrbg4.length != 0) {
			$(".icon1").eq(arrbg4[0]).find("img").attr("src", arrbg1[arrbg4[0]]);
		}
		arrbg4[0] = index;
		arrContent3 = arrContent[index];
		$(".icon1").eq(index).find("img").attr("src", arrbg2[index]);
		if (index == 0) {
			publicData.checkType1 = 0;
			//setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanZaoCanDaKa);
		} else if (index == 1) {
			publicData.checkType1 = 9;
		} else if (index == 2) {
			publicData.checkType1 = 1;
			//setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanWuCanDaKa);
		} else if (index == 3) {
			publicData.checkType1 = 5;
			//setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanYinShiDaKa);
		} else if (index == 4) {
			publicData.checkType1 = 2;
			//setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanWanCanDaKa);
		} else if (index == 5) {
			publicData.checkType1 = 4;
			//setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanYunDongDaKa);
		} else if (index == 6) {
			publicData.checkType1 = 3;
			//setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanJiaCanDaKa);
		} else if (index == 7) {
			//加班的type
			publicData.checkType1 = 6;
			//setMaiDian(SXueYuanShouYe.SCategory_SXueYuanShouYe,SXueYuanShouYe.SXueYuanShouYe_ShaiXuanJiaCanDaKa);
		}
		$(".tabtype1").html(arrContent3);
		$(".type-container1").hide();
		//$(".typeContainer").css("display","none");
		$(".shaixuan1").css("z-index", "10");
		$(".type-container1").css("z-index", "10");

		//tabBtn=false;
		//isFirstLoad=0;
		//isCampOver=false;

		if (publicData.weekSummaryNum == 0 && index == 7) {
			//周表现总结的数组长度为0
			if (publicData.isCampStatus) {
				//在营

				$(".errorAlert").css("display", "none");

				$('.newAlertBox').show();
				$('.newAlertBox .newAlert .content').html('第一周还没有结束哦，请于第二周开始查看总结');
				//$(".newAlertBox .newAlert").css("margin-top",-$(".newAlertBox .newAlert").height()/2 - 20);

				$('html, body').css('overflow', 'hidden').on("touchmove", function (ev) {
					ev = ev || event;
					if (ev.preventDefault) {
						ev.preventDefault();
					} else {
						return false;
					}
				});

				//$(".error-main-t").html('第一周还没有结束哦，请于第二周开始查看总结');
				//$(".errorAlert").css("display","block");
				//$(".error-main").css("margin-top",-$(".error-main").height()/2 - 20);
			} else {
				//已结营

				$(".errorAlert").css("display", "none");

				$('.newAlertBox').show();
				$('.newAlertBox .newAlert .content').html('当前班级没有小结功能哦，请点击最新班级查看');
				//$(".newAlertBox .newAlert").css("margin-top",-$(".newAlertBox .newAlert").height()/2 - 20);

				$('html, body').css('overflow', 'hidden').on("touchmove", function (ev) {
					ev = ev || event;
					if (ev.preventDefault) {
						ev.preventDefault();
					} else {
						return false;
					}
				});

				//$(".error-main-t").html('当前班级没有小结功能哦，请点击最新班级查看');
				//$(".errorAlert").css("display","block");
				//$(".error-main").css("margin-top",-$(".error-main").height()/2 - 20);
			}
		} else {
			PubSub.publish("shaixuan", 1);
		}

		$(".msgType1 .list").css("margin-top", 0);
		$(".shaixuan1").css("position", "relative");
		$(".shaixuan1").css("top", 0);
		$(".campstatusContainer1").css("margin-top", "0.6rem");
		$(".shaixuan1").css("display", "block");
		//console.log($(".msgType1 .list").offset().top+"|"+$(".shaixuan1").height());
		$('body').animate({ scrollTop: $(".msgType1 .list").offset().top - $(".shaixuan1").height() + 0.5 * fontHeight }, 200);
	},
	render: function render() {
		var shaixuan1Name = this.props.shaixuan1Name;
		shaixuan1ComeFrom = this.props.shaixuan1ComeFrom;
		firstweek = shaixuan1Name;
		var nameDisplay = "block";
		if (shaixuan1Name == "") {
			nameDisplay = "none";
		}
		return React.createElement(
			"div",
			{ className: "row shaixuan1", style: { display: "block" } },
			React.createElement(
				"div",
				{ className: "col-xs-12 col-sm-12 campstatusContainer1" },
				React.createElement(
					"div",
					{ className: "ttab1", onClick: this.listDisplay },
					React.createElement(
						"span",
						{ className: "ttab1Inner" },
						React.createElement("img", { className: "shaiXuanPng", src: "http://cdn2.picooc.com/web/res/fatburn/image/student/shaixuan.png", alt: "" }),
						React.createElement(
							"span",
							{ className: "tabtype1" },
							"\u5168\u90E8"
						)
					)
				),
				React.createElement(
					"div",
					{ className: "col-xs-12 col-sm-12 campstatus1" },
					React.createElement(
						"div",
						{ className: "campstatusContent", style: { display: nameDisplay } },
						shaixuan1Name
					)
				)
			),
			React.createElement(
				"div",
				{ className: "type-container1" },
				React.createElement(
					"div",
					{ className: "icon1", onClick: this.iconClick },
					React.createElement("img", { src: "http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-2.png" })
				),
				React.createElement(
					"div",
					{ className: "icon1", onClick: this.iconClick },
					React.createElement("img", { src: "image/setcard/setcard-39.png" })
				),
				React.createElement(
					"div",
					{ className: "icon1", onClick: this.iconClick },
					React.createElement("img", { src: "http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-3.png" })
				),
				React.createElement(
					"div",
					{ className: "icon1", onClick: this.iconClick },
					React.createElement("img", { src: "http://cdn2.picooc.com/web/res/fatburn/image/studentList/diet.png" })
				),
				React.createElement(
					"div",
					{ className: "icon1", onClick: this.iconClick },
					React.createElement("img", { src: "http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-4.png" })
				),
				React.createElement(
					"div",
					{ className: "icon1", onClick: this.iconClick },
					React.createElement("img", { src: "http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-7.png" })
				),
				React.createElement(
					"div",
					{ className: "icon1", onClick: this.iconClick },
					React.createElement("img", { src: "http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-5.png" })
				),
				React.createElement(
					"div",
					{ className: "icon1", onClick: this.iconClick },
					React.createElement("img", { src: "http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-summary.png" })
				)
			)
		);
	}
});
module.exports = StudentMsgType1_shaixuan1;

/***/ }),

/***/ 242:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _publicData;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
var PubSub = __webpack_require__(2);

//数据错误提示
var Public_error = __webpack_require__(3);
var Public_deleteComment = __webpack_require__(15);
// //公共评论
// var Public_comment=require("./Public_comment.jsx");
//身体数据变化子模块
var StudentInfo_bodyChange = __webpack_require__(50);
//打卡子模块
var StudentInfo_cardList = __webpack_require__(51);
//运动数据信息子模块
var StudentInfo_trainInfo = __webpack_require__(52);
//身体基本信息子模块
var StudentOtherInfo_baseInfo = __webpack_require__(130);
//部分页面公用参数


var publicData = (_publicData = {
	pageIndex: 1, //判断在个人主页还是营内动态
	time1: 0,
	hasNextBtn1: true,
	ajaxBtn1: true,
	pageIndex1: 0, //type1的接口页数
	checkType1: 9, //接口的请求类型,用于筛选
	checkTypeNum1: 9, //存储checkType1上一个数值，用于与checkType1当前数值对比，筛选时参数
	checkTypeBtn: false, //判断是不是和筛选
	type1Week: { //第几周修改，用于筛选时重置
		checkDayBtn: 0,
		isFirstLoad: 0,
		isCampOver: false,
		joinweek: 0
	},
	type1left: { //第几周修改，用于筛选时重置
		checkDayBtn: 0,
		isCampOver: false,
		joinweek: 0
	},
	time2: 0,
	hasNextBtn2: true,
	pageIndex2: 0, //type2的接口页数
	checkType2: 9, //接口的请求类型,用于筛选
	checkTypeNum2: 9, //存储checkType1上一个数值，用于与checkType1当前数值对比，筛选时参数
	checkTypeBtn2: false, //判断是不是和筛选
	count: 20,
	cardType: ["早餐", "午餐", "晚餐", "加餐", "运动"],
	cardTypeBg: ["https://cdn2.picooc.com/web/res/fatburn/image/student/student-20.png", "https://cdn2.picooc.com/web/res/fatburn/image/student/student-21.png", "https://cdn2.picooc.com/web/res/fatburn/image/student/student-22.png", "https://cdn2.picooc.com/web/res/fatburn/image/student/student-23.png", "https://cdn2.picooc.com/web/res/fatburn/image/student/student-24.png"],
	cardTypeBg2: ["https://cdn2.picooc.com/web/res/fatburn/image/cardShare/info-1.png", "https://cdn2.picooc.com/web/res/fatburn/image/cardShare/info-2.png", "https://cdn2.picooc.com/web/res/fatburn/image/cardShare/info-3.png", "https://cdn2.picooc.com/web/res/fatburn/image/cardShare/info-4.png", "https://cdn2.picooc.com/web/res/fatburn/image/cardShare/info-5.png"],
	objImg: {}, //图片预览对象
	commentBtn: false, //判断评论框是否显示出来
	msgScrollTop: 0, //滚动的高度
	functionType: 1, //评论框判断页面来源，1、个人主页 2、他人主页 3、营内动态 4、教练端 info、info页
	inputSelect: false, //评论输入框是否选中
	firstInputSelect: false, //评论输入框是否选中，用来判断滚动是否隐藏输入框
	pageBtn: true, //滚动时请求接口判断
	tabBtn: true }, _defineProperty(_publicData, "commentBtn", false), _defineProperty(_publicData, "targetRoleId", getParamByUrl("targetRoleId")), _defineProperty(_publicData, "needRefresh", false), _defineProperty(_publicData, "hasGetChart", false), _defineProperty(_publicData, "isCanDianZan", true), _defineProperty(_publicData, "weekSummaryNum", 0), _defineProperty(_publicData, "isCampStatus", false), _publicData);
window.publicData = publicData;
var SXiaoXiXiangQing = { //和info.js匹配
	SCategory_SXiaoXiXiangQing: 5060700,
	SXiaoXiXiangQing_ZuoBianTouXiangTiaoZhuan: 5060701, //左边头像跳转
	SXiaoXiXiangQing_YouBianNiChengTiaoZhuan: 5060702, //右边昵称跳转
	SXiaoXiXiangQing_YuLanTuPian: 5060703, //预览图片
	SXiaoXiXiangQing_ShanChuDaka: 5060704, //删除打卡
	SXiaoXiXiangQing_QuXiaoShanChu: 5060705, //取消删除
	SXiaoXiXiangQing_QueDingShanChu: 5060706, //确定删除
	SXiaoXiXiangQing_FenXiangXiaoXi: 5060707, //分享消息
	SXiaoXiXiangQing_DianZan: 5060708, //点赞
	SXiaoXiXiangQing_PingLunXiaoXi: 5060709, //评论消息
	SXiaoXiXiangQing_DianZanXueYuanTouXiang: 5060710, //点赞学员头像
	SXiaoXiXiangQing_BangDingHuiFuShiJian: 5060711, //绑定回复事件
	SXiaoXiXiangQing_ShanChuZiJiPingLun: 5060712, //删除自己评论
	SXiaoXiXiangQing_QuXiaoShanChuZiJiPingLun: 5060713, //取消删除自己评论
	SXiaoXiXiangQing_HuiFuShuRuKuang: 5060714, //回复输入框
	SXiaoXiXiangQing_DianJiFaSong: 5060715 //点击发送
};
window.SXiaoXiXiangQing = SXiaoXiXiangQing;

var SWoDeGeRenZhuYe = {
	SCategory_SWoDeGeRenZhuYe: 5061200,
	SWoDeGeRenZhuYe_ShenTiBianHua: 5061201, //查看身体变化
	SWoDeGeRenZhuYe_DaKaJiLu: 5061202, //查看打卡记录
	SWoDeGeRenZhuYe_JiBenXinXi: 5061203, //查看基本信息
	SWoDeGeRenZhuYe_GengDuoZhiBiaoBianHua: 5061207, //查看更多指标变化
	SWoDeGeRenZhuYe_TiaoZhuanXiuGaiGeRenZiLiao: 5061208, //跳转修改个人资料
	SWoDeGeRenZhuYe_JiaoLianChaKanXueYuanShenCai: 5061209, //教练查看学员身材
	SWoDeGeRenZhuYe_XiuGaiShenGao: 5061210, //修改身高
	SWoDeGeRenZhuYe_XiuGaiShengRi: 5061211, //修改生日
	SWoDeGeRenZhuYe_XiuGaiShengLiQi: 5061212, //修改生理期
	SWoDeGeRenZhuYe_XiuGaiXiGuanCeLiangShiDuan: 5061213, //修改习惯测量时段
	SWoDeGeRenZhuYe_XiuGaiTouXiang: 5061214, //修改头像
	SWoDeGeRenZhuYe_DianJiShaiXuan: 5061215 //我的个人主页点击筛选
};

var StudentInfoTop = React.createClass({
	displayName: "StudentInfoTop",

	getInitialState: function getInitialState() {
		var me = this;
		var data = me.props.baseInfo;
		window.getImg = me.getImg;
		return {};
	},
	showPage: function showPage(index) {
		var currentIndex = 0;
		var nextIndex = index;
		var slideWidth = parseInt(nextIndex - currentIndex) * 0.25 * $(window).width();
		var nextColor = "";
		$(".page" + (parseInt(nextIndex) + 1)).css("display", "block").siblings().css("display", "none");
		$(".info-tag .info-tag-item:eq(" + nextIndex + ")").css("color", "#fff").siblings().css("color", "rgba(255,255,255,0.5)");
		$(window).scrollTop(0);
		$(".info-tag").removeClass("nav-fixed");
		$("#tag-content").removeClass("content");
		$(".navBar").animate({ left: slideWidth }, 200);
		if (nextIndex == 0) {
			$(".info-tag .info-tag-item:eq(0) div").children("img").attr("src", "http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/cardInfo5.png");
			$(".info-tag .info-tag-item:eq(1) div").children("img").attr("src", "http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/trainInfo6.png");
			$(".info-tag .info-tag-item:eq(2) div").children("img").attr("src", "http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/bodyChange6.png");
			$(".info-tag .info-tag-item:eq(3) div").children("img").attr("src", "http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/baseInfo6.png");
			setMaiDian(SWoDeGeRenZhuYe.SCategory_SWoDeGeRenZhuYe, SWoDeGeRenZhuYe.SWoDeGeRenZhuYe_DaKaJiLu);
		} else if (nextIndex == 1) {
			$(".page2").css("height", $(window).innerHeight() - $(".top-info").height() + 50 - 2.5625 * fontHeight + "px");
			$(".info-tag .info-tag-item:eq(0) div").children("img").attr("src", "http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/cardInfo6.png");
			$(".info-tag .info-tag-item:eq(1) div").children("img").attr("src", "http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/trainInfo5.png");
			$(".info-tag .info-tag-item:eq(2) div").children("img").attr("src", "http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/bodyChange6.png");
			$(".info-tag .info-tag-item:eq(3) div").children("img").attr("src", "http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/baseInfo6.png");
			setMaiDian(SWoDeGeRenZhuYe.SCategory_SWoDeGeRenZhuYe, SWoDeGeRenZhuYe.SWoDeGeRenZhuYe_DaKaJiLu);
		} else if (nextIndex == 2) {
			/*this.refs.getChartData.getBodyChange(publicData.targetRoleId);*/
			if (!publicData.hasGetChart) {
				this.props.getChartData(publicData.targetRoleId);
				publicData.hasGetChart = true;
			}

			$(".info-tag .info-tag-item:eq(0) div").children("img").attr("src", "http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/cardInfo6.png");
			$(".info-tag .info-tag-item:eq(1) div").children("img").attr("src", "http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/trainInfo6.png");
			$(".info-tag .info-tag-item:eq(2) div").children("img").attr("src", "http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/bodyChange5.png");
			$(".info-tag .info-tag-item:eq(3) div").children("img").attr("src", "http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/baseInfo6.png");
			setMaiDian(SWoDeGeRenZhuYe.SCategory_SWoDeGeRenZhuYe, SWoDeGeRenZhuYe.SWoDeGeRenZhuYe_ShenTiBianHua);
		} else {
			$(".info-tag .info-tag-item:eq(0) div").children("img").attr("src", "http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/cardInfo6.png");
			$(".info-tag .info-tag-item:eq(1) div").children("img").attr("src", "http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/trainInfo6.png");
			$(".info-tag .info-tag-item:eq(2) div").children("img").attr("src", "http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/bodyChange6.png");
			$(".info-tag .info-tag-item:eq(3) div").children("img").attr("src", "http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/baseInfo5.png");
			setMaiDian(SWoDeGeRenZhuYe.SCategory_SWoDeGeRenZhuYe, SWoDeGeRenZhuYe.SWoDeGeRenZhuYe_JiBenXinXi);
		}
	},
	changeHeaderImg: function changeHeaderImg() {
		var data = {
			maxNum: 1, //上传图片的最大个数
			imageType: "userHeader"
		};
		data = JSON.stringify(data);
		appFc.uploadImg(data);
		setMaiDian(SWoDeGeRenZhuYe.SCategory_SWoDeGeRenZhuYe, SWoDeGeRenZhuYe.SWoDeGeRenZhuYe_XiuGaiTouXiang);
	},
	getImg: function getImg(url) {
		var userHeader = url[0];
		$(".head").attr("src", userHeader);
		publicData.needRefresh = true;
		leftControl(publicData.needRefresh, false);
	},
	addFriendClick: function addFriendClick() {
		var me = this;
		var data = me.props.baseInfo;

		var friendUserId = data.resp.friendUserId;
		var hasAddFriend = getCookie("hasAdd" + friendUserId);
		var isReply = $(".isReply").text() == "true" ? true : false;
		console.info(isReply);
		console.info(hasAddFriend + "||" + (hasAddFriend == "true"));
		/*alert(hasAddFriend+"||" + (hasAddFriend == "true"));*/
		if (hasAddFriend == "true") {
			/*alert("触发了~");*/
			$(".container").css("height", $(window).height());
			$(".fixbg1").css("height", $(window).height());
			$(".fixbg1").css("display", "block");
			$(".fixbg1 .fixbg-main-btn1").click(function () {
				$(".fixbg1").css("display", "none");
			});
		} else {
			var name = $(".roleName").text();
			var friendUserId = $("#friendUserId").text();
			me.addFriendJump(name, friendUserId);
		}
		/*setMaiDian(STaDeGeRenZhuYe.SCategory_STaDeGeRenZhuYe,STaDeGeRenZhuYe.STaDeGeRenZhuYe_TianJiaQinYou);*/
	},
	addFriendJump: function addFriendJump(name, friendUserId) {
		var linkJump = absoluteUrl;
		var myName = "有品燃脂营" + name;
		//修改
		var data = {
			link: linkJump + "searchsendmsg.html" + window.location.search + "&myName=" + myName + "&friendUserId=" + friendUserId,
			animation: 1 //默认1从右到左，2从下到上
		};
		data = JSON.stringify(data);
		var deviceType = isMobile();
		if (deviceType == "isApp" && getParamByUrl("testtype") != "tanchao") {
			appFc.openWebview(data);
		} else {
			window.location.href = linkJump + "searchsendmsg.html" + window.location.search + "&myName=" + myName + "&friendUserId=" + friendUserId;
		}
	},
	componentDidUpdate: function componentDidUpdate() {
		var baseInfoStatus = getCookie("baseInfo");
		if (baseInfoStatus == 1) {
			delCookie("baseInfo");
			this.showPage(3);
		}

		var me = this;
		var data = me.props.baseInfo;
		if (typeof data.resp != "undefined") {
			if (data.resp.friendType == 0 || data.resp.friendType == 3 || data.resp.friendType == 4 || data.resp.friendType == 9 || data.resp.friendType == 5) {
				$(".hasAddFriend").css("display", "none");
				$(".addFriend").css("display", "block");
				setCookie("hasAdd" + data.resp.friendUserId, false, 30);
			} else if (data.resp.friendType == 1) {
				$(".hasAddFriend").css("display", "none");
				$(".addFriend").css("display", "block");
				setCookie("hasAdd" + data.resp.friendUserId, true, 30);
			} else if (data.resp.friendType == 2) {
				$(".hasAddFriend").css("display", "block");
				$(".addFriend").css("display", "none");
				setCookie("hasAdd" + data.resp.friendUserId, false, 30);
			}
		}
	},
	render: function render() {
		var me = this;
		var data = me.props.baseInfo;
		/*console.info(data);*/
		if (typeof data.resp != "undefined") {
			var headerImg = "";
			if (data.resp.title.sex == 0) {
				headerImg = "http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/girl.png";
			} else {
				headerImg = "http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/boy.png";
			}
			return React.createElement(
				"div",
				null,
				React.createElement(
					"div",
					{ className: "top-info" },
					React.createElement(
						"div",
						{ className: "row top-info1" },
						React.createElement(
							"div",
							{ className: "col-xs-3 col-sm-3 top-img", style: { visibility: "visible" } },
							React.createElement("img", { className: "head", src: data.resp.title.head, onError: imgError.bind(this, data.resp.title.sex) }),
							React.createElement("img", { className: "sex", src: headerImg })
						),
						React.createElement(
							"div",
							{ className: "col-xs-9 col-sm-9 row right-part" },
							React.createElement(
								"div",
								{ className: "row account" },
								React.createElement(
									"span",
									{ id: "accountVal" },
									data.resp.title.name
								)
							),
							React.createElement(
								"div",
								{ style: { display: 'none' } },
								React.createElement(
									"span",
									{ id: "friendUserId" },
									data.resp.friendUserId
								)
							),
							React.createElement(
								"div",
								{ className: "row addFriend", onClick: me.addFriendClick },
								React.createElement(
									"span",
									null,
									"+\u52A0\u4E3APICOOC\u597D\u53CB"
								),
								React.createElement(
									"span",
									{ className: "roleName", style: { display: 'none' } },
									data.resp.roleName
								),
								React.createElement("span", { className: "isReply", style: { display: 'none' } })
							),
							React.createElement(
								"div",
								{ className: "row hasAddFriend" },
								React.createElement("img", { src: "http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/hasAddFriend.png" }),
								React.createElement(
									"span",
									null,
									"\u5DF2\u52A0\u4E3APICOOC\u597D\u53CB"
								)
							)
						)
					),
					React.createElement(
						"div",
						{ className: "row info-tag" },
						React.createElement(
							"div",
							{ className: "row" },
							React.createElement(
								"div",
								{ className: "col-xs-3 col-sm-3 info-tag-item", onClick: me.showPage.bind(this, 0) },
								React.createElement(
									"div",
									null,
									React.createElement("img", { src: "http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/cardInfo3.png" })
								),
								React.createElement(
									"span",
									null,
									"\u6253\u5361\u8BB0\u5F55"
								)
							),
							React.createElement(
								"div",
								{ className: "col-xs-3 col-sm-3 info-tag-item", onClick: me.showPage.bind(this, 1) },
								React.createElement(
									"div",
									null,
									React.createElement("img", { src: "http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/trainInfo6.png" })
								),
								React.createElement(
									"span",
									null,
									"\u8FD0\u52A8\u6570\u636E"
								)
							),
							React.createElement(
								"div",
								{ className: "col-xs-3 col-sm-3 info-tag-item", onClick: me.showPage.bind(this, 2) },
								React.createElement(
									"div",
									null,
									React.createElement("img", { src: "http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/bodyChange4.png" })
								),
								React.createElement(
									"span",
									null,
									"\u8EAB\u4F53\u53D8\u5316"
								)
							),
							React.createElement(
								"div",
								{ className: "col-xs-3 col-sm-3 info-tag-item", onClick: me.showPage.bind(this, 3) },
								React.createElement(
									"div",
									null,
									React.createElement("img", { src: "http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/baseInfo4.png" })
								),
								React.createElement(
									"span",
									null,
									"\u57FA\u672C\u4FE1\u606F"
								)
							)
						),
						React.createElement(
							"div",
							{ className: "row navBar" },
							React.createElement("div", null)
						)
					)
				)
			);
		}
		return React.createElement("i", null);
	}
});

var StudentInfoCenter = React.createClass({
	displayName: "StudentInfoCenter",

	getBodyChange: function getBodyChange() {
		this.refs.getChartData.getBodyChange(publicData.targetRoleId);
	},
	render: function render() {
		var me = this;
		var baseInfo = me.props.baseInfo;
		console.info(baseInfo.resp);
		if (typeof baseInfo.resp != "undefined") {
			return React.createElement(
				"div",
				{ className: "row", id: "tag-content" },
				React.createElement(StudentInfo_cardList, { reload: me.props.reload }),
				React.createElement(StudentInfo_trainInfo, null),
				React.createElement(StudentInfo_bodyChange, { ref: "getChartData" }),
				React.createElement(StudentOtherInfo_baseInfo, { baseInfo: baseInfo, isPersonInfo: false })
			);
		}
		return React.createElement("i", null);
	}
});

var StudentInfoContainer = React.createClass({
	displayName: "StudentInfoContainer",

	getInitialState: function getInitialState() {
		var me = this;
		me.getBaseInfo();
		var titleData = {
			title: "Ta的个人主页",
			color: "",
			opacity: "",
			backgroundColor: "",
			backgroundOpacity: ""
		};
		titleData = JSON.stringify(titleData);
		appFc.controlTitle(titleData);
		return {
			baseInfo: [],
			reload: false
		};
	},
	componentDidMount: function componentDidMount() {
		PubSub.subscribe("reload", function (evName, data) {
			this.setState({ reload: data });
		}.bind(this));
	},
	//左上角刷新返回功能
	leftControl: function leftControl(needRefresh, isHidden) {
		var getPageInfo = function getPageInfo() {
			var data = {
				iconType: 0,
				iconColor: "",
				backNum: 0,
				closeWebview: 1,
				hidden: isHidden,
				isHandle: false,
				functionName: "",
				isRefreshPage: needRefresh
			};
			return JSON.stringify(data);
		};
		appFc.controlLeft(getPageInfo());
	},
	getBaseInfo: function getBaseInfo() {
		var targetRoleId = publicData.targetRoleId;
		var me = this;
		var host = window.location.protocol + "//" + window.location.host;
		var finalUrl = host + "/v1/api/camp/getBasicInfo" + window.location.search + "&targetRoleId=" + targetRoleId;
		console.info(finalUrl);
		$.ajax({
			type: "get",
			url: finalUrl,
			dataType: "json",
			success: function success(data) {
				if (data.code == 200) {
					me.setState({ baseInfo: data });
					console.info("baseInfo-------");
					console.info(me.state.baseInfo);
				} else {
					$(".error-main-t").html("服务器开小差了～");
					$(".errorAlert").css("display", "block");
					$(".error-main").css("margin-top", -$(".error-main").height() / 2);
				}
			}
		});
	},
	bodyChangeChart: function bodyChangeChart() {
		console.info("container");
		console.info(this.refs);
		this.refs.getChartData.getBodyChange(publicData.targetRoleId);
	},
	render: function render() {
		var me = this;
		return React.createElement(
			"div",
			null,
			React.createElement(StudentInfoTop, { baseInfo: me.state.baseInfo, getChartData: this.bodyChangeChart }),
			React.createElement(StudentInfoCenter, { baseInfo: me.state.baseInfo, ref: "getChartData" })
		);
	}
});

var SaveInfo = React.createClass({
	displayName: "SaveInfo",

	render: function render() {
		return React.createElement(
			"aside",
			{ className: "row fixbg fixbg1" },
			React.createElement(
				"div",
				{ className: "col-xs-12 col-sm-12 fixbg-main" },
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"div",
						{ className: "col-xs-12 col-sm-12 fixbg-main-t" },
						"\u60A8\u5DF2\u53D1\u9001\u8BF7\u6C42\uFF0C\u7B49\u5F85\u5BF9\u65B9\u5904\u7406"
					),
					React.createElement(
						"div",
						{ className: "col-xs-12 col-sm-12 fixbg-main-btn" },
						React.createElement(
							"div",
							{ className: "row" },
							React.createElement(
								"div",
								{ className: "col-xs-12 col-sm-12 fixbg-main-btn1" },
								"\u6211\u77E5\u9053\u4E86"
							)
						)
					)
				)
			)
		);
	}
});

var Component = React.createClass({
	displayName: "Component",

	getInitialState: function getInitialState() {
		var me = this;
		return {
			imgArr: "",
			bigImgArr: ""
		};
	},
	render: function render() {

		return React.createElement(
			"div",
			null,
			React.createElement(
				"div",
				{ className: "row newAlertBox" },
				React.createElement(
					"div",
					{ className: "col-xs-12 col-sm-12 newAlert" },
					React.createElement(
						"div",
						{ className: "row" },
						React.createElement(
							"div",
							{ className: "col-xs-12 col-sm-12 content", style: { marginTop: '0' } },
							"111"
						),
						React.createElement(
							"div",
							{ className: "col-xs-12 col-sm-12 iKnow" },
							React.createElement(
								"div",
								{ className: "row" },
								React.createElement(
									"div",
									{ className: "col-xs-12 col-sm-12 iKnow1", onClick: this.newAlertKnow },
									"\u6211\u77E5\u9053\u4E86"
								)
							)
						)
					)
				)
			),
			React.createElement(StudentInfoContainer, null),
			React.createElement(Public_error, null),
			React.createElement(SaveInfo, null),
			React.createElement(Public_deleteComment, null)
		);
	},

	//1.7新增弹框newAlertKnow
	newAlertKnow: function newAlertKnow() {
		$('.newAlertBox').hide();
		$('html, body').css('overflow', 'auto').off("touchmove");
	}

});
ReactDOM.render(React.createElement(Component, null), document.getElementById('studentMain'));

/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var PubSub = __webpack_require__(2);
var Fc_MsgTotol = __webpack_require__(13);
var checkDayBtn = 0;
var isFirstLoad = 0;
var isCampOver = false;
var joinweek = 0;
var StudentMsgType1_list_part_partleft = React.createClass({
	displayName: "StudentMsgType1_list_part_partleft",

	render: function render() {
		var getList1type_partleft_item = this.props.getList1type_partleft;

		var getListPartIndex = this.props.index;
		var targetCampId = getList1type_partleft_item.campId;
		return React.createElement(
			"div",
			{ className: "partLeft" },
			React.createElement(
				"a",
				{ className: "partLeft-headerHref", "data-target_role_id": getList1type_partleft_item.roleId, "data-target_camp_id": targetCampId, onClick: Fc_MsgTotol.bindStudentInfo },
				React.createElement("img", { src: getList1type_partleft_item.roleImg, onError: imgError.bind(this, getList1type_partleft_item.roleSex) })
			)
		);
	}
});
module.exports = StudentMsgType1_list_part_partleft;

/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var PubSub = __webpack_require__(2);
var objImgIndex = 0;

var RightStrMsgTotol = __webpack_require__(32);
var Fc_MsgTotol = __webpack_require__(13);
var Fc_comment = __webpack_require__(9);
var Fc_bindBigImg = __webpack_require__(6);
var targetCampId = -1;
// var Fc_bindBigImg=require("./Fc_bindBigImg.jsx");//绑定图片预览

var StudentMsgType1_list_part_right = React.createClass({
	displayName: "StudentMsgType1_list_part_right",

	render: function render() {
		var xueYuanDaKaIndex = this.props.xueYuanDaKaIndex;
		var getList1type_partleft_item = this.props.getList1type_right;

		var getListPartIndex = this.props.index;
		var hasZanBtn = "";
		var hasZanImgBtn = 0;
		var arrHasZan = ["https://cdn2.picooc.com/web/res/fatburn/image/cardShare/notDianZan.png", "https://cdn2.picooc.com/web/res/fatburn/image/cardShare/dianZan.png"];
		if (getList1type_partleft_item.hasPraised) {
			hasZanBtn = "hasZan";
			hasZanImgBtn = 1;
		}

		return React.createElement(
			"div",
			{ className: "col-xs-12 col-sm-12 partRight", "data-part": parseInt(getListPartIndex) },
			React.createElement(
				"div",
				{ className: "row partRight-paddingleft" },
				React.createElement(RightStrIcon, { getList1type_partleft_item: getList1type_partleft_item, getListPartIndex: getListPartIndex }),
				React.createElement("div", { className: "col-xs-12 col-sm-12 partRight-p1", dangerouslySetInnerHTML: { __html: getList1type_partleft_item.content } }),
				React.createElement(
					"div",
					{ className: "col-xs-12 col-sm-12 partRight-img" },
					React.createElement(RightStrImg, { getList1type_partleft_item: getList1type_partleft_item, getListPartIndex: getListPartIndex })
				),
				React.createElement(
					"div",
					{ className: "col-xs-12 col-sm-12 partRight-type1" },
					React.createElement(RightStrDelete, { getList1type_partleft_item: getList1type_partleft_item, getListPartIndex: getListPartIndex }),
					React.createElement(RightStrShare, { getList1type_partleft_item: getList1type_partleft_item, getListPartIndex: getListPartIndex }),
					React.createElement(
						"span",
						{ className: "partRight-type1-zan " + hasZanBtn, "data-zan_num": getList1type_partleft_item.praiseNum, "data-xue-yuan-da-ka-index": xueYuanDaKaIndex, "data-part_index": parseInt(getListPartIndex), "data-check_id": getList1type_partleft_item.id, "data-check_role_id": getList1type_partleft_item.roleId, onClick: Fc_MsgTotol.changeZan },
						React.createElement("img", { src: arrHasZan[hasZanImgBtn] }),
						React.createElement(
							"span",
							{ className: "zanNum" },
							getList1type_partleft_item.praiseNum
						)
					),
					React.createElement(
						"span",
						{ className: "partRight-type1-msg", "data-check_id": getList1type_partleft_item.id, "data-reply_id": "0", "data-reply_role_id": getList1type_partleft_item.roleId, "data-xue-yuan-da-ka-index": xueYuanDaKaIndex, "data-part_index": parseInt(getListPartIndex), onClick: Fc_comment.clickAddMsg },
						React.createElement("img", { src: "https://cdn2.picooc.com/web/res/fatburn/image/cardShare/message.png" })
					)
				),
				React.createElement(RightStrMsgTotol, { getList1type_partleft_item: getList1type_partleft_item, getListPartIndex: getListPartIndex })
			)
		);
	}
});

var RightStrIcon = React.createClass({
	displayName: "RightStrIcon",

	render: function render() {

		var getList1type_partleft_item = this.props.getList1type_partleft_item;

		var getListPartIndex = this.props.getListPartIndex;
		var strDate = [];
		// if(type==3){
		// 	targetCampId=getList1type_partleft_item.campId;
		// }
		if (getList1type_partleft_item.isToday) {
			strDate.push(React.createElement(
				"span",
				{ key: "0" },
				getList1type_partleft_item.checkTime
			));
		} else {
			strDate.push(React.createElement(
				"span",
				{ key: "0" },
				React.createElement(
					"span",
					null,
					getList1type_partleft_item.checkDay
				),
				getList1type_partleft_item.checkTime
			));
		}
		return React.createElement(
			"div",
			{ className: "col-xs-12 col-sm-12 partRight-type2" },
			React.createElement(
				"a",
				{ className: "partRight-type2-name", "data-target_role_id": getList1type_partleft_item.roleId, "data-target_camp_id": targetCampId, onClick: Fc_MsgTotol.bindStudentInfo },
				getList1type_partleft_item.roleName
			),
			React.createElement(
				"div",
				{ className: "partRight-type2-date" },
				strDate
			),
			React.createElement(
				"span",
				{ className: "tag", style: { backgroundImage: 'url(' + publicData.cardTypeBg[getList1type_partleft_item.type] + ')' } },
				publicData.cardType[getList1type_partleft_item.type]
			)
		);
	}
});
//右部分图片展示
var RightStrImg = React.createClass({
	displayName: "RightStrImg",

	render: function render() {
		var getList1type_partleft_item = this.props.getList1type_partleft_item;

		var getListPartIndex = this.props.getListPartIndex;
		var strImg = [];
		var objImgName = 'img' + objImgIndex; //图片预览名
		objImgIndex++;
		if (getList1type_partleft_item.imgs != null) {
			publicData.objImg[objImgName] = getList1type_partleft_item.imgs; //图片预览对象

			if (getList1type_partleft_item.imgs.length == 0) {
				return React.createElement("i", null);
			} else if (getList1type_partleft_item.imgs.length == 4) {

				var strImg1 = [];
				var key = 0;
				for (var j = 0; j < 2; j++) {
					strImg1.push(React.createElement("div", { className: "col-xs-4 col-sm-4 partRight-img-li ", key: key, "data-obj_img": objImgName, "data-obj_img_index": j, style: { height: ($(window).width() - (2.5 + 3.75) * fontHeight) / 3, backgroundImage: 'url(' + getList1type_partleft_item.imgs[j].url + '@200h_200w_1e)' }, onClick: Fc_bindBigImg.bindBigImg }));
					key++;
				}
				strImg.push(React.createElement(
					"div",
					{ className: "row", key: 0 },
					strImg1
				));
				var strImg2 = [];
				for (var j = 2; j < 4; j++) {
					strImg2.push(React.createElement("div", { className: "col-xs-4 col-sm-4 partRight-img-li ", key: key, "data-obj_img": objImgName, "data-obj_img_index": j, style: { height: ($(window).width() - (2.5 + 3.75) * fontHeight) / 3, backgroundImage: 'url(' + getList1type_partleft_item.imgs[j].url + '@200h_200w_1e)' }, onClick: Fc_bindBigImg.bindBigImg }));
					key++;
				}
				strImg.push(React.createElement(
					"div",
					{ className: "row", key: 1 },
					strImg2
				));
			} else if (getList1type_partleft_item.imgs.length == 1) {
				var key = 0;
				strImg.push(React.createElement("div", { className: "col-xs-12 col-sm-12 partRight-img-li partRight-img-li2", key: key, "data-obj_img": objImgName, "data-obj_img_index": "0", style: { height: ($(window).width() - (2.5 + 3.75) * fontHeight) * 3 / 4, backgroundImage: 'url(' + getList1type_partleft_item.imgs[0].url + '@400h_400w_1e)' }, onClick: Fc_bindBigImg.bindBigImg }));
				key++;
			} else if (getList1type_partleft_item.imgs.length == 2) {
				var strImg1 = [];
				var key = 0;
				for (var j = 0; j < getList1type_partleft_item.imgs.length; j++) {
					strImg1.push(React.createElement("div", { className: "col-xs-6 col-sm-6 partRight-img-li partRight-img-li3", key: key, "data-obj_img": objImgName, "data-obj_img_index": j, style: { height: ($(window).width() - (2.5 + 3.75) * fontHeight) / 2, backgroundImage: 'url(' + getList1type_partleft_item.imgs[j].url + '@300h_300w_1e)' }, onClick: Fc_bindBigImg.bindBigImg }));
					key++;
				}
				strImg.push(React.createElement(
					"div",
					{ className: "row", key: 0 },
					strImg1
				));
			} else {
				var key = 0;
				for (var j = 0; j < getList1type_partleft_item.imgs.length; j++) {
					strImg.push(React.createElement("div", { className: "col-xs-4 col-sm-4 partRight-img-li", key: key, "data-obj_img": objImgName, "data-obj_img_index": j, style: { height: ($(window).width() - (2.5 + 3.75) * fontHeight) / 3, backgroundImage: 'url(' + getList1type_partleft_item.imgs[j].url + '@100h_100w_1e)' }, onClick: Fc_bindBigImg.bindBigImg }));
					key++;
				}
			}

			if (strImg != []) {
				//console.log(strImg.length);

				return React.createElement(
					"div",
					{ className: "row" },
					strImg
				);
			}
			return React.createElement("i", null);
		}
		return React.createElement("i", null);
	}
});
//右部分删除
var RightStrDelete = React.createClass({
	displayName: "RightStrDelete",

	deletePart: function deletePart(event) {
		event.stopPropagation();
		var deleteIndex = parseInt(event.currentTarget.getAttribute("data-part_index"));
		var deleteCheckId = event.currentTarget.getAttribute("data-check_id");

		$(".fixbg-main-t").html("您确定删除这条打卡吗？");
		$(".fixbg").css("display", "block");
		$(".fixbg-main").css("margin-top", -$(".fixbg-main").height() / 2 - 32);
		$(".fixbg-main-btn1").unbind("click").click(function () {
			$(".fixbg").css("display", "none");
		});
		/*if(getParamByUrl('checkId') != 'false'){
  	alert(removeParamByUrl('checkId'));
  }else{
  	alert(3);
  }*/
		$(".fixbg-main-btn2").unbind("click").click(function () {
			var finalUrl = ajaxLink + "/v1/api/camp/deleteCheckIn" + window.location.search + '&checkId=' + deleteCheckId;
			$.ajax({
				type: "get",
				url: finalUrl,
				dataType: "json",
				success: function success(data) {
					if (data.code == 200) {
						PubSub.publish("deletePart", deleteIndex);
						$(".fixbg").css("display", "none");

						if (publicData.isInfoHtmlPage) {
							//info.html页面才执行

							/*$(".error-main-t").html("您好,该打卡已被删除!");
        $(".errorAlert").css("display","block");
        $(".error-main").css("margin-top",-$(".fixbg-main").css("margin-top"));
        var getPageInfo = function (){
        var data = {
        backNum:0,//默认为1，
        closeWebview:1,//默认为0
        };
        return JSON.stringify(data);
        };
        appFc.deleteHistory(getPageInfo());*/

							$(".fixbg-main-t").html("您好,该打卡已被删除!");
							$(".fixbg").css("display", "block");
							$(".fixbg-main-btn1").hide();
							$(".fixbg-main-btn2").css('width', '100%').html('我知道了').unbind("click").click(function () {
								var linkUrl = removeParamByUrl('checkId');
								window.location.href = 'student.html' + linkUrl;
							});
						}
					}
				}
			});
		});
	},
	render: function render() {

		var getList1type_partleft_item = this.props.getList1type_partleft_item;

		var getListPartIndex = this.props.getListPartIndex;
		if (roleId != "false" && roleId == getList1type_partleft_item.roleId) {
			return React.createElement(
				"span",
				{ className: "partRight-type1-delete", "data-part_index": parseInt(getListPartIndex), "data-check_id": getList1type_partleft_item.id, onClick: this.deletePart },
				"\u5220\u9664"
			);
		}
		return React.createElement("i", null);
	}
});
//右部分分享
var RightStrShare = React.createClass({
	displayName: "RightStrShare",

	render: function render() {

		var getList1type_partleft_item = this.props.getList1type_partleft_item;

		var getListPartIndex = this.props.getListPartIndex;
		return React.createElement(
			"span",
			{ className: "partRight-type1-share", "data-check_id": getList1type_partleft_item.id, "data-check_role_id": getList1type_partleft_item.roleId, onClick: Fc_MsgTotol.shareLink },
			React.createElement("img", { src: "https://cdn2.picooc.com/web/res/fatburn/image/cardShare/shareNew.png" })
		);
		/*if(type==3 || type==4){
  									strShare='';
  								}*/
		return React.createElement("i", null);
	}
});

module.exports = StudentMsgType1_list_part_right;

/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Fc_changezan = {};
var zanBtn = true; //防止点赞连续点击
var PubSub = __webpack_require__(2);

Fc_changezan.changeZan = function (event) {
	event.stopPropagation();
	setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing, SXiaoXiXiangQing.SXiaoXiXiangQing_DianZan);

	//console.log(event.currentTarget.getAttribute("class").hasClass("hasZan"));
	//console.log($(event.currentTarget).hasClass("hasZan"));
	console.log(publicData.pageIndex);
	if (publicData.isCanDianZan) {
		publicData.isCanDianZan = false;

		var partIndex = parseInt(event.currentTarget.getAttribute("data-xue-yuan-da-ka-index")); //checkList中：学员自己打卡的下标（除去周表现总结）


		var partIndex2 = parseInt(event.currentTarget.getAttribute("data-part_index")); //checkList中所有列表的下标
		//alert('partIndex='+partIndex);

		if ($(event.currentTarget).hasClass("hasZan")) {
			var checkId = event.currentTarget.getAttribute("data-check_id");
			var checkRoleId = event.currentTarget.getAttribute("data-check_role_id");
			var finalUrl = ajaxLink + "/v1/api/camp/cancelPraise" + window.location.search + "&checkId=" + checkId + "&checkRoleId=" + checkRoleId;
			$.ajax({
				type: "get",
				url: finalUrl,
				dataType: "json",
				success: function success(data) {
					if (data.code == 200) {
						//删除点赞名字开始
						var deleteZanIndex;
						//$(".partRight:eq("+partIndex+") .msgZan .zanSize").css('color', 'red');
						for (var i = 0; i < $(".partRight:eq(" + partIndex + ") .msgZan .zanSize").length; i++) {
							if ($(".partRight:eq(" + partIndex + ") .msgZan .zanSize").eq(i).attr("data-target_role_id") == roleId) {
								deleteZanIndex = i;
							}
						}
						var deleteZanData = {
							pageIndex: publicData.pageIndex,
							partIndex: partIndex2,
							deleteZanIndex: deleteZanIndex

						};
						console.log(deleteZanData);
						PubSub.publish("deleteZan", deleteZanData);
						//删除点赞名字结束
						//zanBtn=true;
					} else {
						// alert(data.result.message);
						$(".error-main-t").html(data.result.message);
						$(".errorAlert").css("display", "block");
						$(".error-main").css("margin-top", -$(".error-main").height() / 2);
						publicData.isCanDianZan = true;
					}
				}
			});
		} else {
			var checkId = event.currentTarget.getAttribute("data-check_id");
			var checkRoleId = event.currentTarget.getAttribute("data-check_role_id");
			var finalUrl = ajaxLink + "/v1/api/camp/praise" + window.location.search + "&checkId=" + checkId + "&checkRoleId=" + checkRoleId;
			$.ajax({
				type: "get",
				url: finalUrl,
				dataType: "json",
				success: function success(data) {
					if (data.code == 200) {

						//添加点赞名字开始
						var addZanData = {
							pageIndex: publicData.pageIndex,
							partIndex: partIndex2,
							resp: data.resp
						};
						PubSub.publish("addZan", addZanData);
						//添加点赞名字结束
						//zanBtn=true;
					} else {
						// alert(data.result.message);
						$(".error-main-t").html(data.result.message);
						$(".errorAlert").css("display", "block");
						$(".error-main").css("margin-top", -$(".error-main").height() / 2);
						publicData.isCanDianZan = true;
					}
					//zanBtn=true;
				}
			});
		}
	}
};
module.exports = Fc_changezan;

/***/ }),

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var Fc_MsgTotol = __webpack_require__(13);
var Fc_comment = __webpack_require__(9);

var targetCampId = -1;
//点赞列表和评论列表
var RightStrMsgTotol = React.createClass({
	displayName: "RightStrMsgTotol",

	render: function render() {
		var getList1type_partleft_item = this.props.getList1type_partleft_item;

		var getListPartIndex = this.props.getListPartIndex;
		if (getList1type_partleft_item.praises.length != 0 || getList1type_partleft_item.evaluate.id != null || getList1type_partleft_item.replys.length != 0) {
			return React.createElement(
				"div",
				{ className: "col-xs-12 col-sm-12 partRight-msg" },
				React.createElement(RightStrZan, { getList1type_partleft_item: getList1type_partleft_item, getListPartIndex: getListPartIndex }),
				React.createElement(RightStrCoachComment, { getList1type_partleft_item: getList1type_partleft_item, getListPartIndex: getListPartIndex }),
				React.createElement(RightStrMsg, { getList1type_partleft_item: getList1type_partleft_item, getListPartIndex: getListPartIndex })
			);
		} else {
			return React.createElement("div", { className: "col-xs-12 col-sm-12 partRight-msg partRight-msg2" });
		}
		return React.createElement("i", null);
	}
});
//右边部分点赞列表处理
var RightStrZan = React.createClass({
	displayName: "RightStrZan",

	render: function render() {

		var getList1type_partleft_item = this.props.getList1type_partleft_item;

		var getListPartIndex = this.props.getListPartIndex;
		var strZan = [];
		if (getList1type_partleft_item.praises.length != 0) {
			var arrMsgZan = ["msgZanName1", "msgZanName2"];
			var key = 0;
			for (var j = 0; j < getList1type_partleft_item.praises.length; j++) {
				var msgZanBtn = 0;
				if (getList1type_partleft_item.praises[j].isCoach) {
					msgZanBtn = 1;
					if (j == getList1type_partleft_item.praises.length - 1) {
						strZan.push(React.createElement(
							"a",
							{ className: 'zanSize ' + arrMsgZan[msgZanBtn], key: key, "data-target_role_id": getList1type_partleft_item.praises[j].praiseRoleId, "data-target_camp_id": targetCampId },
							React.createElement(
								"span",
								null,
								getList1type_partleft_item.praises[j].praiseRoleName
							)
						));
					} else {
						strZan.push(React.createElement(
							"a",
							{ className: 'zanSize ' + arrMsgZan[msgZanBtn], key: key, "data-target_role_id": getList1type_partleft_item.praises[j].praiseRoleId, "data-target_camp_id": targetCampId },
							React.createElement(
								"span",
								null,
								getList1type_partleft_item.praises[j].praiseRoleName
							),
							React.createElement(
								"span",
								{ className: "dot" },
								"\uFF0C"
							)
						));
					}
				} else {
					if (j == getList1type_partleft_item.praises.length - 1) {
						strZan.push(React.createElement(
							"a",
							{ className: 'zanSize ' + arrMsgZan[msgZanBtn], key: key, "data-target_role_id": getList1type_partleft_item.praises[j].praiseRoleId, "data-target_camp_id": targetCampId, onClick: Fc_MsgTotol.bindStudentInfo },
							React.createElement(
								"span",
								null,
								getList1type_partleft_item.praises[j].praiseRoleName
							)
						));
					} else {
						strZan.push(React.createElement(
							"a",
							{ className: 'zanSize ' + arrMsgZan[msgZanBtn], key: key, "data-target_role_id": getList1type_partleft_item.praises[j].praiseRoleId, "data-target_camp_id": targetCampId, onClick: Fc_MsgTotol.bindStudentInfo },
							React.createElement(
								"span",
								null,
								getList1type_partleft_item.praises[j].praiseRoleName
							),
							React.createElement(
								"span",
								{ className: "dot" },
								"\uFF0C"
							)
						));
					}
				}
				key++;
			}
			var msgZanNone = "";
			if (getList1type_partleft_item.replys.length == 0) {
				msgZanNone = "msgZanNone";
			}
			return React.createElement(
				"div",
				{ className: "row msgZan " + msgZanNone },
				React.createElement("img", { src: "https://cdn2.picooc.com/web/res/fatburn/image/cardShare/notDianZan.png" }),
				strZan
			);
		}
		return React.createElement("i", null);
		/*if(strZan!="" || strMsg!=""){
  	strMsgTotol='<div class="col-xs-12 col-sm-12 partRight-msg">'+strZan+strMsg+'</div>';
  }
  else{
  	strMsgTotol='<div class="col-xs-12 col-sm-12 partRight-msg partRight-msg2"></div>';
  }*/
	}
});
//中间教练评价
var RightStrCoachComment = React.createClass({
	displayName: "RightStrCoachComment",

	render: function render() {
		var getList1type_partleft_item = this.props.getList1type_partleft_item;
		var getListPartIndex = this.props.getListPartIndex;

		var coachComment = getList1type_partleft_item.evaluate;

		/*var coachCommentNone="";
  if(getList1type_partleft_item.replys.length==0){
  	coachCommentNone="coachCommentNone";
  }*/

		//如果有教练评价
		//alert(coachComment.id);
		//alert(coachComment.id != null);
		if (coachComment.id != null) {

			//星星显示规则
			var haveStar = coachComment.starLevel;
			var starShow = [];
			if (haveStar > 0) {
				for (var i = 0; i < haveStar; i++) {
					starShow.push(React.createElement("img", { className: "star", src: "https://cdn2.picooc.com/web/res/fatburn/image/student/haveStar.png", alt: "", key: i }));
				}
				for (var j = 0; j < 5 - haveStar; j++) {
					starShow.push(React.createElement("img", { className: "star", src: "https://cdn2.picooc.com/web/res/fatburn/image/student/noStar.png", alt: "", key: j + 5 }));
				}
			}
			//标签字符串
			var labelStr = (coachComment.proteinText != null && coachComment.proteinText != '' ? coachComment.proteinText + '，' : '') + (coachComment.waterText != null && coachComment.waterText != '' ? coachComment.waterText + '，' : '') + (coachComment.fatText != null && coachComment.fatText != '' ? coachComment.fatText + '，' : '') + (coachComment.vegetablesText != null && coachComment.vegetablesText != '' ? coachComment.vegetablesText + '，' : '') + (coachComment.performanceText != null && coachComment.performanceText != '' ? coachComment.performanceText + '，' : '') + (coachComment.cookingText != null && coachComment.cookingText != '' ? coachComment.cookingText + '，' : '');
			labelStr = labelStr.substring(0, labelStr.length - 1);
			//console.log('教练评价', coachComment);

			//data-check_id={getList1type_partleft_item.id} data-reply_id={getList1type_partleft_item.replys[j].id} data-reply_role_id={getList1type_partleft_item.replys[j].roleId} data-part_index={parseInt(getListPartIndex)} data-comment_index={j} data-role_name={getList1type_partleft_item.replys[j].roleName}
			return React.createElement(
				"div",
				{ className: "coachComment", "data-check_id": coachComment.checkId, "data-apptype": "1", "data-reply_id": coachComment.id, "data-reply_role_id": coachComment.replyRoleId, "data-part_index": parseInt(getListPartIndex), "data-role_name": coachComment.replyRoleName, onClick: Fc_comment.bindMsg },
				React.createElement(
					"div",
					{ className: "aboutSay" },
					React.createElement(
						"div",
						{ className: "comments" },
						React.createElement(
							"span",
							{ className: "key" },
							coachComment.replyRoleName,
							"\u6559\u7EC3\u56DE\u590D\uFF1A"
						),
						React.createElement(
							"span",
							{ className: "haveStarWrap", style: { 'display': haveStar > 0 ? 'inline-block' : 'none' } },
							starShow
						),
						React.createElement(
							"span",
							{ className: "number", style: { 'display': haveStar > 0 ? 'inline-block' : 'none' } },
							haveStar + '.0'
						)
					),
					React.createElement(
						"div",
						{ className: "desc" },
						labelStr
					),
					React.createElement(
						"div",
						{ className: "desc" },
						coachComment.content
					)
				)
			);
		} else {
			return React.createElement("i", null);
		}
	}
});

//右边部分评论列表
var RightStrMsg = React.createClass({
	displayName: "RightStrMsg",

	render: function render() {
		var me = this;
		var getList1type_partleft_item = this.props.getList1type_partleft_item;
		//console.log('学员评价',getList1type_partleft_item);

		var getListPartIndex = this.props.getListPartIndex;
		var strMsg = [];

		//仅展现最新的两条留言回复，其他的收起为“共*条回复>”；
		//后端提供消息列表需要按照新-旧顺序排列
		if (getList1type_partleft_item.replys.length != 0) {

			var moreMsgBtn = React.createElement("i", null);

			var messageLength = getList1type_partleft_item.replys.length;

			//在student.html显示“共*条回复>”， 在info页面不显示 （info页面有checkId参数）
			if (messageLength > 2 && getParamByUrl('checkId') == 'false') {
				messageLength = 2;
				moreMsgBtn = React.createElement(
					"div",
					{ className: "moreMsg" },
					React.createElement(
						"span",
						{ className: "", onClick: me.goToMoreMsgFun, "data-check-id": getList1type_partleft_item.replys[0].checkId },
						"\u5171 ",
						React.createElement(
							"span",
							{ className: "messageNumber" },
							getList1type_partleft_item.replys.length
						),
						"\u6761\u56DE\u590D",
						React.createElement("img", { src: "https://cdn2.picooc.com/web/res/fatburn/image/student/moreMsg2.png", alt: "", className: "moreMsgImg" })
					)
				);
			}
			for (var j = 0; j < messageLength; j++) {
				var strMsgName = [];
				var arrIsCoach = ["msgInfo-name", "msgInfo-name2"];
				var arrIsCoachBtn = 0;
				var arrIsCoachBtn2 = 0;
				var headIsCoach = "no";
				if (getList1type_partleft_item.replys[j].isCoach) {
					arrIsCoachBtn = 1;
					headIsCoach = "yes";
				}
				if (getList1type_partleft_item.replys[j].isReplyCoach) {
					arrIsCoachBtn2 = 1;
				}

				if (getList1type_partleft_item.replys[j].level == 1) {
					if (arrIsCoachBtn == 1) {
						strMsgName.push(React.createElement(
							"span",
							{ className: "msgInfo-msg", key: j, "data-check_id": getList1type_partleft_item.id, "data-reply_id": getList1type_partleft_item.replys[j].id, "data-reply_role_id": getList1type_partleft_item.replys[j].roleId, "data-part_index": parseInt(getListPartIndex), "data-comment_index": j, "data-role_name": getList1type_partleft_item.replys[j].roleName, onClick: Fc_comment.bindMsg },
							React.createElement(
								"span",
								{ className: arrIsCoach[arrIsCoachBtn], "data-head_is_coach": "yes", "data-target_role_id": getList1type_partleft_item.replys[j].roleId, "data-target_camp_id": targetCampId },
								getList1type_partleft_item.replys[j].roleName,
								React.createElement(
									"span",
									{ className: "msgInfo-name-dot" },
									"\uFF1A"
								)
							),
							React.createElement("span", { style: { display: "inline" }, dangerouslySetInnerHTML: { __html: getList1type_partleft_item.replys[j].content } })
						));
					} else {
						strMsgName.push(React.createElement(
							"span",
							{ className: "msgInfo-msg", key: j, "data-check_id": getList1type_partleft_item.id, "data-reply_id": getList1type_partleft_item.replys[j].id, "data-reply_role_id": getList1type_partleft_item.replys[j].roleId, "data-part_index": parseInt(getListPartIndex), "data-comment_index": j, "data-role_name": getList1type_partleft_item.replys[j].roleName, onClick: Fc_comment.bindMsg },
							React.createElement(
								"a",
								{ className: arrIsCoach[arrIsCoachBtn], "data-target_role_id": getList1type_partleft_item.replys[j].roleId, "data-target_camp_id": targetCampId, onClick: Fc_MsgTotol.bindStudentInfo },
								getList1type_partleft_item.replys[j].roleName,
								React.createElement(
									"span",
									{ className: "msgInfo-name-dot" },
									"\uFF1A"
								)
							),
							React.createElement("span", { style: { display: "inline" }, dangerouslySetInnerHTML: { __html: getList1type_partleft_item.replys[j].content } })
						));
					}
				} else {
					if (arrIsCoachBtn2 == 1) {
						strMsgName.push(React.createElement(
							"span",
							{ className: "msgInfo-msg", key: j, "data-check_id": getList1type_partleft_item.id, "data-reply_id": getList1type_partleft_item.replys[j].id, "data-reply_role_id": getList1type_partleft_item.replys[j].roleId, "data-part_index": parseInt(getListPartIndex), "data-comment_index": j, "data-role_name": getList1type_partleft_item.replys[j].roleName, onClick: Fc_comment.bindMsg },
							React.createElement(
								"a",
								{ className: arrIsCoach[arrIsCoachBtn], "data-target_role_id": getList1type_partleft_item.replys[j].roleId, "data-target_camp_id": targetCampId },
								getList1type_partleft_item.replys[j].roleName
							),
							React.createElement(
								"span",
								{ className: "msgInfo-name-info" },
								"\u56DE\u590D"
							),
							React.createElement(
								"span",
								{ className: arrIsCoach[arrIsCoachBtn2], "data-head_is_coach": "yes", "data-target_role_id": getList1type_partleft_item.replys[j].replyRoleId, "data-target_camp_id": targetCampId },
								getList1type_partleft_item.replys[j].replyRoleName,
								React.createElement(
									"span",
									{ className: "msgInfo-name-dot" },
									"\uFF1A"
								)
							),
							React.createElement("span", { style: { display: "inline" }, dangerouslySetInnerHTML: { __html: getList1type_partleft_item.replys[j].content } })
						));
					} else {
						strMsgName.push(React.createElement(
							"span",
							{ className: "msgInfo-msg", key: j, "data-check_id": getList1type_partleft_item.id, "data-reply_id": getList1type_partleft_item.replys[j].id, "data-reply_role_id": getList1type_partleft_item.replys[j].roleId, "data-part_index": parseInt(getListPartIndex), "data-comment_index": j, "data-role_name": getList1type_partleft_item.replys[j].roleName, onClick: Fc_comment.bindMsg },
							React.createElement(
								"a",
								{ className: arrIsCoach[arrIsCoachBtn], "data-target_role_id": getList1type_partleft_item.replys[j].roleId, "data-target_camp_id": targetCampId },
								getList1type_partleft_item.replys[j].roleName
							),
							React.createElement(
								"span",
								{ className: "msgInfo-name-info" },
								"\u56DE\u590D"
							),
							React.createElement(
								"a",
								{ className: arrIsCoach[arrIsCoachBtn2], "data-target_role_id": getList1type_partleft_item.replys[j].replyRoleId, "data-target_camp_id": targetCampId },
								getList1type_partleft_item.replys[j].replyRoleName,
								React.createElement(
									"span",
									{ className: "msgInfo-name-dot" },
									"\uFF1A"
								)
							),
							React.createElement("span", { style: { display: "inline" }, dangerouslySetInnerHTML: { __html: getList1type_partleft_item.replys[j].content } })
						));
					}
				}
				strMsg.push(React.createElement(
					"div",
					{ className: "row msgInfo", key: j },
					React.createElement(
						"a",
						{ className: "msgInfo-headerHref", "data-head_is_coach": headIsCoach, "data-target_role_id": getList1type_partleft_item.replys[j].roleId, "data-target_camp_id": targetCampId, onClick: Fc_MsgTotol.bindStudentInfo },
						React.createElement("img", { className: "msgInfo-header", src: getList1type_partleft_item.replys[j].roleImg, onError: imgError.bind(this, getList1type_partleft_item.replys[j].roleSex) })
					),
					React.createElement(
						"div",
						{ className: "col-xs-12 col-sm-12 msgInfo-mian" },
						strMsgName
					)
				));
			}
			strMsgName.push(moreMsgBtn);
			return React.createElement(
				"div",
				{ className: "row" },
				strMsg
			);
		}
		return React.createElement("i", null);
	},
	//跳转到打卡详情
	goToMoreMsgFun: function goToMoreMsgFun(event) {
		event.stopPropagation();
		var checkId = event.currentTarget.getAttribute("data-check-id");
		//打开一个新的webWiew
		var url = absoluteUrl + "info.html" + window.location.search + "&checkId=" + checkId;
		var getPageInfo = function getPageInfo() {
			var data = {
				link: url,
				animation: 1 //默认1从右到左，2从下到上
			};
			return JSON.stringify(data);
		};
		var deviceType = isMobile();
		if (deviceType == "isApp" && getParamByUrl("testtype") != "tanchao") {
			appFc.openWebview(getPageInfo());
		} else {
			window.location.href = url;
		}
	}
});
module.exports = RightStrMsgTotol;

/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
var PubSub = __webpack_require__(2);

var Fc_bindChartImg = {};
var chart = {
	weightNum: [],
	fatNum: [],
	waistNum: []
};
var key = 0;

//绑定折线图相关方法
Fc_bindChartImg.getLineChart = function (chartEntity) {
	//画折线
	//$("#"+chartEntity.chartNumID).empty();
	var dateIsSame = false;
	var noData = chartEntity.originArr.length == 0 ? true : false;
	var hPercentArr = [];
	var wPercentArr = [];
	//小于7的时候是7天数据，补全后面数据
	var originArr2 = [];
	if (noData) {
		originArr2 = [50, 50, 50, 50, 50, 50, 50];
	} else {
		originArr2 = chartEntity.originArr.concat();
	}

	//补充数据
	while (originArr2.length < 7) {
		originArr2.push(chartEntity.originArr[chartEntity.originArr.length - 1]);
	}
	var canScale = window.devicePixelRatio;
	//获得数组最大值
	var maxWeight = chartEntity.originArr.length == 0 ? originArr2[0] : Math.max.apply(null, chartEntity.originArr);
	//获得数组最大值的下标
	var maxWeightIndex = chartEntity.originArr.lastIndexOf(maxWeight);
	//获得数组最小值
	var minWeight = chartEntity.originArr.length == 0 ? originArr2[0] : Math.min.apply(null, chartEntity.originArr);
	//获得数组最小值的下标
	var minWeightIndex = chartEntity.originArr.lastIndexOf(minWeight);
	//获得最大值最小值差值
	var weightDef = maxWeight - minWeight;

	var minHeight = 2 * parseFloat($("html").css("font-size"));

	//获取每天间隔
	var dateArr = [];
	var date = 0;
	var dateLength = 0;
	if (chartEntity.originArr.length > 7) {
		dateLength = chartEntity.originArr.length;
	} else {
		dateLength = 7;
	}
	for (var i = 0; i < dateLength; i++) {
		if (i == 0) {
			dateArr.push(0);
		} else {
			date += 1 / (dateLength - 1);
			dateArr.push(date);
		}
	}

	//最大值最小值一样
	if (weightDef == 0) {
		weightDef = 1;
		dateIsSame = true;
	}

	//初始坐标数据处理
	for (var i = 0; i < originArr2.length; i++) {
		hPercentArr[i] = (maxWeight - originArr2[i]) / weightDef * chartEntity.waveHeight * canScale + minHeight;
		wPercentArr[i] = dateArr[i] * ($("#" + chartEntity.chartID).width() - 15) * canScale + 15;
	}
	var diffWidth = (wPercentArr[1] - wPercentArr[0]) / canScale;

	console.info(canvas);
	//画布初始化
	var canvas = document.getElementById(chartEntity.chartID);
	var context = canvas.getContext("2d");
	canvas.width = $("#" + chartEntity.chartID).width() * canScale;
	canvas.height = $("#" + chartEntity.chartID).height() * canScale;

	//小于7个点
	if (chartEntity.originArr.length <= 7) {
		console.info("originArr2.length" + originArr2.length);
		//画线
		for (var i = 0; i < originArr2.length; i++) {
			if (dateIsSame) {
				$("#" + chartEntity.chartID).css("marginTop", "1.75rem");
			}
			context.lineTo(wPercentArr[i], hPercentArr[i]);
			if (i < chartEntity.originArr.length) {
				if (dateIsSame) {
					chart[chartEntity.chartNumID].push(React.createElement(
						"div",
						{ className: "weightNum-item", key: key, style: { position: "absolute", top: hPercentArr[i] / canScale - 15, left: wPercentArr[i] / canScale - 5 } },
						chartEntity.originArr[i]
					));
				} else {
					chart[chartEntity.chartNumID].push(React.createElement(
						"div",
						{ className: "weightNum-item", key: key, style: { position: "absolute", top: hPercentArr[i] / canScale - 25, left: wPercentArr[i] / canScale - 10 } },
						chartEntity.originArr[i]
					));
				}
			}
			key++;
		}
		if (chartEntity.originArr.length < 7) {
			context.strokeStyle = chartEntity.lineStrokeColor2;
		} else {
			context.strokeStyle = chartEntity.lineStrokeColor;
		}
		context.lineWidth = 1 * canScale;
		context.stroke();
		//描点
		for (var i = 0; i < originArr2.length; i++) {
			context.lineWidth = 1 * canScale;
			context.beginPath();
			context.arc(wPercentArr[i], hPercentArr[i], 4 * canScale, 0, 2 * Math.PI);
			context.closePath();
			context.fillStyle = chartEntity.dotFillColor1;
			context.fill();

			context.beginPath();
			context.arc(wPercentArr[i], hPercentArr[i], 2 * canScale, 0, 2 * Math.PI);
			context.closePath();

			if (i < chartEntity.originArr.length) {
				context.fillStyle = chartEntity.dotFillColor2;
			} else {
				context.fillStyle = chartEntity.dotFillColor3;
			}
			context.fill();
		}
	} else {
		for (var i = 0; i < chartEntity.originArr.length; i++) {
			context.lineTo(wPercentArr[i], hPercentArr[i]);
			var hNumPosition = 0;
			//用户数据不变
			if (dateIsSame) {
				$("#" + chartEntity.chartID).css("marginTop", "1.75rem");
				if (i == chartEntity.originArr.length - 1) {
					chart[chartEntity.chartNumID].push(React.createElement(
						"div",
						{ className: "weightNum-item", key: key, style: { position: "absolute", top: hPercentArr[i] / canScale - 15, left: wPercentArr[i] / canScale - 5 } },
						chartEntity.originArr[i]
					));
				}
			} else {
				//用户数据变化
				hNumPosition = hPercentArr[i] / canScale;
				if (i == maxWeightIndex) {
					//最高点
					if ((chartEntity.originArr.length - 1 - maxWeightIndex) * diffWidth <= 24) {
						chart[chartEntity.chartNumID].push(React.createElement(
							"div",
							{ className: "weightNum-item", key: key, style: { position: "absolute", top: hNumPosition - 25, left: wPercentArr[chartEntity.originArr.length - 1] / canScale - 10 - 24 } },
							chartEntity.originArr[i]
						));
					} else {
						chart[chartEntity.chartNumID].push(React.createElement(
							"div",
							{ className: "weightNum-item", key: key, style: { position: "absolute", top: hNumPosition - 25, left: wPercentArr[i] / canScale - 10 } },
							chartEntity.originArr[i]
						));
					}
				} else if (i == minWeightIndex) {
					//最低点
					chart[chartEntity.chartNumID].push(React.createElement(
						"div",
						{ className: "weightNum-item", key: key, style: { position: "absolute", top: hNumPosition + 8, left: wPercentArr[i] / canScale - 16 } },
						chartEntity.originArr[i]
					));
				}
				//最后一点
				if (i == chartEntity.originArr.length - 1 && minWeight != chartEntity.originArr[chartEntity.originArr.length - 1] && maxWeight != chartEntity.originArr[chartEntity.originArr.length - 1]) {
					//当前一个点比最后一个点高，这时候数据应该展示在折线下方
					if (hPercentArr[i] > hPercentArr[i - 1]) {
						chart[chartEntity.chartNumID].push(React.createElement(
							"div",
							{ className: "weightNum-item", key: key, style: { position: "absolute", top: hNumPosition + 8, left: wPercentArr[i] / canScale - 16 } },
							chartEntity.originArr[i]
						));
					} else {
						chart[chartEntity.chartNumID].push(React.createElement(
							"div",
							{ className: "weightNum-item", key: key, style: { position: "absolute", top: hNumPosition - 25, left: wPercentArr[i] / canScale - 16 } },
							chartEntity.originArr[i]
						));
					}
				}
			}
			key++;
		}
		context.strokeStyle = chartEntity.lineStrokeColor;
		context.lineWidth = 1 * canScale;
		context.stroke();

		/*PubSub.publish('chart', chart);*/
	}
	return chart;
};

module.exports = Fc_bindChartImg;

/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
//打卡列表
var StudentMsgType1_list_part = __webpack_require__(45);

var StudentMsgType1_shaixuan1 = __webpack_require__(24);
var StudentMsgType1_list_part2_weekSummary = __webpack_require__(46);

var StudentMsgType1_list = React.createClass({
	displayName: "StudentMsgType1_list",

	render: function render() {
		var getList1type = this.props.getList1type;
		var list = [];
		var shaixuan1Name = "";
		var noCardList;
		var shaixuan1ComeFrom = this.props.shaixuan1ComeFrom;
		if (typeof getList1type.resp != "undefined") {
			//console.log('getList1type:',getList1type);
			var checkList = getList1type.resp.checkList;
			var xueYuanDaKaIndex = 0;
			var weekSummaryNum = 0;
			//alert(getList1type.resp.checkList.length);
			for (var i = 0, len = getList1type.resp.checkList.length; i < len; i++) {
				//此处需要添加周表现总结
				if (checkList[i].type == 6) {
					weekSummaryNum++;
					list.push(React.createElement(StudentMsgType1_list_part2_weekSummary, { weekSummaryNum: weekSummaryNum, check_basic_list: getList1type.resp.checkBasicList, week_summary_data: getList1type.resp.checkList[i], week_summary_index: i, key: i }));
				} else {
					list.push(React.createElement(StudentMsgType1_list_part, { xueYuanDaKaIndex: xueYuanDaKaIndex, getList1type_part: getList1type.resp.checkList[i], getList1type_index: i, key: i }));
					xueYuanDaKaIndex++;
				}
			}
			if (publicData.weekSummaryNum == 0) {
				//如果周表现总结数量大于0，则保存周表现总结数量；
				publicData.weekSummaryNum = weekSummaryNum;
			}
			if (getList1type.resp.checkList.length > 0) {
				var listIndex = 0;
				for (var j = 0; j < getList1type.resp.checkList.length; j++) {
					if (getList1type.resp.checkList[j].type != 6) {
						listIndex = j;
						break;
					}
				}
				if (getList1type.resp.checkList[listIndex].isCampOver) {
					shaixuan1Name = '已结营';
				} else {
					if (getList1type.resp.checkList[listIndex].type == 6) {
						var weekIndex = getList1type.resp.checkList[listIndex].weekIndex + 1;
						shaixuan1Name = '第' + weekIndex + '周';
					} else {
						shaixuan1Name = '第' + getList1type.resp.checkList[listIndex].joinWeeks + '周';
					}
				}
			}
			if (!publicData.hasNextBtn1) {
				if (getList1type.resp.checkList.length > 0) {
					noCardList = React.createElement(
						"div",
						{ className: "row cardListMessage", style: { display: "block" } },
						React.createElement("span", { className: "cardListLine" }),
						React.createElement("br", null),
						React.createElement(
							"span",
							null,
							"\u5C31\u8FD9\u4E48\u591A\u4E86\uFF5E"
						)
					);
				} else {
					noCardList = React.createElement(
						"div",
						{ className: "row noRecord", style: { display: "block" } },
						"\u6682\u65E0\u76F8\u5173\u6253\u5361\u8BB0\u5F55\u54E6\uFF5E"
					);
				}
			}
			return React.createElement(
				"article",
				{ className: "row list", style: { marginBottom: "0" } },
				React.createElement("div", { id: "jumpToStudentHash", style: { width: 0, height: 0 } }),
				React.createElement(StudentMsgType1_shaixuan1, { shaixuan1Name: shaixuan1Name, shaixuan1ComeFrom: shaixuan1ComeFrom }),
				list,
				noCardList,
				React.createElement(
					"div",
					{ className: "col-xs-12 col-sm-12 noRecordBottom" },
					React.createElement(
						"span",
						null,
						"  "
					)
				)
			);
		} else {
			return React.createElement("i", null);
		}
	}
});
module.exports = StudentMsgType1_list;

/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var PubSub = __webpack_require__(2);

var StudentMsgType1_list_part_week = __webpack_require__(48);
//card1的筛选和星期
var StudentMsgType1_list_part_day = __webpack_require__(47);
//card1的单个打卡的日期
var StudentMsgType2_list_part_partleft = __webpack_require__(25);
//card1的单个打卡的左部分
var StudentMsgType2_list_part_right = __webpack_require__(26);
//card1的单个打卡的右部分


var StudentMsgType1_list_part = React.createClass({
	displayName: "StudentMsgType1_list_part",

	// componentDidMount:function(){
	// 	var getList2PartIndex=this.props.getList2type_index;
	// 	PubSub.subscribe("lineLength",function(evName,lineLengthDate){
	// 		//修改listState
	// 		console.log("i"+lineLengthDate);
	// 		this.setState({lineLength:lineLengthDate});
	// 	}.bind(this));
	// },
	render: function render() {
		var lineLength = "";
		var checkDayBtn = publicData.type1Week.checkDayBtn;
		var isCampOver = publicData.type1Week.isCampOver;
		var joinweek = publicData.type1Week.joinweek;
		var getList1type_part = this.props.getList1type_part;
		var getList1PartIndex = this.props.getList1type_index;
		var xueYuanDaKaIndex = this.props.xueYuanDaKaIndex;
		if (getList1type_part.isCampOver) {
			if (checkDayBtn == getList1type_part.checkDay) {
				lineLength = "lineLength3";
			} else {
				if (isCampOver) {
					lineLength = "lineLength1";
				}
			}
			isCampOver = true;
		} else {
			isCampOver = false;
			if (checkDayBtn == getList1type_part.checkDay) {
				lineLength = "lineLength3";
			} else {
				if (joinweek == getList1type_part.joinWeeks) {
					lineLength = "lineLength1";
				} else {
					joinweek = getList1type_part.joinWeeks;
				}
			}
		}
		checkDayBtn = getList1type_part.checkDay;
		var paddingStr = "1.25rem";
		//console.log(publicData.pageIndex1);
		if (getList1PartIndex == 0 && publicData.pageIndex1 == 1) {
			//paddingStr='style={{paddingTop:"0px";}}';
			//alert(3);
			paddingStr = "0px";
		}
		return React.createElement(
			"div",
			{ className: "row studentListOrder" },
			React.createElement(StudentMsgType1_list_part_week, { getList1type_partleft: getList1type_part, index: getList1PartIndex }),
			React.createElement(StudentMsgType1_list_part_day, { getList1type_partleft: getList1type_part, index: getList1PartIndex }),
			React.createElement(
				"aside",
				{ className: "row part " + lineLength },
				React.createElement(StudentMsgType2_list_part_partleft, { getList1type_partleft: getList1type_part, index: getList1PartIndex }),
				React.createElement(StudentMsgType2_list_part_right, { xueYuanDaKaIndex: xueYuanDaKaIndex, getList1type_right: getList1type_part, index: getList1PartIndex })
			)
		);
	}
});
module.exports = StudentMsgType1_list_part;

/***/ }),

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var PubSub = __webpack_require__(2);

var StudentMsgType1_list_part2_weekSummary = React.createClass({
	displayName: "StudentMsgType1_list_part2_weekSummary",


	render: function render() {
		var me = this;
		var weekSummaryNum = this.props.weekSummaryNum;
		var weekSummaryData = this.props.week_summary_data;
		//console.log('week_summary_data', weekSummaryData);
		var week_summary_index = this.props.week_summary_index;
		var isShowFatRanking = true;
		if (weekSummaryData.rankingChange == 0 || weekSummaryData.rankingChange == null) {
			isShowFatRanking = false;
		}

		//展示教练评价的标签
		var checkBasicList = this.props.check_basic_list;
		//console.log('checkBasicList', checkBasicList);
		var dietInfo = weekSummaryData.dietInfo;
		//console.log('dietInfo', dietInfo);
		var dietInfo1CheckKey = '';
		var dietInfo1CheckValue = '';
		var dietInfo1CheckMaxSum = '';

		var dietInfoList = [];
		if (dietInfo.length > 0) {
			dietInfo.map(function (item, index) {
				var descClassName = '';
				if (index == 0) {
					descClassName = 'desc left';
				} else if (index == 1) {
					descClassName = 'desc middle';
				} else if (index == 2) {
					descClassName = 'desc right';
				}

				var nowType1 = 0;
				var nowType2 = 0;
				for (var i = 0; i < checkBasicList.length; i++) {
					if (dietInfo[index].label.split('-')[0] == checkBasicList[i].id) {
						nowType1 = i;
						break;
					}
				}

				for (var j = 0; j < checkBasicList[nowType1].childTagList.length; j++) {
					if (dietInfo[index].label.split('-')[1] == checkBasicList[nowType1].childTagList[j].id) {
						nowType2 = j;
						break;
					}
				}

				//alert(nowType1);
				//alert(nowType2);


				dietInfoList.push(React.createElement(
					"div",
					{ className: "col-xs-4 col-sm-4", key: index },
					React.createElement(
						"div",
						{ className: descClassName },
						React.createElement(
							"p",
							{ className: "descName" },
							checkBasicList[nowType1].checkName
						),
						React.createElement(
							"p",
							{ className: "descState" },
							checkBasicList[nowType1].childTagList[nowType2].checkName
						),
						React.createElement(
							"p",
							{ className: "descNum" },
							dietInfo[index].maxSum
						)
					)
				));
			});
		}

		//展示时间
		var createTime = new Date(weekSummaryData.createTime);
		var month = createTime.getMonth() + 1;
		month = month < 10 ? "0" + month : month;
		var day = createTime.getDate();
		day = day < 10 ? "0" + day : day;
		var hour = createTime.getHours();
		hour = hour < 10 ? "0" + hour : hour;
		var minute = createTime.getMinutes();
		minute = minute < 10 ? "0" + minute : minute;

		var weekSummaryBox = React.createElement(
			"div",
			{ className: "weekSummaryWrap studentListOrder" },
			React.createElement(
				"div",
				{ className: "weekSummaryTitle" },
				React.createElement(
					"span",
					{ className: "date" },
					month + '月' + day + '日 ' + hour + ':' + minute
				)
			),
			React.createElement(
				"div",
				{ className: "row weekSummary" },
				React.createElement(
					"div",
					{ className: "dataBox1" },
					React.createElement(
						"div",
						{ className: "theFirst", onClick: me.rankTodayInfoFun, "data-week-index": weekSummaryData.weekIndex },
						React.createElement("span", { className: "gang" }),
						React.createElement(
							"span",
							{ className: "text" },
							'第' + weekSummaryData.weekChar + '周减脂排名'
						),
						React.createElement(
							"span",
							{ className: "one" },
							weekSummaryData.fatRanking
						),
						React.createElement("img", { className: "topSummary", style: { display: isShowFatRanking == true ? 'inline' : 'none' }, src: weekSummaryData.rankingChange > 0 ? "https://cdn2.picooc.com/web/res/fatburn/image/weekSummary/top.png" : "https://cdn2.picooc.com/web/res/fatburn/image/weekSummary/down.png" }),
						React.createElement(
							"span",
							{ className: "two", style: { display: isShowFatRanking == true ? 'inline' : 'none' } },
							Math.abs(weekSummaryData.rankingChange)
						),
						React.createElement("img", { className: "right", src: "https://cdn2.picooc.com/web/res/fatburn/image/weekSummary/right.png" })
					),
					React.createElement(
						"div",
						{ className: "dataFirst" },
						React.createElement(
							"span",
							{ className: "name cardName" },
							"\u6253\u5361\u7387"
						),
						React.createElement(
							"span",
							{ className: "valueBox" },
							React.createElement(
								"span",
								{ className: "value cardNum" },
								weekSummaryData.totalRate
							),
							"%"
						),
						React.createElement(
							"span",
							{ className: "name averageName" },
							"\u5E73\u5747\u5206"
						),
						React.createElement(
							"span",
							{ className: "valueBox" },
							React.createElement(
								"span",
								{ className: "value averageNum" },
								weekSummaryData.averageScore
							),
							"\u5206"
						)
					)
				),
				React.createElement(
					"div",
					{ className: "dataBox2" },
					React.createElement(
						"div",
						{ className: "dietPercent" },
						React.createElement("span", { className: "gang" }),
						React.createElement(
							"span",
							{ className: "name dietName" },
							"\u996E\u98DF\u6253\u5361\u7387"
						),
						React.createElement(
							"span",
							{ className: "valueBox" },
							React.createElement(
								"span",
								{ className: "value" },
								weekSummaryData.dietRate
							),
							"%"
						)
					),
					React.createElement(
						"div",
						{ className: "row dietDesc", style: { display: dietInfo.length == 3 ? "block" : "none" } },
						dietInfoList
					)
				),
				React.createElement(
					"div",
					{ className: "dataBox3" },
					React.createElement(
						"div",
						{ className: "sportPercent" },
						React.createElement("span", { className: "gang" }),
						React.createElement(
							"span",
							{ className: "name sportName" },
							"\u8FD0\u52A8\u6253\u5361\u7387"
						),
						React.createElement(
							"span",
							{ className: "valueBox" },
							React.createElement(
								"span",
								{ className: "value" },
								weekSummaryData.sportRate
							),
							"%"
						)
					),
					React.createElement(
						"div",
						{ className: "calendar" },
						React.createElement(
							"div",
							{ className: "dataBox" },
							React.createElement(
								"span",
								{ className: "data" },
								weekSummaryData.sportInfo[0].day
							),
							React.createElement(
								"span",
								{ className: "data" },
								weekSummaryData.sportInfo[1].day
							),
							React.createElement(
								"span",
								{ className: "data" },
								weekSummaryData.sportInfo[2].day
							),
							React.createElement(
								"span",
								{ className: "data" },
								weekSummaryData.sportInfo[3].day
							),
							React.createElement(
								"span",
								{ className: "data" },
								weekSummaryData.sportInfo[4].day
							),
							React.createElement(
								"span",
								{ className: "data" },
								weekSummaryData.sportInfo[5].day
							),
							React.createElement(
								"span",
								{ className: "data" },
								weekSummaryData.sportInfo[6].day
							)
						),
						React.createElement("div", { className: "hr" }),
						React.createElement(
							"div",
							{ className: "cardStateBox" },
							React.createElement("span", { className: weekSummaryData.sportInfo[0].isCheck == 1 ? "cardState active" : "cardState" }),
							React.createElement("span", { className: weekSummaryData.sportInfo[1].isCheck == 1 ? "cardState active" : "cardState" }),
							React.createElement("span", { className: weekSummaryData.sportInfo[2].isCheck == 1 ? "cardState active" : "cardState" }),
							React.createElement("span", { className: weekSummaryData.sportInfo[3].isCheck == 1 ? "cardState active" : "cardState" }),
							React.createElement("span", { className: weekSummaryData.sportInfo[4].isCheck == 1 ? "cardState active" : "cardState" }),
							React.createElement("span", { className: weekSummaryData.sportInfo[5].isCheck == 1 ? "cardState active" : "cardState" }),
							React.createElement("span", { className: weekSummaryData.sportInfo[6].isCheck == 1 ? "cardState active" : "cardState" })
						)
					)
				)
			)
		);

		return React.createElement(
			"div",
			null,
			weekSummaryBox
		);
	},

	//跳转到周减脂排名
	rankTodayInfoFun: function rankTodayInfoFun(event) {
		var weekIndex = event.currentTarget.getAttribute("data-week-index");
		window.location.href = 'rankListStu.html' + window.location.search + '&weekIndex=' + weekIndex;
	}
});
module.exports = StudentMsgType1_list_part2_weekSummary;

/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var PubSub = __webpack_require__(2);
// var checkDayBtn=0;
// var isFirstLoad=0;
// var isCampOver = false;
// var joinweek = 0;
var StudentMsgType1_list_part_partleft = React.createClass({
	displayName: "StudentMsgType1_list_part_partleft",

	getInitialState: function getInitialState() {
		// checkDayBtn=0;
		// isFirstLoad=0;
		// isCampOver = false;
		// joinweek = 0;
		return {};
	},
	render: function render() {
		// var checkDayBtn=publicData.type1left.checkDayBtn;
		// var isCampOver = publicData.type1left.isCampOver;
		// var joinweek = publicData.type1left.joinweek;
		// var isFirstLoad=publicData.type1left.isFirstLoad;
		//console.log("checkDayBtn:"+publicData.type1left.checkDayBtn);
		var getList1type_partleft_item = this.props.getList1type_partleft;
		var getListPartIndex = this.props.index;
		var strPartLeft = "";
		if (getList1type_partleft_item.isDayDisplay) {
			if (getList1type_partleft_item.isCampOver) {
				//console.log("isCampOver:"+isCampOver);
				var month = getList1type_partleft_item.checkDay.substring(0, 3); //月份
				var dayth = getList1type_partleft_item.checkDay.substring(3, 5); //日期
				if (publicData.type1left.checkDayBtn == getList1type_partleft_item.checkDay) {
					publicData.type1left.isCampOver = true;
					strPartLeft = '';
					publicData.type1left.checkDayBtn = getList1type_partleft_item.checkDay;
					return null;
				} else {
					if (publicData.type1left.isCampOver) {
						publicData.type1left.isCampOver = true;
						publicData.type1left.checkDayBtn = getList1type_partleft_item.checkDay;
						return null;
					} else {
						publicData.type1left.isCampOver = true;
						publicData.type1left.checkDayBtn = getList1type_partleft_item.checkDay;
						return null;
					}
				}
			} else {
				publicData.type1left.isCampOver = false;
				if (publicData.type1left.checkDayBtn == getList1type_partleft_item.checkDay) {
					strPartLeft = '';
					publicData.type1left.checkDayBtn = getList1type_partleft_item.checkDay;
					return null;
				} else {
					if (publicData.type1left.joinweek == getList1type_partleft_item.joinWeeks) {
						publicData.type1left.checkDayBtn = getList1type_partleft_item.checkDay;
						return React.createElement(
							"div",
							{ className: "joinDaysBox" },
							React.createElement(
								"span",
								{ className: "joinDayText" },
								"\u7B2C",
								React.createElement(
									"span",
									{ className: "joinDays" },
									getList1type_partleft_item.joinDays
								),
								"\u5929"
							)
						);
					} else {
						publicData.type1left.joinweek = getList1type_partleft_item.joinWeeks;
						publicData.type1left.checkDayBtn = getList1type_partleft_item.checkDay;
						return React.createElement(
							"div",
							{ className: "joinDaysBox" },
							React.createElement(
								"span",
								{ className: "joinDayText" },
								"\u7B2C",
								React.createElement(
									"span",
									{ className: "joinDays" },
									getList1type_partleft_item.joinDays
								),
								"\u5929"
							)
						);
					}
				}
			}
		} else {
			publicData.type1left.checkDayBtn = getList1type_partleft_item.checkDay;
			return null;
		}
	}
});
module.exports = StudentMsgType1_list_part_partleft;

/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var PubSub = __webpack_require__(2);
var StudentMsgType1_shaixuan1 = __webpack_require__(24);
// var checkDayBtn=0;
// var isFirstLoad=0;
// var isCampOver = false;
// var joinweek = 0;
var StudentMsgType1_list_part_week = React.createClass({
	displayName: "StudentMsgType1_list_part_week",

	render: function render() {
		var getList1type_partleft_item = this.props.getList1type_partleft;

		var getListPartIndex = this.props.index;

		var strPartLeft = "";
		var lineLength = "";
		var weekshow = "";
		var shaixuan1Name = "";
		console.log("index:" + getListPartIndex + "|" + getList1type_partleft_item.isDayDisplay);
		if (getList1type_partleft_item.isDayDisplay && getList1type_partleft_item.isDayDisplay != "deletePartNext") {
			if (getList1type_partleft_item.isCampOver) {
				var month = getList1type_partleft_item.checkDay.substring(0, 3); //月份
				var dayth = getList1type_partleft_item.checkDay.substring(3, 5); //日期
				//console.log("ceshi:"+publicData.type1Week.checkDayBtn+"|"+getList1type_partleft_item.checkDay);
				//console.log("ceshi2:"+publicData.type1Week.isCampOver+"|"+publicData.type1Week.isFirstLoad);
				if (publicData.type1Week.checkDayBtn == getList1type_partleft_item.checkDay) {
					publicData.type1Week.checkDayBtn = getList1type_partleft_item.checkDay;
					publicData.type1Week.joinweek = getList1type_partleft_item.joinWeeks;
					return null;
				} else {
					if (publicData.type1Week.isCampOver) {
						weekshow = "";
						publicData.type1Week.checkDayBtn = getList1type_partleft_item.checkDay;
						publicData.type1Week.joinweek = getList1type_partleft_item.joinWeeks;
						publicData.type1Week.isCampOver = true;
						return null;
					} else {
						if (publicData.type1Week.isFirstLoad == 0) {
							//$(".shaixuan1").css("display","block");
							//$(".campstatusContent").css("display","block");
							//$(".campstatusContent").html("已结营");
							publicData.type1Week.isFirstLoad++;
							publicData.type1Week.checkDayBtn = getList1type_partleft_item.checkDay;
							publicData.type1Week.joinweek = getList1type_partleft_item.joinWeeks;
							publicData.type1Week.isCampOver = true;
							//shaixuan1Name='已结营';
							return null;
							//return <StudentMsgType1_shaixuan1 shaixuan1Name={shaixuan1Name} />
						} else {
							publicData.type1Week.checkDayBtn = getList1type_partleft_item.checkDay;
							publicData.type1Week.joinweek = getList1type_partleft_item.joinWeeks;
							publicData.type1Week.isCampOver = true;
							return React.createElement(
								"div",
								{ className: "col-xs-12 col-sm-12 campstatus" },
								React.createElement(
									"div",
									{ className: "campstatusContent" },
									"\u5DF2\u7ED3\u8425"
								)
							);
						}
					}
				}
			} else {
				publicData.type1Week.isCampOver = false;
				if (publicData.type1Week.checkDayBtn == getList1type_partleft_item.checkDay) {
					publicData.type1Week.checkDayBtn = getList1type_partleft_item.checkDay;
					publicData.type1Week.joinweek = getList1type_partleft_item.joinWeeks;
					return null;
				} else {
					if (publicData.type1Week.joinweek == getList1type_partleft_item.joinWeeks) {
						publicData.type1Week.checkDayBtn = getList1type_partleft_item.checkDay;
						publicData.type1Week.joinweek = getList1type_partleft_item.joinWeeks;
						return null;
					} else {
						if (publicData.type1Week.isFirstLoad == 0) {
							publicData.type1Week.checkDayBtn = getList1type_partleft_item.checkDay;
							publicData.type1Week.joinweek = getList1type_partleft_item.joinWeeks;
							//$(".shaixuan1").css("display","block");
							//$(".campstatusContent").css("display","block");
							//$(".campstatusContent").eq(0).html('第'+getList1type_partleft_item.joinWeeks+'周');
							//publicData.aa[0]=第{getList1type_partleft_item.joinWeeks}周;
							publicData.type1Week.isFirstLoad++;
							// shaixuan1Name='第'+getList1type_partleft_item.joinWeeks+'周';
							return null;
							//return <StudentMsgType1_shaixuan1 shaixuan1Name={shaixuan1Name} />
						} else {
							publicData.type1Week.checkDayBtn = getList1type_partleft_item.checkDay;
							publicData.type1Week.joinweek = getList1type_partleft_item.joinWeeks;
							return React.createElement(
								"div",
								{ className: "row campstatus", "data-part_index": parseInt(getListPartIndex) },
								React.createElement(
									"div",
									{ className: "campstatusContent" },
									"\u7B2C",
									getList1type_partleft_item.joinWeeks,
									"\u5468"
								)
							);
						}
					}
				}
			}
		} else {
			publicData.type1Week.checkDayBtn = getList1type_partleft_item.checkDay;
			publicData.type1Week.joinweek = getList1type_partleft_item.joinWeeks;
			return null;
		}
	}
});
module.exports = StudentMsgType1_list_part_week;

/***/ }),

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
var PubSub = __webpack_require__(2);

var SWoDeGeRenZhuYe = {
	SWoDeGeRenZhuYe_ChaKanTiZhong: 5061204, //查看体重
	SWoDeGeRenZhuYe_ChaKanZhiFang: 5061205, //查看脂肪
	SWoDeGeRenZhuYe_ChaKanYaoWei: 5061206 //查看腰围
};

//折线图相关方法
var Fc_bindChartImg = __webpack_require__(43);

var train = {};
var StudentInfo_bodyChange = React.createClass({
	displayName: "StudentInfo_bodyChange",

	getInitialState: function getInitialState() {
		var me = this;
		//me.getBodyChange(publicData.targetRoleId);
		train.jumpStudentBody = this.jumpStudentBody;
		return {
			bodyChange: [],
			weightNum: [],
			fatNum: [],
			waistNum: []
		};
	},
	btnClick: function btnClick(event) {
		$(".info-tab-btn").removeClass("active");
		$(event.currentTarget).addClass("active");
		if ($(event.currentTarget).hasClass("tag-weight")) {
			setMaiDian(SWoDeGeRenZhuYe.SCategory_SWoDeGeRenZhuYe, SWoDeGeRenZhuYe.SWoDeGeRenZhuYe_ChaKanTiZhong);
			$(".weightContent").css("display", "block");
			$(".fatContent").css("display", "none");
			$(".waistContent").css("display", "none");
		} else if ($(event.currentTarget).hasClass("tag-fat")) {
			setMaiDian(SWoDeGeRenZhuYe.SCategory_SWoDeGeRenZhuYe, SWoDeGeRenZhuYe.SWoDeGeRenZhuYe_ChaKanZhiFang);
			$(".weightContent").css("display", "none");
			$(".fatContent").css("display", "block");
			$(".waistContent").css("display", "none");
		} else {
			setMaiDian(SWoDeGeRenZhuYe.SCategory_SWoDeGeRenZhuYe, SWoDeGeRenZhuYe.SWoDeGeRenZhuYe_ChaKanYaoWei);
			$(".weightContent").css("display", "none");
			$(".fatContent").css("display", "none");
			$(".waistContent").css("display", "block");
		}
	},
	getBodyChange: function getBodyChange(targetRoleId) {
		var me = this;
		/*var chartName = me.props.chartName;*/
		//alert(chartName);
		var host = window.location.protocol + "//" + window.location.host;
		var finalUrl = host + "/v1/api/camp/getBodyChange" + window.location.search + "&targetRoleId=" + targetRoleId;
		/*var finalUrl=host+"/v1/api/camp/getBodyChange?roleId="+roleId;*/
		console.info(finalUrl);
		$.ajax({
			type: "get",
			url: finalUrl,
			dataType: "json",
			success: function success(data) {
				if (data.code == 200) {
					//画图区域--开始
					if (data.resp.fat.length > 0 || data.resp.weight.length > 0 || data.resp.bodyMeasure.length > 0) {
						$(".chartContent").css("display", "block");
						$(".message").css("display", "none");
						$(".message").css("bodyMessage", "none");
						//画图区域--开始
						$(".line").css("height", $(window).width() / 750 * 120);
						$(".lineNum").css("height", $(window).width() / 750 * 158);
						$("#weight").css("width", $(".chartBottom").width() * 0.8);
						$("#fat").css("width", $(".chartBottom").width() * 0.8);
						$("#waist").css("width", $(".chartBottom").width() * 0.8);
						//体重折线图
						var weightArr = data.resp.weight;
						var weightEntity = {
							"originArr": weightArr, //初始数组		
							"chartID": "weight", //折线canvas的id名称
							"chartNumID": "weightNum", //折线点的区域的名称
							"lineFillColor": "#c1e9fb", //折线填充颜色
							"lineStrokeColor": "#1daffa", //折线颜色
							"lineStrokeColor2": "#d2effe", //折线颜色(数据时不满足7个时)
							"dotFillColor1": "#d2effe", //折线点的外圈颜色
							"dotFillColor2": "#1daffa", //折线点的内圈颜色
							"dotFillColor3": "#fff", //折线点的内圈颜色(没有数据时)
							"waveHeight": 2 * parseFloat($("html").css("font-size"))
						};
						Fc_bindChartImg.getLineChart(weightEntity);

						//体脂折线图
						var fatArr = data.resp.fat;
						var fatEntity = {
							"originArr": fatArr, //初始数组		
							"chartID": "fat", //折线canvas的id名称
							"chartNumID": "fatNum", //折线点的区域的名称
							"lineFillColor": "#c1e9fb", //折线填充颜色
							"lineStrokeColor": "#1daffa", //折线颜色
							"lineStrokeColor2": "#d2effe", //折线颜色(数据时不满足7个时)
							"dotFillColor1": "#d2effe", //折线点的外圈颜色
							"dotFillColor2": "#1daffa", //折线点的内圈颜色
							"dotFillColor3": "#fff", //折线点的内圈颜色(没有数据时)
							"waveHeight": 2 * parseFloat($("html").css("font-size"))
						};
						Fc_bindChartImg.getLineChart(fatEntity);

						//体围（胸围）折线图
						var waistArr = data.resp.bodyMeasure;
						var waistEntity = {
							"originArr": waistArr, //初始数组		
							"chartID": "waist", //折线canvas的id名称
							"chartNumID": "waistNum", //折线点的区域的名称
							"lineFillColor": "#c1e9fb", //折线填充颜色
							"lineStrokeColor": "#1daffa", //折线颜色
							"lineStrokeColor2": "#d2effe", //折线颜色(数据时不满足7个时)
							"dotFillColor1": "#d2effe", //折线点的外圈颜色
							"dotFillColor2": "#1daffa", //折线点的内圈颜色
							"dotFillColor3": "#fff", //折线点的内圈颜色(没有数据时)
							"waveHeight": 2 * parseFloat($("html").css("font-size"))
						};
						var chart = Fc_bindChartImg.getLineChart(waistEntity);
						me.setState({
							weightNum: chart.weightNum,
							fatNum: chart.fatNum,
							waistNum: chart.waistNum
						});
						/*console.info("取值");
      console.info(Fc_bindChartImg.getLineChart(waistEntity,chartName));*/
						//画图区域--结束
					} else {
						$(".chartContent").css("display", "none");
						$(".message").css("display", "block");
						$(".bodyMessage").css("display", "block");
					}
					me.setState({ bodyChange: data });
				} else {
					$(".error-main-t").html("服务器开小差了～");
					$(".errorAlert").css("display", "block");
					$(".error-main").css("margin-top", -$(".error-main").height() / 2);
					$(".bodyChange").css("display", "none");
				}
			}
		});
	},
	jumpBodyChange: function jumpBodyChange() {
		var bodyUrl = 'bodyChange.html' + location.search;
		setMaiDian(SWoDeGeRenZhuYe.SCategory_SWoDeGeRenZhuYe, SWoDeGeRenZhuYe.SWoDeGeRenZhuYe_GengDuoZhiBiaoBianHua);
		this.openNewWebview(bodyUrl);
	},
	openNewWebview: function openNewWebview(url) {
		url = absoluteUrl + url;
		console.info(url);
		var getPageInfo = function getPageInfo() {
			var data = {
				link: url,
				animation: 1 //默认1从右到左，2从下到上
			};
			return JSON.stringify(data);
		};

		var deviceType = isMobile();
		if (deviceType == "isApp" && getParamByUrl("testtype") != "tanchao") {
			appFc.openWebview(getPageInfo());
		} else {
			window.location.href = url;
		}
	},
	jumpStudentBody: function jumpStudentBody() {
		var data = this.state.bodyChange;
		var targetRoleId = getParamByUrl("targetRoleId");

		if (data.resp.pictureCount && data.resp.pictureCount == 1) {
			var deviceType = isMobile(); //判断是不是app的方法
			if (deviceType == "isApp" && getParamByUrl("testtype") != "tanchao") {
				var data1 = {
					link: absoluteUrl + "photoAlbumTrainer.html" + window.location.search + "&targetRoleId=" + targetRoleId,
					animation: 1 //默认1从右到左，2从下到上
				};
				data1 = JSON.stringify(data1);

				appFc.openWebview(data1);
			} else {
				$(".changeList-main2").attr("href", "photoAlbumTrainer.html" + window.location.search + "&targetRoleId=" + targetRoleId);
			}
			event.stopPropagation();
		} else {
			var deviceType = isMobile(); //判断是不是app的方法
			if (deviceType == "isApp" && getParamByUrl("testtype") != "tanchao") {
				var data2 = {
					link: absoluteUrl + "figureContrastTrainer.html" + window.location.search + "&targetRoleId=" + targetRoleId,
					animation: 1 //默认1从右到左，2从下到上
				};
				data2 = JSON.stringify(data2);
				appFc.openWebview(data2);
			} else {
				$(".changeList-main2").attr("href", "figureContrastTrainer.html" + window.location.search + "&targetRoleId=" + targetRoleId);
			}
			event.stopPropagation();
		}
	},
	render: function render() {
		var me = this;
		console.info("---------");
		console.info(me.state.bodyChange);
		var data = me.state.bodyChange;
		var wFlagSrc = "";
		var wChangePar = "";
		var fFlagSrc = "";
		var fChangePar = "";
		if (typeof data.resp != "undefined") {
			//体重变化--开始

			if (data.resp.wChange == "--") {
				$(".wFlag").css("display", "none");
				wChangePar = React.createElement(
					"span",
					{ className: "wChangePar" },
					React.createElement(
						"span",
						{ className: "wChange" },
						data.resp.wChange
					)
				);
			} else {

				if (data.resp.wFlag == "1") {
					wFlagSrc = "http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/rise.png";
					wChangePar = React.createElement(
						"span",
						{ className: "wChangePar", style: { color: "#fb5562" } },
						React.createElement(
							"span",
							{ className: "wChange" },
							data.resp.wChange
						),
						"KG"
					);
					/*$(".wChangePar").css("color","#fb5562");*/
				} else if (data.resp.wFlag == "2" || data.resp.wChange == "0") {
					wFlagSrc = "http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/down2.png";
					wChangePar = React.createElement(
						"span",
						{ className: "wChangePar", style: { color: "#75cc2c" } },
						React.createElement(
							"span",
							{ className: "wChange" },
							data.resp.wChange
						),
						"KG"
					);
					/*$(".wChangePar").css("color","#75cc2c");*/
				}
			}

			if (data.resp.fChange == "--") {
				$(".fFlag").css("display", "none");
				fChangePar = React.createElement(
					"span",
					{ className: "fChangePar" },
					React.createElement(
						"span",
						{ className: "fChange" },
						data.resp.fChange
					)
				);
			} else {

				if (data.resp.fFlag == "1") {
					$(".fFlag").attr("src", "http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/rise.png");
					fChangePar = React.createElement(
						"span",
						{ className: "fChangePar", style: { color: "#fb5562" } },
						React.createElement(
							"span",
							{ className: "fChange" },
							data.resp.fChange
						),
						"%"
					);
				} else if (data.resp.fFlag == "2" || data.resp.fChange == "0") {
					$(".fFlag").attr("src", "http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/down2.png");
					fChangePar = React.createElement(
						"span",
						{ className: "fChangePar", style: { color: "#75cc2c" } },
						React.createElement(
							"span",
							{ className: "fChange" },
							data.resp.fChange
						),
						"%"
					);
				}
			}
			//体重变化--结束

			//判断是否为教练，如果是教练，展示Ta的方案和Ta的身材
			var myRoleId = getParamByUrl("roleId");
			var coachRoleId = data.resp.coachRoleId;
			var targetRoleId = getParamByUrl("targetRoleId");
			var changeArea;
			var trainUrl = 'trainPlan.html' + location.search;
			//var changeList2Jump=me.jumpStudentBody;
			if (myRoleId == coachRoleId) {
				changeArea = React.createElement(
					"article",
					{ className: "row change", style: { display: "block" } },
					React.createElement(
						"div",
						{ className: "col-xs-6 col-sm-6 changeList changeList1" },
						React.createElement(
							"a",
							{ className: "row changeList-main1", href: trainUrl },
							React.createElement(
								"div",
								{ className: "col-xs-12 col-sm-12 changeList-icon" },
								React.createElement("img", { src: "http://cdn2.picooc.com/web/res/fatburn/image/student/plan.png" })
							),
							React.createElement(
								"div",
								{ className: "col-xs-12 col-sm-12 changeList-p myPlan" },
								"Ta\u7684\u65B9\u6848"
							)
						)
					),
					React.createElement(
						"div",
						{ className: "col-xs-6 col-sm-6 changeList changeList2" },
						React.createElement(
							"a",
							{ className: "row changeList-main2", onClick: train.jumpStudentBody },
							React.createElement(
								"div",
								{ className: "col-xs-12 col-sm-12 changeList-icon" },
								React.createElement("img", { src: "http://cdn2.picooc.com/web/res/fatburn/image/student/body.png" })
							),
							React.createElement(
								"div",
								{ className: "col-xs-12 col-sm-12 changeList-p myBody" },
								"Ta\u7684\u8EAB\u6750"
							)
						)
					)
				);
			} else {
				changeArea = React.createElement("i", null);
			}
		}
		return React.createElement(
			"div",
			{ className: "row page3" },
			React.createElement(
				"div",
				{ className: "row chartTop" },
				React.createElement(
					"div",
					{ className: "row top" },
					React.createElement(
						"div",
						{ className: "col-xs-6 col-sm-6 chartTag-item" },
						React.createElement(
							"div",
							null,
							"\u4F53\u91CD\u53D8\u5316"
						),
						React.createElement(
							"div",
							null,
							React.createElement("img", { className: "wFlag", src: wFlagSrc }),
							wChangePar
						)
					),
					React.createElement(
						"div",
						{ className: "col-xs-6 col-sm-6 chartTag-item" },
						React.createElement(
							"div",
							null,
							"\u8102\u80AA\u53D8\u5316"
						),
						React.createElement(
							"div",
							null,
							React.createElement("img", { className: "fFlag", src: fFlagSrc }),
							fChangePar
						)
					)
				),
				React.createElement(
					"div",
					{ className: "userBody", onClick: me.jumpBodyChange },
					React.createElement(
						"span",
						null,
						"\u66F4\u591A\u6307\u6807\u53D8\u5316"
					),
					React.createElement("img", { src: "image/studentInfo/right.png" })
				)
			),
			React.createElement(
				"div",
				{ className: "row chartContent" },
				React.createElement(
					"div",
					{ className: "row chartTag" },
					React.createElement(
						"span",
						{ className: "col-xs-4 col-sm-4 tag-weight info-tab-btn active", "data-index": "0", onClick: me.btnClick },
						"\u4F53\u91CD"
					),
					React.createElement(
						"span",
						{ className: "col-xs-4 col-sm-4 tag-fat info-tab-btn", "data-index": "1", onClick: me.btnClick },
						"\u8102\u80AA"
					),
					React.createElement(
						"span",
						{ className: "col-xs-4 col-sm-4 tag-waist info-tab-btn", "data-index": "2", onClick: me.btnClick },
						"\u8170\u56F4"
					)
				),
				React.createElement(
					"div",
					{ className: "row chartBottom weightContent" },
					React.createElement("canvas", { className: "line", id: "weight", width: "100px", height: "100px" }),
					React.createElement(
						"div",
						{ id: "weightNum", className: "lineNum" },
						this.state.weightNum
					)
				),
				React.createElement(
					"div",
					{ className: "row chartBottom fatContent" },
					React.createElement("canvas", { className: "line", id: "fat", width: "100px", height: "100px" }),
					React.createElement(
						"div",
						{ id: "fatNum", className: "lineNum" },
						this.state.fatNum
					)
				),
				React.createElement(
					"div",
					{ className: "row chartBottom waistContent" },
					React.createElement("canvas", { className: "line", id: "waist", width: "100px", height: "100px" }),
					React.createElement(
						"div",
						{ id: "waistNum", className: "lineNum" },
						this.state.waistNum
					)
				)
			),
			changeArea
		);
	}
});
module.exports = StudentInfo_bodyChange;

/***/ }),

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
var PubSub = __webpack_require__(2);
//显示大图
var Public_bigImg = __webpack_require__(10);

//删除评论
var Public_deleteComment = __webpack_require__(15);
//评论区域
var Fc_comment = __webpack_require__(9);
//打卡列表
var StudentMsgType1_list = __webpack_require__(44);
//公共评论
var Public_comment = __webpack_require__(18);

var SWoDeGeRenZhuYe = {
	SWoDeGeRenZhuYe_ChaKanTiZhong: 5061204, //查看体重
	SWoDeGeRenZhuYe_ChaKanZhiFang: 5061205, //查看脂肪
	SWoDeGeRenZhuYe_ChaKanYaoWei: 5061206 //查看腰围
};

var StudentInfo_cardList = React.createClass({
	displayName: "StudentInfo_cardList",

	getInitialState: function getInitialState() {
		var me = this;
		me.getList1Fc();
		return {
			bigImgArr: [],
			listState: publicData.pageIndex,
			getList1: {},
			bigImgName: ""
		};
	},
	getList1Fc: function getList1Fc() {
		//card1
		if (publicData.checkTypeNum1 != publicData.checkType1) {
			publicData.checkTypeBtn = true;
		} else {
			publicData.checkTypeBtn = false;
		}
		publicData.checkTypeNum1 = publicData.checkType1;
		var me = this;
		if ((publicData.hasNextBtn1 || publicData.checkTypeBtn) && publicData.ajaxBtn1) {
			publicData.ajaxBtn1 = false;
			var ajaxStr2;
			//alert(publicData.time1);
			if (publicData.pageIndex1 == 0) {
				ajaxStr2 = "&count=" + publicData.count;
			} else {
				ajaxStr2 = "&count=" + publicData.count + "&time=" + publicData.time1;
			}
			var finalUrl = ajaxLink + "/v1/api/camp/checkList" + window.location.search + "&type=1&targetRoleId=" + roleId + "&checkType=" + publicData.checkType1 + ajaxStr2;
			$.ajax({
				type: "get",
				url: finalUrl,
				dataType: "json",
				success: function success(data) {
					publicData.ajaxBtn1 = true;
					if (data.code == 200) {
						publicData.isCampStatus = data.resp.isCamp;
						setCookie("campId", data.resp.campId, 1);
						if (publicData.pageIndex1 > 0) {
							data.resp.checkList = me.state.getList1.resp.checkList.concat(data.resp.checkList);
						}
						publicData.hasNextBtn1 = data.resp.hasNext;
						if (data.resp.hasNext) {
							publicData.time1 = data.resp.time;
						}
						publicData.pageIndex1++;
						me.setState({ getList1: data });
						//console.log(me.state.getList1);
						$(".msgType1 .list").css("min-height", 0);
						$(".msgType1 .part").eq(0).css("padding-top", 0);
						$(".msgType1 .partLeft").eq(0).css("top", 0);
						$(".msgType1 .partRight-img-li").css("height", ($(window).width() - (2.5 + 3.75) * fontHeight) / 3);
						$(".msgType1 .partRight-img-li2").css("height", ($(window).width() - (2.5 + 3.75) * fontHeight) * 3 / 4);
						$(".msgType1 .partRight-img-li3").css("height", ($(window).width() - (2.5 + 3.75) * fontHeight) / 2);
						publicData.pageBtn = true;
						for (var i = 0; i < $(".partLeft-p5 span").length; i++) {
							$(".partLeft-p5").eq(i).css("padding-left", $(".partLeft-p4 span").eq(i).width() / 4);
						}
					} else {
						publicData.pageBtn = true;
						$(".error-main-t").html(data.result.message);
						$(".errorAlert").css("display", "block");
						$(".error-main").css("margin-top", -$(".error-main").height() / 2);
					}
				}
			});
		}
	},
	componentDidUpdate: function componentDidUpdate() {
		if (this.props.reload) {
			PubSub.publish("reload", false);
			this.getList1Fc();
		}
	},
	componentDidMount: function componentDidMount() {
		var me = this;

		PubSub.subscribe("shaixuan", function (evName, shaixuan) {
			//修改listState
			//this.setState({listState:listState});

			publicData.time1 = 0;
			publicData.pageIndex1 = 0;
			publicData.hasNextBtn1 = true;
			this.getList1Fc();
		}.bind(this));
		PubSub.subscribe("bigImgData", function (evName, bigImgData) {
			//添加大图预览
			this.setState({ bigImgArr: bigImgData });
		}.bind(this));
		PubSub.subscribe("addZan", function (evName, addZanData) {
			//添加点赞
			// 	pageIndex:publicData.pageIndex,//判断是个人主页还是营内动态
			// 	partIndex:partIndex,//判断是第几部分
			// 	resp://点赞的数据
			var getList1Data = this.state.getList1;
			getList1Data.resp.checkList[addZanData.partIndex].praises.push(addZanData.resp);
			getList1Data.resp.checkList[addZanData.partIndex].hasPraised = true;
			getList1Data.resp.checkList[addZanData.partIndex].praiseNum = parseInt(getList1Data.resp.checkList[addZanData.partIndex].praiseNum) + 1;
			this.setState({ getList1: getList1Data });
			publicData.isCanDianZan = true;
		}.bind(this));
		PubSub.subscribe("deleteZan", function (evName, deleteZanData) {
			//删除点赞
			//      	var deleteZanData={
			// 	pageIndex:publicData.pageIndex,//判断是个人主页还是营内动态
			// 	partIndex:partIndex,//判断是第几部分
			// 	deleteZanIndex:deleteZanIndex//判断是第几个

			// }
			var getList1Data = this.state.getList1;
			getList1Data.resp.checkList[deleteZanData.partIndex].praises.splice(deleteZanData.deleteZanIndex, 1);
			getList1Data.resp.checkList[deleteZanData.partIndex].hasPraised = false;
			getList1Data.resp.checkList[deleteZanData.partIndex].praiseNum = parseInt(getList1Data.resp.checkList[deleteZanData.partIndex].praiseNum) - 1;
			this.setState({ getList1: getList1Data });
			publicData.isCanDianZan = true;
		}.bind(this));
		PubSub.subscribe("addMsg", function (evName, addMsgData) {
			//添加评论
			//pageIndex//判断是个人主页还是营内动态
			//partIndex//判断是第几部分
			//resp//评论的参数
			var getList1Data = this.state.getList1;
			getList1Data.resp.checkList[addMsgData.partIndex].replys.unshift(addMsgData.resp);

			this.setState({ getList1: getList1Data });
		}.bind(this));
		PubSub.subscribe("deleteComment", function (evName, deleteCommentData) {
			//删除评论
			//pageIndex//判断是个人主页还是营内动态
			//partIndex//判断是第几部分
			//deleteCommentIndex//判断是第几个
			var getList1Data = this.state.getList1;
			getList1Data.resp.checkList[deleteCommentData.partIndex].replys.splice(deleteCommentData.deleteCommentIndex, 1);
			this.setState({ getList1: getList1Data });
		}.bind(this));
		PubSub.subscribe("deletePart", function (evName, deleteIndex) {
			//删除模块
			//pageIndex//判断是个人主页还是营内动态
			//deleteIndex//判断是第几部分

			var getList1Data = this.state.getList1;
			//console.log(getList1Data.resp);
			if (getList1Data.resp.checkList[deleteIndex].isDayDisplay && getList1Data.resp.checkList.length > deleteIndex + 1) {
				getList1Data.resp.checkList[deleteIndex + 1].isDayDisplay = true;
			}
			getList1Data.resp.checkList.splice(deleteIndex, 1);
			this.setState({ getList1: getList1Data });
		}.bind(this));

		//线上bug处理：
		//数据大于20条重新请求接口
		$(window).scroll(function () {
			if ($(".msgType1").height() - $(window).height() - $(window).scrollTop() < 550) {
				//alert(publicData.pageBtn);
				//alert(publicData.tabBtn);
				//alert(publicData.commentBtn);
				if (publicData.pageBtn && publicData.tabBtn && !publicData.commentBtn) {
					if (publicData.functionType == 1) {
						me.getList1Fc("hasDelete");
					} else if (publicData.functionType == 2) {
						me.getList1Fc("noDelete");
					}
					publicData.pageBtn = false;
				}
			}
		});
	},
	render: function render() {
		publicData.type1Week = { //第几周修改，用于筛选时重置
			checkDayBtn: 0,
			isFirstLoad: 0,
			isCampOver: false,
			joinweek: 0
		};
		publicData.type1left = { //左部分显示，用于筛选时重置
			checkDayBtn: 0,
			isCampOver: false,
			joinweek: 0
		};
		var me = this;
		var objStudentMsgType1, objPublic_bigImg;
		console.info(this.state.getList1.resp);
		//判断type1是否显示
		if (typeof this.state.getList1.resp != "undefined" && publicData.pageIndex == 1) {
			objStudentMsgType1 = React.createElement(StudentMsgType1_list, { getList1type: me.state.getList1, shaixuan1ComeFrom: "studentInfo" });
		} else {
			objStudentMsgType1 = React.createElement("i", null);
		}
		objPublic_bigImg = React.createElement(Public_bigImg, { getList1: this.state.getList1, bigImgArr: this.state.bigImgArr });
		//me.setState({reload:me.props.reload});
		return React.createElement(
			"div",
			{ className: "row page1" },
			React.createElement(
				"div",
				{ className: "row msgType1", onClick: Fc_comment.hiddenComment2 },
				objStudentMsgType1
			),
			objPublic_bigImg,
			React.createElement(Public_comment, null)
		);
	}
});
module.exports = StudentInfo_cardList;

/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
var PubSub = __webpack_require__(2);

var canvasObj = {
	startX: 7,
	startY: 3.5,
	radius: 3.5,
	innerRadius: 3.2,
	startAngle: 135,
	endAngle: 45
};

var StudentInfo_trainInfo = React.createClass({
	displayName: "StudentInfo_trainInfo",

	getInitialState: function getInitialState() {
		this.trainHistory();
		return {
			trainArr: []
		};
	},
	trainHistory: function trainHistory() {
		var me = this;
		var host = window.location.protocol + "//" + window.location.host;
		var finalUrl = host + "/v1/api/campScheme/getSportData" + window.location.search;
		console.info(finalUrl);
		$.ajax({
			type: "get",
			url: finalUrl,
			dataType: "json",
			success: function success(data) {
				if (data.code == 200) {
					me.setState({ trainArr: data });
				} else {
					$(".error-main-t").html("服务器开小差了～");
					$(".errorAlert").css("display", "block");
					$(".error-main").css("margin-top", -$(".error-main").height() / 2);
				}
			}
		});
	},
	componentDidUpdate: function componentDidUpdate() {
		var me = this;
		$(".canvas_bg").each(function (index) {
			var canvasIndex = $(this).attr("id");

			var percent = $(this).attr("data-percent");
			console.info("percent:" + percent);
			me.drawRate(canvasObj.startX, canvasObj.startY, canvasObj.radius, canvasObj.innerRadius, canvasObj.startAngle, canvasObj.endAngle, canvasIndex, percent);
			//console.info($(this).attr("id"));
		});
	},
	drawRate: function drawRate(x, y, radius, innerRadius, startAngle, endAngle, canvasId, process) {
		fontHeight = 16;
		x = x * fontHeight;
		y = y * fontHeight;
		radius = radius * fontHeight;
		innerRadius = innerRadius * fontHeight;
		var canvas = document.getElementById(canvasId);
		var context = canvas.getContext('2d');

		var deg = Math.PI / 180;
		var percent = process / 100;
		var endDeg = 0;
		if (percent < 5 / 6) {
			endDeg = 135 * deg + 270 * percent * deg;
		} else {
			console.info(12);
			endDeg = 135 * deg + 270 * percent * deg - 360 * deg;
		}

		//进度条已经进行的部分
		context.beginPath();
		context.arc(x, y, radius, startAngle * deg, endDeg);
		context.fillStyle = "#00c3b5";
		context.lineTo(x, y);
		context.fill();
		context.closePath();

		console.info(endDeg);
		//进度条底部
		context.beginPath();
		context.arc(x, y, radius, endDeg, endAngle * deg);
		context.fillStyle = "#bff0ec";
		context.lineTo(x, y);
		context.fill();
		context.closePath();

		//进度条内环
		context.beginPath();
		context.arc(x, y, innerRadius, 0, 360 * deg);
		context.fillStyle = "#FFF";
		context.lineTo(x, y);
		context.fill();
		context.closePath();
	},
	getTrainDetial: function getTrainDetial(id) {
		var roleId = getParamByUrl("roleId");
		var campId = getParamByUrl("campId");
		if (publicData.reloadPage1 != undefined) {
			publicData.reloadPage1 = true;
		}
		var getPageInfo = function getPageInfo() {
			var data = {
				roleId: roleId,
				campId: campId,
				id: id
			};
			return JSON.stringify(data);
		};
		if (deviceType == "isApp") {
			if (getParamByUrl("os") == "android") {
				// alert("触发了getTrainDetial方法");
				mobileApp.getTrainDetial(getPageInfo());
			} else {
				window.webkit.messageHandlers.getTrainDetial.postMessage(getPageInfo());
			}
		}
		document.documentElement.style.webkitTouchCallout = 'none';
	},
	render: function render() {
		var weekNum = 4;
		var dayNum = 7;
		var groupNum = 2;
		var canvasIndex = 0;
		var trainHistoryList = [];
		var data = this.state.trainArr;
		var minute = "";
		var second = "";
		if (data != "undefined" && data != "") {
			minute = parseInt(data.resp.times / 60);
			second = data.resp.times % 60;
			//未结营
			if (!data.resp.end) {
				weekNum = data.resp.weekSportDataDTOs.length;
				for (var i = 0; i < weekNum; i++) {
					var groupHistoryList = [];
					dayNum = data.resp.weekSportDataDTOs[i].daySportDataDTOs.length;
					for (var j = 0; j < dayNum; j++) {
						groupNum = data.resp.weekSportDataDTOs[i].daySportDataDTOs[j].sectionSportDataDTOs.length;
						var dayText = "第" + data.resp.weekSportDataDTOs[i].daySportDataDTOs[j].dayNum + "天";
						for (var k = 0; k < groupNum; k++) {
							if (k != 0) {
								dayText = "";
							}
							var dayTrainTime = parseInt(data.resp.weekSportDataDTOs[i].daySportDataDTOs[j].sectionSportDataDTOs[k].times / 60) + "分" + parseInt(data.resp.weekSportDataDTOs[i].daySportDataDTOs[j].sectionSportDataDTOs[k].times % 60) + "秒";
							if (data.resp.weekSportDataDTOs[i].daySportDataDTOs[j].sectionSportDataDTOs[k].percent == 100) {
								var parcentTextStyle = {
									'left': '1.6rem'
								};
							} else {
								var parcentTextStyle = {
									'left': '2.15rem'
								};
							}

							groupHistoryList.push(React.createElement(
								"div",
								{ className: "train_day_item row", key: canvasIndex, onClick: this.getTrainDetial.bind(this, data.resp.weekSportDataDTOs[i].daySportDataDTOs[j].sectionSportDataDTOs[k].id) },
								React.createElement(
									"div",
									{ className: "train_day_date col-xs-2 col-sm-2" },
									dayText
								),
								React.createElement(
									"div",
									{ className: "train_day_timeInfo col-xs-4 col-sm-4" },
									React.createElement("img", { src: "http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/trainTime.png" }),
									React.createElement(
										"span",
										null,
										dayTrainTime
									)
								),
								React.createElement(
									"div",
									{ className: "train_day_groupInfo col-xs-3 col-sm-3" },
									React.createElement("img", { src: "http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/fire.png" }),
									React.createElement(
										"span",
										null,
										data.resp.weekSportDataDTOs[i].daySportDataDTOs[j].sectionSportDataDTOs[k].groups + "组"
									)
								),
								React.createElement(
									"div",
									{ className: "train_day_rateInfo col-xs-3 col-sm-3" },
									React.createElement("canvas", { id: "canvas" + canvasIndex, className: "canvas_bg", "data-percent": data.resp.weekSportDataDTOs[i].daySportDataDTOs[j].sectionSportDataDTOs[k].percent }),
									React.createElement(
										"span",
										{ className: "parcentText", style: parcentTextStyle },
										React.createElement(
											"span",
											null,
											data.resp.weekSportDataDTOs[i].daySportDataDTOs[j].sectionSportDataDTOs[k].percent
										),
										"%"
									),
									React.createElement("img", { src: "http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/processText.png" })
								)
							));
							canvasIndex++;
						}
					}
					data.resp.weekSportDataDTOs[i].startDate = data.resp.weekSportDataDTOs[i].startDate.substring(5, 7) + "月" + data.resp.weekSportDataDTOs[i].startDate.substring(8, 10) + "日";
					data.resp.weekSportDataDTOs[i].endDate = data.resp.weekSportDataDTOs[i].endDate.substring(5, 7) + "月" + data.resp.weekSportDataDTOs[i].endDate.substring(8, 10) + "日";
					trainHistoryList.push(React.createElement(
						"div",
						{ className: "train_week_list", key: "day" + i },
						React.createElement(
							"div",
							{ className: "train_week_title" },
							"第" + data.resp.weekSportDataDTOs[i].weekNum + "周 " + data.resp.weekSportDataDTOs[i].startDate + "-" + data.resp.weekSportDataDTOs[i].endDate
						),
						React.createElement(
							"div",
							{ className: "train_day_list row" },
							groupHistoryList
						)
					));
				}
			}
			//已结营
			else {
					var groupHistoryList = [];
					dayNum = data.resp.endSportDataDTOs.length;
					for (var i = 0; i < dayNum; i++) {
						groupNum = data.resp.endSportDataDTOs[i].sectionSportDataDTOs.length;
						var dayText = data.resp.endSportDataDTOs[i].dateNum;
						for (var j = 0; j < groupNum; j++) {
							if (j != 0) {
								dayText = "";
							}
							var dayTrainTime = parseInt(data.resp.endSportDataDTOs[i].sectionSportDataDTOs[j].times / 60) + "分" + parseInt(data.resp.endSportDataDTOs[i].sectionSportDataDTOs[j].times % 60) + "秒";
							groupHistoryList.push(React.createElement(
								"div",
								{ className: "train_day_item row", key: canvasIndex },
								React.createElement(
									"div",
									{ className: "train_day_date col-xs-2 col-sm-2" },
									dayText
								),
								React.createElement(
									"div",
									{ className: "train_day_timeInfo col-xs-4 col-sm-4" },
									React.createElement("img", { src: "http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/trainTime.png" }),
									React.createElement(
										"span",
										null,
										dayTrainTime
									)
								),
								React.createElement(
									"div",
									{ className: "train_day_groupInfo col-xs-3 col-sm-3" },
									React.createElement("img", { src: "http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/fire.png" }),
									React.createElement(
										"span",
										null,
										data.resp.endSportDataDTOs[i].sectionSportDataDTOs[j].groups + "组"
									)
								),
								React.createElement(
									"div",
									{ className: "train_day_rateInfo col-xs-3 col-sm-3" },
									React.createElement("canvas", { id: "canvas" + canvasIndex, className: "canvas_bg", "data-percent": data.resp.endSportDataDTOs[i].sectionSportDataDTOs[j].percent }),
									React.createElement(
										"span",
										{ className: "parcentText" },
										React.createElement(
											"span",
											null,
											data.resp.endSportDataDTOs[i].sectionSportDataDTOs[j].percent
										),
										"%"
									),
									React.createElement("img", { src: "http://cdn2.picooc.com/web/res/fatburn/image/studentInfo/processText.png" })
								)
							));
							canvasIndex++;
						}
					}
					trainHistoryList = "";
					trainHistoryList = React.createElement(
						"div",
						null,
						React.createElement(
							"div",
							{ className: "train_week_title" },
							"\u5DF2\u7ED3\u8425"
						),
						React.createElement(
							"div",
							{ className: "train_day_list row" },
							groupHistoryList
						)
					);
				}
		} else {}

		return React.createElement(
			"div",
			{ className: "row page2" },
			React.createElement(
				"div",
				{ className: "trainTime" },
				React.createElement(
					"div",
					{ className: "train_title" },
					"\u60A8\u7D2F\u8BA1\u8FD0\u52A8\u65F6\u957F"
				),
				React.createElement(
					"div",
					{ className: "trainTime_info" },
					React.createElement(
						"span",
						{ className: "minute" },
						minute
					),
					"\u5206",
					React.createElement(
						"span",
						{ className: "second" },
						second
					),
					"\u79D2"
				)
			),
			React.createElement(
				"div",
				{ className: "trainList" },
				trainHistoryList
			)
		);
	}
});

module.exports = StudentInfo_trainInfo;

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PubSub = __webpack_require__(2);
var Fc_bindBigImg = {};
var windowW = $(window).width();
var windowH = $(window).height();
var mySwiper;
var t1;
var saveLink;
var closeImgBtn = true; //防止连续点击

//保存图片
var timeout;

var timeBtn;
var startX;
var startY;
var moveEndX;
var moveEndY;
//绑定图片预览方法
// 将参数存到publicData.objImg下面，设置window.publicData=publicData;
// 参数格式类似于
// objImg={
// 		img0:[url0,url1,url2,url3,url4],
// 		img1:[url0,url1,url2,url3,url4],
// 		img2:[url0,url1,url2,url3,url4],
// 		img3:[url0,url1,url2,url3,url4]
// }
// 在小图上绑定data-obj_img=img0属性，小图点击绑定bindBigImg事件

window.commentDisplayBtn = false;
Fc_bindBigImg.bindBigImg = function (event) {
	//publicData.objImg为图片预览对象
	if ($(".comment2").css("display") == "block" || commentDisplayBtn) {
		$("#comment-msg").blur();
		commentDisplayBtn = false;
	} else {
		timeBtn = true;
		//setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing,SXiaoXiXiangQing.SXiaoXiXiangQing_YuLanTuPian);
		var bigImgNameData = event.currentTarget.getAttribute("data-obj_img");
		var swiperIndex = event.currentTarget.getAttribute("data-obj_img_index");
		var bigImgData = publicData.objImg[bigImgNameData];

		PubSub.publish("bigImgData", bigImgData);
		if ($(".page1").css("display") == "block") {
			$(".setcard-img").css("display", "none");
		}
		$(".comment").css("display", "none");
		$("#comment-msg").blur();

		$(".getImg-bg").css("height", $(".getImg-bg").width());
		//设置宽高
		$(".bigImg-li").css("width", windowW);
		if (getParamByUrl("os") == "android") {
			$(".bigImg-li").css("height", windowH + 70);
		} else {
			$(".bigImg-li").css("height", windowH + 64);
		}

		//隐藏title
		var data = {
			display: false
		};
		data = JSON.stringify(data);
		appFc.showTitle(data);

		//控制安卓返回键
		var getPageInfo = function getPageInfo() {
			var data = {
				controlBtn: true,
				function: "closeBigImg"
			};
			return JSON.stringify(data);
		};
		appFc.showBackBtn(getPageInfo());
		t1 = setTimeout(function () {
			$("body").css("max-height", $(window).height());
			$("body").css("overflow", "hidden");

			$(".swiper-container").css("width", $(window).width());
			$(".swiper-wrapper").css("width", $(window).width());
			$(".bigImg-li").css("width", $(window).width());
			$(".bigImg").css("display", "block");
			document.addEventListener('touchmove', function (event) {
				//判断条件,条件成立才阻止背景页面滚动,其他情况不会再影响到页面滚动
				if ($("body").css("overflow") == "hidden") {
					event.preventDefault();
				}
			});
			if (publicData.objImg[bigImgNameData].length == 1) {
				mySwiper = new Swiper('.swiper-container-bigImg', {});
				console.log(mySwiper);
			} else {
				mySwiper = new Swiper('.swiper-container-bigImg', {
					pagination: '.swiper-pagination-bigImg',
					spaceBetween: 1,
					centeredSlides: true,
					initialSlide: swiperIndex
				});
				console.log(mySwiper);
			}
		}, 200);
	}
};
Fc_bindBigImg.imgTouchStart = function (event) {
	console.log(event);

	clearTimeout(timeout);
	timeout = "";
	startX = event.changedTouches[0].pageX, startY = event.changedTouches[0].pageY;
	//startX = event.originalEvent.changedTouches[0].pageX,
	//startY = event.originalEvent.changedTouches[0].pageY;
	var x = event.currentTarget.getAttribute("data-index");
	console.log(event.currentTarget.getAttribute("data-index"));
	saveLink = $(event.currentTarget).css("background-image").split("\(")[1].split("\)")[0];
	console.log(saveLink);

	console.log($(".bigImg").css("display"));
	console.log("setTimeout1");
	timeout = setTimeout(function () {
		if ($(".bigImg").css("display") == "block") {
			console.log("setTimeout2");
			$(".saveImg-ceng").css("height", $(window).height());
			$(".saveImg-ceng").css("display", "block");
			timeBtn = false;
		}
		clearTimeout(timeout);
	}, 800);
	event.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动 
};
Fc_bindBigImg.imgTouchMove = function (event) {

	if ($(".saveImg-ceng").css("display") == "block") {
		//$(".saveImg-ceng").css("display","none");
		clearTimeout(timeout);
		timeBtn = false;
	} else {
		moveEndX = event.changedTouches[0].pageX;
		moveEndY = event.changedTouches[0].pageY;
		var moveX;
		var moveY;
		moveX = moveEndX - startX;
		moveY = moveEndY - startY;
		console.log(moveX + "|" + moveY);
		if (moveX < -50 || moveX > 50 || moveY < -50 || moveY > 50) {
			clearTimeout(timeout);
			timeBtn = false;
		}
	}
	event.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动  
};
Fc_bindBigImg.imgTouchEnd = function (event) {
	//clearTimeout(timeout);
	moveEndX = event.changedTouches[0].pageX;
	moveEndY = event.changedTouches[0].pageY;
	var moveX;
	var moveY;
	moveX = moveEndX - startX;
	moveY = moveEndY - startY;

	if (moveX < -20 || moveX > 20 || moveY < -20 || moveY > 20) {
		console.log("clearTimeout执行");
		clearTimeout(timeout);
		timeBtn = false;
	}
	clearTimeout(timeout);
	console.log("timeBtn:" + timeBtn);
	console.log(timeout);
	if (timeBtn) {
		closeBigImg();
	}
	timeBtn = true;
	event.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动  
};
Fc_bindBigImg.saveImgBtnTouchStart = function () {
	event.stopPropagation();
	event.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动  
	var deviceType = isMobile(); //判断是不是app的方法
	/*alert(saveLink);
 saveLink=JSON.stringify(saveLink);
 console.log(typeof saveLink);
 console.log(saveLink);*/
	var getPageInfo = function getPageInfo() {
		var data = {
			url: saveLink
		};
		return JSON.stringify(data);
	};
	appFc.saveImg(getPageInfo());
	$(".saveImg-ceng").css("display", "none");
	//$(".saveImg-btn").unbind("touchstart");
};
Fc_bindBigImg.cancelImgBtnTouchStart = function () {
	event.stopPropagation();
	event.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动 
	$(".saveImg-ceng").css("display", "none");
};
Fc_bindBigImg.saveImgCengTouchStart = function () {
	$(".saveImg-ceng").css("display", "none");
	event.stopPropagation();
	event.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动  
};
//关闭图片预览
function closeBigImg() {
	if (closeImgBtn) {
		closeImgBtn = false;

		var data = {
			display: true
		};
		data = JSON.stringify(data);
		appFc.showTitle(data);
		//关闭返回键控制

		var getPageInfo = function getPageInfo() {
			var data = {
				controlBtn: false,
				function: ""
			};
			return JSON.stringify(data);
		};
		appFc.showBackBtn(getPageInfo());

		var t2 = setTimeout(function () {
			$("body").css("overflow", "auto");
			//$("body").css("max-height","auto");
			$("body").removeAttr("style");
			$(".bigImg").css("display", "none");
			if ($(".page1").css("display") == "block") {
				$(".setcard-img").css("display", "block");
			}
			$(".saveImg-ceng").css("display", "none");
			document.addEventListener('touchmove', function (event) {
				//判断条件,条件成立才阻止背景页面滚动,其他情况不会再影响到页面滚动
				if ($("body").css("overflow") == "hidden") {
					event.preventDefault();
				}
			});
			clearTimeout(t1);
			clearTimeout(t2);
			console.log(mySwiper);

			//mySwiper.slideTo(0,1000,false);
			//$(".swiper-pagination").html('');
			// if(mySwiper && mySwiper.params && mySwiper.params.slideTo){
			// 	mySwiper.slideTo(0,1000,false);
			// }
			// if(mySwiper && mySwiper.detachEvents){
			// 	mySwiper.destroy(true);
			// }
			// var bigImgData=[];
			// PubSub.publish("bigImgData",bigImgData);
			try {
				mySwiper.slideTo(0, 1000, false);
				mySwiper.destroy(true);
				console.log("mySwiper摧毁");
			} catch (err) {
				var bigImgData = [];
				PubSub.publish("bigImgData", bigImgData);
				console.log("mySwiper错误");
			}
			closeImgBtn = true;
		}, 200);
	}
	//mySwiper.update();
	//$(".bigImg-main").css("transform","translate3d(0px, 0px, 0px)");
	event.stopPropagation();
}

module.exports = Fc_bindBigImg;

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PubSub = __webpack_require__(2);
var Fc_comment = {};
Fc_comment.dataAddMsg = {};
Fc_comment.dataAddMsg.placeText = ""; //保留新版输入框取消的内容
Fc_comment.dataAddMsg.placeTextCommentId = ""; //保留新版输入框取消时的评论id

Fc_comment.level = 0; //评论等级
Fc_comment.partIndex = 0; //点击了哪个部分
Fc_comment.commentHeight = 3.1875 * parseInt($("html").css("font-size")); //评论高度
Fc_comment.scrollTime1; //inputSelect的延迟时间
Fc_comment.arrStrLen = []; //输入框输入换行的字数
Fc_comment.arrScrollHeight = []; //输入框换行的高度
Fc_comment.nBtn = false; //评论是否回车
Fc_comment.msgBtn = true; //防止连续点击
Fc_comment.msgScrollAddBtn = false; //评论滚动按钮
var windowH = $(window).height();
Fc_comment.bindMsg = function (event) {
	event.stopPropagation();
	setMaiDian(SXiaoXiXiangQing.SCategory_SXiaoXiXiangQing, SXiaoXiXiangQing.SXiaoXiXiangQing_BangDingHuiFuShiJian);
	Fc_comment.level = 2;

	//var index=$(".msgInfo-msg").index(this);
	console.log('apptype', event.currentTarget.getAttribute("data-apptype"));
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
				var getPageInfo = function getPageInfo() {
					var data = {
						text: popupCommentText,
						placeHolder: '回复' + event.currentTarget.getAttribute("data-role_name")
					};
					return JSON.stringify(data);
				};
				appFc.popupComment(getPageInfo());
			} else {
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
					success: function success(data) {
						if (data.code == 200) {
							var deleteCommentData = {
								pageIndex: publicData.pageIndex,
								partIndex: parseInt(target.getAttribute("data-part_index")),
								deleteCommentIndex: parseInt(target.getAttribute("data-comment_index"))

							};
							PubSub.publish("deleteComment", deleteCommentData);
							$(".fixbg").css("display", "none");
						} else {
							// alert(data.result.message);
							$(".error-main-t").html(data.result.message);
							$(".errorAlert").css("display", "block");
							$(".error-main").css("margin-top", -$(".error-main").height() / 2);
						}
					}
				});
			});
		} else {

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
				var getPageInfo = function getPageInfo() {
					var data = {
						text: popupCommentText,
						placeHolder: '回复' + event.currentTarget.getAttribute("data-role_name")
					};
					return JSON.stringify(data);
				};
				appFc.popupComment(getPageInfo());
			} else {
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
};
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
		var getPageInfo = function getPageInfo() {
			var data = {
				text: popupCommentText,
				placeHolder: '回复：'
			};
			return JSON.stringify(data);
		};
		appFc.popupComment(getPageInfo());
	} else {
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
};

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
	} else if (publicData.functionType == 3) {
		if ($(".msgType2").height() < windowH + 50) {
			//$(".msgType2").eq(0).css("top","500px");
			$(".msgType2").css("min-height", 0);
			publicData.firstInputSelect = true;

			//$(".msgType2").css("min-height",windowH-fontHeight*3.5);
			//$(".msgType2 .list").css("margin-top",windowH-fontHeight*3.5-50);
			//$(".msgType2 .list").css("margin-top",windowH-fontHeight*3.5-50);
			//$(".container").eq(0).css("margin-top",windowH-fontHeight*3.5-50);
		}
	} else if (publicData.functionType == 'info') {
		if ($(".msgType2").height() < windowH + 50) {
			//$(".msgType2").eq(0).css("top","500px");
			$(".msgType2").css("min-height", 0);
			publicData.firstInputSelect = true;
			$(".msgType2").eq(0).css("margin-top", windowH - fontHeight * 3.5 - 50);
		}
	} else {
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
};
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
	} else if (publicData.functionType == 3) {
		$(".msgType2").css("min-height", windowH - fontHeight * 3.5 - Fc_comment.commentHeight);
		//$(".msgType2 .list").css("margin-top",0);
		$(".container").eq(0).css("margin-top", 0);
	} else if (publicData.functionType == 'info') {
		//$(".msgType2").eq(0).css("top","500px");
		$(".msgType2").css("min-height", $(window).height() - Fc_comment.commentHeight);

		//$(".msgType2").css("min-height",windowH-fontHeight*3.5);
		//$(".msgType2 .list").css("margin-top",windowH-fontHeight*3.5-50);
		//$(".msgType2 .list").css("margin-top",windowH-fontHeight*3.5-50);
		$(".msgType2").eq(0).css("margin-top", 0);
	} else if (publicData.functionType1 == 'studentInfo') {

		if ($(".msgType1").height() < windowH + 50) {
			$(".msgType1").css("min-height", windowH - fontHeight * 3.5 - Fc_comment.commentHeight);
			publicData.firstInputSelect = true;
			$(".msgType1").css("margin-top", 0);
		}
	}
	if ($(".msgType1 .list").length > 0) {
		$(".msgType1 .list").eq(0).css("margin-bottom", "3.5rem");
	}
};
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
		} else {
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
		} else {
			Fc_comment.nBtn = false;
		}
		console.log(valbtn && Fc_comment.arrStrLen.length == 0);
		//将有回车换行时的字数和评论框高度存起来
		if (Fc_comment.nBtn && Fc_comment.arrStrLen.length < 4 && (Fc_comment.arrStrLen.length == 0 || $("#comment2-msg1").val().length > Fc_comment.arrStrLen[Fc_comment.arrStrLen.length - 1]) || valbtn && Fc_comment.arrStrLen.length == 0) {
			Fc_comment.arrStrLen.push($("#comment2-msg1").val().length);
			Fc_comment.arrScrollHeight.push($("#comment2-msg2")[0].scrollHeight);
		}
		//将正常输入换行时的字数和评论框高度存起来
		if (!Fc_comment.nBtn && (deleteValBtn || $("#comment2-msg1")[0].scrollHeight != scrollHeight && !valbtn)) {
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
			} else if (Fc_comment.arrScrollHeight.length == 0) {
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
		} else {
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
};

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
			} else {
				$(".setcard").css("display", "none");
			}
			publicData.commentBtn = false;
			clearTimeout(time1);
		}, 550);
	}
};

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
			success: function success(data) {
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
					};
					PubSub.publish("addMsg", addMsgData);
					Fc_comment.msgScrollAddBtn = true;

					if (getParamByUrl("webver") > 4) {
						var getPageInfo = function getPageInfo() {
							var data1 = {
								code: 1,
								desc: "发布成功"
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
				} else {
					// alert(data.result.message);
					if (getParamByUrl("webver") > 4) {
						var getPageInfo = function getPageInfo() {
							var data1 = {
								code: 0,
								desc: data.result.message
							};
							return JSON.stringify(data1);
						};
						appFc.commentStatusCallback(getPageInfo());
					} else {
						$(".error-main-t").html(data.result.message);
						$(".errorAlert").css("display", "block");
						$(".error-main").css("margin-top", -$(".error-main").height() / 2);
					}
				}
				Fc_comment.msgBtn = true;
			},
			error: function error(data) {
				console.log(data);
				if (data.status == 400) {
					if (getParamByUrl("webver") > 4) {
						var getPageInfo = function getPageInfo() {
							var data1 = {
								code: 0,
								desc: "您输入的字数超出最大长度"
							};
							return JSON.stringify(data1);
						};
						appFc.commentStatusCallback(getPageInfo());
					} else {
						// alert("您输入的字数超出最大长度");
						$(".error-main-t").html("您输入的字数超出最大长度");
						$(".errorAlert").css("display", "block");
						$(".error-main").css("margin-top", -$(".error-main").height() / 2);
					}
				} else {
					var getPageInfo = function getPageInfo() {
						var data1 = {
							code: 0,
							desc: data.result.message
						};
						return JSON.stringify(data1);
					};
					appFc.commentStatusCallback(getPageInfo());
				}
				Fc_comment.msgBtn = true;
			}
		});
	}
};
window.getComment = function (data) {
	if (data.type == 0) {
		Fc_comment.dataAddMsg.placeText = data.text;
	} else if (data.type == 1) {
		Fc_comment.dataAddMsg.placeText = "";
		if (data.text == '') {
			var getPageInfo = function getPageInfo() {
				var data = {
					code: 0,
					desc: "留言不能为空"
				};
				return JSON.stringify(data);
			};
			appFc.commentStatusCallback(getPageInfo());
		}
		Fc_comment.dataAddMsg.content = data.text;
		Fc_comment.addmsg(Fc_comment.dataAddMsg);
	}
};
module.exports = Fc_comment;

/***/ })

},[242]);