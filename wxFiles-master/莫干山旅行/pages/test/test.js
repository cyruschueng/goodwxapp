var WxParse = require('../../wxParse/wxParse.js');
Page({
  data:{
    markers: [{
      iconPath: "../../image/mapIcon2.png",
      id: 0,
      latitude: 51.1755048000,
      longitude: -115.5714872000,
      width: 20,
      height: 20
    }],
  },

  onLoad:function(){
    var that=this
    wx.request({
      url: app._server+'/article/detail?appid='+app._appid+'&id=8',
      success: function (res) {
        console.log(res)
        if (res.data) {
          var info = res.data;
          if (info.length != 0) {
            contentRender(info)
          }
        }
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function () {
        that.setData({
          remind: ''
        })
      }
    })
  },
})