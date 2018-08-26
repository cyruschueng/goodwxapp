var util = require("../../utils/util.js")
const config = require('../../config')
var app = getApp();
var that;
Page({
  data: {
    winWidth: '',
    winHeight: '',
    src:""
  },
  onLoad: function (options) {
    that=this;
    if(options.src){
      that.setData({ src: options.src})
    }
    that.WidthHeightInit();
  },

  WidthHeightInit: function () {
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },


});
