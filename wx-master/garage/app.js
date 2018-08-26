//app.js
import {
	ajax
} from 'utils/util.js'
App({
	onLaunch: function() {
		//调用API从本地缓存中获取数据
		//		this.wxLogin();
		this.getSystemInfo();
    wx.removeStorageSync('token')
	},
	wxLogin() {
		var self = this;
		wx.login({
			success: function(res) {
				if(res.code) {
					//发起网络请求
					ajax({
						url: '/do/garageAdmin/receiveCarOrder/autoLogin',
						data: {
							code: res.code
						},
						success: function(res) {
							var data = res.data;
							var resultObject = data.resultObject;

							if(data.resultCode == "1") {
								wx.setStorageSync('token', resultObject.token);
								self.globalData.token = resultObject.token;
								self.globalData.noGarage = false;
							} else if(data.resultCode == "0") {
								self.globalData.noGarage = true;
								wx.redirectTo({
									url: "/src/containers/toJoin/toJoin"
								});
							}
							//
						},
						complete: function() {
							self.globalData.alreadyLogin = false;
						}
					});
					//              ajax({
					//                 url:'/do/admin/garageManage/tempLogin',
					//                 data:{
					//                     token:'11231232',
					//                     tokenValue:'359074e34d874f319c8c87552a3ef6a6'
					////											 tokenValue:'43bef5aad7434721b17cb8c952021586'
					//                 },
					//                 success:function(res){
					//                     wx.setStorageSync('token','11231232')
					//                 }
					//              });
				} else {
					console.log('获取用户登录态失败！' + res.errMsg)
				}
			},
			fail: function() {
				console.log("fail");
			}
		});
	},
	getSystemInfo() {
		let that = this;
	 	wx.getSystemInfo({
			success: function(res) {
				that.globalData.systemInfo = res;
			}
		})
	},
	getUserInfo: function(cb) {
		var that = this
		if(this.globalData.userInfo) {
			typeof cb == "function" && cb(this.globalData.userInfo)
		} else {
			//调用登录接口
			wx.getUserInfo({
				withCredentials: false,
				success: function(res) {
					that.globalData.userInfo = res.userInfo
					typeof cb == "function" && cb(that.globalData.userInfo)
				}
			})
		}
	},
	globalData: {
		appInfo: {
			envVersion: "release", //正式版
			//envVersion: "trial", //体验版本
			//envVersion: "develop", //开发版
			prdDomain: "https://pamap-gr.pingan.com.cn", //生产域名
			stgDomain: "https://test-pamap-gr-stg2.pingan.com.cn", //测试域名
			prdCustomerAppid:'wx756c5d24c992108a', //生产客户端appid
			stgCustomerAppid:'wx4a7b502cc4fcf0ae' //
		},
		userInfo: null,
		systemInfo: null,
		noGarage: null,
		alreadyLogin: null,
		token: ""
	}
})
