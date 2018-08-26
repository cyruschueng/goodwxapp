import * as passenger_api from '../../js/passenger_api'
import * as driver_api from '../../js/driver_api'
import * as util from '../../js/utils'

var app = getApp()

Page({
	data: {
		group_id: null,
		pass_len: 0
	},
	onLoad(option){
		let group_id = option.id
		let location = option.location
		this.setData({
			group_id: group_id,
			location: location
		})
	},
	submit:function(){
		const { group_id, location, password } = this.data
		const { phone } = app.globalData.entities.loginInfo
		driver_api.postJoinGroup({
			data: {
				phone: phone,
				location: location,
				groupPwd: password,
				groupId: group_id
			}
		}).then(json => {
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
				wx.redirectTo({
					url: `/src/group/groupIndex?id=${group_id}`
				})
			}
		})
	},
	getPassword: function(e) {
		this.setData({
			password: e.detail.value,
			pass_len: e.detail.cursor
		})
	}
})