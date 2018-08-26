//app.js
var network = require('/utils/network.js')
var settings = require('/secret/settings.js')
var fav = require('/utils/favorite.js')

App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    this.initData()
    this.initFavorite()
  },

  onHide: function() {

  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null,
  },

  initFavorite: function () {
    let localFav = wx.getStorageSync('selectedSymbols')
    if (localFav && localFav.length > 0) {
      let params = []
      for (let i in localFav) {
        if (localFav[i]){
          params.push(localFav[i].name + '--' + localFav[i].symbol) 
        }
      }

      network.POST({
        url: settings.initFavoriteListUrl,
        params: {
          favorite_list: params.join()
        },
        success: function () {
          wx.removeStorage({
            key: 'selectedSymbols',
            success: function(res) {},
          })
        },
      })

    }
  },

  initData: function () {
    wx.getStorageInfo({
      success: function (res) {
        console.log('已使用空间: ', res.currentSize)
        console.log('全部空间: ', res.limitSize)

        let initData = {
          // fiatList: ['人民币', '美元'],
          // defaultFiatIndex: 0,
          // symbolCnt: ['Top 200', 'Top 500'],
          // symbolCntIndex: 0,
          // currencyListCnt: 200,
          riseColor: 'green',
          // selectedSymbols: [],
        }

        for (let item in initData) {
          // if (!(res.keys.includes(item))) {
          if (-1 === res.keys.indexOf(item)) {
            console.log('init ', item)
            wx.setStorage({
              key: item,
              data: initData[item],
            })
          }
        }
      }
    })
  }
})
