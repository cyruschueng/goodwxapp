//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World!!',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    console.log('go')
    wx.switchTab({
      url: '../list/list'
    })
  },
  onLoad: function () {
    console.log("index:onload")
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
      return{
        "title":"赠送给好友",
        "desc":"送给好友一份保险"

      }
  },
  onShow:function(){
    wx.showShareMenu({
      "withShareTicket":true
    })
    // debugger
    wx.getShareInfo({
      shareTicket: '123',
      success:function(res){
        alert(res)
      }
    })
    console.log('index:onshow')
  }
})
