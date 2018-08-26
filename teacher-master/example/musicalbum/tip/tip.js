var util = require("../../../utils/util.js")
const config = require('../../../config')

var app = getApp();
var that;
Page({
  data: {
    user: '',
    winWidth: 0,
    winHeight: 0,

  },
  onLoad: function (options) {
    that = this;
    app.getImprint(function (imprint) {
      util.AJAX1(config.getUserInfoUrl, {}, "get", { imprint: imprint }, function (res) {
        that.setData({ user: res.data, winWidth: app.globalData.winWidth, winHeight: app.globalData.winHeight  })
      });
    });
  },



  goStart: function (e) {
    wx.reLaunch({
      url: '../../start/start'
    })
  },

});
