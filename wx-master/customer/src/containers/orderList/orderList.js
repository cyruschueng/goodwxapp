import Colin from "../../assets/js/public.js"
import {
	ajax
} from '../../../utils/util.js';
var app = getApp();
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		orderList: [],

		id: '34324234',
		tokenList: [],
		hideHeader: true,
		hideBottom: true,
		refreshTime: '', // 刷新的时间
		contentlist: [], // 列表显示的数据源
		allPages: '', // 总页数
		currentPage: 1, // 当前页数  默认是1
		loadMoreData: '上拉加载更多',
		//		控件用
		scrollTop: 0,
		windowHeight: 0,
		pageIndex: 1,
		fullListSize: 0,
		pullUpLoadFlag: true
			//		allowPullDown:true,
			//		allowPullUp:true
	},
	onLoad: function(options) {
		var self = this;
		//渲染页面
		wx.getSystemInfo({
			success: function(res) {
				self.setData({
					windowHeight: res.windowHeight,
					windowWidth: res.windowWidth
				})
			}
		});
	},
	doSearchList: function() {
		var self = this;
		ajax({
			url: '/do/customer/receiveCarOrder/queryReceiveCarOrderList',
			data: {
				pageIndex: this.data.pageIndex
			},
			success: function(res) {
				var data = res;
				//console.log(data);
				if(data.resultCode == "1") {
					wx.hideToast();
					var resultObject = data.resultObject;
					var fullListSize = resultObject.fullListSize;
					self.setData({
						orderList: self.data.orderList.concat(resultObject.orderList),
						fullListSize: resultObject.fullListSize
					});
					if(self.data.orderList.length == fullListSize) {
						self.setData({
							loadMoreData: ''
						});
					}
				} else if(data.resultCode == "2") {
					wx.hideToast();
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
			},
			complete: function() {
				self.setData({
					pullUpLoadFlag: true
				});
			}
		});
	},
	onReady: function() {
		// 页面渲染完成
	},
	onShow: function() {
		// 页面显示
		//查询列表
		this.setData({
			orderList:[]
		});
		this.doSearchList();
	},
	// 下拉刷新
	refresh: function(e) {
		var self = this;
		console.log('下拉刷新');
		//		setTimeout(function() {
		//			console.log('下拉刷新');
		//			self.setData({
		//				scrollTop: 80 / 750 * self.data.windowWidth
		//			});
		//		}, 300);
	},
	//上拉刷新
	pullUpLoad: function(e) {
		var self = this;
		if(this.data.pullUpLoadFlag) {
			if(self.data.pageIndex * 10 <= this.data.fullListSize) {
				var pageIndex = parseInt(self.data.pageIndex) + 1;
				self.setData({
					pageIndex: pageIndex,
					pullUpLoadFlag: false
				});
				this.doSearchList();
			}
		}

	},
	scroll: function(event) {
		var that = this;
		that.setData({
			scrollTop: event.detail.scrollTop
		});
	},
	itemClick: function(event) {
		var dataset = event.currentTarget.dataset;

		wx.navigateTo({
			url: '../orderDetail/orderDetail?id=' + dataset.itemid
		});
	}
})
