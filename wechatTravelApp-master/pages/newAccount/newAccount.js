const app = getApp();

Page({
  data: {
    head_picture_url: '../../images/head_container_picture.png',
    dates: '请选择旅行时间',
    active1: '',
		location: '请输入旅行目的地',
		locationInfo: '',
		locationFocus: false,
		idEditor: 0
  },
	onShow: function () {
		let that = this
		if (wx.getStorageSync('idEditor')) {
			that.setData({
				idEditor: wx.getStorageSync('idEditor')
			})
			wx.setNavigationBarTitle({
				title: '编辑账本'
			})
			wx.removeStorageSync('idEditor')
			wx.request({
				url: app.globalData.publicPath + '/api/v1/account_books/' + that.data.idEditor + '/',
				method: 'GET',
				header: {
					'content-type': 'application/json',
					'3rd-session': wx.getStorageSync('session')
				},
				success: res => {
					console.log(res.data)
					that.setData({
						location: res.data.destination,
						dates: that.getTime(res.data.time)
					})
				},
				fail: res => {
					console.log(res)
				}
			})
		}
	},
	getTime: function (time) {
		let date = new Date(time)
		let year = date.getFullYear()
		let month = date.getMonth() + 1
		if (month < 10) {
			month = '0' + month
		}
		let day = date.getDate()
		if (day < 10) {
			day = '0' + day
		}
		return year + '-' + month + '-' + day
	},
	getLocation: function (e) {
		console.log(e.detail.value)
		this.setData({
			locationInfo: e.detail.value
		})
	},
	locationFocus: function () {
		this.setData({
			locationFocus: true
		})
	},
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value,
      active1: 'active1'
    })
  },
	newAccount: function () {
		let that = this
		if (!that.data.locationInfo && !that.data.idEditor) {
			wx.showModal({
				title: '页面提示',
				content: '请输入旅行目的地',
				showCancel: false,
				confirmText: '我知道了',
				confirmColor: '#39a6ff'
			})
			return
		} else if (!that.data.active1 && !that.data.idEditor) {
			wx.showModal({
				title: '页面提示',
				content: '请选择旅行时间',
				showCancel: false,
				confirmText: '我知道了',
				confirmColor: '#39a6ff'
			})
			return
		} else {
			if (!that.data.idEditor) {
				console.log('开始新建')
				wx.request({
					url: app.globalData.publicPath + '/api/v1/account_books/',
					method: 'POST',
					data: {
						'destination': that.data.locationInfo,
						'time': that.data.dates
					},
					header: {
						'content-type': 'application/json'
					},
					success: res => {
						console.log('success:', res, res.data.id)
						wx.request({
							url: app.globalData.publicPath + '/api/v1/users/account_book/' + res.data.id + '/',
							method: 'POST',
							header: {
								'content-type': 'application/json',
								'3rd-session': wx.getStorageSync('session')
							},
							success: res1 => {
								console.log('绑定账本和用户：', res1)
								that.showSuccess(0)
								app.globalData.accountbookId = res.data.id
								setTimeout(function () {
									wx.redirectTo({
										url: '../accountDetail/accountDetail',
									})
								}, 2000)
							}
						})
					},
					fail: res => {
						console.log('fail:', res)
					}
				})
			} else {
				console.log('开始更新')
				if (!that.data.locationInfo) {
					that.setData({
						locationInfo: that.data.location
					})
				}
				wx.request({
					url: app.globalData.publicPath + '/api/v1/account_books/' + that.data.idEditor + '/',
					method: 'PUT',
					header: {
						'content-type': 'application/json',
						'3rd-session': wx.getStorageSync('session')
					},
					data: {
						'destination': that.data.locationInfo,
						'time': that.data.dates
					},
					success: res => {
						console.log('修改成功：', res.statusCode)
						that.showSuccess(1)
						setTimeout(function () {
							wx.navigateBack({
								delta: 1
							})
						}, 1000)
					},
					fail: res => {
						console.log(res)
					}
				})
			}
		}
	},
	showSuccess: function (index) {
		if (index) {
			wx.showToast({
				title: '修改成功',
			})
		} else {
			wx.showToast({
				title: '新建成功',
			})
		}
	}
})
