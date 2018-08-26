const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}
function wxLogin(Domain,options){
	var app = getApp();
	wx.login({
		success: function(res) {
			if(res.code) {
				app.globalData.autoLogin=false;
				wx.removeStorageSync('token');
				wx.request({
					url: Domain + '/do/customer/receiveCarOrder/autoLogin',
					data: {
						code: res.code
					},
					success: function(res) {
						var data = res.data;
						var resultObject = data.resultObject;
						app.globalData.autoLogin=true;
						if(data.resultCode != "0") {
							wx.setStorageSync('token', resultObject.token);
							if(options.url != "/do/customer/receiveCarOrder/autoLogin") {
								ajax(options);
							}
						}else{
							wx.showModal({
									content:res.resultMessage,
									confirmColor: "#ff6600"
	            })
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
		//没自动登录过，先登录再执行ajax
      wxLogin(Domain,options)
	} else {
		//自动登录过，直接执行ajax
		var method = options.method || 'post',
			url = options.url || '',
			data = options.data || {},
			success = options.success || '',
			complete = options.complete || '';
		wx.showLoading({
			title: '加载中',
		});
		wx.request({
			url: Domain + url,
			data: data,
			header: {
				token: token
			},
			success: function(res) {
				if(res.data.resultCode=='2'){
				       wxLogin(Domain,options)
				}
				if(success) {
					success(res.data)
				}
			},
			complete: function() {
				wx.hideToast();
				if(complete) {
					complete();
				}
			}
		})
	}
}
module.exports = {
	ajax: ajax,
	formatTime: formatTime
}
