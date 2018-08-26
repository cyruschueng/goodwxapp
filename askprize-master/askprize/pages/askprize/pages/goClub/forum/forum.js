// pages/goClub/forum/forum.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.data.loading = 1;
    wx.navigateToMiniProgram({
      appId: 'wx08cd8cd9371fba0d',
      path: 'pages/news/index/index',
      extraData: {
        foo: 'bar'
      },
      // envVersion: 'develop',
      success(res) {
        // 打开成功
        console.log('成功执行');
        console.log(res);
      },
      complete(resall) {
        wx.hideLoading();
        wx.switchTab({
          url: '/pages/prize/detail/detail',
          complete(res) {
            that.data.loading = 0;
            console.log('tabBar comlll');
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.hideLoading();
    if (!that.data.loading) {
      this.onLoad();
    }
    console.log('show function running');
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