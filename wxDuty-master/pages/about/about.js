// pages/about/about.js
//about.js
//获取应用实例
var app = getApp()
Page({
  data: {
    logosrc: '../../image/logo.jpg',
    adrimg: '../../image/icon-address.png',
    clockimg: '../../image/icon-clock.png',
    phoneimg: '../../image/icon-phone.png',
    jtimg: '../../image/icon-jt.png',
    picimg: '../../image/icon-pic.png',
    imgUrls: [
      '../../image/beauti/one.jpg',
      '../../image/beauti/two.jpg',
      '../../image/beauti/three.jpg',
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  calling: function () {
    wx.makePhoneCall({
      phoneNumber: '1xxxxxxxxxx',
    })
  },
  getLocation: function () {
    wx.openLocation({
      latitude: 31.17,
      longitude: 121.39,
      name: "新意城城市之光",
      address: "上海市闵行区新意城",
      scale: 28
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})
