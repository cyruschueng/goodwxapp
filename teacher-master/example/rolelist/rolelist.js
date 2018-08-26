var util = require("../../utils/util.js")
const config = require('../../config')
var app = getApp();
var that;
Page({
  data: {
    tclist: [],
    cclist: [],
    isExpOpenid:false
  },
  onLoad: function (options) {
    // 页面初始化 options 为页面跳转所带来的参数
    wx.showLoading({
      title: '加载中....',
    })
    that = this
    app.getImprint(function (imprint) {
      var formdata = {}
      util.AJAX1(config.roleListUrl, formdata, "post", { imprint: imprint }, function (res) {
        var result = res.data;
        console.log(result);
        wx.hideLoading();
        if (result.status == 'ok') {
          that.setData({ tclist: res.data.tclist, cclist: res.data.cclist, isExpOpenid:app.globalData.isExpOpenid })
        }
      });
    });
  },
  navigate: function (e) {
    var id = e.currentTarget.dataset.id;
    var role = e.currentTarget.dataset.role;
    app.globalData.cid = id;
    app.globalData.role = role;

    if (role == "parent") {
      that.data.cclist.forEach(function (item) {
        if (item.cid == id) {
          app.globalData.familyRole = util.GetFamilyRole(item.role);
          app.globalData.childName = item.name;
          app.globalData.gid = item.gid;
        }
      })
      wx.navigateTo({
        url: '../parent/parent'
      })
    } else if(role=="exp"){
      wx.navigateTo({
        url: '../exptip/exptip?exit=exit'
      })
    } else if (role == "teacher") {
      wx.navigateTo({
        url: '../main/main'
      })
    }
  },

  goClass: function (e) {
    var cid = e.currentTarget.id;
    var class_name = "";
    that.data.classes.forEach(function (item) {
      if (item._id == cid) {
        class_name = item.class_name;
      }
    })
    wx.navigateTo({
      url: '../member/member?cid=' + cid + '&class_name=' + class_name
    })
  },
});
