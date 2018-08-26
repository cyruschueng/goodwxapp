//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    code: null
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    console.log(app.globalData.code)
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo,
        // code:code
      })
    })
  },
  navitofirst: function(){
    wx.navigateTo({
      url: '../first/first'
    })
  },
  vibra: function(){
    wx.vibrateLong({
      success: function(res) {console.log('success')},
      fail: function(res) {console.log('fail')},
      complete: function(res) {console.log('complete')},
    })
    wx.vibrateLong({
      success: function (res) { console.log('success') },
      fail: function (res) { console.log('fail') },
      complete: function (res) { console.log('complete') },
    })
    wx.vibrateLong({
      success: function (res) { console.log('success') },
      fail: function (res) { console.log('fail') },
      complete: function (res) { console.log('complete') },
    })
  }
})
