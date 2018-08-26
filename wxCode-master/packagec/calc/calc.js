// calc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num0: "0",
    num1: "0",
    result: "0",
    show: "0"
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
  onShareAppMessage: function () {
  
  },

  // 点击数字时
  tapNum: function (event) {
    // console.log(event)
    var num = event.target.dataset.num
    console.log(num)
    if (num === 0) {

    } else {
      // this.show += num
      // result = show
      // this.setData({ show: wx.getStorageSync('show') += num })
      this.setData({show: 2})
      console.log(wx.getStorageSync('show'))
    }
  }
})