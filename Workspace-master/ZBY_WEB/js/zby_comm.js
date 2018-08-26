/**
 * Created by 啸 on 2017/2/22.
 */
var zby_url = "http://c-api.yshfresh.com/api/ysh/";
var gy_url = "http://c-api.yshfresh.com/api/ysh/"
var imgurl = "http://f.yshfresh.com"; //图片服务器路径

// 获取数据方法
var getDataList = function(url, param, fcs, is_check) {
	setTimeout(function() {
		closeZbyLoding();
	}, 1500);

	var sesskey = getCookie("sesskey") || null
	if(!sesskey && url.indexOf('getSesskey') == -1) {
		getDataList(zby_url + 'getSesskey', {}, function(rd) {
			if(rd.sesskey) {
				sesskey = rd.sesskey;
				setCookie("sesskey", sesskey);
				getDataList(url, param, fcs, is_check);
			} else {
				zby_msg('获取sesskey失败');
			}
		});
		return;
	}
	var pa = {};
	for(k in param) {
		pa[k] = param[k];
	}
	pa.sesskey = sesskey;
	$.ajax({
		type: "post",
		url: url,
		async: false,
		data: pa,
		success: function(ret) {
			//closeZbyLoding()
			if(typeof a === "function") {
				a(ret);
			}
			if(ret.log != "") {
				//console.info(ret.log);
			}
			if(ret.state != 0) {
				if(ret.state == 401) {
					window.localStorage.removeItem("sesskey")
					delCookie("sesskey")
					window.location.reload()
				}
			}
			var str = ret;
			if(Object.prototype.toString.call(str) === "[object String]") {
				try {
					ret = JSON.parse(ret)
				} catch(e) {
					zby_msg("无法解析服务器返回数据")
					console.log("捕获异常为：  " + e)
				}
			}

			//校验数据
			if(is_check == true) {
				if(ret) {
					switch(ret.state) {
						case 0:
							//正常数据
							if(ret.aaData && ret.aaData instanceof Array) {
								fcs && fcs(ret);
							} else {
								zby_msg("数据异常")
							}
							break;
						case 1:
							//需要登录
							openWebView()
							break;
						case 2:
							//权限不足
							zby_msg()
							break;
					}
				} else {
					zby_msg("服务器无响应，请稍后再试")
				}
			} else {
				fcs && fcs(ret);
			}
		},
		error: function() {
			zby_msg("服务器出错", 1500, function() {
				window.location.href = '500.html';
			})
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
	if(url.indexOf("?") != -1) {
		var str = url.substr(url.indexOf("?") + 1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}

//---------------------------------公共comm.js---------------------------------------
function zby_GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) {
		return(r[2]);
	}
	return null;
}

// 取得浏览器的userAgent字符串
function myBrowser() {
	var userAgent = navigator.userAgent;
	var isOpera = userAgent.indexOf("Opera") > -1;
	if(isOpera) {
		return "Opera"
	}; // 判断是否Opera浏览器
	if(userAgent.indexOf("Firefox") > -1) {
		return "FF";
	} // 判断是否Firefox浏览器
	if(userAgent.indexOf("Chrome") > -1) {
		return "Chrome";
	}
	if(userAgent.indexOf("Safari") > -1 || userAgent.indexOf("AppleWebKit") > -1) {
		return "Safari";
	}
	// 判断是否Safari浏览器
	if(userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
		if(navigator.userAgent.indexOf("MSIE 6.0") > 0) {
			return "IE6";
		}
		if(navigator.userAgent.indexOf("MSIE 7.0") > 0) {
			return "IE7";
		}
		if(navigator.userAgent.indexOf("MSIE 9.0") > 0 && !window.innerWidth) {
			return "IE8";
		}
		if(navigator.userAgent.indexOf("MSIE 9.0") > 0) {
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
	if(ua.match(/MicroMessenger/i) == "micromessenger") {
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
	if(/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
			.substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}
//动态加载css/js
var dynamicLoading = {
	css: function(path) {
		if(!path || path.length === 0) {
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
		if(!path || path.length === 0) {
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
	if(data.length > 0) {
		var str = "";
		for(var num in data) {
			laytpl(tpl).render(data[num], function(html) {
				str += html;
			});
		}
		view.append(str);
		setIframeHeight()
	} else {
		noData(view);
		setIframeHeight()
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
			if(n > 0) {
				if(n <= 9) {
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
			if(dur > 0) {
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
			if(o.sec) {
				o.sec.innerHTML = f.dv().sec;
			}
			if(o.mini) {
				o.mini.innerHTML = f.dv().mini;
			}
			if(o.hour) {
				o.hour.innerHTML = f.dv().hour;
			}
			if(o.day) {
				o.day.innerHTML = f.dv().day;
			}
			if(o.month) {
				o.month.innerHTML = f.dv().month;
			}
			if(o.year) {
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
	var isMob = /^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|17[012356789][0-9]{8}|18[012356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
	tel = tel.trim();
	if(isPhone.test(tel) || isMob.test(tel)) {
		return true;
	} else {
		return false;
	}
}

// 获取服务端用户信息
userInfo = function(funs) {
	var url = zby_url + "userinfo"
	var user = ""
	var param = {
		cookie: document.cookie
	}
	getDataList(url, param, function(data) {
		if(data) {
			switch(data.state) {
				case 0:
					user = data.aaData;
					localStorage.setItem("userInfo", JSON.stringify(user))
					funs && funs(data)
					break;
				case 1:
					// 需要登录处理 
					if(data.url) {
						window.location.href = imgurl + "/" + data.url
					} else {
						zby_msg("请登录");
					}
					break;
				case 2:
					// 服务器处理跳转 
					if(data.url) {
						window.location.href = imgurl + "/" + data.url
					} else {
						zby_msg("请登录");
					}
					break;
				case 800:
					//未知错误，本不应该出现的错误 
					zby_msg("发生未知错误");
					// 写入错误日志文档coding.. 
					//save_error(800, data.msg); 
					break;
			}
			return user;
		} else {
			zby_msg("网络错误，请稍后再试");
			return user;
		}
	})
}

// 获取本地用户信息
getuserInfo = function() {
	var user_temp = localStorage.getItem("userInfo") || null;
	var user = new Object()
	if(user_temp) {
		try {
			var user = JSON.parse(user_temp)
		} catch(e) {
			console.log("用户信息格式有误!")
			user = null
		}
	};
	return user;
}

//倒计时方法
function wait_time(o, wait) {
	if(wait == 0) {
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
	var url_addcart = zby_url + "/api/get/add_shop_car";
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
			if(ret) {
				if(ret && ret.state == 0) {
					if(ret.aaData && ret.aaData instanceof Array && ret.aaData.length > 0) {
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
	if(!dataTemp) {
		console.log("没有找到key为" + key + "的本地存储信息 ");
	} else {
		if(isJson == true) {
			try {
				data = JSON.parse(dataTemp)
			} catch(e) {
				console.log("Key为" + key + "的本地存储信息格式有误", "错误信息为:" + e)
			}
		}
	}
	return data;
}

//显示等待Loding..的等待菊花圈
function showLoding() {
	var loding = $("#img_wait") || null
	if(typeof(loding.html()) == "undefined") {
		// console.log("没有获取到loding对象")
	} else {
		loding.show()
	}
}
//关闭等待Loding..的等待菊花圈
function closeLoding() {
	var loding = $("#img_wait") || null
	if(typeof(loding.html()) == "undefined") {
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

//装备云alert
function zby_alert(msg, flag) {
	var icon = null;
	var sh = $(window.parent.document).find('body').scrollTop() + 250 + 'px';
	switch(flag) {
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
		offset: sh,
		icon: icon,
		skin: 'layui-layer-molv',
		closeBtn: 0,
	});
}

/*
 * 装备云Msg
 * @param msg --提示文字
 * @param time --关闭时间
 * @param callback --提示关闭后执行函数
 */
function zby_msg(msg, time, callback) {
	var smsg = '',
		stime = 2000,
		scallback = null;
	var sh = $(window.parent.document).find('body').scrollTop() + 250 + 'px';
	if(typeof msg !== 'string' && typeof msg != 'number') {
		smsg = '玩命提示中';
	} else {
		smsg = msg;
	}

	if(time && typeof time === 'number') {
		if(time > 500)
			stime = time;
	} else if(time && typeof time === 'function') {
		scallback = time;
	}

	if(callback && typeof callback === 'function') {
		scallback = callback;
	} else if(!scallback) {
		scallback = null;
	}

	layer.msg(smsg, {
		offset: sh,
		time: stime,
		end: scallback
	});
}

//金钱格式化
function moneyFormat(s) {
	if(/[^0-9\.]/.test(s)) return "invalid value";
	s = s.replace(/^(\d*)$/, "$1.");
	s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
	s = s.replace(".", ",");
	var re = /(\d)(\d{3},)/;
	while(re.test(s))
		s = s.replace(re, "$1,$2");
	s = s.replace(/,(\d\d)$/, ".$1");
	return s.replace(/^\./, "0.")
}

// 询问框
function zby_confirm(msg, yesButton, cancelButton, callBack) {
	msg = msg || "请选择";
	yesButton = yesButton || "好";
	cancelButton = cancelButton || "不";
	var sh = $(window.parent.document).find('body').scrollTop() + 250 + 'px';
	layer.confirm(msg, {
		title:'提示',
		// offset: sh,
		time: 20000, //20s后自动关闭
		btn: [yesButton, cancelButton], //按钮
		skin: 'layui-layer-molv',
	}, function(index) {
		callBack && callBack(true)
		layer.close(index)
	}, function(index) {
		callBack && callBack(false)
		layer.close(index)
	});
}

//手动关闭Zby的Loding
var closeZbyLoding = function() {
	$("#bg").hide(0);
	$("#loding").hide(0)
}

//存入Cookie
function setCookie(name, value) {
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

//读取Cookie
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg)) {
		return unescape(arr[2]);
	} else {
		return null;
	}
}

//删除Cookie
function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if(cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
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
	if(str2 == "s") {
		return str1 * 1000;
	} else if(str2 == "h") {
		return str1 * 60 * 60 * 1000;
	} else if(str2 == "d") {
		return str1 * 24 * 60 * 60 * 1000;
	}
}
//无数据
noData = function(view, error, url) {
	if(!error)
		error = "去逛街吧~~~"
	if(!url)
		url = ""
	var childList = view.childNodes;
	var str = "<div class='container qc_padding '><div class='row '><div class='col - xs - 12 '><p class='sc_xylg '><img src='img/sy_logo.png'></p><p class='sc_xygggj '><span class='sc_xydn '>小源带你</span><a class='sc_qggb ' onclick=loadmain1({action:'" + url + "'})><span>" + error + "</span></a><span class='sc_golj ' onclick=loadmain1({action:'" + url + "'})>GO~</span></p></div></div></div>"
	// 清空容器
	for(var num in childList) {
		view.removeChild(childList[num]);
	}
	// 将空白信息填入容器
	str = "暂无数据";
	view.append(str);
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
	if(!pagename) {
		tpl = "没有收到模板数据"
		$(".layui-layer-content").each(function() {
			$(this).html(tpl)
		})
	} else {
		//先检查本地缓存是否有该模板，如果有则用本地模板，如果没有则请求服务器获取模板
		var childView = window.localStorage.getItem("childView") || new Array()
		if(!childView) {
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
			if(4 > childView.length > 0) {
				try {
					childView = childView.split("&*")
				} catch(e) {
					childView = new Array
				}
				for(var num in childView) {
					if(childView[num].childViewName == pagename)
						count++
				}
			} else {
				childView = []
				window.localStorage.remove("childView")
			}

			for(var num in childView) {
				if(eval('(' + childView[num].replace(/\\/g, "") + ')').childViewName == pagename) {
					childViewCount = 1
					tpl = eval('(' + childView[num].replace(/\\/g, "") + ')').childViewTpl
					$(".layui-layer-content").each(function() {
						$(this).html(tpl)
					})
					break
				}
			}

			if(childViewCount != 1) {
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
		for(var i = 0; i < this.arr.length; i++) {
			if(this.arr[i].key === key) {
				this.arr[i].value = value;
				return;
			}
		}
		this.arr[this.arr.length] = new struct(key, value);
	}

	var get = function(key) {
		for(var i = 0; i < this.arr.length; i++) {
			if(this.arr[i].key === key) {
				return this.arr[i].value;
			}
		}
		return null;
	}

	var remove = function(key) {
		var v;
		for(var i = 0; i < this.arr.length; i++) {
			v = this.arr.pop();
			if(v.key === key) {
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
	for(var i = 0; i < arr.length; i++) {
		var item = arr[i];
		result[item.name] = $.trim(item.value);
	}
	return result;
}

//设置iframe容器高度
function setIframeHeight() {
	var $parent = $(window.parent.document);
	var minHeight = window.screen.availHeight - $parent.find(".header-section").outerHeight(true) + 24;
	var height = $("body").height() > minHeight ? $("body").height() : minHeight;
	$parent.find("#main").attr("height", height); //document.body.scrollHeight
}

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
		if(fileObj && fileObj.files && fileObj.files[0]) {
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

function getBase64Image(url, width, height, callback) {
	var img = document.createElement('img');
	img.src = url;
	img.width = width
	img.height = height
	img.onload = function() {
		var data = getBase64(img);
		console.log(data);
		callback && callback(data)
	}
}

function getBase64(img) {
	var canvas = document.createElement("canvas");
	canvas.width = img.width;
	canvas.height = img.height;
	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0, img.width, img.height);
	var dataURL = canvas.toDataURL("image/png");
	return dataURL
}

//金钱格式化
function formatCurrency(str) {
	//Rekey 
	var len = str.length,
		str2 = '',
		max = Math.floor(len / 3);
	for(var i = 0; i < max; i++) {
		var s = str.slice(len - 3, len);
		str = str.substr(0, len - 3);
		str2 = (',' + s) + str2;
		len = str.length;
	}
	str += str2;
	return str
}

//后台左侧菜单遮罩层操作
function leftCancelShade(ele) {
	var div = document.getElementById(ele)
	var mo = new MutationObserver(callback);

	function callback() {
		var displayVal = $("#" + 　ele).attr("aria-hidden")
		if(displayVal == "true") {
			$(window.parent.document).find("#shade").css({
				left: "-100%",
			})
		}
		if(displayVal == "false") {
			$(window.parent.document).find("#shade").css({
				left: 0,
			});
		}
	}
	var ob2 = new MutationObserver(callback)
	ob2.observe(div, {
		attribute: true,
		attributeOldValue: true
	})
}
//---------------------------------公共comm.js---------------------------------------