// location.js

var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderInfo:[],
    latitude: 39.91543309328607,
    longitude: 116.45597668647765,
    markers:[]
  },

 
  onLoad: function (options) {
    //根据id获取订单信息
    if(options.orderId){
      var that=this
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: app.globalData.serverUrl + 'getOrderInfoById.als',
        data: { id: options.orderId },
        success: function (res) {
          wx.hideLoading()
          if (res.data.status == 0) {
            that.setData({
              orderInfo:res.data.order
            })
            that.getUserOrderMark()
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
    }
  },

  onShow: function () {

  },


  //获得用户订单信息
  getUserOrderMark: function () {
    this.setData({
      latitude: this.data.orderInfo.latitude,
      longitude: this.data.orderInfo.longitude,
      markers: [{ latitude:this.data.orderInfo.latitude, longitude: this.data.orderInfo.longitude, iconPath: '/icon/parking.png', width: 45, height: 74 }]
    })
  },
})