import * as passenger_api from '../../js/passenger_api'
import * as driver_api from '../../js/driver_api'
import * as util from '../../js/utils'
import moment from '../../js/moment'

var app = getApp()


Page({
	data: {
		orders: {},
		passenger: []
	},
	onLoad(option){
		this.getOrderInfo(option.id)
		if(option.orders_id){
			this.setData({
				orders_id: option.orders_id
			})
		}
		this.setData({
			type: option.type
		})
	},
	getOrderInfo(id){
		const { phone } = app.globalData.entities.loginInfo
		let parmas = Object.assign({}, {travelId: id}, { phone: phone })
		driver_api.getOrderInfo({data: parmas}).then(json => {
			let data = json.data.travel
			data.tembleTime = moment(data.tembleTime).toDate().pattern('MM月dd日 HH:ss')
			data.seats = json.data.travel.seat - json.data.travel.surplusSeats
			this.setData({
				orders: json.data.travel,
				travel_id: json.data.travelId,
				passenger: json.data.travel.passengers
			})
		})
	},
	deleteOverTraveId: function(e){
		const { travel_id } = this.data
		const { token } = app.globalData.entities.loginInfo
		wx.showModal({
		  title: '提示',
		  content: '确认删除此行程吗？',
		  success: function(res) {
		    if (res.confirm) {
		  		driver_api.deleteOverTravel({
					data:{
						token: token,
						travelId: travel_id
					}
				}).then(json => {
					if(json.data.status == 200){
						 wx.showToast({
						  title: '已删除',
						  icon: 'success',
						  duration: 2000
						})
						 setTimeout(() => {
							wx.navigateBack({
							  delta: 1
							})
						 }, 1500)
					}
				})
		    } else if (res.cancel) {
		      console.log('用户点击取消')
		    }
		  }
		})
	},
	passengerDeleteTravel: function(e){
		const { orders_id } = this.data
		const { token } = app.globalData.entities.loginInfo
		wx.showModal({
		  title: '提示',
		  content: '确认删除此行程吗？',
		  success: function(res) {
		    if (res.confirm) {
		  		passenger_api.passengerDeleteTravel({
					data:{
						token: token,
						ordersTravelId: orders_id
					}
				}).then(json => {
					if(json.data.status == 200){
						 wx.showToast({
						  title: '已删除',
						  icon: 'success',
						  duration: 2000
						})
						 setTimeout(() => {
							wx.navigateBack({
							  delta: 1
							})
						 }, 1500)
					}
				})
		    } else if (res.cancel) {
		      console.log('用户点击取消')
		    }
		  }
		})
	},
	callCustomerService: function(){
	    wx.makePhoneCall({
	      phoneNumber: '15890349336'
	    })
	}
})