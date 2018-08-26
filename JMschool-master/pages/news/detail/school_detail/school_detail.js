//index.js
//获取应用实例
var app = getApp();
var WxParse = require('../../../../wxParse/wxParse.js');
Page({
  data: {},
  onLoad: function (options) {
    var _this = this;
    wx.showNavigationBarLoading();
    wx.request({
      url: app._server + '/school/api/newsdetail.php',
      data: {
        detail: options.detail
      },
      success: function (res) {
        if (res.data.data && res.data.code == 200) {
          WxParse.wxParse('article', 'html', res.data.data, _this, 5);
          _this.setData({
            'title': options.title,
            'time': options.time,
          });
        } else {
          app.showErrorModal("新闻详情获取失败");
        }
      },
      fail: function (res) {
        app.showErrorModal("网络错误");
      },
      complete: function () {
        wx.hideNavigationBarLoading();
      }
    });
  }
})






