var app = getApp()

Page({
  data: {
    imgUrls: [
      '/img/car1.jpg',
      '/img/car3.png'
    ],
  },
  onLoad: function () {
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  }
})
