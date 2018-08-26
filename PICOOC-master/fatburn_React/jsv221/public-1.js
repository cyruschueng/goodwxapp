//所有页面公用参数
var ajaxLink = window.location.protocol + "//" + window.location.host;
var absoluteUrl = "https://a.picooc.com/web/fatburn/";
var maidian = "https://api2.picooc.com";
var locationArr = window.location.pathname.split("\/");
var locationStr = "";
for (var z = 0; z < locationArr.length - 1; z++) {
	locationStr += locationArr[z] + '/';
}

//var ajaxLink="https://pm.picooc.com:444";//测试版
var SAction = {
	SClick_Action: 1// 单击事件
};
var arrHeadImg = ['http://cdn2.picooc.com/web/res/sex0.png', 'http://cdn2.picooc.com/web/res/sex1.png'];
var fontHeight = parseInt($("html").css("font-size"));
var userId = getParamByUrl("userId");
var roleId = getParamByUrl("roleId");
//部分页面公用参数
/*var publicData={
	commentBtn:false,//判断评论框是否显示出来
}*/
//var absoluteUrl="https://a.picooc.com/web/fatburntest/";
if (window.location.host == "pm.picooc.com:444" || window.location.host == "pm.picooc.com:445" || window.location.host == "") {
	var absoluteUrl = "http://pm.picooc.com:9989" + locationStr;
}
else if (window.location.host == "pm.picooc.com:9989") {
	var absoluteUrl = "http://pm.picooc.com:9989" + locationStr;
}
else if (window.location.host == "pm.picooc.com:18092") {
	var absoluteUrl = "http://pm.picooc.com:18092" + locationStr;
}
else if (window.location.host == "a.picooc.com:10000") {
	var absoluteUrl = "https://a.picooc.com:10000" + locationStr;
}
else {
	var absoluteUrl = "https://a.picooc.com" + locationStr;
}

function isOutAppAndLowVersion() {
	if ((typeof mobileApp != "undefined")) {
		//android和ios低版本
		if (getParamByUrl('os') == 'android') {
			if (getParamByUrl('webver') > 2) {
				return false;
			}
			else {
				//低版本
				return true;
			}
		}
		else if (getParamByUrl('os') == 'iOS') {
			//低版本
			return true;
		}
		//app外webkit判断
		if ((typeof window.webkit != "undefined")) {
			if ((typeof window.webkit.messageHandlers == "undefined")) {
				return true;
			}
			else if ((typeof window.webkit.messageHandlers.controlTitle == "undefined")) {
				return true;
			}
			else {
				return false;
			}
		}
		return false;
	}
	//ios高版本
	else if ((typeof window.webkit != "undefined")) {
		if ((typeof window.webkit.messageHandlers == "undefined")) {
			return true;
		}
		else if ((typeof window.webkit.messageHandlers.controlTitle == "undefined")) {
			return true;
		}
		else {
			return false;
		}
	}
	else if (getParamByUrl('testtype') == 'tanchao') {
		return false;
	}
	else {
		return true;
	}
}
function isOutApp() {
	if ((typeof mobileApp != "undefined")) {
		return false;
	}
	//ios高版本
	else if ((typeof window.webkit != "undefined")) {
		if ((typeof window.webkit.messageHandlers == "undefined")) {
			return true;
		}
		else if ((typeof window.webkit.messageHandlers.controlTitle == "undefined")) {
			return true;
		}
		else {
			return false;
		}
	}
	else if (getParamByUrl('testtype') == 'tanchao') {
		return false;
	}
	else {
		return true;
	}
}
/*
function isOutApp() {
	if((typeof mobileApp != "undefined")){
		//android和ios低版本
		if(getParamByUrl('os') == 'android'){
			if(getParamByUrl('webver')>2){
				return false;
			}
			else{
				//低版本
				return true;
			}
		}
		else if(getParamByUrl('os') == 'iOS'){
			//低版本
			return true;
		}
		//app外webkit判断
		if((typeof window.webkit != "undefined")){
			if ((typeof window.webkit.messageHandlers == "undefined")) {
				return true;
			}
			else if((typeof window.webkit.messageHandlers.controlTitle == "undefined")){
				return true;
			}
			else{
				return false;
			}
		}
		return false;
	}
	//ios高版本
	else if((typeof window.webkit != "undefined")){
		if ((typeof window.webkit.messageHandlers == "undefined")) {
			return true;
		}
		else if((typeof window.webkit.messageHandlers.controlTitle == "undefined")){
			return true;
		}
		else{
			return false;
		}
	}
	// if ((typeof window.webkit != "undefined") || (typeof mobileApp != "undefined")) {

	// 	if (getParamByUrl('os') == 'iOS' && typeof window.webkit != "undefined") {
	// 		if ((typeof window.webkit.messageHandlers == "undefined")) {
	// 			return true;
	// 		}
	// 		else {
	// 			if ((typeof window.webkit.messageHandlers.controlTitle == "undefined")) {
	// 				return true;
	// 			}
	// 			else {
	// 				return false;
	// 			}
	// 		}
	// 	}
	// 	else if(getParamByUrl('os') == 'android'){
	// 		if(getParamByUrl('webver')>2){
	// 			return false;
	// 		}
	// 		else{
	// 			return true;
	// 		}
	// 	}
	// 	return false;
	// }
	else if (getParamByUrl('testtype') == 'tanchao') {
		return false;
	}
	else {
		return true;
	}
}*/
function isLowVersion() {
	if (getParamByUrl("webver") < 2) {
		return true;
	}
	else {
		return false;
	}
}
function setMaiDian(parameter1, parameter2) {//设置埋点
	$.ajax({
		type: "get",
		//url: maidian+"/v1/api/statistic/appAction"+window.location.search,
		url: maidian + "/v1/api/statistic/appAction" + window.location.search + "&ap=" + parameter1 + "|" + parameter2 + '|' + SAction.SClick_Action,
		dataType: "jsonp",
		jsonp: "callback",
		jsonpCallback: "appAction",
		success: function (data) {
			console.log(parameter1, parameter2);
		}
	});
}
function imgError(num, event) {
	event.currentTarget.setAttribute("src", arrHeadImg[num])
}

var browser = {
	versions: function () {
		var u = navigator.userAgent,
			app = navigator.appVersion;
		return { //移动终端浏览器版本信息
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
			iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
		};
	}(),
	language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
// alert('webapp:'+browser.versions.webApp);
console.log('mobile:' + browser.versions.mobile);
// function appTitle(title){
//   var getPageInfo = function (){
// 	var data = {
// 	  title:title,
// 	  color:"",
// 	  opacity:"",
// 	  backgroundColor:"",
// 	  backgroundOpacity:""
// 	};
// 	return JSON.stringify(data);
//   };
//   var deviceType=isMobile();
//   if(deviceType == "isApp"){
// 	  if(getParamByUrl("os")=="android" && (typeof mobileApp != "undefined")){
// 		mobileApp.controlTitle(getPageInfo());
// 	  }
// 	  else if(getParamByUrl("os")=="iOS"){
// 		window.webkit.messageHandlers.controlTitle.postMessage(getPageInfo());
// 	  }
//   }
//   document.documentElement.style.webkitTouchCallout='none';
// }
var appFc = {};
var iOSMobileAPP;
var deviceType = isMobile();
if (deviceType == "isApp" && getParamByUrl("os") == "iOS" && (typeof window.webkit != "undefined")) {
	iOSMobileAPP = window.webkit.messageHandlers;
}
// title文字控制
appFc.controlTitle = function (data) {
	if (deviceType == "isApp") {
		if (getParamByUrl("os") == "android" && (typeof mobileApp != "undefined")) {
			if((typeof mobileApp.controlTitle != "undefined")){
				mobileApp.controlTitle(data);
			}
		}
		else if (getParamByUrl("os") == "iOS" && (typeof window.webkit != "undefined")) {
			if((typeof window.webkit.messageHandlers != "undefined")){
				if((typeof window.webkit.messageHandlers.controlTitle != "undefined")){
					iOSMobileAPP.controlTitle.postMessage(data);
				}
			}
		}
	}
}
// title 显示
appFc.showTitle = function (data) {
	if (deviceType == "isApp") {
		if (getParamByUrl("os") == "android" && (typeof mobileApp != "undefined")) {
			if((typeof mobileApp.showTitle != "undefined")){
				mobileApp.showTitle(data);
			}
		}
		else if (getParamByUrl("os") == "iOS" && (typeof window.webkit.messageHandlers != "undefined")) {
			if((typeof window.webkit.messageHandlers != "undefined")){
				if((typeof window.webkit.messageHandlers.showTitle != "undefined")){
					iOSMobileAPP.showTitle.postMessage(data);
				}
			}
		}
	}
}

// 右上角控制
appFc.controlRight = function (data) {
	if (deviceType == "isApp") {
		if (getParamByUrl("os") == "android" && (typeof mobileApp != "undefined")) {
			if((typeof mobileApp.controlRight != "undefined")){
				mobileApp.controlRight(data);
			}
		}
		else if (getParamByUrl("os") == "iOS" && (typeof window.webkit != "undefined")) {
			if((typeof window.webkit.messageHandlers != "undefined")){
				if((typeof window.webkit.messageHandlers.controlRight != "undefined")){
					iOSMobileAPP.controlRight.postMessage(data);
				}
			}
		}
	}
}
// 右上角单个控制
appFc.controlRightInfo = function (data) {
	if (deviceType == "isApp") {
		if (getParamByUrl("os") == "android" && (typeof mobileApp != "undefined")) {
			//mobileApp.controlRightInfo(data);
			if((typeof mobileApp.controlRightInfo != "undefined")){
				mobileApp.controlRightInfo(data);
			}
		}
		else if (getParamByUrl("os") == "iOS" && (typeof window.webkit != "undefined")) {
			//iOSMobileAPP.controlRightInfo.postMessage(data);
			if((typeof window.webkit.messageHandlers != "undefined")){
				if((typeof window.webkit.messageHandlers.controlRightInfo != "undefined")){
					iOSMobileAPP.controlRightInfo.postMessage(data);
				}
			}
		}
	}
}
//左上角控制
appFc.controlLeft = function (data) {
	if (deviceType == "isApp") {
		if (getParamByUrl("os") == "android" && (typeof mobileApp != "undefined")) {
			if((typeof mobileApp.controlLeft != "undefined")){
				mobileApp.controlLeft(data);
			}
			//mobileApp.controlLeft(data);
		}
		else if (getParamByUrl("os") == "iOS" && (typeof window.webkit != "undefined")) {
			//iOSMobileAPP.controlLeft.postMessage(data);
			if((typeof window.webkit.messageHandlers != "undefined")){
				if((typeof window.webkit.messageHandlers.controlLeft != "undefined")){
					iOSMobileAPP.controlLeft.postMessage(data);
				}
			}
		}
	}
}
//上传图片
appFc.uploadImg = function (data) {
	if (deviceType == "isApp") {
		if (getParamByUrl("os") == "android" && (typeof mobileApp != "undefined")) {
			//mobileApp.uploadImg(data);
			if((typeof mobileApp.uploadImg != "undefined")){
				mobileApp.uploadImg(data);
			}
		}
		else if (getParamByUrl("os") == "iOS" && (typeof window.webkit != "undefined")) {
			//iOSMobileAPP.uploadImg.postMessage(data);
			if((typeof window.webkit.messageHandlers != "undefined")){
				if((typeof window.webkit.messageHandlers.uploadImg != "undefined")){
					iOSMobileAPP.uploadImg.postMessage(data);
				}
			}
		}
	}
}
//页面中点击按钮后后退
appFc.deleteHistory = function (data) {
	if (deviceType == "isApp") {
		if (getParamByUrl("os") == "android" && (typeof mobileApp != "undefined")) {
			//mobileApp.deleteHistory(data);
			if((typeof mobileApp.deleteHistory != "undefined")){
				mobileApp.deleteHistory(data);
			}
		}
		else if (getParamByUrl("os") == "iOS" && (typeof window.webkit != "undefined")) {
			//iOSMobileAPP.deleteHistory.postMessage(data);
			if((typeof window.webkit.messageHandlers != "undefined")){
				if((typeof window.webkit.messageHandlers.deleteHistory != "undefined")){
					iOSMobileAPP.deleteHistory.postMessage(data);
				}
			}
		}
	}
}

//页面中点击按钮后后退
appFc.closeWebview = function (data) {
	if (deviceType == "isApp") {
		if (getParamByUrl("os") == "android" && (typeof mobileApp != "undefined")) {
			//mobileApp.deleteHistory(data);
			if((typeof mobileApp.deleteHistory != "undefined")){
				mobileApp.deleteHistory(data);
			}
		}
		else if (getParamByUrl("os") == "iOS" && (typeof window.webkit != "undefined")) {
			//iOSMobileAPP.deleteHistory.postMessage(data);
			if((typeof window.webkit.messageHandlers != "undefined")){
				if((typeof window.webkit.messageHandlers.deleteHistory != "undefined")){
					iOSMobileAPP.deleteHistory.postMessage(data);
				}
			}
		}
	}
}
// 打开新的webview
appFc.openWebview = function (data) {
	if (deviceType == "isApp") {
		if (getParamByUrl("os") == "android" && (typeof mobileApp != "undefined")) {
			// alert(data);
			//mobileApp.openWebview(data);
			if((typeof mobileApp.openWebview != "undefined")){
				mobileApp.openWebview(data);
			}
		}
		else if (getParamByUrl("os") == "iOS" && (typeof mobileApp != "undefined")) {
			//mobileApp.openWebview(data);
			if((typeof mobileApp.openWebview != "undefined")){
				mobileApp.openWebview(data);
			}
		}
		else if (getParamByUrl("os") == "iOS" && (typeof window.webkit != "undefined")) {
			//iOSMobileAPP.openWebview.postMessage(data);
			if((typeof window.webkit.messageHandlers != "undefined")){
				if((typeof window.webkit.messageHandlers.openWebview != "undefined")){
					iOSMobileAPP.openWebview.postMessage(data);
				}
			}
		}

	}
}
//保存图片
appFc.saveImg = function (data) {
	if (deviceType == "isApp") {
		if (getParamByUrl("os") == "android" && (typeof mobileApp != "undefined")) {
			//mobileApp.saveImg(data);
			if((typeof mobileApp.saveImg != "undefined")){
				mobileApp.saveImg(data);
			}
		}
		else if (getParamByUrl("os") == "iOS" && (typeof window.webkit != "undefined")) {
			//iOSMobileAPP.saveImg.postMessage(data);
			if((typeof window.webkit.messageHandlers != "undefined")){
				if((typeof window.webkit.messageHandlers.saveImg != "undefined")){
					iOSMobileAPP.saveImg.postMessage(data);
				}
			}
		}
	}
}
//截图分享
appFc.getShareInfo = function (data) {
	if (deviceType == "isApp") {
		if (getParamByUrl("os") == "android" && (typeof mobileApp != "undefined")) {
			//mobileApp.getShareInfo(data);
			if((typeof mobileApp.getShareInfo != "undefined")){
				mobileApp.getShareInfo(data);
			}
		}
		else if (getParamByUrl("os") == "iOS" && (typeof window.webkit != "undefined")) {
			//iOSMobileAPP.getShareInfo.postMessage(data);
			if((typeof window.webkit.messageHandlers != "undefined")){
				if((typeof window.webkit.messageHandlers.getShareInfo != "undefined")){
					iOSMobileAPP.getShareInfo.postMessage(data);
				}
			}
		}
	}
}
//安卓的返回键
appFc.showBackBtn = function (data) {
	if (deviceType == "isApp") {
		if (getParamByUrl("os") == "android" && (typeof mobileApp != "undefined")) {
			//mobileApp.showBackBtn(data);
			if((typeof mobileApp.showBackBtn != "undefined")){
				mobileApp.showBackBtn(data);
			}
		}
	}
}
//体围修改同步
appFc.changeGirth = function (data) {
	if (deviceType == "isApp") {
		if (getParamByUrl("os") == "android" && (typeof mobileApp != "undefined")) {
			//mobileApp.changeGirth(data);
			if((typeof mobileApp.changeGirth != "undefined")){
				mobileApp.changeGirth(data);
			}
		}
		else if (getParamByUrl("os") == "iOS" && (typeof window.webkit != "undefined")) {
			//iOSMobileAPP.changeGirth.postMessage(data);
			if((typeof window.webkit.messageHandlers != "undefined")){
				if((typeof window.webkit.messageHandlers.changeGirth != "undefined")){
					iOSMobileAPP.changeGirth.postMessage(data);
				}
			}
		}
	}
}
//微信支付
appFc.gotoPay = function (data) {
	if (deviceType == "isApp") {
		if (getParamByUrl("os") == "android" && (typeof mobileApp != "undefined")) {
			//mobileApp.gotoPay(data);
			if((typeof mobileApp.gotoPay != "undefined")){
				mobileApp.gotoPay(data);
			}
		}
		else if (getParamByUrl("os") == "iOS" && (typeof window.webkit != "undefined")) {
			//iOSMobileAPP.gotoPay.postMessage(data);
			if((typeof window.webkit.messageHandlers != "undefined")){
				if((typeof window.webkit.messageHandlers.gotoPay != "undefined")){
					iOSMobileAPP.gotoPay.postMessage(data);
				}
			}
		}
	}
}
//复制到手机剪贴板
appFc.copyContent = function (data) {
	if (deviceType == "isApp") {
		if (getParamByUrl("os") == "android" && (typeof mobileApp != "undefined")) {
			//mobileApp.copyContent(data);
			if((typeof mobileApp.copyContent != "undefined")){
				mobileApp.copyContent(data);
			}
		}
		else if (getParamByUrl("os") == "iOS" && (typeof window.webkit != "undefined")) {
			//iOSMobileAPP.copyContent.postMessage(data);
			if((typeof window.webkit.messageHandlers != "undefined")){
				if((typeof window.webkit.messageHandlers.copyContent != "undefined")){
					iOSMobileAPP.copyContent.postMessage(data);
				}
			}
		}
	}
}
//打开微信
appFc.gotoWechat = function () {
	if (deviceType == "isApp") {
		if (getParamByUrl("os") == "android" && (typeof mobileApp != "undefined")) {
			//mobileApp.gotoWechat();
			if((typeof mobileApp.gotoWechat != "undefined")){
				mobileApp.gotoWechat(data);
			}
		}
		else if (getParamByUrl("os") == "iOS" && (typeof window.webkit != "undefined")) {
			//iOSMobileAPP.gotoWechat.postMessage("");
			if((typeof window.webkit.messageHandlers != "undefined")){
				if((typeof window.webkit.messageHandlers.gotoWechat != "undefined")){
					iOSMobileAPP.gotoWechat.postMessage("");
				}
			}
		}
	}
}
//需要有客服小红点
appFc.easeModChatDot = function (data) {
	if (deviceType == "isApp") {
		if (getParamByUrl("os") == "android" && (typeof mobileApp != "undefined")) {
			//mobileApp.easeModChatDot(data);
			if((typeof mobileApp.easeModChatDot != "undefined")){
				mobileApp.easeModChatDot(data);
			}
		}
		else if (getParamByUrl("os") == "iOS" && (typeof window.webkit != "undefined")) {
			//iOSMobileAPP.easeModChatDot.postMessage(data);
			if((typeof window.webkit.messageHandlers != "undefined")){
				if((typeof window.webkit.messageHandlers.easeModChatDot != "undefined")){
					iOSMobileAPP.easeModChatDot.postMessage(data);
				}
			}
		}
	}
}
//去往环信客服
appFc.goToEaseModChat = function () {
	if (deviceType == "isApp") {
		if (getParamByUrl("os") == "android" && (typeof mobileApp != "undefined")) {
			//mobileApp.goToEaseModChat();
			if((typeof mobileApp.goToEaseModChat != "undefined")){
				mobileApp.goToEaseModChat(data);
			}
		}
		else if (getParamByUrl("os") == "iOS" && (typeof window.webkit != "undefined")) {
			//iOSMobileAPP.goToEaseModChat.postMessage("");
			if((typeof window.webkit.messageHandlers != "undefined")){
				if((typeof window.webkit.messageHandlers.goToEaseModChat != "undefined")){
					iOSMobileAPP.goToEaseModChat.postMessage("");
				}
			}
		}
	}
}
//页面后台转前台时刷新
appFc.markedAsNeedToRefresh = function () {
	if (deviceType == "isApp") {
		if (getParamByUrl("os") == "android" && (typeof mobileApp != "undefined")) {
			//mobileApp.markedAsNeedToRefresh();
			if((typeof mobileApp.markedAsNeedToRefresh != "undefined")){
				mobileApp.markedAsNeedToRefresh(data);
			}
		}
		else if (getParamByUrl("os") == "iOS" && (typeof window.webkit != "undefined")) {
			//iOSMobileAPP.markedAsNeedToRefresh.postMessage("");
			if((typeof window.webkit.messageHandlers != "undefined")){
				if((typeof window.webkit.messageHandlers.markedAsNeedToRefresh != "undefined")){
					iOSMobileAPP.markedAsNeedToRefresh.postMessage("");
				}
			}
		}
	}
}
//燃脂营个人资料修改身高，生日与客户端同步
appFc.makeDataAccord = function (data) {
	if (getParamByUrl("os") == "android" && (typeof mobileApp != "undefined")) {
		//mobileApp.makeDataAccord(data);
		if((typeof mobileApp.makeDataAccord != "undefined")){
			mobileApp.makeDataAccord(data);
		}
	} else if (getParamByUrl("os") == "iOS" && (typeof window.webkit != "undefined")) {
		//iOSMobileAPP.makeDataAccord.postMessage(data);
		if((typeof window.webkit.messageHandlers != "undefined")){
			if((typeof window.webkit.messageHandlers.makeDataAccord != "undefined")){
				iOSMobileAPP.makeDataAccord.postMessage(data);
			}
		}
	}
};
//myFatburn页面绑定手机成功之后回掉，将绑定的手机号同步到客户端；
appFc.updateUsePhone = function (data) {
	if (getParamByUrl("os") == "android" && (typeof mobileApp != "undefined")) {
		//mobileApp.updateUsePhone(data);
		if((typeof mobileApp.updateUsePhone != "undefined")){
			mobileApp.updateUsePhone(data);
		}
	} else if (getParamByUrl("os") == "iOS" && (typeof window.webkit != "undefined")) {
		var obj = { phone: data };
		var jsonData = JSON.stringify(obj);
		//iOSMobileAPP.updateUsePhone.postMessage(jsonData);
		if((typeof window.webkit.messageHandlers != "undefined")){
			if((typeof window.webkit.messageHandlers.updateUsePhone != "undefined")){
				iOSMobileAPP.updateUsePhone.postMessage(jsonData);
			}
		}
	}
}
function isMobile() {
	var os = new Array("Android", "iPhone", "Windows Phone", "iPod", "BlackBerry", "MeeGo", "SymbianOS");  // 其他类型的移动操作系统类型，自行添加 
	var deviceType = navigator.userAgent;
	var len = os.length;
	var isinApp = isApp();
	for (var i = 0; i < len; i++) {
		if (deviceType.indexOf(os[i]) >= 0) {
			if (isinApp) {
				return "isApp";
			}
			return "isMobile";
		}
	}
	return "isPC";
}
function isApp() {
	var appOS = getParamByUrl("os");
	var userId = getParamByUrl("userId");
	if (appOS != "false" && userId != "false") {
		return true;
	}
	return false;
}
function getParamByUrl(paramKey) {
	var url = window.location.search.substring(1);
	var arr = url.split("&");
	var result = [];
	for (var i = 0; i < arr.length; i++) {
		var param = arr[i].split("=");
		if (paramKey == param[0]) {
			if (paramKey == "webver") {
				return parseInt(param[1]);
			}
			return param[1];
		}
	}
	return "false";
}
function removeParamByUrl(paramKey) {
	var url = window.location.search.substring(1);
	var arr = url.split("&");
	var result = [];
	var str = '?';
	for (var i = 0; i < arr.length; i++) {
		var param = arr[i].split("=");
		if (paramKey != param[0] && param[0] != "") {
			str += '&' + param[0] + '=' + param[1];
			//return  param[1];
		}
	}
	return str;
}
function getCookie(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";", c_start)
			if (c_end == -1)
				c_end = document.cookie.length;
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return "";
}
function setCookie(c_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}
//设置带路径的cookie
function setCookiePath(c_name, value, expiredays, path) {
	//setCookiePath("test2","noMsg",1,"/;domain=picooc.com");
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + '; path=' + path;
}
function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
function strToJson(str) {
	//var json = eval('(' + str + ')');
	if (typeof (str) == 'string') {
		var json = eval('(' + str + ')');
	}
	else {
		var json = str;
	}
	return json;
}


$(function () {
	$(".error-main-btn1").unbind("click").click(function () {
		$(".errorAlert").css("display", "none");
	});

	if (isOutApp()) {
		try {
			window.localStorage.foobar = "foobar";
		} catch (_) {
			alert("请取消浏览器无痕浏览再购买哦~");
		}
	}

	// alert('isOutApp:'+isOutApp());
})


function escapeContent(str) {
	/*str=str.replace(/<br\s*\/?>/g, "\n");*/
	str = str.replace(/\%25/g, "%");
	str = str.replace(/\%26/g, "&");
	str = str.replace(/\%2B/g, "+");
	str = str.replace(/\%23/g, "#");
	return str;
}
var loadingTime1;
var loadingTime2;
function loading() {
	//loading动画
	var loadingIndex = 1;
	loadingTime = setInterval(function () {
		if (loadingIndex == $(".loading-point").length) {
			loadingIndex = 0;
		}
		$(".loading-point").removeClass("loading-point-active");
		$(".loading-point").eq(loadingIndex).addClass("loading-point-active");
		loadingIndex++;
	}, 300);
}
function loading2() {
	//loading动画
	var loadingIndex2 = 1;
	loadingTime2 = setInterval(function () {
		if (loadingIndex2 == $(".loading-point2").length) {
			loadingIndex2 = 0;
		}
		$(".loading-point2").removeClass("loading-point-active2");
		$(".loading-point2").eq(loadingIndex2).addClass("loading-point-active2");
		loadingIndex2++;
	}, 300);
}
function stopLoading() {

	$(".loading-load").css("display", "none");
	clearInterval(loadingTime);
}
function stopLoading2() {
	$(".loading-load2").css("display", "none");
	clearInterval(loadingTime2);
}