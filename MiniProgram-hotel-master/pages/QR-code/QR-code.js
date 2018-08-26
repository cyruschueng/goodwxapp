// pages/QR-code/QR-code.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPic:'',
    userName:'',
    shopName:'CCTV',
    infoImg:'/image/infocode.jpg'
  },

  onShareAppMessage: function () {
    return {
      title: '我为CCTV代言',
      path: '/pages/QR-code/QR-code',
      success: function (res) {
        console.log('转发',res)
        var shareTickets = res.shareTickets;
        if (shareTickets.length == 0) {
          return false;
        }
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            console.log('获取转发信息',res)
            var encryptedData = res.encryptedData;
            var iv = res.iv;
          }
        })
      },
      fail: function (res) {
        console.log('转发失败',res)
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    try {
      var user_id = wx.getStorageSync('user_id')
      var userMessage = wx.getStorageSync('user_info')
      that.setData({
        userId: user_id,
        userPic: userMessage.avatarUrl,
        userName: userMessage.nickName
      })
    } catch (e) {
      // Do something when catch error
    } 

    //转发前配置转发信息
    wx.showShareMenu({
      withShareTicket: true,
      success: function(res) {
        console.log('----',res)
        
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    console.log('===', options)
    /** 判断场景值，1044 为转发场景，包含shareTicket 参数 */
    if (options.scene == 1044) {
      wx.getShareInfo({
        shareTicket: options.shareTicket,
        success: function (res) {
          var encryptedData = res.encryptedData;
          var iv = res.iv;
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})