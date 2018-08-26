function formatTime(date) {
	var year = date.getFullYear()
	var month = date.getMonth() + 1
	var day = date.getDate()

	var hour = date.getHours()
	var minute = date.getMinutes()
	var second = date.getSeconds()
	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
	n = n.toString()
	return n[1] ? n : '0' + n
}

function deepClone(data) {
	let obj;
	if(typeof data == 'object' && data != null) {
		if(Array.isArray(data)) {
			obj = []
		} else {
			obj = {}
		}
		for(var i in data) {
			obj[i] = deepClone(data[i])
		}
	} else {
		obj = data;
	}

	return obj
}
function wxLogin(Domain,options,fn){
	var app = getApp();
	wx.login({
		success: function(res) {
			if(res.code) {
				app.globalData.autoLogin=false;
				wx.removeStorageSync('token');
				wx.request({
					url: Domain + '/do/garageAdmin/receiveCarOrder/autoLogin',
					data: {
						code: res.code
					},
					success: function(res) {
						var data = res.data;
						var resultObject = data.resultObject;
						app.globalData.autoLogin=true;

						if(data.resultCode == "1") {
							wx.setStorageSync('token', resultObject.token);
							wx.setStorageSync('idGarage', resultObject.idGarage);
							if(resultObject.showNewFollow){
								  wx.setStorageSync('showNewFollow', true);
									wx.redirectTo({
											url: "/src/containers/aboutUs/aboutUs"
									});
							}
							if(typeof fn==='function'){
                 fn()
							}else if(options.url != "/do/customer/receiveCarOrder/autoLogin") {
								 ajax(options);
							}
						}else if(data.resultCode=='0'){
							if(resultObject.showNewFollow){
									wx.setStorageSync('showNewFollow', true);
									wx.redirectTo({
											url: "/src/containers/aboutUs/aboutUs"
									});
							}else{
								if(typeof fn==='function'){
									 fn()
								}else{
									wx.redirectTo({
											url: "/src/containers/toJoin/toJoin"
									});
								}
							}
						}else{
							if(typeof fn==='function'){
								 fn()
							}else{
								wx.redirectTo({
										url: "/src/containers/toJoin/toJoin"
								});
							}

						}
					},
					complete: function() {
						wx.hideToast();
					}
				});
			} else {
				console.log('获取用户登录态失败！' + res.errMsg)
			}
		},
		fail: function() {
			console.log("fail");
		}
	});
}
function ajax(options) {
	var app = getApp(),
	  token=wx.getStorageSync('token') || null,
		Domain = "",
		envVersion = app.globalData.appInfo.envVersion;
	if(envVersion == "release" || envVersion == "trial") {
		Domain = app.globalData.appInfo.prdDomain;
	} else if(envVersion == "develop") {
		Domain = app.globalData.appInfo.stgDomain;
	}

	if(typeof token !== 'string' || options.url == "/do/customer/receiveCarOrder/autoLogin") {
        wxLogin(Domain,options)
	} else {
		//自动登录过，直接执行ajax
		var method = options.method || 'post',
			url = options.url || '',
			data = options.data || {},
			success = options.success || '',
			complete = options.complete || '',
			token = wx.getStorageSync('token'),
			flag=false;
		if(!options.unloading){
			wx.showLoading({
				title: '加载中',
			});
			flag=true;
		}
		wx.request({
			url: Domain + url,
			data: data,
			method:'POST',
			header: {
				token: token
			},
			success: function(res) {
				if(res.data.resultCode=='2'){
					console.log(1)
						wxLogin(Domain,options)
						return;
				}
				if(success) {
					success(res.data)
				}
				if(flag){
					wx.hideToast();
					flag=false;
				}
			},
			complete: function() {
				if(flag){
					wx.hideToast();
					flag=false;
				}
				if(complete) {
					complete();
				}
			}
		})
	}
}
module.exports = {
	formatTime: formatTime,
	deepClone: deepClone,
	ajax: ajax,
	wxLogin:wxLogin
}
