webpackJsonp([4],{

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

/***/ 235:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);

var Public_error = __webpack_require__(3);
var Fc_bindBigImg = __webpack_require__(6);
var Public_bigImg = __webpack_require__(10);
var Version = __webpack_require__(27);
var SXueYuanDaKa = {
	SCategory_SXueYuanDaKa: 5060300,
	SXueYuanDaKa_ShuRuKuang: 5060301, //输入框
	SXueYuanDaKa_TianJiaTuPian: 5060302, //添加图片
	SXueYuanDaKa_XianShiYuLanTu: 5060303, //显示预览图
	SXueYuanDaKa_BaoCunTuPian: 5060304, //保存图片
	SXueYuanDaKa_QuXiaoBaoCunTuPian: 5060305, //取消保存图片
	SXueYuanDaKa_ShanChuTuPian: 5060306, //删除图片
	SXueYuanDaKa_XuanZeDaKaBiaoQian: 5060307, //选择打卡标签
	SXueYuanDaKa_DianJiDaKa: 5060308, //点击打卡
	SXueYuanDaKa_ShouYeDianJiDaKa: 5060309 //从首页过来点击打卡
};

//部分页面公用参数
var publicData = {
	cardType: ["早餐", "午餐", "晚餐", "加餐", "运动"],
	arrbg1: ["image/setcard/setcard-2.png", "image/setcard/setcard-3.png", "image/setcard/setcard-4.png", "image/setcard/setcard-5.png", "image/setcard/setcard-7.png"],
	arrbg2: ["image/setcard/setcard-31.png", "image/setcard/setcard-32.png", "image/setcard/setcard-33.png", "image/setcard/setcard-34.png", "image/setcard/setcard-36.png"],
	arrbg3: [],
	objImg: {}, //图片预览对象
	btnShow: false,
	loadImg: [],
	focusBtn: false,
	btnType: 0,
	arrgetImg: 0,
	imgMaxNum: 6
};
window.publicData = publicData;
var imgUrls = ["http://cdn2.picooc.com/ranzhiying/201703/09/20170309_17254386576474.png@300h_300w_1e", "http://cdn2.picooc.com/ranzhiying/201703/09/20170309_17254387635643.png@300h_300w_1e"];
/*getImg(imgUrls);*/

var CardContainer = React.createClass({
	displayName: "CardContainer",

	getInitialState: function getInitialState() {
		var me = this;
		window.getImg = me.getImg;
		var titleData = {
			title: "打卡",
			color: "",
			opacity: "",
			backgroundColor: "",
			backgroundOpacity: ""
		};
		titleData = JSON.stringify(titleData);
		appFc.controlTitle(titleData);
		me.leftControl();
		return {
			imgArr: "",
			bigImgArr: ""
		};
	},
	selectTag: function selectTag(index) {
		var me = this;
		setMaiDian(SXueYuanDaKa.SCategory_SXueYuanDaKa, SXueYuanDaKa.SXueYuanDaKa_XuanZeDaKaBiaoQian);
		publicData.btnType = index;
		if (publicData.arrbg3.length != 0) {
			$(".icon").eq(publicData.arrbg3[0]).find("img").attr("src", publicData.arrbg1[publicData.arrbg3[0]]);
		}
		publicData.arrbg3[0] = index;
		$(".icon").eq(index).find("img").attr("src", publicData.arrbg2[index]);
		me.showBtn();
	},
	showBtn: function showBtn() {
		if (publicData.arrbg3.length > 0 && $(".getImg-img").length > 0 || publicData.arrbg3.length > 0 && $.trim($("#msgInfo").val()).replace(/[ ]/g, "").length > 0) {
			publicData.btnShow = true;
			$(".footbtn-btn").css("background", "#ffc36e");
		} else {
			publicData.btnShow = false;
			$(".footbtn-btn").css("background", "#bbb");
		}
	},
	msgInfoFocus: function msgInfoFocus() {
		publicData.focusBtn = true;
		setMaiDian(SXueYuanDaKa.SCategory_SXueYuanDaKa, SXueYuanDaKa.SXueYuanDaKa_ShuRuKuang);
	},
	msgInfoBlur: function msgInfoBlur() {
		var t3 = setTimeout(function () {
			publicData.focusBtn = false;
			clearTimeout(t3);
		}, 100);
	},
	getImgBg: function getImgBg() {
		var me = this;
		me.msgInfoBlur();
		//getImg(imgUrls);
		setMaiDian(SXueYuanDaKa.SCategory_SXueYuanDaKa, SXueYuanDaKa.SXueYuanDaKa_TianJiaTuPian);
		if (getParamByUrl("testtype") == "tanchao") {
			getImg(["http://cdn2.picooc.com/web/res/event/bottle/image/msg-21.png", "http://cdn2.picooc.com/web/res/event/bottle/image/bg1.jpg"]);
		}
		//alert("添加前："+publicData.imgMaxNum);
		if (publicData.focusBtn) {
			console.log(1);
			var t2 = setTimeout(function () {
				var data = {
					maxNum: publicData.imgMaxNum //上传图片的最大个数
				};

				data = JSON.stringify(data);
				appFc.uploadImg(data);

				clearTimeout(t2);
			}, 250);
		} else {

			var data = {
				maxNum: publicData.imgMaxNum //上传图片的最大个数
			};
			data = JSON.stringify(data);
			appFc.uploadImg(data);
		}
	},
	getImgDelete: function getImgDelete(index) {
		var me = this;
		setMaiDian(SXueYuanDaKa.SCategory_SXueYuanDaKa, SXueYuanDaKa.SXueYuanDaKa_ShanChuTuPian);
		for (var i = 0; i < me.state.imgArr.length; i++) {
			var temp = me.state.imgArr[i];
			if (i == index) {
				for (var j = i; j < me.state.imgArr.length; j++) {
					me.state.imgArr[j] = me.state.imgArr[j + 1];
					me.state.bigImgArr[j] = me.state.bigImgArr[j + 1];
				}
				me.state.imgArr.length = me.state.imgArr.length - 1;
				me.state.bigImgArr.length = me.state.bigImgArr.length - 1;
			}
		}
		console.info(me.state.imgArr);
		me.setState({ imgArr: me.state.imgArr });
		me.setState({ bigImgArr: me.state.bigImgArr });
		publicData.objImg["cardArr"] = me.state.imgArr;
		publicData.loadImg.splice(index, 1);
	},
	getImg: function getImg(url) {
		var me = this;
		var bigImgListCon = [];
		var getBigImgArr = [];
		if (me.state.imgArr != "") {
			bigImgListCon = me.state.imgArr;
		}
		if (me.state.bigImgArr != "") {
			getBigImgArr = me.state.bigImgArr;
		}
		console.info(me.state.imgArr);
		//var oldArrLength = me.state.
		for (var i = 0; i < url.length; i++) {
			publicData.loadImg.push(url[i]);
			bigImgListCon.push(url[i]);
			getBigImgArr.push({ "url": url[i] });
		}

		console.info(bigImgListCon);
		console.info(getBigImgArr);
		me.setState({ imgArr: bigImgListCon });
		me.setState({ bigImgArr: getBigImgArr });
		publicData.objImg["cardArr"] = me.state.imgArr;
		/*alert("url.length:"+url.length);
  publicData.arrgetImg=url.length;
  		//publicData.imgMaxNum=publicData.imgMaxNum-publicData.arrgetImg;
  publicData.imgMaxNum=publicData.imgMaxNum-publicData.arrgetImg;
  alert("imgMaxNum:"+publicData.imgMaxNum);*/
	},
	componentDidMount: function componentDidMount() {
		var me = this;
		if (getParamByUrl('isCamp') == 1) {
			var campImgUrl = getParamByUrl('pictureUrl').split(',');
			$(".icon").eq(4).find("img").attr("src", "image/setcard/setcard-36.png");
			publicData.btnType = 4;
			publicData.arrbg3[0] = 4;
			me.getImg(campImgUrl);
		}
		$("#msgInfo").bind("input propertychange", function () {
			me.showBtn();
		});
	},
	componentDidUpdate: function componentDidUpdate() {
		var me = this;
		me.showBtn();
		//添加图片在组件完成更新后
		if ($(".getImg-img").length == 6) {
			$(".getImg-bg1").css("display", "none");
		} else if ($(".getImg-img").length > 6) {
			for (var i = 6; i < $(".getImg-img").length; i++) {
				$(".getImg-img").eq(i).remove();
				$(".bigImg-li").eq(i).remove();
			}
			$(".getImg-bg1").css("display", "none");
		}

		//删除图片在组件完成更新后
		if ($(".getImg-img").length < 6) {
			$(".getImg-bg1").css("display", "block");
			/*publicData.arrgetImg=$(".getImg-img").length;
   publicData.imgMaxNum=6-publicData.arrgetImg;
   alert("触发了");*/
		}

		//更新可添加图片数量
		publicData.arrgetImg = $(".getImg-img").length;
		publicData.imgMaxNum = 6 - publicData.arrgetImg;
		//alert("触发了："+publicData.imgMaxNum);

		$(".getImg-bg").css("height", $(".getImg-bg").width());
	},
	imgError: function imgError(event) {
		var index = 0;
		console.log(_typeof(event.currentTarget.getAttribute("src")));
		var imgSrc = event.currentTarget.getAttribute("src");
		if (imgSrc.split("?")[1] != "" && imgSrc.split("?")[1] != undefined) {
			index = imgSrc.split("?")[1];
		}
		console.log(parseInt(index));
		if (parseInt(index) < 10) {
			event.currentTarget.setAttribute("src", imgSrc.split("?")[0] + '?' + (parseInt(index) + 1));
		}
	},
	//左上角隐藏返回功能
	leftControl: function leftControl() {
		var getPageInfo = function getPageInfo() {
			var data = {
				iconType: 1,
				iconColor: "",
				backNum: 1,
				closeWebview: 0,
				hidden: false,
				isHandle: false,
				functionName: ""
			};
			return JSON.stringify(data);
		};
		appFc.controlLeft(getPageInfo());
	},
	render: function render() {
		var me = this;
		/*me.showBtn();*/
		var me = this;
		var mainHeight = $(window).height() - 5 * fontHeight;
		var objPublic_bigImg = "";
		var imgUrlList = "";
		if (me.state.imgArr != "") {
			objPublic_bigImg = React.createElement(Public_bigImg, { getList1: this.state.getList1, bigImgArr: me.state.bigImgArr });
		} else {
			objPublic_bigImg = React.createElement("i", null);
		}

		if (me.state.imgArr != "") {
			imgUrlList = [];
			var imgHeight = $(".getImg-bg1").width();
			for (var i = 0; i < me.state.imgArr.length; i++) {
				imgUrlList.push(React.createElement(
					"div",
					{ className: "col-xs-4 col-sm-4 getImg-img", key: i },
					React.createElement("img", { className: "getImg-bg", src: me.state.imgArr[i] + "@500h_500w_1e_1c", "data-obj_img": "cardArr", "data-obj_img_index": i, onClick: Fc_bindBigImg.bindBigImg, onError: me.imgError }),
					React.createElement("img", { className: "getImg-delete", onClick: me.getImgDelete.bind(this, i), src: "image/setcard/setcard-10.png" })
				));
			}
			/*me.setState({bigImgArr:getBigImgArr});
   console.info("2---"+me.state.bigImgArr[0].url);*/
		} else {
			imgUrlList = React.createElement("i", null);
		}

		return React.createElement(
			"div",
			{ className: "container main", style: { minHeight: mainHeight } },
			React.createElement(
				"div",
				{ className: "row msg" },
				React.createElement("textarea", { className: "col-xs-12 col-sm-12", id: "msgInfo", onPropertyChange: me.test, onFocus: me.msgInfoFocus, onBlur: me.msgInfoBlur, placeholder: "\u4ECA\u5929\u7684\u8868\u73B0\u600E\u4E48\u6837\uFF5E" })
			),
			React.createElement(
				"div",
				{ className: "row getImg" },
				imgUrlList,
				React.createElement(
					"div",
					{ className: "col-xs-4 col-sm-4 getImg-add" },
					React.createElement("img", { className: "getImg-bg1", onClick: me.getImgBg, src: "http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-11.png" })
				)
			),
			React.createElement(
				"div",
				{ className: "row selectCard" },
				React.createElement(
					"span",
					null,
					"\u9009\u62E9\u6253\u5361\u6807\u7B7E"
				)
			),
			objPublic_bigImg,
			React.createElement(
				"div",
				{ className: "row icon-list" },
				React.createElement(
					"div",
					{ className: "icon", onClick: me.selectTag.bind(this, 0) },
					React.createElement("img", { src: "http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-2.png" })
				),
				React.createElement(
					"div",
					{ className: "icon", onClick: me.selectTag.bind(this, 1) },
					React.createElement("img", { src: "http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-3.png" })
				),
				React.createElement(
					"div",
					{ className: "icon", onClick: me.selectTag.bind(this, 2) },
					React.createElement("img", { src: "http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-4.png" })
				),
				React.createElement(
					"div",
					{ className: "icon", onClick: me.selectTag.bind(this, 3) },
					React.createElement("img", { src: "http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-5.png" })
				),
				React.createElement(
					"div",
					{ className: "icon", onClick: me.selectTag.bind(this, 4) },
					React.createElement("img", { src: "http://cdn2.picooc.com/web/res/fatburn/image/setcard/setcard-7.png" })
				)
			)
		);
	}
});

var BtnContainer = React.createClass({
	displayName: "BtnContainer",

	footbtnFc: function footbtnFc() {
		if (publicData.btnShow) {
			setMaiDian(SXueYuanDaKa.SCategory_SXueYuanDaKa, SXueYuanDaKa.SXueYuanDaKa_DianJiDaKa);
			if (parseInt(getParamByUrl("source")) == 1) {
				setMaiDian(SXueYuanDaKa.SCategory_SXueYuanDaKa, SXueYuanDaKa.SXueYuanDaKa_ShouYeDianJiDaKa);
			}
			var imgs = [];
			for (var i = 0; i < publicData.loadImg.length; i++) {
				imgs.push({ "url": publicData.loadImg[i], "labels": [] });
			};
			imgs = JSON.stringify(imgs);
			console.log(imgs);
			var content = $.trim($("#msgInfo").val());
			content = content.replace(/\%/g, "%25");
			content = content.replace(/\&/g, "%26");
			content = content.replace(/\+/g, "%2B");
			content = content.replace(/\#/g, "%23");
			content = content.replace(/\n/g, "<br />");
			var finalUrl = ajaxLink + "/v1/api/campStu/checkIn" + window.location.search + "&type=" + publicData.btnType + "&content=" + content + "&imgs=" + imgs;

			//var finalUrl="http://pm.picooc.com:9989/v1/api/camp/checkIn?roleId="+roleId+"&type="+btnType+"&content="+$("#msgInfo").val()+"&imgs="+imgs;
			$.ajax({
				type: "get",
				url: finalUrl,
				dataType: "json",
				success: function success(data) {
					if (data.code == 200) {
						setCookie("setCardL", "1", 1);
						setCookie("setCardId", data.resp, 1);
						if (getParamByUrl("os") == "iOS") {
							localStorage.setItem("setCardL", "1");
							localStorage.setItem("setCardId", data.resp);
						}
						if (getParamByUrl("testtype") == "tanchao") {
							console.log(imgs);
						} else if (parseInt(getParamByUrl("source")) == 1) {
							window.location.href = ajaxLink + "/web/fatburn/student.html" + window.location.search;
						} else {
							var deviceType = isMobile();
							if (deviceType == "isApp" && getParamByUrl("testtype") != "tanchao") {
								var getPageInfo = function getPageInfo() {
									var data = {
										backNum: 1, //默认为1，
										closeWebview: 0 //默认为0
									};
									return JSON.stringify(data);
								};
								appFc.deleteHistory(getPageInfo());
							} else {
								window.location.href = ajaxLink + "/web/fatburntestReact/student.html" + window.location.search;
							}
						}
					} else {
						// alert(data.result.message);
						$(".error-main-t").html(data.result.message);
						$(".errorAlert").css("display", "block");
						$(".error-main").css("margin-top", -$(".error-main").height() / 2);
					}
				}
			});
		}
	},
	render: function render() {
		var me = this;
		return React.createElement(
			"div",
			null,
			React.createElement(
				"div",
				{ className: "row footbtn" },
				React.createElement(
					"div",
					{ className: "col-xs-12 col-sm-12 footbtn-btn", onClick: me.footbtnFc },
					"\u6253\u5361"
				)
			)
		);
	}
});

var Component = React.createClass({
	displayName: "Component",

	render: function render() {
		return React.createElement(
			"div",
			null,
			React.createElement(CardContainer, null),
			React.createElement(BtnContainer, null),
			React.createElement(Public_error, null),
			React.createElement(Version, null)
		);
	}
});
ReactDOM.render(React.createElement(Component, null), document.getElementById('cardContainer'));

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

/***/ })

},[235]);