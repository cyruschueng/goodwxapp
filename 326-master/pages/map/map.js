var util = require('../../utils/util.js');
var app = getApp()
Page({
  data: {
    map_width: '',
    map_height: '',
    // mapAddress: '',
    longitudeModi: '',
    latitudeModi: '',
    markers: [
      {
        id: 0,
        iconPath: "/images/mark.png",
        longitude: '',
        latitude: '',
        width: 30,
        height: 40
      }
    ]
  },
  // 取消 "/images/mark.png"
  buildConfiCancel:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  // 跳转到自定义位置
  midiPosi: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          hasLocation: true,
          longitude: res.longitude,
          latitude: res.latitude,
        })

        // 点击确定后跳转
        wx.navigateTo({
          url: '/pages/build/build?longitude=' + that.data.longitude + '&latitude=' + that.data.latitude,
        })
      },
      fail: function () {
        that.setData({
          errtS: true,
          errMsg: '获取当前位置失败，请自定义位置或稍后再试'
        })
        util.errtH(that)
      },
      complete: function () {
        wx.hideLoading()
       
      }
    })
  },
  onLoad: function (options) {
    var that = this;
    app.editTabBar2();
    
    wx.setNavigationBarTitle({ title: options.usr })// 设置页面名称
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy

        that.setData({
          longitude: longitude,
          latitude: latitude,
          markers: [
            {
              id: 0,
              iconPath: "/images/mark.png",
              longitude: longitude,
              latitude: latitude,
              width: 25,
              height: 25
            }
          ]
        })
      }
    })
    // app.getLocation(function (locationInfo) {  
    

    // })
    
  },
  //获取中间点的经纬度，并mark出来
  getLngLat: function () {
    var that = this;
    this.mapCtx = wx.createMapContext("map4select");
    this.mapCtx.getCenterLocation({
      success: function (res) {
        // 取默认当前点为需要的经纬度 setData
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
          markers: [
            {
              id: 0,
              iconPath: "/images/mark.png",
              longitude: res.longitude, 
              latitude: res.latitude, 
              width: 30, 
              height: 40
            }
          ]
        })
      }
    })
  },
  regionchange(e) {
    // 地图发生变化的时候，获取中间点，也就是用户选择的位置
    if (e.type == 'end') {
      this.getLngLat()
    }
  },
  markertap(e) {
  },
  // 跳转
  buildConfi: function () {
    var that = this;

    wx.navigateTo({
      url: '/pages/build/build?longitude=' + that.data.longitude + '&latitude='+that.data.latitude,
    })
  },
})