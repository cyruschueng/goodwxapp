//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  onReady:function(){
    this.mapCtx = wx.createMapContext('myMap');
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
    this.mapCtx.moveToLocation();
    
  },
  onLoad: function () {
    
  }
})
