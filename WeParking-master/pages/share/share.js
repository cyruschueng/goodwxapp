//share.js
//获取应用实例
var app = getApp()
Page({
  data: {
    shareStatus:0,
    windowHeight: 0,
    windowWidth: 0,
    controls: [],
    markers:[],
    includePoints:[],
    latitude: 39.91543309328607,
    longitude: 116.45597668647765,
    carNumber: "",
    carColor: "",
    minButton1: { plain: false, color: "#ffffff", bgColor:"#f4c600"},
    minButton2: { plain: true, color: "#000000", bgColor: "#ffffff" },
    minButton3: { plain: true, color: "#000000", bgColor: "#ffffff" },
    minButton4: { plain: true, color: "#000000", bgColor: "#ffffff" },
    selectedMin:15,
    inputMin:"",
    inputValue:"",
    chooseMapText:"点击此处标记您车位的位置",
    shareName:"",
    shareAddress:"",
    shareLatitude:0,
    shareLongitude:0,
    addressRemark:''
  },
  onLoad: function () {
    if (wx.canIUse('getSystemInfoSync.return.SDKVersion')) {
      //获得微信版本信息,检测兼容性
      var res = wx.getSystemInfoSync()
      this.setData({
        windowWidth:res.windowWidth,
        windowHeight:res.windowHeight
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
    } else {
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
  },
  onReady: function () {
    if(this.data.shareStatus==2){
      wx.setNavigationBarTitle({
        title: '基本信息',
      })
    }else if(this.data.shareStatus==3){
      wx.setNavigationBarTitle({
        title: '共享'
      })
    }else if(this.data.shareStatus==4){
      wx.setNavigationBarTitle({
        title: '共享停车位'
      })
    }
    this.mapContext = wx.createMapContext('shareMap')
  },
  onShow: function () {
    var that = this
    if (app.globalData.useStatus==0){
      wx.showLoading({
        title: '加载中..'
      })
      wx.request({
        url: app.globalData.serverUrl + 'getUserShareStatus.als',
        data: { token: wx.getStorageSync('token') },
        success: function (res) {
          wx.hideLoading()
          //未绑定手机
          if (res.data.status == 1) {
            wx.redirectTo({
              url: '/pages/bindPhone/bindPhone'
            })
          } else if (res.data.status == 2) { //该用户尚未设置车辆信息 
            that.setData({
              shareStatus:2
            })
          } else if (res.data.status == 3) { //该用户当前有共享的订单
            that.setData({
              shareStatus:3
            })
            that.showOrderBtn()
            that.getUserLocation()
          } else if(res.data.status==4){    //该用户当前没有共享的订单
            that.setData({
              shareStatus:4,
              includePoints: [],            
            })
            that.getShareLocation()         //获得定位,用于当用户共享车位时,比较用户当前位置和共享车位的位置之间的距离
          }else {
            wx.showToast({
              title: '出错了',
              icon: "loading",
              duration: 1000
            })
          }
        },
        fail:function(){
          wx.showModal({
            title: '提示',
            content: '网络不太通畅,请稍后再试',
            showCancel:false,
            confirmColor:'#f4c600',
            success:function(res){
              if(res.confirm){
                
              }
            }
          })
        }
      })
    }else{
      wx.showLoading({
        title: '加载中..'
      })
    }
  },

  //定位按钮点击事件
  bindcontroltap: function (e) {
    if (e.controlId == 'currentLocation') {
      this.getUserLocation()
    } else if (e.controlId == 'orderDetail') {
        wx.navigateTo({
          url: '/pages/shareInfoModal/shareInfoModal?type=1',
        })
    }
  },

  //获得用户地理位置
  getUserLocation: function () {
    var that = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success(res) { //用户同意授权
              that.getLocation()
            },
            fail() { //用户拒绝授权,opensetting
              console.log('用户拒绝')
            }
          })
        } else { //有地图授权
          console.log('有地图授权')
          that.getLocation()
        }
      }
    })
  },

  getLocation: function () {
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        // that.mapContext.moveToLocation()
        that.getUserOrderMark(res.latitude, res.longitude)
      },
      fail: function () {
        console.log('获取定位失败')
      }
    })
  },

  getShareLocation: function(){
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      },
      fail: function () {
        
      }
    })
  },

  //获得用户订单信息
  getUserOrderMark: function (latitude, longitude) {
    var that = this
    //获取订单信息
    wx.request({
      url: app.globalData.serverUrl + 'getOrderInfoByToken.als',
      data: { token: wx.getStorageSync('token'), type: 1 },
      success: function (res) {
        console.log(res.data)
        if (res.data.status == 0) {
          console.log(res.data.order)
          that.setData({
            includePoints: [{ latitude: latitude, longitude: longitude }, { latitude: res.data.order.latitude, longitude: res.data.order.longitude }],
            markers: [{ latitude: res.data.order.latitude, longitude: res.data.order.longitude, iconPath: '/icon/parking.png', width: 45, height: 74 }]
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

  //已共享状态时,地图界面显示的按钮
  showOrderBtn: function () {
    var that = this
    var res = wx.getSystemInfoSync()
    this.setData({
      windowHeight: res.windowHeight,
      windowWidth: res.windowWidth,
      controls: [
        {
          id: "currentLocation",
          iconPath: "/icon/location.png",
          position: { left: 10, top: res.windowHeight - 80, width: 50, height: 50 },
          clickable: true
        },
        {
          id: "orderDetail",
          iconPath: "/icon/sharedBtn.png",
          position: { left: (res.windowWidth - 150) / 2, top: res.windowHeight - 80, width: 150, height: 50 },
          clickable: true
        }
      ]
    })
   
  },
  getCarNumber: function (e) {
    this.setData({
      carNumber: e.detail.value
    })
  },
  getCarColor: function (e) {
    this.setData({
      carColor: e.detail.value
    })
  },
  bindCar: function () {
    var carNumber = this.data.carNumber
    var carColor = this.data.carColor
    var verify = /^([冀豫云辽黑湘皖鲁苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼渝京津沪新京军空海北沈兰济南广成使领][a-zA-Z](([DF](?![a-zA-Z0-9]*[IO])[0-9]{4})|([0-9]{5}[DF])))|([冀豫云辽黑湘皖鲁苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼渝京津沪新京军空海北沈兰济南广成使领A-Z]{1}[a-zA-Z0-9]{5}[a-zA-Z0-9挂学警港澳]{1})$/
    if (carNumber.length == 0) {
      wx.showToast({
        title: '请输入车牌号',
        icon: 'loading',
        duration: 1000
      })
    }else if(!verify.test(carNumber)){
      wx.showToast({
        title: '车牌号不正确',
        icon: 'loading',
        duration: 1000
      })
    }else if (carColor.length == 0) {
      wx.showToast({
        title: '请输入颜色',
        icon: 'loading',
        duration: 1000
      })
    } else {
      var that = this
      wx.showLoading({
        title: '请稍候..',
      })
      wx.request({
        url: app.globalData.serverUrl + 'bindCar.als',
        data: { token: wx.getStorageSync('token'), carNumber: carNumber, color: carColor },
        success: function (res) {
          wx.hideLoading()
          if (res.data.status == 0) {
            wx.showModal({
              title: '提示',
              content: '提交成功',
              showCancel:false,
              confirmColor:'#f4c600',
              success:function(res){
                if(res.confirm){
                  that.onShow()
                }
              }
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
            title: '连接错误',
            icon: 'loading',
            duration: 1000
          })
        }
      })
    }
  },
  chooseMin:function(e){
    var min=e.currentTarget.dataset.min
    this.minStatusUpdate(min)
  },

  minStatusUpdate:function(min){
    var selectedStatus = { plain: false, color: "#ffffff", bgColor: "#f4c600" }
    var unSelecctedStatus = { plain: true, color: "#000000", bgColor: "#ffffff" }
    if (min == 15) {
      this.setData({
        inputValue: '',
        selectedMin: 15,
        minButton1: selectedStatus,
        minButton2: unSelecctedStatus,
        minButton3: unSelecctedStatus,
        minButton4: unSelecctedStatus
      })
    } else if (min == 30) {
      this.setData({
        inputValue:'',
        selectedMin: 30,
        minButton1: unSelecctedStatus,
        minButton2: selectedStatus,
        minButton3: unSelecctedStatus,
        minButton4: unSelecctedStatus
      })
    } else if (min == 45) {
      this.setData({
        inputValue: '',
        selectedMin: 45,
        minButton1: unSelecctedStatus,
        minButton2: unSelecctedStatus,
        minButton3: selectedStatus,
        minButton4: unSelecctedStatus
      })
    } else if (min == 60) {
      this.setData({
        inputValue: '',
        selectedMin: 60,
        minButton1: unSelecctedStatus,
        minButton2: unSelecctedStatus,
        minButton3: unSelecctedStatus,
        minButton4: selectedStatus
      })
    }
  },

  inputMin:function(e){
    var min=e.detail.value
    var selectedStatus = { plain: false, color: "#ffffff", bgColor: "#f4c600" }
    var unSelecctedStatus = { plain: true, color: "#000000", bgColor: "#ffffff" }
    if(min.length>0){ 
        this.setData({
          inputMin:min,
          minButton1: unSelecctedStatus,
          minButton2: unSelecctedStatus,
          minButton3: unSelecctedStatus,
          minButton4: unSelecctedStatus
        }) 
    }else{
      this.setData({
        inputMin:"",
      })
      this.minStatusUpdate(this.data.selectedMin)
    }
  },
  chooseCarLocation:function(){
    var that=this
    wx.chooseLocation({
      success: function(res) {
        var distance = app.getDistance(that.data.latitude, that.data.longitude, res.latitude, res.longitude)
        //检查用户选取的位置经纬度和用户当前位置经纬度的距离,如果大于3千米,该位置无效
        if (distance>3){
          wx.showModal({
            title: '提示',
            content: '您选择的车位位置,与您当前的位置距离过远,请重新选择',
            showCancel:false,
            confirmColor:'#f4c600',
            success:function(res){

            }
          })
          that.setData({
            chooseMapText: "点击此处标记您车位的位置"
          })
        }else{
          that.setData({
            chooseMapText:res.name+";"+res.address,
            shareName: res.name,
            shareAddress: res.address,
            shareLatitude: res.latitude,
            shareLongitude: res.longitude
          })
        }
      },
      cancel:function(){
        that.setData({
          chooseMapText:"点击此处标记您车位的位置"
        })
      }
    })
  },

  bindAddressRemark:function(e){
    var remark=e.detail.value
    if(remark.length>0){
      this.setData({
        addressRemark:remark
      })
    }else{
      this.setData({
        addressRemark:''
      })
    }
  },

  //共享停车位
  sharingParking:function(){
    var inputMin=this.data.inputMin
    var lastMin=0
    if (inputMin.length == 0) {
      lastMin = this.data.selectedMin
    }else{
      if (inputMin < 5 || inputMin > 60) {
        wx.showToast({
          title: '自定义分钟数不正确',
          icon: 'loading',
          duration: 1000
        })
        return;
      }else{
        lastMin = inputMin
      }
    }

    //检查车位位置选取情况
    var mapText = this.data.chooseMapText
    if (mapText == '点击此处标记您车位的位置') {
      wx.showToast({
        title: '请标记位置',
        icon: 'loading',
        duration: 1000
      })
      return
    } else {
      //发布车位
      var that=this
      wx.showLoading({
        title: '请稍等..',
      })
      wx.request({
        url: app.globalData.serverUrl +'startSharingOrder.als',
        data:{
          token:wx.getStorageSync('token'),
          minute:lastMin,
          longitude: that.data.shareLongitude,
          latitude: that.data.shareLatitude,
          name:that.data.shareName,
          address:that.data.shareAddress,
          addressRemark:that.data.addressRemark
        },
        success:function(res){
          wx.hideLoading()
          if(res.data.status==0){
            wx.showModal({
              title: '提示',
              content: '车位发布成功',
              showCancel:false,
              confirmColor:'#f4c600',
              success:function(res2){
                if(res2.confirm){
                  that.onShow()
                }
              }
            })
          }else{
            wx.showToast({
              title: '出错了',
              icon:'loading',
              duration:1000
            })
          }
        },
        fail:function(){
          wx.hideLoading()
          wx.showToast({
            title: '出错了',
            icon: 'loading',
            duration: 1000
          })
        }
      })
    }
  }
})