if(PicoocAdmin == undefined){
	var PicoocAdmin = {};
}
//全局所有图片的路径
//Picooc.imgRoot = 'http://www.picooc.com/site/Public/Home/web';
PicoocAdmin.imgRoot ='http://1251087842.cdn.myqcloud.com/1251087842/web';
PicoocAdmin.imgRootVideo='http://www.picooc.com/site/Public/Home/web';
//组件
PicoocAdmin.building = (function(){ 
	/*
	弹出层 蒙版层
	config = {
		html:'<div>...</div>'
	}
	*/
	function Mask(config){
		this.isloading = config.isloading;
	}
	Mask.prototype = {
		init:function(){
			this.open();
		},
		createBackgroundBox:function(csn){
			var ele = document.createElement('div');			
			var _style = "position:fixed;width:100%;height:100%;top:0;"
				+"bottom:0;background-color:rgb(0,0,0);"
				+"opacity:0.5;z-index:10;";
			ele.setAttribute('style',_style);
			return ele;
		},
		createMainBox:function(){
			if(this.isloading){
				var tipText ="<span style='float:left;width:100%;text-align:center;line-height:500px;'>loading<span>";
			}else{
				var tipText ="";
			}
			var ele = document.createElement('div');
			ele.innerHTML = tipText;
			var _style = "width:900px;overflow-x:hidden;min-height:221px;position:absolute;left:50%;top:50%;z-index:12;background-color:#fff;border-radius:5px;";
			ele.setAttribute('style',_style);

			return ele;
		},
		appendHtml:function(html){
			this.main.innerHTML = html;
			this.top();
		},
		open:function(){

			var doc = document.body;
			//底层背景
			this.bg = this.createBackgroundBox();
			doc.appendChild(this.bg);
			//中间内容部分
			this.main = this.createMainBox();
			doc.appendChild(this.main);
				
			this.top();

		},
		top:function(){
			var wid = this.main.offsetWidth,
				hei = this.main.offsetHeight;
			this.main.style.marginLeft=-(wid/2)+'px';
			this.main.style.marginTop=-(hei/2)+'px';
		},
		close:function(){
			var doc = document.body;
			doc.removeChild(this.bg);
			doc.removeChild(this.main);
		}
	}

	function showTips(config){// tips left top delaytime target
		var ele = $('<div>'+config.tips+'</div>');
			ele.addClass('errorTip');
			ele.appendTo($('body'));
			ele.css({
				left:config.left,
				top:config.top
			});
			if(config.delaytime!=undefined){
				setTimeout(function(){
					ele.remove();
				},config.delaytime*1000);
			}
			if(config.target){
				var wid = config.target.width(),
					hei = config.target.height()+4;
				ele.css({
					'width':wid,
					'height':hei,
					'line-height':hei+'px'
				});
			}
	}

	function Templet(config){

	}
	Templet.prototype = {
		html:function(){
			var str ='<div class="order-close">×</div>'
					+'<div class="order-model-list">'
					+'	<h3>订单信息<span>▼</span></h3>'
					+'	<ul>'
					+'		<li><span class="order-list-title">订单状态：</span><span class="order-state"></span></li>'
					+'		<li><span class="order-list-title">订单编号：</span><span class="order-number"></span></li>'
					+'		<li><span class="order-list-title">支付宝账单号：</span><span class="order-zfb-number"></span></li>'
					+'		<li><span class="order-list-title">快递单号：</span><span class="order-kd-number"></span></li>'
					+'		<li><span class="order-list-title">客户提交订单时间：</span><span class="dateline-time"></span></li>'
					+'		<li><span class="order-list-title">客户支付时间：</span><span class="pay-time"></span></li>'
					+'		<li><span class="order-list-title">财务确认时间：</span><span class="confirm-time"></span></li>'
					+'		<li><span class="order-list-title">确认发货时间：</span><span class="confirm-send"></span></li>'

					+'		<li><span class="order-list-title">订单总金额：</span><span class="order-total-money"></span></li>'
					+'	</ul>'
					+'</div>'
					+'<div class="order-model-list">'
					+'	<h3  data-code=1>商品信息<span>▲</span></h3>'
					+'	<ul class="order-pro-ul" style="display:none;">'
					+'		<li class="order-proMesg"><span>商品名称</span><span>价格</span><span>数量</span></li>'
					+'	</ul>'
					+'</div>'
					+'<div class="order-model-list">'
					+'	<h3 data-code=1>客户信息<span>▲</span></h3>'
					+'	<ul style="display:none;">'
					+'		<li><span class="order-list-title">收货人姓名：</span><span class="order-receiver"></span></li>'
					+'		<li><span class="order-list-title">地址：</span><span class="order-r-address"></span></li>'
					+'		<li><span class="order-list-title">手机：</span><span class="order-r-mobile"></span></li>'
					+'		<li><span class="order-list-title">电话：</span><span class="order-r-phone"></span></li>'
					+'		<li><span class="order-list-title">邮编：</span><span class="order-r-zipcode"></span></li>'
					+'	</ul>'
					+'</div>'
					+'<div class="order-model-list">'
					+'	<h3>发票信息<span>▼</span></h3>'
					+'	<ul class="order_no_fp fp_ul">'
					+'		<li><span class="order-list-title">发票种类：</span><span>无发票</span></li>'
					+'	</ul>'
					+'	<ul class="order_gr_fp fp_ul">'
					+'		<li><span class="order-list-title">发票种类：</span><span>个人</span></li>'
					+'	</ul>'
					+'	<ul class="order_gs-fp fp_ul">'
					+'		<li><span class="order-list-title">发票种类：</span><span>公司</span></li>'
					+'		<li><span class="order-list-title">信息：</span><span class="invoicetitle">公司名称</span></li>'
					+'	</ul>'
					+'	<ul class="order_zzs-fp fp_ul">'
					+'		<li><span class="order-list-title">发票种类：</span><span>增值税</span></li>'
					+'		<li><span class="order-list-title">公司名称：</span><span class="invo-unit"></span></li>'
					+'		<li><span class="order-list-title">纳税人识别号：</span><span class="invo-taxpayer"></span></li>'
					+'		<li><span class="order-list-title">注册地址：</span><span class="invo-address"></span></li>'
					+'		<li><span class="order-list-title">注册电话：</span><span class="invo-phone"></span></li>'
					+'		<li><span class="order-list-title">开户银行：</span><span class="invo-bank"></span></li>'
					+'		<li><span class="order-list-title">银行账户：</span><span class="invo-bankno"></span></li>'
					+'	</ul>'
					+'</div>';
				return str; 

		}
	}
	return {
		Mask:Mask,
		showTips:showTips,
		Templet:Templet
	}
})();

//数据
PicoocAdmin.data = (function(){
	function fajax(config,callback){
		$.ajax({
			url:config.url,
			type:config.type,
			data:config.data,
			success:function(data){
				callback(data);
			}
		})
	}
	return {
		fajax:fajax
	}
})();

//浏览器相关
PicoocAdmin.browser = (function(){
	function lessIE10(){
		var sUserAgent = navigator.userAgent,
			isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows"),
			isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") 
					|| (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");

			if(isWin){
				var _src = 'http://dlsw.baidu.com/sw-search-sp/soft/9d/14744/ChromeStandaloneSetup.1405583715.exe';		
			}else if(isMac){
				var _src = 'http://dlsw.baidu.com/sw-search-sp/soft/52/25718/googlechrome.1395901312.dmg';
			}

		return _src;
		/*var _html = '<div class="browser_tips">您的浏览器版本太低，为了更好的体验，请安装谷歌浏览器。点击'
					+'<a href="'+_src+'" class="downloadGoogle">这里</a>'
					+'下载谷歌浏览器</div>';
		var m = new Picooc.building.Mask({html:_html});
			m.init();*/
	}
	function below_ie10(){
		navigator.sayswho = (function(){
		    var ua= navigator.userAgent, tem, 
		    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
		    if(/trident/i.test(M[1])){
		        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
		        return 'IE '+(tem[1] || '');
		    }
		    if(M[1]=== 'Chrome'){
		        tem= ua.match(/\bOPR\/(\d+)/)
		        if(tem!= null) return 'Opera '+tem[1];
		    }
		    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
		    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
		    return M.join(':');
		})();
		var o = navigator.sayswho;
		var name = o.split(':')[0],
			verson = o.split(':')[1];
		if(name == 'MISE' && verson!='10'){
			lessIE10();
			var href = window.location.href;
			if(href.indexOf('version_tip.html') == -1){
				window.location.href = '/site/version_tip.html';
			}
		}else{
			var href = window.location.href;
			if(href.indexOf('version_tip.html') != -1){
				window.location.href = '/';
			}
		}
	}
	//检测如果为IE 并且为IE10以下
	below_ie10();
	return{
		src:lessIE10	
	}
})();







