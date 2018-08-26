import * as passenger_api from '../../js/passenger_api'
import * as driver_api from '../../js/driver_api'
import * as util from '../../js/utils'
import moment from '../../js/moment'
import * as amapFile from '../../js/amap-wx'

var app = getApp()
var myAmapFun = new amapFile.AMapWX({key:'35d96308ca0be8fd6029bd3585064095'})
Page({
	data:{
		    video_width: 0,
        video_height: 0,
        latitude: 39.5427,
        longitude: 116.2317,
        isMatchingTravel: 0,
        isMatch: false,
        match_cars: [],
        matchCar: {},
        car_id: null,
        match_active: 'car',
        startLocation: [],
        code_type: 'owner',
        orderInfo: {},
        booked_active: 'shun',
        shunPassengers: [],
        people_info: [],
        people_id: null,
        attention_status: 0,
        passenger_details: [],
        passenger_info: {},
        templeTime: '',
        travelId: null,
        tembleTime_active: false,
        passenger_up_type: false,
        left_text: '>>>',
        right_text: '<<<',
        title_details: {}
	},
	onLoad(option){
    let self = this
    const { deviceInfo, locationGao } = app.globalData.entities

    this.setData({
      video_width: deviceInfo.windowWidth,
      video_height: deviceInfo.windowHeight
    })
    this.initData(option)
	},
	initData(option){
		let { type, id, seat, times, travelType } = option
    const { token } = app.globalData.entities.loginInfo
    this.setData({
      match_id: id,
      seat: seat,
      code_type: type,
      options: option
    })
		if(type == 'passenger'){
			this.postMatchCompany(id, token)
		}
    if(type == 'owner'){
      const { line_loc } = app.globalData.entities
      this.postMatchPeople(id, token, type)
    }
		if(type == 'details'){
    	const { order_info } = app.globalData.entities
      if(order_info){
  			 this.getOrderInfo(order_info.travelId)
      }else{
         this.getOrderInfo(id)
      }
		}
    this.travelDetails(id, travelType)
	},
  travelDetails: function(id, travelType){
    console.log()
    const { token } = app.globalData.entities.loginInfo
    passenger_api.travelDetails({data: {
      token: token,
      travelId: id,
      travelType: travelType
    }}).then(json => {
      let data = json.data.details
      data.time = moment(data.time).toDate().pattern('MM月dd日 HH:mm')
      this.setData({
        title_details: data,
        latitude: data.start[1],
        longitude: data.start[0],
        startAddress: data.startLocation,
        startLocation: data.start
      })
      this.getLine(data.start, data.end)
    })
  },
	//  乘客匹配车主
	postMatchCompany(id, token){
    let parmas = Object.assign({}, {token: token}, {passengerTravelId: id}, {pageNum: 1})
    passenger_api.postMatchCompany({data: parmas}).then(json => {
      const { matchTravel } = json.data
      let data = json.data.matchTravel.travelResults
      data && data.map(json => {
        if(json.surplusSeats != 0){
          let seat_true = util.seats_true(json.seats - json.surplusSeats)
          let seat_false = util.seats_false(json.surplusSeats)
          json.seat_true = seat_true
          json.seat_false = seat_false
        }else{
          let seat_true = util.seats_true(json.seats)
          json.seat_true = seat_true
        }
      })
      this.setData({
        isMatchingTravel: matchTravel.isMatchingTravel,
        isPost_travel: matchTravel.isFalse,
        match_cars: data
      })
      if(data.length != 0){
        this.matchCarsInfo(null, data[0].travelId)
      }
    }, e=>{
      wx.showToast({
        title: '匹配失败',
        icon: 'success',
        duration: 2000
      })
    })
	},
	matchCarsInfo(e, car_id){
	    const { match_cars } = this.data
	    let id =  e ? e.currentTarget.dataset.id : car_id
	    let new_match = match_cars.find(data => data.travelId == id)
	    this.setData({
	      matchCar: new_match,
	      car_id: id
	    })
	},
	matchCar:function(){
    const { token } = app.globalData.entities.loginInfo
    const {match_id} = this.data
    this.postMatchCompany(match_id, token)
		this.setData({
		  match_active: 'car'
		})
	},
	matchPeople:function(){
    const { token } = app.globalData.entities.loginInfo
    const {match_id, code_type} = this.data
    this.postMatchPeople(match_id, token, code_type)
		this.setData({
		  match_active: 'people'
		})
	},
  	// 乘客or车主匹配乘客
	postMatchPeople(travelId, token, type){
		let role = 0
    switch (type)
    {
      case 'passenger':
        role = 0
      break;
      case 'owner':
        role = 1
      break;
    }
		let parmas = Object.assign({}, { token: token }, { role: role }, { travelId: travelId }, { pageNum: 1 })
	  passenger_api.postMatchPeople({data: parmas}).then(json => {
	    // 匹配过程处理
      const { isMatch, matchTravelPassengers } = json.data.matchTravelPassengers
      if(matchTravelPassengers.length != 0){
        this.setData({
          isMatch: isMatch,
          shunPassengers: matchTravelPassengers
        })
        this.peopleDetails(null, matchTravelPassengers[0].passengerTravelId)
      }
	  }, e=>{
	    wx.showToast({
	      title: '匹配失败',
	      icon: 'success',
	      duration: 2000
	    })
	  })
	},
  peopleDetails(e, people_id){
    const { shunPassengers } = this.data
    let id = e ? e.currentTarget.dataset.id : people_id
    let new_match = shunPassengers.find(data => data.passengerTravelId == id)
    this.setData({
      people_info: new_match,
      people_id: new_match.passengerTravelId,
      people_phone: new_match.phone
    })
  },
  callPeoplePhone: function(){
    const { people_phone } = this.data
    wx.makePhoneCall({
      phoneNumber: String(people_phone) 
    })
  },
	submitOrder:function(){
		const { seat, car_id, matchCar, match_id, isPost_travel } = this.data
    if(isPost_travel == 1){
      wx.showModal({
        title: '提示',
        content: '座位已满',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return
    }
		let parmas = Object.assign({}, {passengerTravelId: match_id}, {bookSeats: Number(seat)}, {travelId: car_id}, { price: matchCar.price })
		util.setEntities({
      key: 'order_info',
      value: parmas
    })
    wx.redirectTo({
      url: `/src/submitorder/submitorder`
    })
	}, 
	getOrderInfo(id){
		const { phone } = app.globalData.entities.loginInfo
		let parmas = Object.assign({}, {travelId: id}, { phone: phone })
		driver_api.getOrderInfo({data: parmas}).then(json => {
			let data = json.data
      if(moment().isBefore(moment(data.travel.tembleTime))){
        this.setData({
          passenger_up_type: true
        })
      }
			this.setData({
				orderInfo: data.travel,
        pay_order_travelId: id
			})
		})
	},
  // 车主匹配切换按钮
  booked(){
    const {match_id} = this.data
    const { token } = app.globalData.entities.loginInfo
    this.getBookedPeople(match_id)
    this.setData({
      booked_active: 'car',
      travelId: match_id
    })
  },
  shun_passengers(){
    const { token } = app.globalData.entities.loginInfo
    const {match_id, code_type} = this.data
    this.postMatchPeople(match_id, token, code_type)
    this.setData({
      booked_active: 'shun'
    })
  },
  getBookedPeople(id){
    const { phone, token } = app.globalData.entities.loginInfo
    driver_api.getOrderInfo({
      data: {
        travelId: id,
        phone: phone
      }
    }).then(json => {
      let passenger_info = json.data.travel.passengers
      let travel_data = json.data.travel
      travel_data.travelId = json.data.travelId
      if(moment().isBefore(moment(travel_data.tembleTime))){
        this.setData({
          tembleTime_active: true
        })
      }
      this.setData({
        passenger_details: passenger_info,
        templeTime: json.data.travel.startTime,
        travel_order: travel_data,
        car_travel_active: moment().isBefore(moment(json.data.travel.tembleTime).add(30, 'm'))
      })
      if(passenger_info.length != 0){
        this.getPassengerInfo(null, passenger_info[0].phone)
      }
    })
  },
  getLine(start, end){
    const { token } = app.globalData.entities.loginInfo
    const { title_details } = this.data
    let parmas = Object.assign({}, { token: token }, { start: start }, { end: end }, { strategy: title_details.strategy ? title_details.strategy : 0 })
    driver_api.getLine({data: parmas}).then(json => {
      let data = json.data.routes
      this.setData({
        samll_markers: [{
          iconPath: '../../images/icon_map_star@3x.png',
          id: 0,
          longitude: start[0],
          latitude: start[1],
          width: 32,
          height: 50
        },{
          iconPath: '../../images/icon_map_end@3x.png',
          id: 1,
          longitude: end[0],
          latitude: end[1],
          width: 32,
          height: 50
        }],
        polyline: [{
          points: data.route,
          color:"#57AD68",
          width: 10,
          dottedLine: false,
          arrowLine: true,
          borderColor: '#458A53',
          borderWidth: 1
        }]
      })
    })
  },
  getPassengerInfo:function(e, id){
    let passenger_id = e ? e.currentTarget.dataset.id : id
    const { passenger_details } = this.data
    let new_match = passenger_details.find(data => data.phone == passenger_id)
    this.setData({
      passenger_info: new_match,
      passenger_info_id: new_match.phone
    })
  },
  // 关注
  attention: function(e){
    const { attention_status, matchCar } = this.data
    const { token } = app.globalData.entities.loginInfo
    let type = attention_status == 0 ? 1 : 0
    let parmas = Object.assign({}, {token: token}, { attentione: matchCar.driverPhone }, {status: type}, { formId: e.detail.formId })
    driver_api.postAttention({data: parmas}).then(json => {
      this.setData({
        attention_status: json.data.status
      })
    })
  },
  go_car_phone: function(){
    const { matchCar } = this.data
    wx.makePhoneCall({
      phoneNumber: String(matchCar.driverPhone) 
    })
  },
  gotoPassengerPhone: function(){
    const { passenger_info } = this.data
    wx.makePhoneCall({
      phoneNumber: String(passenger_info.phone) 
    })
  },
  shareRemaining:function(){

  },
  onShareAppMessage: function (res) {
    const { title_details } = this.data
    const type = res.target.dataset.id
    let title = ''
    if(type === 'share'){
      title = '趣出行'
    }else if(type === 'owner_share'){
      title = '我的行程 ' + title_details.time + ' ' + title_details.startLocation + ' ---> ' + title_details.endLocation
    }else if(title === 'passenger_share'){
      title = '我的行程 ' + title_details.time + ' ' + title_details.startLocation + ' ---> ' + title_details.endLocation
    }
    return {
      title: title,
      path: `/src/index`,
      success: function(res) {
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function(res) {
        wx.showToast({
          title: '分享失败',
          icon: 'success',
          duration: 2000
        })
      }
    }
  },
  nav_up: function(){
    const { orderInfo } = this.data
    let latitude = orderInfo.start[1]
    let longitude = orderInfo.start[0]
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      name: orderInfo.startAddress,
      scale: 28
    })
  },
  nav_down: function(){
    const { orderInfo } = this.data
    let latitude = orderInfo.end[1]
    let longitude = orderInfo.end[0]
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      name: orderInfo.endAddress,
      scale: 28
    })
  },
  updateTravel: function(e){
    const { token } = app.globalData.entities.loginInfo
    const { travel_order } = this.data
    wx.showModal({
      title: '提示',
      content: '确定结束行程吗？',
      success: function(res) {
        if (res.confirm) {
          driver_api.updateTravel({
            data: {
              token: token,
              travelId: travel_order.travelId
            }
          }).then(json => {
            wx.showToast({
              title: '完成行程',
              icon: 'success',
              duration: 2000
            })
            setTimeout(() => {
              wx.reLaunch({
                url: `/src/index`
              })
            }, 2000)
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  startCar:function(e){
    const { currentTarget: { dataset: { id } } } = e
    const { token } = app.globalData.entities.loginInfo
    driver_api.startCar({
      data: {
        travelId: id,
        token: token
      }
    }).then(json => {
      wx.showToast({
        title: '已出发',
        icon: 'success',
        duration: 2000
      })
    })
  },
  invitationToBoard: function(){
    const { token } = app.globalData.entities.loginInfo
    const { match_id, people_phone } = this.data
    driver_api.sharePropleUpCar({
      data: {
        token: token,
        passengerPhone: people_phone,
        travelId: match_id
      }
    }).then(json => {
      wx.showToast({
        title: '已发出邀请',
        icon: 'success',
        duration: 2000
      })
      this.booked()
    })
  },
  passenger_cancel: function(e){
    const { token } = app.globalData.entities.loginInfo
    const { orderInfo } = this.data
    wx.showModal({
      title: '提示',
      content: '确定取消行程吗？',
      success: function(res) {
        if (res.confirm) {
          passenger_api.deletePeopleTravel({
            data: {
              token: token,
              ordersTravelId: orderInfo.ordersTravelId,
              refundReason: '小程序退款'
            }
          }).then(json => {
            wx.showToast({
              title: '取消成功',
              icon: 'success',
              duration: 2000
            })
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
            }, 2000)
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  passengerDown: function(){
    const { token } = app.globalData.entities.loginInfo
    const { orderInfo } = this.data
    wx.showModal({
      title: '提示',
      content: '确定完成行程吗？',
      success: function(res){
        if (res.confirm) {
          passenger_api.passengerDown({
            data: {
              token: token,
              ordersTravelId: orderInfo.ordersTravelId
            }
          }).then(json => {
            wx.showToast({
              title: '已完成行程',
              icon: 'success',
              duration: 2000
            })
            setTimeout(() => {
              wx.reLaunch({
                url: `/src/index`
              })
            }, 1500)
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  //标记车主迟到
  markedLate(){
    const { token } = app.globalData.entities.loginInfo
    const { orderInfo } = this.data
    wx.showModal({
      title: '提示',
      content: '确定标记车主迟到吗？',
      success: function(res){
        if (res.confirm) {
          passenger_api.markedLate({
            data: {
              token: token,
              ordersTravelId: orderInfo.ordersTravelId
            }
          }).then(json => {
            wx.showToast({
              title: '标记为迟到',
              icon: 'success',
              duration: 2000
            })
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 车主取消行程
  carOverTravel: function(){
    const { token } = app.globalData.entities.loginInfo
    const { travel_order } = this.data
    wx.showModal({
      title: '提示',
      content: '确定取消行程吗？',
      success: function(res) {
        if (res.confirm) {
          driver_api.deleteTravel({
            data: {
              token: token,
              travelId: travel_order.travelId
            }
          }).then(json => {
            if(json.data.status == 200){
              wx.showToast({
                title: '取消行程',
                icon: 'success',
                duration: 2000
              })
              setTimeout(() => {
                wx.reLaunch({
                  url: `/src/index`
                })
              }, 2000)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  callDriverPhone: function(){
    const { orderInfo } = this.data
    wx.makePhoneCall({
      phoneNumber: String(orderInfo.driverPhone) 
    })
  },
  clickOnTheTrain: function(){
    const { token } = app.globalData.entities.loginInfo
    const { orderInfo, pay_order_travelId } = this.data
    passenger_api.clickOnTheTrain({
      data: {
        token: token,
        ordersTravelId: orderInfo.ordersTravelId
      }
    }).then(json => {
      if(json.data.status == 200){
        wx.showToast({
          title: '已上车',
          icon: 'success',
          duration: 2000
        })
        this.getOrderInfo(pay_order_travelId)
      }
    })
  },
  callCustomerService: function(){
    wx.makePhoneCall({
      phoneNumber: '15890349336'
    })
  }
})