// pages/image/image.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kefutu: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  tiao: function (e) {
    wx.navigateToMiniProgram({
      appId: getApp().globalData.appid ,
      path: 'pages/index/index',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'release',
      success(res) {
        //console.log("ok")
      }
    })
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://caimusic4.mytp8.cn/public_html/index.php/index/Imgs/img',
      headers: { 'Content-Type': 'application/json' },
      success: function (res) {
        var appid = res.data.appid
        getApp().globalData.appid = res.data.appid
        console.log(res)
        that.setData({
          kefutu: res.data.img,
        })
      }
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