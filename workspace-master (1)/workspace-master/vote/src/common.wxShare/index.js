define(function(require,exports,module){
	var wx = require("wxShare");
	var $ = require("jquery");
	var setup = require("setup");

	var app = {
		activityId: setup.getQueryString("activityId"),
        applyId: setup.getQueryString("applyId"),
        voteOpenid: setup.getQueryString("voteOpenid"),
        openId: setup.getQueryString("openId"),
		getJsConfig: function(data, cb){
            var me = this;
            setup.commonAjax("activity/getJsConfig.do", {url: window.location.href}, function(msg){ 
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: msg.appId, // 必填，公众号的唯一标识
                    timestamp: msg.timestamp, // 必填，生成签名的时间戳
                    nonceStr: msg.nonceStr, // 必填，生成签名的随机串
                    signature: msg.signature,// 必填，签名，见$("#timestamp").val()附录1
                    jsApiList: ['hideOptionMenu',"showOptionMenu",'onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone','checkJsApi','openLocation','getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });

                if(cb){
                	var wxShareParams = {
                        title: "约会极地海洋，亲子形象大使招募中....." , // 分享标题
                        desc: "带上你家的萌娃，快来报名吧！" , // 分享描述
                        link: window.location.href,  // 分享链接
                        shareUrl: window.location.href,
                        imgUrl: $("#mainImgUrl").val(),
                        cb: function(){
                            
                        }
                    }

                    me.init(wxShareParams);
                }else{
                	//请求接口，获取连接
	                setup.commonAjax("vote/getShareInfo.do", {
	                    activityId: data.userInfo.activityId,
	                    applyOpenid: me.openId ? me.openId : data.userInfo.openId,
	                    shareOpenid: me.openId ? me.openId : me.voteOpenid //分享者的openId,用来区别分享的title是“w”还是“某某某”
	                }, function(re){ 
	                    var wxShareParams = {
	                        title: re.title , // 分享标题
	                        desc: re.desc , // 分享描述
	                        link: re.link,  // 分享链接
	                        shareUrl: re.link,
	                        imgUrl: re.imgUrl,
	                        cb: function(){
	                            
	                        }
	                    }

	                    me.init(wxShareParams);
	                });
                }
                
            });
        },
		init: function(wxShareParams){
			
			wx.ready(function(){
			    wx.onMenuShareTimeline({    //朋友圈
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
			    });
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
		},
	};



	//邀请好友助力
    $(".main").delegate(".share", "click", function(){

        if($(".inShade").css("display")=="none"){
            $(".inShade").show();
            $("body").css("overflow", "hidden");
            var params = {
                activityId: app.activityId,
                applyId: app.applyId
            };
            setup.commonAjax("vote/getActivityApplyUser.do", params, function(msg){ 
                app.getJsConfig(msg);
            });
        }else{
            $(".inShade").hide();
            $("body").attr("style", "");
        } 

        $(".inShade").click(function(){
            $(this).hide();
            $("body").attr("style", "");
        });

        return false;   
    });

    $(".inShade").click(function(){
        $(this).hide();
        $("body").attr("style", "");
    });
	
	return app;
});