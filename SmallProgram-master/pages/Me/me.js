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


  /*
  事件
  */
  toView: function () {

    wx:wx.navigateTo({
      url: '../view/view'
    })

  },

  toScrollview: function () {

    wx: wx.navigateTo({
      url: '../scrollview/scrollview'
    })

  },

  toSwiper: function () {

    wx: wx.navigateTo({
      url: '../swiper/swiper'
    })

  },

  toIcon: function () {

    wx: wx.navigateTo({
      url: '../icon/icon'
    })

  },

  toText: function () {

    wx: wx.navigateTo({
      url: '../text/text'
    })

  },

  toProgress: function () {

    wx: wx.navigateTo({
      url: '../progress/progress'
    })

  },

  toButton: function () {

    wx: wx.navigateTo({
      url: '../button/button'
    })

  },

  toCheckbox: function () {

    wx: wx.navigateTo({
      url: '../checkbox/checkbox'
    })

  },

  toInput: function () {

    wx: wx.navigateTo({
      url: '../input/input'
    })

  },

  toPicker: function () {

    wx: wx.navigateTo({
      url: '../picker/picker'
    })

  },

  toShare: function () {

    wx: wx.navigateTo({
      url: '../share/share'
    })

  },

  toFlex: function () {

    wx: wx.navigateTo({
      url: '../flex/flex'
    })

  }






})