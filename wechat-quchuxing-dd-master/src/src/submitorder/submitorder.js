import * as passenger_api from '../../js/passenger_api'
import * as driver_api from '../../js/driver_api'
import * as util from '../../js/utils'
import moment from '../../js/moment'
import { SUBMIT_WXPAY } from '../../js/constants'

var app = getApp()

Page({
	data: {
		seat: [],
		price: 0,
		submit_price: 0,
		insurance: false
	},
	onLoad(options){
		const {order_info} = app.globalData.entities
		let order = order_info ? order_info : options
		let seat = util.seats(order.bookSeats)
		seat.map((json, index) => {
    	if(index == order.bookSeats - 1){
    		json.type = true
    	}else{
    		json.type = false
    	}
    })
		this.setData({
			price: order.price,
			mine_seat: order.bookSeats,
			travelId: order.travelId,
			submit_price: order.price * order.bookSeats,
			people_id: order.passengerTravelId,
			seat: seat,
			sharePhone: order.sharePhone,
			share_type: order.share_type
		})
	},
	selectSeat:function(e){
        const { currentTarget: { dataset: { id } } } = e
        const { seat, price, insurance } = this.data
        let new_price = 0
        seat.map((json, index) => {
        	if(index == id){
        		json.type = true
        		new_price = json.number * price
        	}else{
        		json.type = false
        	}
        })
        this.setData({
        	seat: seat,
        	submit_price: insurance ? new_price + 1 : new_price
        })
	},
	switchChange: function (e){
	    const { submit_price } = this.data
	    let type = e.detail.value
	    this.setData({
	    	insurance: type,
	    	submit_price: type ? submit_price + 1 : submit_price - 1
	    })
	},
	submit:function(){
		const { submit_price, travelId, seat, price, insurance, people_id, sharePhone, share_type } = this.data
		let mine_seat = seat.find(json => json.type == true).number
		const { token, openId } = app.globalData.entities.loginInfo
		passenger_api.postPay({
			data: {
				token: token,
				bookSeats: mine_seat,
				buyingSafety: insurance,
				isWX: true,
				openid: openId,
				travelId: travelId,
				sharerPhone: sharePhone
			}
		}).then(json => {
			let data = json.data
			if(data.status != 200){
				wx.showModal({
				  title: '提示',
				  content: SUBMIT_WXPAY[data.status],
				  showCancel: data.status == -1 ? true : false,
					confirmText: data.status == -1 ? '去登录' : '确定',
				  success: function(res) {
				    if (res.confirm && data.status == -1) {
							wx.navigateTo({
				        url: `/src/login/login`
				      })
				    }else{
							console.log('用户点击确定')
						}
				  }
				})
				return
			}
			wx.setStorageSync('pay_datails', data)
			util.setEntities({
	      key: 'setTimeNumber',
	      value: 180
	    })
			wx.redirectTo({
				url: `/src/submitorder/confirmOrder?price=${price}&sharePhone=${sharePhone}&share_type=${share_type}`
			})
		})
	}
})
