import * as passenger_api from '../js/passenger_api'
import * as driver_api from '../js/driver_api'
import * as util from '../js/utils'
import { appLaunchCheck } from '../js/utils'
import moment from '../js/moment'
import * as constants from '../js/constants'
import { SELECT_TIME_DAY, SELECT_TIME_HOUR, SELECT_TIME_MINUTE } from '../js/constants'

var app = getApp()
var animation = wx.createAnimation({
  duration: 900,
  timingFunction: 'ease'
})

var first_controls = Object.assign({}, {
  id: 1,
  iconPath: '../images/icon_map_me@3x.png',
  position: {
    left: 0,
    top: 0,
    width: 35,
    height: 50
  },
  clickable: true
})

var two_controls = Object.assign({}, {
  id: 2,
  iconPath: '../images/icon_home_trip@3x.png',
  position: {
    left: 10,
    top: 15,
    width: 50,
    height: 50
  },
  clickable: true
})

var three_controls = Object.assign({}, {
  id: 3,
  iconPath: '../images/icon_home_group@2x.png',
  position: {
    left: 10,
    top: 15,
    width: 50,
    height: 50
  },
  clickable: true
})

var four_controls = Object.assign({}, {
  id: 4,
  iconPath: '../images/icon_home_msg@3x.png',
  position: {
    left: 10,
    top: 80,
    width: 50,
    height: 50
  },
  clickable: true
})

var five_controls = Object.assign({}, {
  id: 5,
  iconPath: '../images/btn_locate@3x.png',
  position: {
    left: 15,
    top: 15,
    width: 50,
    height: 50
  },
  clickable: true
})

Page({
      data: {
        markers: [],
        samll_markers: [],
        polyline: [],
        controls: [],
        controls_samll: [],
        video_width: 0,
        video_height: 0,
        latitude: 39.5427,
        longitude: 116.2317,
        circles: [{
          latitude: 39.5427,
          longitude: 116.2317,
          radius: 1000
        }],
        canIUse: wx.canIUse('picker.mode.multiSelector'),
        current: 0,
        seat_number: ['1个座位', '2个座位', '3个座位', '4个座位'],
        seat_number_index: 0,
        select_price:[],
        select_price_index: 0,
        journey_active: true,
        homeOfwork: true,
        selectJourney_animation: {},
        hideOfShow_type: '',
        switch_identity: 'passenger',
        btn_hideOfShow: 'show',
        timeArray: [SELECT_TIME_DAY, SELECT_TIME_HOUR, SELECT_TIME_MINUTE],
        timeIndex: [0, 0, 0],
        match: true ,
        match_active: 'car',
        strategy_active: '时间最短',
        strategy: 0,
        now_time: moment().toDate().pattern('yyyy-MM-dd'),
        now_hour: moment().hour() + 1,
        now_minute: moment().minute(),
        circles: [],
        bindTap_hover: true,
        addr_company: null,
        addr_home: null,
        label_text: '定位中...',
        select_location: {
          location: null,
          keywords: null
        },
        button_disabled: true,
        loc_active: false
      },
      onShow(){
        const { strategy } = app.globalData.entities
        const { openId, token } = app.globalData.entities.loginInfo
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
        this.setData({
          strategy: strategy ? strategy : 0,
          bindTap_hover: true
        })
        if(!strategy){
          if(openId){
            this.initData(token)
          }else{
            this.setTimeoutInitData(this.initData)
          }
        }
        this.getSearchAddressCallBack()
      },
      onLoad(option){
        const { openId, token } = app.globalData.entities.loginInfo
        const { location, keywords } = option
        if(option.location){
          let new_location = location.split(',').map(json => Number(json))
          this.setData({
            select_location: option,
            startAddress: keywords,
            startLocation: [new_location[0], new_location[1]],
            latitude: new_location[1],
            longitude: new_location[0],
            search_location: [new_location[0], new_location[1]],
          })
          this.getSearchAddressCallBack(token)
          this.postNearbyOfPeople(new_location[0], new_location[1], keywords)
        }
      },
      setTimeoutInitData(callback){
        let getToken = setInterval(() => {
          const { token, openId } = app.globalData.entities.loginInfo
          if(openId && app.globalData.entities.locationGao){
            callback(token)
            clearInterval(getToken)
          }
        }, 500)
      },
      canIUse:function(){
        wx.showModal({
          title: '提示',
          content: String(wx.canIUse('picker.mode.multiSelector')),
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
      },
      initData(token){
        wx.showLoading({
          title: '加载中',
        })
        let self = this
        const { select_location } = this.data
        const { deviceInfo } = app.globalData.entities
        first_controls.position.left = deviceInfo.windowWidth/2 - 17
        first_controls.position.top = (deviceInfo.windowHeight - 141)/2 - 25
        two_controls.position.left = deviceInfo.windowWidth - 65
        two_controls.position.top = deviceInfo.windowHeight - ( 141 + 65 )
        three_controls.position.left = deviceInfo.windowWidth - 65
        five_controls.position.top = deviceInfo.windowHeight - ( 141 + 65 )
        self.setData({
          video_width: deviceInfo.windowWidth,
          video_height: deviceInfo.windowHeight - 141,
          controls:[first_controls, two_controls, three_controls, five_controls]
        })
        self.getSearchAddressCallBack(token)
        if(select_location.location == null){
            let loc = app.globalData.entities.locationGao
            self.setData({
              startAddress: loc.address,
              startLocation: loc.startLocation,
              latitude: loc.latitude,
              longitude: loc.longitude,
              search_location: loc.search_location
            })
            self.postNearbyOfPeople(loc.longitude, loc.latitude, loc.address)
        }
      },
      getSearchAddressCallBack:function(token){
        let show_token = token ? token : app.globalData.entities.loginInfo.token
        driver_api.getSearchAddress({
          data: {
            token: show_token
          }
        }).then(json => {
            if(json.data.status != -1){
              const { data:{ result: { addr_home, location_home, addr_company, location_company } } } = json
              this.setData({
                location_home: location_home,
                addr_home: addr_home,
                location_company: location_company,
                addr_company: addr_company
              })
            }
        })
      },
      onReady: function (e) {
        this.mapCtx = wx.createMapContext('map_big')
      },

      // 显示提交行程code
      goHomeOfWork:function(e){
        const phone = app.globalData.entities.loginInfo.phone
        const { currentTarget: { dataset: { type, id } } } = e
        if(!phone){
          wx.navigateTo({
            url: `/src/login/login`
          })
          return
        }
        this.setData({
          bindTap_hover: false,
          loc_active: true
        })
        this.getSearchAddress(type, id)
      },
      getSearchAddress:function(type, id){
        const { switch_identity, location_home, addr_home, location_company, addr_company  } = this.data
        if(addr_home == null || location_home == null && switch_identity == 'passenger'){
          wx.navigateTo({
            url: `/src/setAddress/setAddress`
          })
          util.setEntities({
              key: 'address_type',
              value: 'home'
          })
          return
        }
        if(addr_company == null || location_company == null && switch_identity == 'owners'){
          wx.navigateTo({
            url: `/src/setAddress/setAddress`
          })
          util.setEntities({
              key: 'address_type',
              value: 'company'
          })
          return
        }
        this.goHomeOfWorkInitData(type, id)
        this.showSelectHomeOfWork()
      },
      getComputePricelv1: function(loc){
        const { token } = app.globalData.entities.loginInfo
        const { startLocation } = this.data
        passenger_api.getComputePricelv1({
          data: {
            token: token,
            start: startLocation,
            end: loc
          }
        }).then(json => {
            let price = util.prices(json.data.price)
            let price_index = price && price.findIndex(price => price == json.data.price)
            this.setData({
              select_price: price,
              select_price_index: price_index
            })
        })
      },
      goHomeOfWorkInitData:function(type, id){
        let new_timeArray = []
        const { timeArray } = this.data
        timeArray[0].map(json => {
          new_timeArray.push(moment().add(json - 1, 'days').toDate().pattern('MM月dd日'))
        })

        timeArray[1].map((json, index) => {
          if(json < 9){
            timeArray[1][index] = '0' + (json + 1) + '时'
          }else{
            timeArray[1][index] = (json + 1) + '时'
          }
        })

        timeArray[2].map((json, index) => {
          if(json == 0){
            timeArray[2][index] = '0'+json+'分'
          }else{
            timeArray[2][index] = json +'分'
          }
        })
        new_timeArray.splice(0,0,'今天')
        new_timeArray.splice(1,1,'明天')
        new_timeArray.splice(2,2,'后天')
        timeArray.splice(0,1,new_timeArray)
        this.setData({
          switch_identity: 'passenger',
          btn_hideOfShow: 'hide',
          timeArray: timeArray,
          travelType: id,
          hideOfShow_type: type
        })
        this.passenger()
      },
      commit_journey:function(e){
        this.setData({
          button_disabled: false
        })
        const { timeIndex, timeArray, seat_number_index, select_price_index, location_company, addr_company,  travelType, startLocation, startAddress, addr_home, location_home, switch_identity, select_price, strategy, now_time, now_hour, now_minute } = this.data
        let new_timeArray = []
        const { token } = app.globalData.entities.loginInfo
        const { formId } = e.detail
        SELECT_TIME_DAY.map((json, index) => {
          new_timeArray.push(moment().add(json - 1, 'days').toDate().pattern('yyyy-MM-dd'))
        })
        let new_day = new_timeArray[timeArray[0].findIndex(json => json == timeArray[0][timeIndex[0]])]
        let new_hour = SELECT_TIME_HOUR[timeArray[1].findIndex(json => json == timeArray[1][timeIndex[1]])] + 1
        let new_minute = SELECT_TIME_MINUTE[timeArray[2].findIndex(json => json == timeArray[2][timeIndex[2]])]
        let new_time = new_day + ' ' + new_hour + ':' + new_minute + ':00'
        if(new_hour < 10 && new_minute > 10){
          new_time = new_day + ' ' + '0' + new_hour + ':' + new_minute + ':00'
        }
        if(new_minute < 10 && new_hour > 10){
          new_time = new_day + ' ' + new_hour + ':' + '0' + new_minute + ':00'
        }
        if(new_minute < 10 && new_hour < 10){
          new_time = new_day + ' ' + '0' + new_hour + ':' + '0' + new_minute + ':00'
        }
        // let start_Location = startLocation.split(',').map(json => Number(json))
        let parmas = {}
        if(moment(now_time).isSame(new_day)){
          if(new_hour < now_hour - 1){
            let self = this
            wx.showModal({
              title: '提示',
              content: '出发时间不能小于当前时间',
              showCancel: false,
              success: function(res) {
                if (res.confirm) {
                  self.setData({
                    button_disabled: true
                  })
                  console.log('用户点击确定')
                }
              }
            })
            return
          }
        }
        let end_location = travelType == 2 ? location_home : location_company
        let end_address = travelType == 2 ? addr_home : addr_company
        if(switch_identity == 'passenger'){
          parmas = Object.assign({}, {token: token}, {startTime: [new_time]}, {seats: Number(seat_number_index) + 1}, {travelType: Number(travelType)}, {start: startLocation}, {startAddress: startAddress}, {end: end_location}, {endAddress: end_address}, {isWX: true}, {form_id: formId})
          this.postJounrey(parmas)
        }
        if(switch_identity == 'Owners'){
          parmas = Object.assign({}, {token: token}, {startTime: [new_time]}, {seats: Number(seat_number_index) + 1}, {travelType: Number(travelType)}, {start: startLocation}, {startAddress: startAddress}, {end: end_location}, {endAddress: end_address}, { price: select_price[select_price_index] }, {isWX: true}, {strategy: strategy}, {form_id: formId})
          this.postJounreyCar(parmas)
        }
      },
      postJounrey(parmas){
        const { travelType, location_company, location_home } = this.data
        passenger_api.postJounrey({
          data: parmas
        }).then(json => {
          const { passengerTravelId } = json.data.passengerTravelId
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(() =>{
            util.setEntities({
              key: 'location',
              value: travelType == '2' ? location_home : location_company
            })
            this.setData({
              button_disabled: true
            })
            wx.navigateTo({
              url: `/src/match/match?id=${passengerTravelId}&&type=passenger&&seat=${parmas.seats}&&times=${parmas.startTime}&travelType=2`
            })
            this.hideCode()
          }, 2000)
        }, e => {
          wx.showToast({
            title: '发布失败',
            icon: 'success',
            duration: 2000
          })
        })
      },
      postJounreyCar(parmas){
        const { travelType, location_company, location_home } = this.data
        let self = this
        driver_api.postCompanyJonrey({data: parmas}).then(json => {
          // 车主发布行程
          if(json.data.status == -5){
            wx.showModal({
              title: '提示',
              content: '您还未完成车主认证',
              showCancel: false,
              success: function(res) {
                if (res.confirm) {
                  self.setData({
                    button_disabled: true
                  })
                  wx.navigateTo({
                    url: `/src/ownersCertification/ownersCertification`
                  })
                }
              }
            })
            return
          }
          const { travelId } = json.data.travelId
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(() =>{
            util.setEntities({
              key: 'location',
              value: travelType == '2' ? location_home : location_company
            })
            this.setData({
              button_disabled: true
            })
            wx.navigateTo({
              url: `/src/match/match?id=${travelId}&&type=owner&travelType=1`
            })
            this.hideCode()
          }, 2000)
        })
      },
      showSelectHomeOfWork(){
        let height = this.data.video_height
        let width = this.data.video_width
        five_controls.position.top = height - ( 200 + 65 )

        const showSelectHomeOfWork_animation = animation
        showSelectHomeOfWork_animation.opacity(1).height(320).step()
        this.setData({
          selectJourney_animation: showSelectHomeOfWork_animation.export(),
          controls_samll:[five_controls],
          homeOfwork: false
        })
      },
      // 隐藏提交行程code
      hideCode(){
        this.hideSelectHomeOfWork()
        this.setData({
          homeOfwork: true,
          btn_hideOfShow: 'show',
          match: true,
          timeArray: [SELECT_TIME_DAY, SELECT_TIME_HOUR, SELECT_TIME_MINUTE],
          isMatchingTravel: 0,
          isMatch: false,
          loc_active: false
        })
      },
      hideSelectHomeOfWork(){
        const hideSelectHomeOfWork_animation = animation
        hideSelectHomeOfWork_animation.opacity(0).height(1).step()
        this.setData({
          selectJourney_animation: hideSelectHomeOfWork_animation.export()
        })
      },
      regionchange: function(e) {
        let self = this
        if(e.type === 'begin'){
           let markers_clone = []
           const { markers_location } = this.data
            markers_clone.push({
              iconPath: '../images/Artboard@1x.jpg',
              longitude: markers_location[0],
              latitude: markers_location[1],
              width: 1,
              height: 20,
              callout: {
                content: '查找中...',
                color: '#ffffff',
                fontSize: 13,
                display: 'ALWAYS',
                bgColor: '#000000',
                padding: 10,
                textAlign: 'center',
                borderRadius: 8
              }
            })
           self.setData({
              markers: markers_clone
           })
        }
        if(e.type === 'end'){
          self.mapCtx.getCenterLocation({
            success: function(res){
                let location = [res.longitude, res.latitude]
                let parmas = Object.assign({}, { location: location })
                driver_api.getLocationText({
                  data: parmas
                }).then(json => {
                    let address = json.data.regeocode.formatted_address.replace((json.data.regeocode.addressComponent.province + json.data.regeocode.addressComponent.district),"")
                    self.postNearbyOfPeople(Number(location[0].toFixed(6)), Number(location[1].toFixed(6)), address)
                })
            },
            fail: function(e){
              console.log(e)
            }
          })
        }
      },
      postNearbyOfPeople(lon, lat, text){
        let location = [lon, lat]
        let markers_clone = []
        let parmas = Object.assign({}, {location: location})
        driver_api.postNearbyOfPeople({
          data: parmas
        }).then(json => {
          let data = json.data.persons.length != 0 ? json.data.persons : json.data.passengers.locations
          let realGoHomeNum = json.data.persons.length != 0 ? json.data.realGoHomeNum : json.data.passengers.goHomeNum
          let realGoCompanyNum = json.data.persons.length != 0 ? json.data.realGoCompanyNum : json.data.passengers.goCompanyNum
          let nearby_text = '附近有'+ realGoCompanyNum +'位去公司 '+ realGoHomeNum + '位回家'
          data && data.map(mak => {
            markers_clone.push({
              iconPath: mak.role == 0 ? '../images/icon_map_men@3x.png' : '../images/icon_map_car@3x.png',
              longitude: json.data.persons.length != 0 ? mak.gaodeLocation[0] : mak.location[0],
              latitude: json.data.persons.length != 0 ? mak.gaodeLocation[1] : mak.location[1],
              width: mak.role == 0 ? 50 : 30,
              height: 50,
              anchor: {x: .5, y: .5}
            })
          })
          markers_clone.push({
            iconPath: '../images/Artboard@1x.jpg',
            longitude: location[0],
            latitude: location[1],
            width: 1,
            height: 20,
            anchor: {x: .5, y: .5},
            callout: {
              content: nearby_text,
              color: '#ffffff',
              fontSize: 13,
              display: 'ALWAYS',
              bgColor: '#000000',
              textAlign: 'center',
              padding: 8,
              borderRadius: 12
            },
            label: {
              content: text != '义和庄乡' ? text : '定位中...',
              color: '#4598F7',
              fontSize: 13,
              display: 'ALWAYS',
              padding: 10,
              textAlign: 'center',
              borderRadius: 8
            }
          })
          this.setData({
            markers: markers_clone,
            markers_location: location,
            label_text: text != '义和庄乡' ? (text + ' 出发') : '定位中...',
            startAddress: text
          })
        }).then(() => {
          wx.hideLoading()
        })
      },
      selectGoToLocation: function(){
        wx.navigateTo({
          url: `/src/setAddress/searchAddress?id=index`
        })
      },
      markertap(e) {
        console.log(e.markerId)
      },
      controltap(e) {
        const { phone } = app.globalData.entities.loginInfo
        let self = this
        switch(e.controlId)
        {
        case 1:
          console.log('中心点')
          break;
        case 2:
          if(!phone){
            wx.navigateTo({
              url: `/src/login/login`
            })
            return
          }
          wx.navigateTo({
            url: `/src/homePage/homePage`
          })
          break;
        case 3:
          if(!phone){
            wx.navigateTo({
              url: `/src/login/login`
            })
            return
          }
          wx.navigateTo({
            url: `/src/group/group`
          })
          break;
        default:
          this.mapCtx.moveToLocation()
          break;
        }
      },
      durationChange: function(e) {
        this.setData({
          duration: e.detail.value
        })
      },
      passenger:function(){
        const { travelType } = this.data
        const { token } = app.globalData.entities.loginInfo
        let parmas = Object.assign({}, { token: token }, { travelType: Number(travelType) })
        passenger_api.getPassengerRecentTrip({
          data: parmas
        }).then(json => {
          let data = json.data
          let hour_index = moment().hour()
          this.setData({
            timeIndex: [0, hour_index, 0],
            seat_number_index: 0
          })
        })
        this.getLine('passenger')
        this.setData({
          switch_identity: 'passenger'
        })
      },
      owners:function(){
        const { travelType } = this.data
        const { token } = app.globalData.entities.loginInfo
        let parmas = Object.assign({}, { token: token }, { travelType: Number(travelType) })
        const { select_price } = this.data
        driver_api.postRecentTrip({
          data: parmas
        }).then(json => {
          let data = json.data
          let hour_index = moment().hour()
          this.setData({
            timeIndex: [0, hour_index, 0],
            seat_number_index: 0
          })
          this.getLine('Owners')
        })
        this.setData({
          switch_identity: 'Owners'
        })
      },
      selectLine:function(){
        const { location_company, location_home, travelType, markers_location } = this.data
        switch (Number(travelType))
        {
          case 2:
            wx.navigateTo({
              url: `/src/ownersSelectLine/ownersSelectLine?end_location=${location_home}&start_Location=${markers_location}`
            })
            break;
          case 1:
            wx.navigateTo({
              url: `/src/ownersSelectLine/ownersSelectLine?end_location=${location_company}&start_Location=${markers_location}`
            })
            break;
        }
      },
      bindMultiPickerChange: function (e) {
        this.setData({
          timeIndex: e.detail.value
        })
      },
      bindMultiPickerColumnChange: function (e) {
        const { timeArray, timeIndex } = this.data
        timeIndex[e.detail.column] = e.detail.value
        this.setData({
          timeIndex: timeIndex
        })
      },
      bindPickerChange_Seats: function(e) {
        this.setData({
          seat_number_index: e.detail.value
        })
      },
      bindPickerChange_Price: function(e) {
        this.setData({
          select_price_index: e.detail.value
        })
      },
      getLine:function(type){
        const { token } = app.globalData.entities.loginInfo
        const { addr_home, addr_company, markers_location, location_company, location_home, travelType } = this.data
        // let start_Location = startLocation.split(',').map(json => Number(json))
        let end_location = travelType == '2' ? location_home : location_company
        let end_address = travelType == '2' ? addr_home : addr_company
        let parmas = {}
        if(type == 'passenger'){
          parmas = Object.assign({}, {token: token}, {start: markers_location}, {end: end_location}, {strategy: 0})
        }else if(type == 'Owners'){
          parmas = Object.assign({}, {token: token}, {start: markers_location}, {end: end_location}, {strategy: 0})
        }

        driver_api.getLine({
          data: parmas
        }).then(json => {
          const { route } = json.data.routes
          if(!route){
            return
          }
          let new_pline = route.reverse()
          this.setData({
            samll_markers: [{
              iconPath: '../images/icon_map_star@3x.png',
              id: 0,
              longitude: markers_location[0],
              latitude: markers_location[1],
              width: 32,
              height: 50
            },{
              iconPath: '../images/icon_map_end@3x.png',
              id: 1,
              longitude: new_pline[0].longitude,
              latitude: new_pline[0].latitude,
              width: 32,
              height: 50
            }]
          })
        })
        this.setData({
            end_address: end_address
        })
        this.getComputePricelv1(end_location)
      },
      matchCar:function(){
        this.setData({
          match_active: 'car'
        })
      },
      matchPeople:function(){
        this.setData({
          match_active: 'people'
        })
      }
    })
