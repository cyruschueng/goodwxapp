var util = require("../../utils/util.js")
var app = getApp();
var that;
Page({
  data: {
    user:'',
    winWidth:0,
    winHeight:0,
    video:"",
    url:""
  },

  onLoad: function (options) {
    that = this;
    //http://campus002.oss-cn-beijing.aliyuncs.com/2018-03-04_23_00_50.mp4
    that.setData({
      winWidth: app.globalData.winWidth, winHeight: app.globalData.winHeight
    });
    var video = options.video;
     if (video=="all"){
        that.setData({
          url: 'http://campus002.oss-cn-beijing.aliyuncs.com/2018-03-11_21_35_19.mp4'})
     } else {
       that.setData({
         url: 'http://campus002.oss-cn-beijing.aliyuncs.com/gaojiban.mp4'
       })
     }
  },

});
