var app = getApp();
Page({
  data: {
    userInfo:{}
  },
  onLoad: function (options) {
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    console.log(wx.getStorageSync('userInfo'))
    this.setData({
      userInfo:wx.getStorageSync('userInfo')
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  navToMsg:function(){
    wx.navigateTo({
      url: '/pages/msg/msg'
    })
  },
  showModel: function () {
    wx.showModal({
      title: '提示',
      content: '暂未开放'
    })
  },
  navToAbout: function () {
    wx.navigateTo({
      url: '/pages/about/about'
    })
  },
  navToAddress: function () {
    wx.navigateTo({
      url: '/pages/address/address'
    })
  },
  navToOrder: function () {
    wx.navigateTo({
      url: '/pages/order/order'
    })
  },
  navToRequest: function () {
    wx.navigateTo({
      url: '/pages/request/request'
    })
  }
})