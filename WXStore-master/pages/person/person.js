// pages/person/person.js
const app = getApp()
const serverHost = app.globalData.serverHost;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //订单管理
  orderManage: function () {
    console.log("order");
    wx.navigateTo({
      url: '../order/manage/orderManage',
    })
  },
  //地址管理
  addressManage: function () {
    console.log("address");
    wx.navigateTo({
      url: '../address/address?from=person',
    })
  },
  //用户推荐
  userCommend: function () {
    console.log("user");
    wx.navigateTo({
      url: '../user/userCommend/userCommend'
    })
  },
  //返佣现金
  returnMoney: function () {
    console.log("money");
    wx.navigateTo({
      url: '../money/money',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log("callback====" + JSON.stringify(res));
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
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})