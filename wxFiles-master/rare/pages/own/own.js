var app = getApp()
Page({
  data: {
    nickname: '',
    avatarurl: '',
    vip:['普通会员','黄金会员','铂金会员'],
    vflag:0
  },
  navToCollection: function () {
    wx.navigateTo({
      url: '/pages/collection/collection',
    })
  },
  navToOwnmsg: function () {
    wx.navigateTo({
      url: '/pages/ownmsg/ownmsg',
    })
  },
  navToIntegral: function () {
    wx.navigateTo({
      url: '/pages/integral/integral',
    })
  },
  navToAddress:function(){
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },
  navToCart:function(){
    wx.navigateTo({
      url: '/pages/cart/cart',
    })
  },
  navToAbout:function () {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  onLoad: function (options) {
    var that = this
    app.load(that)
    if (app.globalData.countintegral < app.globalData.lv1){
      this.setData({
        vflag: 0
      })
    } else if (app.globalData.countintegral >= app.globalData.lv2 && app.globalData.countintegral < app.globalData.lv3){
      this.setData({
        vflag: 1
      })
    }else{
      this.setData({
        vflag: 2
      })
    }
  },
  navToOrder: function () {
    wx.navigateTo({
      url: '/pages/order/order',
    })
  },
  onReady: function () {
  
  },

  onShow: function () {
    this.setData({
      nickname:app.globalData.nickName,
      avatarurl: app.globalData.avatarUrl
    })
  },

  onHide: function () {
  
  },

  onUnload: function () {
  
  },

  onPullDownRefresh: function () {
  
  },

  onReachBottom: function () {
  
  },

  onShareAppMessage: function () {
  
  },

  onReachBottom: function () {
  
  },

  onPullDownRefresh: function () {
  
  }
})