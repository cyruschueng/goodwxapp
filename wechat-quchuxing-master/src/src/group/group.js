import * as passenger_api from '../../js/passenger_api'
import * as driver_api from '../../js/driver_api'
import * as util from '../../js/utils'
import moment from '../../js/moment'
import * as amapFile from '../../js/amap-wx'

var app = getApp()
var myAmapFun = new amapFile.AMapWX({key:'35d96308ca0be8fd6029bd3585064095'})
Page({
	data: {
		nearbyGroup: [],
		myGroup: [],
		adminType: 0
	},
	onShow(){
		if(this.data.location){
			const { phone } = app.globalData.entities.loginInfo
			const { location } = this.data
			this.getMyGroupList(location, phone)
			this.getNearTheGroup(location)
		}
	},
	onLoad(){
		wx.showLoading({
		  title: '加载中',
		})
		const { adminType } = app.globalData.entities.loginInfo
        let self = this
		myAmapFun.getRegeo({
          success:function(data){
          	let loc = data[0].regeocodeData.addressComponent.streetNumber.location
			const { phone } = app.globalData.entities.loginInfo
			self.getMyGroupList(loc, phone)
			self.setData({
				location: loc,
				adminType: adminType
			})
          },
          fail:function(e){
            wx.showToast({
              title: '获取位置失败',
              icon: 'success',
              duration: 2000
            })
          }
        })
	},
	getNearTheGroup(loc){
		const { phone } = app.globalData.entities.loginInfo
		driver_api.getNearTheGroup({data:{
			location: loc,
			phone: phone,
			distance: 5000
		}}).then(json => {
			let data = json.data.result
			data && data.map(json => {
				let new_name = json.GroupName.substr(0, 1)
				json.new_name = new_name
			})
			this.setData({
				nearbyGroup: data
			})
			wx.hideLoading()
		})
	},
	getMyGroupList(loc, phone){
		driver_api.getMyGroupList({
			data: {
				phone: phone
			}
		}).then(json => {
			let data = json.data.result
			data && data.map(json => {
				let new_name = json.groupName.substr(0, 1)
				json.new_name = new_name
			})
			this.setData({
				myGroup: data
			})
			this.getNearTheGroup(loc)
		})
	},
	creatGroup:function(){
		wx.navigateTo({
			url: `/src/group/creatGroup`
		})
	},
	postJoinGroup: function(e){
		const { currentTarget: { dataset: { id, active } } } = e
		const { location } = this.data
		if(active){
			wx.navigateTo({
				url: `/src/group/groupPassword?id=${id}&location=${location}`
			})
		}else{
			const { phone } = app.globalData.entities.loginInfo
			driver_api.postJoinGroup({
				data: {
					phone: phone,
					location: location,
					groupId: id
				}
			}).then(json => {
				console.log(json,'-----------------json')
				const { result } = json.data.result
				if(result == -109){
					wx.showModal({
		              title: '提示',
		              content: '密码错误',
		              showCancel: false,
		              success: function(res) {
		                if (res.confirm) {
		                  console.log('用户点击确定')
		                }
		              }
		            })
				}else if(result == 1){
					wx.navigateTo({
						url: `/src/group/groupIndex?id=${id}&&location=${location}`
					})
				}
			})
		}
	},
	gotoMyGroup: function(e){
		const { location } = this.data
		const { currentTarget: { dataset: { id } } } = e
		wx.navigateTo({
			url: `/src/group/groupIndex?id=${id}&&location=${location}`
		})
	}
})
