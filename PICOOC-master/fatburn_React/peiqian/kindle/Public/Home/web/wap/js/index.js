$(function() {
	var
		fullScreenApi = {
			supportsFullScreen: false,
			isFullScreen: function() {
				return false;
			},
			requestFullScreen: function() {},
			cancelFullScreen: function() {},
			fullScreenEventName: '',
			prefix: ''
		},
		browserPrefixes = 'webkit moz o ms khtml'.split(' ');

	// check for native support
	if (typeof document.cancelFullScreen != 'undefined') {
		fullScreenApi.supportsFullScreen = true;
	} else {
		// check for fullscreen support by vendor prefix
		for (var i = 0, il = browserPrefixes.length; i < il; i++) {
			fullScreenApi.prefix = browserPrefixes[i];

			if (typeof document[fullScreenApi.prefix + 'CancelFullScreen'] != 'undefined') {
				fullScreenApi.supportsFullScreen = true;
				break;
			}
		}
	}

	// update methods to do something useful
	if (fullScreenApi.supportsFullScreen) {
		fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';

		fullScreenApi.isFullScreen = function() {
			switch (this.prefix) {
				case '':
					return document.fullScreen;
				case 'webkit':
					return document.webkitIsFullScreen;
				default:
					return document[this.prefix + 'FullScreen'];
			}
		}
		fullScreenApi.requestFullScreen = function(el) {
			return (this.prefix === '') ? el.requestFullScreen() : el[this.prefix + 'RequestFullScreen']();
		}
		fullScreenApi.cancelFullScreen = function(el) {
			return (this.prefix === '') ? document.cancelFullScreen() : document[this.prefix + 'CancelFullScreen']();
		}
	}

	// jQuery plugin
	if (typeof jQuery != 'undefined') {
		jQuery.fn.requestFullScreen = function() {

			return this.each(function() {
				if (fullScreenApi.supportsFullScreen) {
					fullScreenApi.requestFullScreen(this);
				}
			});
		};
	}

	// export api
	window.fullScreenApi = fullScreenApi;
});

$(function() {

	/**
	 * 图片选择
	 * 1. 根据不同的分辨率来活的不同的图片
	 */

	function AdapterImg(elem) {
		// 参数 elem 应该为一个数组
		this.elem = elem || document.querySelectorAll(".adapter_img");
	}

	AdapterImg.prototype = {
		init: function() {
			this.dpr = window.devicePixelRatio;
		},
		getCatalog: function() {
			if (!this.dpr) {
				this.dpr = window.devicePixelRatio;
			}
			var level = null;
			var catalog = null;

			if (this.dpr) {
				level = this.dpr;
			} else {
				var e = document.getElementById("getDpr");
				var sy = window.getComputedStyle(e, null);
				switch (sy.width) {
					case "10px":
						level = 1;
						break;
					case "20px":
						level = 1.5;
						break;
					case "30px":
						level = 2;
						break;
					case "40px":
						level = 2.5;
						break;
					case "50px":
						level = 3;
						break;
				}
			}

			if (level <= 1) {
				return "@480";
			} else if (level > 1 && level <= 2) {
				return "@640";
			} else if (level > 2 && level <= 2.3) {
				return "@750";
			} else if (level > 2 && level <= 2.5) {
				return "@1080";
			} else if (level > 2.5 && level <= 3) {
				return "@1242";
			}
			else{
				return "@750";
			}
		},
		getSrc: function(elem) {
			// 根据屏幕分辨率获取图片的src
			var src = null;

			if (elem) {
				src = elem.getAttribute("adapter");
			} else {
				return;
			}
			if (!src) {
				return;
			}

			var a = src.split("/");
			for (var i = 0, len = a.length; i < len; i++) {
				if (a[i].indexOf("@") != -1) {
					// 替换目录
					var newA = a.splice(i, 1, this.getCatalog());
					// 拼接
					var s = this.connectSrc(a);
					return s;
				}
			}
			return null;
		},
		connectSrc: function(a) {
			// 拼接数组中的字符串
			if (!a) return;
			var url = "";
			for (var i = 0, len = a.length; i < len; i++) {
				if (i == len - 1) {
					url = url + a[i];
				} else {
					url = url + a[i] + "/";
				}
			}
			return url;
		},
		setBg: function() {
			for (var i = 0, len = this.elem.length; i < len; i++) {
				var e = this.elem[i];
				var src = this.getSrc(e);
				if (!src) {
					console.log("getSrc is wrong!!");
					continue;
				}
				if (e.tagName == "IMG") {
					e.setAttribute("src", src);
				} else if (e.tagName == "DIV") {
					e.style.backgroundImage = src;
				} else {
					console.log("Other element add 'get-dpr' class");
				}
			}
		}
	}

	window.AdapterImg = AdapterImg;


	/**
	 * 移动端图片轮播
	 * 1. 支持手势滑动
	 * 2. 图片会根据屏幕分辨率来做不同的选择
	 */

	window.MobileLoop = MobileLoop;

	function MobileLoop(config) {

		this.config = {
			gesture: config.gesture || true, // 是否支持手势
			time: config.time || 3000, // 轮播间隙时间（毫秒）
			markClass: config.markClass || "swiper-img" // 图片class
		}
	}
	MobileLoop.prototype = {
		init: function() {

			this.elem = document.querySelectorAll("." + this.config.markClass);
			this.idx = 0; // 定位加载到哪张图片
			var self = this;

			this.loadImg(0);

			if ($(".swiper-container")) {
				// 初始化滚动控件
				this.mySwiper = new Swiper('.swiper-container', {
					pagination: '.pagination',
					loop: true,
					// autoplay: 3500, // 轮播间隙
					speed: 600, // 滑动速度
					grabCursor: true,
					paginationClickable: true, // 点击下面的轮播点能够自动滑倒那页
					calculateHeight: true, // 解决自动设置1000+的高度
					autoplayDisableOnInteraction: false, // 轮播时，手势滑动后保证能继续轮播
					onImagesReady: function() {
						// alert(1);
					}
				});
			}

		},
		loadImg: function(idx) {
			// 一张一张的加载
			var ele = this.elem[idx];
			var self = this;
			if (ele) {
				var adtImg = new AdapterImg();
				ele.src = adtImg.getSrc(ele);
				ele.onload = function() {
					self.loadImg(++idx);
				}
			} else {
				return;
			}
		}
	}


	/**
	 * 菜单
	 * 1. 滑动部分也是采用轮播图的滑动插件
	 *
	 * 根目录： CND_URL
	 */

	function menu() {}
	menu.prototype = {

		init: function() {

			this.aPro = document.querySelector("#productDetail"); // 一级菜单中的产品点击后跳转
			this.menu = document.querySelector("#menu");
			this.bPro = document.querySelector("#AMenu");

			this.initTran();
			this.reg();
		},
		initTran: function() {
			// 初始化滚动控件
			this.mySwiper = new Swiper('.menu-container', {
				swipeToNext: false,
				swipeToPrev: false,
				followFinger: false,
				speed: 400,
				onImagesReady: function() {
					$(".menu-container").toggle();
				}
			});

			$(".layer").css({
				height: $(".header").height() + $(".main").height() + $(".footer").height() + "px"
			});

		},
		reg: function() {
			var self = this;
			var elem = $(".menu-container");

			$(".layer").tap(function() {
				// 回到首页
				self.mySwiper.swipeTo(0);

				// 解决初始化时候如果直接使用display:none则控件
				if (elem.hasClass("show-hide")) {
					elem.removeClass("show-hide");
				}

				$(".layer").toggle();
				elem.toggle();

				// 切换菜单icon
				if (elem.css("display") == "none") {
					$(".head_btn_con").find("img").attr("src", CDN_URL + "/wap/images/img/header-btn.png");
				} else {
					$(".head_btn_con").find("img").attr("src", CDN_URL + "/wap/images/img/close_icon.png");
				}
			});

			$(".head_btn_con").click(function(e) {

				// 回到首页
				self.mySwiper.swipeTo(0);

				// 解决初始化时候如果直接使用display:none则控件
				if (elem.hasClass("show-hide")) {
					elem.removeClass("show-hide");
				}
				$(".layer").toggle();
				elem.toggle();

				$(".layer").css({
					height: $(".header").height() + $(".main").height() + $(".footer").height() + "px"
				});

				// 切换菜单icon
				if (elem.css("display") == "none") {
					$(".head_btn_con").find("img").attr("src", CDN_URL + "/wap/images/img/header-btn.png");
				} else {
					$(".head_btn_con").find("img").attr("src", CDN_URL + "/wap/images/img/close_icon.png");
				}

			});

			this.aPro.addEventListener("click", function() {
				self.mySwiper.swipeNext();
			}, false);
			this.bPro.addEventListener("click", function() {
				self.mySwiper.swipePrev();
			}, false);

			// setTimeout(function() {
			// 	$(".menu-container").toggle();
			// }, 1000);

			// var conText = document.querySelectorAll(".menu-content-text");
			$(".menu-content").bind("touchstart", function(evt) {
				$(evt.target).find(".menu-content-text").addClass("blue");
			});
			$(".menu-content").bind("touchcancel", function() {
				$(evt.target).find(".menu-content-text").removeClass("blue");
			});
			$(".menu-content").bind("touchend", function(evt) {
				$(evt.target).find(".menu-content-text").removeClass("blue");
			});
		}
	}


	/**
	 * [layer description]
	 * @return {[type]} [description]
	 */
	function layer() {}
	layer.prototype = {
		init: function() {
			this.reg();
			this.tag = true;

			if (this.local()) {
				$(".ceng").show();
			} else {
				$(".ceng").hide();
			}
		},
		reg: function() {
			var self = this;
			$(".ceng-x").tap(function() {
				$(".ceng").hide();
				localStorage.setItem("picooc_time", new Date());
			});

			$(".go-top").click(function() {
				self.goTop();
			});
		},
		goTop: function(acceleration, time) {

			acceleration = acceleration || 0.1;
			time = time || 16;

			var x1 = 0;
			var y1 = 0;
			var x2 = 0;
			var y2 = 0;
			var x3 = 0;
			var y3 = 0;

			if (document.documentElement) {
				x1 = document.documentElement.scrollLeft || 0;
				y1 = document.documentElement.scrollTop || 0;
			}
			if (document.body) {
				x2 = document.body.scrollLeft || 0;
				y2 = document.body.scrollTop || 0;
			}
			var x3 = window.scrollX || 0;
			var y3 = window.scrollY || 0;

			// 滚动条到页面顶部的水平距离
			var x = Math.max(x1, Math.max(x2, x3));
			// 滚动条到页面顶部的垂直距离
			var y = Math.max(y1, Math.max(y2, y3));

			// 滚动距离 = 目前距离 / 速度, 因为距离原来越小, 速度是大于 1 的数, 所以滚动距离会越来越小
			var speed = 1 + acceleration;
			window.scrollTo(Math.floor(x / speed), Math.floor(y / speed));

			// 如果距离不为零, 继续调用迭代本函数
			if (x > 0 || y > 0) {
				// var invokeFunction = "goTop(" + acceleration + ", " + time + ")";
				var self = this;
				window.setTimeout(function() {
					self.goTop(acceleration, time);
				}, time);
			}
		},
		local: function() {
			var nowDate = new Date(),
				oldDate = localStorage.getItem("picooc_time");

			if (oldDate) {
				var dif = this.getDateDif(oldDate, nowDate, "minute");
				if (dif < 60) {
					return false;
				} else {
					// localStorage.setItem("picooc_time", nowDate);
					return true;
				}
			} else {
				// localStorage.setItem("picooc_time", nowDate);
				return true;
			}
		},
		getDateDif: function(startTime, endTime, diffType) {

			var sTime = new Date(startTime);
			var eTime = endTime;

			//作为除数的数字
			var divNum = 1;
			switch (diffType) {
				case "second":
					divNum = 1000;
					break;
				case "minute":
					divNum = 1000 * 60;
					break;
				case "hour":
					divNum = 1000 * 3600;
					break;
				case "day":
					divNum = 1000 * 3600 * 24;
					break;
				default:
					break;
			}
			return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));
		}
	}

	/**
	 * 视频资源
	 *
	 */
	function videoPlay() {}
	videoPlay.prototype = {
		init: function() {
			// 除了首页外直接return;
			var videoImg = $("#videoImg");
			var video = this.video = document.querySelector("#idxVideo");
			if (!document.querySelector("#videoImg")) {
				return;
			}

			var ua = navigator.userAgent.toLowerCase();
			var Android = String(ua.match(/android/i)) == "android";

			videoImg.click(function() {

				if (Android) {
					location.hash = "android"
					// showVideo();
					// if (fullScreenApi.supportsFullScreen) {
					// 	// fullScreenApi.requestFullScreen(video);
					// 	if (fullScreenApi.isFullScreen()) {
					// 		fullScreenApi.cancelFullScreen();
					// 	} else {
					// 		fullScreenApi.requestFullScreen(video);
					// 	}
					// } else {
					// 	video.webkitEnterFullscreen();
					// }

				} else {
					document.querySelector("#idxVideoIOS").play();
				}
			});
			this.reg(video);
		},
		fullscreen: function(elem) {
			var prefix = 'webkit';
			if (elem[prefix + 'RequestFullScreen']) {
				return prefix + 'RequestFullScreen';
			} else if (elem[prefix + 'EnterFullscreen']) {
				return prefix + 'EnterFullscreen';
			};
			return false;
		},
		reg: function(video) {

			// $(video).bind("webkitfullscreenchange" , function(e){
			// 	alert(2);
			// 	if (!fullScreenApi.isFullScreen()) { //退出全屏暂停视频
			// 		video.pause();
			// 	};
			// });

			var self = this;
			window.onhashchange = function() {
				if (location.hash == "#android") {
					self.video.play();
					$(".video-dialog").show();
				} else if (location.hash == "") {
					self.video.pause();
					$(".video-dialog").hide();
				}
			};

			video.addEventListener('ended', function() {
				fullScreenApi.cancelFullScreen(); //播放完毕自动退出全屏
			}, false);
		},
		showVideo: function() {

			location.hash = "android";
		}
	}


	function shareWeixin() {

		var shareCon = {
			appid: 1,
			imgUrl:"http://1251087842.cdn.myqcloud.com/1251087842/web/wap/images/slt2.jpg",
			lineLink:"http://www.picooc.com",
			descContent: "有品，是追求极致的人生态度；是格调考究的群体标签；是不断挑战的自我实现；是健康美好的生活体验。",
			shareTitle:"有品·PICOOC 生活从有品开始"
		};
         
        function shareFriend() {
            WeixinJSBridge.invoke('sendAppMessage',{
                "appid": shareCon.appid,
                "img_url": shareCon.imgUrl,
                "img_width": "200",
                "img_height": "200",
                "link": shareCon.lineLink,
                "desc": shareCon.descContent,
                "title": shareCon.shareTitle
            }, function(res) {
            });
        }
        function shareTimeline() {
            WeixinJSBridge.invoke('shareTimeline',{
                "img_url": shareCon.imgUrl,
                "img_width": "200",
                "img_height": "200",
                "link": shareCon.lineLink,
                "desc": shareCon.descContent,
                "title": shareCon.shareTitle
            }, function(res) {
            });
        }
        function shareWeibo() {
            WeixinJSBridge.invoke('shareWeibo',{
                "content": shareCon.descContent,
                "url": shareCon.lineLink,
            }, function(res) {
            });
        }
        // 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
        document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
            // 发送给好友
            WeixinJSBridge.on('menu:share:appmessage', function(argv){
                shareFriend();
            });
            // 分享到朋友圈
            WeixinJSBridge.on('menu:share:timeline', function(argv){
                shareTimeline();
            });
            // 分享到微博
            WeixinJSBridge.on('menu:share:weibo', function(argv){
                shareWeibo();
            });
        }, false);

	}


	/**
	 * Do something.....
	 */

	// 适配图片
	var initImg = new AdapterImg();
	initImg.init();
	initImg.setBg();

	// 图片轮播
	var loopImg = new MobileLoop({
		gesture: true,
		time: 3000,
		markClass: "swiper-img"
	});
	loopImg.init();

	// 菜单初始化
	var initMenu = new menu();
	initMenu.init();

	// 本地缓存layer
	var l = new layer();
	l.init();

	// video 播放
	var v = new videoPlay();
	v.init();

	// 微信分享
	shareWeixin();
});