//index.js
//获取应用实例
const app = getApp()
let utils = require("../../utils/util.js")
let api = require("../../utils/api.js")
Page({
	data: {
		showPopup: false,
		areaList: [],
		areaInfo: {}
	},
	//显示目录列表
	showAreaList: function(){
		let popupComponent = this.selectComponent('.popup');
		popupComponent && popupComponent.show();
	},
	//获取目录列表
	getAreaList: function(){
		let that = this
		let params = {
			area_status: 1,
			page: 1,
			size: 200
		}
		utils.request({ url: api.areaList, data: params }, function (res) {
			that.setData({
				areaList: res.list
			})
		})
	},
	selectArea: function(e){
		let that = this
		let aid = e.currentTarget.dataset.id
		let params = {
			id: aid
		}
		utils.request({ url: api.areaInfo, data: params }, function (res) {
			app.globalData.areaInfo = res
			app.globalData.aid = aid

			that.setData({
				areaInfo: res
			})
		})
	},
	//拨打电话
	makePhoneCall: function (e) {
		let phone = e.currentTarget.dataset.phone
		if (phone.length > 0) {
			wx.makePhoneCall({
				phoneNumber: phone
			})
		}
	},
	onLoad: function () {
		//从全局获取区域信息
		this.setData({
			areaInfo: app.globalData.areaInfo
		})

		this.getAreaList()
	},
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
			title: '啪啪运动资源商城',
			path: '/pages/cooperation/cooperation?aid=' + aid,
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
