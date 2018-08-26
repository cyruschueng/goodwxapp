webpackJsonp([8],{

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

/***/ 213:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
var Public_Error = __webpack_require__(3);
var PubSub = __webpack_require__(2);
var Public_BIGImg = __webpack_require__(10);
var Fc_bindBigImg = __webpack_require__(6);

var frontdefaultImg = ["http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-front-w.png", "http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-front-m.png"];
var sidedefaultImg = ["http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-side-w.png", "http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-side-m.png"];
// 设置图片存储对对象
var publicData = {
	objImg: {
		'LeftBigIMG1': [],
		'LeftBigIMG2': [],
		'RightBigIMG1': [],
		'RightBigIMG2': []
	}
};
window.publicData = publicData;
var campId = getParamByUrl("campId");
var roleId = getParamByUrl("roleId");
var SWoDeShenCaiDuiBi = {
	SCategory_SWoDeShenCaiDuiBi: 5061100,
	SWoDeShenCaiDuiBi_TiaoZhuanWoDeXiangCe: 5061101, //跳转我的相册
	SWoDeShenCaiDuiBi_TiaoZhuanShangChuanZhaoPian: 5061102, //跳转上传照片
	SWoDeShenCaiDuiBi_TuPianYuLan: 5061103 //图片预览
};

var PhoneBody = React.createClass({
	displayName: "PhoneBody",

	getInitialState: function getInitialState() {
		return {
			day1: '',
			datetime1: '',
			firstweight: '',
			firstfat: '',
			firstwaist: '',
			day2: '',
			datetime2: '',
			lastweight: '',
			lastfat: '',
			lastwaist: ''

		};
	},
	componentWillMount: function componentWillMount() {

		var finalUrl = ajaxLink + "/v1/api/campCommon/compareTOPicture" + window.location.search + "&campId=" + campId + "&roleId=" + roleId;
		//获取身材对比数据
		this.serverRequest = $.get(finalUrl, function (data) {
			if (data.code == 200) {
				console.log(data);
				if (data.resp.sex == 0) {
					var defaultFrontUrl = frontdefaultImg[0];
					var defaultSideUrl = sidedefaultImg[0];
				} else {
					var defaultFrontUrl = frontdefaultImg[1];
					var defaultSideUrl = sidedefaultImg[1];
				}
				if (data.resp != "") {
					if (data.resp.campPictureLast) {
						if (data.resp.campPictureLast.weight == "" || data.resp.campPictureLast.weight == null) {
							data.resp.campPictureLast.weight = "--";
						} else {}
						if (data.resp.campPictureLast.fat == "" || data.resp.campPictureLast.fat == null) {
							data.resp.campPictureLast.fat = "--";
						} else {}
						if (data.resp.campPictureLast.waistMeasure == "" || data.resp.campPictureLast.waistMeasure == null) {
							data.resp.campPictureLast.waistMeasure = "--";
						} else {}
						if (data.resp.campPictureLast.frontPicture == "" || data.resp.campPictureLast.frontPicture == null) {
							data.resp.campPictureLast.frontPicture = defaultFrontUrl;
						}
						if (data.resp.campPictureLast.facePicture == "" || data.resp.campPictureLast.facePicture == null) {
							data.resp.campPictureLast.facePicture = defaultSideUrl;
						}
						this.setState({
							day1: data.resp.campPictureLast.day,
							datetime1: data.resp.campPictureLast.time,
							firstweight: data.resp.campPictureLast.weight,
							firstfat: data.resp.campPictureLast.fat,
							firstwaist: data.resp.campPictureLast.waistMeasure
						});
						publicData.objImg['LeftBigIMG1'].push({ 'url': data.resp.campPictureLast.frontPicture });
						publicData.objImg['LeftBigIMG2'].push({ 'url': data.resp.campPictureLast.facePicture });
						console.log(data.resp.campPictureLast);
						$(".partLeft-img-li1").css("background-image", 'url(' + data.resp.campPictureLast.frontPicture + '@500h_500w_1e)');
						$(".partLeft-img-li2").css("background-image", 'url(' + data.resp.campPictureLast.facePicture + '@500h_500w_1e)');
					} else {}
					if (data.resp.campPictureFirst) {
						if (data.resp.campPictureFirst.weight == "" || data.resp.campPictureFirst.weight == null) {
							data.resp.campPictureFirst.weight = "--";
						} else {}
						if (data.resp.campPictureFirst.fat == "" || data.resp.campPictureFirst.fat == null) {
							data.resp.campPictureFirst.fat = "--";
						} else {}
						if (data.resp.campPictureFirst.waistMeasure == "" || data.resp.campPictureFirst.waistMeasure == null) {
							data.resp.campPictureFirst.waistMeasure = "--";
						} else {}
						if (data.resp.campPictureFirst.frontPicture == "" || data.resp.campPictureFirst.frontPicture == null) {
							data.resp.campPictureFirst.frontPicture = defaultFrontUrl;
						} else {}
						if (data.resp.campPictureFirst.facePicture == "" || data.resp.campPictureFirst.facePicture == null) {
							data.resp.campPictureFirst.facePicture = defaultSideUrl;
						} else {}
						this.setState({
							day2: data.resp.campPictureFirst.day,
							datetime2: data.resp.campPictureFirst.time,
							lastweight: data.resp.campPictureFirst.weight,
							lastfat: data.resp.campPictureFirst.fat,
							lastwaist: data.resp.campPictureFirst.waistMeasure
						});
						publicData.objImg['RightBigIMG1'].push({ 'url': data.resp.campPictureFirst.frontPicture });
						publicData.objImg['RightBigIMG2'].push({ 'url': data.resp.campPictureFirst.facePicture });

						$(".partRight-img-li3").css("background-image", 'url(' + data.resp.campPictureFirst.frontPicture + ')');
						$(".partRight-img-li4").css("background-image", 'url(' + data.resp.campPictureFirst.facePicture + ')');

						$(".changeContent").css("width", window.innerWidth * 182 / 750);
						$(".changeContent").css("top", $(".partRight-img-li3").height() - $(".changeContent").height() / 2 - 8);
						$(".changeContent").css("left", $(".partRight-img-li3").width() - $(".changeContent").width() / 2);
						if ($(".container").height() < $(window).height()) {
							$(".container").css("height", $(window).height());
						}
					} else {}
				}
			} else {
				$(".error-main-t").html(data.message);
				$(".errorAlert").css("display", "block");
				$(".error-main").css("margin-top", -$(".error-main").height() / 2);
			}
		}.bind(this));
	},
	componentWillUnmount: function componentWillUnmount() {
		this.serverRequest.abort();
	},
	componentDidMount: function componentDidMount() {
		$(".part-img-li").css("height", $(".part-img-li").width() * 500 / 376);
		$(".bodyChange").css("height", $(".partLeft").height());
	},
	render: function render() {
		var day1 = this.state.day1,
		    datetime1 = this.state.datetime1,
		    firstweight = this.state.firstweight,
		    firstfat = this.state.firstfat,
		    firstwaist = this.state.firstwaist,
		    day2 = this.state.day2,
		    datetime2 = this.state.datetime2,
		    lastweight = this.state.lastweight,
		    lastfat = this.state.lastfat,
		    lastwaist = this.state.lastwaist;
		return React.createElement(
			"aside",
			{ className: "bodyChange", ref: "bodyChange" },
			React.createElement(
				"aside",
				{ className: "row col-xs-6 col-sm-6 partLeft", ref: "partLeft" },
				React.createElement(
					"div",
					{ className: "col-xs-12 col-sm-12 part-img-li partLeft-img-li1", objimg: "img2", ref: "part_img_li", onClick: Fc_bindBigImg.bindBigImg, "data-obj_img": "LeftBigIMG1" },
					React.createElement(
						"div",
						{ className: "date-content" },
						React.createElement(
							"div",
							{ className: "day" },
							"DAY",
							React.createElement(
								"span",
								{ id: "day1" },
								day1
							)
						),
						React.createElement(
							"div",
							{ className: "datetime", id: "datetime1" },
							datetime1
						)
					)
				),
				React.createElement("div", { className: "col-xs-12 col-sm-12 part-img-li partLeft-img-li2", objimg: "img2", onClick: Fc_bindBigImg.bindBigImg, "data-obj_img": "LeftBigIMG2" })
			),
			React.createElement(
				"aside",
				{ className: "row col-xs-6 col-sm-6 partRight" },
				React.createElement(
					"div",
					{ className: "col-xs-12 col-sm-12 part-img-li partRight-img-li3", objimg: "img2", onClick: Fc_bindBigImg.bindBigImg, "data-obj_img": "RightBigIMG1" },
					React.createElement(
						"div",
						{ className: "date-content" },
						React.createElement(
							"div",
							{ className: "day" },
							"DAY",
							React.createElement(
								"span",
								{ id: "day2" },
								day2
							)
						),
						React.createElement(
							"div",
							{ className: "datetime", id: "datetime2" },
							datetime2
						)
					)
				),
				React.createElement("div", { className: "col-xs-12 col-sm-12 part-img-li partRight-img-li4", objimg: "img2", onClick: Fc_bindBigImg.bindBigImg, "data-obj_img": "RightBigIMG2" })
			),
			React.createElement(
				"div",
				{ className: "changeContent" },
				React.createElement(
					"div",
					{ className: "weightKg" },
					"\u4F53\u91CD[KG]"
				),
				React.createElement(
					"div",
					null,
					React.createElement(
						"span",
						{ className: "span-left", id: "firstweight" },
						firstweight
					),
					"|",
					React.createElement(
						"span",
						{ className: "span-right", id: "lastweight" },
						lastweight
					)
				),
				React.createElement(
					"div",
					{ className: "fattt" },
					"\u8102\u80AA[%]"
				),
				React.createElement(
					"div",
					null,
					React.createElement(
						"span",
						{ className: "span-left", id: "firstfat" },
						firstfat
					),
					"|",
					React.createElement(
						"span",
						{ className: "span-right", id: "lastfat" },
						lastfat
					)
				),
				React.createElement(
					"div",
					{ className: "waistCm" },
					"\u8170\u56F4[CM]"
				),
				React.createElement(
					"div",
					null,
					React.createElement(
						"span",
						{ className: "span-left", id: "firstwaist" },
						firstwaist
					),
					"|",
					React.createElement(
						"span",
						{ className: "span-right", id: "lastwaist" },
						lastwaist
					)
				)
			)
		);
	}
});
var PhoneContainer = React.createClass({
	displayName: "PhoneContainer",

	getInitialState: function getInitialState() {
		var titleData = {
			title: '身材对比',
			color: "",
			opacity: "",
			backgroundColor: "",
			backgroundOpacity: ""
		};
		titleData = JSON.stringify(titleData);
		appFc.controlTitle(titleData);

		var getPageInfo = function getPageInfo() {
			var iconUrl = '';
			if (getParamByUrl("os") == "android") {
				iconUrl = "https://cdn2.picooc.com/web/res/event/chrome/android_share.png";
			} else {
				iconUrl = "https://cdn2.picooc.com/web/res/event/chrome/ios_share.png";
			}
			var data = {
				iconType: 0, //0走图片逻辑，1走文案逻辑
				rightStr: {
					str: "",
					color: "",
					opacity: "",
					id: "0"
				},
				rightIcon: [{
					type: "0",
					id: "2",
					functionName: "getControl",
					iconUrl: iconUrl,
					iconName: "分享",
					redDotType: "1",
					redDotShow: false,
					redDotNum: "0",
					nativeType: "",
					content: ""
				}]
			};
			return JSON.stringify(data);
		};
		window.getPageInfo = getPageInfo;
		appFc.controlRight(getPageInfo());
		window.getControl = getControl;
		function getControl() {
			var data = {
				link: absoluteUrl + "figureContrastShare.html" + window.location.search,
				animation: 2 //默认1从右到左，2从下到上
			};
			data = JSON.stringify(data);
			appFc.openWebview(data);
		}
		return {
			bigImgArr: []
		};
	},
	componentDidMount: function componentDidMount() {
		PubSub.subscribe('bigImgData', function (ev, bigImgDate) {
			this.setState({
				bigImgArr: bigImgDate
			});
		}.bind(this));
	},
	myPhoneClick: function myPhoneClick(event) {
		event.stopPropagation();
		var ele = event.currentTarget;
		$(ele).css("opacity", "0.6");
		setCookie("toPhoto", 0, 1);
		$(ele).attr("href", "photoAlbum.html" + window.location.search + "&campId=" + campId + "&roleId=" + roleId);
		event.stopPropagation();
		setMaiDian(SWoDeShenCaiDuiBi.SCategory_SWoDeShenCaiDuiBi, SWoDeShenCaiDuiBi.SWoDeShenCaiDuiBi_TiaoZhuanWoDeXiangCe);
	},
	upLoadClick: function upLoadClick(event) {
		event.stopPropagation();
		var ele = event.currentTarget;
		$(ele).css("opacity", "0.6");
		setCookie("uploadurl", 1, 1); //跳转到上传照片页面的标识
		$(ele).attr("href", "figureContrast.html" + window.location.search + "&campId=" + campId + "&roleId=" + roleId + "&uploadurl=1");
		setMaiDian(SWoDeShenCaiDuiBi.SCategory_SWoDeShenCaiDuiBi, SWoDeShenCaiDuiBi.SWoDeShenCaiDuiBi_TiaoZhuanShangChuanZhaoPian);
	},
	render: function render() {
		var bigImgArr = this.state.bigImgArr;
		var obj_bigImg;
		if (bigImgArr != '') {
			obj_bigImg = React.createElement(Public_BIGImg, { bigImgArr: this.state.bigImgArr });
		} else {
			obj_bigImg = React.createElement("i", null);
		}
		return React.createElement(
			"div",
			null,
			React.createElement(
				"section",
				{ className: "container" },
				React.createElement(PhoneBody, null),
				React.createElement("div", { style: { "clear": "both" } }),
				React.createElement(
					"div",
					{ className: "buttons" },
					React.createElement(
						"a",
						{ className: "button1", onClick: this.myPhoneClick },
						"\u6211\u7684\u76F8\u518C"
					),
					React.createElement(
						"a",
						{ className: "button2", onClick: this.upLoadClick },
						"\u4E0A\u4F20\u7167\u7247"
					)
				),
				obj_bigImg
			),
			React.createElement(Public_Error, null),
			React.createElement(
				"div",
				{ className: "saveImg-ceng" },
				React.createElement(
					"aside",
					{ className: "row saveImg" },
					React.createElement(
						"div",
						{ className: "col-xs-12 col-sm-12 saveImg-btn saveImg-item", onClick: Fc_bindBigImg.saveImgBtnTouchStart },
						"\u4FDD\u5B58\u56FE\u7247"
					),
					React.createElement(
						"div",
						{ className: "col-xs-12 col-sm-12 cancelImg-btn saveImg-item", onClick: Fc_bindBigImg.cancelImgBtnTouchStart },
						"\u53D6\u6D88"
					)
				)
			)
		);
	}
});
ReactDOM.render(React.createElement(PhoneContainer, null), document.getElementById('phoneBox'));

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

/***/ })

},[213]);