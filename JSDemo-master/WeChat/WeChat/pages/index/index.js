//index.js
//获取应用实例
var app = getApp()
// var WXBizDataCrypt = require('../../Common/WXBizDataCrypt');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },

  onLoad: function () {
    // wx.hideShareMenu()
    wx.showShareMenu({
      withShareTicket: true,
      complete: function (res) {
        console.log(res)
      }
    })

    wx.showModal({
      title: '提示',
      content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
      cancelText: '加载更多',
      confirmText: '已经完成',
      success: function (res) {
        if (res.confirm) {
          wx.showToast({
            title: 'done',
          })
        } else {
          wx.showLoading({
            title: 'loading...',
            mask: true,
          })

          setTimeout(function () {
            wx.hideLoading()
          }, 2000)
        }
      }
    })
    
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      success: function (res) {
        // 分享成功
        // console.log(res)
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success:function(shareInfo) {
            // console.log(shareInfo)
            
            // console.log(common.decode(encryptedData))
          },
          fail: function(shareInfoFail) {
            // console.log(shareInfoFail)
          }
        })
      },
      fail: function (res) {
        // 分享失败
      }
    }
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  //事件处理函数2
  bindViewTap2: function () {
    wx.navigateTo({
      url: '../test/test'
    })
  },

})
