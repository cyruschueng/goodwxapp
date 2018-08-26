//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    balance: 0
  },
  linkToRecord: function () { // 跳转到记录页面
    wx.navigateTo({
      url: '../record/record'
    })
  },
  linkToQuestion: function () { // 跳转到常见问题页
    wx.navigateTo({
      url: 'question/question'
    })
  },
  linkToMoney: function () { // 跳转到提现
    wx.navigateTo({
      url: '../money/money'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.getAccount();
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
      title: '泡面小红包',
      path: '/pages/index/index',
      imageUrl:'http://cache.fotoplace.cc/redpacket_video/pm002.jpeg',
      success: function (res) {
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: function (res) { console.log(res) },
          fail: function (res) { console.log(res) },
          complete: function (res) { console.log(res) }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getAccount: function () {
    var sessionid = app.globalData.jsessionid;
    wx.request({
      url: app.globalData.baseUrl + '/api/packet/account?jsessionid=' + sessionid,
      success: result => {
        console.log("getAccount=" + JSON.stringify(result.data));
        if (result.data && result.data.status == 0 && result.data.data) {
          this.setData({
            balance: result.data.data.amount
          })
        }
      }
    })
  },
})
