
var host = window.location.protocol + "//" + window.location.host;
$.ajax({
	type: "get",
	url: host + "/v1/api/campSell/findShare",
	dataType: "json",
	success: function (data) {
		if(data.code==200){
			setShare();
		}
		
function setShare() {
	var host = window.location.protocol + "//" + window.location.host;
	var finalUrl = host + "/getWxData";
	var shareUrl = location.href.split('#')[0];
	$.ajax({
		type: "post",
		url: finalUrl,
		data: {
			reqUrl: shareUrl
		},
		dataType: "json",
		success: function (result) {
			if (result.status == "success") {
				wx.config({
					debug: false,
					appId: result.data.appId,
					timestamp: result.data.timestamp,
					nonceStr: result.data.nonceStr,
					signature: result.data.signature,
					jsApiList: [
						'onMenuShareTimeline',
						'onMenuShareAppMessage',
						'onMenuShareQQ',
						'onMenuShareWeibo'
					]
				});

				wxShare();
			}
		}
	});

}
function wxShare() {
	var shareObject = {
		title: data.resp.share.shareTitle,
		desc: data.resp.share.shareDesc,
		link: data.resp.share.link,
		// link: data.resp.share.shareUrl,
		imgUrl: data.resp.share.shareIcon
	}
	//检测api是否生效
	wx.ready(function () {
		console.log(shareObject);
		// 分享到朋友圈
		wx.onMenuShareTimeline(shareObject);
		// 分享给朋友
		wx.onMenuShareAppMessage(shareObject);
		// 分享到QQ
		wx.onMenuShareQQ(shareObject);
		// 分享到微博
		wx.onMenuShareWeibo(shareObject);

	});
}
	}
})

