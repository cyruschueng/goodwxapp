// pages/myInfo/myInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[
      { url: '/image/i1.png', title: '收货地址' },
      { url: '/image/i2.png', title: '我的订单' },
      { url: '/image/i3.png', title: '购物车' },
      { url: '/image/i4.png', title: '商家入驻' },
      { url: '/image/i5.png', title: '我的分销' },
    ]
  },
  info_skip:function(e){
    var index = e.currentTarget.dataset.index;
    if(index == 0){
      wx.navigateTo({
        url: '/pages/address/address',
      })
    }else if(index == 1){
      wx.navigateTo({
        url: '/pages/order-list/order-list?state=0',
      })
    } else if (index == 2) {
      wx.navigateTo({
        url: '/pages/shopCart/shopCart',
      })
    }  else if (index == 3) {
      wx.navigateTo({
        url: '/pages/joinShop/joinShop',
      })
    } else if (index == 4) {
      wx.navigateTo({
        url: '/pages/distribution/distribution',
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