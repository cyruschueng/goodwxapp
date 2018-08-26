//  index.js
//获取应用实例
const filter = require('../../filter');
var app = getApp()
Page(filter.loginCheck({
  data: {
    motto: 'Hello World1',
    userInfo: {},
    isshow:false,
    data:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  gotoRank:function(){
    wx.redirectTo({
      url: '../rank/rank'
    })
  },
  gotoRule: function () {
    wx.redirectTo({
      url: '../rule/rule'
    })
  },
  userInfoReadyCallback: function () {
    var that = this
    that.setData({
      userInfo: app.globalData.userInfo,
      isshow: app.globalData.userInfo.isbind
    })
  },
  onLoad: function () {
    console.log('onLoad111')
    var that = this
    if (app.globalData.userInfo) {
      that.userInfoReadyCallback();
    }
    //调用应用实例的方法获取全局数据
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '测试标题',
      path: '/rank/rank',
      success: function (res) {
        // 转发成功
        console.log(res)
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
}))
