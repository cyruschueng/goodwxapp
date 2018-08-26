//index.js
import Colin from "../../assets/js/public.js"
import {
	ajax
} from '../../../utils/util.js';
//获取应用实例
const app = getApp()

Page({
	data: {
		formData: {
			mobile: '',
			otp: '',
		},
		//控件用
		allowPhoneCode: false,
		phoneCodeCount: 60,
		codeBtnText: "获取验证码"

	},
	onLoad: function() {
		//初始化
		this.setData({
			allowPhoneCode: true
		})
	},
	doLogin: function() {
		var self = this;
		if(this.data.formData.mobile && this.data.formData.otp) {
			wx.showLoading({
				title: '登录中',
			});
			wx.login({
				success: res => {
					if(res.code) {
						//发起网络请求
						wx.request({
							url: Colin.exChangeUrl('/do/customer/receiveCarOrder/doLogin'),
							data: {
								mobile: this.data.formData.mobile,
								otp: this.data.formData.otp,
								code: res.code
							},
							success: function(res) {
								wx.hideToast();
								var data = res.data;
								if(data.resultCode == "1") {
									//登陆成功
									//保存token
									var token = data.resultObject.token;
									wx.setStorageSync("token",token);
									//跳转列表页
									wx.redirectTo({
										url: "../orderList/orderList"
									});
								} else if(data.resultCode == "0") {
									wx.showModal({
										title: '提示',
										content: data.resultMessage,
										showCancel: false,
										confirmColor: "#ff6600"
									});
								} else {
									return;
									wx.hideToast();
									//假登陆
									var now = new Date();
									var token = now.getTime();
									ajax({
										url: Colin.exChangeUrl('/do/admin/garageManage/tempLogin'),
										data: {
											token: token,
											tokenValue: self.data.formData.mobile
										},
										success: function(res) {
											wx.setStorage({
												key: "token",
												data: token
											});
											wx.redirectTo({
												url: "../orderList/orderList"
											});
										}
									});
								}
							},
							fail: function() {
								wx.hideToast();
							}
						});
					} else {
						console.log('获取用户登录态失败！' + res.errMsg);
					}
				}
			});
		}
	},
	bindMobile: function(e) {
		var formData = this.data.formData;
		formData.mobile = e.detail.value;
		this.setData({
			formData: formData
		})
	},
	bindOtp: function(e) {
		var formData = this.data.formData;
		formData.otp = e.detail.value;
		this.setData({
			formData: formData
		})
	},
	clearInput: function(event) {
		var key = event.currentTarget.dataset.key;
		var formData = this.data.formData;
		formData[key] = null;
		this.setData({
			formData: formData
		})
	},
	getPhoneCode: function() {
		var self = this;
		if(this.data.allowPhoneCode && this.data.formData.mobile) {
			//调用获取验证码接口
			wx.showLoading({
				title: '发送验证码',
			})
			wx.request({
				url: Colin.exChangeUrl('/do/garageAdmin/login/phoneCode/doRequest'),
				data: {
					mobile: this.data.formData.mobile,
					requestType: '10'
				},
				success: function(res) {
					var data=res.data;
					if(data.resultCode == "1") {
						//成功
						wx.showToast({
							title: '发送成功',
							icon: 'success',
							duration: 2000
						});
						//按钮置灰
						self.setData({
							allowPhoneCode: false
						});
						//倒数60秒
						var date = new Date();
						wx.setStorage({
							key: "phoneCodeDateTime",
							data: date
						});
						var interval = setInterval(function() {
							var count = self.data.phoneCodeCount;
							count--;
							self.setData({
								phoneCodeCount: count,
								codeBtnText: "(" + count + "s)重新获取"
							});
							if(count == 0) {
								clearInterval(interval);
								self.setData({
									allowPhoneCode: true,
									phoneCodeCount: 60,
									codeBtnText: "重新获取"
								});
							}
						}, 1000);

					} else {
						wx.hideToast();
						wx.showModal({
							title: '提示',
							content: data.resultMessage,
							showCancel: false,
							confirmColor: "#ff6600",
							success: function(res) {

							}
						})
					}
				},
				fail: function() {
					wx.hideToast();
				}
			});

		}
	}
})