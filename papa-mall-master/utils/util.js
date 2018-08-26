// 引入相关的文件
const config = require('./config')

//获取应用实例
const app = getApp()
let api = require("./api.js")

/**
 * 不带loading的请求
 */
function request(opt, success) {
	this.requestLoad(opt, "", success)
}

/**
 * 带loading的请求
 * @params url:网络请求的url
 * @params params:请求参数
 * @params message:进度条的提示信息
 * @params success:成功的回调函数
 * @params fail：失败的回调
 */
function requestLoad(opt, message, success) {
	let that = this
	let options = {}
	let token = wx.getStorageSync('token')
	options.method = opt.method || 'POST'
	if (options.method == 'POST' && token){
		options.header = {
			'token': token,
			'content-type': 'application/x-www-form-urlencoded'
		}
	}
	options.url = opt.url
	options.host = config.server.host
	options.data = opt.data
	if (message != "") {
		wx.showLoading({
			title: message
		})
	}
	if (options.url != undefined){
		wx.request({
			url: options.host + options.url,
			data: options.data,
			header: options.header,
			method: options.method,
			success: function (res) {
				//console.log(res)
				if (message != "") {
					wx.hideLoading()
				}
				if (res.statusCode == 200) {
					success(res.data)
				} else if (res.statusCode == 500) {
					wx.showToast({
						title: '服务器异常，请重试！',
						duration: 2000
					})
				} else if (res.statusCode == 401) {
					//token失效，重新获取
					that.request({
						url: api.getToken,
						method: 'GET'
					}, function (res) {
						wx.setStorageSync('token', res)
					})
				} else {
					wx.showToast({
						title: res,
						duration: 2000
					})
				}
			},
			fail: function (res) {
				if (message != "") {
					wx.hideLoading()
				}
				wx.showToast({
					title: '请求失败，请重试！',
					duration: 2000
				})
			},
			complete: function (res) {
				//请求完成
			}
		})
	}
}
//使用
// utils.requestLoad('users/list', data, '正在加载...', function (res) {
// 	//res就是我们请求接口返回的数据
// 	//console.log(res)
// })
/**
 * 格式化时间，参数date
 */
const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
/**
 * 格式化数字
 */
const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}

module.exports = {
	request: request,
	requestLoad: requestLoad,
	formatTime: formatTime
}
