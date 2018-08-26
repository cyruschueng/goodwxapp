var city = require('../../utils/city.js');
var app = getApp();
Page({
  data: {
    imgUrls: [
      '/img/carousel2.jpg',
      '/img/carousel1.jpg',
      '/img/carousel3.jpg',
      '/img/carousel4.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    list: [],
    newli: [],
    all: [],
    goodsUrl: app.globalData.goodsCover,
    bi: 1
  },
  changeTap: function (e) {
    var that = this
    if (e.currentTarget.dataset.id == 1) {
      this.setData({
        bi: 1,
        list: that.data.newli
      })
    } else {
      wx.request({
        url: app.globalData.api + 'getAllGoodsForApp.do',
        data: {},
        method: 'GET',
        success: function (res) {
          that.setData({
            list: res.data,
            all: res.data
          })
        },
        fail: function (res) {
          wx.showToast({
            title: '服务器维护中',
            icon: 'loading',
            duration: 2000
          })
        },
        complete: function (res) {
          that.setData({
            bi: 2,
            list: that.data.all
          })
        }
      })

    }
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
    wx.showLoading({
      title: '加载中...',
    })
    this.load()
    setTimeout(function () {
      wx.hideLoading()
    }, 500)
  },
  navToDetail: function (e) {
    wx.navigateTo({
      url: '/pages/detail/detail?id='+e.currentTarget.dataset.id
    })
  },
  onShareAppMessage: function () {
    return {
      title: '永仁木皮首页',
      path: '/page/index/index'
    }
  },
  onLoad: function (options) {
  },
  load: function () {
    var that = this
    wx.request({
      url: app.globalData.api + 'getNewGoodsForApp.do',
      data: {},
      method: 'GET',
      success: function (res) {
        that.setData({
          newli: res.data,
          list: res.data
        })
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  onReady: function () {
  },
  onShow: function () {
    this.load()
    app.getUserInfo()
  },
  onHide: function () {
  },
  onUnload: function () {
  }
})