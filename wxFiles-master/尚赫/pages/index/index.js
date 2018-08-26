//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    imgUrls: [
      '/img/jf.jpg'
    ],
    height: '',
    systemInfo:null
  },
  navToLocation(){
    wx.openLocation({
      latitude: this.data.systemInfo.latitude,
      longitude: this.data.systemInfo.longitude,
      scale: 16,
      name:this.data.systemInfo.shopName
    })
  },
  telPhone(){
    wx.makePhoneCall({
      phoneNumber: this.data.systemInfo.shopPhone,
    })
  },
  onLoad: function () {
    var that = this;
    app.post('system/info/wx/find', { id: 1 }, function (res) {
      that.setData({
        systemInfo: res.body
      })
    })
    
  },

})
