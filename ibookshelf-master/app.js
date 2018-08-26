const config = require('./config')
var util = require('util/util.js')

App({
  onLaunch: function (ops) {
    console.log('App Launch')

    // 检查网络状态
    wx.onNetworkStatusChange(function (res) {
      if(!res.isConnected) {
        wx.showModal({
          content: '请检查网络连接',
          showCancel: false
        })
      }
    })

    // 通过分享进入小程序
    if (ops.scene == 1044) {
      console.log(ops.shareTicket)
    }

  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    version: '1.0.0',
    hasLogin: false,
    openid: null,
    userInfo: null,
    bookListSize: 0,
    currentCount: 0,
    bookList: {},
    bookListUpdateFlag: false
  },
  getUserOpenId: function (cb) {
    var that = this

    if (that.globalData.openid) {
      cb(that.globalData.userInfo, that.globalData.openid)
    } else {
      wx.login({
        success: function (data) {

          // 获取用户信息
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;

              // 获取用户Openid
              wx.request({
                url: config.openidUrl + data.code,
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  that.globalData.openid = res.data.openid
                  cb(that.globalData.openid, that.globalData.userInfo)
                  if (res.data.isNew) {
                    wx.request({
                      url: config.userInfoUrl, 
                      method: 'POST',
                      data: {
                        openid: that.globalData.openid,
                        userInfo: that.globalData.userInfo
                      }
                    })
                  }
                },
                fail: function (res) {
                  console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
                }
              })
            }
          })
        },
        fail: function (err) {
          console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
          cb(err)
        }
      })
    }
  },
  initUserConf: function (cb) {
    var that = this
    wx.request({
      url: config.userConfUrl + that.globalData.openid,
      success: function (res) {
        wx.setStorage({
          key: "autoAdd",
          data: res.data.autoAdd
        })
      }
    })
  },
  initBookListSize: function (cb) {
    var that = this

    wx.request({
      url: config.countOwnedBooksUrl,
      data: {
        openid: that.globalData.openid
      },
      method: 'POST',
      success: function(res) {
        that.globalData.bookListSize = res.data.bookListSize
      }
    })
  },
  initBookShelf: function (cb) {
    var that = this

    wx.request({
      url: config.ownedbooksUrl,
      data: {
        openid: that.globalData.openid,
        currentCount: that.globalData.currentCount
      },
      method: 'POST',
      success: function (res) {
        // that.globalData.bookList = res.data
        for (var isbn13 in res.data) {
          that.globalData.currentCount++
          that.globalData.bookList[isbn13] = res.data[isbn13]
          that.globalData.bookList[isbn13].adddate = new Date(that.globalData.bookList[isbn13].addAt).format("yyyy-MM-dd")
        }
        typeof cb == "function" && cb()
      },
      fail: function (res) {
        console.log('查询用户藏书列表失败', res)
      }
    })
  }
})