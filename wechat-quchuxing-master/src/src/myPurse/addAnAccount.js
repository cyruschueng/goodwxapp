import * as passenger_api from '../../js/passenger_api'
import * as driver_api from '../../js/driver_api'
import * as util from '../../js/utils'

var app = getApp()

Page({
	data: {
		account: ''
	},
	onLoad(){

	},
	getMonelyv: function(e){
		 let value = e.detail.value
		 this.setData({
		 	account: value
		 })
	},
	postMoneylv: function(){
		const { token } = app.globalData.entities.loginInfo
		const { account } = this.data
		driver_api.postMoneylv({
			data: {
				token: token,
				aliPay: account
			}
		}).then(json => {
			wx.showToast({
			  title: '设置成功',
			  icon: 'success',
			  duration: 2000
			})
			setTimeout(() => {
				wx.navigateBack({
				  delta: 1
				})
			}, 2000)
		})
	}
})