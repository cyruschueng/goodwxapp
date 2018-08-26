
var app = getApp();
var util = require("../../utils/util.js")
const config = require('../../config')

var curPage = 0;
var canRequest = true;
var that;
var pageSize = 20;
Page({
  data: {
    msgs: [],
    setshow: 0,
    current_reply: 0,
    reply: null,
    content: "",
    winWidth: 0,
    winHeight: 0,
    no_data: false,
    no_more: false,
    msg_like_show:"喜欢了你的动态",
    curPage: 1,
  },

  onLoad: function (options) {
    that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      },
      
    });
    that.fetchPosts();
  
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
   
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },

  lower: function () {
    that.fetchPosts();
  },
  goOther: function (e) {
    var id = e.currentTarget.dataset.poster_id;

    wx.navigateTo({
      url: '/page/component/other/index?type=post&id=' + id
    })
  },


  fetchPosts: function () {
    if (that.data.no_more) {
      return;
    }
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });

    wx.showNavigationBarLoading();
    var curPage = that.data.curPage;
    app.getImprint(function (imprint) {
      wx.request({
        url: config.systemInfoUrl,
        header: { imprint: imprint },
        data: { page: curPage },
        method: "post",
        success: function (res) {
          console.log(res.data)
          wx.hideNavigationBarLoading();
          wx.hideToast();
          var msgs = Array();
          res.data.msgJoinInfo.forEach(function (item) {
            item.create_at = util.formatTime(item.update_at, 1);
            msgs.push(item);
          })
          if (msgs.length > 0) {
            if (curPage == 1) {
              that.setData({ msgs: msgs });
            }
            else {
              that.setData({ msgs: that.data.msgs.concat(msgs) });
            }
          }
          if (msgs.length >= pageSize) {
            that.setData({
              curPage: curPage + 1
            });
          } else {
            that.setData({
              no_more: true
            });
          }
          if (that.data.msgs.length == 0) {
            that.setData({
              no_data: true
            });
          }
        }
      })
    });
  },
})