var STaDeXiangCe = {
	SCategory_STaDeXiangCe: 5070600,
	STaDeXiangCe_XianShiYuLanTu: 5070601//显示预览图
};
var frontdefaultImg = ["http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-front-w.png", "http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-front-m.png"];
var sidedefaultImg = ["http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-side-w.png", "http://cdn2.picooc.com/web/res/fatburn/image/figureContrast/photo-side-m.png"];

var campId = getParamByUrl("campId");
var roleId = getParamByUrl("roleId");
$(function () {
	// topleftBtn(); //左上角控制


	appNoShare();
	//数据列表
	getPictureList();
	//右上角按钮显示
	// rightBtnShow();


})

//获取我的相册照片
function getPictureList() {
	// var campId=getParamByUrl("campId");
	// var roleId=getParamByUrl("roleId");
	var targetRoleId = getParamByUrl("targetRoleId");
	var campId = getParamByUrl("targetCampId");
	// alert(targetRoleId);
	// var finalUrl="";
	// if(getParamByUrl("roleId")!="false"){
	// 	var searchLink=removeParamByUrl("roleId");
	// 	var finalUrl=ajaxLink+"/v1/api/campStu/pictureList"+searchLink+"&roleId="+targetRoleId+"&campId="+campId;
	// }else{
	// 	var finalUrl=ajaxLink+"/v1/api/campStu/pictureList"+window.location.search+"&targetRoleId="+targetRoleId+"&campId="+campId;
	// }
	var finalUrl = ajaxLink + "/v1/api/campStu/pictureList" + window.location.search + "&targetRoleId=" + targetRoleId + "&campId=" + campId;
	// alert(finalUrl);
	$.ajax({
		type: "get",
		url: finalUrl,
		dataType: "json",
		success: function (data) {
			if (data.code == 200) {
				if (data.resp.sex == 0) {
					var defaultFrontUrl = frontdefaultImg[0];
					var defaultSideUrl = sidedefaultImg[0];
				} else {
					var defaultFrontUrl = frontdefaultImg[1];
					var defaultSideUrl = sidedefaultImg[1];
				}
				console.log("success");
				if (data.resp.data.length > 0) {
					var str = "";
					var isscale1 = "getImg-bg";
					var isscale2 = "getImg-bg";
					for (i = 0; i < data.resp.data.length; i++) {
						if (data.resp.data[i].frontPicture == "" || data.resp.data[i].frontPicture == null) {
							data.resp.data[i].frontPicture = defaultFrontUrl;
							isscale1 = "";
						} else { isscale1 = "getImg-bg"; }
						if (data.resp.data[i].facePicture == "" || data.resp.data[i].facePicture == null) {
							data.resp.data[i].facePicture = defaultSideUrl;
							isscale2 = "";
						} else { isscale2 = "getImg-bg"; }
						if (data.resp.data[i].weight == null || data.resp.data[i].weight == "") {
							data.resp.data[i].weight = "--";
						}
						if (data.resp.data[i].fat == null || data.resp.data[i].fat == "") {
							data.resp.data[i].fat = "--";
						}
						if (data.resp.data[i].waistMeasure == null || data.resp.data[i].waistMeasure == "") {
							data.resp.data[i].waistMeasure = "--";
						}
						str += '<aside class="row page1 msgType1" campPictureId=' + data.resp.data[i].id + '>' +

							'<article class="row list">' +
							'<aside class="row part ">' +
							'<div class="col-xs-2 col-sm-2 partLeft2">' +
							'<div class="row">' +
							'<div class="col-xs-12 col-sm-12 partLeft-p1">' +
							'<span>DAY</span></div>' +
							'<div class="col-xs-12 col-sm-12 partLeft-p2">' +
							'<span>' + data.resp.data[i].day + '</span></div>' +
							'<div class="col-xs-12 col-sm-12 partLeft-p3">' +
							'<span>' + data.resp.data[i].time + '</span></div>' +
							'</div>' +
							'</div>' +
							'<div class="col-xs-12 col-sm-12 partRight" part="2">' +
							'<div class="content"><span class="" style="width:35%;">体重:<span class="weight">' + data.resp.data[i].weight + 'KG</span></span><span class="" style="width:30%;">脂肪:<span class="fat">' + data.resp.data[i].fat + '%</span></span><span class="" style="width:35%;">腰围:<span class="waistline">' + data.resp.data[i].waistMeasure + 'CM</span></span></div>' +
							'<div class="row ">' +
							'<div class="col-xs-6 col-sm-6 partRight-img">' +
							'<div class="col-xs-12 col-sm-12 partRight-img-li partRight-img-li2 ' + isscale1 + '" objimg="img2" objimgindex="0" style="background-image: url(' + data.resp.data[i].frontPicture + ');"></div>' +
							'</div>' +
							'<div class="col-xs-6 col-sm-6 partRight-img">' +
							'<div class="col-xs-12 col-sm-12 partRight-img-li partRight-img-li2 ' + isscale2 + '" objimg="img2" objimgindex="0" style="background-image: url(' + data.resp.data[i].facePicture + ');"></div>' +
							'</div>' +
							'</div>' +
							'</div>' +
							'</aside>' +
							'</article>' +
							'<div class="manage"><a class="edit" campPictureId=' + data.resp.data[i].id + ' day=' + data.resp.data[i].day + ' waistMeasure=' + data.resp.data[i].waistMeasure + ' fat=' + data.resp.data[i].fat + ' weight=' + data.resp.data[i].weight + ' facePicture=' + data.resp.data[i].facePicture + ' frontPicture=' + data.resp.data[i].frontPicture + ' datetime=' + data.resp.data[i].time + ' campPictureId=' + data.resp.data[i].id + '></a><span class="del" datetime=' + data.resp.data[i].time + ' campPictureId=' + data.resp.data[i].id + '></span></div>' +
							'</aside>'


					}
					$(".msg").append(str);

					$(".partRight-img-li2").css("height", $(".partRight-img-li2").width() * 366 / 275);
					//part左边距离

					for (var i = 0; i < $(".partLeft-p1 span").length; i++) {
						if ($(".partLeft-p1 span").eq(i).width() > $(".partLeft-p2 span").eq(i).width()) {
							if ($(".partLeft-p3 span").width() > $(".partLeft-p1 span").width()) {
								$(".partLeft-p1").css("padding-left", ($(".partLeft-p3 span").width() - $(".partLeft-p1 span").width()) / 2);
							}
							else {
								$(".partLeft-p3").css("padding-left", ($(".partLeft-p1 span").width() - $(".partLeft-p3 span").width()) / 2);
							}
							$(".partLeft-p2").eq(i).css("padding-left", parseInt($(".partLeft-p1").eq(0).css("padding-left")) + ($(".partLeft-p1 span").eq(i).width() - $(".partLeft-p2 span").eq(i).width()) / 2 - 1);
						}
						else {
							$(".partLeft-p1").eq(i).css("padding-left", ($(".partLeft-p2 span").eq(i).width() - $(".partLeft-p1 span").eq(i).width()) / 2);
							$(".partLeft-p3").eq(i).css("padding-left", ($(".partLeft-p2 span").eq(i).width() - $(".partLeft-p3 span").eq(i).width()) / 2);
						}
					}
					// //底部上传按钮位置
					// var height = $(".container").height()+$(".upload").height()+60;
					// if(height<= window.innerHeight){
					// 	$(".upload").css({"position": "absolute","left":"8%","bottom":"30px"});
					// }else{
					// 	$(".upload").css("margin","30px 8%");
					// }

					//显示预览图
					$(".getImg-bg").unbind("click").click(function () {
						setMaiDian(STaDeXiangCe.SCategory_STaDeXiangCe, STaDeXiangCe.STaDeXiangCe_XianShiYuLanTu);
						//event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动
						var url = $(this).css("background-image");
						$(".backall").css("height", $(window).height() + 70);
						$(".backall").css("background-image", url);
						var deviceType6 = isMobile();
						if (deviceType6 == "isApp" && (typeof mobileApp != "undefined")) {
							var data = {
								display: false
							}
							data = JSON.stringify(data);
							mobileApp.showTitle(data);
						}

						if (getParamByUrl("os") == "android") {
							var getPageInfo = function () {
								var data = {
									controlBtn: true,
									function: "hideIMG"
								};
								return JSON.stringify(data);
							};
							var deviceType = isMobile();
							if (deviceType == "isApp" && (typeof mobileApp != "undefined")) {
								mobileApp.showBackBtn(getPageInfo());
							}
						}
						//$(".backall").css("height",window.innerHeight+70);
						//$(".backall").css("background-image",url);
						var t1 = setTimeout(function () {
							$("body").css("max-height", $(window).height());
							$("body").css("overflow", "hidden");
							$(".backall").css("display", "block");
							document.addEventListener('touchmove', function (event) {
								//判断条件,条件成立才阻止背景页面滚动,其他情况不会再影响到页面滚动
								if ($("body").css("overflow") == "hidden") {
									event.preventDefault();
								}
							})
						}, 200);
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
							mobileApp.saveImg(getPageInfo());
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



function appNoShare() {

	var titleData = {
		title: 'Ta的相册',
		color: "",
		opacity: "",
		backgroundColor: "",
		backgroundOpacity: ""
	};
	titleData = JSON.stringify(titleData);
	appFc.controlTitle(titleData);
	// var getPageInfo = function () {
	// 	var data = {
	// 		title:'Ta的相册',
	// 		isShare:false,
	// 		backgroundColor:'#2c2f31'
	// 	};
	// 	return JSON.stringify(data);
	// };
	// var deviceType=isMobile();
	// 	if(deviceType == "isApp" && (typeof mobileApp != "undefined")){
	// 	mobileApp.getShareInfo(getPageInfo());
	// }
	// /*mobileApp.getShareInfo(getPageInfo());*/
	// document.documentElement.style.webkitTouchCallout='none';
}



function hideIMG() {
	var deviceType7 = isMobile();
	if (deviceType7 == "isApp" && (typeof mobileApp != "undefined")) {
		var data = {
			display: true
		}
		data = JSON.stringify(data);
		mobileApp.showTitle(data);
	};

	if (getParamByUrl("os") == "android") {
		var getPageInfo = function () {
			var data = {
				controlBtn: false,
				function: ""
			};
			return JSON.stringify(data);
		};
		mobileApp.showBackBtn(getPageInfo());
	}
	/*$(".backall").css("height","0");
	$(".backall").css("background-image","");*/
	$(".backall").css("display", "none");
	$("body").css("overflow", "auto");
	$("body").css("max-height", "auto");
	document.addEventListener('touchmove', function (event) {
		//判断条件,条件成立才阻止背景页面滚动,其他情况不会再影响到页面滚动
		if ($("body").css("overflow") == "hidden") {
			event.preventDefault();
		}
	})
}

function hideBigImg() {
	//隐藏预览图
	var deviceType7 = isMobile();
	if (deviceType7 == "isApp" && (typeof mobileApp != "undefined")) {
		var data = {
			display: true
		}
		data = JSON.stringify(data);
		mobileApp.showTitle(data);
	};

	if (getParamByUrl("os") == "android") {
		var getPageInfo = function () {
			var data = {
				controlBtn: false,
				function: ""
			};
			return JSON.stringify(data);
		};
		if (deviceType7 == "isApp" && (typeof mobileApp != "undefined")) {
			mobileApp.showBackBtn(getPageInfo());
		};
	}
	/*$(".backall").css("height","0");
	$(".backall").css("background-image","");*/
	$(".backall").css("display", "none");
	$("body").css("overflow", "auto");
	$("body").css("max-height", "auto");
	document.addEventListener('touchmove', function (event) {
		//判断条件,条件成立才阻止背景页面滚动,其他情况不会再影响到页面滚动
		if ($("body").css("overflow") == "hidden") {
			event.preventDefault();
		}
	})
}