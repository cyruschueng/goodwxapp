// pages/sourceList.js

//获取应用实例
const app = getApp()
let utils = require("../../utils/util.js")
let api = require("../../utils/api.js")
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		showtab: 0,  //顶部选项卡索引
		typeId: '',
		tabnav: {
			tabnum: 4,
			tabitem: []
		},
		brandsIndex: '',
		brandsId: '',
		brandsList: [],
		supplyList: [],
		reachBottomText: '上拉加载更多...',
		supplyPage: 1,
		supplySize: 6,
		supplyTotal: 6
	},
	//获取分类
	getCateList: function () {
		let that = this
		let params = {
			type_status: 1, 
			page: 1, 
			size: 200
		}
		utils.request({url: api.typeList, data: params }, function (res) {
			that.setData({
				tabnav: {
					tabnum: 4,
					tabitem: res.list
				}
			})

			that.getBrandsList()
		})
	},
	// 分类选择
	typeSeclect: function (e) {
		let that = this
		let eData = e.currentTarget.dataset

		setTimeout(function(){
			that.setData({
				showtab: eData.index,
				typeId: eData.id,
				supplyList: [],
				reachBottomText: '',
				supplyPage: 1,
				supplyTotal: 6
			})
			that.getBrandsList()
		},0)
	},
	//获取品牌
	getBrandsList: function () {
		let that = this
		let params = {
			supply_type: that.data.typeId,
			brands_status: 1, 
			page: 1, 
			size: 200
		}
		utils.request({url: api.brandsList, data: params}, function (res) {
			that.setData({
				brandsId: '',
				brandsList: res.list
			})

			that.getSupplyList()
		})
	},
	// 品牌选择
	brandsSelect: function (e) {
		let that = this
		let eData = e.currentTarget.dataset
		that.setData({
			brandsId: eData.id,
			brandsIndex: eData.index
		})

		setTimeout(function () {
			that.setData({
				brandsId: eData.id,
				supplyList: [],
				reachBottomText: '',
				supplyPage: 1,
				supplyTotal: 6
			})
			that.getSupplyList()
		}, 0)
	},
	//获取资源列表
	getSupplyList: function () {
		let that = this
		if (that.data.supplyTotal / that.data.supplySize < that.data.supplyPage - 1) {
			that.setData({
				reachBottomText: '- 讨厌，到底啦 -'
			})
			return false
		}
		let params = {
			area_id: app.globalData.aid,
			supply_status: 1,
			page: that.data.supplyPage,
			size: that.data.supplySize
		}
		if (that.data.typeId != ''){
			params.type_id = that.data.typeId
		}
		if (that.data.brandsId != '') {
			params.brands_id = that.data.brandsId
		}
		utils.request({url: api.supplyList, data: params}, function (res) {
			if (res.total == 0){
				that.setData({
					reachBottomText: '- 空空如也 -'
				})
				return false
			}
			that.setData({
				supplyList: that.data.supplyList.concat(res.list),
				supplyPage: that.data.supplyPage + 1,
				supplyTotal: res.total,
				reachBottomText: '上拉加载更多...'
			})
		})
	},
	goSourceDetail: function (e) {
		let id = e.currentTarget.dataset.id
		wx.navigateTo({
			url: '/pages/sourceDetail/sourceDetail?id=' + id
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			typeId: options.id
		})
		this.getCateList()
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {
		this.getSupplyList()
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function (res) {
		let that = this
		let aid = app.globalData.aid
		// 当用户将小程序转发到任一群聊之后，可以获取到此次转发的 shareTicket，此转发卡片在群聊中被其他用户打开时，可以在 App.onLaunch() 或 App.onShow 获取到另一个 shareTicket
		wx.showShareMenu({
			withShareTicket: true
		})
		//右上角转发from:'menu'
		if (res.from === 'button') {
			// 来自页面内转发按钮
			//console.log(res.target)
		}
		return {
			title: '资源列表',
			path: '/pages/cooperation/cooperation?id=' + that.data.typeId + '&aid=' + aid,
			success: function (res) {
				// 转发成功
				//console.log(res)
				//获取转发信息
				wx.getShareInfo({
					shareTicket: res.shareTickets[0],
					success: function (_res) {
						// encryptedData: ""      包括敏感数据在内的完整转发信息的加密数据
						// errMsg: "getShareInfo:ok"        信息
						// iv: ""          加密算法的初始向量
						console.log(_res)
					},
					fail: function (_res) {
						console.log(_res)
					}
				})
			},
			fail: function (res) {
				// 转发失败
				console.log(res)
			}
		}
	}
})