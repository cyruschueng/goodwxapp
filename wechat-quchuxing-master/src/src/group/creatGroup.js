import * as passenger_api from '../../js/passenger_api'
import * as driver_api from '../../js/driver_api'
import * as util from '../../js/utils'

var app = getApp()

Page({
	data:{
		address: '',
		group_active: ['选择群类别', '家庭', '公司', '会议'],
		group_active_index: 0,
		password: null,
		name: ''
	},
	onLoad(option){
		const { keywords, location, name } = option
		this.setData({
			location: location,
			address: keywords,
			name: name
		})
	},
	getAddress:function(){
		const { name } = this.data
		wx.navigateTo({
			url: `/src/setAddress/searchAddress?id=group&name=${name}`
		})
	},
	bindGroupChange: function(e) {
		this.setData({
			group_active_index: e.detail.value
		})
	},
	getName: function(e) {
		this.setData({
			name: e.detail.value
		})
	},
	getPassword: function(e) {
		this.setData({
			password: e.detail.value
		})
	},
	submit: function(){
		const { token } = app.globalData.entities.loginInfo
		const { location, name, password, group_active, group_active_index, address } = this.data
		if(!name){
			wx.showModal({
			  title: '提示',
			  content: '请输入群名称',
			  showCancel: false,
			  success: function(res) {
			    if (res.confirm) {
			      console.log('用户点击确定')
			    }
			  }
			})
			return
		}

		if(!address){
			wx.showModal({
			  title: '提示',
			  content: '请输入群地址',
			  showCancel: false,
			  success: function(res) {
			    if (res.confirm) {
			      console.log('用户点击确定')
			    }
			  }
			})
			return
		}
		if(group_active_index == 0){
			wx.showModal({
			  title: '提示',
			  content: '请选择正确的群类型',
			  showCancel: false,
			  success: function(res) {
			    if (res.confirm) {
			      console.log('用户点击确定')
			    }
			  }
			})
			return
		}
		let new_Location = location.split(',').map(json => Number(json))
		let parmas = Object.assign({}, {token: token}, {groupName: name}, {groupPwd: password}, {groupLocation: new_Location}, {type: group_active_index - 1}, {groupAddress: address})
		driver_api.creatGroup({data: parmas}).then(json => {
			wx.showToast({
			  title: '创建成功',
			  icon: 'success',
			  duration: 2000
			})
			setTimeout(() => {
				wx.redirectTo({
				  url: `/src/group/group`
				})
			}, 2000)
		})
	}
})