var uploadtype = "";
var isshowbtn1 = 0; //上传按钮颜色判断
var isshowbtn2 = 0;
var dateListLen = 0; //日期列表长度
var weightIndex = 0; //默认选中的体重体脂数据索引
var isWeightDate = 0; //体重脂肪是否有数据 
var sex = "";
var strTime = "";
var weight = ""; //被选中的体重数值
var fat = "";	//被选中的脂肪数值
var waistMeasure = "";
var campId = getParamByUrl("campId");
var roleId = getParamByUrl("roleId");
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
var loadImg = { "campId": campId, "roleId": roleId, "frontPicture": "", "facePicture": "", "weight": weight, "fat": fat, "waistMeasure": "", "day": "", "time": "" };
$(function () {
	var deviceType = isMobile();
	if (deviceType == "isApp" && (typeof mobileApp != "undefined") && (getParamByUrl("testtype") != "tanchao")) {
		var getPageInfo = function () {
			var data = {
				/*iconType:1,//0:默认箭头，1：叉，2：iconUrl传图片
				backNum:1,
				closeWebview:0,//默认为0
				iconUrl:""*/
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
		if (getParamByUrl("os") == "android") {
			mobileApp.controlLeft(getPageInfo());
		}
		else {
			mobileApp.controlLeft.postMessage(getPageInfo());
		}
		//mobileApp.showLeftBtn(getPageInfo());
	}

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
	$(".prompt-back").css("height", $(window).height());
	$(".prompt-main").css("width", $(window).width() - 50);
	var fontHeight = parseInt($("html").css("font-size"));
	var paddingTop = 1.4375 * fontHeight;
	if (window.innerHeight < 440) {
		$(".prompt-main").css("padding", "1rem 1.5625rem");
		$(".prompt-main .content p").css("margin-bottom", "0.5rem");
		paddingTop = 1 * fontHeight;
	}

	$(".prompt").unbind("click").click(function () {
		setMaiDian(SShangChuanZhaoPian.SCategory_SShangChuanZhaoPian, SShangChuanZhaoPian.SShangChuanZhaoPian_ChaKanShangChuanYaoQiu);
		leftBtnHide();
		if (getParamByUrl("os") == "android") {
			var  getPageInfo  =  function  () {
				var  data  =  {
					controlBtn: true,
					function: "promptAndroid"
				};
				return  JSON.stringify(data);
			};
			var deviceType = isMobile();
			if (deviceType == "isApp" && (typeof mobileApp != "undefined")) {
				if (getParamByUrl("os") == "android") {
					mobileApp.showBackBtn(getPageInfo());
				}
				else {
					mobileApp.showBackBtn.postMessage(getPageInfo());
				}
				//mobileApp.showBackBtn(getPageInfo());
			}
		}
		$(".prompt-back").css("display", "block");
		$(".prompt-pic-left").css("height", $(".prompt-pic-left").width() * 4 / 3);
		$(".prompt-pic-right").css("height", $(".prompt-pic-left").width() * 4 / 3);
		$(".prompt-main").css("margin-top", -$(".prompt-main").height() / 2 - paddingTop);
	});
	$(".prompt-main").unbind("click").click(function (event) {
		event.stopPropagation();
	});
	$(".prompt-main .del").unbind("click").click(function (event) {
		event.stopPropagation();
		$(".prompt-back").css("display", "none");
		leftBtnShow();
	});
	$(".prompt-back").unbind("click").click(function (event) {
		event.stopPropagation();
		$(".prompt-back").css("display", "none");
		leftBtnShow();
	});

	$(".fixBg").css("height", $(window).height());
	$(".fixBg-main").css("width", $(window).width() - 140);
	$(".fixBg-btn").unbind("click").click(function () {
		$(".fixBg").css("display", "none");
	});
	$(".front").css("height", $(".front").width() * 408 / 306);
	$(".side").css("height", $(".side").width() * 408 / 306);


	appNoShare();
	addfrontImg();
	addsideImg();
	//获取日期列表
	getDateList();


	$("#selectdate").unbind("click").click(function () {
		showDate();
		setMaiDian(SShangChuanZhaoPian.SCategory_SShangChuanZhaoPian, SShangChuanZhaoPian.SShangChuanZhaoPian_XuanZePaiZhaoRiQi);
	});
	$("#selectday").unbind("click").click(function () {
		showDate();
		setMaiDian(SShangChuanZhaoPian.SCategory_SShangChuanZhaoPian, SShangChuanZhaoPian.SShangChuanZhaoPian_XuanZePaiZhaoRiQi);
	});
	$("#selectweight").unbind("click").click(function () {
		event.stopPropagation();
		setMaiDian(SShangChuanZhaoPian.SCategory_SShangChuanZhaoPian, SShangChuanZhaoPian.SShangChuanZhaoPian_TianJiaTiZhi);
		//如果没有体重脂肪数据
		if (isWeightDate == 1) {
			// var dayc = $("#dayc").html();
			// $(".fixBg-t").css("display","none");
			// $(".fixBg-p2").css("display","none");
			$(".fixBg-p").css("display", "block");
			// if(dayc == 0){
			// 	$(".fixBg-p").html("不要着急哦~明天正式开营就可添加身体数据啦~");
			// }else{
			// 	$(".fixBg-p").html("暂无测量数据哦，赶快去上秤吧~");
			// }
			$(".fixBg").css("display", "block");
			$(".fixBg-p").html("暂无测量数据哦，赶快去上秤吧~");
			$(".fixBg-main").css("margin-top", -$(".fixBg-main").height() / 2);
			setTimeout(function () {
				$(".fixBg").css("display", "none");
				$(".fixBg-p").css("display", "none");
			}, 1500);

		} else {
			getCampBodyIndexData(1);

		}
	});

	$("#selectwaist").unbind("click").click(function () {
		getWaistList();
		setMaiDian(SShangChuanZhaoPian.SCategory_SShangChuanZhaoPian, SShangChuanZhaoPian.SShangChuanZhaoPian_TianJiaYaoWei);
	});
	//上传照片
	$(".upload").unbind("click").click(function (event) {
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
		// loadImg["day"]=day;
		// loadImg["time"]=time;
		if (isshowbtn1 != 0 || isshowbtn2 != 0) {
			// http://192.168.0.2:8086/v1/api/campStu/pictureIn
			// var campPictureDO = JSON.stringify(loadImg);
			if (weight == undefined) {
				weight = "";
			}
			if (fat == undefined) {
				fat = "";
			}
			var dayUrl = ajaxLink + "/v1/api/campStu/pictureIn" + window.location.search + "&campId=" + campId + "&roleId=" + roleId + "&frontPicture=" + loadImg.frontPicture + "&facePicture=" + loadImg.facePicture + "&weight=" + weight + "&fat=" + fat + "&waistMeasure=" + waistMeasure + "&day=" + day + "&time=" + time;
			//alert(dayUrl);
			$.ajax({
				type: "get",
				url: dayUrl,
				dataType: "json",
				success: function (data) {
					console.log(data);
					if (data.code == 200) {
						$(".upload").css("opacity", "0.6");
						// alert(JSON.stringify(data));
						console.log("success");
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
							if (deviceType == "isApp" && (typeof mobileApp != "undefined")) {
								if (getParamByUrl("os") == "android") {
									mobileApp.changeGirth(getPageInfo9());
								}
								else {
									mobileApp.changeGirth.postMessage(getPageInfo9());
								}
								//mobileApp.changeGirth(getPageInfo9());
							}
						}

						//给客户端传腰围值结束
						var uploadurl = getCookie("uploadurl");
						if (uploadurl && uploadurl == 0) {
							uploadLink();
							// window.localStorage.removeItem("uploadurl"); //删除本地缓存中的标识
						} else if (uploadurl && uploadurl == 1) {
							var deviceType = isMobile();
							if (deviceType == "isApp" && (typeof mobileApp != "undefined")) {
								if (getParamByUrl("os") == "android") {
									var  getPageInfo1  =  function  () {
										var  data  =  {
											controlBtn: false,
											function: ""
										};
										return  JSON.stringify(data);
									};
									var deviceType = isMobile();
									if (deviceType == "isApp" && (typeof mobileApp != "undefined")) {
										if (getParamByUrl("os") == "android") {
											mobileApp.showBackBtn(getPageInfo1());
										}
										else {
											mobileApp.showBackBtn.postMessage(getPageInfo1());
										}
										//mobileApp.showBackBtn(getPageInfo1());
									}
								}
								var getPageInfo = function () {
									var data = {
										backNum: 1,//默认为1，
										closeWebview: 0,//默认为0
									};
									return JSON.stringify(data);
								};
								if (deviceType == "isApp" && (typeof mobileApp != "undefined")) {
									if (getParamByUrl("os") == "android") {
										mobileApp.deleteHistory(getPageInfo());
									}
									else {
										mobileApp.deleteHistory.postMessage(getPageInfo());
									}
									//mobileApp.deleteHistory(getPageInfo());
								}
							} else {
								history.go(-1);
								location.reload();
							}
							// window.localStorage.removeItem("uploadurl"); //删除本地缓存中的标识
						}

					}
					else {
						// alert(data.result.message);
						$(".error-main-t").html(data.result.message);
						$(".errorAlert").css("display", "block");
						$(".error-main").css("margin-top", -$(".error-main").height() / 2);
					}
				}
			})
		}
	});
})

function getWaistList() {

	$(".backscroll-waist").css("height", $(window).height());
	//$(".backscroll-waist").show();
	$(".backscroll-waist").css("display", "block");
	/*var str="";
	for(var i=480;i<1840;i++){
		str+='<div class="swiper-slide">'+i+'</div>';
	}
	$(".waistList").html(str);
	var x=(1840-480)/2;
	var mySwiper2 = new Swiper('.backscroll-waist .swiper-container', {
		centeredSlides: true,
		slidesPerView : 10,
		initialSlide:x

	});*/
	//腰围画图开始
	//var tScale  = window.devicePixelRatio;
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
		var leftNum = -13412;
	} else {
		startNum = 70;
		var linewidth = 13090;
		var iNum = 1190;
		var minNum = 42;
		var minNum2 = 4200;
		var leftNum = -11713;
	}
	/*$("#line").css("width",8160+'px');
	$("#line").css("height",60+'px');
	$("#line").attr("width",8160*tScale);
	$("#line").attr("height",60*tScale);*/
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
	var startX;
	var startY;
	var moveEndX;
	var moveEndY;
	var testLeft;
	$("#line-bg").css("left", parseInt($(window).width() / 2));
	$("#line").css("left", parseInt(parseInt($(window).width() / 2) + minNum2) - startNum * 100);
	//$("#line").css("left",(parseInt($("#line").css("left")))+(parseInt($(window).width()/2)-parseInt($("#line").css("left")))%10);
	$(".num").html((parseInt($(window).width() / 2) - parseInt($("#line").css("left")) + minNum2) / 100);
	//$(".line").css("left","-1px");
	$(".waistList").on("touchstart", function (e) {
		event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动  
		startX = e.originalEvent.changedTouches[0].pageX,
			startY = e.originalEvent.changedTouches[0].pageY;
		testLeft = parseInt($("#line").css("left"));
	});
	$(".waistList").on("touchmove", function (e) {
		moveEndX = e.originalEvent.changedTouches[0].pageX;
		moveEndY = e.originalEvent.changedTouches[0].pageY;
		var moveX;
		var moveY;
		moveX = moveEndX - startX;
		moveY = moveEndY - startY;

		if ((testLeft + moveX) > $(window).width() / 2) {
			$("#line").css("left", $(window).width() / 2);
		}
		else if ((testLeft + moveX) < leftNum - $(window).width() / 10) {
			$("#line").css("left", leftNum + "px");
		}
		else {
			$("#line").css("left", testLeft + moveX);
		}

	});

	$(".waistList").on("touchend", function (e) {
		$("#line").css("left", (parseInt($("#line").css("left"))) + (parseInt($(window).width() / 2) - parseInt($("#line").css("left"))) % 10);
		//alert($("#line").css("left"));
		//alert((parseInt($(window).width()/2)-parseInt($("#line").css("left"))+minNum2)/100);
		if (sex == 0) { //男性
			if ((parseInt($(window).width() / 2) - parseInt($("#line").css("left")) + minNum2) / 100 > 160.9) {
				(".num").html(160.9);
				$(".waistList").unbind("touchstart", "touchmove", "touchend");
			} else {
				$(".num").html((parseInt($(window).width() / 2) - parseInt($("#line").css("left")) + minNum2) / 100);
			}
		} else if (sex == 1) {
			if ((parseInt($(window).width() / 2) - parseInt($("#line").css("left")) + minNum2) / 100 > 183.9) {
				(".num").html(183.9);
				$(".waistList").unbind("touchstart", "touchmove", "touchend");
			} else {
				$(".num").html((parseInt($(window).width() / 2) - parseInt($("#line").css("left")) + minNum2) / 100);
			}
		}
		/*if((parseInt($(window).width()/2)-parseInt($("#line").css("left"))+minNum2)/100 > 160.9){
			(".num").html(160.9);
			$(".waistList").unbind("touchstart", "touchmove", "touchend");
		}else{
			$(".num").html((parseInt($(window).width()/2)-parseInt($("#line").css("left"))+minNum2)/100);
		}*/
	});

	if ($('.backscroll-waist').is(":visible") == true) {//如果选择腰围的div加载出来，则隐藏左上角返回按钮；
		leftBtnHide();
	}
	if (getParamByUrl("os") == "android") {
		var  getPageInfo  =  function  () {
			var  data  =  {
				controlBtn: true,
				function: "wasitAndroid"
			};
			return  JSON.stringify(data);
		};
		var deviceType = isMobile();
		if (deviceType == "isApp" && (typeof mobileApp != "undefined")) {
			if (getParamByUrl("os") == "android") {
				mobileApp.showBackBtn(getPageInfo());
			}
			else {
				mobileApp.showBackBtn.postMessage(getPageInfo());
			}
			//mobileApp.showBackBtn(getPageInfo());
		}
	}
	$(".select-container").unbind("click").click(function (event) {
		event.stopPropagation();
	});
	$(".select-cancel").unbind("click").click(function (event) {
		event.stopPropagation();
		$(".backscroll-waist").hide();
		leftBtnShow();
		setMaiDian(SShangChuanZhaoPian.SCategory_SShangChuanZhaoPian, SShangChuanZhaoPian.SShangChuanZhaoPian_QuXiaoXuanZeYaoWei);
	});
	$(".backscroll-waist").unbind("click").click(function () {
		event.stopPropagation();
		$(".backscroll-waist").hide();
		leftBtnShow();
	});

	$(".select-sure").unbind("click").click(function (event) {
		event.stopPropagation();
		waistMeasure = $(".num").html();
		$("#waistdata").html("");
		$(".backscroll-waist").hide();
		$("#waistdata").append('：' + waistMeasure + 'CM<span class="clear"></span>');
		$("#waistdata .clear").unbind("click").click(function (event) {
			event.stopPropagation();
			$("#waistdata").html("");
			waistMeasure = "";
			// showtitle();
		});
		leftBtnShow();
		setMaiDian(SShangChuanZhaoPian.SCategory_SShangChuanZhaoPian, SShangChuanZhaoPian.SShangChuanZhaoPian_XuanZeYaoWei);
	});

}
function addfrontImg() {
	$(".front-default").unbind("click").click(function () {
		uploadtype = 0;
		if (getParamByUrl("testtype") == "tanchao") {
			getImg(["http://cdn2.picooc.com/web/res/event/bottle/image/msg-2.png", "http://cdn2.picooc.com/web/res/event/bottle/image/bg1.jpg"]);
		}
		else {
			var t2 = setTimeout(function () {
				var deviceType4 = isMobile();
				if (deviceType4 == "isApp" && (typeof mobileApp != "undefined")) {
					var data = {
						maxNum: 1,//上传图片的最大个数
						imageType: "bodyImg"
					}
					data = JSON.stringify(data);
					if (getParamByUrl("os") == "android") {
						mobileApp.uploadImg(data);
					}
					else {
						mobileApp.uploadImg.postMessage(data);
					}
					//mobileApp.uploadImg(data);
				}
				clearTimeout(t2);
			}, 250);
		}

		setMaiDian(SShangChuanZhaoPian.SCategory_SShangChuanZhaoPian, SShangChuanZhaoPian.SShangChuanZhaoPian_ShangChuanZhengMianZhao);

	});
}
function addsideImg() {
	$(".side-default").unbind("click").click(function () {
		uploadtype = 1;
		if (getParamByUrl("testtype") == "tanchao") {
			getImg(["http://cdn2.picooc.com/web/res/event/bottle/image/msg-2.png", "http://cdn2.picooc.com/web/res/event/bottle/image/bg1.jpg"]);
		}
		else {

			var t2 = setTimeout(function () {
				var deviceType4 = isMobile();
				if (deviceType4 == "isApp" && (typeof mobileApp != "undefined")) {
					var data = {
						maxNum: 1, //上传图片的最大个数
						imageType: "bodyImg"
					}
					data = JSON.stringify(data);
					if (getParamByUrl("os") == "android") {
						mobileApp.uploadImg(data);
					}
					else {
						mobileApp.uploadImg.postMessage(data);
					}
					//mobileApp.uploadImg(data);
				}
				clearTimeout(t2);
			}, 250);
		}
		setMaiDian(SShangChuanZhaoPian.SCategory_SShangChuanZhaoPian, SShangChuanZhaoPian.SShangChuanZhaoPian_ShangChuanCeMianZhao);
	});
}
function getImg(url) {
	if (uploadtype == 0) {
		$("#front").removeClass("front-default");
		for (var i = 0; i < url.length; i++) {
			$("#front").css("background-image", 'url(' + url[i] + ')');
			loadImg["frontPicture"] = url[i];
		}
		$("#front").addClass("getImg-bg");
		$(".delete1").show();
		$(".upload").css("background-color", "#7fa9ff");
		isshowbtn1 = 1;
	} else if (uploadtype == 1) {
		$("#side").removeClass("side-default");
		for (var i = 0; i < url.length; i++) {
			$("#side").css("background-image", 'url(' + url[i] + ')');
			$("#side").addClass("getImg-bg");
			loadImg["facePicture"] = url[i];
		}
		$(".delete2").show();
		$(".upload").css("background-color", "#7fa9ff");
		isshowbtn2 = 1;
	}

	//删除照片
	$(".delete1").unbind("click").click(function (event) {
		event.stopPropagation();
		$("#front").removeClass("getImg-bg");
		$("#front").css("background-image", "url(http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/front.png)");
		$("#front").addClass("front-default");
		$(this).hide();
		//显示预览图
		// $("#front").unbind("click");
		addfrontImg();
		isshowbtn1 = 0;
		if (isshowbtn2 == 0) {
			$(".upload").css("background-color", "#bbbbbb");
		}
		setMaiDian(SShangChuanZhaoPian.SCategory_SShangChuanZhaoPian, SShangChuanZhaoPian.SShangChuanZhaoPian_ShanChuZhaoPian);
	});
	$(".delete2").unbind("click").click(function (event) {
		event.stopPropagation();
		$("#side").removeClass("getImg-bg");
		$("#side").css("background-image", "url(http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/side.png)");
		$("#side").addClass("side-default");
		$(this).hide();
		addsideImg();
		isshowbtn2 = 0;
		if (isshowbtn1 == 0) {
			$(".upload").css("background-color", "#bbbbbb");
		}
		setMaiDian(SShangChuanZhaoPian.SCategory_SShangChuanZhaoPian, SShangChuanZhaoPian.SShangChuanZhaoPian_ShanChuZhaoPian);
	});


	//显示预览图
	$(".getImg-bg").unbind("click").click(function () {
		var url = $(this).css("background-image");
		var deviceType6 = isMobile();
		if (deviceType6 == "isApp" && (typeof mobileApp != "undefined")) {
			var data = {
				display: false
			}
			data = JSON.stringify(data);
			if (getParamByUrl("os") == "android") {
				mobileApp.showTitle(data);
			}
			else {
				mobileApp.showTitle.postMessage(data);
			}
			//mobileApp.showTitle(data);
		}
		if (getParamByUrl("os") == "android") {
			$(".backall").css("height", $(window).height() + 70);
		}
		else {
			$(".backall").css("height", $(window).height() + 64);
		}
		$(".backall").css("background-image", url);
		$(".backall").css("display", "block");
		if (getParamByUrl("os") == "android") {
			var  getPageInfo  =  function  () {
				var  data  =  {
					controlBtn: true,
					function: "hideIMG"
				};
				return  JSON.stringify(data);
			};
			var deviceType = isMobile();
			if (deviceType == "isApp" && (typeof mobileApp != "undefined")) {
				if (getParamByUrl("os") == "android") {
					mobileApp.showBackBtn(getPageInfo());
				}
				else {
					mobileApp.showBackBtn.postMessage(getPageInfo());
				}
				//mobileApp.showBackBtn(getPageInfo());
			}
		}
		setMaiDian(SShangChuanZhaoPian.SCategory_SShangChuanZhaoPian, SShangChuanZhaoPian.SShangChuanZhaoPian_XianShiYuLanTu);
	});

	//保存图片
	var timeout;

	var timeBtn = true;
	var startX;
	var startY;
	var moveEndX;
	var moveEndY;
	$(".backall").on("touchstart", function (e) {
		startX = e.originalEvent.changedTouches[0].pageX,
			startY = e.originalEvent.changedTouches[0].pageY;
		// var x=$(".bigImg-li").index(this);
		saveLink = $(this).css("background-image").split("\(")[1].split("\)")[0];
		console.log($(this));
		console.log(saveLink);

		console.log($(".backall").css("display"));
		timeout = setTimeout(function () {
			if ($(".backall").css("display") == "block") {
				$(".saveImg-ceng").css("height", $(window).height());
				$(".saveImg-ceng").css("display", "block");
				timeBtn = false;
			}
		}, 500);
		event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动 
	})

	$(".backall").on("touchmove", function (e) {
		if ($(".saveImg-ceng").css("display") == "block") {
			//$(".saveImg-ceng").css("display","none");
			clearTimeout(timeout);
			timeBtn = false;
		}
		else {
			moveEndX = e.originalEvent.changedTouches[0].pageX;
			moveEndY = e.originalEvent.changedTouches[0].pageY;
			var moveX;
			var moveY;
			moveX = moveEndX - startX;
			moveY = moveEndY - startY;

			if (moveX < -50 || moveX > 50 || moveY < -50 || moveY > 50) {
				clearTimeout(timeout);
				timeBtn = false;
			}
		}
		event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动  
	});
	//退出保存图片
	$(".backall").on("touchend", function () {
		clearTimeout(timeout);
		if (timeBtn) {
			hideBigImg();
		}
		timeBtn = true;
		event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动  
	});
	/*$(".bigImg-li").mouseout(function(){
		clearTimeout(timeout);
	});*/
	//调用客户端保存图片方法
	$(".saveImg-btn").unbind("touchstart").bind("touchstart", function (e) {
		//$(".saveImg-btn").unbind("touchstart").touchstart(function(){
		event.stopPropagation();
		event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动  
		var deviceType = isMobile();//判断是不是app的方法
		/*alert(saveLink);
		saveLink=JSON.stringify(saveLink);
		console.log(typeof saveLink);
		console.log(saveLink);*/
		if (deviceType == "isApp" && (typeof mobileApp != "undefined") && (getParamByUrl("testtype") != "tanchao")) {
			var getPageInfo = function () {
				var data = {
					url: saveLink
				};
				return JSON.stringify(data);
			};
			if (getParamByUrl("os") == "android") {
				mobileApp.saveImg(getPageInfo());
			}
			else {
				mobileApp.saveImg.postMessage(getPageInfo());
			}
			//mobileApp.saveImg(getPageInfo());
		}
		$(".saveImg-ceng").css("display", "none");
		//$(".saveImg-btn").unbind("touchstart");
	});
	//取消客户端保存图片
	$(".cancelImg-btn").on("touchstart", function (e) {
		event.stopPropagation();
		event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动 
		$(".saveImg-ceng").css("display", "none");

	});
	$(".saveImg-ceng").on("touchstart", function (e) {

		$(".saveImg-ceng").css("display", "none");
		event.stopPropagation();
		event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动  
	});

}

function hideBigImg() {
	//隐藏预览图
	var deviceType6 = isMobile();
	if (deviceType6 == "isApp" && (typeof mobileApp != "undefined")) {
		var data = {
			display: true
		}
		data = JSON.stringify(data);
		if (getParamByUrl("os") == "android") {
			mobileApp.showTitle(data);
		}
		else {
			mobileApp.showTitle.postMessage(data);
		}
		//mobileApp.showTitle(data);
	}
	if (getParamByUrl("os") == "android") {
		var  getPageInfo1  =  function  () {
			var  data  =  {
				controlBtn: false,
				function: ""
			};
			return  JSON.stringify(data);
		};
		var deviceType = isMobile();
		if (deviceType == "isApp" && (typeof mobileApp != "undefined")) {
			if (getParamByUrl("os") == "android") {
				mobileApp.showBackBtn(getPageInfo1());
			}
			else {
				mobileApp.showBackBtn.postMessage(getPageInfo1());
			}
			//mobileApp.showBackBtn(getPageInfo1());
		}
	}

	$(".backall").css("height", "0");
	$(".backall").css("background-image", "");
	$(".backall").css("display", "none");

}
//隐藏日期选择
function hideDate() {
	$(".backscroll-time").hide();
}

//显示日期选择
function showDate() {
	// notshowtitle();
	$(".backscroll-time").css("height", $(window).height());
	$(".backscroll-time").show();
	var mySwiper1 = new Swiper('.backscroll-time .swiper-container', {
		direction: 'vertical',
		slidesPerView: 5,
		initialSlide: dateListLen - 1,
		centeredSlides: true

		/*onInit: function(swiper){
	      $(".swiper-slide-active").css("border-top","1px solid #ccc");
	      $(".swiper-slide-active").css("border-bottom","1px solid #ccc");
		}*/
	});
	console.log(dateListLen - 1);
	leftBtnHide();
	if (getParamByUrl("os") == "android") {
		var  getPageInfo  =  function  () {
			var  data  =  {
				controlBtn: true,
				function: "dateAndroid"
			};
			return  JSON.stringify(data);
		};
		var deviceType = isMobile();
		if (deviceType == "isApp" && (typeof mobileApp != "undefined")) {
			if (getParamByUrl("os") == "android") {
				mobileApp.showBackBtn(getPageInfo());
			}
			else {
				mobileApp.showBackBtn.postMessage(getPageInfo());
			}
			//mobileApp.showBackBtn(getPageInfo());
		}
	}
	$(".select-container").unbind("click").click(function (event) {
		event.stopPropagation();
	});
	$(".select-cancel").unbind("click").click(function (event) {
		event.stopPropagation();
		hideDate();
		// showtitle();
		leftBtnShow();
		setMaiDian(SShangChuanZhaoPian.SCategory_SShangChuanZhaoPian, SShangChuanZhaoPian.SShangChuanZhaoPian_QuXiaoXuanZeShiJian);
	});
	$(".backscroll-time").unbind("click").click(function () {
		event.stopPropagation();
		hideDate();
		// showtitle();
		leftBtnShow();

	});
	$(".select-sure").unbind("click").click(function (event) {
		event.stopPropagation();
		hideDate();
		// showtitle();
		$("#selectdate").html($(".swiper-slide-active").html());
		leftBtnShow();
		strTime = $(".swiper-slide-active").attr("time");
		getCampDay(strTime);
		setMaiDian(SShangChuanZhaoPian.SCategory_SShangChuanZhaoPian, SShangChuanZhaoPian.SShangChuanZhaoPian_XuanZeShiJian);
	});


}

//显示体重/脂肪选择
function showWeight() {
	// notshowtitle();

	console.log(weightIndex);
	console.log($(".backscroll-weight .swiper-container .swiper-slide").length);
	$(".backscroll-weight").css("height", $(window).height());
	/*$(".backscroll-weight").show();*/
	$(".backscroll-weight").css("display", "block");
	var mySwiper2 = new Swiper('.backscroll-weight .swiper-container', {
		direction: 'vertical',
		initialSlide: weightIndex,
		slidesPerView: 5,
		centeredSlides: false,


	});
	$(".backscroll-weight .swiper-wrapper .swiper-slide").eq(weightIndex).css("background-image", "url(http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/pick.png)");
	/*if(weightIndex>($(".backscroll-weight .swiper-container .swiper-slide").length-5)){
		$(".backscroll-weight .swiper-wrapper .swiper-slide").eq(weightIndex).css("background-image","url(image/figureContrast/pick.png)");
		
	}
	else{
		$(".backscroll-weight .swiper-wrapper .swiper-slide.swiper-slide-active").css("background-image","url(image/figureContrast/pick.png)");
	}*/
	weight = $(".backscroll-weight .swiper-wrapper .swiper-slide").eq(weightIndex).find(".selectweight-weight").html();
	fat = $(".backscroll-weight .swiper-wrapper .swiper-slide").eq(weightIndex).find(".selectweight-fat").html();
	leftBtnHide();
	if (getParamByUrl("os") == "android") {
		var  getPageInfo  =  function  () {
			var  data  =  {
				controlBtn: true,
				function: "weightAndroid"
			};
			return  JSON.stringify(data);
		};
		var deviceType = isMobile();
		if (deviceType == "isApp" && (typeof mobileApp != "undefined")) {
			if (getParamByUrl("os") == "android") {
				mobileApp.showBackBtn(getPageInfo());
			}
			else {
				mobileApp.showBackBtn.postMessage(getPageInfo());
			}
			//mobileApp.showBackBtn(getPageInfo());
		}
	}
	$(".select-container").unbind("click").click(function (event) {
		event.stopPropagation();
	});
	$(".select-cancel").unbind("click").click(function (event) {
		event.stopPropagation();
		$(".backscroll-weight").hide();
		// showtitle();
		if ($("#weight") || $("#fat")) {
			weight = $("#weight").html();
			fat = $("#fat").html();
		} else {
			weight = "";
			fat = "";
		}
		leftBtnShow();
		setMaiDian(SShangChuanZhaoPian.SCategory_SShangChuanZhaoPian, SShangChuanZhaoPian.SShangChuanZhaoPian_QuXiaoXuanZeTiZhi);
	});
	$(".backscroll-weight").unbind("click").click(function () {
		event.stopPropagation();
		$(".backscroll-weight").hide();
		// showtitle();
		if ($("#weight") || $("#fat")) {
			weight = $("#weight").html();
			fat = $("#fat").html();
		} else {
			weight = "";
			fat = "";
		}
		leftBtnShow();

	});


	$(".backscroll-weight .swiper-wrapper .swiper-slide").unbind("click").click(function () {
		$(".backscroll-weight .swiper-wrapper .swiper-slide").css("background-image", "url(http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/nopick.png)");
		$(this).css("background-image", "url(http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/pick.png)");
		weight = $(this).find(".selectweight-weight").html();
		fat = $(this).find(".selectweight-fat").html();
		weightIndex = $(".backscroll-weight .swiper-wrapper .swiper-slide").index(this);
		// $("#selectdate").html($(".swiper-slide-active").html());
	});
	$(".select-sure").unbind("click").click(function () {
		$(".backscroll-weight").hide();
		leftBtnShow();
		// showtitle();
		if (weight != "" || fat != "") {
			$("#weightdata").html("");
			$("#weightdata").append('：' + '<span id="weight">' + weight + '</span>' + 'KG/' + '<span id="fat">' + fat + '</span>' + '%<span class="clear"></span>');
			$("#weightdata .clear").unbind("click").click(function (event) {
				event.stopPropagation();
				$("#weightdata").html("");
				weight = "";
				fat = "";
				// showtitle();
			});
		}
		setMaiDian(SShangChuanZhaoPian.SCategory_SShangChuanZhaoPian, SShangChuanZhaoPian.SShangChuanZhaoPian_XuanZeTiZhi);
	});


}
//移动端隐藏title栏
function notshowtitle() {
	var deviceType6 = isMobile();
	if (deviceType6 == "isApp" && (typeof mobileApp != "undefined")) {
		var data = {
			display: false
		}
		data = JSON.stringify(data);
		if (getParamByUrl("os") == "android") {
			mobileApp.showTitle(data);
		}
		else {
			mobileApp.showTitle.postMessage(data);
		}
		//mobileApp.showTitle(data);
	}
}
//移动端显示title栏
function showtitle() {
	var deviceType6 = isMobile();
	if (deviceType6 == "isApp" && (typeof mobileApp != "undefined")) {
		var data = {
			display: true
		}
		data = JSON.stringify(data);
		if (getParamByUrl("os") == "android") {
			mobileApp.showTitle(data);
		}
		else {
			mobileApp.showTitle.postMessage(data);
		}
		//mobileApp.showTitle(data);
	}
}

function appNoShare() {
	var getPageInfo = function () {
		var data = {
			title: '上传照片',
			/*isShare:false,
			backgroundColor:'#2c2f31'*/
			color: "",
			opacity: "",
			backgroundColor: "",
			backgroundOpacity: ""
		};
		return JSON.stringify(data);
	};
	var deviceType = isMobile();
	if (deviceType == "isApp" && (typeof mobileApp != "undefined")) {
		if (getParamByUrl("os") == "android") {
			mobileApp.controlTitle(getPageInfo());
		}
		else {
			mobileApp.controlTitle.postMessage(getPageInfo());
		}
		//mobileApp.getShareInfo(getPageInfo());
	}
	/*mobileApp.getShareInfo(getPageInfo());*/
	document.documentElement.style.webkitTouchCallout = 'none';
}

//获取日期列表
function getDateList() {

	console.log(campId);
	console.log(roleId);
	var finalUrl = ajaxLink + "/v1/api/campCommon/campDateList" + window.location.search + "&campId=" + campId;
	$.ajax({
		type: "get",
		url: finalUrl,
		dataType: "json",
		success: function (data) {
			if (data.code == 200) {
				console.log("success");
				if (data.resp.dateList.length > 0) {
					dateListLen = data.resp.dateList.length;
					var currentDate = data.resp.dateList[data.resp.dateList.length - 1].date;
					strTime = data.resp.dateList[data.resp.dateList.length - 1].time;
					$("#selectdate").html(currentDate);
					getCampDay(strTime);
					// var str1="";
					var str = "";
					var str1 = "";
					var str3 = '<div class="doubleline" style="width:100%;"></div>'
					for (i = 0; i < data.resp.dateList.length; i++) {
						str1 += '<div class="swiper-slide" time=\"' + data.resp.dateList[i].time + '\">' + data.resp.dateList[i].date + '</div>'
					}
					var str4 = '<img src="http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/top-meng.png"  class="top-meng">' +
						'<img src="http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/bottom-meng.png"  class="bottom-meng">';
					// $(".backscroll-time .select-container .swiper-container .swiper-wrapper").append(str1);
					str = str4 + '<div class="swiper-wrapper">' + str1 + '</div>' + str3;
					$(".backscroll-time .select-container .swiper-container").append(str);
					$(".doubleline").css("position", "absolute");
					$(".doubleline").css("left", "0");
					$(".doubleline").css("top", "5.35rem");
					$(".doubleline").css("height", "2.675rem");
					//获取学员历史身体数据
					getCampBodyIndexData(0);
				}

			}
			else {
				// alert(data.result.message);
				$(".error-main-t").html(data.result.message);
				$(".errorAlert").css("display", "block");
				$(".error-main").css("margin-top", -$(".error-main").height() / 2);
			}
		}
	})
}
//入营天数计算
function getCampDay(currentDate) {
	var dayUrl = ajaxLink + "/v1/api/campCommon/campDay" + window.location.search + "&campId=" + campId + "&roleId=" + roleId + "&time=" + currentDate;
	$.ajax({
		type: "get",
		url: dayUrl,
		dataType: "json",
		success: function (data) {
			if (data.code == 200) {
				console.log("success");
				$("#dayc").html(data.resp);
			}
			else {
				// alert(data.result.message);
				$(".error-main-t").html(data.result.message);
				$(".errorAlert").css("display", "block");
				$(".error-main").css("margin-top", -$(".error-main").height() / 2);
			}
		}
	})
}

//学员历史身体数据
function getCampBodyIndexData(param) {
	var time = $("#selectdate").html();
	// alert(time);
	var dayUrl = ajaxLink + "/v1/api/campCommon/campBodyIndexData" + window.location.search + "&campId=" + campId + "&roleId=" + roleId + "&time=" + time;
	$.ajax({
		type: "get",
		url: dayUrl,
		dataType: "json",
		success: function (data) {
			//alert("data.code="+data.code);
			if (data.code == 200) {
				// alert(5);
				console.log("success");
				if (data.resp) {
					//alert("sex="+data.resp.sex);
					if (data.resp.sex) {
						sex = data.resp.sex;
					}
					if (data.resp.bodyIndexDate && data.resp.bodyIndexDate.length > 0) {
						var str2 = "";
						weightIndex = data.resp.beginIndex;
						for (i = 0; i < data.resp.bodyIndexDate.length; i++) {

							str2 += '<div class="swiper-slide">' +
								'<span class="col-xs-5 col-sm-5 selectweight-date">' + data.resp.bodyIndexDate[i].time + '</span>' +
								'<div class="col-xs-3 col-sm-3" style="display:inline-block"><span class="selectweight-fat">' + data.resp.bodyIndexDate[i].bodyFat + '</span><span>%</span></div>' +
								'<div class="col-xs-3 col-sm-3" style="display:inline-block"><span class="selectweight-weight">' + data.resp.bodyIndexDate[i].weight + '</span><span>KG</span></div></div>'
						}
						$(".backscroll-weight .select-container .swiper-container .swiper-wrapper").empty();
						$(".backscroll-weight .select-container .swiper-container .swiper-wrapper").append(str2);
						isWeightDate = 0;
						if (param == 1) {
							showWeight();
						}
					} else {
						isWeightDate = 1;
					}
				}
			}
			else {
				// alert(data.result.message);
				$(".error-main-t").html(data.result.message);
				$(".errorAlert").css("display", "block");
				$(".error-main").css("margin-top", -$(".error-main").height() / 2);
			}
		}
	})
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
				console.log("success");
				if (data.resp == 1) {
					// var deviceType=isMobile();//判断是不是app的方法
					// if(deviceType == "isApp" && (typeof mobileApp != "undefined") && (getParamByUrl("testtype")!="tanchao")){

					// 	var data={
					// 		link:absoluteUrl+"photoAlbum.html"+window.location.search+"&campId="+campId+"&roleId="+roleId,
					// 	    animation: 2//默认1从右到左，2从下到上
					// 	};
					// 	data=JSON.stringify(data);
					// 	mobileApp.openWebview(data);

					// }else{
					if (getParamByUrl("os") == "android") {
						var  getPageInfo  =  function  () {
							var  data  =  {
								controlBtn: false,
								function: ""
							};
							return  JSON.stringify(data);
						};
						var deviceType = isMobile();
						if (deviceType == "isApp" && (typeof mobileApp != "undefined")) {
							if (getParamByUrl("os") == "android") {
								mobileApp.showBackBtn(getPageInfo());
							}
							else {
								mobileApp.showBackBtn.postMessage(getPageInfo());
							}
							//mobileApp.showBackBtn(getPageInfo());
						}
					}
					window.location.href = "photoAlbum.html" + window.location.search + "&campId=" + campId + "&roleId=" + roleId;
					// }
					event.stopPropagation();

				} else if (data.resp > 1) {
					// var deviceType=isMobile();//判断是不是app的方法
					// if(deviceType == "isApp" && (typeof mobileApp != "undefined") && (getParamByUrl("testtype")!="tanchao")){

					// 	var data={
					// 		link:absoluteUrl+"figureContrast2.html"+window.location.search+"&campId="+campId+"&roleId="+roleId,
					// 	    animation: 2//默认1从右到左，2从下到上
					// 	};
					// 	data=JSON.stringify(data);
					// 	mobileApp.openWebview(data);

					// }else{
					if (getParamByUrl("os") == "android") {
						var  getPageInfo  =  function  () {
							var  data  =  {
								controlBtn: false,
								function: ""
							};
							return  JSON.stringify(data);
						};
						var deviceType = isMobile();
						if (deviceType == "isApp" && (typeof mobileApp != "undefined")) {
							if (getParamByUrl("os") == "android") {
								mobileApp.showBackBtn(getPageInfo());
							}
							else {
								mobileApp.showBackBtn.postMessage(getPageInfo());
							}
							//mobileApp.showBackBtn(getPageInfo());
						}
					}
					window.location.href = "figureContrast2.html" + window.location.search + "&campId=" + campId + "&roleId=" + roleId;
					// }
					event.stopPropagation();
				}

			}
			else {
				// alert(data.result.message);
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
	if (deviceType == "isApp" && (typeof mobileApp != "undefined")) {
		if (getParamByUrl("os") == "android") {
			mobileApp.controlLeft(getPageInfo());
		}
		else {
			mobileApp.controlLeft.postMessage(getPageInfo());
		}
		//mobileApp.showLeftBtn(getPageInfo());
	}
	if (getParamByUrl("os") == "android") {
		var  getPageInfo1  =  function  () {
			var  data  =  {
				controlBtn: false,
				function: ""
			};
			return  JSON.stringify(data);
		};
		var deviceType = isMobile();
		if (deviceType == "isApp" && (typeof mobileApp != "undefined")) {
			if (getParamByUrl("os") == "android") {
				mobileApp.showBackBtn(getPageInfo1());
			}
			else {
				mobileApp.showBackBtn.postMessage(getPageInfo1());
			}
			//mobileApp.showBackBtn(getPageInfo1());
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
	if (deviceType == "isApp" && (typeof mobileApp != "undefined")) {
		if (getParamByUrl("os") == "android") {
			mobileApp.controlLeft(getPageInfo());
		}
		else {
			mobileApp.controlLeft.postMessage(getPageInfo());
		}
		//mobileApp.showLeftBtn(getPageInfo());
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

function hideIMG() {
	var deviceType6 = isMobile();
	if (deviceType6 == "isApp" && (typeof mobileApp != "undefined")) {
		var data = {
			display: true
		}
		data = JSON.stringify(data);
		if (getParamByUrl("os") == "android") {
			mobileApp.showTitle(data);
		}
		else {
			mobileApp.showTitle.postMessage(data);
		}
		//mobileApp.showTitle(data);
	}
	if (getParamByUrl("os") == "android") {
		var  getPageInfo1  =  function  () {
			var  data  =  {
				controlBtn: false,
				function: ""
			};
			return  JSON.stringify(data);
		};
		var deviceType = isMobile();
		if (deviceType == "isApp" && (typeof mobileApp != "undefined")) {
			if (getParamByUrl("os") == "android") {
				mobileApp.showBackBtn(getPageInfo1());
			}
			else {
				mobileApp.showBackBtn.postMessage(getPageInfo1());
			}
			//mobileApp.showBackBtn(getPageInfo1());
		}
	}

	$(".backall").css("height", "0");
	$(".backall").css("background-image", "");
}