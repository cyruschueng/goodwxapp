// 引入coolsite360交互配置设定
require('coolsite.config.js');

// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
Page({
	/**
	 * 页面名称
	 */
	name: "page2",
	/**
	 * 页面的初始数据
	 */

	data: {

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
	onLoad() {
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
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {
		wx.showLoading({
			title: '查询中'
		}); //////////////////////////////////////
		var that = this;
		if(getApp().data.userOpenId != null && getApp().data.userOpenId != '') {
			console.log("record获得openid成功" + getApp().data.userOpenId);
			wx.request({
				url: 'https://51yangcong.com/568data/PayRecord',
				//url: 'https://localhost/568data/PayRecord',
				//url: 'https://123.206.89.114/568data/PayRecord',
				method: 'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: {
					'openid': getApp().data.userOpenId,
				},
				success: function success(res) {
					wx.hideLoading(); //////////////////////////////////////////////
					console.log(res.data)
					var o = res.data;
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
				},
				'fail': function(res) {
					wx.hideLoading(); //////////////////////////////////////////////
				}
			});
		} else {
			wx.login({
				success: function(res) {
					wx.request({
						url: 'https://51yangcong.com/568data/GetOpenId',
						method: 'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						data: {
							'code': res.code
						},
						success: function success(res) {
							wx.hideLoading(); //////////////////////////////////////////////
							getApp().data.userOpenId = res.data.openid;
							console.log("record重新获得openid:" + res.data.openid);
						},
						'fail': function(res) {
							wx.hideLoading(); //////////////////////////////////////////////
						}
					});
				}
			});
			wx.showModal({
				title: '提示',
				content: "查询失败，请稍后再试！",
				success: function(res) {
					if(res.confirm) {} else if(res.cancel) {}
				}
			})
		}
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {
		wx.stopPullDownRefresh();
		wx.showLoading({
			title: '查询中'
		}); //////////////////////////////////////
		var that = this;
		wx.login({
			success: function(res) {
				wx.request({
					url: 'https://51yangcong.com/568data/PayRecord',
					//url: 'https://localhost/568data/PayRecord',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						'code': res.code
					},
					success: function success(res) {
						wx.hideLoading(); //////////////////////////////////////////////
						console.log(res.data)
						var o = res.data;
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
							wx.stopPullDownRefresh();
							return;
						}
						that.setData({
							result: o
						});
					},
					'fail': function(res) {
						wx.hideLoading(); //////////////////////////////////////////////
						wx.stopPullDownRefresh();
					}
				});
			}
		});
	},

	//以下为自定义点击事件
	tap_CKXQ: function(e) {
		var id = e.target.id;
		if(id.indexOf("[$$]CLZT") > -1) {
			wx.navigateTo({
				url: '../0cheliangzhuangtai/0cheliangzhuangtai?orderId=' + id.replace('[$$]CLZT', "")
			});
		} else if(id.indexOf("[$$]BYJL") > -1) {
			wx.navigateTo({
				url: '../1baoyangjilu/1baoyangjilu?orderId=' + id.replace('[$$]BYJL', "")
			});
		} else if(id.indexOf("[$$]CXJL") > -1) {
			wx.navigateTo({
				url: '../0chuxianjilu/0chuxianjilu?orderId=' + id.replace('[$$]CXJL', "")
			});
		} else if(id.indexOf("[$$]TBXX") > -1) {
			wx.navigateTo({
				url: '../0toubaoxinxi/0toubaoxinxi?orderId=' + id.replace('[$$]TBXX', "")
			});
		}

	}
})