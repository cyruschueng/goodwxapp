Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		UserInfo: {},
		SaveQuote: {},
	},
	onShareAppMessage: function(res) {
		wx.showLoading({
			title: ''
		});
		if(res.from === 'button') {
			// 来自页面内转发按钮
			console.log(res.target)
		}
		var now = new Date();
		var voucher_code = getApp().data.userOpenId + '_' + now.getTime() + Math.round(Math.random() * 10000);
		return {
			title: '快来分享领红包，手慢就没了',
			imageUrl: 'https://51yangcong.com/568data/image/1.jpg',
			path: 'page/page6/page6?from=' + getApp().data.userOpenId + "&voucher_code=" + voucher_code,
			success: function(res) {
				wx.request({
					url: 'https://51yangcong.com/568data/shareDaijinquan_daijinquan.do',
					//url: 'http://aqvwkm.natappfree.cc/568data/shareDaijinquan_daijinquan.do',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						'openId': getApp().data.userOpenId,
						voucher_code: voucher_code
					},
					success: function success(res) {
						console.log(res.data)
						var o = res.data;
						if(o.success) {
							console.log("转发成功")
						}
						wx.hideLoading(); //////////////////////////////////////////////
					},
					'fail': function(res) {
						wx.hideLoading(); //////////////////////////////////////////////
					}
				});
				// console.log(res.shareTickets[0])
				// wx.getShareInfo({
				//   shareTicket: res.shareTickets[0],
				//   success: function (res) { 
				//     console.log("已转发 来自openid:" + getApp().data.userOpenId);
				//     console.log(res)
				//      },
				//   fail: function (res) { console.log(res) },
				//   complete: function (res) { console.log(res) }
				// })
			},
			fail: function(res) {
				// 分享失败
				console.log(res)
			}
		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		wx.showShareMenu({
			withShareTicket: true,
			success: function(res) {
				// 分享成功
				console.log('shareMenu share success')
				console.log('分享' + res)
			},
			fail: function(res) {
				// 分享失败
				console.log(res)
			}
		})
		wx.showLoading({
			title: '查询中'
		}); //////////////////////////////////////
		var that = this;
		this.setData({
			orderId: options.orderId
		})
		wx.request({
			url: 'https://51yangcong.com/568data/QueryOrder',
			//url: 'https://localhost/568data/QueryOrder',
			//url: 'https://123.206.89.114/568data/QueryOrder',
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			data: {
				'orderId': options.orderId
			},
			success: function success(res) {
				console.log(res.data)
				var o = res.data.result;
				if(o == null) {
					wx.showModal({
						title: '提示',
						content: res.data.reason,
						success: function(res) {
							if(res.confirm) {
								console.log('用户点击确定')
							} else if(res.cancel) {
								console.log('用户点击取消')
							}
						}
					})
					wx.hideLoading(); //////////////////////////////////////////////
					return;
				}
				that.setData({
					result: o
				});
				wx.hideLoading(); //////////////////////////////////////////////
			}
		});
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})