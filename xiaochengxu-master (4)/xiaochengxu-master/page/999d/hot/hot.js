//获取应用实例
var util = require('../../../util/util.js');
var app = getApp()

Page({
  data: {
    hidden: false,
    hotData: [],
    hotshidden: true, // 显示加载更多 loading
    hothidden: true,
    loadingMore: false, //是否正在加载
    pgstart: 0,
    pgoffset: 20

  },
  onLoad: function (options) {
    var that = this
    util.Ajax('v2/app/video/getHotVideoList', {
      pgoffset: that.data.pgoffset,
      pgstart: that.data.pgstart
    }, function (res) {
      if (res.data.code == 0) {
        that.setData({
          hotData: res.data.data,
          hidden: true
        })
      }
    });

  }, scrolltolower: function (e) {

    if (this.data.loadingMore) return;
    var that = this;
    // 加载更多 loading
    that.setData({
      hotshidden: false
    })
    that.setData({ loadingMore: true });
    that.data.pgstart++;

    util.Ajax('v2/app/video/getHotVideoList', {
      pgoffset: that.data.pgoffset,
      pgstart: that.data.pgstart
    }, function (res) {
      if (res.data.code == 0) {
        if (res.data.data.length < that.data.pgoffset) {
          that.setData({
            hothidden: false
          })
        }
        that.setData({
          hotData: that.data.hotData.concat(res.data.data),
          loadingMore: false
        })
      }
    });
  }, onReady: function () {
    // 修改页面标题
    // wx.setNavigationBarTitle( {
    //     title: this.data.videoData.title
    // })
  }, onShareAppMessage: function () {
    return {
      title: '99广场舞 - 专业广场舞视频教学网站',
      desc: '99广场舞以“人人都是舞蹈家”为核心理念，以“全民健身”为主旨，注重打造一个专业、全面、便捷的广场舞视频分享交流平台，让喜爱广场舞的人们，在学跳广场舞的过程中，不仅能够健身娱乐休闲，更能一步步的实现自己的舞蹈梦。',
      path: 'page/999d/index/index'
    }
  }
});
