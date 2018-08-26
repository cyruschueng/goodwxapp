var util = require("../../utils/util.js")
var app = getApp();
var that;
const config = require('../../config')

Page({
  data: {
    like_not_read_count: 0,
    rate_not_read_count: 0,
    comments_not_read_count: 0,
    system_not_read_count:0,
    role:''
  },
  onLoad: function (options) {  
    that = this,
      that.setData({ role: app.globalData.role})
  },
  onShow:function(){
    app.getImprint(function (imprint) {
      var formdata = {}
      util.AJAX1(config.msgInfoUrl, formdata, "get", { imprint: imprint }, function (res) {
        var result = res.data;
        console.log("====收到的消息情况")
        console.log(res)
        if (result.status == 'ok') {
          that.setData({ rate_not_read_count: res.data.rate_not_read_count, like_not_read_count: res.data.like_not_read_count, comments_not_read_count: res.data.comments_not_read_count, system_not_read_count: res.data.system_not_read_count })
        }
      });
    });
  },
  navigate: function (e) {
    var id = e.currentTarget.dataset.id;
    var type = e.currentTarget.dataset.type;

    if (type == "like") {
      wx.navigateTo({
        url: '../like/like'
      })
    } else if (type == "rate") {
      wx.navigateTo({
        url: '../rate/rate'
      })
    } else if (type == "system") {
      wx.navigateTo({
        url: '../systemmsg/systemmsg'
      })
    } else {
      wx.navigateTo({
        url: '../reply/index'
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
