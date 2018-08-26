webpackJsonp([10],{

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

/***/ 211:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(1);
var Public_Error = __webpack_require__(3);
var PubSub = __webpack_require__(2);
// 引入缩略图组件
var Public_BIGImg = __webpack_require__(10);
var Fc_bindBigImg = __webpack_require__(6);

var uploadtype = "";
var isshowbtn1 = 0,
    isshowbtn2 = 0; //上传按钮颜色判断
var UpLoadHandleClickBtn = true; //防止连续点击
var sex = ""; //学员性别
var waistMeasureId = ""; //腰围ID
var weightIndex = 0; //默认选中的体重体脂数据索引
var weight = ""; //被选中的体重数值
var fat = ""; //被选中的脂肪数值
// var waistMeasure = "";
var init = 0; //初始化页面状态
var campId = getParamByUrl("campId");
var roleId = getParamByUrl("roleId");
var strTime = "";
var SBianJiZhaoPian = {
	SCategory_SBianJiZhaoPian: 5061000,
	SBianJiZhaoPian_XuanZePaiZhaoRiQi: 5061001, //选择拍照日期
	SBianJiZhaoPian_ShangChuanZhengMianZhao: 5061002, //上传正面照
	SBianJiZhaoPian_ShangChuanCeMianZhao: 5061003, //上传侧面照
	SBianJiZhaoPian_ChaKanShangChuanYaoQiu: 5061004, //查看拍摄及上传要求
	SBianJiZhaoPian_TianJiaTiZhi: 5061005, //添加体脂数据
	SBianJiZhaoPian_TianJiaYaoWei: 5061006, //添加腰围数据
	SBianJiZhaoPian_XuanZeTiZhi: 5061007, //选择体脂数据
	SBianJiZhaoPian_QuXiaoXuanZeTiZhi: 5061008, //取消选择体脂数据
	SBianJiZhaoPian_XuanZeYaoWei: 5061009, //选择腰围数据
	SBianJiZhaoPian_QuXiaoXuanZeYaoWei: 5061010, //取消选择腰围数据
	SBianJiZhaoPian_ShangChuan: 5061011, //点击完成按钮
	SBianJiZhaoPian_ShanChuZhaoPian: 5061012, //删除照片
	SBianJiZhaoPian_XianShiYuLanTu: 5061013, //显示预览图
	SBianJiZhaoPian_QuXiaoXuanZeShiJian: 5061014, //取消选择时间
	SBianJiZhaoPian_XuanZeShiJian: 5061015 //选择时间
};

// 设置图片存储对象
var publicData = {
	objImg: {
		'frontIMG': [],
		'asideIMG': []
	}
};
window.publicData = publicData;
leftBtnShow();
// window.loadImg = loadImg;
// 体重脂肪选择组件
var FatWeigthSelect = React.createClass({
	displayName: "FatWeigthSelect",

	getInitialState: function getInitialState() {
		return {
			weightDate: '',
			initHTMLData: {}
		};
	},
	componentDidMount: function componentDidMount() {
		PubSub.subscribe('initHTMLData', function (ev, initHTMLData) {
			this.setState({
				initHTMLData: initHTMLData
			});
		}.bind(this));
	},
	// 点击取消，并隐藏选项
	CancelClick: function CancelClick(event) {
		var ele = ReactDOM.findDOMNode(this.refs.backscroll_weight);
		ele.style.display = 'none';
		leftBtnShow();
		setMaiDian(SBianJiZhaoPian.SCategory_SBianJiZhaoPian, SBianJiZhaoPian.SBianJiZhaoPian_QuXiaoXuanZeTiZhi);
	},
	// 点击确认，并隐藏选项
	SureClick: function SureClick(event) {
		event.stopPropagation();
		event.stopPropagation();
		var ele = ReactDOM.findDOMNode(this.refs.backscroll_weight);
		ele.style.display = 'none';
		var initHTMLData = this.state.initHTMLData;
		weight = $(".backscroll-weight .swiper-wrapper .swiper-slide").eq(weightIndex).find(".selectweight-weight").html();
		fat = $(".backscroll-weight .swiper-wrapper .swiper-slide").eq(weightIndex).find(".selectweight-fat").html();
		initHTMLData.weight = '：' + weight + 'KG/';
		initHTMLData.fat = fat + '%';
		initHTMLData.weightDate = weight;
		initHTMLData.fatDate = fat;
		PubSub.publish('initHTMLData', initHTMLData);
		var del = document.querySelector('#weightdata .clear');
		if (initHTMLData.weight == "" && initHTMLData.fat == '') {
			del.style.display = 'none';
		} else {
			del.style.display = 'block';
		}
		leftBtnShow();
		setMaiDian(SBianJiZhaoPian.SCategory_SBianJiZhaoPian, SBianJiZhaoPian.SBianJiZhaoPian_XuanZeTiZhi);
	},
	// 点击选择
	OptionHandleClick: function OptionHandleClick(event) {
		var initHTMLData = this.state.initHTMLData;
		event.stopPropagation();
		var ele = event.currentTarget;

		// $(ele).siblings().css('backgroundImage', 'url(http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/nopick.png)').removeClass('actived');
		// $(ele).css('backgroundImage', 'url(http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/pick.png)').addClass('actived');
		$(ele).siblings().find(".selectImg").attr('src', 'https://cdn2.picooc.com/web/res/fatburn/image/figureContrast/nopick.png');
		$(ele).find(".selectImg").attr('src', 'https://cdn2.picooc.com/web/res/fatburn/image/figureContrast/pick.png');

		weightIndex = $(".backscroll-weight .swiper-wrapper .swiper-slide").index(ele); //被选中元素的索引
	},
	render: function render() {
		var weightDate = this.props.data_fat;
		var HTMLarr = [];
		for (var i = 0; i < weightDate.length; i++) {
			HTMLarr.push(React.createElement(
				"div",
				{ className: "swiper-slide ", key: i, onClick: this.OptionHandleClick, ref: "weight_date" },
				React.createElement(
					"span",
					{ className: "col-xs-5 col-sm-5 selectweight-date" },
					weightDate[i].time
				),
				React.createElement(
					"div",
					{ className: "col-xs-3 col-sm-3", style: { 'display': 'inlineBlock' } },
					React.createElement(
						"span",
						{ className: "selectweight-fat" },
						weightDate[i].bodyFat
					),
					React.createElement(
						"span",
						null,
						"%"
					)
				),
				React.createElement(
					"div",
					{ className: "col-xs-3 col-sm-3", style: { 'display': 'inlineBlock' } },
					React.createElement(
						"span",
						{ className: "selectweight-weight" },
						weightDate[i].weight
					),
					React.createElement(
						"span",
						null,
						"KG"
					)
				),
				React.createElement("img", { className: "selectImg", src: "https://cdn2.picooc.com/web/res/fatburn/image/figureContrast/nopick.png" })
			));
		}
		return React.createElement(
			"div",
			{ className: "backscroll-weight", ref: "backscroll_weight" },
			React.createElement(
				"div",
				{ className: "select-container" },
				React.createElement(
					"div",
					{ className: "select-title" },
					React.createElement("div", { className: "select-cancel", onClick: this.CancelClick }),
					React.createElement(
						"div",
						{ className: "select-head" },
						"\u9009\u62E9\u6570\u636E"
					),
					React.createElement("div", { className: "select-sure", onClick: this.SureClick })
				),
				React.createElement("div", { className: "col-xs-12 col-sm-12 line-1px" }),
				React.createElement(
					"div",
					{ className: "select-content swiper-container" },
					React.createElement(
						"div",
						{ className: "swiper-wrapper" },
						HTMLarr
					)
				)
			)
		);
	}
});
// 图片展示区域
var ImgUpLoadArea = React.createClass({
	displayName: "ImgUpLoadArea",

	getInitialState: function getInitialState() {
		return {
			uploadtype: '',
			isHaveImg: {}, //判断是否上传图片
			frontPicture: '', //正面照片URL
			facePicture: '', //侧面照片URL,
			initHTMLData: {} //存储页面数据
		};
	},
	componentWillMount: function componentWillMount() {
		var isLoadImgFro, isLoadImgAsi;
		var pictureId = getParamByUrl("imgId");
		var finalUrl = ajaxLink + "/v1/api/campStu/gitPicture" + window.location.search + "&pictureId=" + pictureId;
		this.serverRequest = $.get(finalUrl, function (data) {
			if (data.code == 200) {
				if (data.resp.waistMeasureId != "" && data.resp.waistMeasureId != null) {
					var waistMeasureId = data.resp.waistMeasureId; //腰围id
				} else {
					var waistMeasureId = '';
				}
				if (data.resp.frontPicture != "" && data.resp.frontPicture != null) {
					$("#front").css("background-image", 'url(' + data.resp.frontPicture + ')');
					$(".delete1").show();
					$(".upload").css("background-color", "#7fa9ff");
					isshowbtn1 = 1;
					isLoadImgFro = 1;
					var frontPicture = data.resp.frontPicture;
				} else {
					isLoadImgFro = 0;
					var frontPicture = '';
				}
				if (data.resp.facePicture != "" && data.resp.facePicture != null) {
					$("#side").css("background-image", 'url(' + data.resp.facePicture + ')');
					$(".delete2").show();
					$(".upload").css("background-color", "#7fa9ff");
					isshowbtn2 = 1;
					var facePicture = data.resp.facePicture;
					isLoadImgAsi = 1;
				} else {
					isLoadImgAsi = 0;
					var facePicture = '';
				}
				if (data.resp.time != '' && data.resp.time != null) {
					var currentDate = data.resp.time;
				} else {
					var currentDate = '';
				}
				if (data.resp.day != '' && data.resp.day != null) {
					var days = data.resp.day;
				} else {
					var day = '';
				}
				if (data.resp.weight != "" && data.resp.fat != "" && data.resp.weight != null && data.resp.fat != null) {
					// $("#weightdata").append('：'+data.resp.weight+'KG/'+data.resp.fat+'%<span class="clear"></span>');
					// $("#weightdata").append('：' + '<span id="weight">' + data.resp.weight + '</span>' + 'KG/' + '<span id="fat">' + data.resp.fat + '</span>' + '%<span class="clear"></span>');
					var weight = '：' + data.resp.weight + 'KG/';
					var fat = data.resp.fat + '%';
				} else {
					var weight = '';
					var fat = '';
				}
				if (data.resp.waistMeasure != "" && data.resp.waistMeasure != null) {
					var waistMeasure = '：' + data.resp.waistMeasure + 'CM';
					// $("#waistdata").append('：' + data.resp.waistMeasure + 'CM<span class="clear"></span>');
				} else {
					var waistMeasure = '';
				}
				var initHTMLData = {
					waistMeasureId: waistMeasureId,
					facePicture: facePicture,
					frontPicture: frontPicture,
					currentDate: currentDate,
					days: days,
					weight: weight,
					fat: fat,
					waistMeasure: waistMeasure,
					waistMeasureDate: data.resp.waistMeasure,
					weightDate: data.resp.weight,
					fatDate: data.resp.fat
				};
				// console.log(initHTMLData);
				var isHaveImg = {
					isLoadImgFro: isLoadImgFro,
					isLoadImgAsi: isLoadImgAsi
				};
				PubSub.publish('isHaveImg', isHaveImg);
				PubSub.publish('initHTMLData', initHTMLData);
				//获取学员历史身体数据
				setTimeout(function () {
					getCampBodyIndexData(0);
				}, 0);
				// getCampBodyIndexData(0);
				publicData.objImg = {
					asideIMG: [{ 'url': facePicture }],
					frontIMG: [{ 'url': frontPicture }]
				};
			} else {
				$(".error-main-t").html(data.result.message);
				$(".errorAlert").css("display", "block");
				$(".error-main").css("margin-top", -$(".error-main").height() / 2);
			}
		}.bind(this));
	},
	getImg: function getImg(url) {
		var isHaveImg = this.state.isHaveImg;
		var initHTMLData = this.state.initHTMLData;
		if (this.state.uploadtype == 0) {
			$("#front").removeClass("front-default");
			for (var i = 0; i < url.length; i++) {
				$("#front").css("background-image", 'url(' + url[i] + ')');
				initHTMLData.frontPicture = url[i];
			}
			publicData.objImg['frontIMG'].push({ 'url': $("#front").css("background-image").replace("url(", "").replace(")", "") });
			// $("#front").addClass("getImg-bg");
			$(".delete1").show();
			$(".upload").css("background-color", "#7fa9ff");
			isHaveImg.isLoadImgFro = 1;
			isshowbtn1 = 1;
		} else if (this.state.uploadtype == 1) {
			// $("#side").removeClass("side-default");
			for (var i = 0; i < url.length; i++) {
				$("#side").css("background-image", 'url(' + url[i] + ')');
				initHTMLData.facePicture = url[i];
			}
			publicData.objImg['asideIMG'].push({ 'url': $("#side").css("background-image").replace("url(", "").replace(")", "") });
			isHaveImg.isLoadImgAsi = 1;
			isshowbtn2 = 1;
			$(".delete2").show();
			$(".upload").css("background-color", "#7fa9ff");
		}
		PubSub.publish('isHaveImg', isHaveImg);
		PubSub.publish('initHTMLData', initHTMLData);
	},
	//点击添加正面照片 
	AddfrontImgHandleClick: function AddfrontImgHandleClick(event) {
		event.stopPropagation();
		this.state.uploadtype = 0;
		if (getParamByUrl("testtype") == "tanchao") {
			this.getImg(["http://cdn2.picooc.com/web/res/event/bottle/image/msg-2.png", "http://cdn2.picooc.com/web/res/event/bottle/image/bg1.jpg"]);
		} else {
			var t2 = setTimeout(function () {
				var deviceType4 = isMobile();
				if (deviceType4 == "isApp" && getParamByUrl("testtype") != "tanchao") {
					var data = {
						maxNum: 1, //上传图片的最大个数
						imageType: "bodyImg"
					};
					data = JSON.stringify(data);
					appFc.uploadImg(data);
				}
				clearTimeout(t2);
			}, 250);
		};
		setMaiDian(SBianJiZhaoPian.SCategory_SBianJiZhaoPian, SBianJiZhaoPian.SBianJiZhaoPian_ShangChuanZhengMianZhao);
	},
	// 点击添加侧面照片
	AddsideImgHandleClick: function AddsideImgHandleClick(event) {
		// event.preventDefault();
		event.stopPropagation();
		this.state.uploadtype = 1;
		if (getParamByUrl("testtype") == "tanchao") {
			this.getImg(["http://cdn2.picooc.com/web/res/event/bottle/image/msg-2.png", "http://cdn2.picooc.com/web/res/event/bottle/image/bg1.jpg"]);
		} else {
			var t2 = setTimeout(function () {
				var deviceType4 = isMobile();
				if (deviceType4 == "isApp" && getParamByUrl("testtype") != "tanchao") {
					var data = {
						maxNum: 1, //上传图片的最大个数
						imageType: "bodyImg"
					};
					data = JSON.stringify(data);
					appFc.uploadImg(data);
				}
				clearTimeout(t2);
			}, 250);
		};
		setMaiDian(SBianJiZhaoPian.SCategory_SBianJiZhaoPian, SBianJiZhaoPian.SBianJiZhaoPian_ShangChuanCeMianZhao);
	},
	// 点击删除正面照片
	DelFrontHandleClick: function DelFrontHandleClick(event) {
		var isHaveImg = this.state.isHaveImg;
		event.stopPropagation();
		// $("#front").removeClass("getImg-bg");
		publicData.objImg['frontIMG'] = [];
		$("#front").css("background-image", "url(http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/front.png)");
		$("#front").addClass("front-default");
		var ele = ReactDOM.findDOMNode(this.refs.frontImg);
		ele.style.display = 'none';
		isHaveImg.isLoadImgFro = 0;
		isshowbtn1 = 0;
		if (isshowbtn2 == 0) {
			$(".upload").css("background-color", "#bbbbbb");
		};
		PubSub.publish('isHaveImg', isHaveImg);
		setMaiDian(SBianJiZhaoPian.SCategory_SBianJiZhaoPian, SBianJiZhaoPian.SBianJiZhaoPian_ShanChuZhaoPian);
	},
	// 点击删除侧面照片
	DelAsideHandleClick: function DelAsideHandleClick(event) {
		event.stopPropagation();
		var isHaveImg = this.state.isHaveImg;
		$("#side").removeClass("getImg-bg");
		publicData.objImg['asideIMG'] = [];
		$("#side").css("background-image", "url(http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/side.png)");
		$("#side").addClass("side-default");
		var ele = ReactDOM.findDOMNode(this.refs.asideImg);
		ele.style.display = 'none';
		isHaveImg.isLoadImgAsi = 0;
		isshowbtn2 = 0;
		PubSub.publish('isHaveImg', isHaveImg);
		if (isshowbtn1 == 0) {
			$(".upload").css("background-color", "#bbbbbb");
		};
		setMaiDian(SBianJiZhaoPian.SCategory_SBianJiZhaoPian, SBianJiZhaoPian.SBianJiZhaoPian_ShanChuZhaoPian);
	},
	componentDidMount: function componentDidMount() {
		var frontEle = ReactDOM.findDOMNode(this.refs.front);
		var sideEle = ReactDOM.findDOMNode(this.refs.side);
		frontEle.style.height = frontEle.offsetWidth * 408 / 306 + 'px';
		sideEle.style.height = sideEle.offsetWidth * 408 / 306 + 'px';
		PubSub.subscribe('isHaveImg', function (ev, data) {
			this.setState({
				isHaveImg: data
			});
		}.bind(this));
		PubSub.subscribe('initHTMLData', function (ev, initHTMLData) {
			this.setState({
				initHTMLData: initHTMLData
			});
		}.bind(this));
	},
	render: function render() {
		window.getImg = this.getImg;
		var isLoadImgFro = this.state.isHaveImg.isLoadImgFro;
		var isLoadImgAsi = this.state.isHaveImg.isLoadImgAsi;
		var uploadImgHTMLFro, uploadImgHTMLAsi;
		if (isLoadImgFro == 0) {
			uploadImgHTMLFro = React.createElement(
				"div",
				{ id: "front", ref: "front", className: "uploadImg-img front front-default", onClick: this.AddfrontImgHandleClick, "data-obj_img": "frontIMG" },
				React.createElement("div", { className: "delete1", ref: "frontImg" })
			);
		} else {
			uploadImgHTMLFro = React.createElement(
				"div",
				{ id: "front", ref: "front", className: "uploadImg-img front front-default", onClick: Fc_bindBigImg.bindBigImg, "data-obj_img": "frontIMG" },
				React.createElement("div", { className: "delete1", ref: "frontImg", onClick: this.DelFrontHandleClick })
			);
		}
		if (isLoadImgAsi == 0) {
			uploadImgHTMLAsi = React.createElement(
				"div",
				{ id: "side", ref: "side", className: "uploadImg-img side side-default", onClick: this.AddsideImgHandleClick, "data-obj_img": "asideIMG" },
				React.createElement("div", { className: "delete2", ref: "asideImg" })
			);
		} else {
			uploadImgHTMLAsi = React.createElement(
				"div",
				{ id: "side", ref: "side", className: "uploadImg-img side side-default", onClick: Fc_bindBigImg.bindBigImg, "data-obj_img": "asideIMG" },
				React.createElement("div", { className: "delete2", onClick: this.DelAsideHandleClick, ref: "asideImg" })
			);
		}
		return React.createElement(
			"aside",
			{ className: "uploadImg" },
			uploadImgHTMLFro,
			uploadImgHTMLAsi
		);
	}
});
// 拍摄以及上传要求
var UploadQuestion = React.createClass({
	displayName: "UploadQuestion",

	CancelClick: function CancelClick(event) {
		event.stopPropagation();
		var ele = ReactDOM.findDOMNode(this.refs.prompt_back);
		ele.style.display = 'none';
		leftBtnShow();
	},
	render: function render() {
		var ContainerStyle = {
			'height': document.body.scrollHeight
		};
		var promptmain_style = {
			'width': document.body.scrollWidth - 50
		};
		return React.createElement(
			"aside",
			{ className: "row prompt-back", style: ContainerStyle, ref: "prompt_back", onClick: this.HideClick },
			React.createElement(
				"div",
				{ className: "col-xs-12 col-sm-12 prompt-main", style: promptmain_style },
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"span",
						{ className: "title" },
						"\u62CD\u6444\u53CA\u4E0A\u4F20\u8981\u6C42"
					),
					React.createElement("img", { className: "del", src: "image/figureContrast/no.png", onClick: this.CancelClick })
				),
				React.createElement(
					"div",
					{ className: "prompt-pic col-xs-12 col-sm-12" },
					React.createElement("div", { className: "prompt-pic-left col-xs-6 col-sm-6" }),
					React.createElement("div", { className: "prompt-pic-right col-xs-6 col-sm-6" })
				),
				React.createElement(
					"div",
					{ className: "col-xs-12 col-sm-12" },
					React.createElement(
						"div",
						{ className: "col-xs-6 col-sm-6 example" },
						"\u6B63\u9762\u7167\u793A\u4F8B"
					),
					React.createElement(
						"div",
						{ className: "col-xs-6 col-sm-6 example" },
						"\u4FA7\u9762\u7167\u793A\u4F8B"
					)
				),
				React.createElement(
					"div",
					{ className: "col-xs-12 col-sm-12 content" },
					React.createElement(
						"p",
						null,
						"\u2022 \u62CD\u6444\u89D2\u5EA6\uFF1A\u6B63\u3001\u4FA7\u9762\u7167\u7247\u5404\u4E00\u5F20\uFF0C\u89D2\u5EA6\u6E05\u6670\uFF0C\u9732\u51FA\u80A9\u81C2\u3001\u8170\u8179\u3001\u53CC\u817F\uFF1B"
					),
					React.createElement(
						"p",
						null,
						"\u2022 \u62CD\u6444\u4F4D\u7F6E\uFF1A\u5C3D\u91CF\u4FDD\u8BC1\u540C\u4E00\u4E2A\u5730\u65B9\u3001\u540C\u4E00\u4E2A\u89D2\u5EA6\u8FDB\u884C\u62CD\u6444\uFF1B"
					),
					React.createElement(
						"p",
						null,
						"\u2022 \u4E0A\u4F20\u6B21\u6570\uFF1A\u81F3\u5C11\u5728\u5F00\u8425\u524D\u3001\u4E2D\u3001\u540E\u5206\u522B\u62CD\u6444\u4E09\u6B21\u7167\u7247\uFF0C\u5E76\u6DFB\u52A0\u4F53\u91CD\u3001\u4F53\u8102\u548C\u8170\u56F4\uFF1B"
					)
				)
			)
		);
	}
});
// 图片上传总容器
var ImgUpLoad = React.createClass({
	displayName: "ImgUpLoad",

	getInitialState: function getInitialState() {
		var editTitleData = {
			title: '编辑照片',
			color: "",
			opacity: "",
			backgroundColor: "",
			backgroundOpacity: ""
		};
		editTitleData = JSON.stringify(editTitleData);
		appFc.controlTitle(editTitleData);
		return {
			DateList: [],
			DateHTMLArr: [],
			currentDate: '',
			strTime: '',
			days: '',
			dateListLen: '',
			weightDate: '',
			startX: '',
			startY: '',
			moveEndX: '',
			moveEndY: '',
			minNum2: '',
			testLeft: '',
			leftNum: '',
			isWeightDate: 0, //体重脂肪是否有数据,
			bigImgArr: [], //预览图存放数组
			initHTMLData: {} //页面数据存放对象

		};
	},
	componentWillMount: function componentWillMount() {
		var finalUrl = ajaxLink + "/v1/api/campCommon/campDateList" + window.location.search + "&campId=" + campId;
		this.serverRequest = $.get(finalUrl, function (data) {
			if (data.code == 200) {
				if (data.resp.dateList.length > 0) {
					var dateListLen = data.resp.dateList.length; //日期列表长度
					// var currentDate = data.resp.dateList[data.resp.dateList.length - 1].date;//获取当前日期
					var strTime = data.resp.dateList[data.resp.dateList.length - 1].time; //获取当前时间
					var DateList = data.resp.dateList;
					var DateHTMLArr = [];
					for (var i = 0; i < DateList.length; i++) {
						DateHTMLArr.push(React.createElement(
							"div",
							{ className: "swiper-slide", "data-time": DateList[i].time, key: i },
							DateList[i].date
						));
					}
					this.setState({
						DateList: DateList,
						// currentDate: currentDate,
						strTime: strTime,
						DateHTMLArr: DateHTMLArr,
						dateListLen: dateListLen
					});
				}
			} else {
				$(".error-main-t").html(data.result.message);
				$(".errorAlert").css("display", "block");
				$(".error-main").css("margin-top", -$(".error-main").height() / 2);
			}
		}.bind(this));
	},
	componentDidMount: function componentDidMount() {
		PubSub.subscribe('bigImgData', function (ev, bigImgDate) {
			this.setState({
				bigImgArr: bigImgDate
			});
		}.bind(this));
		PubSub.subscribe("initHTMLData", function (evName, initHTMLData) {
			if (initHTMLData.weight == '' || initHTMLData.weight == null) {
				$('#weightdata .clear').hide();
			}
			if (initHTMLData.fat == '' || initHTMLData.fat == null) {
				$('#weightdata .clear').hide();
			}
			if (initHTMLData.waistMeasure == '' || initHTMLData.waistMeasure == null) {
				$('#waistdata .clear').hide();
			}
			this.setState({ initHTMLData: initHTMLData });
		}.bind(this));
		if (window.innerWidth > 365) {
			$(".weight-name").css("width", "20%");
			$("#weightdata").css("width", "76%");
		} else if (window.innerWidth < 365 && window.innerWidth > 340) {
			$(".weight-name").css("width", "21%");
			$("#weightdata").css("width", "74%");
		} else if (window.innerWidth >= 320 && window.innerWidth < 340) {
			$(".weight-name").css("width", "22%");
			$("#weightdata").css("width", "73%");
		}
	},
	// 点击上传图片
	UpLoadHandleClick: function UpLoadHandleClick(event) {
		event.stopPropagation();
		var initHTMLData = this.state.initHTMLData;
		var frontPicture = initHTMLData.frontPicture;
		var facePicture = initHTMLData.facePicture;
		var waistMeasure = initHTMLData.waistMeasureDate;
		var waistMeasureId = initHTMLData.waistMeasureId;
		if (isshowbtn1 == 0) {
			var frontPicture = "";
		}
		if (isshowbtn2 == 0) {
			var facePicture = "";
		}
		console.log(isshowbtn1);
		console.log(isshowbtn2);
		var day = $("#dayc").html();
		var time = $("#selectdate").html();
		var campPictureId = getParamByUrl("imgId");
		if ((isshowbtn1 != 0 || isshowbtn2 != 0) && UpLoadHandleClickBtn) {
			UpLoadHandleClickBtn = false;
			if (initHTMLData.waistMeasureDate == null) {
				initHTMLData.waistMeasureDate = "";
			}
			if (initHTMLData.weightDate == null) {
				initHTMLData.weightDate = "";
			}
			if (initHTMLData.fatDate == null) {
				initHTMLData.fatDate = "";
			}
			var dayUrl = ajaxLink + "/v1/api/campStu/updatePicture" + window.location.search + "&id=" + campPictureId + "&frontPicture=" + frontPicture + "&facePicture=" + facePicture + "&weight=" + initHTMLData.weightDate + "&fat=" + initHTMLData.fatDate + "&waistMeasure=" + initHTMLData.waistMeasureDate + "&day=" + initHTMLData.days + "&time=" + initHTMLData.currentDate + "&waistMeasureId=" + initHTMLData.waistMeasureId;

			$.ajax({
				type: "get",
				url: dayUrl,
				dataType: "json",
				success: function success(data) {
					UpLoadHandleClickBtn = true;
					if (data.code == 200) {
						// alert(JSON.stringify(data));
						$(".upload").css("opacity", "0.6");
						if (data.resp.waistMeasureId && data.resp.waistMeasureId != null && data.resp.waistMeasureId != "") {

							if (waistMeasure == "" || waistMeasure == null) {
								waistMeasure = 0;
							}
							waistMeasureId = data.resp.waistMeasureId;
							var getPageInfo9 = function getPageInfo9() {
								var param = {
									roleId: roleId,
									serverId: waistMeasureId,
									girthNum: waistMeasure,
									time: data.resp.operateTrime
									// isDelete:false,  //删除体围标识，true是，false否
								};
								return JSON.stringify(param);
							};
							var deviceType = isMobile();
							if (deviceType == "isApp" && getParamByUrl("testtype") != "tanchao") {
								appFc.changeGirth(getPageInfo9());
							}
						} else {
							if (waistMeasure == "" || waistMeasure == null) {
								waistMeasure = 0;
							}
							var getPageInfo9 = function getPageInfo9() {
								var param = {
									roleId: roleId,
									serverId: waistMeasureId,
									girthNum: waistMeasure,
									time: data.resp.operateTrime
									// isDelete:false,  //删除体围标识，true是，false否
								};
								return JSON.stringify(param);
							};
							var deviceType = isMobile();
							if (deviceType == "isApp" && getParamByUrl("testtype") != "tanchao") {
								appFc.changeGirth(getPageInfo9());
							}
						}
						var deviceType = isMobile(); //判断是不是app的方法
						if (deviceType == "isApp" && getParamByUrl("testtype") != "tanchao") {
							if (getParamByUrl("os") == "android") {
								var getPageInfo2 = function getPageInfo2() {
									var data = {
										controlBtn: false,
										function: ""
									};
									return JSON.stringify(data);
								};
								appFc.showBackBtn(getPageInfo2());
							}
							var getPageInfo = function getPageInfo() {
								var data = {
									backNum: 1, //默认为1，
									closeWebview: 0 //默认为0
								};
								return JSON.stringify(data);
							};
							appFc.deleteHistory(getPageInfo());
						} else {
							if (getParamByUrl("imgId") != "false") {
								var searchLink = removeParamByUrl("imgId");
								window.location.href = "photoAlbum.html" + searchLink;
							} else {
								window.location.href = "photoAlbum.html" + window.location.search;
							}
						}
					} else {
						$(".error-main-t").html(data.result.message);
						$(".errorAlert").css("display", "block");
						$(".error-main").css("margin-top", -$(".error-main").height() / 2);
					}
				}
			});
		}
		setMaiDian(SBianJiZhaoPian.SCategory_SBianJiZhaoPian, SBianJiZhaoPian.SBianJiZhaoPian_ShangChuan);
	},
	// 点击显示拍摄要求
	ShowUploadSugHandle: function ShowUploadSugHandle(event) {
		var fontHeight = parseInt($("html").css("font-size"));
		var paddingTop = 1.4375 * fontHeight;
		if (window.innerHeight < 440) {
			$(".prompt-main").css("padding", "1rem 1.5625rem");
			$(".prompt-main .content p").css("margin-bottom", "0.5rem");
			paddingTop = 1 * fontHeight;
		}
		setMaiDian(SBianJiZhaoPian.SCategory_SBianJiZhaoPian, SBianJiZhaoPian.SBianJiZhaoPian_ChaKanShangChuanYaoQiu);
		//leftBtnHide();
		if (getParamByUrl("os") == "android") {
			var getPageInfo = function getPageInfo() {
				var data = {
					controlBtn: true,
					function: "promptAndroid"
				};
				return JSON.stringify(data);
			};
			var deviceType = isMobile();
			if (deviceType == "isApp" && getParamByUrl("testtype") != "tanchao") {
				appFc.showBackBtn(getPageInfo());
			}
		}
		$(".prompt-back").css("display", "block");
		$(".prompt-pic-left").css("height", $(".prompt-pic-left").width() * 4 / 3);
		$(".prompt-pic-right").css("height", $(".prompt-pic-left").width() * 4 / 3);
		$(".prompt-main").css("margin-top", -$(".prompt-main").height() / 2 - paddingTop);
	},
	// 展示时间选择列表
	showDate: function showDate() {
		$(".backscroll-time").css("height", $(window).height());
		$(".backscroll-time").show();
		//leftBtnHide();
		var dateListLen = this.state.dateListLen;
		var mySwiper1 = new Swiper('.backscroll-time .swiper-container', {
			direction: 'vertical',
			slidesPerView: 5,
			initialSlide: dateListLen - 1,
			centeredSlides: true
		});
		if (getParamByUrl("os") == "android") {
			var getPageInfo = function getPageInfo() {
				var data = {
					controlBtn: true,
					function: "dateAndroid"
				};
				return JSON.stringify(data);
			};
			var deviceType = isMobile();
			if (deviceType == "isApp" && getParamByUrl("testtype") != "tanchao") {
				appFc.showBackBtn(getPageInfo());
			}
		}
	},
	//入营天数计算
	getCampDay: function getCampDay(currentDate) {
		var initHTMLData = this.state.initHTMLData;
		var dayUrl = ajaxLink + "/v1/api/campCommon/campDay" + window.location.search + "&campId=" + campId + "&roleId=" + roleId + "&time=" + currentDate;
		this.serverRequest = $.get(dayUrl, function (data) {
			if (data.code == 200) {
				var days = data.resp;
				initHTMLData.days = data.resp;
				PubSub.publish('initHTMLData', initHTMLData);
			} else {
				$(".error-main-t").html(data.result.message);
				$(".errorAlert").css("display", "block");
				$(".error-main").css("margin-top", -$(".error-main").height() / 2);
			}
		}.bind(this));
	},
	// 确认选择
	SureHandleClick: function SureHandleClick(event) {
		event.stopPropagation();
		var initHTMLData = this.state.initHTMLData;
		initHTMLData.currentDate = $(".swiper-slide-active").html();
		PubSub.publish('initHTMLData', initHTMLData);
		this.HideTime();
		leftBtnShow();
		var strTime = $(".swiper-slide-active").attr("data-time");
		this.getCampDay(strTime);
		setMaiDian(SBianJiZhaoPian.SCategory_SBianJiZhaoPian, SBianJiZhaoPian.SBianJiZhaoPian_XuanZeShiJian);
	},
	// 取消选择
	CancelHandleClick: function CancelHandleClick(event) {
		event.stopPropagation();
		this.HideTime();
		leftBtnShow();
		setMaiDian(SBianJiZhaoPian.SCategory_SBianJiZhaoPian, SBianJiZhaoPian.SBianJiZhaoPian_QuXiaoXuanZeShiJian);
	},
	// 隐藏时间选择
	HideTime: function HideTime() {
		var ele = ReactDOM.findDOMNode(this.refs.backscroll_time);
		ele.style.display = 'none';
	},
	WeightHandleClick: function WeightHandleClick(event) {
		event.stopPropagation();
		//leftBtnHide();
		setMaiDian(SBianJiZhaoPian.SCategory_SBianJiZhaoPian, SBianJiZhaoPian.SBianJiZhaoPian_TianJiaTiZhi);
		var isWeightDate = this.state.isWeightDate;
		//如果没有体重脂肪数据
		if (isWeightDate == 1) {
			var fixBg_p = document.querySelector('.fixBg-p');
			var fixBg = document.querySelector('.fixBg');
			var fixBg_main = document.querySelector('.fixBg-main');
			fixBg_p.style.display = 'block';
			fixBg.style.display = 'block';
			fixBg_p.innerHTML = "暂无测量数据哦，赶快去上秤吧~";
			fixBg_main.style.marginTop = -fixBg_main.offsetHeight / 2;
			// $(".fixBg-main").css("margin-top", -$(".fixBg-main").height() / 2);
			setTimeout(function () {
				fixBg.style.display = 'none';
				fixBg_p.style.display = 'none';
			}, 1500);
		} else {
			this.getCampBodyIndexData(1);
		}
	},
	//学员历史身体数据
	getCampBodyIndexData: function getCampBodyIndexData(param) {
		var initHTMLData = this.state.initHTMLData;
		var time = initHTMLData.currentDate;
		// var time = $('#selectdate').html();
		var dayUrl = ajaxLink + "/v1/api/campCommon/campBodyIndexData" + window.location.search + "&campId=" + campId + "&roleId=" + roleId + "&time=" + time;
		this.serverRequest = $.get(dayUrl, function (data) {
			if (data.code == 200) {
				var weightDate;
				if (data.resp) {
					if (data.resp.sex) {
						sex = data.resp.sex;
					}
					if (data.resp.bodyIndexDate && data.resp.bodyIndexDate.length > 0) {
						weightDate = data.resp.bodyIndexDate;
						weightIndex = data.resp.beginIndex;
						this.setState({
							isWeightDate: 0,
							weightDate: weightDate
						});
						if (param == 1) {
							this.showWeight();
						}
					} else {
						this.setState({
							isWeightDate: 1
						});
					}
				}
			} else {
				$(".error-main-t").html(data.result.message);
				$(".errorAlert").css("display", "block");
				$(".error-main").css("margin-top", -$(".error-main").height() / 2);
			};
		}.bind(this));
	},
	//显示体重/脂肪选择
	showWeight: function showWeight() {
		var initHTMLData = this.state.initHTMLData;
		$(".backscroll-weight").css("height", $(window).height());
		$(".backscroll-weight").css("display", "block");
		var mySwiper2 = new Swiper('.backscroll-weight .swiper-container', {
			direction: 'vertical',
			initialSlide: weightIndex,
			slidesPerView: 5,
			centeredSlides: false
		});
		// $(".backscroll-weight .swiper-wrapper .swiper-slide").css("background-image", "url(http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/nopick.png)");
		// $(".backscroll-weight .swiper-wrapper .swiper-slide").eq(weightIndex).css("background-image", "url(http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/pick.png)").addClass('actived');
		$(".backscroll-weight .swiper-wrapper .selectImg").attr("src", "https://cdn2.picooc.com/web/res/fatburn/image/figureContrast/nopick.png");

		$(".backscroll-weight .swiper-wrapper .selectImg").eq(weightIndex).attr("src", "https://cdn2.picooc.com/web/res/fatburn/image/figureContrast/pick.png");

		if (getParamByUrl("os") == "android") {
			var getPageInfo = function getPageInfo() {
				var data = {
					controlBtn: true,
					function: "weightAndroid"
				};
				return JSON.stringify(data);
			};
			var deviceType = isMobile();
			if (deviceType == "isApp" && getParamByUrl("testtype") != "tanchao") {
				appFc.showBackBtn(getPageInfo());
			}
		}
	},
	// 删除选择的体重脂肪数据
	delWeightClick: function delWeightClick(event) {
		var initHTMLData = this.state.initHTMLData;
		initHTMLData.weight = '';
		initHTMLData.fat = '';
		initHTMLData.weightDate = "";
		initHTMLData.fatDate = "";
		event.preventDefault();
		event.stopPropagation();
		PubSub.publish('initHTMLData', initHTMLData);
		var ele = event.currentTarget;
		ele.style.display = 'none';
	},
	// 绘制腰围图
	getWaistList: function getWaistList() {
		var waistMeasure = this.state.initHTMLData.waistMeasureDate;
		console.log(waistMeasure);
		setMaiDian(SBianJiZhaoPian.SCategory_SBianJiZhaoPian, SBianJiZhaoPian.SBianJiZhaoPian_TianJiaYaoWei);
		// var sex = this.state.sex;
		$(".backscroll-waist").css("height", $(window).height());
		$(".backscroll-waist").css("display", "block");
		//leftBtnHide();
		//腰围画图开始
		// console.log(sex);
		var tScale = 2;
		var oC1 = $("#line").get(0);
		var oC1 = oC1.getContext('2d');
		var startNum = 70;
		console.log(sex);
		if (sex == 1) {
			startNum = 80;
			var linewidth = 14960;
			var iNum = 1360;
			var minNum = 48;
			var minNum2 = 4800;
			var leftNum = -13382;
		} else {
			startNum = 70;
			var linewidth = 13090;
			var iNum = 1190;
			var minNum = 42;
			var minNum2 = 4200;
			var leftNum = -11713;
		}
		this.setState({
			minNum2: minNum2,
			leftNum: leftNum
		});
		$("#line").css("width", linewidth + 'px');
		$("#line").css("height", 60 + 'px');
		$("#line").attr("width", linewidth * tScale);
		$("#line").attr("height", 60 * tScale);
		oC1.strokeStyle = "#000000";
		oC1.lineWidth = 1 * tScale;
		oC1.font = 12 * tScale + "px  Arial";
		for (var i = 1; i < iNum; i++) {
			if (i % 5 == 0) {
				oC1.beginPath();
				oC1.moveTo(10 * i * tScale + 1, 0);
				oC1.lineTo(10 * i * tScale + 1, 32 * tScale);
				oC1.strokeStyle = "#000000";
				oC1.stroke();
				oC1.textAlign = "center";
				oC1.fillText(minNum + i / 10, 10 * i * tScale + 1, 46 * tScale);
			} else {
				oC1.beginPath();
				oC1.moveTo(10 * i * tScale + 1, 8 * tScale);
				oC1.lineTo(10 * i * tScale + 1, 32 * tScale);
				oC1.strokeStyle = "#000000";
				oC1.stroke();
			}
		}
		if (waistMeasure != "" && waistMeasure != null) {
			startNum = waistMeasure;
		}
		$("#line-bg").css("left", parseInt($(window).width() / 2));
		$("#line").css("left", parseInt(parseInt($(window).width() / 2) + minNum2) - startNum * 100);
		$(".num").html((parseInt($(window).width() / 2) - parseInt($("#line").css("left")) + minNum2) / 100);
		if (getParamByUrl("os") == "android") {
			var getPageInfo = function getPageInfo() {
				var data = {
					controlBtn: true,
					function: "wasitAndroid"
				};
				return JSON.stringify(data);
			};
			var deviceType = isMobile();
			if (deviceType == "isApp" && getParamByUrl("testtype") != "tanchao") {
				appFc.showBackBtn(getPageInfo());
			}
		}
	},
	WaistTouchStart: function WaistTouchStart(event) {
		event.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动  
		var startX = event.changedTouches[0].pageX;
		var startY = event.changedTouches[0].pageY;
		var testLeft = parseInt($("#line").css("left"));
		this.setState({
			startX: startX,
			startY: startY,
			testLeft: testLeft
		});
	},
	WaistTouchMove: function WaistTouchMove(event) {
		event.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动  
		event.stopPropagation();
		var moveEndX = event.changedTouches[0].pageX;
		var moveEndY = event.changedTouches[0].pageY;
		var startX = this.state.startX,
		    startY = this.state.startY,
		    testLeft = this.state.testLeft,
		    leftNum = this.state.leftNum;
		var moveX = moveEndX - startX;
		var moveY = moveEndY - startY;

		if (testLeft + moveX > $(window).width() / 2) {
			$("#line").css("left", $(window).width() / 2);
		} else if (testLeft + moveX < leftNum - $(window).width() / 10) {
			$("#line").css("left", leftNum + "px");
		} else {
			$("#line").css("left", testLeft + moveX);
		}
	},
	WaistTouchEnd: function WaistTouchEnd(event) {
		event.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动  
		event.stopPropagation();
		var minNum2 = this.state.minNum2;
		$("#line").css("left", parseInt($("#line").css("left")) + (parseInt($(window).width() / 2) - parseInt($("#line").css("left"))) % 10);
		$(".num").html((parseInt($(window).width() / 2) - parseInt($("#line").css("left")) + minNum2) / 100);
	},
	WaistSureClick: function WaistSureClick(event) {
		var initHTMLData = this.state.initHTMLData;
		event.preventDefault();
		event.stopPropagation();
		var ele = ReactDOM.findDOMNode(this.refs.backscroll_waist);
		ele.style.display = 'none';
		var num = ele.querySelector('.num');
		initHTMLData.waistMeasure = '：' + num.innerHTML + 'CM';
		initHTMLData.waistMeasureDate = num.innerHTML;
		PubSub.publish('initHTMLData', initHTMLData);
		var clear = ReactDOM.findDOMNode(this.refs.delWaist);
		clear.style.display = 'block';
		leftBtnShow();
		setMaiDian(SBianJiZhaoPian.SCategory_SBianJiZhaoPian, SBianJiZhaoPian.SBianJiZhaoPian_XuanZeYaoWei);
	},
	WaistCancelClick: function WaistCancelClick(event) {
		event.preventDefault();
		event.stopPropagation();
		var ele = ReactDOM.findDOMNode(this.refs.backscroll_waist);
		ele.style.display = 'none';
		leftBtnShow();
		setMaiDian(SBianJiZhaoPian.SCategory_SBianJiZhaoPian, SBianJiZhaoPian.SBianJiZhaoPian_QuXiaoXuanZeYaoWei);
	},
	delWaist: function delWaist(event) {
		var initHTMLData = this.state.initHTMLData;
		event.preventDefault();
		event.stopPropagation();
		var ele = event.currentTarget;
		ele.style.display = 'none';
		var par = ele.parentNode;
		var node = par.querySelector('.waistdatas');
		node.innerHTML = '';
		initHTMLData.waistMeasureDate = "";
		console.log(par);
	},
	tipsClick: function tipsClick(event) {
		event.stopPropagation();
		var ele = ReactDOM.findDOMNode(this.refs.fixBg_btn);
		ele.style.display = 'none';
	},
	render: function render() {
		var DoublelineStyle = {
			"position": "absolute",
			"top": "5.35rem",
			"height": "2.675rem",
			"left": "0",
			'width': '100%'
		};
		var DateHTMLArr = this.state.DateHTMLArr;
		var days = this.state.days;
		var weightDate = this.state.weightDate;
		var initHTMLData = this.state.initHTMLData;
		window.getCampBodyIndexData = this.getCampBodyIndexData;
		// var waistMeasure = this.state.waistMeasure;
		var obj_bigImg;
		var bigImgArr = this.state.bigImgArr;;
		if (bigImgArr != '') {
			obj_bigImg = React.createElement(Public_BIGImg, { bigImgArr: bigImgArr });
		}
		var fixBg_style = {
			'height': document.body.scrollHeight
		};
		var fixBgmain_style = {
			'width': document.body.scrollWidth - 140
		};
		return React.createElement(
			"div",
			null,
			React.createElement(
				"section",
				{ className: "container" },
				React.createElement(
					"aside",
					{ className: "row time", onTouchStart: this.showDate },
					React.createElement(
						"span",
						{ id: "selectdate" },
						initHTMLData.currentDate
					),
					" ",
					React.createElement(
						"span",
						{ id: "selectday" },
						"DAY",
						React.createElement(
							"span",
							{ id: "dayc" },
							initHTMLData.days
						)
					)
				),
				React.createElement(ImgUpLoadArea, null),
				React.createElement(
					"div",
					{ className: "prompt" },
					React.createElement(
						"div",
						{ id: "prompt", onClick: this.ShowUploadSugHandle },
						React.createElement("img", { className: "prompt-img", src: "image/figureContrast/i.png" }),
						React.createElement(
							"div",
							{ className: "prompt-content" },
							"\u62CD\u6444\u53CA\u4E0A\u4F20\u8981\u6C42"
						)
					)
				),
				React.createElement("div", { className: "col-xs-12 col-sm-12 line-1px" }),
				React.createElement(
					"div",
					{ className: "tishi" },
					"\u60A8\u8FD8\u53EF\u4EE5\u4E3A\u7167\u7247\u6DFB\u52A0\u6807\u8BB0\uFF1A"
				),
				React.createElement(
					"aside",
					{ id: "selectweight", className: "row weight", onTouchStart: this.WeightHandleClick },
					React.createElement(
						"span",
						{ className: "weight-name" },
						"\u4F53\u91CD/\u8102\u80AA"
					),
					React.createElement(
						"span",
						{ id: "weightdata" },
						React.createElement(
							"span",
							{ id: "weight" },
							initHTMLData.weight
						),
						React.createElement(
							"span",
							{ id: "fat" },
							initHTMLData.fat
						),
						React.createElement("span", { className: "clear", onClick: this.delWeightClick })
					)
				),
				React.createElement(
					"aside",
					{ id: "selectwaist", className: "row waist", onTouchStart: this.getWaistList },
					React.createElement(
						"span",
						{ className: "waist-name" },
						"\u8170\u56F4"
					),
					React.createElement(
						"span",
						{ id: "waistdata" },
						React.createElement(
							"span",
							{ className: "waistdatas" },
							initHTMLData.waistMeasure
						),
						React.createElement("span", { className: "clear", ref: "delWaist", onClick: this.delWaist })
					)
				),
				React.createElement(
					"a",
					{ className: "row upload", onTouchStart: this.UpLoadHandleClick },
					"\u4E0A\u4F20"
				),
				obj_bigImg,
				React.createElement(
					"div",
					{ className: "backscroll-time", ref: "backscroll_time" },
					React.createElement(
						"div",
						{ className: "select-container" },
						React.createElement(
							"div",
							{ className: "select-title" },
							React.createElement("div", { className: "select-cancel", onClick: this.CancelHandleClick }),
							React.createElement(
								"div",
								{ className: "select-head" },
								"\u9009\u62E9\u62CD\u7167\u65E5\u671F"
							),
							React.createElement("div", { className: "select-sure", onClick: this.SureHandleClick })
						),
						React.createElement(
							"div",
							{ className: "select-content swiper-container" },
							React.createElement("img", { src: "http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/top-meng.png", className: "top-meng" }),
							React.createElement("img", { src: "http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/bottom-meng.png", className: "bottom-meng" }),
							React.createElement(
								"div",
								{ className: "swiper-wrapper" },
								DateHTMLArr
							),
							React.createElement("div", { className: "doubleline", style: DoublelineStyle })
						)
					)
				),
				React.createElement(FatWeigthSelect, { data_fat: weightDate }),
				React.createElement(
					"div",
					{ className: "backscroll-waist", ref: "backscroll_waist" },
					React.createElement(
						"div",
						{ className: "select-container" },
						React.createElement(
							"div",
							{ className: "select-title" },
							React.createElement("div", { className: "select-cancel", onClick: this.WaistCancelClick }),
							React.createElement(
								"div",
								{ className: "select-head" },
								"\u6DFB\u52A0\u8170\u56F4"
							),
							React.createElement("div", { className: "select-sure", onClick: this.WaistSureClick })
						),
						React.createElement(
							"div",
							{ className: "select-content" },
							React.createElement(
								"div",
								{ className: "waistList", onTouchStart: this.WaistTouchStart, onTouchMove: this.WaistTouchMove, onTouchEnd: this.WaistTouchEnd },
								React.createElement(
									"div",
									{ id: "num" },
									React.createElement("span", { className: "num" }),
									"cm"
								),
								React.createElement(
									"div",
									{ id: "line-main" },
									React.createElement("img", { src: "image/figureContrast/left-meng.png", className: "left-meng" }),
									React.createElement("img", { src: "image/figureContrast/right-meng.png", className: "right-meng" }),
									React.createElement("canvas", { id: "line", width: "44880", height: "180" })
								),
								React.createElement("div", { id: "line-bg" })
							)
						)
					)
				)
			),
			React.createElement(
				"aside",
				{ className: "row fixBg", style: fixBg_style },
				React.createElement(
					"div",
					{ className: "col-xs-12 col-sm-12 fixBg-main", style: fixBgmain_style },
					React.createElement(
						"div",
						{ className: "row" },
						React.createElement(
							"div",
							{ className: "col-xs-12 col-sm-12 fixBg-top" },
							React.createElement(
								"div",
								{ className: "row" },
								React.createElement(
									"div",
									{ className: "col-xs-12 col-sm-12 fixBg-p" },
									"222222"
								)
							)
						)
					)
				)
			),
			React.createElement(UploadQuestion, null),
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
ReactDOM.render(React.createElement(ImgUpLoad, null), document.getElementById('uploadImgBox'));

//移动端隐藏title栏
function notshowtitle() {
	var data = {
		display: false
	};
	data = JSON.stringify(data);
	appFc.showTitle(data);
}
//移动端显示title栏
function showtitle() {
	var data = {
		display: true
	};
	data = JSON.stringify(data);
	appFc.showTitle(data);
}

//判断上传次数，跳转
function uploadLink() {

	var finalUrl = ajaxLink + "/v1/api/campCommon/campPictureCount" + window.location.search + "&campId=" + campId + "&roleId=" + roleId;
	$.ajax({
		type: "get",
		url: finalUrl,
		dataType: "json",
		success: function success(data) {
			if (data.code == 200) {
				console.log("success");
				if (data.resp == 0) {
					var deviceType = isMobile(); //判断是不是app的方法
					if (deviceType == "isApp" && getParamByUrl("testtype") != "tanchao") {
						$(".upload").unbind("click").click(function () {
							var data = {
								link: absoluteUrl + "photoAlbum.html" + window.location.search + "&campId=" + campId + "&roleId=" + roleId,
								animation: 2 //默认1从右到左，2从下到上
							};
							data = JSON.stringify(data);
							appFc.openWebview(data);
						});
					} else {
						$(".upload").attr("href", "photoAlbum.html" + window.location.search + "&campId=" + campId + "&roleId=" + roleId);
					}
					event.stopPropagation();
				} else if (data.resp > 0) {
					var deviceType = isMobile(); //判断是不是app的方法
					if (deviceType == "isApp" && getParamByUrl("testtype") != "tanchao") {
						$(".upload").unbind("click").click(function () {
							var data = {
								link: absoluteUrl + "figureContrast2.html" + window.location.search + "&campId=" + campId + "&roleId=" + roleId,
								animation: 2 //默认1从右到左，2从下到上
							};
							data = JSON.stringify(data);
							appFc.openWebview(data);
						});
					} else {
						$(".upload").attr("href", "figureContrast2.html" + window.location.search + "&campId=" + campId + "&roleId=" + roleId);
					}
					event.stopPropagation();
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

function leftBtnShow() {
	var deviceType = isMobile(); //判断是不是app的方法
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
	if (deviceType == "isApp" && getParamByUrl("testtype") != "tanchao") {
		appFc.controlLeft(getPageInfo());
	}
	if (getParamByUrl("os") == "android") {
		var getPageInfo = function getPageInfo() {
			var data = {
				controlBtn: false,
				function: ""
			};
			return JSON.stringify(data);
		};
		var deviceType = isMobile();
		if (deviceType == "isApp" && getParamByUrl("testtype") != "tanchao") {
			appFc.showBackBtn(getPageInfo());
		}
	}
}
function leftBtnHide() {
	var deviceType = isMobile(); //判断是不是app的方法
	var getPageInfo = function getPageInfo() {
		var data = {
			iconType: 1,
			iconColor: "",
			backNum: 1,
			closeWebview: 0,
			hidden: true,
			isHandle: false,
			functionName: ""
		};
		return JSON.stringify(data);
	};
	if (deviceType == "isApp" && getParamByUrl("testtype") != "tanchao") {
		appFc.controlLeft(getPageInfo());
	}
}

function addAndroid() {
	if (getParamByUrl("os") == "android") {
		var getPageInfo = function getPageInfo() {
			var data = {
				controlBtn: false,
				function: ""
			};
			return JSON.stringify(data);
		};
		var deviceType = isMobile();
		if (deviceType == "isApp" && getParamByUrl("testtype") != "tanchao") {
			appFc.showBackBtn(getPageInfo());
		}
	}
}

function weightAndroid() {
	leftBtnShow();
	$(".backscroll-weight").hide();
}
function wasitAndroid() {
	leftBtnShow();
	$(".backscroll-waist").hide();
}
function dateAndroid() {
	leftBtnShow();
	hideDate();
}
function promptAndroid() {
	leftBtnShow();
	$(".prompt-back").css("display", "none");
}

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

},[211]);