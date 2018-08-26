// pages/my/my.js
var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    headUrl: "",
    username: "",
    hongbaoData: { hongbaoDiscription: '点击图片复制口令，打开支付宝领红包',hongbaoImageUrl: getApp().globalData.host + 'GetHeadImage?username=hongbao'}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData);
    this.setData({ headUrl: app.globalData.userInfo.avatarUrl,username: app.globalData.userInfo.nickName});
    
  },

  paiming: function(e) {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    wx.showShareMenu({
      withShareTicket: true
    });
    return {
      title: '四则运算练习器',
      path: '/pages/paiming/paiming',
      success: function (res) {
        // 转发成功
        console.log(res);
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  
})