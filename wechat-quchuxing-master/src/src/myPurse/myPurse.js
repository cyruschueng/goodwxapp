import * as passenger_api from '../../js/passenger_api'
import * as driver_api from '../../js/driver_api'
import * as util from '../../js/utils'

var app = getApp()

Page({
	data: {
		money_order: {}
	},
	onShow(){
		this.getMoneyDetails()
	},
	onLoad(){
		this.getMoneyDetails()
	},
	getMoneyDetails(){
        const { token } = app.globalData.entities.loginInfo
		driver_api.getMoneyDetails({
			data: {
				token: token
			}
		}).then(json => {
			let money_order = json.data
			this.setData({
				money_order: money_order
			})
		})
	},
	withdraw: function(){
		const { money_order } = this.data
		if(money_order.aliPay == null){
			wx.showModal({
			  title: '提示',
			  content: '你还未设置提现账号',
			  confirmText: '去设置',
			  cancelText: '暂不设置',
			  success: function(res) {
			    if (res.confirm) {
			      	wx.navigateTo({
			        	url: `/src/myPurse/addAnAccount`
			      	})
			    } else if (res.cancel) {
			      console.log('用户点击取消')
			    }
			  }
			})
			return
		}
		if(money_order.moneyCard <= 0){
			wx.showModal({
			  title: '提示',
			  content: '余额不足',
			  showCancel: false,
			  success: function(res) {
			    if (res.confirm) {
			      console.log('用户点击确定')
			    }
			  }
			})
			return
		}
		wx.showModal({
		  title: '提示',
		  content: '提现功能暂未开通,请前往趣出行App进行提现',
		  showCancel: false,
		  success: function(res) {
		    if (res.confirm) {
		      console.log('用户点击确定')
		    }
		  }
		})
	},
	setWithdraw: function(){
		wx.navigateTo({
        	url: `/src/myPurse/addAnAccount`
      	})
	}
})