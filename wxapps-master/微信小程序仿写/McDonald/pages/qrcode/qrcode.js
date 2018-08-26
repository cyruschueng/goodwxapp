// pages/qrcode/qrcode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList:[],
    name:'',
    url:""
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
  bindtointegral:function(){
    wx.navigateTo({
      url: '/pages/integralmall/integralmall',
    })
  },
  querytap:function(){
    wx.navigateTo({
      url: '/pages/queryintegral/queryintegral',
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function (options) {
    var that = this;
    that.setData({
      name:wx.getStorageSync('name'),
      url:wx.getStorageSync('url')
    });
    wx.request({
      url: "https://www.easy-mock.com/mock/595f3f139adc231f357b0615/McDonald/list",
      method:'Get',
      success:function(res){
        console.log(res);
        that.setData({
          userList:res.data.data
        })
      }
    })
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