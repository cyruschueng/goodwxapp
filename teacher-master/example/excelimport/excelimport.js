var util = require("../../utils/util.js")
var app = getApp();
var that;
const config = require('../../config')

//ZeS8Fm
Page({
  data: {
     cid:"",
     unique_code:"",
     class_name:"",
     loaded: false,
     winWidth: 0,
     winHeight: 0
  },

  onLoad: function (options) {
    that=this;
    that.initWidthHeight();
    // 页面初始化 options 为页面跳转所带来的参数
    var cid=options.cid;
    that.setData({cid:cid});
    that.getClassInfo();
  },

  getClassInfo:function(){
    app.getImprint(function (imprint) {
      util.AJAX1(config.classByIdUrl, {cid:that.data.cid}, "post", { imprint: imprint }, function (res) {
        console.log(res);
        if(res.data.status=='ok'){
          var cls=res.data.class;
          var class_name=cls.class_name;
          var unique_code = cls.unique_code;
          that.setData({ class_name: class_name, unique_code: unique_code,loaded:true})
        }
      });
    });
  },

  initWidthHeight: function () {
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },

  // 提交 TODO
  next: function (e) {
    wx.showLoading({
      title: '导入名单检测中....',
    })
    util.AJAX1(config.ClassMemberCountUrl, { cid: that.data.cid}, "post", { }, function (res) {
      console.log(res)
      wx.hideLoading();
      if (res.data.status == "ok"&&res.data.count>1) {
          wx.navigateTo({
            url: '../notice/notice?cid=' + that.data.cid + '&unique_code=' + that.data.unique_code + '&class_name=' + that.data.class_name
         })
      }else{
        wx.showModal({
          title: '提示',
          content: '没有检测到导入的名单，请确保名单已经导入',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    });

      // wx.navigateTo({
      //   url: '../notice/notice?cid=' + that.data.cid + '&unique_code=' + that.data.unique_code
      // })
  },
  copyWx:function(){
    wx.setClipboardData({
      data: 'qihuiqiang2008',
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功',
            })
          }
        })
      }
    })
  }




});