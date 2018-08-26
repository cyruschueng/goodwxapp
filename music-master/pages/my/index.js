// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        console.log(res)
        var status = res.status
        var dataUrl = res.dataUrl
        var currentPosition = res.currentPosition
        var duration = res.duration
        var downloadPercent = res.downloadPercent
      }
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
    // 在 Page 中定义 onShareAppMessage 函数，设置该页面的转发信息。
    // 只有定义了此事件处理函数，右上角菜单才会显示 “转发” 按钮
    // 用户点击转发按钮的时候会调用
    // 此事件需要 return 一个 Object，用于自定义转发内容
    return {
      title: 'music', //默认 当前小程序名称
      path: '/pages/index/index', // 当前页面 path ，必须是以 / 开头的完整路径	
      success: function (res) {
        // 转发成功
        console.log(res)
      },
      fail: function (err) {
        // 转发失败
        console.log(err)

      }
    }
  }
})