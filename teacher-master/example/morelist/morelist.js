var util = require("../../utils/util.js")
const config = require('../../config')
var app = getApp();
var that;
Page({
  data: {
    user: "",
  },
  onLoad: function (options) {
    that = this;
    app.getImprint(function (imprint) {
      util.AJAX1(config.getUserInfoUrl, {}, "get", { imprint: imprint }, function (res) {
        that.setData({ user: res.data, winWidth: app.globalData.winWidth, winHeight: app.globalData.winHeight, role: app.globalData.role })
      });
    });
  },



  navigate: function (e) {
    var action = e.currentTarget.id;
    switch (action) {

      case "about":
        wx.navigateTo({
          url: '../about/about',
        })
        break;
      case "contact":
        wx.showModal({
          title: '加微信qihuiqiang2008 进行咨询',
          content: '',
        })
        break;
      case "group":
        wx.navigateTo({
          url: '../groupcode/groupcode',
        })
        ;
        break;
      case "createclass":

        if (app.globalData.isExpOpenid) {
          wx.showModal({
            title: '提示',
            content: '退出体验账户才能进行此操作',
            success: function (res) {
              if (res.confirm) {
                wx.reLaunch({
                  url: '../exptip/exptip?exit=exit',
                })
              }
            }
          })
          return;
        } else {
          wx.navigateTo({
            url: '../tip/tip',
          })
        }
        break;

      default:

    }
  },






  onShareAppMessage: function (options) {

    var title ='邀请您通过【班级群小管家】来管理班级事务';
    var path = '/example/start/start';
    return {
      title: title,
      path: path,
      imageUrl: "http://campus002.oss-cn-beijing.aliyuncs.com/cc.jpg",
      success: function (res) {
        // wx.showModal({
        //   title: '分享成功',
        //   content: '待此用户创建班级成功后会邀请您加入',
        // })
        wx.showToast({
          title: '分享成功',
        })
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }
  },

  detail: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../notify/notify?_id=' + id
    })
  }
});
