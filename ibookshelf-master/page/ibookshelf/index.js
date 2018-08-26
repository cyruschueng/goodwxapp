var app = getApp()
var util = require('../../util/util.js')
Page({
  data: {
    userInfo: {},
    openid: null,
    bookListSize: 0,
    bookList: []
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    wx.showLoading({
      title: "loading"
    })

    // 获取用户信息与OpenId, 初始化用户配置与书籍列表
    app.getUserOpenId(function (openid, userInfo) {
      that.setData({
        userInfo: userInfo,
        openid: openid
      })

      // 初始化用户配置
      app.initUserConf()

      // 初始化用户藏书总数
      app.initBookListSize()

      // 初始化书籍列表信息
      app.initBookShelf(function () {
        that.setData({
          bookListSize: app.globalData.bookListSize,
          bookList: app.globalData.bookList
        })
        wx.hideLoading()
      })
    })
  },
  onShow: function () {
    var that = this
    that.setData({
      bookListSize: app.globalData.bookListSize,
      bookList: app.globalData.bookList
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this
    var _title = '我收藏了' + app.globalData.bookListSize + '本书'
    return {
      title: _title,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  scanCode: function () {
    wx.scanCode({
      success: function (res) {
        wx.navigateTo({
          url: '../ibookdetail/bookdetail?isbn13=' + res.result,
          fail: function (error) {
            console.log(error)
          }
        })
      },
      
      fail: function (error) {
      }
    })
  },
  gotoBookDetail: function (e) {
    var isbn13 = e.currentTarget.id
    wx.navigateTo({
      url: '../ibookdetail/bookdetail?delFlag=true&isbn13=' + isbn13,
      fail: function (error) {
        console.log(error)
      }
    })
  },
  onReachBottom: function () {
    var that = this

    if (app.globalData.bookListSize > app.globalData.currentCount) {
      app.initBookShelf(function () {
        that.setData({
          bookList: app.globalData.bookList
        })
        wx.hideLoading()
      })
    }
  },
  search: function() {
    wx.navigateTo({
      url: '../search/search',
      fail: function (error) {
        console.log(error)
      }
    })
  }
})

