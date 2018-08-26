var util = require("../../utils/util.js")
var app = getApp();
var that;
const config = require('../../config')
Page({
  data: {
    cls: '',
    winWidth: 0,
    winHeight: 0,
    loaded:false,
  },
  onLoad: function (options) {
    that = this;
    var gid=options.gid;
    wx.showLoading({
      title: '加载中..',
    })
    app.getImprint(function (imprint) {
      util.AJAX1(config.ClassByGidUrl, {gid:gid}, "post", {}, function (res) {
          var cls=res.data.cls;
          wx.hideLoading();
          if(res.data.status=='ok'){
            if (cls.creator_id==imprint){
                    wx.showModal({
                      title: '',
                      content: '您已经创建过该微信群的小管家账号',
                      success: function (res) {
                        wx.redirectTo({
                          url: '../start/start'
                        })
                      }
                    })
            }else{
              that.setData({
                winWidth: app.globalData.winWidth, winHeight: app.globalData.winHeight, cls: cls,loaded:true });
            }
          }
      });
    })
  },
  


  bind:function(){
    wx.redirectTo({
      url: '../bind/bind?gid='+that.data.cls.open_gid
    })
  }
});
