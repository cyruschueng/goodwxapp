define(function(require,exports,module){
	var wx = require("wxShare");
	var $ = require("jquery");
	var setup = require("setup");

	var app = {
		init: function(wxShareParams){
			wx.ready(function(){
			    /*wx.onMenuShareTimeline({    //朋友圈
			        title: wxShareParams.title, // 分享标题
			        link: wxShareParams.shareUrl, // 分享链接
			        imgUrl: wxShareParams.imgUrl, // 分享图标
			        success: function () { 
			            // 用户确认分享后执行的回调函数
			            wxShareParams.cb && wxShareParams.cb();
			        },
			        cancel: function () { 
			            // 用户取消分享后执行的回调函数
			        }
			    });*/
			    wx.onMenuShareAppMessage({  //朋友
			        title: wxShareParams.title, // 分享标题
			        desc: wxShareParams.desc, // 分享描述
			        link: wxShareParams.shareUrl,  // 分享链接
			        imgUrl: wxShareParams.imgUrl, // 分享图标
			        type: 'link', // 分享类型,music、video或link，不填默认为link
			        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			        success: function () { 
			            // 用户确认分享后执行的回调函数
			            wxShareParams.cb && wxShareParams.cb();
			        },
			        cancel: function () { 
			            // 用户取消分享后执行的回调函数
			        }
			    });
			    wx.onMenuShareQQ({ //QQ
			        title: wxShareParams.title,  // 分享标题
			        desc: wxShareParams.desc, // 分享描述
			        link: wxShareParams.shareUrl, // 分享链接
			        imgUrl: wxShareParams.imgUrl, // 分享图标
			        success: function () { 
				        // 用户确认分享后执行的回调函数
				        wxShareParams.cb && wxShareParams.cb();
			        },
			        cancel: function () { 
			        // 用户取消分享后执行的回调函数
			        }
			    });
			    wx.onMenuShareWeibo({ //微博
			        title: wxShareParams.title,  // 分享标题
			        desc: wxShareParams.desc, // 分享描述
			        link: wxShareParams.shareUrl, // 分享链接
			        imgUrl: wxShareParams.imgUrl, // 分享图标
			        success: function () { 
			        	// 用户确认分享后执行的回调函数
			        	wxShareParams.cb && wxShareParams.cb();
			        },
			        cancel: function () { 
			            // 用户取消分享后执行的回调函数
			        }
			    });
			    wx.onMenuShareQZone({ //QQ空间
			        title: wxShareParams.title,  // 分享标题
			        desc: wxShareParams.desc, // 分享描述
			        link: wxShareParams.shareUrl, // 分享链接
			        imgUrl: wxShareParams.imgUrl, // 分享图标
			        success: function () { 
			            // 用户确认分享后执行的回调函数
			            wxShareParams.cb && wxShareParams.cb();
			        },
			        cancel: function () { 
			            // 用户取消分享后执行的回调函数
			        }
			    });
			});

			//图片上传接口
			/*$(".cardImg").delegate(".update", "click", function(){
				wx.ready(function(){
				    wx.chooseImage({
					    count: 1, // 默认9
					    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
					    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					    success: function (res) {
					    	alert(JSON.stringify(res,null,2))
					        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
					    	//上传图片
					    	wx.uploadImage({
							    localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
							    isShowProgressTips: 1, // 默认为1，显示进度提示
							    success: function (res) {
							    	alert(JSON.stringify(res,null,2))
							        var serverId = res.serverId; // 返回图片的服务器端ID
							        $(".banner").attr("src",serverId)
							    }
							});
					    }
					});
				});
			});*/
		}
	};

	return app;
});