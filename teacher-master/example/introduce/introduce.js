var util = require("../../utils/util.js")
var app = getApp();
var that;
Page({
  data: {
    winWidth:0,
    winHeight:0

  },
  onLoad: function (options) {
    that=this;
    that.setData({
      winWidth: app.globalData.winWidth, winHeight: app.globalData.winHeight
    });
  },


});
