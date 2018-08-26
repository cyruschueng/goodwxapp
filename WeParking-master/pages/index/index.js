//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    windowHeight:0,
    windowWidth:0,
    controls:[],
    markers:[],
    includePoints:[],
    locationTimes:0,
    userStatus:0,
    latitude: 39.91543309328607,
    longitude: 116.45597668647765,
    countDown:60,
    intervalId:0
  },
  onLoad: function () {
    if (wx.canIUse('getSystemInfoSync.return.SDKVersion')) {
      //获得微信版本信息,检测兼容性
      var res = wx.getSystemInfoSync()
      this.setData({
        windowHeight:res.windowHeight,
        windowWidth:res.windowWidth
      })
      var sdk = parseInt(res.SDKVersion.replace(/\./g, ''))
      if (sdk < 125) {
        wx.showModal({
          title: '提示',
          content: '您的微信版本偏低,建议您升级您的微信,以体验闪泊停车的完整服务',
          showCancel: false,
          confirmColor: '#f4c600',
          success: function (res) {
            if (res.confirm) {

            }
          }
        })
      } 
    }else {
      var res = wx.getSystemInfoSync()
      this.setData({
        windowHeight: res.windowHeight,
        windowWidth: res.windowWidth
      })
      wx.showModal({
        title: '提示',
        content: '您的微信版本偏低,建议您升级您的微信,以体验闪泊停车的完整服务',
        showCancel: false,
        confirmColor: '#f4c600',
        success: function (res) {
          if (res.confirm) {

          }
        }
      })
    }

    this.mapContext = wx.createMapContext('map')

    wx.request({
      url: app.globalData.serverUrl + 'getIsUsed.als',
      success: function (res) {
        if (res.data.isUsed != 0) {
          app.globalData.useStatus = 1
        }
      }
    })
  },
  onReady: function () {
    // this.mapContext = wx.createMapContext('map')
  },

  onShow:function () {
    var that = this
    if (app.globalData.useStatus==0){
        wx.showLoading({
          title: '加载中..'
        })
        var hasToken = true
        try {
          var value = wx.getStorageSync('token')
          if (!value) {
            hasToken = false
          }
        } catch (e) { }
        if (hasToken) {
          wx.checkSession({
            success: function () {
              that.checkUserBookingStatus()
            },
            fail: function () {
              wx.login({
                success: function (res) {
                  if (res.code) {
                    wx.request({
                      url: app.globalData.serverUrl + 'onLogin.als',
                      data: { code: res.code },
                      success: function (res2) {
                        if (res2.data.status == 0) {
                          try {
                            wx.setStorageSync('token', res2.data.token)
                            that.checkUserBookingStatus()
                          } catch (e) { }
                        }
                      }
                    })
                  }
                }
              })
            }
          })
        } else {
          wx.login({
            success: function (res) {
              if (res.code) {
                wx.request({
                  url: app.globalData.serverUrl + 'onLogin.als',
                  data: { code: res.code },
                  success: function (res2) {
                    if (res2.data.status == 0) {
                      try {
                        wx.setStorageSync('token', res2.data.token)
                        that.checkUserBookingStatus()
                      } catch (e) { }
                    }
                  }
                })
              }
            }
          })
        }
    }else{
      wx.showLoading({
        title: '加载中..'
      })
      that.setData({
        controls: [],
        markers: []
      })
    }
  },
  //请求服务器检查订单状态,控制不同状态下的界面显示
  checkUserBookingStatus:function(){
    var that=this
    wx.request({
      url: app.globalData.serverUrl + 'getUserBookingStatus.als',
      data: { token: wx.getStorageSync('token') },
      success: function (res) {
        wx.hideLoading()
        //未绑定手机
        if (res.data.status == 1) {
          wx.redirectTo({
            url: '/pages/bindPhone/bindPhone',
          })
        } else if (res.data.status == 2) { //该用户当前有预约的订单
          that.setData({
            markers:[],
            userStatus:2
          })
          that.showOrder()
          that.getUserLocation()
        } else if (res.data.status == 3) { //该用户当前没有预约的订单
          that.setData({
            includePoints:[],
            userStatus:3
          })
          //显示待预约的地图按钮
          that.showPending()
          // //获得定位并更新显示可预约图标
          if (that.data.locationTimes==0){
            that.getUserLocation()
          }else{
            that.getShareOrder()
          }
          // that.freshShareOrder()
        } else {
          wx.showToast({
            title: '出错了',
            icon: "loading",
            duration: 1000
          })
        }
      }
    })
  },

  //30秒刷新一次一次倒计时
  freshShareOrder:function(){
    var that=this;
    var intervalId=setInterval(function(){
      that.getShareOrder()
    },1000*30)
    that.setData({
      intervalId:intervalId
    })
  },


  //获得可预约订单并标记
  getShareOrder:function(){
    var that = this
    if (wx.canIUse('mapContext.getRegion')){
      //获得地图范围
      that.mapContext.getRegion({
        success: function (res) {
          //检查地图范围,如果超出用户当前位置30公里,不再获取数据
          var distance1 = app.getDistance(that.data.latitude, that.data.longitude, res.southwest.latitude, res.southwest.longitude)
          var distance2 = app.getDistance(that.data.latitude, that.data.longitude, res.northeast.latitude, res.northeast.longitude)
          if(distance1>30 || distance2>30){

          }else{
            wx.request({
              url: app.globalData.serverUrl + 'getSharingOrder.als',
              data:
              {
                token: wx.getStorageSync('token'),
                min: that.data.countDown,
                southwestLatitude: res.southwest.latitude,
                southwestLongitude: res.southwest.longitude,
                northeastLatitude: res.northeast.latitude,
                northeastLongitude: res.northeast.longitude
              },
              success: function (res) {
                if (res.data.status == 0) {
                  that.setData({
                    markers: res.data.orders
                  })
                  // that.freshShareOrder()
                } else {
                  wx.showToast({
                    title: '出错了',
                    icon: 'loading',
                    duration: 1000
                  })
                }
              }
            })
          }
        },
        fail: function () {

        }
      })
    }else{
      //获得地图中心经纬度
      that.mapContext.getCenterLocation({
        success: function (res) {
          wx.request({
            url: app.globalData.serverUrl + 'getSharingOrder.als',
            data:
            {
              token: wx.getStorageSync('token'),
              min: that.data.countDown,
              southwestLatitude: that.data.latitude - 0.3,
              southwestLongitude: that.data.longitude - 0.3,
              northeastLatitude: that.data.latitude + 0.3,
              northeastLongitude: that.data.longitude + 0.3
            },
            success: function (res) {
              if (res.data.status == 0) {
                that.setData({
                  markers: res.data.orders
                })
                // that.freshShareOrder()
              } else {
                wx.showToast({
                  title: '出错了',
                  icon: 'loading',
                  duration: 1000
                })
              }
            }
          })
        }
      })
    }
    
  },

  //用户移动地图时触发
  regionchange:function(){
    if(this.data.userStatus==3){
      this.getShareOrder()
    }
  },

  //点击某个车位图标时触发
  markertap:function(e){
    wx.navigateTo({
      url: '/pages/bookInfo/bookInfo?orderId='+e.markerId,
    })
  },

  //定位按钮点击事件
  bindcontroltap:function(e){
    if (e.controlId =='currentLocation'){
      this.getUserLocation()
    }else if(e.controlId=='orderDetail'){
      wx.navigateTo({
        url: '/pages/bookInfoModal/bookInfoModal?type=2',
      })
    }else if(e.controlId=='chooseTime_5'){
      this.setData({
        countDown:5
      })
      this.showPending()
      this.getShareOrder()
    } else if (e.controlId == 'chooseTime_10') {
      this.setData({
        countDown: 10
      })
      this.showPending()
      this.getShareOrder()
    } else if (e.controlId == 'chooseTime_15') {
      this.setData({
        countDown: 15
      })
      this.showPending()
      this.getShareOrder()
    } else if (e.controlId == 'chooseTime_all') {
      this.setData({
        countDown: 60
      })
      this.showPending()
      this.getShareOrder()
    }
  },

  //获得地图范围
  getMapRegion:function(){
    var that=this
    this.mapContext.getRegion({
      success: function (res) {
        that.setData({
          southwestLatitude: res.southwest.latitude,
          southwestLongitude: res.southwest.longitude,
          northeastLatitude: res.northeast.latitude,
          northeastLongitude: res.northeast.longitude
        })
      }
    })
  },

  //获得用户地理位置
  getUserLocation:function(){
    var that=this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success(res) { //用户同意授权
              that.getLocation()
              if(that.data.userStatus==3){
                that.setData({
                  locationTimes:1
                })
              }
            },
            fail(){ //用户拒绝授权,opensetting
                wx.showModal({
                  title: '提示',
                  content: '我们需要获得您的位置信息,以便为您提供共享车位的相关服务',
                  showCancel:false,
                  confirmColor:'#f4c600',
                  success:function(res){
                    if(res.confirm){
                      wx.openSetting({
                        success:function(res){
                          // if (res.authSetting['scope.userLocation']){
                          //   that.getLocation()
                          // }else{
                          //   that.getUserLocation()
                          // }
                        }
                      })
                    }
                  }
                })
            }
          })
        }else{ //有地图授权
          that.getLocation()
          if (that.data.userStatus == 3) {
            that.setData({
              locationTimes: 1
            })
          }
        }
      }
    })
  },
  getLocation:function(){
    var that=this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        if(that.data.userStatus==3){
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude,
          })
          that.mapContext.moveToLocation()
          that.getShareOrder()
        }else if(that.data.userStatus==2){
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude,
          })
          that.getUserOrderMark(res.latitude,res.longitude)
        }
      },
      fail: function () {
        wx.showToast({
          title: '获取定位失败',
        })
      }
    })
  },

  //获得用户订单信息
  getUserOrderMark:function(latitude,longitude){
    var that=this
    //获取订单信息
    wx.request({
      url: app.globalData.serverUrl + 'getOrderInfoByToken.als',
      data: { token: wx.getStorageSync('token'), type: 2 },
      success: function (res) {
        if (res.data.status == 0) {
          that.setData({
            includePoints:[{latitude:latitude,longitude:longitude},{latitude:res.data.order.latitude,longitude:res.data.order.longitude}],
            markers: [{ latitude: res.data.order.latitude, longitude: res.data.order.longitude, iconPath:'/icon/parking.png',width:45,height:74}]
          })
        } else {
          wx.showToast({
            title: '出错了',
            icon: 'loading',
            duration: 1000
          })
        }
      },
      fail: function () {
        wx.hideLoading()
        wx.showToast({
          title: '请求失败',
          icon: 'loading',
          duration: 1000
        })
      }
    })
  },

  //显示待预约状态时,地图界面显示的按钮
  showPending:function(){
    var that = this
    var res = wx.getSystemInfoSync()
    if (that.data.countDown==60){
      that.setData({
        controls: [
          {
            id: "currentLocation",
            iconPath: "/icon/location.png",
            position: { left: 10, top: res.windowHeight - 80, width: 45, height: 45 },
            clickable: true
          },
          {
            id: "chooseTime_15",
            iconPath: "/icon/min_choose_15.png",
            position: { left: (that.data.windowWidth - 83 - 10), top: res.windowHeight - 80, width: 83, height: 45 },
            clickable: true
          },
          {
            id: "chooseTime_10",
            iconPath: "/icon/min_choose_10.png",
            position: { left: (that.data.windowWidth - 83 - 10), top: res.windowHeight - 80 -47, width: 83, height: 45 },
            clickable: true
          },
          {
            id: "chooseTime_5",
            iconPath: "/icon/min_choose_5.png",
            position: { left: (that.data.windowWidth - 83 - 10), top: res.windowHeight - 80 - 47-47, width: 83, height: 45 },
            clickable: true
          }
          // ,
          // {
          //   id: "chooseTime_all",
          //   iconPath: "/icon/min_choose_all_on.png",
          //   position: { left: (that.data.windowWidth - 50 - 10), top: that.data.windowHeight - 80 - 51 - 51-51, width: 50, height: 50 },
          //   clickable: true
          // }
        ]
      })
    }else if(that.data.countDown==5){
      that.setData({
        controls: [
          {
            id: "currentLocation",
            iconPath: "/icon/location.png",
            position: { left: 10, top: res.windowHeight - 80, width: 45, height: 45 },
            clickable: true
          },
          {
            id: "chooseTime_15",
            iconPath: "/icon/min_choose_15.png",
            position: { left: (that.data.windowWidth - 83 - 10), top: res.windowHeight - 80, width: 83, height: 45 },
            clickable: true
          },
          {
            id: "chooseTime_10",
            iconPath: "/icon/min_choose_10.png",
            position: { left: (that.data.windowWidth - 83 - 10), top: res.windowHeight - 80 - 47, width: 83, height: 45 },
            clickable: true
          },
          {
            id: "chooseTime_5",
            iconPath: "/icon/min_choose_5_on.png",
            position: { left: (that.data.windowWidth - 83 - 10), top: res.windowHeight - 80 - 47 - 47, width: 83, height: 45 },
            clickable: true
          }
          // ,
          // {
          //   id: "chooseTime_all",
          //   iconPath: "/icon/min_choose_all.png",
          //   position: { left: (that.data.windowWidth - 50 - 10), top: that.data.windowHeight - 80 - 51 - 51 - 51, width: 50, height: 50 },
          //   clickable: true
          // }
        ]
      })
    }else if(that.data.countDown==10){
      that.setData({
        controls: [
          {
            id: "currentLocation",
            iconPath: "/icon/location.png",
            position: { left: 10, top: res.windowHeight - 80, width: 45, height: 45 },
            clickable: true
          },
          {
            id: "chooseTime_15",
            iconPath: "/icon/min_choose_15.png",
            position: { left: (that.data.windowWidth - 83 - 10), top: res.windowHeight - 80, width: 83, height: 45 },
            clickable: true
          },
          {
            id: "chooseTime_10",
            iconPath: "/icon/min_choose_10_on.png",
            position: { left: (that.data.windowWidth - 83 - 10), top: res.windowHeight - 80 - 47, width: 83, height: 45 },
            clickable: true
          },
          {
            id: "chooseTime_5",
            iconPath: "/icon/min_choose_5.png",
            position: { left: (that.data.windowWidth - 83 - 10), top: res.windowHeight - 80 - 47 - 47, width: 83, height: 45 },
            clickable: true
          }
          // ,
          // {
          //   id: "chooseTime_all",
          //   iconPath: "/icon/min_choose_all.png",
          //   position: { left: (that.data.windowWidth - 45 - 10), top: that.data.windowHeight - 80 - 47 - 47 - 47, width: 45, height: 45 },
          //   clickable: true
          // }
        ]
      })
    }else if(that.data.countDown==15){
      that.setData({
        controls: [
          {
            id: "currentLocation",
            iconPath: "/icon/location.png",
            position: { left: 10, top: res.windowHeight - 80, width: 45, height: 45 },
            clickable: true
          },
          {
            id: "chooseTime_15",
            iconPath: "/icon/min_choose_15_on.png",
            position: { left: (that.data.windowWidth - 83 - 10), top: res.windowHeight - 80, width: 83, height: 45 },
            clickable: true
          },
          {
            id: "chooseTime_10",
            iconPath: "/icon/min_choose_10.png",
            position: { left: (that.data.windowWidth - 83 - 10), top: res.windowHeight - 80 - 47, width: 83, height: 45 },
            clickable: true
          },
          {
            id: "chooseTime_5",
            iconPath: "/icon/min_choose_5.png",
            position: { left: (that.data.windowWidth - 83 - 10), top: res.windowHeight - 80 - 47 - 47, width: 83, height: 45 },
            clickable: true
          }
          // ,
          // {
          //   id: "chooseTime_all",
          //   iconPath: "/icon/min_choose_all.png",
          //   position: { left: (that.data.windowWidth - 50 - 10), top: that.data.windowHeight - 80 - 51 - 51 - 51, width: 50, height: 50 },
          //   clickable: true
          // }
        ]
      })
    }
  },
  //显示已预约状态时,地图界面显示的按钮
  showOrder:function(){
    this.setData({
      controls: [
        {
          id: "currentLocation",
          iconPath: "/icon/location.png",
          position: { left: 10, top: this.data.windowHeight - 80, width: 50, height: 50 },
          clickable: true
        },
        {
          id: "orderDetail",
          iconPath: "/icon/reservationBtn.png",
          position: { left: (this.data.windowWidth - 150) / 2, top: this.data.windowHeight - 80, width: 150, height: 50 },
          clickable: true
        }
      ]
    })
    
  },

  //计算按钮偏移量
  calFirstTop:function(){
    return (this.data.windowHeight/1110)*150
  },

  onHide:function(){
    this.setData({
      countDown: 60
    })
    // clearInterval(this.data.intervalId)
  }
})
