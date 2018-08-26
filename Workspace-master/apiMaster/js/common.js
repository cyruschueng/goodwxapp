// 获取数据方法

var apiurl = "http://10.2.15.83:5400/";
var getDataList = function(url, param, fcs) {
	if(localStorage.getItem('userInfo')){
		var Userid = JSON.parse(getuserInfo()).id
		var Token = JSON.parse(getuserInfo()).token
		param.Userid = Userid;
		param.Token = Token;
	} 

	$.ajax({
		type: "post",
		url: url,
//		async: false,
		data: param,
		success: function(ret) {
			fcs && fcs(ret);
		},
		error: function() {
			api_msg('服务器出错')
		}
	});
};

//laytpl显示数据方法
function showData (view, tpl, data) {
	if(data.length > 0) {
		var str = "";
		for(var num in data) {	
			laytpl(tpl).render(data[num], function(html) {
				str += html;
			});
		}
		view.append(str);
	} else {
		noData(view);
	}
}

//laytpl无数据
noData = function(view, error, url) {
	view.empty()
	var str = "暂无数据";
	view.append(str);
}

// 提示
function api_alert(msg) {
	layer.alert(msg, {
		title: '提示',
		skin: 'layui-layer-lan',
    	closeBtn: 0,
    	anim: 5//动画类型
	});
}

//询问框
function api_confirm (msg,yesButton,cancelButton,callBack){
	msg = msg || "请选择";
	yesButton = yesButton || "确定";
	cancelButton = cancelButton || "取消";
	layer.confirm(msg, {
		title:'提示',
	  	btn: [cancelButton,yesButton] //按钮
	}, function(index){
//		callBack && callBack(true)
		layer.close(index)
	}, function(index){
	  	callBack && callBack()
		layer.close(index)
	});
}

// 提示信息
function api_msg(smsg){
	layer.msg(smsg);
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

//获取url中"?"符后的字串
function GetRequest() {
	var url = location.href; 
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