webpackJsonp([3],{

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

/***/ 217:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _publicData;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = __webpack_require__(0);

var ReactDOM = __webpack_require__(1);
var PubSub = __webpack_require__(2);
var Public_bigImg = __webpack_require__(10);
var Public_comment = __webpack_require__(18);
var Fc_comment = __webpack_require__(9);
var Public_error = __webpack_require__(3);
var Public_deleteComment = __webpack_require__(15);
//card2的筛选
var StudentMsgType2_list = __webpack_require__(63);
var Version = __webpack_require__(27);
//card2的打卡列表
var Fc_comment = __webpack_require__(9);
//部分页面公用参数
var publicData = (_publicData = {
	pageIndex: 2, //判断在个人主页还是营内动态
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
	tabBtn: true }, _defineProperty(_publicData, "commentBtn", false), _defineProperty(_publicData, "isCanDianZan", true), _defineProperty(_publicData, "weekSummaryNum", 0), _defineProperty(_publicData, "isInfoHtmlPage", true), _publicData);
window.publicData = publicData;
//埋点参数
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
var Info = React.createClass({
	displayName: "Info",

	getInitialState: function getInitialState() {

		//控制left
		if (getParamByUrl('webver') > 2) {
			var getPageInfo11 = function getPageInfo11() {
				var data = {
					iconType: 0,
					iconColor: "",
					backNum: 1,
					closeWebview: 0,
					hidden: false,
					isHandle: false,
					functionName: ""
					//isRefreshPage:true
				};
				return JSON.stringify(data);
			};
			appFc.controlLeft(getPageInfo11());
		} else {
			var getPageInfo12 = function getPageInfo12() {
				var data = {
					iconType: 0, //0:默认箭头，1：叉，2：iconUrl传图片
					backNum: 1,
					closeWebview: 0, //默认为0
					iconUrl: ""
					//isRefreshPage:true
				};
				return JSON.stringify(data);
			};
			mobileApp.showLeftBtn(getPageInfo12());
		}

		//title
		if (getParamByUrl('webver') > 2) {
			var getPageInfo1 = function getPageInfo1() {
				var data = {
					title: '打卡详情',
					color: "",
					opacity: "",
					backgroundColor: "",
					backgroundOpacity: ""
				};
				return JSON.stringify(data);
			};
			appFc.controlTitle(getPageInfo1());
		} else {
			var getPageInfo2 = function getPageInfo2() {
				var data = {
					title: "打卡详情",
					isShare: false,
					backgroundColor: '#2c2f31'
				};
				return JSON.stringify(data);
			};
			var deviceType = isMobile();
			if (deviceType == "isApp") {
				mobileApp.getShareInfo(getPageInfo2());
			}
			document.documentElement.style.webkitTouchCallout = 'none';
		}

		this.getList2Fc();
		return {
			bigImgArr: [],
			getList2: {}
		};
	},
	getList2Fc: function getList2Fc() {
		//card2
		var me = this;
		var finalUrl = ajaxLink + "/v1/api/camp/checkDetail" + window.location.search + "&type=1";
		console.log(finalUrl);
		$.ajax({
			type: "get",
			url: finalUrl,
			dataType: "json",
			success: function success(data) {
				if (data.code == 200) {
					var resp = data.resp;
					data.resp.checkList = [resp];
					me.setState({ getList2: data });
					console.log(me.state.getList2);
					$(".msgType2 .list").css("min-height", 0);
					$(".msgType2 .part").eq(0).css("padding-top", 0);
					$(".msgType2 .partLeft").eq(0).css("top", 0);
					$(".msgType2 .partRight-img-li").css("height", ($(window).width() - (2.5 + 3.75) * fontHeight) / 3);
					$(".msgType2 .partRight-img-li2").css("height", ($(window).width() - (2.5 + 3.75) * fontHeight) * 3 / 4);
					$(".msgType2 .partRight-img-li3").css("height", ($(window).width() - (2.5 + 3.75) * fontHeight) / 2);
					publicData.pageBtn = true;
					for (var i = 0; i < $(".partLeft-p5 span").length; i++) {
						$(".partLeft-p5").eq(i).css("padding-left", $(".partLeft-p4 span").eq(i).width() / 4);
					}
				} else {
					publicData.pageBtn = true;
					$(".error-main-t").html("您好,该打卡已被删除!");
					$(".errorAlert").css("display", "block");
					$(".error-main").css("margin-top", -$(".error-main").height() / 2 + 64);

					//点击我知道了
					$('.error-main .error-main-btn1').click(function () {
						alert(2);
					});

					var getPageInfo = function getPageInfo() {
						var data = {
							backNum: 0, //默认为1，
							closeWebview: 1 //默认为0
						};
						return JSON.stringify(data);
					};
					appFc.deleteHistory(getPageInfo());
				}
			}
		});
	},
	componentDidMount: function componentDidMount() {
		var me = this;
		PubSub.subscribe("bigImgData", function (evName, bigImgData) {
			//添加大图预览
			this.setState({ bigImgArr: bigImgData });
		}.bind(this));
		PubSub.subscribe("addZan", function (evName, addZanData) {
			//添加点赞
			// 	pageIndex:publicData.pageIndex,//判断是个人主页还是营内动态
			// 	partIndex:partIndex,//判断是第几部分
			// 	resp://点赞的数据

			if (addZanData.pageIndex == 1) {
				var getList1Data = this.state.getList1;
				getList1Data.resp.checkList[addZanData.partIndex].praises.push(addZanData.resp);
				getList1Data.resp.checkList[addZanData.partIndex].hasPraised = true;
				getList1Data.resp.checkList[addZanData.partIndex].praiseNum = parseInt(getList1Data.resp.checkList[addZanData.partIndex].praiseNum) + 1;
				this.setState({ getList1: getList1Data });
				publicData.isCanDianZan = true;
			} else {
				var getList2Data = this.state.getList2;
				getList2Data.resp.checkList[addZanData.partIndex].praises.push(addZanData.resp);
				getList2Data.resp.checkList[addZanData.partIndex].hasPraised = true;
				getList2Data.resp.checkList[addZanData.partIndex].praiseNum = parseInt(getList2Data.resp.checkList[addZanData.partIndex].praiseNum) + 1;
				this.setState({ getList2: getList2Data });
				publicData.isCanDianZan = true;
			}
		}.bind(this));
		PubSub.subscribe("deleteZan", function (evName, deleteZanData) {
			//删除点赞
			//      	var deleteZanData={
			// 	pageIndex:publicData.pageIndex,//判断是个人主页还是营内动态
			// 	partIndex:partIndex,//判断是第几部分
			// 	deleteZanIndex:deleteZanIndex//判断是第几个

			// }
			if (deleteZanData.pageIndex == 1) {
				var getList1Data = this.state.getList1;
				getList1Data.resp.checkList[deleteZanData.partIndex].praises.splice(deleteZanData.deleteZanIndex, 1);
				getList1Data.resp.checkList[deleteZanData.partIndex].hasPraised = false;
				getList1Data.resp.checkList[deleteZanData.partIndex].praiseNum = parseInt(getList1Data.resp.checkList[deleteZanData.partIndex].praiseNum) - 1;
				this.setState({ getList1: getList1Data });
				publicData.isCanDianZan = true;
			} else {
				var getList2Data = this.state.getList2;
				getList2Data.resp.checkList[deleteZanData.partIndex].praises.splice(deleteZanData.deleteZanIndex, 1);
				getList2Data.resp.checkList[deleteZanData.partIndex].hasPraised = false;
				getList2Data.resp.checkList[deleteZanData.partIndex].praiseNum = parseInt(getList2Data.resp.checkList[deleteZanData.partIndex].praiseNum) - 1;
				this.setState({ getList2: getList2Data });
				publicData.isCanDianZan = true;
			}
		}.bind(this));
		PubSub.subscribe("addMsg", function (evName, addMsgData) {
			//添加评论
			//pageIndex//判断是个人主页还是营内动态
			//partIndex//判断是第几部分
			//resp//评论的参数
			if (addMsgData.pageIndex == 1) {
				var getList1Data = this.state.getList1;
				getList1Data.resp.checkList[addMsgData.partIndex].replys.unshift(addMsgData.resp);

				this.setState({ getList1: getList1Data });
			} else {
				var getList2Data = this.state.getList2;
				getList2Data.resp.checkList[addMsgData.partIndex].replys.unshift(addMsgData.resp);

				this.setState({ getList2: getList2Data });
			}
		}.bind(this));
		PubSub.subscribe("deleteComment", function (evName, deleteCommentData) {
			//删除评论
			//pageIndex//判断是个人主页还是营内动态
			//partIndex//判断是第几部分
			//deleteCommentIndex//判断是第几个
			console.log(deleteCommentData);
			if (deleteCommentData.pageIndex == 1) {
				var getList1Data = this.state.getList1;
				getList1Data.resp.checkList[deleteCommentData.partIndex].replys.splice(deleteCommentData.deleteCommentIndex, 1);
				this.setState({ getList1: getList1Data });
			} else {
				var getList2Data = this.state.getList2;
				getList2Data.resp.checkList[deleteCommentData.partIndex].replys.splice(deleteCommentData.deleteCommentIndex, 1);
				this.setState({ getList2: getList2Data });
			}
		}.bind(this));
	},
	render: function render() {
		var me = this;
		var objStudentMsgType2, objPublic_bigImg;
		if (typeof this.state.getList2.resp != "undefined") {
			objStudentMsgType2 = React.createElement(StudentMsgType2_list, { getList2type: this.state.getList2 });
		} else {
			objStudentMsgType2 = React.createElement("i", null);
		}
		if (me.state.bigImgArr.length > 0) {
			objPublic_bigImg = React.createElement(Public_bigImg, { bigImgArr: me.state.bigImgArr });
		} else {
			objPublic_bigImg = React.createElement("i", null);
		}
		return React.createElement(
			"div",
			{ className: "row" },
			React.createElement(
				"div",
				{ className: "row msgType2", style: { paddingTop: "1rem", minHeight: $(window).height() - (3.1875 + 1.5) * fontHeight }, onClick: Fc_comment.hiddenComment2 },
				objStudentMsgType2
			),
			React.createElement(Public_comment, null),
			React.createElement(Public_error, null),
			React.createElement(Public_deleteComment, null),
			React.createElement(Version, null),
			objPublic_bigImg
		);
	}
});
ReactDOM.render(React.createElement(Info, null), document.getElementById('main'));

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

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
__webpack_require__(35);

var Version = React.createClass({
	displayName: "Version",

	render: function render() {
		return React.createElement(
			"aside",
			{ className: "row" },
			React.createElement(Student_otherInfo_version, null),
			React.createElement(Student_otherInfo_version2, null)
		);
	}
});

var Student_otherInfo_version = React.createClass({
	displayName: "Student_otherInfo_version",

	getInitialState: function getInitialState() {
		var versionDisplay = "none";
		if (getParamByUrl('os') == 'iOS') {
			if (getParamByUrl('webver') > 3) {
				//版本正常
				$("body").css("overflow", "auto");
				$("body").css("max-height", "auto");
			} else {
				//版本过低
				versionDisplay = "block";
				// var t1=setTimeout(function(){
				// 	$("body").css("max-height",$(window).height());
				// 	$("body").css("overflow","hidden");
				// 	clearTimeout(t1);
				// },200);
			}
		}

		return { display: versionDisplay };
	},
	btnClick: function btnClick() {
		event.stopPropagation();
		$("body").css("overflow", "auto");
		$("body").css("max-height", "auto");
		$(".fixbg-version").css("display", "none");
		var getPageInfo = function getPageInfo() {
			var data = {
				backNum: 0, //默认为1，
				closeWebview: 1 //默认为0
			};
			return JSON.stringify(data);
		};
		appFc.deleteHistory(getPageInfo());
	},
	btnClick2: function btnClick2() {
		window.location.href = 'https://itunes.apple.com/us/app/picooc/id729928969?mt=8';
		event.stopPropagation();
	},
	render: function render() {
		return React.createElement(
			"aside",
			{ className: "row fixbg-version", style: { display: this.state.display } },
			React.createElement(
				"div",
				{ className: "col-xs-12 col-sm-12 fixbg-main-version" },
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"div",
						{ className: "col-xs-12 col-sm-12 fixbg-main-t-version" },
						"\u5F53\u524DApp\u7248\u672C\u8FC7\u4F4E\uFF0C\u65E0\u6CD5\u8FDB\u5165\u65B0\u7248\u71C3\u8102\u8425\u54E6\uFF0C\u5FEB\u53BB\u66F4\u65B0\u5427~"
					),
					React.createElement(
						"div",
						{ className: "col-xs-12 col-sm-12 fixbg-main-btn-version" },
						React.createElement(
							"div",
							{ className: "row" },
							React.createElement(
								"div",
								{ className: "col-xs-6 col-sm-6 fixbg-main-btn1-version", onClick: this.btnClick },
								"\u53D6\u6D88"
							),
							React.createElement(
								"div",
								{ className: "col-xs-6 col-sm-6 fixbg-main-btn2-version", onClick: this.btnClick2 },
								"\u524D\u5F80AppStore"
							)
						)
					)
				)
			)
		);
	}
});
var Student_otherInfo_version2 = React.createClass({
	displayName: "Student_otherInfo_version2",

	getInitialState: function getInitialState() {
		var versionDisplay = "none";
		if (getParamByUrl('os') == 'android') {
			if (getParamByUrl('webver') > 3) {
				//版本正常
				$("body").css("overflow", "auto");
				$("body").css("max-height", "auto");
			} else {
				//版本过低
				versionDisplay = "block";
				// var t1=setTimeout(function(){
				// 	$("body").css("max-height",$(window).height());
				// 	$("body").css("overflow","hidden");
				// 	clearTimeout(t1);
				// },200);
			}
		}

		return {
			display: versionDisplay
		};
	},
	btnClick: function btnClick() {
		$("body").css("overflow", "auto");
		$("body").css("max-height", "auto");
		$(".fixbg-version2").css("display", "none");
		event.stopPropagation();
		var getPageInfo = function getPageInfo() {
			var data = {
				backNum: 0, //默认为1，
				closeWebview: 1 //默认为0
			};
			return JSON.stringify(data);
		};
		appFc.deleteHistory(getPageInfo());
	},
	render: function render() {

		return React.createElement(
			"aside",
			{ className: "row fixbg-version2", style: { display: this.state.display } },
			React.createElement(
				"div",
				{ className: "col-xs-12 col-sm-12 fixbg-main-version2" },
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"div",
						{ className: "col-xs-12 col-sm-12 fixbg-main-t-version2" },
						"\u5F53\u524DApp\u7248\u672C\u8FC7\u4F4E\uFF0C\u65E0\u6CD5\u8FDB\u5165\u65B0\u7248\u71C3\u8102\u8425\u54E6\uFF0C\u5FEB\u53BB\u66F4\u65B0\u5427~"
					),
					React.createElement(
						"div",
						{ className: "col-xs-12 col-sm-12 fixbg-main-btn-version2" },
						React.createElement(
							"div",
							{ className: "row" },
							React.createElement(
								"div",
								{ className: "col-xs-12 col-sm-12 fixbg-main-btn2-version2", onClick: this.btnClick },
								"\u6211\u77E5\u9053\u4E86"
							)
						)
					)
				)
			)
		);
	}
});
$(function () {
	$(".fixbg-main-version").css("margin-top", -$(".fixbg-main-version").height() / 2);
	$(".fixbg-main-version2").css("margin-top", -$(".fixbg-main-version2").height() / 2);
});

module.exports = Version;

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

/***/ 34:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(40);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(34)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/.0.23.1@css-loader/index.js!./version.css", function() {
			var newContent = require("!!../../../../node_modules/.0.23.1@css-loader/index.js!./version.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(41)();
// imports


// module
exports.push([module.i, "\r\n.fixbg-version{\r\n\tdisplay:none;\r\n\tposition: fixed;\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\tleft: 0;\r\n\tbottom: 0;\r\n\ttext-align: center;\r\n\tfont-size: 1rem;\r\n\tpadding: 0 25px;\r\n\tbackground: rgba(0,0,0,0.7);\r\n\tz-index: 999;\r\n}\r\n.fixbg-main-version{\r\n\tdisplay:block;\r\n\tposition: absolute;\r\n\twidth: 90%;\r\n\tleft: 5%;\r\n\ttop:50%;\r\n\tcolor: #6d747e;\r\n\tbackground: #ffffff;\r\n\t-moz-border-radius: 3px;\r\n\t-webkit-border-radius: 3px;\r\n\t-o-border-radius: 3px;\r\n\tborder-radius: 3px;\r\n}\r\n.fixbg-main-t-version{\r\n\tpadding: 30px 40px;\r\n\ttext-align: left;\r\n}\r\n\r\n.fixbg-main-t-version span{\r\n\tcolor:#cf9979; \r\n}\r\n.fixbg-main-btn-version{\r\n\tline-height: 2.8125rem;\r\n\tborder-top: 1px solid rgba(0,0,0,0.1);\r\n\ttext-align: center;\r\n}\r\n.fixbg-main-btn1-version{\r\n\tborder-right: 1px solid rgba(0,0,0,0.1);\r\n\tcolor: #666666;\r\n}\r\n.fixbg-main-btn2-version{\r\n\tcolor: #1daffa;\r\n}\r\n\r\n.fixbg-version2{\r\n\tdisplay:none;\r\n\tposition: fixed;\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\tleft: 0;\r\n\tbottom: 0;\r\n\ttext-align: center;\r\n\tfont-size: 1rem;\r\n\tpadding: 0 25px;\r\n\tbackground: rgba(0,0,0,0.7);\r\n\tz-index: 999;\r\n}\r\n.fixbg-main-version2{\r\n\tdisplay:block;\r\n\tposition: absolute;\r\n\twidth: 90%;\r\n\tleft: 5%;\r\n\ttop:50%;\r\n\tcolor: #6d747e;\r\n\tbackground: #ffffff;\r\n\t-moz-border-radius: 3px;\r\n\t-webkit-border-radius: 3px;\r\n\t-o-border-radius: 3px;\r\n\tborder-radius: 3px;\r\n}\r\n.fixbg-main-t-version2{\r\n\tpadding: 30px 40px;\r\n\ttext-align: left;\r\n}\r\n\r\n.fixbg-main-t-version2 span{\r\n\tcolor:#cf9979; \r\n}\r\n.fixbg-main-btn-version2{\r\n\tline-height: 2.8125rem;\r\n\tborder-top: 1px solid rgba(0,0,0,0.1);\r\n\ttext-align: center;\r\n}\r\n.fixbg-main-btn1-version2{\r\n\tborder-right: 1px solid rgba(0,0,0,0.1);\r\n\tcolor: #666666;\r\n}\r\n.fixbg-main-btn2-version2{\r\n\tcolor: #1daffa;\r\n\r\n}", ""]);

// exports


/***/ }),

/***/ 41:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


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

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);

var StudentMsgType2_list_part = __webpack_require__(85);
//card2的单个打卡
var StudentMsgType2_list = React.createClass({
	displayName: "StudentMsgType2_list",

	render: function render() {
		var getList2type = this.props.getList2type;
		var list = [];
		var noCardList;
		if (typeof getList2type.resp != "undefined") {
			var checkList = getList2type.resp.checkList;
			var xueYuanDaKaIndex = 0;
			for (var i = 0, len = getList2type.resp.checkList.length; i < len; i++) {
				if (checkList[i].type != 6) {
					list.push(React.createElement(StudentMsgType2_list_part, { xueYuanDaKaIndex: xueYuanDaKaIndex, getList2type_part: getList2type.resp.checkList[i], getList2type_index: i, key: i }));
					xueYuanDaKaIndex++;
				}
			}
			if (!publicData.hasNextBtn2) {
				if (getList2type.resp.checkList.length > 0) {
					noCardList = React.createElement(
						"div",
						{ className: "cardListMessage", style: { display: "block" } },
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
						React.createElement(
							"span",
							null,
							"\u6682\u65E0\u76F8\u5173\u6253\u5361\u8BB0\u5F55\u54E6\uFF5E"
						)
					);
				}
			}
			return React.createElement(
				"article",
				{ className: "row list" },
				list,
				noCardList
			);
		} else {
			return React.createElement("span", null);
		}
	}
});
module.exports = StudentMsgType2_list;

/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);

var StudentMsgType2_list_part_partleft = __webpack_require__(25);
var StudentMsgType2_list_part_right = __webpack_require__(26);

var StudentMsgType2_list_part = React.createClass({
	displayName: "StudentMsgType2_list_part",

	render: function render() {
		var xueYuanDaKaIndex = this.props.xueYuanDaKaIndex;
		var getList2type_part = this.props.getList2type_part;
		var getList2PartIndex = this.props.getList2type_index;
		return React.createElement(
			"div",
			{ className: "studentListOrder" },
			React.createElement(
				"aside",
				{ className: "row part line-length" },
				React.createElement(StudentMsgType2_list_part_partleft, { getList1type_partleft: getList2type_part, index: getList2PartIndex }),
				React.createElement(StudentMsgType2_list_part_right, { xueYuanDaKaIndex: xueYuanDaKaIndex, getList1type_right: getList2type_part, index: getList2PartIndex })
			)
		);
	}
});
module.exports = StudentMsgType2_list_part;

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

},[217]);