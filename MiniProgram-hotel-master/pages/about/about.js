// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['关于我们','联系方式', '地图导航', '招聘英才'],
    title:'洛可可主题酒店',
    phone:'13888853544',
    telephone:'020-4543512',
    weChat:'sda44151',
    QQ:'53435531',
    address:'北京市故宫长江路11号'
  },


  navbarTap: function (e) {
    var currentTab = e.currentTarget.dataset.id
    this.setData({
      currentTab: currentTab
    })
    if (currentTab==2){
      wx.openLocation({
        latitude: 23.129163,
        longitude: 113.264435,
        scale: '30',
        name: '洛可可酒店',
        address: '天湖路15号',
        success: function (res) { },
      })
    }
  },

  phone: function () {
    wx.makePhoneCall({
      phoneNumber: '137707070',
      success: function (res) { },
    })
  },
  Landline: function () {
    wx.makePhoneCall({
      phoneNumber: '020-110110110',
      success: function (res) { },
    })
  },
  location: function () {
    wx.openLocation({
      latitude: 23.129163,
      longitude: 113.264435,
      scale: '30',
      name: '洛可可酒店',
      address: '天湖路15号',
      success: function (res) { },
    })
  },
  toForm: function () {
    wx.navigateTo({
      url: '/pages/messageForm/messageForm',
      success: function (res) { },
    })
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
  
  }
})