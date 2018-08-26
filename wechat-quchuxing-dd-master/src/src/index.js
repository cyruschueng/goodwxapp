import * as passenger_api from '../js/passenger_api'
import * as driver_api from '../js/driver_api'
import * as util from '../js/utils'
import { appLaunchCheck } from '../js/utils'
import moment from '../js/moment'
import * as constants from '../js/constants'
import { SELECT_TIME_DAY, SELECT_TIME_HOUR, SELECT_TIME_MINUTE } from '../js/constants'
import * as amapFile from '../js/amap-wx'

var app = getApp()
var animation = wx.createAnimation({
  transformOrigin: "50% 50%",
  duration: 900,
  timingFunction: 'ease-out',
  delay: 0
})
var myAmapFun = new amapFile.AMapWX({key:'35d96308ca0be8fd6029bd3585064095'})
var return_controls = Object.assign({}, {
  id: 1,
  iconPath: '../images/btn_map_backtitle@3x.png',
  position: {
    left: 10,
    top: 0,
    width: 68,
    height: 36
  },
  clickable: true
})
var travel_controls = Object.assign({}, {
  id: 2,
  iconPath: '../images/icon_home_trip@3x.png',
  position: {
    left: 10,
    top: 0,
    width: 50,
    height: 50
  },
  clickable: true
})

var center_controls = Object.assign({}, {
  id: 3,
  iconPath: '../images/icon_map_me@3x.png',
  position: {
    left: 10,
    top: 0,
    width: 32,
    height: 47
  },
  clickable: true
})
var positioning_controls = Object.assign({}, {
  id: 4,
  iconPath: '../images/btn_locate@3x.png',
  position: {
    left: 10,
    top: 0,
    width: 48,
    height: 48
  },
  clickable: true
})
var audit_controls = Object.assign({}, {
  id: 5,
  iconPath: '../images/icon_shenhe@3x.png',
  position: {
    left: 10,
    top: 0,
    width: 50,
    height: 50
  },
  clickable: true
})
Page({
  data: {
    win_height: 600,
    switch_type: 'index',
    switchCodeAnimationPeople: {},
    switchCodeAnimationCar: {},
    controls: [],
    latitude: 23.099994,
    longitude: 113.324520,
    startAddress: '正在获取出发地点...',
    endAddress: '您要去哪儿',
    selectTime: [],
    timeIndex: [0, moment().hour() + 1],
    showTimeStyle: true,
    seatArray: [],
    seatIndex: 0,
    priceArray: ['车费(元)'],
    priceIndex: 0,
    strategy_active: '时间最短',
    markers: []
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('map')
  },
  onLoad(){
    const { deviceInfo, loginInfo } = app.globalData.entities
    if(loginInfo.openId){
      this.initData()
    }else{
      this.setTimeoutInitData(this.initData)
    }
  },
  setTimeoutInitData(callback){
    let getToken = setInterval(() => {
      const { token, openId } = app.globalData.entities.loginInfo
      if(openId){
        callback(token)
        clearInterval(getToken)
      }
    }, 500)
  },
  onShow(){
    const { location, strategy } = app.globalData.entities
    switch (strategy)
    {
      case '0':
        this.setData({
          strategy_active: '时间最短'
        })
        break;
      case '2':
        this.setData({
          strategy_active: '距离最短'
        })
        break;
      case '9':
        this.setData({
          strategy_active: '拥堵较少'
        })
        break;
    }
    util.loactionAddress(this.initData).then(res => {
      this.setData({
        latitude: location ? location.latitude : res.latitude,
        longitude: location ? location.longitude : res.longitude,
        startAddress: location ? location.name : res.startAddress,
        strategy: strategy ? strategy : 0,
        start_city: location ? this.data.start_city : res.initial_city
      })
    })
  },
  initData(){
    const { loginInfo } = app.globalData.entities
    let deviceInfo = wx.getSystemInfoSync()
    travel_controls.position.top = deviceInfo.windowHeight - (214 + 60)
    travel_controls.position.left = deviceInfo.windowWidth - 60
    audit_controls.position.top = deviceInfo.windowHeight - (214 + 120)
    audit_controls.position.left = deviceInfo.windowWidth - 60
    center_controls.position.top = (deviceInfo.windowHeight - 214)/2 - 24
    center_controls.position.left = deviceInfo.windowWidth/2 - 16
    positioning_controls.position.top = deviceInfo.windowHeight - (214 + 58)
    util.loactionAddress(this.initData).then(res => {
      this.setData({
        win_width: deviceInfo.windowWidth,
        win_height: deviceInfo.windowHeight,
        controls: loginInfo.adminType == 1 ? [travel_controls, center_controls, positioning_controls, audit_controls] : [travel_controls, center_controls, positioning_controls]
      })
    })
  },
  peopleLookingForAcar: function(e){
    let self = this
    const { win_height, end_latitude, end_longitude } = this.data
    let peopleAnimation = animation.opacity(1).bottom(0).step()
    return_controls.position.top = win_height - (214 + 46)
    const { phone } = app.globalData.entities.loginInfo
    if(!phone){
      wx.navigateTo({
        url: `/src/login/login`
      })
      return
    }
    if(!end_latitude && !end_longitude){
      wx.showModal({
        title: '提示',
        content: '请选择目的地',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            self.setData({
              switch_type: 'index'
            })
          }
        }
      })
      return
    }
    this.setData({
      switch_type: 'people',
      switchCodeAnimationPeople: peopleAnimation.export(),
      controls: [return_controls, center_controls]
    })
    this.getLine()
    this.initialization('people')
  },
  carToFindSomeone: function(e){
    let self = this
    const { win_height, end_latitude, end_longitude } = this.data
    let carAnimation = animation.opacity(1).bottom(0).step()
    return_controls.position.top = win_height - (214 + 46)
    const { phone } = app.globalData.entities.loginInfo
    if(!phone){
      wx.navigateTo({
        url: `/src/login/login`
      })
      return
    }
    if(!end_latitude && !end_longitude){
      wx.showModal({
        title: '提示',
        content: '请选择目的地',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            self.setData({
              switch_type: 'index'
            })
          }
        }
      })
      return
    }
    this.setData({
      switch_type: 'car',
      switchCodeAnimationCar: carAnimation.export(),
      controls: [return_controls, center_controls],
      seatIndex: 1
    })
    this.getLine()
    this.initialization('car')
    this.postTravelPrice('car', 1)
  },
  controltap(e) {
    const { phone, adminType } = app.globalData.entities.loginInfo
    let self = this
    switch(e.controlId)
    {
    case 1:
      animation.bottom(-214).opacity(0).step()
      this.setData({
        switch_type: 'index',
        switchCodeAnimationCar: animation.export(),
        switchCodeAnimationPeople: animation.export(),
        controls: adminType == 1 ? [travel_controls, center_controls, positioning_controls, audit_controls] : [travel_controls, center_controls, positioning_controls],
        markers: [],
        polyline: [],
        priceArray: ['车费(元)'],
        priceIndex: 0
      })
      break;
    case 2:
      if(!phone){
        wx.navigateTo({
          url: `/src/login/login`
        })
        return
      }
      wx.navigateTo({
        url: `/src/travelList/travelList`
      })
      break;
    case 4:
      this.mapCtx.moveToLocation()
      break;
    case 5:
      wx.navigateTo({
        url: `/src/auditTheOwner/auditTheOwner`
      })
      this.clearType()
      break;
    default:
      // ???
      break;
    }
  },
  initialization: function(clickType){
    let day = util.selectDay()
    let hour = util.selectHour()
    let minute = util.selectMinute()
    let seatsArray = util.seatsNumber(clickType)
    let selectTime = []
    let timeArray = []
    selectTime.push(day.showDayArray)
    selectTime.push(hour.showHourArray)
    selectTime.push(minute.showMinuteArray)
    timeArray.push(day.dayArray)
    timeArray.push(hour.hourArray)
    timeArray.push(minute.minuteArray)
    this.setData({
      selectTime: selectTime,
      showTimeStyle: false,
      seatArray: seatsArray,
      seatIndex: 0,
      timeArray: timeArray
    })
  },
  // regionchange: function(e) {
  //   let self = this
  //   const { end_longitude, end_latitude, switch_type } = this.data
  //   if(e.type === 'end'){
  //     this.mapCtx.getCenterLocation({
  //       success: function(res){
  //           let location = [res.longitude, res.latitude]
  //           let parmas = Object.assign({}, { location: location })
  //           driver_api.getLocationText({
  //             data: parmas
  //           }).then(json => {
  //               let address = json.data.regeocode.formatted_address.replace((json.data.regeocode.addressComponent.province + json.data.regeocode.addressComponent.district),"")
  //               self.setData({
  //                 startAddress: address,
  //                 longitude: res.longitude,
  //                 latitude: res.latitude
  //               })
  //               if(end_longitude && end_latitude && switch_type != 'index'){
  //                 self.getLine()
  //               }
  //           })
  //       },
  //       fail: function(e){
  //         console.log(e)
  //       }
  //     })
  //   }
  // },
  getLine:function(type){
    const { token } = app.globalData.entities.loginInfo
    const { longitude, latitude, end_latitude, end_longitude } = this.data
    let start = [longitude, latitude]
    let end = [end_longitude, end_latitude]
    let parmas = Object.assign({}, {token: token}, {start: start}, {end: end}, {strategy: 0})
    driver_api.getLine({
      data: parmas
    }).then(json => {
      const { route } = json.data.routes
      if(!route){
        return
      }
      this.setData({
        markers: [{
          iconPath: '../images/icon_map_star@3x_two.png',
          id: 0,
          longitude: start[0],
          latitude: start[1],
          width: 32,
          height: 47
        },{
          iconPath: '../images/icon_map_end@3x_two.png',
          id: 1,
          longitude: end[0],
          latitude: end[1],
          width: 32,
          height: 47
        }],
        polyline: [{
          points: route,
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
  postTravelPrice: function(role, seat){
    const { longitude, latitude, end_latitude, end_longitude } = this.data
    let start = [longitude, latitude]
    let end = [end_longitude, end_latitude]
    driver_api.postTravelPrice({
      data: {
        start: start,
        end: end,
        role: role == 'people' ? 0 : 1,
        seats: role != 'car' ? Number(seat) : 1
      }
    }).then(json => {
      let price = []
      let redPacketPrice = []
      json.data.priceList && json.data.priceList.map(res => {
        price.push(res.price + '元')
        redPacketPrice.push(res.redPacketPrice)
      })
      this.setData({
        priceArray: price,
        redPacketPrice: redPacketPrice,
        priceIndex: parseInt(price.length/2)
      })
    })
  },
  bindMultiPickerChange: function (e) {
    this.setData({
      timeIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    const { selectTime, timeIndex } = this.data
    timeIndex[e.detail.column] = e.detail.value
    this.setData({
      timeIndex: timeIndex
    })
  },
  selectStart: function(){
    const { latitude, longitude } = this.data
    let self = this
    wx.chooseLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 28,
      success: function(res){
        util.setEntities({
          key: 'location',
          value: res
        })
        util.getRegeo(res.latitude, res.longitude).then((res, err) => {
          let city = res[0].regeocodeData.addressComponent.city.length == 0 ? res[0].regeocodeData.addressComponent.province : res[0].regeocodeData.addressComponent.city
          self.setData({
            start_city: city
          })
        })
      }
    })
  },
  selectEnd: function(){
    const { latitude, longitude } = this.data
    let self = this
    wx.chooseLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 28,
      success: function(res){
        self.setData({
          end_latitude: res.latitude,
          end_longitude: res.longitude,
          endAddress: res.name
        })
        util.getRegeo(res.latitude, res.longitude).then((res, err) => {
          let city = res[0].regeocodeData.addressComponent.city.length == 0 ? res[0].regeocodeData.addressComponent.province : res[0].regeocodeData.addressComponent.city
          self.setData({
            end_city: city
          })
        })
      }
    })
  },
  bindPickerSeatsChange: function(e){
    const { switch_type } = this.data
    this.setData({
      seatIndex: e.detail.value
    })
    if(e.detail.value == 0) {
      this.setData({
        priceArray: ['车费(元)'],
        priceIndex: 0
      })
      return
    }
    if(switch_type == 'people'){
      this.postTravelPrice(switch_type, e.detail.value)
    }
  },
  bindPickerPriceChange: function(e){
    this.setData({
      priceIndex: e.detail.value
    })
  },
  selectLine:function(){
    const { longitude, latitude, end_latitude, end_longitude } = this.data
    let start = [longitude, latitude]
    let end = [end_longitude, end_latitude]
    wx.navigateTo({
      url: `/src/ownersSelectLine/ownersSelectLine?end_location=${end}&start_Location=${start}`
    })
    util.setEntities({
      key: 'controls',
      value: false
    })
  },
  // 创建行程data形成工厂
  creatTravel(){
    const { token } = app.globalData.entities.loginInfo
    const { switch_type, longitude, latitude, end_latitude, end_longitude, startAddress, endAddress, seatArray, seatIndex, priceIndex, priceArray, strategy, timeArray, timeIndex, redPacketPrice, start_city, end_city } = this.data
    let time = timeArray[0][timeIndex[0]] + ' ' + timeArray[1][timeIndex[1]] + ':' + timeArray[2][timeIndex[2] ? timeIndex[2] : 0] + ':' + moment().second()
    let start = [longitude, latitude]
    let end = [end_longitude, end_latitude]
    let price = Number(priceArray[priceIndex].replace('元',''))
    let seat = seatArray[seatIndex]
    if(switch_type == 'people'){
      seat = Number(seat.replace('人乘车',''))
    }else{
      seat = Number(seat.replace('个座位',''))
    }
    if(isNaN(seat)){
      wx.showModal({
        title: '提示',
        content: switch_type === 'people' ? '请选择乘车人数' : '请选择座位数',
        showCancel: false
      })
      return
    }
    if(switch_type == 'people'){
      let parmas = Object.assign({}, {token: token}, {startTimes: time}, {start: start}, {end: end}, {startAddress: startAddress}, {endAddress: endAddress}, {seatsNum: seat}, {travelPrice: price}, {redPacketPrice: redPacketPrice[priceIndex]}, {startCity: start_city}, {endCity: end_city})
      this.postJounrey(parmas)
    }
    if(switch_type == 'car'){
      let parmas = Object.assign({}, {token: token}, {startTimes: time}, {start: start}, {end: end}, {startAddress: startAddress}, {endAddress: endAddress}, {seats: seat}, {travelPrice: price}, {redPacketPrice: redPacketPrice[priceIndex]}, {strategy: strategy}, {startCity: start_city}, {endCity: end_city})
      this.postCompanyJonrey(parmas)
    }
  },
  postJounrey(params){
    const { adminType } = app.globalData.entities.loginInfo
    passenger_api.postJounrey({
      data: params
    }).then(json => {
      if(json.data.status == -1){
        wx.showModal({
          title: '提示',
          content: '您还未登录',
          success: function(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: `/src/login/login`
              })
            }
          }
        })
        return
      }
      if(json.data.status == 200){
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(() => {
          wx.navigateTo({
            url: `/src/travelList/travelList`
          })
          this.clearType('submitT')
        }, 1500)
      }
    })
  },
  postCompanyJonrey(parmas){
    const { adminType } = app.globalData.entities.loginInfo
    let self = this
    driver_api.postCompanyJonrey({
      data: parmas
    }).then(json => {
      if(json.data.status == -1){
        wx.showModal({
          title: '提示',
          content: '您还未登录',
          success: function(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: `/src/login/login`
              })
            }
          }
        })
        return
      }
      if(json.data.status == -5){
        wx.showModal({
          title: '提示',
          content: '您还未完成车主认证',
          success: function(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: `/src/ownersCertification/ownersCertification`
              })
              self.clearType()
            }
          }
        })
        return
      }
      if(json.data.status == 200){
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(() => {
          wx.navigateTo({
            url: `/src/travelList/travelList`
          })
          this.clearType('submitT')
        }, 1500)
      }
    })
  },
  clearType: function(type){
    const { adminType } = app.globalData.entities.loginInfo
    this.setData({
      switch_type: 'index',
      end_latitude: null,
      end_longitude: null,
      endAddress: '您要去哪儿',
      markers: [],
      polyline: [],
      controls: adminType == 1 ? [travel_controls, center_controls, positioning_controls, audit_controls] : [travel_controls, center_controls, positioning_controls]
    })
    if(type == 'submitT'){
      this.mapCtx.moveToLocation()
    }
  }
})
