// pages/security/security.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    access:"",
    arr:[
      {
        touch:"setLoginPwd",
        src:"../../images/pwd/1.png",
        txt:"修改登录密码"
      },
      {
        touch: "setPayPwd",
        src: "../../images/pwd/1.png",
        txt: "设置支付密码"
      }
    ]
  },
  setPayPwd:function(){
    wx.navigateTo({
      url: '../pwd/pwd',
    })
    wx.setStorageSync("access",2)
  },
  setLoginPwd:function(){
    wx.navigateTo({
      url: '../pwd/pwd',
    })
    wx.setStorageSync("access", 1)
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