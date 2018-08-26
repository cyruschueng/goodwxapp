//index.js
//获取应用实例
const app = getApp()
let utils = require("../../utils/util.js")
let api = require("../../utils/api.js")
let getCode = false         //防止重复点击获取验证码
Page({
	data: {
		mode: 'aspectFit',
		src: '../../assets/images/icon-logo.png',
		codeInfo: '获取验证码',
		userPhone: '',
		smsCode: '',
		userName: '',
		userPassword: ''
	},
	inputPhone: function(e){
		this.setData({
			userPhone: e.detail.value
		})
	},
	inputCode: function (e) {
		this.setData({
			smsCode: e.detail.value
		})
	},
	inputName: function (e) {
		this.setData({
			userName: e.detail.value
		})
	},
	inputPassword: function (e) {
		this.setData({
			userPassword: e.detail.value
		})
	},
	//立即注册
	userSignup: function (event){
		let phone = this.data.userPhone,
			code = this.data.smsCode,
			name = this.data.userName,
			pwd = this.data.userPassword,
			aid = app.globalData.aid
		if(phone == ''){
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
		if (code == '') {
			wx.showToast({
				title: '验证码不能为空',
				icon: 'none'
			})
			return false
		}
		if (name == '') {
			wx.showToast({
				title: '姓名不能为空',
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
			msm_core: code,
			user_name: name,
			user_password: pwd,
			supply_area: aid
		}
		//请求验证码
		utils.request({
			url: api.signup,
			data: params
		}, function (res) {
			wx.showToast({
				title: '注册成功',
				success: function(res){
					//导航
					wx.switchTab({
						url: "/pages/index/index"
					})
				}
			})
		})
	},
	//获取验证码
	getSmsCode: function(){
		let that = this
		if (!getCode){
			getCode = true

			let phone = this.data.userPhone
			if (!(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(phone))){
				wx.showToast({
					title: '手机号错误！',
					icon: 'none'
				})
				getCode = false
				return false
			}
			//请求验证码
			utils.request({
				url: api.getSmsCode,
				data: {
					user_phone: phone
				}
			}, function (res) {
				
			})

			//倒计时实现
			let time = 60
			this.setData({
				codeInfo: time + 'S'
			})
			let timer = setInterval(() => {
				time--
				this.setData({
					codeInfo: time + 'S'
				})
				if (time == 0) {
					this.setData({
						codeInfo: '重新发送'
					})
					getCode = false
					clearInterval(timer)
				}
			}, 1000)
		}
	},
	//去登录页面
	goLogin: function(){
		//导航
		wx.navigateTo({
			url: "/pages/login/login",
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
