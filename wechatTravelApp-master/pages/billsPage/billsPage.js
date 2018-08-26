const app = getApp();

Page({
	data: {
		bills: [''],
		height: 0,
		scrollY: true
	},
	swipeCheckX: 35, //激活检测滑动的阈值
	swipeCheckState: 0, //0未激活 1激活
	maxMoveLeft: 160, //消息列表项最大左滑距离
	correctMoveLeft: 150, //显示菜单时的左滑距离
	thresholdMoveLeft: 50,//左滑阈值，超过则显示菜单
	lastShowMsgId: '', //记录上次显示菜单的消息id
	moveX: 0,  //记录平移距离
	showState: 0, //0 未显示菜单 1显示菜单
	touchStartState: 0, // 开始触摸时的状态 0 未显示菜单 1 显示菜单
	swipeDirection: 0, //是否触发水平滑动 0:未触发 1:触发水平滑动 2:触发垂直滑动
	onShow: function () {
		let session = wx.getStorageSync('session'),
				that = this;
		wx.request({
			url: app.globalData.publicPath + '/api/v1/account_books/',
			method: 'GET',
			header: {
				'content-type': 'application/json',
				'3rd-session': session
			},
			success: res => {
				console.log(res.data);
				that.sortBills(res.data);
			},
			fail: res => {
				console.log(res);
			}
		})
	},
	sortBills: function (data) {
		let that = this;
		let bills = [], billPer = {};
		for (let i = 0; i < data.length; i ++) {
			billPer = {};
			billPer.location = data[i].destination;
			billPer.time = that.getTime(data[i].time);
			billPer.id = data[i].id;
			bills.unshift(billPer);
		}
		that.setData({
			bills: bills,
		});
	},
	getTime: function (date) {
		let time = new Date(date)
		let year = time.getFullYear()
		let month = time.getMonth() + 1
		let day = time.getDate()
		if (month < 10) {
			month = '0' + month
		} 
		if (day < 10) {
			day = '0'+ day
		}
		return year + '-' + month + '-' + day
	},
	onLoad: function () {
		var windowHeight = app.data.deviceInfo.windowHeight
		var height = windowHeight
		this.setData({height: height})
	},
	touchStart: function (e) {
		if (this.showState === 1) {
			this.touchStartState = 1
			this.showState = 0
			this.moveX = 0
			this.translateXMsgItem(this.lastShowMsgId, 0, 200)
			this.lastShowMsgId = ""
			return
		}
		this.firstTouchX = e.touches[0].clientX
		this.firstTouchY = e.touches[0].clientY
		if (this.firstTouchX > this.swipeCheckX) {
			this.swipeCheckState = 1
		}
	},
	touchMove: function (e) {
		if (this.swipeCheckState === 0) {
			return
		}
		//当开始触摸时有菜单显示时，不处理滑动操作
		if (this.touchStartState === 1) {
			return
		}
		var moveX = e.touches[0].clientX - this.firstTouchX
		var moveY = e.touches[0].clientY - this.firstTouchY
		//已触发垂直滑动，由scroll-view处理滑动操作
		if (this.swipeDirection === 2) {
			return
		}
		//未触发滑动方向
		if (this.swipeDirection === 0) {
			//触发垂直操作
			if (Math.abs(moveY) > 4) {
				this.swipeDirection = 2
				return
			}
			//触发水平操作
			if (Math.abs(moveX) > 4) {
				this.swipeDirection = 1
				this.setData({ scrollY: false })
			}
			else {
				return
			}

		}
		//处理边界情况
		if (moveX > 0) {
			moveX = 0
		}
		//检测最大左滑距离
		if (moveX < -this.maxMoveLeft) {
			moveX = -this.maxMoveLeft
		}
		this.moveX = moveX
		this.translateXMsgItem(e.currentTarget.id, moveX, 0)
	},
	touchEnd: function (e) {
		this.swipeCheckState = 0
		var swipeDirection = this.swipeDirection
		this.swipeDirection = 0
		if (this.touchStartState === 1) {
			this.touchStartState = 0
			this.setData({ scrollY: true })
			return
		}
		//垂直滚动，忽略
		if (swipeDirection !== 1) {
			return
		}
		if (this.moveX === 0) {
			this.showState = 0
			//不显示菜单状态下,激活垂直滚动
			this.setData({ scrollY: true })
			return
		}
		if (this.moveX === this.correctMoveLeft) {
			this.showState = 1
			this.lastShowMsgId = e.currentTarget.id
			return
		}
		if (this.moveX < -this.thresholdMoveLeft) {
			this.moveX = -this.correctMoveLeft
			this.showState = 1
			this.lastShowMsgId = e.currentTarget.id
		}
		else {
			this.moveX = 0
			this.showState = 0
			//不显示菜单,激活垂直滚动
			this.setData({ scrollY: true })
		}
		this.translateXMsgItem(e.currentTarget.id, this.moveX, 350)
	}, 
	// 根据id号获取当前点击账单索引值
	getItemIndex: function (id) {
		var bills = this.data.bills
		for (var i = 0; i < bills.length; i++) {
			if (bills[i].id == id) {
				return i;
			}
		}
		return -1
	},
	translateXMsgItem: function (id, x, duration) {
		var animation = wx.createAnimation({ duration: duration })
		animation.translateX(x).step()
		this.animationMsgItem(id, animation)
	},
	animationMsgItem: function (id, animation) {
		var index = this.getItemIndex(id)
		var param = {}
		var indexString = 'bills[' + index + '].animation'
		param[indexString] = animation.export()
		this.setData(param)
	},
	animationMsgWrapItem: function (id, animation) {
		var index = this.getItemIndex(id)
		var param = {}
		console.log('index:', index)
		var indexString = 'bills[' + index + '].wrapAnimation'
		param[indexString] = animation.export()
		this.setData(param)
	},
	// 删除账单
	billDelete: function (e) {
		var s = this
		wx.showModal({
			title: '提示',
			content: '确定删除该账本吗？',
			confirmColor: '#39a6ff',
			success: function (res) {
				if (res.confirm) {
					wx.request({
						url: app.globalData.publicPath + '/api/v1/account_books/' + e.currentTarget.id + '/',
						method: 'DELETE',
						header: {
							'content-type': 'application/json'
						},
						success: res => {
							if (res.statusCode == 200) {
								var animation = wx.createAnimation({ duration: 200 })
								animation.height(0).opacity(0).step()
								console.log('id:', e.currentTarget.id)
								s.animationMsgWrapItem(e.currentTarget.id, animation)
								setTimeout(function () {
									var index = s.getItemIndex(e.currentTarget.id)
									s.data.bills.splice(index, 1)
									s.setData({ bills: s.data.bills })
								}, 100)
								s.showState = 0
								s.setData({ scrollY: true })
								wx.showToast({
									title: '删除成功！'
								})
								if (e.currentTarget.id == app.globalData.accountbookId) {

									wx.request({
										url: app.globalData.publicPath + '/api/v1/account_books/',
										method: 'GET',
										header: {
											'3rd-session': wx.getStorageSync('session')
										},
										success: res => {
											if (!res.data || res.data.length == 0) {
												console.log('目前已无账本可以显示！')
												setTimeout(function () {
													wx.showModal({
														title: '前去新建账本！',
														confirmColor: '#39a6ff',
														confirmText: '我知道了',
														showCancel: false,
														success: function () {
															// 页面重启动，全部出栈，只留下新页面
															wx.reLaunch({
																url: '../../pages/newAccount/newAccount',
																success: function () {
																	var pages = getCurrentPages()
																	console.log(pages)
																}
															})
														}
													})
												}, 1800)
											} else {
												app.globalData.accountbookId = res.data[res.data.length - 1].id
												console.log(app.globalData.accountbookId)
											}
											console.log(res.data)
										}
									})
								}
							} else {
								wx.showModal({
									title: '提示',
									content: '删除失败，请重新删除！',
									confirmColor: '#39a6ff',
									confirmText: '我知道了',
									showCancel: false
								})
							}
						},
						fail: function () {
							wx.showModal({
								title: '提示',
								content: '删除失败，请重新删除！',
								confirmColor: '#39a6ff',
								confirmText: '我知道了',
								showCancel: false
							})
						}
					})
				} else if (res.cancel) {
					return
				}
			}
		})
	},
	changeBill: function (e) {
		app.globalData.accountbookId = e.currentTarget.id
		console.log(e.currentTarget.id)
		wx.navigateBack({
			delta: 1
		})
	},
	billEditor: function (e) {
		wx.setStorageSync('idEditor', e.currentTarget.id)
	}
})
