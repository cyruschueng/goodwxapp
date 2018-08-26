/**
 * @filename common.js
 * @filedesc common.js
 * @authors lq
 * @email 610970478@qq.com
 * @date 2016-12-20 10:42:37
 * @version v3.0
*/
//接口地址
/*var url1 = 'http://toroke.imwork.net:7777/api/',
	url2 = 'http://toroke.imwork.net:7777/static/html/';*/
/*var url1 = 'http://120.42.89.206:7777/',
	url2 = 'http://120.42.89.206:7777/static/html/';*/
/*var url1 = 'http://192.168.0.204:8480/api/',
	//url2 = 'http://192.168.0.204:8480/static/html/';
	url2 = 'http://192.168.0.13/TrkProject/app/';*/
var url1 = 'https://api.banjoy.cn/',
	url2 = 'https://static.banjoy.cn/html/';

//微信授权
var sqUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1b3610ec4888cc68&redirect_uri=https%3a%2f%2fapi.banjoy.cn%2fweixin%2fauthorizeBanjoyNew.shtml&response_type=code&scope=snsapi_userinfo&state=';
//应用宝
var downUrl = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.toroke.qiguanbang';
var yybUrl = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.toroke.qiguanbang';
//下载中转
var transferUrl = 'https://static.banjoy.cn/html/3_0/followDown.html';
//ios企业版下载地址
var iosDownUrl = 'itms-services://?action=download-manifest&url=https://static.banjoy.cn/ios/manifest.plist';
//微信公众号关注地址
var wxFollowUrl = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIzMTY3OTk4Mw%3D%3D&scene=124#wechat_redirect';

var qtoken = '',
	openId = '',
	classId = parseInt(getUrlMsg('classId')) || '';
if(classId == 0 || classId == null || classId == 'null'){
    classId = '';
}

//判断设备及来源
var device = '',
	source = '',
	version = '',
	versionId = '',
	clientType = '';
function userAgent(){
	var u = navigator.userAgent;
	var ua = navigator.userAgent.toLowerCase();
	if(ua.indexOf('professional') != -1){
		version = 'professional';
	}
	if(ua.indexOf('qiguanbang') != -1){
		source = 'app';
		if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
			clientType = 'ios';
			qtoken = getUrlMsg('qtoken') || '';
			var versions = ua.split('qiguanbang/')[1];   
			versionId = versions.substr(0,1);
		}
		if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1){
			clientType = 'android';
			qtoken = appBaseListener.getToken() || '';
			var versions = ua.split('versioncode:')[1];  
			versionId = versions.substr(0,2);
		}
	}else{
		source = 'h5';
		clientType = 'h5';
		qtoken = getUrlMsg('qtoken') || '';//66e9298dbd6149d6bf48de892668bb9a
	}
	if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {  
	    device = 'ios';
	}else if(/(Android)/i.test(navigator.userAgent)) {   
	    device = 'android';
	}else{  
		device = 'h5';
	}
	console.log(document.location.href);
}

//获取地址栏参数
function getUrlMsg(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r!=null) return unescape(r[2]); 
	return null;
}

//接口请求
function ajaxRequest(interface,parameter,success){
	$.post(interface,parameter,function(json) {
		//console.log(json);
		success(json);
	},'json');
}

//接口请求
function jsonpRequest(interface,parameter,success){
	$.post(interface,parameter,function(json) {
		//console.log(json);
		success(json);
	},'jsonp');
}

//判断是否微信
function isWechat(){  
    var ua = navigator.userAgent.toLowerCase();  
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;  
    } else {  
        return false; 
    }  
}

//错误提示
function showToast(txt){
	$(".showToast").remove();
	$("body").append('<div class="showToast"></div>');
	$(".showToast").html(txt);
	$(".showToast").removeClass('toastHide');
	$(".showToast").addClass('toastShow');
	setTimeout(function(){
		$(".showToast").removeClass('toastShow');
		$(".showToast").addClass('toastHide');
	},1500);
}

//暂无数据
function noDataTip(tipTag,tipTxt){
	var html = '<div class="noDataTip"><dl><dt><img src="lib/images/default_282x288.png" /></dt><dd>'+tipTxt+'</dd></dl></div>';
	$(tipTag).html(html);
}

//部分暂无数据
function halfNoDataTip(tipTag,tipTxt){
	var html = '<div class="halfNoDataTip"><img src="lib/images/default_282x288.png" /><p>'+tipTxt+'</p></div>';
	$(tipTag).html(html);
}

//顶部下载提示
function topDownTip(toAppData){
	var html = '<div id="topDownTip" class="topDownTip">\
					<a id="down" href="javascript:;" class="down openOrDownBtn" title="下载">\
						<img class="img" src="lib/images/logo.png" alt="">\
						<div class="txt"><h1>斑鸠</h1><p>为你私人定制的一所大学</p></div>\
						<div class="btn">打开app</div>\
					</a>\
					<a id="close" href="javascript:;" class="close" title="关闭">x</a>\
				</div>';
	$('body').append(html);
	if(device == 'h5'){
		$('.openOrDownBtn').click(function(event) {
			scanCodeDown();
		});
	}else{
		wakeupOrInstall('.openOrDownBtn',toAppData);
	}
	$('#topDownTip .close').click(function(event) {
		$('#topDownTip').remove();
	});
}

//底部下载提示
function btmDownTip(toAppData){
	var html = '<a href="javascript:;" id="btmDownTip" class="btmDownTip openOrDownBtn clearfix"><i></i><u></u></a>';
	$('body').append(html);
	if(device == 'h5'){
		$('.openOrDownBtn').click(function(event) {
			scanCodeDown();
		});
	}else{
		wakeupOrInstall('.openOrDownBtn',toAppData);
	}
}

//扫码下载app
function scanCodeDown(){
	var html = '<div id="scanCodeDown" class="scanCodeDown"><div class="codecn"><a id="qrCloseBtn" href="javascript:;" class="qrCloseBtn" title="关闭">X</a><img src="lib/images/qrCode_400x400.png"/><p>扫描下载斑鸠APP</p><p>为你私人定制的一所大学</p></div></div>';
	$('body').append(html);
	$('#qrCloseBtn').click(function(event) {
		$('#scanCodeDown').remove();
	});
}

//确认框
function confirmPop(firmTit,firmTxt,cancelBtn,sureBtn){
	var active1 = '',
		active2 = '';
	if(sureBtn == ''){
		active1 = 'active';
		active2 = 'hide';
	}else{
		active1 = '';
		active2 = '';
	}
	var html = '<div id="confirmPop" class="confirmPop"><div class="cpCont"><a href="javascript:;" class="closeBtn"><i class="icon"></i></a><h1 class="tit">'+firmTit+'</h1><h2 class="txt">'+firmTxt+'</h2><h3><a href="javascript:;" class="cancelBtn '+active1+'">'+cancelBtn+'</a><a href="javascript:;" class="sureBtn '+ active2+'">'+sureBtn+'</a></h3></div></div>';
	$('body').append(html);
	$('#confirmPop a.closeBtn,#confirmPop a.cancelBtn').click(function(event) {
		$('#confirmPop').remove();
	});
}

//分享
function getShareInfo(shareInfo){
    if(clientType == 'ios'){
        setupWebViewJavascriptBridge(function(bridge) {
            bridge.callHandler('getShareInfo', {shareInfo:shareInfo}, function(data) {
            	//alert('ios'+data);
            });
        });
    }
    if(clientType == 'android'){
    	if(typeof(appShareListener) != undefined){
    		appShareListener.getShareInfo(JSON.stringify(shareInfo));
    	}
    }
    if(isWechat()){
        var tit = shareInfo.shareTitle || document.title,
        	img = shareInfo.shareImage || url2+'3_0/lib/images/logo.png',
            link = shareInfo.shareUrl || document.location.href,    
            desc = shareInfo.shareDesc || document.title;
        require(['wxshare'],function(wxshare){
            wxshare.share(img,link,tit,desc);
        });
    }
}

//微信分享
function wxGetShareInfo(shareInfo){
	if(isWechat()){
	    var tit = shareInfo.shareTitle || document.title,
	        img = shareInfo.shareImage || url2+'3_0/lib/images/logo.png',
	        link = shareInfo.shareUrl || document.location.href,    
	        desc = shareInfo.shareDesc || document.title;
	    require(['wxshare'],function(wxshare){
	        wxshare.share(img,link,tit,desc);
	    });
	}
}

//流量统计
function browserCount(channelCode,countName){
    var countUrl = url1 + 'v11/manageCount/statistic.shtml';
    var countData = {channelIdCipher:channelCode,name:countName};
    ajaxRequest(countUrl,countData,function(json){});
};

//验证授权code
function valAuthorizeCode(code,authorizeUrl){
	var url = url1 + 'weixin/getOpenId.shtml';
    var data = {code:code};
    ajaxRequest(url,data,function(json){
        //40163 --> code已使用 40029 --> 验证码错误 
        //console.log(json.status);
        if(json.status != 200){
            window.location.replace(authorizeUrl);
        }else{
        	openId = json.result.openid || '';//o74WfwJG_ycJ9bGGPo_BaumKqbws
        	console.log('获取到的openId:'+json.result.openid+',本地保存的openId'+openId);
        }
    });
};

//分享提示
function wxShareTip(imgUrl){
	var html = '<div id="wxShareTip" class="wxShareTip"><img src="'+imgUrl+'" /></div>';
	$('body').append(html);
	$('#wxShareTip').click(function(event) {
		$('#wxShareTip').remove();
	});
};

//查看大图
function lookImgList(target,src){
    $(target).click(function(event) {
        var $this = $(this),
        	imgIdx = $(target).index($(this)),
            imgList = [];
        $(target).each(function(i){  
            imgList.push($(this).attr(src));
        });
        if(clientType == 'ios'){
            setupWebViewJavascriptBridge(function(bridge) {
                bridge.callHandler('showBigImages', {'imagesURL':imgList,'clickIndex':imgIdx}, function(data) {});
            });
        }
        if(clientType == 'android'){
            appBaseListener.openImage(imgList,imgIdx);
        }
        if(clientType == 'h5'){
        	var html1 = '<div id="focusMap" class="focusMap">\
        	                <div class="swiper-container">\
        	                    <div class="swiper-wrapper"></div>\
        	                    <div class="swiper-pagination"></div>\
        	                </div>\
        	            </div>',
        	    html2 = '';
        	for(var i=0; i< imgList.length; i++){
        	    html2 += '<div class="swiper-slide">\
        	        		<img style="background-size: contain; background-repeat: no-repeat; background-position: center center; background-image: url('+imgList[i]+');">\
        	    		</div>';
        	}
        	$('body').append(html1);
        	$('#focusMap .swiper-wrapper').html(html2);
        	$('#focusMap').click(function(event) {
        	    $('#focusMap').remove();
        	});
            require(['swiper'], function (){
                var swiper = new Swiper('#focusMap .swiper-container',{
                    direction: 'horizontal',
                    initialSlide: 0,
                    pagination : '.swiper-pagination',
                    paginationType: 'fraction',
                    //lazyLoading : true,
                    onSlideChangeStart: function(p){
                        var slidePage = p.activeIndex;
                    }
                });
                swiper.slideTo(parseInt(imgIdx),0,false);
            });
        }
    });
};

//查看大图
function focusMap(imgList,showBigImages){  
	var html1 = '<div id="focusMap" class="focusMap">\
	                <div class="swiper-container">\
	                    <div class="swiper-wrapper"></div>\
	                    <div class="swiper-pagination"></div>\
	                </div>\
	            </div>',
	    html2 = '';
	for(var i=0; i< imgList.length; i++){
	    html2 += '<div class="swiper-slide">\
	        		<img style="background-size: contain; background-repeat: no-repeat; background-position: center center; background-image: url('+imgList[i]+');">\
	    		</div>';
	}
	$('body').append(html1);
	$('#focusMap .swiper-wrapper').html(html2);
	$('#focusMap').click(function(event) {
	    $('#focusMap').remove();
	});
    require(['swiper'], function (){
        var swiper = new Swiper('#focusMap .swiper-container',{
            direction: 'horizontal',
            initialSlide: 0,
            pagination : '.swiper-pagination',
            paginationType: 'fraction',
            //lazyLoading : true,
            onSlideChangeStart: function(p){
                var slidePage = p.activeIndex;
            }
        });
        swiper.slideTo(parseInt(imgIdx),0,false);
    });
};

//唤起或下载App
function wakeupOrInstall(target,toAppData){
	$(document.body).delegate(target,"click",function(){
    	window.location.href = downUrl;
    });
	/*require(['//res.cdn.openinstall.io/openinstall.js'],function(){
		var data = '';
		if(toAppData == '' || toAppData == undefined){
			data = OpenInstall.parseUrlParams();
		}else{
			data = toAppData;
		}
	    new OpenInstall({
	        appKey : "dqohdc",    
	        preferWakeup:true,
	        onready : function() {
	            var m = this; 
		        $(document.body).delegate(target,"click",function(){
		        	var time = '';
		        	if(device == 'ios'){
		        		time = 100;
		        	}
		        	if(device == 'android'){
		        		time = 1000;
		        	}
		            m.wakeupOrInstall({timeout:time});
		        });
	        }
	    }, data);
	});*/
};

//与ios交互(WebViewJavascriptBridge)
function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe); }, 0);
}

userAgent();