// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avator:wx.getStorageSync("avatarUrl"),
    arr:[
      {
        title:"手机号",
        dec:wx.getStorageSync("phone")
      },
      {
        title: "等级",
        dec: wx.getStorageSync("mer")
      }
    ]
  },
  //安全退出
  loginout:function(){
    wx.showModal({
      title: '提示',
      content: '是否退出',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.clearStorageSync();
          wx.switchTab({
            url: '../index/index',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
   

  },
    /** */
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