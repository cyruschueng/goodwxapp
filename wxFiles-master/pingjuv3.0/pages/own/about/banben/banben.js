var WxParse = require('../../../../wxParse/wxParse.js');
var app = getApp();
Page({
  data:{
    info:{}
  },
  onLoad:function(options){
    var that = this
    
    wx.request({
      url: app.api + 'getAbout',
      data: {},
      method: 'GET', 
      success: function(res){
        that.setData({
          info:res.data.data[0]
        })
        var article = res.data.data[0].content
        WxParse.wxParse('article', 'html', article, that, 5);
      },
      fail: function(res) {
        // fail
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})