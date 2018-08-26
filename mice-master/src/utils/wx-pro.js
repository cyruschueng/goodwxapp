import Errors, { INVALID_TOKEN } from './errors'
// import { showWxFailToast } from './util'
function promisify() {
	wx.pro = {} // wx.pro 下面挂载着返回 promise 的 wx.API
	// 普通的要转换的函数
	const functionNames = [
		'login',
		'getUserInfo',
		'navigateTo',
		'checkSession',
		'getStorageInfo',
		'requestPayment',
		'removeStorage',
		'clearStorage',
		'getNetworkType',
		'getSystemInfo',
		'uploadFile',
		'getImageInfo',
		'downloadFile',
		'showToast',
	]

	functionNames.forEach(fnName => {
		wx.pro[fnName] = (obj = {}) => {
			return new Promise((resolve, reject) => {
				obj.success = function (res) {
					console.log(`wx.${fnName} success`, res)
					resolve(res)
				}
				obj.fail = function (err) {
					console.error(`wx.${fnName} fail`, err)
					reject(err)
				}
				wx[fnName](obj)
			})
		}
	})

	// 特殊改造的函数

	wx.pro.getStorage = key => {
		return new Promise((resolve, reject) => {
			wx.getStorage({
				key: key,
				success: res => {
					resolve(res.data) // unwrap data
				},
				fail: err => {
					resolve() // not reject, resolve undefined
				}
			})
		})
	}

	wx.pro.setStorage = (key, value) => {
		return new Promise((resolve, reject) => {
			wx.setStorage({
				key: key,
				data: value,
				success: res => {
					resolve(value) // 将数据返回
				},
				fail: err => {
					reject(err)
				}
			})
		})
	}

	wx.pro.request = options => {
		return new Promise((resolve, reject) => {
			const user = wx.getStorageSync('loginInfo')
			wx.request({
				url: options.url,
				method: options.method || 'GET',
				data: options.data,
				header: {
					'Hb-Token': (user && user.token) || '',
					'content-type':'application/json;charset=UTF-8',
					...options.header
				},
				success: res => {
					if (res.statusCode >= 400) {
						if (options.url.indexOf('statistic') === -1 && options.url.indexOf('retrieve') === -1) {
							wx.showToast({
								title: '加载失败',
								image: '/assets/images/ic_fail@3x.png',
								duration: 3000,
							})
						}
						console.error('wx.request fail [business]', options, res.statusCode, res.data)
						reject(res)
					}
					else {
						console.log('wx.request success', options, res.data)
						const code = res.data.code
						const detail = res.data.detail
						if (code !== 0) {
							if (code === INVALID_TOKEN) {
								wx.showLoading({
									mask: true,
									title: '正在重新登录...',
								})
								const app = getApp()
								app.login()
							}
							resolve(res.data)
						} else {
							resolve(res.data) // unwrap data
						}
					}
				},
				fail: err => {
					console.error('wx.request fail [network]', options, err)
					wx.showToast({
						title: '加载失败',
						image: '/assets/images/ic_fail@3x.png',
						duration: 3000,
					})
					reject(err)
				}
			})
		})

	}
}

export default promisify()
