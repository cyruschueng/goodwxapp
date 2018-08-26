// pages/main/main.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      { id: 1, srcUrl: "/images/index1.jpg" },
      { id: 2, srcUrl: "/images/index2.jpg" },
      { id: 3, srcUrl: "/images/index3.jpg" }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    var shareUserId = options.shareUserId
    // console.log("shareUserId:" + shareUserId)
    var targetUserId = app.globalData.userInfoId;
    if (targetUserId) {
      // console.log("targetUserId:" + targetUserId)
      if (shareUserId && shareUserId > 0 && shareUserId != targetUserId && app.globalData.shareTicket==null) {
        // console.log("保存分享记录")
        app.logShareSuccess(app, shareUserId, targetUserId, 1, "首页")
      }
    } else {
      // console.log(shareUserId)
      if (shareUserId) {
        var returnUrl = encodeURIComponent("/pages/main/main?shareUserId=" + shareUserId)
        // console.log(returnUrl)
        var toUrl = "/pages/index/index?returnUrl=" + returnUrl;
        // console.log(toUrl)
        wx.redirectTo({
          url: toUrl
        })
      }
    }

    wx.showShareMenu({
      withShareTicket: true
    })
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
    wx.showShareMenu({
      withShareTicket: true
    })
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
    return {
      title: '百莲达欢迎您',
      path: 'pages/main/main?shareUserId=' + app.globalData.userInfoId,
      success: function (res) {
        // console.log(res);
        wx.showShareMenu({
          // 要求小程序返回分享目标信息
          withShareTicket: true
        });
        if (res.shareTickets && res.shareTickets[0]) {
          console.log(res);
          wx.getShareInfo({
            shareTicket: res.shareTickets[0],
            success(res) {
              app.shareInfoAES(app, res, {}, function (result) {
                console.log(result)
                app.logShare(app, app.globalData.userInfoId, 1, "首页",result.data.openGId)
              })
            }
          })
        }else{
          app.logShare(app, app.globalData.userInfoId, 1, "首页")
        }
      },
      fail: function (res) {
        console.log(res);
      }
    }
  },
  callPhoneEvent: function () {
    wx.makePhoneCall({
      phoneNumber: '0595-88360567'
    })
  },
  locationEvent: function (e) {
    wx.openLocation({
      latitude: 24.77178,
      longitude: 118.46481,
      scale: 28,
      name: "百莲达美容美发会所",
      address: "福建省泉州市晋江市吉安中路168号",
      success: function (res) {

      }
    })
  },
  buyEvent: function (e) {
    wx.navigateTo({
      url: "/pages/pay/pay",
    })
  }
  , subscribeEvent: function (e) {
    wx.makePhoneCall({
      phoneNumber: '0595-88360567'
    })
  }
  , shopServiceEvent: function (e) {
    wx.makePhoneCall({
      phoneNumber: '0595-88360567'
    })
  },
  fetchEvent: function (e) {
    wx.showToast({
      title: '领取相关事项，欢迎到店咨询！',
      icon: 'none',
      duration: 2000
    })
  }
  , subscribeSomebodyEvent: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.target.dataset.tel
    })
  }
})