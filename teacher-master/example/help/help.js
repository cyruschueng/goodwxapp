var util = require("../../utils/util.js")
var app = getApp();
var that;
Page({
  data: {
    user: '',
    winWidth: 0,
    winHeight: 0
  },

  onLoad: function (options) {
    that = this;
    that.setData({
      winWidth: app.globalData.winWidth, winHeight: app.globalData.winHeight
    });
  },

  


  onShareAppMessage: function (options) {
    
    var title = that.data.user.wxname+'邀请您通过【班级小书童】来管理班级事务';
    var path = '/example/start/start';
    return {
      title: title,
      path: path,
      imageUrl: "http://campus002.oss-cn-beijing.aliyuncs.com/zuoye.jpeg",
      success: function (res) {
          wx.showModal({
            title: '分享成功',
            content: '待此用户创建班级成功后会邀请您加入',
          })
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }
  },

  navigate: function (e) {
    wx.navigateTo({
      url: '../createclass/createclass'
    })
  },

  detail: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../notify/notify?_id=' + id
    })
  },

  navigate: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../helpdetail/helpdetail?video=' + id
    })
  }

});
