// pages/share2/share2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareState: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      console.log('button')
    } 
    if (res.from === 'menu') {
      console.log(res.from)
    }
    // this.setData({
    //   shareState: true
    // })
    var that = this
    return {
      title: 'share2 title',
      path: 'pages/share2/share2',
      success: function () {
        console.log('success')
        console.log(that)
        that.setData({
          shareState: true
        })
      },
      fail: function () {
        console.log('fail')
      },
      complete: function () {
        console.log('complete')
      },
    }
  },
  //
  hideOverSpread: function () {
    this.setData({
      shareState: false
    })
  }
})