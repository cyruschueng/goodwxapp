//开发版开头
var x2headURL = 'x2.yshfresh';

//测试版开头
var v3headURL = 'testv3.yshfresh';

//正式版开头
var v1headURL = 'testv1.yshfresh';


var tplurl = "";
// var yshurl = "http://10.2.15.12:3000/api/ysh/";
var yshurl = "";



function getDataList(url, param, fcs, is_check){
	var sesskey = window.localStorage.getItem("sesskey") || null
	if (sesskey)
		sesskey = JSON.parse(sesskey)
	if (!sesskey && url.indexOf('getSesskey') == -1) {
		getDataList(yshurl + 'getSesskey', {}, function(rd) {
			if (rd.sesskey) {
				sesskey = rd.sesskey;
				setLocal("sesskey", sesskey);
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
                    if (ret.log&&ret.log != "") {
                    	console.info(ret.log);
                    }
                    if (ret.state == 401) {
                    	window.localStorage.removeItem("sesskey")
                    	getDataList(url, param, fcs, is_check);
                    }
                    if (ret.state != 0) {
                    	console.log('错误码：' + ret.state + '\n' + JSON.stringify(ret.msg));
                    }
                    var str = ret;
                    if (Object.prototype.toString.call(str) === "[object String]") {
                    	try {
                    		ret = JSON.parse(ret)
                    	} catch (e) {
                    		console.log("无法解析服务器返回数据")
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
                    }
                });
}

// 获取本地用户信息
function getuserInfo(){
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
// 校验电话号码
function mobileCheck(tel) {
    var isPhone = /^1[3|4|5|7|8][0-9]{9}$/;
    var isMob = /^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
    tel = tel.trim();
    if (isPhone.test(tel) || isMob.test(tel)) {
        return true;
    } else {
        return false;
    }
}

//数据存入本地方法
function setLocal(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

//打开新版loding
function showYshLoding() {
    $("#bg").show(0);
    $("#loding").show(0);
}

//手动关闭Ysh的Loding
function closeYshLoding() {
    $("#bg").hide(0);
    $("#loding").hide(0)
}

function GetRequest() {
    var url = location.href; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.lastIndexOf("?") != -1) {
        var str = url.substr(url.lastIndexOf("?") + 1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

function ysh_confirm(msg, yesButton, cancelButton, callBack) {
    closeYshLoding();
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

function GetRequest() {
    var url = location.href; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.lastIndexOf("?") != -1) {
        var str = url.substr(url.lastIndexOf("?") + 1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
