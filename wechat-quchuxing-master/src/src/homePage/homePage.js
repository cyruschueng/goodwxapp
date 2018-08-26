import * as passenger_api from '../../js/passenger_api'
import * as driver_api from '../../js/driver_api'
import * as util from '../../js/utils'
import moment from '../../js/moment'

var app = getApp()

var animation = wx.createAnimation({
  duration: 900,
  timingFunction: 'ease'
})

Page({
	data:{
		userInfo: {},
		code_type: 'stroke',
		order_travel: [],
		attention: {},
		TravelNum: 0,
		pop_up_layer: true,
		pull_up_loading: false,
		user_page: 1,
		show_order_travel: [],
		startPoint: [0, 0],
		deleteAnimation: {},
		deleteAnimation_btn: {},
		delete_active: true,
		phone: ''
	},
	onShow(){
		wx.showLoading({
		  title: '加载中',
		})
		this.setData({
			order_travel: [],
			user_page: 1
		})
		const { phone } = this.data
		this.getUserInfo(phone)
	},
	onLoad(option){
		const { deviceInfo } = app.globalData.entities
		this.setData({
			width: deviceInfo.windowWidth,
			height: deviceInfo.windowHeight
		})
		let phone = option.selfPhone ? option.selfPhone : app.globalData.entities.loginInfo.phone
		option.selfPhone ? this.setData({
			phone: option.selfPhone
		}) : this.setData({
			phone: app.globalData.entities.loginInfo.phone
		})
	},
	getUserInfo(selfPhone){
		const { token } = app.globalData.entities.loginInfo
		driver_api.getUserInfo({data:{
			token: token,
			otherPhone: selfPhone
		}}).then(json => {
			let data = json.data.personalInfo
			this.setData({
				userInfo: data,
				isSelf: json.data.isSelf,
				selfPhone: json.data.OtherPhone
			})
			this.getMineTraval(token, 1)
			this.getFriendsItinerary(token, selfPhone)
		})
	},
	getFriendsItinerary(token, phone){
		const { isSelf } = this.data
		if(isSelf != 0){
			return
		}
		passenger_api.getFriendsItinerary({
			data: {
				token: token,
				phone: phone
			}
		}).then(json => {
			let data = json.data.othersTravel
			let new_array = []
			data && data.map(json => {
				new_array.push(json)
			})
			this.setData({
				order_travel: new_array
			})
		}).then(() => {
			wx.hideLoading()
		})
	},
	getMineTraval(token, page){
		const { user_page, order_travel, isSelf } = this.data
		if(isSelf != 1){
			return
		}
		passenger_api.getMineTraval({data:{
			token: token,
			pageNo: page ? page : user_page
		}}).then(json => {
			const { DriverTravel, orderTravel, passengerTravel, TravelNum } = json.data
			let new_order_travel = []
			DriverTravel && DriverTravel.map(data => {
				new_order_travel.push(data)
			})
			orderTravel && orderTravel.map(data => {
				new_order_travel.push(data)
			})
			passengerTravel && passengerTravel.map(data => {
				new_order_travel.push(data)
			})
			new_order_travel && new_order_travel.map(json => {
				if(json.surplusSeats != 0){
		          let seat_true = util.seats_true(json.seats - json.surplusSeats)
		          let seat_false = util.seats_false(json.surplusSeats)
		          json.seat_true = seat_true
		          json.seat_false = seat_false
		        }else{
		          let seat_true = util.seats_true(json.seats)
          		  json.seat_true = seat_true
		        }
				order_travel.push(json)
			})
			this.setData({
				order_travel: order_travel,
				TravelNum: TravelNum,
				pull_up_loading: false
			})
			wx.hideLoading()
		})
	},
	switch_code: function(e){
		const { token } = app.globalData.entities.loginInfo
		const { type } = e.currentTarget.dataset
		const { isSelf, selfPhone } = this.data
		this.setData({
			code_type: type
		})
		if(type == 'stroke'){
			if(isSelf == 1){
				this.getMineTraval(token, 1)
			}else{
				this.getFriendsItinerary(token, selfPhone)
			}
		}
		if(type == 'attention'){
			this.getAttentionList(token)
		}
	},
	getAttentionList(token){
		driver_api.getAttentionList({
			data: {
				token: token
			}
		}).then(json => {
			let attention = json.data.beattention
			this.setData({
				attention: attention,
				order_travel: []
			})
		})
	},
	deleteTraval: function(e){
		const { currentTarget: { dataset: { id } } } = e
		const { user_page, order_travel } = this.data
		const { token } = app.globalData.entities.loginInfo
		passenger_api.deleteTraval({
			data:{
				passengerTravelId: id,
				status: -1,
				token: token
			}
		}).then(json => {
			wx.showToast({
			  title: '取消匹配',
			  icon: 'success',
			  duration: 2000
			})
			let delete_index = order_travel.findIndex(json => json.PassengerTravelId == id)
			order_travel.splice(delete_index, 1)
			this.setData({
				order_travel: order_travel
			})
		})
	},
	gotoDetails: function(e){
		const travelId = e.currentTarget.dataset.travelid
		const { order_travel } = this.data
		let find_data = order_travel.find(json => json.travelId == travelId)
		let parmas = Object.assign({}, {end: find_data.end}, {start: find_data.start})
		util.setEntities({
			key: 'line_loc',
			value: parmas
		})
		wx.navigateTo({
        	url: `/src/match/match?type=owner&id=${travelId}&travelType=1`
      	})
	},
	toPayDetails: function(e){
		const travelId = e.currentTarget.dataset.travelid
		wx.navigateTo({
        	url: `/src/match/match?type=details&id=${travelId}&travelType=1`
      	})
	},
	gotoMatchPay: function(e){
		const id = e.currentTarget.dataset.id
		const { order_travel } = this.data
		let seat = order_travel && order_travel.find(json => json.PassengerTravelId == id).seats
		let startTimeTxt = order_travel && order_travel.find(json => json.PassengerTravelId == id).startTimeTxt
		wx.navigateTo({
        	url: `/src/match/match?type=passenger&id=${id}&seat=${seat}&&times=${startTimeTxt}&travelType=2`
      	})
	},
	gotoPay: function(e){
		const { order_travel } = this.data
		const id = e.currentTarget.dataset.id
		let price = order_travel && order_travel.find(json => json.travelId == id).price
		wx.navigateTo({
        	url: `/src/submitorder/confirmOrder?price=${price}`
      	})
	},
	// 弹出层
	openPopUpLayer: function(){
		this.setData({
			pop_up_layer: false
		})
	},
	closePopUpLayer: function(){
		this.setData({
			pop_up_layer: true
		})
	},
	gotoEditFormation: function(){
		const { selfPhone } = this.data
		wx.navigateTo({
        	url: `/src/editInformation/editInformation?phone=${selfPhone}`
      	})
		this.setData({
			pop_up_layer: true
		})
	},
	onShareAppMessage: function (res) {
		const { selfPhone } = this.data
		let self = this
	    return {
	      title: '我的主页',
	      path: `/src/homePage/homePage?selfPhone=${selfPhone}`,
	      success: function(res) {
	        // 转发成功
	        wx.showToast({
			  title: '转发成功',
			  icon: 'success',
			  duration: 2000
			})
	      },
	      fail: function(res) {
	        // 转发失败
	        wx.showToast({
			  title: '转发失败',
			  icon: 'success',
			  duration: 2000
			})
	      }
	    }
	},
	gotoMoneyDetails: function(){
		wx.navigateTo({
        	url: `/src/myPurse/myPurse`
      	})
		this.setData({
			pop_up_layer: true
		})
	},
	callCustomerService: function(){
		wx.makePhoneCall({
		  phoneNumber: '15890349336'
		})
	},
	gotoUserPage: function(e){
		const id = e.currentTarget.dataset.id
		util.setEntities({
          	key: 'other_phone',
         	value: id
      	})
		wx.redirectTo({
        	url: `/src/homePage/homePage?type=other`
      	})
	},
	signOut: function(){

	},
	setLocation: function(){
		let self = this
		wx.showModal({
		  title: '提示',
		  content: '设置家庭地址或者公司地址',
		  cancelText: '家庭地址',
		  confirmText: '公司地址',
		  confirmColor: '#000000',
		  success: function(res) {
		    if (res.confirm) {
		      wx.navigateTo({
                url: `/src/setAddress/setAddress`
              })
              util.setEntities({
                  key: 'address_type',
                  value: 'company'
              })
              self.setData({
              	pop_up_layer: true
              })
		    } else if (res.cancel) {
		      wx.navigateTo({
                url: `/src/setAddress/setAddress`
              })
              util.setEntities({
                  key: 'address_type',
                  value: 'home'
              })
              self.setData({
              	pop_up_layer: true
              })
		    }
		  }
		})
	},
	onReachBottom: function(){
		const { user_page } = this.data
		const { token } = app.globalData.entities.loginInfo
		let page = user_page + 1
		this.setData({
			pull_up_loading: true,
			user_page: page
		})
		this.getMineTraval(token)
	},
	deleteOfpage: function(e){
		const { currentTarget: { dataset: { id, orders_id, type } } } = e
		wx.navigateTo({
			url: `/src/homePage/deleteTravel?id=${id}&orders_id=${orders_id}&type=${type}`
		})
	},
	// 	console.log('执行了吗？？？？？？？？？')
	// 	this.setData({
	// 		order_travel: [],
	// 		user_page: 1
	// 	})
	// }
	// mytouchstart: function(e){
	// 	this.setData({
	// 		startPoint: [e.touches[0].pageX, e.touches[0].pageY]
	// 	})
	// },
	// mytouchmove: function(e){
	// 	let curPoint = [e.touches[0].pageX, e.touches[0].pageY]
	// 	const { currentTarget: { dataset: { id } } } = e
	// 	let { startPoint } = this.data
	// 	if(curPoint[0] <= startPoint[0]){
	// 		if(Math.abs(curPoint[0] - startPoint[0]) >= Math.abs(curPoint[1] - startPoint[1])){
	// 			let curPointNumber = Math.abs(curPoint[0] - startPoint[0]) - Math.abs(curPoint[1] - startPoint[1])
	// 			if(curPointNumber > 75){
	// 				let deleteAnimation = animation
	// 				let deleteAnimation_btn = animation
 //        			deleteAnimation.translateX(-100).step()
 //        			deleteAnimation_btn.opacity(1).step()
 //        			this.setData({
 //        				deleteAnimation: deleteAnimation.export(),
 //        				deleteAnimation_btn: deleteAnimation_btn.export(),
 //    					delete_active: false,
 //    					delete_id: id
 //        			})
	// 			}
	// 		}
	// 	}else{
	// 		if(Math.abs(curPoint[0] - startPoint[0]) >= Math.abs(curPoint[1] - startPoint[1])){
	// 			let curPointNumber = Math.abs(curPoint[0] - startPoint[0]) - Math.abs(curPoint[1] - startPoint[1])
	// 			if(curPointNumber > 75){
	// 				let deleteAnimation = animation
 //        			deleteAnimation.translateX(0).step()
 //        			this.setData({
 //        				deleteAnimation: deleteAnimation.export(),
 //    					delete_active: true,
 //    					delete_id: id
 //        			})
	// 			}
	// 		}
	// 	}
	// },
	// Refresh: function(){
	// 	const { order_travel } = this.data
	// 	let index = order_travel.findIndex(json => json.travelId == this.data.delete_id)
	// 	order_travel.splice(index, index)
	// 	this.setData({
	// 		order_travel: order_travel
	// 	})
	// }
})
