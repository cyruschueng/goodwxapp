// pages/addsonaccount/addsonaccount.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _phoneshow:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (getApp().globalData.sonId) {
      console.log(getApp().globalData.sonId);
    }else{
      console.log('还没有分享')
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

  onShareAppMessage: function (res) {
    // wx.getUserInfo({
    //   success: function (res) {
    //     let sonId = res.signature;
    //     getApp().globalData.sonId = sonId;
    //     return getApp().globalData.sonId;
    //   }
    // })
    return {
      title: '江纯邀请您成为其子账号',
      path: '/pages/me/me?id=' +'江纯',
      success: function (res) {
        console.log(666);
        console.log('分享成功')
        wx.navigateTo({
          url: '../organize/organize',
        })
        wx.getShareInfo({
        })
      },
      fail: function (res) {
        wx.navigateTo({
          url: '../addsonaccount/addsonaccount',
          //481415ef41dd17ee9f9dd4b0b54140936da3d0dd
        })
      }
    }
  },
})