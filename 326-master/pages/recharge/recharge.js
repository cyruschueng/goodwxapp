var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    GprsCollector:[]
  },
  //查询基于GPRS通信的数采器
queryCollCharge:function(that,page){
  util.http_oper(encodeURI("&action=webQueryGprsCollector&page=" + page + "&pagesize=" + 50), function (err, dat, desc) {
    if (err == 0) {
      that.setData({
        GprsCollector: dat.collector
      })
    } else {
      util.errBoxFunc(that, err, desc)

    }
  }, function () {
    util.netWork(that)
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.queryCollCharge(that, 0)
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
    var shareObj = util.shareFunc()
    return shareObj
  }
})