	//图片地址
	var share_imgurl = 'http://user.qbao.com/images/wap/120.png';
	//分享地址
	var link ="http://user.qbao.com/usercenter/promote.html?presenterCode="+presenterCode+"&sign="+sign;
	//分享内容
	var content = "最近在一个叫钱宝网的网站做任务，赚了点小钱，您也来试试吧！";
	//分享标题
	var title  = "钱宝网分享链接";
	window.shareData = {
		"imgUrl": share_imgurl,
		"timeLineLink": link,
		"sendFriendLink": link,
		"weiboLink": link,
		"tTitle": title,
		"tContent": content,
		"fTitle": title,
		"fContent": content,
		"wContent": content
	};

	if(typeof(window.shareData) == 'undefined'){
		window.shareData = {
			"imgUrl": share_imgurl, 
			"timeLineLink": link,
			"sendFriendLink": link,
			"weiboLink": link,
			"tTitle": title,
			"tContent": content,
			"fTitle": title,
			"fContent": content,
			"wContent": content
		};
	}
	if("" == window.shareData.imgUrl){
		var shareImgObj = document.getElementsByTagName("img")[2];
		if('undefined' != typeof(shareImgObj)){
			window.shareData.imgUrl = shareImgObj.src;
		}
	}
	document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {	 
	// 发送给好友
	WeixinJSBridge.on('menu:share:appmessage', function (argv) {
	WeixinJSBridge.invoke('sendAppMessage', { 
		"img_url": window.shareData.imgUrl,
		"img_width": "640",
		"img_height": "640",
		"link": window.shareData.sendFriendLink,
		"desc": window.shareData.fContent,
		"title": window.shareData.fTitle
	}, function (res) {
		_report('send_msg', res.err_msg);
	})
	});
	// 分享到朋友圈
	WeixinJSBridge.on('menu:share:timeline', function (argv) {
	WeixinJSBridge.invoke('shareTimeline', {
		"img_url": window.shareData.imgUrl,
		"img_width": "640",
		"img_height": "640",
		"link": window.shareData.timeLineLink,
		"desc": window.shareData.tContent,
		"title": window.shareData.tTitle
	}, function (res) {
	_report('timeline', res.err_msg);
	});
	});
	// 分享到微博
	WeixinJSBridge.on('menu:share:weibo', function (argv) {
		WeixinJSBridge.invoke('shareWeibo', {
			"content": window.shareData.wContent,
			"url": window.shareData.weiboLink
		}, function (res) {
			_report('weibo', res.err_msg);
		});
		});
	}, false);
	
	
	/**微信内置浏览器客户端下载功能，弹出提示 S*/
	//立即打开
	function openHref(otype){
		//判定是否是微信内置浏览器
		if(is_weixin()){
			$('#weixinDown_div').show();
			qb_user.dialogOption.addShadow($("body"));
			return;
		}
		
		if(otype=='0'){
			window.location.href="http://www.qbao.com/downloadLatestClient.html?type=a";
		}else if(otype=='1'){
			window.location.href="http://www.qbao.com/downloadLatestClient.html?type=i";
		}
	}

	function is_weixin(){
		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i)=="micromessenger") {
			return true;
	 	} else {
			return false;
		}
	}
	/**微信内置浏览器客户端下载功能，弹出提示 E*/
