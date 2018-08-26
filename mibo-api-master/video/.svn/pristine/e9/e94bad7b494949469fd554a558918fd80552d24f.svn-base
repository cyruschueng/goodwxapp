! function e(i, t, o) {
	function a(r, d) {
		if (!t[r]) {
			if (!i[r]) {
				var c = "function" == typeof require && require;
				if (!d && c) return c(r, !0);
				if (n) return n(r, !0);
				var s = new Error("Cannot find module '" + r + "'");
				throw s.code = "MODULE_NOT_FOUND", s
			}
			var l = t[r] = {
				exports: {}
			};
			i[r][0].call(l.exports, function(e) {
				var t = i[r][1][e];
				return a(t ? t : e)
			}, l, l.exports, e, i, t, o)
		}
		return t[r].exports
	}
	for (var n = "function" == typeof require && require, r = 0; r < o.length; r++) a(o[r]);
	return a
}({
	1: [function(e, i, t) {
		i.exports = function() {
			function e(e) {
				window.console && window.console.log(e)
			}

			function i(e) {
				window.console && window.console.info(e)
			}

			function t(e) {
				window.console && window.console.warn(e)
			}

			function o(e) {
				window.console && window.console.error(e)
			}

			function a(e) {
				window.console && window.console.debug(e)
			}
			return {
				log: e,
				info: i,
				warn: t,
				error: o,
				debug: a
			}
		}()
	}, {}],
	2: [function(e, i, t) {
		i.exports = function() {
			function e() {
				n = {
					type: "custom",
					id: 0,
					documents: {
						title: d.title,
						pic: d.pic,
						link: window.location.href
					},
					weibo: {
						title: d.title,
						site: d.site,
						pic: d.pic,
						link: window.location.href
					},
					weixin: {
						title: d.title,
						desc: d.desc,
						pic: d.pic,
						link: window.location.href
					},
					circle: {
						title: d.title,
						pic: d.pic,
						link: window.location.href
					},
					qq: {
						title: d.title,
						desc: d.desc,
						site: d.site,
						pic: d.pic,
						link: window.location.href
					},
					qqzone: {
						title: d.title,
						desc: d.desc,
						site: d.site,
						pic: d.pic,
						link: window.location.href
					},
					funcs: {
						weibo: null,
						weixin: null,
						circle: null,
						qq: null,
						qqzone: null
					}
				}
			}

			function i() {
				var e = "http://system.huajiao.com/wx/getconfig",
					i = {},
					a = function(e) {
						var i = e.data.config;
						r.appId = i.appId, r.timestamp = i.timestamp, r.nonceStr = i.nonceStr, r.signature = i.signature, t(r)
					},
					n = function() {
						window.console && console.log("获取微信分享配置信息失败")
					};
				window.wx ? o(e, i, a, n) : window.console && console.log("没有检测到微信js-sdk")
			}

			function t(e) {
				window.wx.config(e), window.wx.ready(function() {
					window.wx.checkJsApi({
						jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone"],
						success: function(e) {}
					}), window.wx.onMenuShareTimeline({
						title: n.weixin.desc,
						link: n.circle.link,
						imgUrl: n.circle.pic
					}), window.wx.onMenuShareAppMessage({
						title: n.weixin.title || "花椒直播",
						desc: n.weixin.desc,
						link: n.weixin.link,
						imgUrl: n.weixin.pic
					}), window.wx.onMenuShareQQ({
						title: n.qq.title,
						desc: n.qq.desc,
						link: n.qq.link,
						imgUrl: n.qq.pic
					}), window.wx.onMenuShareWeibo({
						title: n.weibo.title,
						desc: n.weibo.title,
						link: n.weibo.link,
						imgUrl: n.weibo.pic
					}), window.wx.onMenuShareQZone({
						title: n.qqzone.title,
						desc: n.qqzone.desc,
						link: n.qqzone.link,
						imgUrl: n.qqzone.pic
					})
				})
			}

			function o(e, i, t, o) {
				$.ajax({
					url: e,
					data: i,
					dataType: "jsonp"
				}).done(function(e) {
					e && "0" == e.errno && t(e)
				}).fail(function(e) {
					o(e)
				})
			}

			function a(e) {
				var i = navigator.userAgent.toLowerCase(),
					t = {
						ios: /iphone|ipad|ipod/,
						and: /android/
					},
					o = {
						relateId: "laxin123",
						titile: "花椒直播  发红包了",
						content: "我使用花椒直播赚钱，有福同享，送你大红包一起来吧",
						img: "http://static.huajiao.com/huajiao/202944587200951588.png",
						url: "http://www.huajiao.com"
					};
				if ($.extend(o, e), t.ios.test(i)) {
					var a = 0,
						n = 0,
						r = o.relateId,
						d = o.title,
						c = o.content,
						s = o.img,
						l = o.url;
					window.location.href = "huajiao://h5fenxiang/share?messageType=" + n + "&shareType=" + a + "&title=" + d + "&content=" + c + "&imageUrlString=" + s + "&linkUrlString=" + l + "&relateId=" + r
				} else if (t.and.test(i)) {
					var r = o.relateId,
						u = o.url,
						d = o.title,
						p = o.content,
						h = o.img;
					CallShare.callShare(r, u, d, p, h)
				}
				return !1
			}
			var n, r = {
					debug: !1,
					appId: "",
					timestamp: 0,
					nonceStr: "",
					signature: "",
					jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"]
				},
				d = {
					site: "花椒直播",
					title: "花椒直播",
					desc: "我使用花椒直播赚钱，有福同享，送你大红包一起来吧",
					pic: "http://static.huajiao.com/huajiao/202944587200951588.png",
					link: window.location.href
				},
				c = function(t) {
					d = t ? $.extend(d, t) : d, e(), i()
				};
			return {
				wxShare: c,
				appShare: a
			}
		}()
	}, {}],
	3: [function(e, i, t) {
		i.exports = function() {
			var e = {},
				i = navigator.userAgent.toLowerCase();
			return e.escapeHTML = function() {
				var e = {
						"<": "&#60;",
						">": "&#62;",
						'"': "&#34;",
						"'": "&#39;",
						"&": "&#38;"
					},
					i = /&(?![\w#]+;)|[<>"']/g,
					t = function(i) {
						return e[i]
					};
				return function(e) {
					return String(e || "").replace(i, t)
				}
			}(), e.getParamFormUrl = function(e) {
				var i = new RegExp("(^|&)" + e + "=([^&]*)(&|$)", "i"),
					t = window.location.search.substr(1).match(i),
					o = "";
				return t && (o = t[2]), i = null, t = null, o || ""
			}, e.formateTime = function(e) {
				var i = "";
				if (e > -1) {
					var t = Math.floor(e / 3600),
						o = Math.floor(e / 60) % 60,
						a = e % 60,
						n = parseInt(t / 24);
					n > 0 && (t -= 24 * n, i = n + "天 "), 10 > t && (i += "0"), i += t + ":", 10 > o && (i += "0"), i += o + ":", 10 > a && (i += "0"), i += a
				}
				return i
			}, e.formateDateTime = function(e) {
				var i = new Date;
				isNaN(e) || (i = new Date(1e3 * parseInt(e, 10)));
				var t = i.getFullYear(),
					o = i.getMonth() + 1,
					a = i.getDate(),
					n = i.getHours(),
					r = i.getMinutes(),
					d = i.getSeconds();
				return n = 10 > n ? "0" + n : n, r = 10 > r ? "0" + r : r, d = 10 > d ? "0" + d : d, t + "-" + o + "-" + a + " " + n + ":" + r + ":" + d
			}, e.formateData = function(e, i) {
				var t, o = "";
				for (var a in i) o = "{{" + a + "}}", t = new RegExp(o, "gm"), e = e.replace(t, i[a]);
				return e
			}, e.formateTimeToSeconds = function(e) {
				var i = new Date,
					t = e.split(" ")[0].split("-")[0],
					o = e.split(" ")[0].split("-")[1],
					a = e.split(" ")[0].split("-")[2],
					n = e.split(" ")[1].split(":")[0],
					r = e.split(" ")[1].split(":")[1],
					d = e.split(" ")[1].split(":")[2],
					c = parseInt(t, 10),
					s = parseInt(o, 10) - 1,
					l = parseInt(a, 10),
					u = parseInt(n, 10),
					p = parseInt(r, 10),
					h = parseInt(d, 10);
				return i.setFullYear(c, s, l), i.setHours(u, p, h), Date.parse(i) / 1e3
			}, e.browserCheck = function() {
				var i = navigator.userAgent.toLowerCase(),
					t = i.indexOf("trident") > -1,
					o = i.indexOf("presto") > -1,
					a = i.indexOf("applewebkit") > -1,
					n = i.indexOf("Gecko") > -1 && -1 === i.indexOf("KHTML"),
					r = i.indexOf("chrome") > -1,
					d = e.isMobileDevice(),
					c = !!i.match(/\(i[^;]+;( U;)? cpu.+mac os x/),
					s = i.indexOf("android") > -1 || i.indexOf("Linux") > -1,
					l = i.indexOf("iphone") > -1 || i.indexOf("Mac") > -1,
					u = i.indexOf("ipad") > -1,
					p = -1 === i.indexOf("safari"),
					h = {
						u: i,
						ie: t,
						op: o,
						wk: a,
						cr: r,
						mz: n,
						mb: d,
						io: c,
						an: s,
						ih: l,
						id: u,
						wa: p
					};
				return e.browserTypeInfo = h, h
			}, e.deviceCheck = function() {}, e.getImageUrl = function(e) {
				return -1 == navigator.userAgent.toLowerCase().indexOf("chrome") && (e = e.replace(".webp", ".jpg")), e
			}, e.isMobileDevice = function() {
				var e = navigator.userAgent.toLowerCase();
				return !!/(iphone|ios|android|mini|mobile|mobi|nokia|symbian|ipod|ipad|ws\s+phone|mqqbrowser|wp7|wp8|ucbrowser7|ucweb|360\s+aphone\s+browser)/i.test(e)
			}, e.isWeibo = function() {
				var e = navigator.userAgent.toLowerCase();
				return !!e.match(/weibo/i)
			}, e.isIosDevice = function() {
				var e = navigator.userAgent.toLowerCase(),
					i = !!e.match(/\(i[^;]+;( U;)? cpu.+mac os x/),
					t = e.indexOf("iphone") > -1 || e.indexOf("Mac") > -1,
					o = e.indexOf("ipad") > -1;
				return !!(i || o || t)
			}, e.getDownloadUrl = function() {
				var i = "";
				return i = e.isIosDevice() ? "http://www.huajiao.com/dl.php?os=ios" : e.isAndroidDevice() ? "http://www.huajiao.com/dl.php?os=android" : "http://www.huajiao.com/dl.php"
			}, e.isWeixin = function() {
				var e = navigator.userAgent.toLowerCase();
				return "micromessenger" == e.match(/MicroMessenger/i)
			}, e.getImageUrl = function(e) {
				return -1 == navigator.userAgent.toLowerCase().indexOf("chrome") && (e = e.replace(".webp", ".jpg")), e
			}, e.getSchemaUrl = function() {
				return "huajiao://huajiao.com/goto/index"
			}, e.szInit = function() {
				window.__getButtonLabel__ = function(e) {
					return "download" === e ? "下载花椒" : "downloading" === e ? "下载中" : "pause" === e ? "暂停" : "resume" === e ? "继续" : "waiting" === e ? "请等待" : "install" === e ? "安装" : "open" === e ? "打开花椒" : void 0
				}, window.AndroidWebview && window.AppStatusMgr.ready(function() {
					window.AppStatusMgr.start()
				})
			}, e.openOrDownloadApp = function(i) {
				var t = new Date,
					o = setTimeout(function() {
						var i = new Date;
						5e3 > i - t ? window.location.href = e.getDownloadUrl() : window.close()
					}, 500);
				$(window).on("visibilitychange webkitvisibilitychange pagehide", function() {
					clearTimeout(o)
				}, !1), window.location.href = i
			}, e.downloadApp = function() {
				window.AndroidWebview || (window.location.href = e.getDownloadUrl())
			}, e.openApp = function() {
				if (!window.AndroidWebview) {
					var i = e.getSchemaUrl(),
						t = setTimeout(function() {
							alert("请在浏览器里面打开该页面")
						}, 600);
					e.addEventListener("visibilitychange", function() {
						clearTimeout(t)
					}, !1), e.addEventListener("webkitvisibilitychange", function() {
						clearTimeout(t)
					}, !1), window.location.href = i
				}
			}, e.formateTitle = function(e, i, t) {
				var o = i || "花椒播主",
					a = t,
					n = "";
				return e && e.length > 0 ? n = e : (n = parseInt(a.split(" ")[0].split("-")[1] || 1, 10) + "月" + parseInt(a.split(" ")[0].split("-")[2] || 1, 10) + "日", n = o + " " + n + "作品"), n
			}, e.formateNum = function(e) {
				if ("number" == typeof e) {
					var i = 0,
						t = 0;
					return 0 >= e ? i = 0 : e > 0 && 1e4 > e ? i = e : e >= 1e4 && 1e7 > e && e % 1e4 >= 1e3 ? (t = e / 1e3, i = parseInt(t) / 10 + "w") : e >= 1e4 && 1e7 > e && 1e3 > e % 1e4 ? (t = e / 1e4, i = t.toFixed(0) + "w") : e >= 1e7 && 1e8 > e ? (t = e / 1e4, i = t.toFixed(0) + "w") : (t = e / 1e8, i = t.toFixed(1) + "y"), i
				}
				return e
			}, e.formateNumtoThousands = function(e) {
				e = (e || 0).toString();
				for (var i = ""; e.length > 3;) i = "," + e.slice(-3) + i, e = e.slice(0, e.length - 3);
				return e && (i = e + i), i
			}, e.getPageInfo = function() {
				var e = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
					i = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
				return {
					width: i,
					height: e
				}
			}, e.flashChecker = function() {
				var e, i = 0,
					t = 0;
				if (document.all) {
					if (e = new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash")) {
						i = 1;
						var o = e.GetVariable("$version");
						t = parseInt(o.split(" ")[1].split(",")[0])
					}
				} else if (navigator.plugins && navigator.plugins.length > 0 && (e = navigator.plugins["Shockwave Flash"])) {
					i = 1;
					for (var a = e.description.split(" "), n = 0; n < a.length; ++n) isNaN(parseInt(a[n])) || (t = parseInt(a[n]))
				}
				return {
					f: i,
					v: t
				}
			}, e.getTouchDirection = function(i, t, o, a, n) {
				var r = t - a,
					d = o - i,
					c = 0,
					s = 10;
				if (!isNaN(n) && parseInt(n, 10) > 0 && (s = n), Math.abs(d) < s && Math.abs(r) < s) return c;
				var l = e.getAngle(d, r);
				return l >= -45 && 45 > l ? c = 4 : l >= 45 && 135 > l ? c = 1 : l >= -135 && -45 > l ? c = 2 : (l >= 135 && 180 >= l || l >= -180 && -135 > l) && (c = 3), c
			}, e.getAngle = function(e, i) {
				return 180 * Math.atan2(i, e) / Math.PI
			}, e.getInnerWidth = function() {
				var e = window.innerWidth;
				return "number" != typeof e && (e = "number" === document.compatMode ? document.documentElement.clientWidth : document.body.clientWidth), e
			}, e.getInnerHeight = function() {
				var e = window.innerHeight;
				return "number" != typeof e && (e = "number" === document.compatMode ? document.documentElement.clientHeight : document.body.clientHeight), e
			}, e.getOrientation = function() {
				var i = "portrait";
				if (window.orientation)(180 === window.orientation || 0 === window.orientation) && (i = "portrait"), (90 === window.orientation || -90 === window.orientation) && (i = "landscape");
				else {
					var t = e.getInnerWidth(),
						o = e.getInnerHeight();
					i = o > t ? "portrait" : t > o ? "landscape" : "portrait"
				}
				return i
			}, e.isPortrait = function() {
				return "portrait" === e.getOrientation()
			}, e.isLandscape = function() {
				return "landscape" === e.getOrientation()
			}, e.getMid = function() {
				var e = (new Date).getTime().toString() + (1e8 * Math.random()).toString();
				e = e.replace(".", "");
				var i = window.localStorage.getItem("deviceid") || e;
				return window.localStorage.setItem("deviceid", i), i
			}, e.isIosDevice = function() {
				var e = navigator.userAgent.toLowerCase(),
					i = !!e.match(/\(i[^;]+;( U;)? cpu.+mac os x/),
					t = e.indexOf("iphone") > -1 || e.indexOf("Mac") > -1,
					o = e.indexOf("ipad") > -1;
				return !!(i || o || t)
			}, e.isAndroidDevice = function() {
				var e = navigator.userAgent.toLowerCase(),
					i = e.indexOf("android") > -1 || e.indexOf("Linux") > -1;
				return i
			}, e.formatTpl = function(e, i) {
				var t, o = "";
				for (var a in i) o = "{{" + a + "}}", t = new RegExp(o, "gm"), e = e.replace(t, i[a]);
				return e
			}, e.formateDateTime = function(e) {
				var i = new Date;
				isNaN(e) || (i = new Date(1e3 * parseInt(e, 10)));
				var t = (i.getFullYear(), i.getMonth() + 1),
					o = i.getDate(),
					a = i.getHours(),
					n = i.getMinutes(),
					r = i.getSeconds();
				return a = 10 > a ? "0" + a : a, n = 10 > n ? "0" + n : n, r = 10 > r ? "0" + r : r, t + "月" + o + "日&nbsp;&nbsp;" + a + "点" + n + "分"
			}, e.is360view = function() {
				var e = navigator.userAgent.toLowerCase();
				return !!e.match(/360webview/g)
			}, e.isSafe = function() {
				return !!i.match(/mobilesafe\/business/gi)
			}, e.isIOS9 = function() {
				return navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) ? Boolean(navigator.userAgent.match(/OS [9]_\d[_\d]* like Mac OS X/i)) : !1
			}, e.isUpIos9 = function() {
				var e;
				return navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) ? (e = navigator.userAgent.match(/OS ([9|10]{1,})_\d[_\d]* like Mac OS X/i), e && e[1] >= 9 ? !0 : !1) : !1
			}, e.isQQ = function() {
				return !!i.match(/QQ/gi)
			}, e.isSz = function() {
				return !!i.match(/360appstore/i)
			}, window.String.prototype.toCapitalize = function() {
				return this.toLowerCase().replace(/\b(\w)|\s(\w)/g, function(e) {
					return e.toUpperCase()
				}) || ""
			}, e.isHuajiao = function() {
				return !!i.match(/huajiao/g)
			}, e
		}()
	}, {}],
	4: [function(e, i, t) {
		i.exports = function() {
			var i = e("../../../common/js/module/huajiaoLog"),
				t = e("./formate"),
				o = window._DATA,
				a = {};
			if (o.feed) {
				var n = parseInt(o.feed.type, 10);
				switch (a.feedid = o.feed.feed.relateid.toString(), a.type = n, a.publishtime = o.feed.feed.publishtime, a.favorited = o.feed.feed.favorited, a.reposts = parseInt(o.feed.feed.reposts, 10), a.replies = parseInt(o.feed.feed.replies, 10), a.width = parseInt(o.feed.feed.width, 10), a.height = parseInt(o.feed.feed.height, 10), a.praises = parseInt(o.feed.feed.praises, 10), a.watches = parseInt(o.feed.feed.watches, 10), a.device = o.feed.feed.device, a.title = o.feed.feed.title, a.image = o.feed.feed.image, n) {
					case 1:
						a.sn = o.feed.feed.sn, a.m3u8 = o.feed.feed.m3u8, a.duration = parseInt(o.feed.feed.duration, 10), a.location = t.formateLocation(o.feed.feed.location), a.network = o.feed.feed.network, a.replays = o.feed.feed.replays, a.subtitle = o.feed.feed.subtitle, a.balance = o.feed.author.balance;
						break;
					case 2:
						a.sn = o.feed.feed.sn, a.m3u8 = o.feed.feed.m3u8, a.duration = parseInt(o.feed.feed.duration, 10), a.location = t.formateLocation(o.feed.feed.location), a.network = o.feed.feed.network, a.replays = o.feed.feed.replays, a.subtitle = o.feed.feed.subtitle;
						break;
					case 3:
						break;
					case 4:
						a.duration = parseInt(o.feed.feed.duration, 10), a.mp4 = o.feed.feed.mp4
				}
			} else i.log("No feed data");
			return a
		}()
	}, {
		"../../../common/js/module/huajiaoLog": 1,
		"./formate": 5
	}],
	5: [function(e, i, t) {
		i.exports = function() {
			var e = function(e) {
				var i = "火星";
				return -1 === e.indexOf(i) ? e : ""
			};
			return {
				formateLocation: e
			}
		}()
	}, {}],
	6: [function(e, i, t) {
		$(function() {
			var i = e("./public/huajiaoDownload"),
				t = e("./public/addParamForUrl"),
				o = e("./data/feedData"),
				a = e("./public/share"),
				n = e("./public/publicArea"),
				r = e("./public/async");
			e("./public/dot");
			var d = e("./public/downTip");
			i.init(), window.onload = function() {
				var e = ["http://s0.qhimg.com/monitor/;monitor/8e133f74.js", "http://static.huajiao.com/huajiao/web/static/js/common/monitor.js?v=ab6688f", "http://s11.cnzz.com/z_stat.php?id=1255745025&web_id=1255745025"];
				r(e, null, "script", function() {
					window.monitor && monitor.setProject("huajiao").setUrl(window.location.href)
				})
			}, a.init({
				type: "live",
				id: o.feedid
			}), t.init(), n.init(o), d.init(null)
		})
	}, {
		"./data/feedData": 4,
		"./public/addParamForUrl": 7,
		"./public/async": 8,
		"./public/dot": 9,
		"./public/downTip": 10,
		"./public/huajiaoDownload": 11,
		"./public/publicArea": 12,
		"./public/share": 13
	}],
	7: [function(e, i, t) {
		i.exports = function() {
			function e(e) {
				var i = new RegExp("(^|&)" + e + "=([^&]*)(&|$)", "i"),
					t = window.location.search.substr(1).match(i);
				return null != t ? decodeURIComponent(t[2]) : ""
			}

			function i(i, t) {
				var o, a, n, r = t.attr("href");
				for (a = 0, o = i.length; o > a; a++) n = i[a], "" != e(n) && (r = r.indexOf("?") > -1 ? r + "&" + n + "=" + e(n) : r + "?" + n + "=" + e(n));
				window.location.href = r
			}

			function t() {
				$("body").on("click", "a", function(e) {
					var t = $(this),
						o = t.attr("href"),
						a = /(http)|(https)|(\/)/g;
					return o && o.match(a) ? (i(["qd", "reference"], t), !1) : !0
				})
			}
			return {
				init: t
			}
		}()
	}, {}],
	8: [function(e, i, t) {
		i.exports = function() {
			function e(e, i, t, o) {
				function a() {
					w++, w >= f && s()
				}

				function n(e, i) {
					f++, e.onload = a, s = i
				}
				for (var r, d = i || document.createElement("div"), c = {
						link: "href",
						script: "src"
					}, s = o || function() {}, l = {
						link: ["rel", "stylesheet"],
						script: ["type", "text/javascript"]
					}, u = l[t][0], p = l[t][1], h = c[t], f = 0, w = 0, m = 0, g = e.length; g > m; m++) r = document.createElement(t), r[h] = e[m], r[u] = p, n(r, s), d.appendChild(r);
				i || (d.style.display = "none", document.body.appendChild(d))
			}
			return e
		}()
	}, {}],
	9: [function(e, i, t) {
		i.exports = function() {
			function i(e) {
				var i, o = $(this),
					a = o.attr("data-dot-mark"),
					n = o.attr("data-key"),
					r = _DATA.page || "";
				if (i = t.isIosDevice() ? "ios" : "android", a = "huajiao_" + r + a + "_" + i, monitor) {
					var d = e.target || e,
						c = {
							cId: a,
							c: n || monitor.util.getText(d)
						};
					monitor.log(c, "click")
				} else window.console && console.log("没找到monitor")
			}
			var t = e("../../../common/js/module/huajiaoUtils");
			$(".js_hj_download, .js_dot_btn").on("click", i)
		}()
	}, {
		"../../../common/js/module/huajiaoUtils": 3
	}],
	10: [function(e, i, t) {
		i.exports = function() {
			function i(e) {
				var i, a = l("qd"),
					s = _DATA.page;
				d = u[a] || 6e4, r = e, "h5_live" == s ? (t(), w.init({
					bindCallback: function() {
						c = !1, m = !1
					}
				}), i = setTimeout(function() {
					$(".js_line_slow").show(), i = null
				}, 1e4), o(0)) : "h5_replay" == s ? (t(), w.init({
					bindCallback: function() {
						c = !1, m = !1
					}
				})) : "h5_ligature" == s && t(), n()
			}

			function t() {
				var e, i = _DATA.page,
					t = f[i],
					o = "";
				for (e = 0; e < t.length; e++) o += p[t[e]];
				$(".js_video_wrap").append(o)
			}

			function o(e) {
				timer2 = setTimeout(function() {
					$(".js_give_gift").hide(), $(".js_red_paper").show(), a(40), timer2 = null
				}, e)
			}

			function a(e) {
				return $(".js_time").html(e), e--, 0 === e ? ($(".js_red_paper").hide(), $(".js_time").html(40), o(3e4), $(".js_give_gift").show(), !1) : (setTimeout(function() {
					a(e)
				}, 1e3), e)
			}

			function n() {
				return $("body").on("click", ".js_hj_download", function() {
					var e = $("#downloadPopup");
					return s.isWeibo() && s.isIosDevice() || !e.is(":hidden") ? !1 : (m = !0, void $("#js_downed_tip").show())
				}), $("body").on("click", ".js_kown", function() {
					m = !1, c = !1, $("#js_downed_tip").hide(0)
				}), null == r ? !1 : (r.on("timeupdate", function() {
					if (!m && -1 !== d) {
						var e = (new Date).getTime();
						c ? e - c >= d && (m = !0, w.show()) : c = e
					}
				}), void $(".js_ignore").on("click", function() {
					$(".js_line_slow").hide()
				}))
			}
			var r, d, c, s = e("../../../common/js/module/huajiaoUtils"),
				l = s.getParamFormUrl,
				u = {
					liulanqi5: 12e4,
					huajiao_wifi: -1,
					wf: -1
				},
				p = e("./tipTpl"),
				h = window._DATA.feed,
				f = {
					h5_live: ["gift", "chatpop", "lineslow", "livepause"],
					h5_replay: ["replaybar", "lineslow"],
					h5_ligature: ["zjkpop", "ligatruebar"]
				},
				w = function() {
					function e(e) {
						o(n), i()
					}

					function i() {
						var e = {};
						if (d) throw "download_dialog has been init";
						1 == r ? e.id = "h5_live" : 2 == r && (e.id = "h5_replay");
						var i = document.createElement("div");
						i.className = "popup-dialog", i.id = "downloadPopup", a = t(a, e), i.innerHTML = a, d = i, document.body.appendChild(i)
					}

					function t(e, i) {
						var t, o = "";
						for (var a in i) o = "{{" + a + "}}", t = new RegExp(o, "gm"), e = e.replace(t, i[a]);
						return e
					}

					function o(e) {
						var i = document.getElementsByTagName("head")[0],
							t = document.createElement("style");
						t.type = "text/css", t.styleSheet ? t.styleSheet.cssText = n : t.appendChild(document.createTextNode(n)), i.appendChild(t)
					}
					var a = '<div class="popup-wrap"><div class="popup"><a data-open="true" data-key="浮层" data-dot-mark="h5_down" data-download-id="{{id}}" class="popup-down js_hj_download"><span class="popup-btn">立即打开</span></a></div></div>',
						n = ".popup-dialog{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.6);z-index:1002;display:none;}.popup-down{width:100%;height:100%;display:block;position:absolute;left:0;top:0;}.popup-wrap{height:100%;display:-webkit-box;-webkit-box-align:center;-webkit-box-pack:center}.popup{width:250px;height:320px;position:relative;background:#ff4487 url(http://p9.qhimg.com/d/inn/2064fff6/share_pop.png) no-repeat;background-size:100% auto;-webkit-background-size:100% auto;border-radius:10px;-webkit-border-radius:10px}.popup-btn{position:absolute;bottom:20px;left:15px;display:block;margin:0 auto;width:220px;height:40px;border-radius:6px;-webkit-border-radius:6px;background:#000;line-height:40px;color:white;text-align:center;font-size:16px;}",
						r = h.type,
						d = null,
						c = function() {
							if (!d) throw "use init to initDialog first";
							d.style.display = "block"
						};
					return {
						init: e,
						show: c
					}
				}(),
				m = !1;
			return {
				init: i
			}
		}()
	}, {
		"../../../common/js/module/huajiaoUtils": 3,
		"./tipTpl": 14
	}],
	11: [function(e, i, t) {
		i.exports = function() {
			function i(e) {
				var i = _DATA && _DATA.page || $(this).attr("data-download-id"),
					r = $(this).data("open"),
					d = t().os,
					s = o(i, d, e),
					l = s.url,
					u = s.hjUrl,
					p = (c.isWeixin(), c.isWeibo());
				return p && "ios" === d ? (n(d), !1) : !c.isUpIos9() || "h5_live" !== i && "h5_replay" !== i || 1 != r ? void a(l, i, u, r) : !0
			}

			function t() {
				var e;
				return c.isMobileDevice() ? (e = "mb", c.isIosDevice() ? os = "ios" : os = "android") : e = "pc", {
					device: e,
					os: os
				}
			}

			function o(e, i, t) {
				var o, a, n = "http://www.huajiao.com/dl.php",
					r = "http://huajiao.dl.keniub.com/app/android/apk/",
					d = "_release.apk",
					s = "http://huajiao.dl.keniub.com/app/android/apk/huajiao_fenxiang_release.apk",
					l = "http://qd.huajiao.com/index.php?id=Tq25M691",
					u = "ios" == i ? l : s,
					p = "ios" === i ? "huajiao://huajiao.com/goto/index" : "huajiao://web.huajiao",
					h = {
						wx: "https://lnk0.com/UxhMtg",
						circle: "https://lnk0.com/dwBtg8",
						qq: "https://lnk0.com/QdcQx9",
						qzone: "https://lnk0.com/xt8QFt",
						weibo: "https://lnk0.com/oc4kEp",
						minguo: "https://lnk0.com/1okQJt",
						erweima: "https://lnk0.com/IxZRx1",
						shichangerweima: "https://lnk0.com/AhkANp"
					},
					f = {
						erweima: "http://a.app.qq.com/o/simple.jsp?pkgname=com.huajiao&ckey=CK1338997682053",
						shichangerweima: "http://a.app.qq.com/o/simple.jsp?pkgname=com.huajiao&ckey=CK1338997886640",
						circle: "http://a.app.qq.com/o/simple.jsp?pkgname=com.huajiao&ckey=CK1335381160427",
						wx: "http://a.app.qq.com/o/simple.jsp?pkgname=com.huajiao&ckey=CK1335380772497",
						minguo: "http://a.app.qq.com/o/simple.jsp?pkgname=com.huajiao&ckey=CK1338484786652"
					},
					w = c.getParamFormUrl("qd"),
					m = c.getParamFormUrl("reference");
				switch (w = "" !== c.getParamFormUrl("qd") ? w : m, "weixin" == w && (w = "wx"), e) {
					case "h5_live":
						p = _DATA.author.uid && _DATA.feed.feed.relateid && "" !== _DATA.feed.feed.relateid && "" !== _DATA.author.uid ? c.isUpIos9() ? "http://share.huajiao.com/download/live?liveid=" + _DATA.feed.feed.relateid + "&userid=" + _DATA.author.uid + "&qd=" + w : "huajiao://huajiao.com/goto/live?liveid=" + _DATA.feed.feed.relateid + "&userid=" + _DATA.author.uid : "ios" === i ? "huajiao://huajiao.com/goto/index" : "huajiao://web.huajiao";
						break;
					case "h5_replay":
						a = "ios" === i ? "huajiao://asdf/newreplay?replayid=" : "huajiao://huajiao.com/goto/replay?replayid=", p = _DATA.author.uid && _DATA.feed.feed.relateid && "" !== _DATA.feed.feed.relateid && "" !== _DATA.author.uid ? c.isUpIos9() ? "http://share.huajiao.com/download/replay?replayid=" + _DATA.feed.feed.relateid : a + _DATA.feed.feed.relateid + "&userid=" + _DATA.author.uid : "ios" === i ? "huajiao://huajiao.com/goto/index" : "huajiao://web.huajiao";
						break;
					case "h5_finish":
						if (!_DATA.author) {
							c.isUpIos9();
							break
						}
						p = c.isUpIos9() ? "http://share.huajiao.com/download/profile?userid=" : "huajiao://huajiao.com/goto/profile?userid=", p += _DATA.author.uid;
						break;
					case "h5_ligature":
						if (!_DATA.author) break;
						if ("ios" == i) {
							if (c.isUpIos9()) {
								p = "http://share.huajiao.com/download";
								break
							}
							p = "huajiao://huajiao.com/goto/index"
						} else p = "huajiao://web.huajiao";
						break;
					default:
						u && "" !== u || (u = n)
				}
				return "" !== w && "ios" === i && (u = h[w]), c.isWeixin() && "ios" === i && (u = n), "" !== w && "android" === i ? c.isWeixin() && f[w] ? (o = encodeURI(p), u = "h5_live" === e || "h5_replay" === e || "h5_finish" === e ? f[w] + "&android_schema=" + o : f[w]) : u = c.isWeixin() && !f[w] ? n : r + w + d : "" == w && "android" === i && (u = n), {
					url: u || n,
					hjUrl: p || ""
				}
			}

			function a(e, i, t, o) {
				var a, n, r = (c.isIosDevice() ? "ios" : "android", c.isIOS9() ? 2e3 : 1e3),
					d = c.getParamFormUrl("qd"),
					s = {
						AppleTest: 1,
						wf: 1,
						huajiao_liulanqi: 1,
						huajiao_wifi: 1
					};
				if (e) {
					if (c.is360view() && c.isAndroidDevice()) {
						try {
							MobileSafeJsInterface.openUrl('{url: "' + e + '", type=2}')
						} catch (l) {}
						return !1
					}
					if (c.isSafe()) return e = "http://msoftdl.360.cn/mobilesafe/shouji360/360safe/neibu/ws_xxl_release.apk", window.location.href = e, !1;
					if ("h5_live" !== i && "h5_replay" !== i && "h5_ligature" != i && "h5_finish" !== i || s[d]) return window.location.href = e, !1;
					if (("h5_live" !== i || "h5_replay" !== i) && c.isIosDevice() && 1 != o) return window.location.href = e, !1;
					n = new Date, a = setTimeout(function() {
						var i = new Date;
						r + 500 > i - n ? window.location.href = e : window.close()
					}, r), $(window).on("visibilitychange webkitvisibilitychange pagehide", function() {
						clearTimeout(a)
					}, !1), window.location.href = t
				}
			}

			function n(e) {
				var i;
				c.isWeixin() ? i = "http://static.huajiao.com/huajiao/web/static/images/popbox-ios.jpg" : c.isWeibo() && (i = "http://static.huajiao.com/huajiao/web/static/images/popbox-wb.png");
				var t = $(".js_openPopbox"),
					o = '<div class="openPopbox js_openPopbox" style="position: fixed;width: 100%;height: 100%;left: 0;top: 0;background: rgba(0, 0, 0, 0.4) url(' + i + ') no-repeat 0 0;-webkit-background-size: 100% auto;background-size: 100% auto;z-index: 1010;display: none;"></div>';
				0 == t.length && ($("body").append(o), t = $(".js_openPopbox")), t.unbind().click(function() {
					t.hide(300)
				}), t.show(300)
			}

			function r() {
				var e = $("<script>");
				e.attr("src", "http://s4.qhimg.com/static/fadd33004f7a80af.js"), $("body").append(e)
			}

			function d() {
				var e, a = _DATA && _DATA.page || $(".js_hj_download").attr("data-download-id"),
					n = c.getParamFormUrl("qd"),
					d = c.getParamFormUrl("reference"),
					s = {
						wf: 1,
						liulanqi1: 1,
						liulanqi2: 1,
						huajiao_llqzbpd: 1,
						liulanqi5: 1,
						sjws_qita: 1,
						ws_gntj: 1,
						ws_grh5: 1,
						huajiao_zb: 1,
						ws_xxl: 1,
						AppleTest: 1,
						ws_xxlqz: 1,
						huajiao_liulanqi: 1
					};
				return n = "" !== n ? n : d, c.isSz() ? (r(), !1) : (!c.isUpIos9() || "h5_live" != a && "h5_replay" != a && "h5_finish" != a && "h5_ligature" != a || c.isWeibo() || $(".js_hj_download").each(function() {
					var e = $(this),
						i = e.data("open"),
						a = _DATA && _DATA.page || e.attr("data-download-id"),
						n = t().os,
						r = o(a, n);
					return 1 != i ? !1 : "" == _DATA.author && "h5_finish" == a && (c.isWeixin() || c.isQQ()) ? !1 : void e.attr("href", r.hjUrl)
				}), $("body").on("click", ".js_hj_download", i), void("h5_live" === a && c.isMobileDevice() && !s[n] && (e = "huajiao://huajiao.com/goto/live?liveid=" + _DATA.feed.feed.relateid + "&userid=" + _DATA.author.uid, window.location.href = e)))
			}
			var c = e("../../../common/js/module/huajiaoUtils");
			return {
				init: d
			}
		}()
	}, {
		"../../../common/js/module/huajiaoUtils": 3
	}],
	12: [function(e, i, t) {
		i.exports = function() {
			function i() {
				$(window).on("scroll", function() {
					a(6)
				}), setTimeout(function() {
					a(6)
				}, 10), $(".js_other_hot").on("click", function(e) {
					var i = $(".js_playerArea").height() + $(".userinfo").height();
					return document.body.scrollTop = i, !1
				})
			}

			function t() {
				var e, i = {
					offset: 0,
					num: 6,
					format: "hot"
				};
				"h5_ligature" == _DATA.page ? (e = c.HOT_LIGATURE, i.uid = _DATA.author.uid) : e = c.HOT_URL, $.ajax({
					url: e,
					data: i,
					type: "GET",
					dataType: "jsonp",
					jsonp: "callback",
					cache: !1,
					success: function(e) {
						return "0000" != e.code ? (console.log("接口错误！"), !1) : void o(e.data)
					}
				})
			}

			function o(e) {
				var t, o, a = "";
				for ("h5_ligature" == _DATA.page && (e.feeds = e, l = u), l = l.join(""), t = 0, o = e.feeds.length; o > t; t++) "h5_ligature" == _DATA.page && (e.feeds[t].watches = e.feeds[t].clickCount, e.feeds[t].image = e.feeds[t].feed.image, e.feeds[t].liveid = e.feeds[t].id, e.feeds[t].name = e.feeds[t].author.verifiedinfo.realname, e.feeds[t].uid = e.feeds[t].author.uid, e.feeds[t].staruid = e.feeds[t].staruid), a += r.formatTpl(l, e.feeds[t]);
				return e.feed && !e.feed.length ? ($(".js_loading").html("暂无数据！"), !1) : e.length || "h5_ligature" != _DATA.page ? ($(".js_loading").hide(), $(".js_hot_lists").html(a), void i()) : ($(".js_loading").html("暂无数据！"), !1)
			}

			function a(e) {
				s = $(".js_recommendArea ul");
				var i, t, o, a = s.find("li img[data-src]"),
					n = a.length;
				if (0 === a.length) return !1;
				e ? (o = isNaN(e) ? 6 : parseInt(e, 10), o = o > n ? n : o) : o = a.length;
				for (var r = 0; o > r; r++) t = a.eq(r), i = t.attr("data-src"), i = i.split(".jpg")[0] + "-200_200.jpg", t.attr("src", i), t.removeAttr("data-src")
			}

			function n(e) {
				return "off" == _DATA.degrade.hot ? ($(".js_recommendArea").hide(), $(".js_bttm").hide(), $(".userinfo").css("margin-bottom", 0), !1) : (t(), void(d = e))
			}
			var r = e("../../../common/js/module/huajiaoUtils"),
				d = null,
				c = {
					HOT_URL: "http://h.huajiao.com/api/getHotFeedinfo",
					HOT_LIGATURE: "/starLianMai/getLianmaiList"
				},
				s = null,
				l = ["<li>", '<a href="/l/index?liveid={{liveid}}">', '<img src="http://static.huajiao.com/huajiao/activity/resource_dev/share/image/bkg-default200-30970cc46a.png" data-src="{{image}}"/>', '<div class="nickname_num">', "<code>{{watches}}人</code>", "<span>{{name}}</span>", "</div>", "</a>", "</li>"],
				u = ["<li>", '<a href="/l/ligature?fid={{liveid}}&uid={{uid}}&staruid={{staruid}}">', '<img src="http://static.huajiao.com/huajiao/activity/resource_dev/share/image/bkg-default200-30970cc46a.png" data-src="{{image}}"/>', '<div class="nickname_num">', "<code>{{watches}}次</code>", "<span>{{name}}</span>", "</div>", "</a>", "</li>"];
			return {
				init: n
			}
		}()
	}, {
		"../../../common/js/module/huajiaoUtils": 3
	}],
	13: [function(e, i, t) {
		i.exports = function() {
			function i(e) {
				e && (f.type = e.type || "custom", f.id = e.id, f.funcs = e.funcs || {}, "live" === f.type ? t() : "replay" === f.type ? o() : a(e))
			}

			function t() {
				var e = f.defaultDocumet.title,
					i = f.defaultDocumet.content,
					t = _DATA.author;
				return "off" == _DATA.degrade.share ? (t && (f.defaultDocumet.title = e.replace(/\{nickname\}/g, t.verifiedinfo.realname), f.defaultDocumet.content = i.replace(/\{nickname\}/g, t.verifiedinfo.realname), f.defaultDocumet.image = t.avatar, s("weibo", f.defaultDocumet), s("weixin", f.defaultDocumet), s("circle", f.defaultDocumet), s("qq", f.defaultDocumet), s("qqzone", f.defaultDocumet)), r(), !1) : void n(f.id, "live")
			}

			function o() {
				var e = f.defaultDocumet.title,
					i = f.defaultDocumet.content,
					t = _DATA.author;
				return "off" == _DATA.degrade.share ? (t && (f.defaultDocumet.title = e.replace(/\{nickname\}/g, t.verifiedinfo.realname), f.defaultDocumet.content = i.replace(/\{nickname\}/g, t.verifiedinfo.realname), f.defaultDocumet.image = t.avatar, s("weibo", f.defaultDocumet), s("weixin", f.defaultDocumet), s("circle", f.defaultDocumet), s("qq", f.defaultDocumet), s("qqzone", f.defaultDocumet)), r(), !1) : void n(f.id, "replay")
			}

			function a(e) {
				e.documents && (f.documents.title = e.documents.title, f.documents.pic = e.documents.pic, f.documents.link = e.documents.link), e.weibo ? (f.weibo.title = e.weibo.title, f.weibo.site = e.weibo.site, f.weibo.pic = e.weibo.pic, f.weibo.link = e.weibo.link) : (f.weibo.title = e.documents.title, f.weibo.pic = e.documents.pic, f.weibo.link = e.documents.link), e.weixin ? (f.weixin.title = e.weixin.title, f.weixin.desc = e.weixin.desc, f.weixin.pic = e.weixin.pic, f.weixin.link = e.weixin.link) : (f.weixin.title = e.documents.title, f.weixin.desc = e.documents.title, f.weixin.pic = e.documents.pic, f.weixin.link = e.documents.link), e.circle ? (f.circle.title = e.circle.title, f.circle.pic = e.circle.pic, f.circle.link = e.circle.link) : (f.circle.title = e.documents.title, f.circle.pic = e.documents.pic, f.circle.link = e.documents.link), e.qq ? (f.qq.title = e.qq.title, f.qq.desc = e.qq.desc, f.qq.pic = e.qq.pic, f.qq.link = e.qq.link) : (f.qq.title = e.documents.title, f.qq.pic = e.documents.pic, f.qq.link = e.documents.link), e.qqzone ? (f.qqzone.title = e.qqzone.title, f.qqzone.desc = e.qqzone.desc, f.qqzone.pic = e.qqzone.pic, f.qqzone.link = e.qqzone.link) : (f.qqzone.title = e.documents.title, f.qqzone.pic = e.documents.pic, f.qqzone.link = e.documents.link)
			}

			function n(e, i) {
				var t = {
						type: "get",
						data: {
							relateid: e,
							type: i
						},
						url: "/api/getShareInfo",
						dataType: "jsonp"
					},
					o = {
						weibo: "weibo",
						weixin: "wx",
						circle: "circle",
						qq: "qq",
						qqzone: "qzone"
					},
					a = function(e) {
						var i, t, a = e.data,
							n = f.defaultDocumet.title,
							d = f.defaultDocumet.content,
							c = _DATA.author;
						if ("0000" != e.code) return console.log("分享接口fail"), !1;
						if (c)
							for (i in o) t = o[i], "0000" == a.weibo.e ? s(i, a[t].r) : (f.defaultDocumet.title = n.replace(/\{nickname\}/g, c.verifiedinfo.realname), f.defaultDocumet.content = d.replace(/\{nickname\}/g, c.verifiedinfo.realname), f.defaultDocumet.image = c.avatar, s(i, f.defaultDocumet));
						return u.isHuajiao() ? ($(".js_share").on("click", function() {
							p.appShare({
								relateId: "hj_star_profile",
								title: a.weibo.r.title,
								content: a.weibo.r.content,
								img: a.weibo.r.image,
								url: window.location.href
							})
						}), !1) : void r()
					},
					n = function(e) {
						window.console && console.log("获取分享文案失败")
					};
				$.ajax(t).done(a).fail(n)
			}

			function r() {
				var e = "/wx/getConfig",
					i = {},
					t = function(e) {
						var i = e.data.config;
						h.appId = i.appId, h.timestamp = i.timestamp, h.nonceStr = i.nonceStr, h.signature = i.signature, d(h)
					},
					o = function() {
						window.console && console.log("获取微信分享配置信息失败")
					};
				window.wx ? c(e, i, t, o) : window.console && console.log("没有检测到微信js-sdk")
			}

			function d(e) {
				window.wx.config(e), window.wx.ready(function() {
					window.wx.checkJsApi({
						jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone"],
						success: function(e) {}
					}), window.wx.onMenuShareTimeline({
						title: f.circle.title,
						link: f.circle.link,
						imgUrl: f.circle.pic
					}), window.wx.onMenuShareAppMessage({
						title: f.weixin.title || document.title || "花椒直播",
						desc: f.weixin.content,
						link: f.weixin.link,
						imgUrl: f.weixin.pic
					}), window.wx.onMenuShareQQ({
						title: f.qq.title,
						desc: f.qq.desc,
						link: f.qq.link,
						imgUrl: f.qq.pic
					}), window.wx.onMenuShareWeibo({
						title: f.weibo.title,
						desc: f.weibo.title,
						link: f.weibo.link,
						imgUrl: f.weibo.pic
					}), window.wx.onMenuShareQZone({
						title: f.qqzone.title,
						desc: f.qqzone.desc,
						link: f.qqzone.link,
						imgUrl: f.qqzone.pic
					})
				})
			}

			function c(e, i, t, o) {
				$.ajax({
					url: e,
					data: i,
					dataType: "jsonp"
				}).done(function(e) {
					e && "0000" == e.code && t(e)
				}).fail(function(e) {
					o(e)
				})
			}

			function s(e, i) {
				return i ? (f[e].title = i.title, f[e].content = i.content, f[e].pic = i.image, void(f[e].link = i.url)) : !1
			}
			var l = {},
				u = e("../../../common/js/module/huajiaoUtils"),
				p = e("../../../common/js/module/huajiaoShare"),
				h = {
					debug: !1,
					appId: "",
					timestamp: 0,
					nonceStr: "",
					signature: "",
					jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"]
				},
				f = {
					type: "custom",
					id: 0,
					defaultDocumet: {
						title: "「{nickname}」的直播邀请",
						content: "【9.14花椒之夜】范爷、张继科携众星带你嗨！「{nickname}」在花椒直播@了你，快去看看吧！",
						pic: "http://static.huajiao.com/huajiao/web/static/images/default/logo_128_w_rod.png",
						image: "http://static.huajiao.com/huajiao/web/static/images/default/logo_128_w_rod.png",
						link: window.location.href
					},
					documents: {
						title: "花椒直播邀您一起看世界！",
						pic: "http://static.huajiao.com/huajiao/web/static/images/default/logo_128_w_rod.png",
						link: window.location.href
					},
					weibo: {
						title: "花椒直播邀您一起看世界！",
						site: "花椒直播",
						content: "花椒直播邀您一起看世界！",
						pic: "http://static.huajiao.com/huajiao/web/static/images/default/logo_128_w_rod.png",
						link: window.location.href
					},
					weixin: {
						title: "花椒直播邀您一起看世界！",
						desc: "花椒直播邀您一起看世界！",
						content: "花椒直播邀您一起看世界！",
						pic: "http://static.huajiao.com/huajiao/web/static/images/default/logo_128_w_rod.png",
						link: window.location.href
					},
					circle: {
						title: "花椒直播邀您一起看世界！",
						content: "花椒直播邀您一起看世界！",
						pic: "http://static.huajiao.com/huajiao/web/static/images/default/logo_128_w_rod.png",
						link: window.location.href
					},
					qq: {
						title: "花椒直播邀您一起看世界！",
						desc: "花椒直播邀您一起看世界！",
						site: "花椒直播",
						content: "花椒直播邀您一起看世界！",
						pic: "http://static.huajiao.com/huajiao/web/static/images/default/logo_128_w_rod.png",
						link: window.location.href
					},
					qqzone: {
						title: "花椒直播邀您一起看世界！",
						desc: "花椒直播邀您一起看世界！",
						site: "花椒直播",
						content: "花椒直播邀您一起看世界！",
						pic: "http://static.huajiao.com/huajiao/web/static/images/default/logo_128_w_rod.png",
						link: window.location.href
					},
					funcs: {
						weibo: null,
						weixin: null,
						circle: null,
						qq: null,
						qqzone: null
					}
				};
			return l.init = function(e) {
				return "off" == _DATA.degrade.wxconfig ? !1 : void i(e)
			}, l
		}()
	}, {
		"../../../common/js/module/huajiaoShare": 2,
		"../../../common/js/module/huajiaoUtils": 3
	}],
	14: [function(e, i, t) {
		i.exports = function() {
			var e = {
				livepause: '<div class="author-leave js_author_leave" style="display: none;"><span class="author-leave-img"></span><span>主播暂时离开，请稍后！</span></div>',
				lineslow: '<div class="line-slow js_line_slow"><a data-sid="2981222" data-dot-mark="7" data-pname="com.huajiao" data-size="22064161" class="app-item js_download js_hj_download now-open js_now_open" data-download-id="h5_live_open" data-open="true" data-key="立即打开">立即打开</a><span class="ignore js_ignore js_dot_btn" data-key="忽略"" data-dot-mark="8">忽略</span><span class="line-tip">发现您的网速较慢，用花椒观看更流畅</span></div>',
				chatpop: '<div class="tool-bar"><a data-sid="2981222" data-pname="com.huajiao" data-size="22064161" class="app-item js_download js_hj_download" data-key="免费礼物"" data-dot-mark="6" data-download-id="h5_live_open" data-open="true"><div class="give-gift js_give_gift"><span class="gift-icon"></span></div></a><a href="javascript:;" data-sid="2981222" data-pname="com.huajiao" data-size="22064161" data-key="用花椒打开" data-dot-mark="13" data-download-id="h5_live" data-open="true" class="js_hj_download"><div class="tool-bar-left"></div><div class="tool-bar-open"><i class="hj-logo"></i><span>用花椒打开</span></div></a></div>',
				gift: '<a data-download-id="h5_live" data-dot-mark="5" data-sid="2981222" data-open="true" data-pname="com.huajiao" data-key="红包"" data-size="22064161" class="js_hj_download red-paper js_red_paper app-item"><b class="paper-sm"></b><span>(<em class="js_time">30</em>s)</span></a>',
				replaybar: '<div class="tool-bar"><a href="javascript:;" data-sid="2981222" data-pname="com.huajiao" data-size="22064161" data-key="用花椒打开" data-dot-mark="13" data-download-id="h5_live" data-open="true" class="js_hj_download"><div class="tool-bar-open"><i class="hj-logo"></i><span>打开花椒App 互动更精彩</span></div></a></div>',
				ligatruebar: '<div class="tool-bar"><a href="javascript:;" data-sid="2981222" data-pname="com.huajiao" data-size="22064161" data-key="用花椒打开" data-dot-mark="13" data-download-id="h5_live" data-open="true" class="js_hj_download"><div class="tool-bar-open"><i class="hj-logo"></i><span>打开花椒app 与大咖连线</span></div></a></div>',
				zjkpop: '<div class="zjk-ligature-wrap js_zjk_wrap"><div class="zjk-ligature"><div class="zjk-avatar-wrap"><div class="zjk-avatar cirecle"></div><img class="zjk-img" src="http://static.huajiao.com/huajiao/activity/resource_dev/share/image/zjk_f-443c510faa.png"></div><p>张继科申请与你连线</p><span class="zjk-down-time js_time">12</span><div class="zjk-btn"><a href="javascript:;" class="js_cancel">取消</a><a href="javascript:;" class="js_hj_download" data-key="连线" data-open="true" data-sid="2981222" data-pname="com.huajiao" data-size="22064161" data-dot-mark="3">连线</a></div></div><div class="zjk-mask"></div></div>',
				starline: '<div class="ligature-finish js_finish"><div class="finish-poster js_finish_poster"><img></div><div class="ligature-finish-mask"></div><div class="play-btn js_play_btn"></div><div class="star-ligature-btm"><a href="javascript:;" class="js_hj_download" data-key="大咖连线" data-open="true"><div class="star-ligature"><ul class="clearfix"><li><img src="http://static.huajiao.com/huajiao/activity/resource_dev/share/image/zjk_f-443c510faa.png"><span>张继科</span></li><li><img src="http://static.huajiao.com/huajiao/activity/resource_dev/share/image/hcy_f-c4535f088d.png"><span>华晨宇</span></li><li><img src="http://static.huajiao.com/huajiao/activity/resource_dev/share/image/fbb_f-8d3056ecca.png"><span>范冰冰</span></li></ul></div></a><a data-key="与更多大咖连线" data-open="true" href="javascript:;" class="star-ligature-btn js_hj_download">与更多大咖连线</a></div></div>'
			};
			return e
		}()
	}, {}]
}, {}, [6]);