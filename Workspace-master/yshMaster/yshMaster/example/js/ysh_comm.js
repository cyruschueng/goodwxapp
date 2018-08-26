/**
 * Created by Administrator on 2016/4/5.
 */

var tplurl = "http://p.yshfresh.com/api/tpl/";
var yshurl = "http://api3.yshfresh.com/api/ysh/";
//var yshurl = "http://10.2.15.51:6002/api/ysh/";
var seturl = "http://x2.yshfresh.com"
var datas = {};
//var  f2c={};//数据字典
datas.cache = {}; //初始化
datas.cache.tpls = {};
datas.cache.ds = {};
datas.cache.cmds = {};

datas.usecache = false;

function postform(v) {
	var indatas = {};

	v.find("textarea").each(function() {
		console.log(this.name);
		indatas[this.name] = this.value;
	});

	getDataList(yshurl + "/api/ysh/" + v.attr("api"), indatas, function(rt) {
		console.log(rt);
	});
	console.log(indatas);
}

function loadmain1(params) {
	//showYshLoding();
	//检查缓存
	if ('object' != typeof params) {
		alert("params error");
		return;
	}

	datas.params = params;

	var maindata = {
		page: 0,
		pnum: 10
	};
	var tpl = datas.cache.tpls[params.action];
	var d = datas.cache.ds[params.action];

	//	$('#top').html(params.title);
	if (tpl != null && d != null) {
		renderMain(tpl, d);
		if (!datas.usecache) {
			delete datas.cache.tpls[params.action];
			delete datas.cache.ds[params.action];
		}
		return;
	}
	if (!tpl) {
		datas.cache.tpls[params.action] = 0;
		getDataList(tplurl + params.action, params.upd, function(rdata) {

			//		 if(rdata.tpl)
			//通过本地服务访问本地模板文件
			var url = window.location.href;
			//			console.log(url);
			if (url.indexOf("index_local") != -1 || url.indexOf("index_sc_local") != -1) {
				htmlobj = $.ajax({
					url: "http://127.0.0.1:9001/s/" + params.action + ".html",
					async: false
				});
				datas.cache.tpls[params.action] = htmlobj.responseText;
				datas.cache.cmds[params.action] = rdata.cmd;
				loadmain1(params);

			} else if (url.indexOf("index") != -1 || url.indexOf("index_sc") != -1) {
				datas.cache.tpls[params.action] = rdata.tpl;
				datas.cache.cmds[params.action] = rdata.cmd;
				loadmain1(params);
			}
		});
	} else if (!d) {
		datas.cache.ds[params.action] = 0;
		getDataList(yshurl + datas.cache.cmds[params.action], params.upd, function(rdata) {
			if (rdata.aaData) {
				datas.cache.ds[params.action] = rdata;
				datas.rdata = rdata;
				loadmain1(params);
			} else {
				console.error('654737 没有返回数据');
			}
		});
	}

}

function renderMain(tpl, data) {
	$("#tpls").html(tpl);
	tpl = $("#main").html();
	if (tpl) {
		laytpl(tpl).render(data, function(html) {
			if (gFlag) {
				changePage(datas.params);
			} else {
				gFlag = true;
			}
			datas.ready = null;
			$("#main-page").html(html);
			//closeYshLoding();
			if (datas.ready && typeof(datas.ready) == 'function') {
				datas.ready();
			}
			console.log(GetRequest());
		});
	} else {
		alert("没有找到main容器!")
	}

}

$(document).ready(function() {
		init();
	})
	//初始化方法
function init() {
	//	console.log(window.location.href);
	//    getDataList(yshurl+'get_f2c',{},function (d){
	//        for(var k in d.aaData){
	//            f2c[d.aaData[k]['field_name']]=d.aaData[k]['cname'];
	//        }
	////          console.log(f2c);
	////          console.log(f2c);
	//    });

	var homePageAction = "homepage"; //首页
	var page = (window.location.hash).replace("#", "").split('?')[0];
	//			如果只输入index.html不加#后缀的话，让其默认加载首页
	if (!page) {
		page = homePageAction;
	}
	var p = GetRequest();
	loadmain1({
		action: page,
		upd: p
	});
}

var gFlag = true;
/**
 * 页面ajax跳转，并塞入history对象 此方法绑定在标签上
 * @param action 跳转路径
 */
var changePage = function(params) {
	//      loadmain1({action:action,upd:{}});
	var p = "?";
	for (var i in params.upd) {
		if (p != "?") {
			p += "&";
		}
		p += i + "=" + params.upd[i];
	}
	var strurl = location.href.split("#")[0] + "#" + params.action + (p != "?" ? p : "");

	history.pushState(params, document.title, strurl);
};
/**
 * 兼听历史操作状态（比如前进后退操作）并加载对应的页面
 */
window.addEventListener('popstate', function(e) {
	if (history.state) {
		var state = history.state;
		//console.log("state为"+state.action);
		gFlag = false;
	} else {
		state = getState();
	}
	loadmain1(state);
}, false);

function getState() {
	var page = (window.location.hash).replace("#", "").split('?')[0];
	var p = GetRequest();
	return {
		action: page,
		upd: p
	};
}

// 获取数据方法
var getDataList = function(url, param, fcs, is_check) {
	showYshLoding();
	setTimeout(function() {
		closeYshLoding();
	}, 1500);
	var sesskey = window.localStorage.getItem("sesskey") || null
	if (!sesskey && url.indexOf('getSesskey') == -1) {
		getDataList(yshurl + 'getSesskey', {}, function(rd) {
			if (rd.sesskey) {
				sesskey = rd.sesskey;
				window.localStorage.setItem("sesskey", sesskey);
				getDataList(url, param, fcs, is_check);
			} else {
				ysh_msg('获取sesskey失败');
			}
		});
		return;
	}
	var pa = {};
	for (k in param) {
		pa[k] = param[k];
	}
	pa.sesskey = sesskey;

	$.ajax({
		type: "post",
		url: url,
		async: false,
		data: pa,
		success: function(ret) {
			//closeYshLoding()
			if (typeof a === "function") {
				a(ret);
			}
			if (ret.log != "") {
				//				console.info(ret.log);
			}
			if (ret.state != 0) {
				console.log('错误码：' + ret.state + '\n' + JSON.stringify(ret.msg));
			}

			var str = ret;
			if (Object.prototype.toString.call(str) === "[object String]") {
				try {
					ret = JSON.parse(ret)
				} catch (e) {
					ysh_msg("无法解析服务器返回数据")
					console.log("捕获异常为：  " + e)
				}
			}

			//校验数据
			if (is_check == true) {
				if (ret) {
					switch (ret.state) {
						case 0:
							//正常数据
							if (ret.aaData && ret.aaData instanceof Array) {
								fcs && fcs(ret);
							} else {
								ysh_msg("数据异常")
							}
							break;
						case 1:
							//需要登录
							openWebView()
							break;
						case 2:
							//权限不足
							ysh_msg()
							break;
					}
				} else {
					ysh_msg("服务器无响应，请稍后再试")
				}
			} else {
				fcs && fcs(ret);
			}
		},
		error: function() {
			//closeYshLoding()
			ysh_msg("服务器出错")
		}
	});
};

/**
 * 获取不同的日期
 * @param AddDayCount 目标天数与当天的差
 * @returns {string}
 * @constructor
 */
function GetDateStr(AddDayCount) {
	var dd = new Date();
	dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
	var y = dd.getFullYear();
	var m = dd.getMonth() + 1; //获取当前月份的日期
	var d = dd.getDate();
	return y + "-" + m + "-" + d;
}

function GetRequest() {
	var url = location.href; //获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(url.indexOf("?") + 1);
		strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}

function getQueryString() {
	var url = location.href;
	var reg = new RegExp("(^|&)" + url + "=([^&]*)(&|$)", "i");
	var r = location.search.substr(1).match(reg);
	if (r != null) return unescape(decodeURI(r[2]));
	return null;
}

//---------------------------------公共comm.js---------------------------------------
function ysh_GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return (r[2]);
	}
	return null;
}

// 取得浏览器的userAgent字符串
function myBrowser() {
	var userAgent = navigator.userAgent;
	var isOpera = userAgent.indexOf("Opera") > -1;
	if (isOpera) {
		return "Opera"
	}; // 判断是否Opera浏览器
	if (userAgent.indexOf("Firefox") > -1) {
		return "FF";
	} // 判断是否Firefox浏览器
	if (userAgent.indexOf("Chrome") > -1) {
		return "Chrome";
	}
	if (userAgent.indexOf("Safari") > -1 || userAgent.indexOf("AppleWebKit") > -1) {
		return "Safari";
	}
	// 判断是否Safari浏览器
	if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
		if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
			return "IE6";
		}
		if (navigator.userAgent.indexOf("MSIE 7.0") > 0) {
			return "IE7";
		}
		if (navigator.userAgent.indexOf("MSIE 9.0") > 0 && !window.innerWidth) {
			return "IE8";
		}
		if (navigator.userAgent.indexOf("MSIE 9.0") > 0) {
			return "IE9";
		}
	};
}

/**
 * 判断是否是微信浏览器
 *
 * @returns {boolean}
 */
var is_weixin = function() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		return true;
	} else {
		return false;
	}
}

/*
 * 日期时间格式化 对Date的扩展，将 Date 转化为指定格式的String 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用
 * 1-2 个占位符， 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 例子： (new
 * Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 (new
 * Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.Format = function(fmt) {
		var o = {
			"M+": this.getMonth() + 1, // 月份
			"d+": this.getDate(), // 日
			"h+": this.getHours(), // 小时
			"m+": this.getMinutes(), // 分
			"s+": this.getSeconds(), // 秒
			"q+": Math.floor((this.getMonth() + 3) / 3), // 季度
			"S": this.getMilliseconds()
				// 毫秒
		};
		if (/(y+)/.test(fmt))
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt))
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}
	//动态加载css/js
var dynamicLoading = {
	css: function(path) {
		if (!path || path.length === 0) {
			throw new Error('argument "path" is required !');
		}
		var head = document.getElementsByTagName('head')[0];
		var link = document.createElement('link');
		link.href = path;
		link.rel = 'stylesheet';
		link.type = 'text/css';
		head.appendChild(link);
	},
	js: function(path) {
		if (!path || path.length === 0) {
			throw new Error('argument "path" is required !');
		}
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.src = path;
		script.type = 'text/javascript';
		head.appendChild(script);
	}
}

//显示数据方法
var showData = function(view, tpl, data) {
	if (data.length > 0) {
		var str = "";
		for (var num in data) {
			laytpl(tpl).render(data[num], function(html) {
				str += html;
			});
		}
		view.append(str);
	} else {
		noData(view);
	}
}

/*
 * 判断用户手机浏览器内核 建议使用
 * if(browser.versions.ios||browser.versions.iPhone||browser.versions.iPad){
 *
 * }else if(browser.versions.android){ }
 */
var browser = {
	versions: function() {
		var u = navigator.userAgent,
			app = navigator.appVersion;
		return { // 移动终端浏览器版本信息
			trident: u.indexOf('Trident') > -1, // IE内核
			presto: u.indexOf('Presto') > -1, // opera内核
			webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), // 是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
			iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, // 是否iPad
			webApp: u.indexOf('Safari') == -1
				// 是否web应该程序，没有头部与底部
		};
	}(),
	language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

/*
 * 倒计时的实现 传月份的时候，目标月减1 @param:d:var d = Date.UTC(2030, 6, 27, 16, 34); o:var obj = {
 * sec: document.getElementById("秒id"), mini: document.getElementById("分钟容器id"),
 * hour: document.getElementById("小时容器id"),
 * day:document.getElementById("日期容器id"),
 * month:document.getElementById("月份容器id"), year:
 * document.getElementById("年容器id") }
 */
var fnTimeCountDown = function(d, o) {
	var f = {
		zero: function(n) {
			var n = parseInt(n, 10);
			if (n > 0) {
				if (n <= 9) {
					n = "0" + n;
				}
				return String(n);
			} else {
				return "00";
			}
		},
		dv: function() {
			d = d || Date.UTC(2050, 0, 1); // 如果未定义时间，则我们设定倒计时日期是2050年1月1日
			var future = new Date(d),
				now = new Date();
			// 现在将来秒差值
			var dur = Math.round((future.getTime() - now.getTime()) / 1000) + future.getTimezoneOffset() * 60,
				pms = {
					sec: "00",
					mini: "00",
					hour: "00",
					day: "00",
					month: "00",
					year: "0"
				};
			if (dur > 0) {
				pms.sec = f.zero(dur % 60);
				pms.mini = Math.floor((dur / 60)) > 0 ? f.zero(Math
					.floor((dur / 60)) % 60) : "00";
				pms.hour = Math.floor((dur / 3600)) > 0 ? f.zero(Math
					.floor((dur / 3600)) % 24) : "00";
				pms.day = Math.floor((dur / 86400)) > 0 ? f.zero(Math
					.floor((dur / 86400)) % 30) : "00";
				// 月份，以实际平均每月秒数计算
				pms.month = Math.floor((dur / 2629744)) > 0 ? f.zero(Math
					.floor((dur / 2629744)) % 12) : "00";
				// 年份，按按回归年365天5时48分46秒算
				pms.year = Math.floor((dur / 31556926)) > 0 ? Math
					.floor((dur / 31556926)) : "0";
			}
			return pms;
		},
		ui: function() {
			if (o.sec) {
				o.sec.innerHTML = f.dv().sec;
			}
			if (o.mini) {
				o.mini.innerHTML = f.dv().mini;
			}
			if (o.hour) {
				o.hour.innerHTML = f.dv().hour;
			}
			if (o.day) {
				o.day.innerHTML = f.dv().day;
			}
			if (o.month) {
				o.month.innerHTML = f.dv().month;
			}
			if (o.year) {
				o.year.innerHTML = f.dv().year;
			}
			setTimeout(f.ui, 1000);
		}
	}
	f.ui()
};

/*
 * 手机号码和电话号码合法性
 */
mobileCheck = function(tel) {
	var isPhone = /^1[3|4|5|7|8][0-9]{9}$/;
	var isMob = /^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
	tel = tel.trim();
	if (isPhone.test(tel) || isMob.test(tel)) {
		return true;
	} else {
		return false;
	}
}

// 获取服务端用户信息
userInfo = function(funs) {
	var url = yshurl + "userinfo"
	var user = ""
	var param = {
		cookie: document.cookie
	}
	getDataList(url, param, function(data) {
		if (data) {
			switch (data.state) {
				case 0:
					user = data.aaData;
					localStorage.setItem("userInfo", JSON.stringify(user))
					funs && funs(data)
					break;
				case 1:
					// 需要登录处理 
					if (data.url) {
						window.location.href = seturl + "/" + data.url
					} else {
						ysh_msg("请登录");
					}
					break;
				case 2:
					// 服务器处理跳转 
					if (data.url) {
						window.location.href = seturl + "/" + data.url
					} else {
						ysh_msg("请登录");
					}
					break;
				case 800:
					//未知错误，本不应该出现的错误 
					ysh_msg("发生未知错误");
					// 写入错误日志文档coding.. 
					//save_error(800, data.msg); 
					break;
			}
			return user;
		} else {
			ysh_msg("网络错误，请稍后再试");
			return user;
		}
	})
}

// 获取本地用户信息
getuserInfo = function() {
	var user_temp = localStorage.getItem("userInfo") || null;
	var user = new Object()
	if (user_temp) {
		try {
			var user = JSON.parse(user_temp)
		} catch (e) {
			console.log("用户信息格式有误!")
			user = null
		}
	};
	return user;
}

//倒计时方法
function wait_time(o, wait) {
	if (wait == 0) {
		o.removeAttribute("disabled");
		o.value = "获取";
		wait = 60;
	} else {
		o.setAttribute("disabled", true);
		o.value = "(" + wait + ")";
		wait--;
		timer = setTimeout(function() {
				wait_time(o, wait)
			},
			1000)
	}
}

/**
 * 先根据goods_id,user_id,session_id获取到当前登录用户购物车信息，
 * 如果为空，则增加一条购物车信息，如果不为空，则增加其数量
 * @param goods_id
 */
var addToShoppingCart = function(goods_id) {
	var user = getuserInfo() || null
	var url_addcart = yshurl + "/api/get/add_shop_car";
	var param = {
		goods_id: goods_id,
		cookie: document.cookie
	}

	$.ajax({
		url: url_addcart,
		param: param,
		type: "post",
		success: function(ret) {
			//获取当前用户购物车商品数量
			if (ret) {
				if (ret && ret.state == 0) {
					if (ret.aaData && ret.aaData instanceof Array && ret.aaData.length > 0) {
						toastr.success("成功加入购物车");
					} else {
						toastr.error("加入购物车失败");
					}
				} else {
					toastr.error("数据异常，请联系管理员");
				}
			} else {
				toastr.error("服务器没有响应，请稍后再试");
			}
		},
		error: function() {
			//服务器错误
			toastr.error("服务器出错，请稍后再试");
		}
	})
}

//数据存入本地方法
function setLocal(key, value) {
	localStorage.setItem(key, JSON.stringify(value))
}

//取本地数据方法
function getLocal(key, isJson) {
	var dataTemp = localStorage.getItem(key) || null
	var data = new Object()
	if (!dataTemp) {
		console.log("没有找到key为" + key + "的本地存储信息 ");
	} else {
		if (isJson == true) {
			try {
				data = JSON.parse(dataTemp)
			} catch (e) {
				console.log("Key为" + key + "的本地存储信息格式有误", "错误信息为:" + e)
			}
		}
	}
	return data;
}

//显示等待Loding..的等待菊花圈
function showLoding() {
	var loding = $("#img_wait") || null
	if (typeof(loding.html()) == "undefined") {
		// console.log("没有获取到loding对象")
	} else {
		loding.show()
	}
}
//关闭等待Loding..的等待菊花圈
function closeLoding() {
	var loding = $("#img_wait") || null
	if (typeof(loding.html()) == "undefined") {
		// console.log("没有获取到loding对象")
	} else {
		loding.hide()
	}
}

//返回顶部
function goTop(time) {
	$('html,body').animate({
		scrollTop: 0
	}, time);
}

//源生汇alert
function ysh_alert(msg, flag) {
	var icon = null
	switch (flag) {
		case "error":
			icon = 5
			break;
		case "success":
			icon = 6
			break;
		case "warning":
			icon = 8
			break;
	}
	layer.alert(msg, {
		icon: icon,
		skin: 'layui-layer-molv',
		closeBtn: 0,
	});
}

//源生汇Msg
function ysh_msg(msg) {
	var msg = msg || '玩命提示中'
	layer.msg(msg, {
		time: 2000
	});
}

//源生汇confirm
function ysh_confirm(msg, yesButton, cancelButton, callBack) {
	msg = msg || "请选择"
	yesButton = yesButton || "好"
	cancelButton = cancelButton || "不"
	layer.msg(msg, {
		time: 20000, //20s后自动关闭
		btn: [yesButton, cancelButton],
		yes: function(index) {
			callBack && callBack(true)
			layer.close(index)
		},
		cancel: function(index) {
			callBack && callBack(false)
			layer.close(index)
		}
	});
}

//打开新版loding
function showYshLoding() {
	$("#bg").show(0);
	$("#loding").show(0);
}

//手动关闭Ysh的Loding
var closeYshLoding = function() {
	$("#bg").hide(0);
	$("#loding").hide(0)
}

/*
 * 这是有设定过期时间的Cookie
 * s20是代表20秒
 * h是指小时，如12小时则是：h12
 * d是天数，30天则：d30
 */
function setTimeCookie(name, value, time) {
	var strsec = getsec(time);
	var exp = new Date();
	exp.setTime(exp.getTime() + strsec * 1);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

//转换时间
function getsec(str) {
	var str1 = str.substring(1, str.length) * 1;
	var str2 = str.substring(0, 1);
	if (str2 == "s") {
		return str1 * 1000;
	} else if (str2 == "h") {
		return str1 * 60 * 60 * 1000;
	} else if (str2 == "d") {
		return str1 * 24 * 60 * 60 * 1000;
	}
}
//无数据
noData = function(view, error, url) {
	if (!error)
		error = "去逛街吧~~~"
	if (!url)
		url = ""
	var childList = view.childNodes;
	var str = "<div class='container qc_padding '><div class='row '><div class='col - xs - 12 '><p class='sc_xylg '><img src='img/sy_logo.png'></p><p class='sc_xygggj '><span class='sc_xydn '>小源带你</span><a class='sc_qggb ' onclick=loadmain1({action:'" + url + "'})><span>" + error + "</span></a><span class='sc_golj ' onclick=loadmain1({action:'" + url + "'})>GO~</span></p></div></div></div>"
		// 清空容器
	for (var num in childList) {
		view.removeChild(childList[num]);
	}
	// 将空白信息填入容器
	view.append(str)
}

//在子页面中打开新的页面
function openWebView(pagename) {
	var tpl = ""
	var url = ""
	var param = {

	}

	layer.open({
		type: 1, //page层
		area: ['85%', '55%'],
		title: "<img src='images/alert.png' onclick='log()' />",
		shade: 0.6, //遮罩透明度
		moveType: 1, //拖拽风格，0是默认，1是传统拖动
		shift: 2, //0-6的动画形式，-1不开启
		content: ""
	})

	//是否为空窗口
	if (!pagename) {
		tpl = "没有收到模板数据"
		$(".layui-layer-content").each(function() {
			$(this).html(tpl)
		})
	} else {
		//先检查本地缓存是否有该模板，如果有则用本地模板，如果没有则请求服务器获取模板
		var childView = window.localStorage.getItem("childView") || new Array()
		if (!childView) {
			getDataList(url, param, function(ret) {
				tpl = ret.aaData()
				$(".layui-layer-content").each(function() {
					$(this).html(tpl)
				})
				var temp = new Object()
				temp.childViewName = pagename
				temp.childViewTpl = tpl
				childView.join("&*")
				setLocal("childView", childView)
			}, true)
		} else {
			childView = childView.substr(1, childView.length - 2)
			var childViewCount = 0
			if (4 > childView.length > 0) {
				try {
					childView = childView.split("&*")
				} catch (e) {
					childView = new Array
				}
				for (var num in childView) {
					if (childView[num].childViewName == pagename)
						count++
				}
			} else {
				childView = []
				window.localStorage.remove("childView")
			}

			for (var num in childView) {
				if (eval('(' + childView[num].replace(/\\/g, "") + ')').childViewName == pagename) {
					childViewCount = 1
					tpl = eval('(' + childView[num].replace(/\\/g, "") + ')').childViewTpl
					$(".layui-layer-content").each(function() {
						$(this).html(tpl)
					})
					break
				}
			}

			if (childViewCount != 1) {
				getDataList(url, param, function(ret) {
					tpl = ret.aaData()
					$(".layui-layer-content").each(function() {
						$(this).html(tpl)
					})
					var temp = new Object()
					temp.childViewName = pagename
					temp.childViewTpl = tpl
					childView.push(JSON.stringify(temp))
					childView.join("&*")
					setLocal("childView", childView)
				}, true)
			}
		}
	}
}

//窗口执行完操作
function viewFinsh(callback) {
	$(".layui-layer-shade").each(function() {
		$(this).remove()
		$(".layui-layer-page").each(function() {
			$(this).remove()
			callback && callback()
		})
	})
}

//模拟Map对象
function Map() {
	var struct = function(key, value) {
		this.key = key;
		this.value = value;
	}

	var put = function(key, value) {
		for (var i = 0; i < this.arr.length; i++) {
			if (this.arr[i].key === key) {
				this.arr[i].value = value;
				return;
			}
		}
		this.arr[this.arr.length] = new struct(key, value);
	}

	var get = function(key) {
		for (var i = 0; i < this.arr.length; i++) {
			if (this.arr[i].key === key) {
				return this.arr[i].value;
			}
		}
		return null;
	}

	var remove = function(key) {
		var v;
		for (var i = 0; i < this.arr.length; i++) {
			v = this.arr.pop();
			if (v.key === key) {
				continue;
			}
			this.arr.unshift(v);
		}
	}

	var size = function() {
		return this.arr.length;
	}

	var isEmpty = function() {
		return this.arr.length <= 0;
	}
	this.arr = new Array();
	this.get = get;
	this.put = put;
	this.remove = remove;
	this.size = size;
	this.isEmpty = isEmpty;
}

//表单数据转成对象
function convertParams(ele) {
	arr = $("#" + ele).serializeArray();
	var result = {};
	for (var i = 0; i < arr.length; i++) {
		var item = arr[i];
		result[item.name] = item.value;
	}
	return result;
}

/*
 * 单图上传
 * 参数说明：fileInputId:选择文件的 fileInput的 id
 * 			imgId:接收图片容器的id
 *			width:剪裁图片的宽度默认为100px
 * 			height:剪裁图片的高度默认为100px
 * 			callback:生成base64码之后的回调
 */
function upLoadHeadImg(fileInputId, imgId, width, height, callback) {
	var imgWidth = width || 100
	var imgheight = height || 100
	var src = "#" + fileInputId
	var srcImg = "#" + imgId
	$(src).change(function() {
		var $file = $(this);
		var fileObj = $file[0];
		var windowURL = window.URL || window.webkitURL;
		var dataURL;
		var $img = $(srcImg);
		if (fileObj && fileObj.files && fileObj.files[0]) {
			dataURL = windowURL.createObjectURL(fileObj.files[0]);
			$img.attr('src', dataURL);
			getBase64Image(dataURL, imgWidth, imgheight, function(imgData) {
				callback && callback(imgData)
			})
		} else {
			dataURL = $file.val();
			var imgObj = document.getElementById(imgId);
			// 两个坑:
			// 1、在设置filter属性时，元素必须已经存在在DOM树中，动态创建的Node，也需要在设置属性前加入到DOM中，先设置属性在加入，无效；
			// 2、src属性需要像下面的方式添加，上面的两种方式添加，无效；
			imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
			imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;
		}
	});
}

//图片剪裁并转成Base64码
function getBase64Image(url, width, height, callback) {
	var img = document.createElement('img');
	img.src = url;
	img.width = width
	img.height = height
	img.onload = function() {
			var data = getBase64(img);
			callback && callback(data)
		}
		//document.body.appendChild(img);
}

//图片转换为Base64的方法
function getBase64(img) {
	var canvas = document.createElement("canvas");
	canvas.width = img.width;
	canvas.height = img.height;
	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0, img.width, img.height);
	var dataURL = canvas.toDataURL("image/png");
	return dataURL
		// return dataURL.replace("data:image/png;base64,", "");
}

//---------------------------------公共comm.js---------------------------------------