var util = require("../../utils/util.js")
var app = getApp();
var that;
const config = require('../../config')

Page({
  data: {
    
    cid: "",
    class_name:"",
    winWidth: 0,
    winHeight: 0,
    classInfo:""
  },

  onLoad: function (options) {
    console.log(options.scene)
    // 页面初始化 options 为页面跳转所带来的参数
    that = this;
    var cid = options.cid;
    that.setData({ "cid": cid });
    util.AJAX1(config.classByIdUrl, { cid: cid }, "post", {}, function (res) {
      if(res.data.status=="ok"){
        that.setData({ "classInfo": res.data.class });
      }
    });
  },
  onShow: function (options) {
    
  },





  onLaunch: function (options) {
    wx.showShareMenu({
      withShareTicket: true //要求小程序返回分享目标信息
    });
    console.log(options)
    // 页面初始化 options 为页面跳转所带来的参数
    that = this;

  },

  

  onShareAppMessage: function () {
    var cid = that.data.cid;
    wx.showShareMenu({
      withShareTicket: true //要求小程序返回分享目标信息
    });
    return {
      title: that.data.classInfo.creator_name+'老师邀请各位家长加入班级小书童',
      imageUrl:"http://campus002.oss-cn-beijing.aliyuncs.com/cc.jpg",
      path: '/example/bind/bind?cid='+cid,
      success: function (res) {
        app.getImprint(function (imprint) {
          app.getLoginCode(function (logincode) {
            wx.getShareInfo({
              shareTicket: res.shareTickets[0],
              success: function (res) {
                var formdata = { "code": logincode, "iv": res.iv, encryptedData: res.encryptedData,cid:cid}
                util.AJAX1(config.getGroupInfoUrl, formdata, "post", { imprint: imprint }, function (res) {
                  if (res.data.status == "ok") {
                    wx.showToast({
                      title: '初始化班级成功',
                      icon: 'success',
                      duration: 2000
                    });
                    setTimeout(function () {
                      wx.redirectTo({
                        url: '../start/start'
                      })
                    }, 2000)
                  }
                });
              },
              fail: function (res) { console.log(res) },
              complete: function (res) { console.log(res) }
            })
          });
        });

      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }
  },

  navigate: function (e) {
    wx.navigateTo({
      url: '../start/start'
    })
  },
});