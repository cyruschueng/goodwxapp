// pages/myInfo/myInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPic: '',
    userName: '',
    items: ['优惠卷', '我的收藏', '我的分销', '联系人管理',]
  },

  orderList:function(e){
    var _index = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/order-list/order-list',
      success: function(res) {},
    })
  },
  skip_link:function(e){
    var _index = e.currentTarget.dataset.id
    if(_index==1){
      wx.navigateTo({
        url: '/pages/collection/collection',
        success: function(res) {},
      })
    }else if(_index==2){
      wx.navigateTo({
        url: '/pages/distribution/distribution',
        success: function(res) {},
      })
    }else if(_index==3){
      wx.navigateTo({
        url: '/pages/address/address',
        success: function(res) {},
      })
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