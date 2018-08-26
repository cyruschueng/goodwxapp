var React = require("react");
var ReactDOM = require("react-dom");
var Public_Error = require('./Public_error.jsx');
var PubSub = require("pubsub-js");
// 引入缩略图组件
var Public_BIGImg = require('./Public_bigImg.jsx');
var Fc_bindBigImg = require('./Fc_bindBigImg.jsx');
// @parm 设置一些全局参数
// var sex = "";//
var weight = ""; //被选中的体重数值
var fat = "";	//被选中的脂肪数值
var isshowbtn1 = 0, isshowbtn2 = 0;//判断是否添加图片
var waistMeasure = "";
var weightIndex = 0; //默认选中的体重体脂数据索引
var UpLoadHandleClickBtn=true;//防止连续点击
var SShangChuanZhaoPian = {
	SCategory_SShangChuanZhaoPian: 5060800,
	SShangChuanZhaoPian_XuanZePaiZhaoRiQi: 5060801,//选择拍照日期
	SShangChuanZhaoPian_ShangChuanZhengMianZhao: 5060802,//上传正面照
	SShangChuanZhaoPian_ShangChuanCeMianZhao: 5060803,//上传侧面照
	SShangChuanZhaoPian_ChaKanShangChuanYaoQiu: 5060804,//查看拍摄及上传要求
	SShangChuanZhaoPian_TianJiaTiZhi: 5060805,//添加体脂数据
	SShangChuanZhaoPian_TianJiaYaoWei: 5060806,//添加腰围数据
	SShangChuanZhaoPian_XuanZeTiZhi: 5060807,//选择体脂数据
	SShangChuanZhaoPian_QuXiaoXuanZeTiZhi: 5060808,//取消选择体脂数据
	SShangChuanZhaoPian_XuanZeYaoWei: 5060809,//选择腰围数据
	SShangChuanZhaoPian_QuXiaoXuanZeYaoWei: 5060810,//取消选择腰围数据
	SShangChuanZhaoPian_ShangChuan: 5060811,//点击上传按钮
	SShangChuanZhaoPian_ShanChuZhaoPian: 5060812,//删除照片
	SShangChuanZhaoPian_XianShiYuLanTu: 5060813,//显示预览图
	SShangChuanZhaoPian_QuXiaoXuanZeShiJian: 5061014,//取消选择时间
	SShangChuanZhaoPian_XuanZeShiJian: 5061015,//选择时间
};
var campId = getParamByUrl("campId");
var loadImg = { "campId": campId, "roleId": roleId, "frontPicture": "", "facePicture": "", "weight": '', "fat": '', "waistMeasure": "", "day": "", "time": "" };


// 设置图片存储对象
var publicData = {
	objImg: {
		'frontIMG': [],
		'asideIMG': []
	}
};
window.publicData = publicData;
window.loadImg = loadImg;
// 体重脂肪选择组件
var FatWeigthSelect = React.createClass({
	getInitialState: function () {
		return {
			weightDate: '',
			HTMLweight: {},
		}
	},
	componentDidMount: function () {
		PubSub.subscribe('HTMLweight', function (ev, HTMLweight) {
			this.setState({
				HTMLweight: HTMLweight
			});
		}.bind(this));
	},
	// 取消选择，并隐藏选项
	CancelClick: function (event) {
		var ele = ReactDOM.findDOMNode(this.refs.backscroll_weight);
		ele.style.display = 'none';
		leftBtnShow();
		setMaiDian(SShangChuanZhaoPian.SCategory_SShangChuanZhaoPian, SShangChuanZhaoPian.SShangChuanZhaoPian_QuXiaoXuanZeTiZhi);
	},
	// 确认选择，并隐藏选项
	SureClick: function (event) {
		event.stopPropagation();
		event.stopPropagation();
		var ele = ReactDOM.findDOMNode(this.refs.backscroll_weight);
		ele.style.display = 'none';
		weight = $(".backscroll-weight .swiper-wrapper .swiper-slide").eq(weightIndex).find(".selectweight-weight").html();
		fat = $(".backscroll-weight .swiper-wrapper .swiper-slide").eq(weightIndex).find(".selectweight-fat").html();
		var HTMLweight = {
			weight: '：' + weight + 'KG/',
			fat: fat + '%'
		};
		PubSub.publish('HTMLweight', HTMLweight);
		var del = document.querySelector('#weightdata .clear');
		// var HTMLweight = this.state.HTMLweight;
		var del = document.querySelector('#weightdata .clear');
		del.style.display = 'block';
		leftBtnShow();
		setMaiDian(SShangChuanZhaoPian.SCategory_SShangChuanZhaoPian, SShangChuanZhaoPian.SShangChuanZhaoPian_XuanZeTiZhi);
	},
	// 点击选择
	OptionHandleClick: function (event) {
		event.stopPropagation();
		var ele = event.currentTarget;
		// $(ele).siblings().css('backgroundImage', 'url(http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/nopick.png)')
		// $(ele).css('backgroundImage', 'url(http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/pick.png)');
		$(ele).siblings().find(".selectImg").attr('src', 'https://cdn2.picooc.com/web/res/fatburn/image/figureContrast/nopick.png')
		$(ele).find(".selectImg").attr('src', 'https://cdn2.picooc.com/web/res/fatburn/image/figureContrast/pick.png');

		weightIndex = $(".backscroll-weight .swiper-wrapper .swiper-slide").index(ele);

	},
	render: function () {
		var weightDate = this.props.data_fat;
		var HTMLarr = [];
		for (var i = 0; i < weightDate.length; i++) {
			HTMLarr.push(
				<div className="swiper-slide " key={i} onClick={this.OptionHandleClick} ref="weight_date">
					<span className="col-xs-5 col-sm-5 selectweight-date">{weightDate[i].time}</span>
					<div className="col-xs-3 col-sm-3" style={{ 'display': 'inlineBlock' }}><span className="selectweight-fat">{weightDate[i].bodyFat}</span><span>%</span></div>
					<div className="col-xs-3 col-sm-3" style={{ 'display': 'inlineBlock' }}><span className="selectweight-weight">{weightDate[i].weight}</span><span>KG</span></div>
					<img className="selectImg" src="https://cdn2.picooc.com/web/res/fatburn/image/figureContrast/nopick.png" />
				</div>
			)
		}
		return (
			<div className="backscroll-weight" ref="backscroll_weight">
				<div className="select-container">
					<div className="select-title">
						<div className="select-cancel" onClick={this.CancelClick}></div>
						<div className="select-head">选择数据</div>
						<div className="select-sure" onClick={this.SureClick}></div>
					</div>
					<div className="col-xs-12 col-sm-12 line-1px"></div>
					<div className="select-content swiper-container">
						<div className="swiper-wrapper">
							{HTMLarr}
						</div>
					</div>
				</div>
			</div>
		)
	}
});
// 图片展示区域
var ImgUpLoadArea = React.createClass({
	getInitialState: function () {
		return {
			uploadtype: '',
			isshowbtn1: 0,//上传按钮颜色判断
			isshowbtn2: 0,
			isLoadImgFro: 0,//判断是否上传图片
			isLoadImgAsi: 0,
		}
	},
	getImg: function (url) {
		var isLoadImgAsi = this.state.isLoadImgAsi,
			isLoadImgFro = this.state.isLoadImgFro;
		if (this.state.uploadtype == 0) {
			$("#front").removeClass("front-default");
			for (var i = 0; i < url.length; i++) {
				$("#front").css("background-image", 'url(' + url[i] + ')');
				loadImg["frontPicture"] = url[i];
			}
			publicData.objImg['frontIMG'].push({ 'url': $("#front").css("background-image").replace("url(", "").replace(")", "") });
			// $("#front").addClass("getImg-bg");
			$(".delete1").show();
			$(".upload").css("background-color", "#7fa9ff");
			this.setState({
				isLoadImgFro: 1,
			});
			isshowbtn1 = 1;
		} else if (this.state.uploadtype == 1) {
			$("#side").removeClass("side-default");
			for (var i = 0; i < url.length; i++) {
				$("#side").css("background-image", 'url(' + url[i] + ')');
				loadImg["facePicture"] = url[i];
			}
			publicData.objImg['asideIMG'].push({ 'url': $("#side").css("background-image").replace("url(", "").replace(")", "") });
			this.setState({
				isLoadImgAsi: 1,
			});
			isshowbtn2 = 1;
			$(".delete2").show();
			$(".upload").css("background-color", "#7fa9ff");
		}
		// console.log(publicData);
	},
	//点击添加正面照片 
	AddfrontImgHandleClick: function (event) {
		event.stopPropagation();
		this.state.uploadtype = 0;
		if (getParamByUrl("testtype") == "tanchao") {
			this.getImg(["http://cdn2.picooc.com/web/res/event/bottle/image/msg-2.png", "http://cdn2.picooc.com/web/res/event/bottle/image/bg1.jpg"]);
		}
		else {
			var t2 = setTimeout(function () {
				var deviceType4 = isMobile();
				if (deviceType4 == "isApp") {
					var data = {
						maxNum: 1,//上传图片的最大个数
						imageType: "bodyImg"
					}
					data = JSON.stringify(data);
					appFc.uploadImg(data);
				}
				clearTimeout(t2);
			}, 250);
		};
		setMaiDian(SShangChuanZhaoPian.SCategory_SShangChuanZhaoPian, SShangChuanZhaoPian.SShangChuanZhaoPian_ShangChuanZhengMianZhao);
	},
	// 点击添加侧面照片
	AddsideImgHandleClick: function (event) {
		event.preventDefault();
		event.stopPropagation();
		this.state.uploadtype = 1;
		if (getParamByUrl("testtype") == "tanchao") {
			this.getImg(["http://cdn2.picooc.com/web/res/event/bottle/image/msg-2.png", "http://cdn2.picooc.com/web/res/event/bottle/image/bg1.jpg"]);
		}
		else {
			var t2 = setTimeout(function () {
				var deviceType4 = isMobile();
				if (deviceType4 == "isApp") {
					var data = {
						maxNum: 1, //上传图片的最大个数
						imageType: "bodyImg"
					}
					data = JSON.stringify(data);
					appFc.uploadImg(data);
				}
				clearTimeout(t2);
			}, 250);
		};
		setMaiDian(SShangChuanZhaoPian.SCategory_SShangChuanZhaoPian, SShangChuanZhaoPian.SShangChuanZhaoPian_ShangChuanCeMianZhao);
	},
	// 点击删除正面照片
	DelFrontHandleClick: function (event) {
		event.preventDefault();
		event.stopPropagation();
		$("#front").removeClass("getImg-bg");
		publicData.objImg['frontIMG'] = [];
		$("#front").css("background-image", "url(http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/front.png)");
		$("#front").addClass("front-default");
		var ele = ReactDOM.findDOMNode(this.refs.frontImg);
		ele.style.display = 'none';
		this.setState({
			isLoadImgFro: 0,
		});
		isshowbtn1 = 0;
		if (isshowbtn2 == 0) {
			$(".upload").css("background-color", "#bbbbbb");
		}
		setMaiDian(SShangChuanZhaoPian.SCategory_SShangChuanZhaoPian, SShangChuanZhaoPian.SShangChuanZhaoPian_ShanChuZhaoPian);
	},
	// 点击删除侧面照片
	DelAsideHandleClick: function (event) {
		event.preventDefault();
		event.stopPropagation();
		$("#side").removeClass("getImg-bg");
		publicData.objImg['asideIMG'] = [];
		$("#side").css("background-image", "url(http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/side.png)");
		$("#side").addClass("side-default");
		var ele = ReactDOM.findDOMNode(this.refs.asideImg);
		ele.style.display = 'none';
		this.setState({
			isLoadImgAsi: 0,
		});
		isshowbtn2 = 0;
		// var isshowbtn1 = this.state.isshowbtn1;
		if (isshowbtn1 == 0) {
			$(".upload").css("background-color", "#bbbbbb");
		}
		setMaiDian(SShangChuanZhaoPian.SCategory_SShangChuanZhaoPian, SShangChuanZhaoPian.SShangChuanZhaoPian_ShanChuZhaoPian);
	},
	componentDidMount: function () {
		var frontEle = ReactDOM.findDOMNode(this.refs.front);
		var sideEle = ReactDOM.findDOMNode(this.refs.side);
		frontEle.style.height = frontEle.offsetWidth * 408 / 306 + 'px';
		sideEle.style.height = sideEle.offsetWidth * 408 / 306 + 'px';
	},
	render: function () {
		window.getImg = this.getImg;
		var isLoadImgFro = this.state.isLoadImgFro;
		var isLoadImgAsi = this.state.isLoadImgAsi;
		var uploadImgHTMLFro,
			uploadImgHTMLAsi
		if (isLoadImgFro == 0) {
			uploadImgHTMLFro =
				<div id="front" ref="front" className="uploadImg-img front front-default" onClick={this.AddfrontImgHandleClick} data-obj_img="frontIMG" >
					<div className="delete1" ref='frontImg'></div>
				</div>
		} else {
			uploadImgHTMLFro =
				<div id="front" ref="front" className="uploadImg-img front front-default" onClick={Fc_bindBigImg.bindBigImg} data-obj_img="frontIMG" >
					<div className="delete1" ref='frontImg' onClick={this.DelFrontHandleClick}></div>
				</div>
		}
		if (isLoadImgAsi == 0) {
			uploadImgHTMLAsi =
				<div id="side" ref="side" className="uploadImg-img side side-default" onClick={this.AddsideImgHandleClick} data-obj_img="asideIMG" >
					<div className="delete2" ref='asideImg'></div>
				</div>
		}
		else {
			uploadImgHTMLAsi =
				<div id="side" ref="side" className="uploadImg-img side side-default" onClick={Fc_bindBigImg.bindBigImg} data-obj_img="asideIMG" >
					<div className="delete2" onClick={this.DelAsideHandleClick} ref='asideImg'></div>
				</div>
		}
		return (
			<aside className="uploadImg">
				{uploadImgHTMLFro}
				{uploadImgHTMLAsi}
			</aside>
		)
	}
});
// 拍摄以及上传要求
var UploadQuestion = React.createClass({
	CancelClick: function (event) {
		leftBtnShow();
		event.stopPropagation();
		var ele = ReactDOM.findDOMNode(this.refs.prompt_back);
		ele.style.display = 'none';
	},
	render: function () {
		var ContainerStyle = {
			'height': document.body.scrollHeight
		}
		var promptmain_style = {
			'width': document.body.scrollWidth - 50
		};
		return (
			<aside className="row prompt-back" style={ContainerStyle} ref='prompt_back' onClick={this.HideClick}>
				<div className="col-xs-12 col-sm-12 prompt-main" style={promptmain_style}>
					<div className="row">
						<span className="title">拍摄及上传要求</span>
						<img className="del" src="image/figureContrast/no.png" onClick={this.CancelClick} />
					</div>
					<div className="prompt-pic col-xs-12 col-sm-12">
						<div className="prompt-pic-left col-xs-6 col-sm-6">
						</div>
						<div className="prompt-pic-right col-xs-6 col-sm-6">
						</div>
					</div>
					<div className="col-xs-12 col-sm-12">
						<div className="col-xs-6 col-sm-6 example">正面照示例</div>
						<div className="col-xs-6 col-sm-6 example">侧面照示例</div>
					</div>
					<div className="col-xs-12 col-sm-12 content">
						<p>• 拍摄角度：正、侧面照片各一张，角度清晰，露出肩臂、腰腹、双腿；</p>
						<p>• 拍摄位置：尽量保证同一个地方、同一个角度进行拍摄；</p>
						<p>• 上传次数：至少在开营前、中、后分别拍摄三次照片，并添加体重、体脂和腰围；</p>
					</div>
				</div>
			</aside>
		)
	}
});
// 图片上传总容器
var ImgUpLoad = React.createClass({
	getInitialState: function () {
		return {
			loadImg: {
				'campId': '',
				'roleId': '',
				'frontPicture': '',
				'facePicture': '',
				'weight': '',
				'fat': '',
				'waistMeasure': '',
				'day': '',
				'time': ''
			},
			DateList: [],
			DateHTMLArr: [],
			currentDate: '',
			strTime: '',
			days: '',
			dateListLen: '',
			sex: '',
			weightDate: '',
			HTMLweight: {},
			startX: '',
			startY: '',
			moveEndX: '',
			moveEndY: '',
			minNum2: '',
			testLeft: '',
			leftNum: '',
			waistMeasure: '',
			isWeightDate: 0,//体重脂肪是否有数据,
			bigImgArr: []
		}
	},
	componentWillMount: function () {
		var finalUrl = ajaxLink + "/v1/api/campCommon/campDateList" + window.location.search + "&campId=" + campId;
		this.serverRequest = $.get(finalUrl, function (data) {
			if (data.code == 200) {
				if (data.resp.dateList.length > 0) {
					var dateListLen = data.resp.dateList.length;//日期列表长度
					var currentDate = data.resp.dateList[data.resp.dateList.length - 1].date;//获取当前日期
					var strTime = data.resp.dateList[data.resp.dateList.length - 1].time;//获取当前时间
					var DateList = data.resp.dateList;
					var DateHTMLArr = [];
					for (var i = 0; i < DateList.length; i++) {
						DateHTMLArr.push(<div className="swiper-slide" data-time={DateList[i].time} key={i}>{DateList[i].date}</div>)
					}
					this.setState({
						DateList: DateList,
						currentDate: currentDate,
						strTime: strTime,
						DateHTMLArr: DateHTMLArr,
						dateListLen: dateListLen
					});
					this.getCampDay(strTime)
					this.getCampBodyIndexData(0);
				}
			}
			else {
				$(".error-main-t").html(data.result.message);
				$(".errorAlert").css("display", "block");
				$(".error-main").css("margin-top", -$(".error-main").height() / 2);
			}
		}.bind(this));

	},
	componentDidMount: function () {
		PubSub.subscribe("HTMLweight", function (evName, HTMLweight) {
			this.setState({ HTMLweight: HTMLweight });
		}.bind(this));
		PubSub.subscribe('bigImgData', function (ev, bigImgDate) {
			this.setState({
				bigImgArr: bigImgDate
			});
		}.bind(this));
	},
	// 点击上传图片
	UpLoadHandleClick: function (event) {
		setMaiDian(SShangChuanZhaoPian.SCategory_SShangChuanZhaoPian, SShangChuanZhaoPian.SShangChuanZhaoPian_ShangChuan);
		event.stopPropagation();
		if (isshowbtn1 == 0) {
			loadImg["frontPicture"] = "";
		} else { }
		if (isshowbtn2 == 0) {
			loadImg["facePicture"] = "";
		} else { }
		var day = $("#dayc").html();
		var time = $("#selectdate").html();
		if ((isshowbtn1 != 0 || isshowbtn2 != 0) && UpLoadHandleClickBtn ) {
			var dayUrl = ajaxLink + "/v1/api/campStu/pictureIn" + window.location.search + "&campId=" + campId + "&roleId=" + roleId + "&frontPicture=" + loadImg.frontPicture + "&facePicture=" + loadImg.facePicture + "&weight=" + weight + "&fat=" + fat + "&waistMeasure=" + waistMeasure + "&day=" + day + "&time=" + time;
			UpLoadHandleClickBtn=false;
			$.ajax({
				type: "get",
				url: dayUrl,
				dataType: "json",
				success: function (data) {
					if (data.code == 200) {
						$(".upload").css("opacity", "0.6");
						// alert(JSON.stringify(data));
						//给客户端传腰围值
						if (data.resp.waistMeasureId && data.resp.waistMeasureId != null && data.resp.waistMeasureId != "") {
							var getPageInfo9 = function () {
								var param = {
									roleId: roleId,
									serverId: data.resp.waistMeasureId,
									girthNum: waistMeasure,
									time: data.resp.operateTrime,
									// isDelete:false
								};
								return JSON.stringify(param);
							};
							var deviceType = isMobile();
							if (deviceType == "isApp") {
								appFc.changeGirth(getPageInfo9());
							}
						}
						//给客户端传腰围值结束
						var uploadurl = getParamByUrl("uploadurl");
						if (uploadurl && uploadurl == 0) {
							uploadLink();
							// window.localStorage.removeItem("uploadurl"); //删除本地缓存中的标识
						} 
						else if (uploadurl && uploadurl == 1) {
							var deviceType = isMobile();
							if (deviceType == "isApp") {
								if (getParamByUrl("os") == "android") {
									var  getPageInfo1  =  function  () {
										var  data  =  {
											controlBtn: false,
											function: ""
										};
										return  JSON.stringify(data);
									};
									appFc.showBackBtn(getPageInfo1());
								}
								var getPageInfo = function () {
									var data = {
										backNum: 1,//默认为1，
										closeWebview: 0,//默认为0
									};
									return JSON.stringify(data);
								};
								appFc.deleteHistory(getPageInfo());
							} else {
								history.go(-1);
								location.reload();
							}
							UpLoadHandleClickBtn=true;
						}
						else{
							history.go(-1);
						}
						
					}
					else {
						UpLoadHandleClickBtn=true;
						$(".error-main-t").html(data.result.message);
						$(".errorAlert").css("display", "block");
						$(".error-main").css("margin-top", -$(".error-main").height() / 2);
					}
				}
			})
		}
	},
	// 点击显示拍摄要求
	ShowUploadSugHandle: function (event) {
		var fontHeight = parseInt($("html").css("font-size"));
		var paddingTop = 1.4375 * fontHeight;
		if (window.innerHeight < 440) {
			$(".prompt-main").css("padding", "1rem 1.5625rem");
			$(".prompt-main .content p").css("margin-bottom", "0.5rem");
			paddingTop = 1 * fontHeight;
		}
		setMaiDian(SShangChuanZhaoPian.SCategory_SShangChuanZhaoPian, SShangChuanZhaoPian.SShangChuanZhaoPian_ChaKanShangChuanYaoQiu);
		
		if (getParamByUrl("os") == "android") {
			var getPageInfo = function () {
				var data = {
					controlBtn: true,
					function: "promptAndroid"
				};
				return JSON.stringify(data);
			};
			var deviceType = isMobile();
			if (deviceType == "isApp") {
				appFc.showBackBtn(getPageInfo());
			}
		}
		$(".prompt-back").css("display", "block");
		$(".prompt-pic-left").css("height", $(".prompt-pic-left").width() * 4 / 3);
		$(".prompt-pic-right").css("height", $(".prompt-pic-left").width() * 4 / 3);
		$(".prompt-main").css("margin-top", -$(".prompt-main").height() / 2 - paddingTop);
	},
	// 展示时间选择列表
	showDate: function () {
		$(".backscroll-time").css("height", $(window).height());
		$(".backscroll-time").show();
		var dateListLen = this.state.dateListLen;
		var mySwiper1 = new Swiper('.backscroll-time .swiper-container', {
			direction: 'vertical',
			slidesPerView: 5,
			initialSlide: dateListLen - 1,
			centeredSlides: true
		});
		if (getParamByUrl("os") == "android") {
			var getPageInfo = function () {
				var data = {
					controlBtn: true,
					function: "dateAndroid"
				};
				return JSON.stringify(data);
			};
			var deviceType = isMobile();
			if (deviceType == "isApp") {
				appFc.showBackBtn(getPageInfo());
			}
		}
	},
	//入营天数计算
	getCampDay: function (currentDate) {
		var dayUrl = ajaxLink + "/v1/api/campCommon/campDay" + window.location.search + "&campId=" + campId + "&roleId=" + roleId + "&time=" + currentDate;
		this.serverRequest = $.get(dayUrl, function (data) {
			if (data.code == 200) {
				var days = data.resp;
				this.setState({
					days: days
				});
			}
			else {
				$(".error-main-t").html(data.result.message);
				$(".errorAlert").css("display", "block");
				$(".error-main").css("margin-top", -$(".error-main").height() / 2);
			}
		}.bind(this));
	},
	// 确认选择
	SureHandleClick: function (event) {
		event.stopPropagation();
		this.setState({
			currentDate: $(".swiper-slide-active").html()
		});
		this.HideTime();
		var strTime = $(".swiper-slide-active").attr("data-time");
		this.getCampDay(strTime);
		leftBtnShow();
		setMaiDian(SShangChuanZhaoPian.SCategory_SShangChuanZhaoPian, SShangChuanZhaoPian.SShangChuanZhaoPian_XuanZeShiJian);
	},
	// 取消选择
	CancelHandleClick: function (event) {
		event.stopPropagation();
		this.HideTime();
		leftBtnShow();
		setMaiDian(SShangChuanZhaoPian.SCategory_SShangChuanZhaoPian, SShangChuanZhaoPian.SShangChuanZhaoPian_QuXiaoXuanZeShiJian);
	},
	// 隐藏时间选择
	HideTime: function () {
		var ele = ReactDOM.findDOMNode(this.refs.backscroll_time);
		ele.style.display = 'none'
	},
	WeightHandleClick: function (event) {
		event.stopPropagation();
		
		setMaiDian(SShangChuanZhaoPian.SCategory_SShangChuanZhaoPian, SShangChuanZhaoPian.SShangChuanZhaoPian_TianJiaTiZhi);
		var isWeightDate = this.state.isWeightDate;
		//如果没有体重脂肪数据
		if (isWeightDate == 1) {
			var fixBg_p = document.querySelector('.fixBg-p');
			var fixBg = document.querySelector('.fixBg');
			var fixBg_main = document.querySelector('.fixBg-main');
			fixBg_p.style.display = 'block';
			fixBg.style.display = 'block';
			fixBg_p.innerHTML = "暂无测量数据哦，赶快去上秤吧~";
			fixBg_main.style.marginTop = -(fixBg_main.offsetHeight) / 2
			// $(".fixBg-main").css("margin-top", -$(".fixBg-main").height() / 2);
			setTimeout(function () {
				fixBg.style.display = 'none';
				fixBg_p.style.display = 'none';
			}, 1500);

		} else {
			//leftBtnHide();
			this.getCampBodyIndexData(1);
		}
	},

	//学员历史身体数据
	getCampBodyIndexData: function (param) {
		if(param==0){
			var time = $("#selectdate").html();
			var dayUrl = ajaxLink + "/v1/api/campCommon/campBodyIndexData" + window.location.search + "&campId=" + campId + "&roleId=" + roleId + "&time=" + time;
			this.serverRequest = $.get(dayUrl, function (data) {
				if (data.code == 200) {
					var sex, weightDate;
					if (data.resp) {
						if (data.resp.sex) {
							sex = data.resp.sex;
						}
						if (data.resp.bodyIndexDate && data.resp.bodyIndexDate.length > 0) {
							weightDate = data.resp.bodyIndexDate
							weightIndex = data.resp.beginIndex;
							this.setState({
								isWeightDate: 0,
								sex: sex,
								weightDate: weightDate
							});
							// if (param == 1) {
							// 	this.showWeight();
							// }
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
		}
		else{
			this.showWeight();
		}

	},
	//显示体重/脂肪选择
	showWeight: function () {
		var initHTMLData = this.state.initHTMLData;
		$(".backscroll-weight").css("height", $(window).height());
		$(".backscroll-weight").css("display", "block");
		// var weightIndex = this.state.weightIndex;
		console.log(weightIndex);
		var centeredSlidesBtn=false;
		var initialSlideNum=weightIndex;
		if(weightIndex>1){
			initialSlideNum=weightIndex-2;
		}

		var mySwiper2 = new Swiper('.backscroll-weight .swiper-container', {
			direction: 'vertical',
			initialSlide: initialSlideNum,
			slidesPerView: 5,
			centeredSlides: centeredSlidesBtn,
		});

		// $(".backscroll-weight .swiper-wrapper .swiper-slide").css("background-image", "url(http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/nopick.png)");

		// $(".backscroll-weight .swiper-wrapper .swiper-slide").eq(weightIndex).css("background-image", "url(http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/pick.png)");
		$(".backscroll-weight .swiper-wrapper .selectImg").attr("src", "https://cdn2.picooc.com/web/res/fatburn/image/figureContrast/nopick.png");

		$(".backscroll-weight .swiper-wrapper .selectImg").eq(weightIndex).attr("src", "https://cdn2.picooc.com/web/res/fatburn/image/figureContrast/pick.png");


		if (getParamByUrl("os") == "android") {
			var getPageInfo = function () {
				var data = {
					controlBtn: true,
					function: "weightAndroid"
				};
				return JSON.stringify(data);
			};
			var deviceType = isMobile();
			if (deviceType == "isApp") {
				appFc.showBackBtn(getPageInfo());
			}
		}
	},
	// 删除选择的体重脂肪数据
	delWeightClick: function (event) {
		event.preventDefault();
		event.stopPropagation();
		var HTMLweight = {};
		PubSub.publish('HTMLweight', HTMLweight);
		var ele = event.currentTarget;
		ele.style.display = 'none';
	},
	// 绘制腰围图
	getWaistList: function () {
		setMaiDian(SShangChuanZhaoPian.SCategory_SShangChuanZhaoPian, SShangChuanZhaoPian.SShangChuanZhaoPian_TianJiaYaoWei);
		var sex = this.state.sex;
		console.log(sex);
		//leftBtnHide();
		$(".backscroll-waist").css("height", $(window).height());
		$(".backscroll-waist").css("display", "block");
		//腰围画图开始
		var tScale = 2;
		var oC1 = $("#line").get(0);
		var oC1 = oC1.getContext('2d');
		var startNum = 70;
		if (sex == 1) {
			startNum = 80;
			var linewidth = 14960;
			var iNum = 1360;
			var minNum = 48;
			var minNum2 = 4800;
			var leftNum = -13383;
		} else {
			startNum = 70;
			var linewidth = 14960;
			var iNum = 1360;
			var minNum = 42;
			var minNum2 = 4200;
			var leftNum = -13383;
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
		oC1.font = (12 * tScale) + "px  Arial";
		for (var i = 1; i < iNum; i++) {
			if (i % 5 == 0) {
				oC1.beginPath();
				oC1.moveTo(10 * i * tScale + 1, 0);
				oC1.lineTo(10 * i * tScale + 1, 32 * tScale);
				oC1.strokeStyle = "#000000";
				oC1.stroke();
				oC1.textAlign = "center";
				oC1.fillText(minNum + (i / 10), 10 * i * tScale + 1, 46 * tScale);
			}
			else {
				oC1.beginPath();
				oC1.moveTo(10 * i * tScale + 1, 8 * tScale);
				oC1.lineTo(10 * i * tScale + 1, 32 * tScale);
				oC1.strokeStyle = "#000000";
				oC1.stroke();
			}
		}
		if (waistMeasure != "") {
			startNum = waistMeasure;
		}
		$("#line-bg").css("left", parseInt($(window).width() / 2));
		$("#line").css("left", parseInt(parseInt($(window).width() / 2) + minNum2) - startNum * 100);
		$(".num").html((parseInt($(window).width() / 2) - parseInt($("#line").css("left")) + minNum2) / 100);
		if (getParamByUrl("os") == "android") {
			var getPageInfo = function () {
				var data = {
					controlBtn: true,
					function: "wasitAndroid"
				};
				return JSON.stringify(data);
			};
			var deviceType = isMobile();
			if (deviceType == "isApp") {
				appFc.showBackBtn(getPageInfo());
			}
		}
	},
	WaistTouchStart: function (event) {
		event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动
		var startX = event.changedTouches[0].pageX;
		var startY = event.changedTouches[0].pageY;
		var testLeft = parseInt($("#line").css("left"));
		this.setState({
			startX: startX,
			startY: startY,
			testLeft: testLeft
		});
	},
	WaistTouchMove: function (event) {
		event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动
		event.stopPropagation();
		var moveEndX = event.changedTouches[0].pageX;
		var moveEndY = event.changedTouches[0].pageY;
		var startX = this.state.startX,
			startY = this.state.startY,
			testLeft = this.state.testLeft,
			leftNum = this.state.leftNum;
		var moveX = moveEndX - startX;
		var moveY = moveEndY - startY;

		if ((testLeft + moveX) > $(window).width()/ 2) {
			$("#line").css("left", $(window).width()/ 2);
		}
		else if ((testLeft + moveX) < leftNum - $(window).width() / 10) {
			$("#line").css("left", leftNum + "px");
		}
		else {
			$("#line").css("left", testLeft + moveX);
		}
	},
	WaistTouchEnd: function (event) {
		event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动
		event.stopPropagation();
		var minNum2 = this.state.minNum2;
		$("#line").css("left", (parseInt($("#line").css("left"))) + (parseInt($(window).width() / 2) - parseInt($("#line").css("left"))) % 10);
		$(".num").html((parseInt($(window).width() / 2) - parseInt($("#line").css("left")) + minNum2) / 100);
	},
	WaistSureClick: function (event) {
		event.preventDefault();
		event.stopPropagation();
		var ele = ReactDOM.findDOMNode(this.refs.backscroll_waist);
		ele.style.display = 'none';
		var num = ele.querySelector('.num');
		waistMeasure = num.innerHTML;
		var clear = ReactDOM.findDOMNode(this.refs.delWaist);
		clear.style.display = 'block'
		this.setState({
			waistMeasure: '：' + waistMeasure + 'CM'
		});
		leftBtnShow();
		setMaiDian(SShangChuanZhaoPian.SCategory_SShangChuanZhaoPian, SShangChuanZhaoPian.SShangChuanZhaoPian_XuanZeYaoWei);

	},
	WaistCancelClick: function (event) {
		event.preventDefault();
		event.stopPropagation();
		var ele = ReactDOM.findDOMNode(this.refs.backscroll_waist);
		ele.style.display = 'none';
		leftBtnShow();
		setMaiDian(SShangChuanZhaoPian.SCategory_SShangChuanZhaoPian, SShangChuanZhaoPian.SShangChuanZhaoPian_QuXiaoXuanZeYaoWei);

	},
	delWaist: function (event) {
		event.preventDefault();
		event.stopPropagation();
		var ele = event.currentTarget;
		ele.style.display = 'none';
		var par = ele.parentNode;
		var node = par.querySelector('.waistdatas');
		//node.innerHTML = '';
		waistMeasure="";
		this.setState({
			waistMeasure: ''
		});
		console.log(par)

	},
	tipsClick: function (event) {
		event.stopPropagation();
		var ele = ReactDOM.findDOMNode(this.refs.fixBg_btn);
		ele.style.display = 'none';
	},
	render: function () {
		var DoublelineStyle = {
			"position": "absolute",
			"top": "5.35rem",
			"height": "2.675rem",
			"left": "0",
			'width': '100%'
		};
		var DateHTMLArr = this.state.DateHTMLArr;
		var currentDate = this.state.currentDate;
		var days = this.state.days;
		var weightDate = this.state.weightDate;
		var HTMLweight = this.state.HTMLweight;
		console.log(HTMLweight);
		var waistMeasure = this.state.waistMeasure;
		var obj_bigImg;
		var bigImgArr = this.state.bigImgArr;
		if (bigImgArr != '') {
			obj_bigImg = <Public_BIGImg bigImgArr={bigImgArr} />;
		}
		var fixBg_style = {
			'height': document.body.scrollHeight
		};
		var fixBgmain_style = {
			'width': document.body.scrollWidth - 140
		}
		return (
			<div>
				<section className="container" >
					<aside className="row time" onTouchStart={this.showDate}>
						<span id="selectdate">{currentDate}</span> <span id="selectday">DAY<span id="dayc">{days}</span></span>
					</aside>
					<ImgUpLoadArea />
					<div className="prompt">
						<div id="prompt" onClick={this.ShowUploadSugHandle}>
							<img className="prompt-img" src="image/figureContrast/i.png" />
							<div className="prompt-content">拍摄及上传要求</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-12 line-1px"></div>
					<div className="tishi">您还可以为照片添加标记：</div>

					<aside id="selectweight" className="row weight" onTouchStart={this.WeightHandleClick}>
						<span className="weight-name">体重/脂肪</span>
						<span id="weightdata">
							<span id="weight">{HTMLweight.weight}</span>
							<span id="fat">{HTMLweight.fat}</span>
							<span className="clear" onTouchStart={this.delWeightClick} style={{ 'display': 'none' }}></span>
						</span>
					</aside>
					<aside id="selectwaist" className="row waist" onTouchStart={this.getWaistList}>
						<span className="waist-name">腰围</span><span id="waistdata">
							<span className="waistdatas">{waistMeasure}</span>
							<span className="clear" ref='delWaist' style={{ 'display': 'none' }} onTouchStart={this.delWaist}></span>
						</span>
					</aside>
					<a className="row upload" onTouchStart={this.UpLoadHandleClick}>上传</a>
					{obj_bigImg}
					{/*<div className="backall" onClick={this.HideBigImg}></div>*/}
					<div className="backscroll-time" ref="backscroll_time">
						<div className="select-container" >
							<div className="select-title" >
								<div className="select-cancel" onClick={this.CancelHandleClick}></div>
								<div className="select-head">选择拍照日期</div>
								<div className="select-sure" onClick={this.SureHandleClick}></div>
							</div>
							<div className="select-content swiper-container">
								<img src="http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/top-meng.png" className="top-meng" />
								<img src="http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/bottom-meng.png" className="bottom-meng" />
								<div className="swiper-wrapper">
									{DateHTMLArr}
								</div>
								<div className="doubleline" style={DoublelineStyle}></div>
							</div>
						</div>
					</div>
					<FatWeigthSelect data_fat={weightDate} />
					<div className="backscroll-waist" ref="backscroll_waist">
						<div className="select-container">
							<div className="select-title">
								<div className="select-cancel" onClick={this.WaistCancelClick}></div>
								<div className="select-head">添加腰围</div>
								<div className="select-sure" onClick={this.WaistSureClick}></div>
							</div>
							<div className="select-content">
								<div className="waistList" onTouchStart={this.WaistTouchStart} onTouchMove={this.WaistTouchMove} onTouchEnd={this.WaistTouchEnd}>
									<div id="num"><span className="num"></span>cm</div>
									<div id="line-main">
										<img src="image/figureContrast/left-meng.png" className="left-meng" />
										<img src="image/figureContrast/right-meng.png" className="right-meng" />
										<canvas id="line" width="44880" height="180"></canvas>
									</div>
									<div id="line-bg"></div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<aside className="row fixBg" style={fixBg_style}>
					<div className="col-xs-12 col-sm-12 fixBg-main" style={fixBgmain_style}>
						<div className="row">
							<div className="col-xs-12 col-sm-12 fixBg-top">
								<div className="row">
									<div className="col-xs-12 col-sm-12 fixBg-p">222222</div>
								</div>
							</div>
						</div>
					</div>
				</aside>
				<UploadQuestion />
				<Public_Error />
				<div className="saveImg-ceng">
					<aside className="row saveImg">
						<div className="col-xs-12 col-sm-12 saveImg-btn saveImg-item" onClick={Fc_bindBigImg.saveImgBtnTouchStart}>保存图片</div>
						<div className="col-xs-12 col-sm-12 cancelImg-btn saveImg-item" onClick={Fc_bindBigImg.cancelImgBtnTouchStart}>取消</div>
					</aside>
				</div>
			</div>
		)
	},
});
ReactDOM.render(<ImgUpLoad />, document.getElementById('uploadImgBox'));

$(function () {
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
	var uptitleData = {
		title: '上传照片',
		color: "",
		opacity: "",
		backgroundColor: "",
		backgroundOpacity: ""
	};
	uptitleData = JSON.stringify(uptitleData);
	appFc.controlTitle(uptitleData);
	leftBtnShow();

})



//移动端显示title栏
function showtitle() {
	var deviceType6 = isMobile();
	if (deviceType6 == "isApp") {
		var data = {
			display: true
		}
		data = JSON.stringify(data);
		appFc.showTitle(data);
	}
}



//判断上传次数，跳转
function uploadLink() {
	var finalUrl = ajaxLink + "/v1/api/campCommon/campPictureCount" + window.location.search + "&campId=" + campId + "&roleId=" + roleId;
	$.ajax({
		type: "get",
		url: finalUrl,
		dataType: "json",
		success: function (data) {
			if (data.code == 200) {
				if (data.resp == 1) {
					if (getParamByUrl("os") == "android") {
						var getPageInfo = function () {
							var data = {
								controlBtn: false,
								function: ""
							};
							return JSON.stringify(data);
						};
						var deviceType = isMobile();
						if (deviceType == "isApp") {
							appFc.showBackBtn(getPageInfo());
						}
					}
					window.location.href = "photoAlbum.html" + window.location.search + "&campId=" + campId + "&roleId=" + roleId;

				} else if (data.resp > 1) {
					if (getParamByUrl("os") == "android") {
						var getPageInfo = function () {
							var data = {
								controlBtn: false,
								function: ""
							};
							return JSON.stringify(data);
						};
						var deviceType = isMobile();
						if (deviceType == "isApp") {
							appFc.showBackBtn(getPageInfo());
						}
					}
					window.location.href = "figureContrast2.html" + window.location.search + "&campId=" + campId + "&roleId=" + roleId;

				}
				UpLoadHandleClickBtn=true;
			}
			else {
				UpLoadHandleClickBtn=true;
				$(".error-main-t").html(data.result.message);
				$(".errorAlert").css("display", "block");
				$(".error-main").css("margin-top", -$(".error-main").height() / 2);
			}
		}
	})
}

function leftBtnShow() {
	var deviceType = isMobile();//判断是不是app的方法
	var getPageInfo = function () {
		var data = {
			/*iconType:1,//0:默认箭头，1：叉，2：iconUrl传图片
			backNum:1,//1为正常后退，
			closeWebview:0,//默认为0
			iconUrl:"",
			hidden:false*/
			iconType: 1,
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
	if (deviceType == "isApp") {
		appFc.controlLeft(getPageInfo());
	}
	if (getParamByUrl("os") == "android") {
		var getPageInfo1 = function () {
			var data = {
				controlBtn: false,
				function: ""
			};
			return JSON.stringify(data);
		};
		var deviceType = isMobile();
		if (deviceType == "isApp") {
			appFc.showBackBtn(getPageInfo1());
		}
	}
}


function leftBtnHide() {
	var deviceType = isMobile();//判断是不是app的方法
	var getPageInfo = function () {
		var data = {
			/*iconType:1,//0:默认箭头，1：叉，2：iconUrl传图片
			backNum:1,//1为正常后退，
			closeWebview:0,//默认为0
			iconUrl:"",
			hidden:true*/
			iconType: 1,
			iconColor: "",
			backNum: 1,
			closeWebview: 0,
			hidden: true,
			isHandle: false,
			functionName: ""
			//isRefreshPage:true
		};
		return JSON.stringify(data);
	};
	if (deviceType == "isApp") {
		appFc.controlLeft(getPageInfo());
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

