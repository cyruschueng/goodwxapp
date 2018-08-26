// pages/comimg1/comimg1.js
var  app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // screenBrightness:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  // scroll: function (e) {
  //   var alllength = app.globalData.alllength;
  
  //   var that=this;
  //   wx.getScreenBrightness({
  //     success:function(res){
  //       that.setData({
  //         screenBrightness:res.value
  //       })
  //     }
  //   })
  //   console.log(e.detail.scrollLeft);

  //   }
  // },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '沃通物流',
      desc: '小程序',
      path: '/pages/index/index'
    }
  }

  
})