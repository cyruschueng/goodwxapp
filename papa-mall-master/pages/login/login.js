//index.js
//获取应用实例
const app = getApp()
let getCode = false         //防止重复点击获取验证码
Page({
	data: {
		mode: 'aspectFit',
		src: '../../assets/images/icon-logo.png',
		userPhone: '',
		userPassword: ''
	},
	inputPhone: function(e){
		this.setData({
			userPhone: e.detail.value
		})
	},
	inputPassword: function (e) {
		this.setData({
			userPassword: e.detail.value
		})
	},
	//登录
	userLogin: function (event){
		let phone = this.data.userPhone,
			pwd = this.data.userPassword
		if (phone == '') {
			wx.showToast({
				title: '手机号不能为空',
				icon: 'none'
			})
			return false
		}
		if (!(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(phone))) {
			wx.showToast({
				title: '手机号错误！',
				icon: 'none'
			})
			return false
		}
		if (pwd == '') {
			wx.showToast({
				title: '密码不能为空',
				icon: 'none'
			})
			return false
		}
		let params = {
			user_phone: phone,
			user_password: pwd
		}
		//请求验证码
		utils.request({
			url: api.login,
			data: params
		}, function (res) {
			wx.showToast({
				title: '登录成功',
				success: function (res) {
					//导航
					wx.switchTab({
						url: "/pages/index/index"
					})
				}
			})
		})
	},
	//去注册页面
	goSignup: function(){
		//导航
		wx.navigateTo({
			url: "/pages/signup/signup",
			success: function(){
				//接口调用成功
			},
			fail: function(){
				//接口调用失败
			},
			complete: function(){
				//接口调用完成
			}
		})
	},
	onLoad: function (options) {
		// 1.页面初始化 options为页面跳转所带来的参数
	},
	onReady: function () {
		// 页面渲染完成
	},
	onShow: function () {
		// 页面显示
	},
	onHide: function () {
		// 页面隐藏
	},
	onUnload: function () {
    	// 页面关闭
	}	
})
