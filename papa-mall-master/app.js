//app.js
let utils = require("./utils/util.js")
let api = require("./utils/api.js")
App({
	//当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
	onLaunch: function (options) {
		let that = this,
			// scenes是场景值它的类型是整形  
			scenes = options.scene, aid
		if (options.query.aid) {
			// aid是参数,建议兼容ios和android的时候强转换为整形  
			aid = Number(options.query.aid)
			that.globalData.aid = aid
		}
	},
	getAuthKey: function (cb) {
		let that = this
		utils.request({
			url: api.getToken,
			method: 'GET'
		}, function (res) {
			that.globalData.token = res
			wx.setStorageSync('token', res)
			// 调用登录接口
			wx.login({
				success: function (res1) {
					if (res1.code) {
						let params = {
							code: res1.code
						}
						utils.request({
							url: api.getOpenid,
							method: 'POST',
							data: params
						}, function (res2) {
							if (res2 != 0 && res2 != '' && res2 != null) {
								//获取区域信息
								that.getAreaInfo()

								//回调
								if(typeof cb === 'function'){
									cb()
								}
							} else {
								wx.showToast({
									title: '获取openid失败！',
									icon: 'none',
									duration: 1000
								})
							}
						})
					}else{
						console.log('获取用户登录态失败！' + res1.errMsg);
						reject('error');
					}
				}
			})
		})
	},
	//当小程序启动，或从后台进入前台显示，会触发 onShow
	onShow: function (options) {

	},
	//监听小程序隐藏
	onHide: function () {

	},
	//当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
	onHide: function (msg) {
		//console.log(msg)
	},
	//当小程序出现要打开的页面不存在的情况，会带上页面信息回调该函数
	onPageNotFound: function (res) {
		wx.switchTab({
			url: 'pages/index/index'
		})
	},
	//获取区域信息
	getAreaInfo: function () {
		let that = this
		let params = {
			id: that.globalData.aid
		}
		utils.request({ url: api.areaInfo, data: params }, function (res) {
			that.globalData.areaInfo = res

			wx.setNavigationBarTitle({
				title: res.area_name
			})
		})
	},
	globalData: {
		userInfo: null,
		token: null,
		aid: 7,
		areaInfo: {}
	}
})