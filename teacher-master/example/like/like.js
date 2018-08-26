
var app = getApp();
var util = require("../../utils/util.js")
var curPage = 0;
var canRequest = true;
var that;
var pageSize = 20;
const config = require('../../config')

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
      }
    });

    app.initData(function (configData) {
       var title = configData.msg_like_title;
      //  that.setData({
      //     msg_like_show: configData.msg_like_show
      //   });
      //     wx.setNavigationBarTitle({
      //       title: title
      //     });
        that.fetchPosts();
    });
   
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    //  curPage = 0;
    //  canRequest=true;
    //  this.setData({msgs:{}})
    //  this.fetchPosts();
    //  页面显示
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
        url: config.LikeUrl,
        header: { imprint: imprint },
        data: { page: curPage },
        method: "post",
        success: function (res) {
          console.log(res.data)
          wx.hideNavigationBarLoading();
          wx.hideToast();
          var msgs = Array();
          res.data.likes.forEach(function (item) {
            item.create_at = util.formatTime(item.create_at, 1);
            item.from_roleStr = util.GetFamilyRole(item.from_role);
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