// pages/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareAble: true,
    shareAfter: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var info = wx.getShareInfo()
    // console.log(info)
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      console.log(res)
    }
    else {
      console.log(res)
    }
    // console.log(this)
    var that = this
    return {
      title: 'custom share title',
      path: 'pages/share/share',
      // path: 'pages/six/six',
      imgUrl: '../../image/girl.jpg',
      imageUrl: '../../image/mountain.jpg',
      sucess: function (res) {
        // console.log(res)
        this.setData({
          shareAble: false
        })
        console.log(shareAble)
        wx.showShareMenu({
          withShareTicket: true
        })
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) {
        console.log('share complete')
        that.setData({
          shareAble: false
        })
        console.log(that)
      }
    }
  },

  ctrlShare: function () {
    wx.onShareAppMessge({
    //   return {
    //     title: 'ctrlShare title',
    //     path: 'pages/share/share',
    //     imageUrl: '../../image/food.jpg',
    //     sucess: function () {
    //       this.setData({
    //         shareAfter: true
    //       })
    //     },
    //     complete: function () {
    //       this.setData({
    //         shareAfter: true
    //       })
    //     }
    //   }
    })
  }
})