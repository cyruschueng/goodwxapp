var util = require('../../../util/util.js');
Page({
  data: {
    teacherData: [],
    hidden: false,
    tabhideen: true,//tab切换
    pgoffset: 20,
    pgstart: 0,
    hotshidden: false, // 显示加载更多 loading
    hothidden: true,
    loadingMore: false, //是否正在加载
  },
  onLoad: function (options) {

    var that = this;
    util.Ajax('v2/app/dance/category', {
      pgstart: that.data.pgstart,
      pgoffset: that.data.pgoffset,
    }, function (res) {
      if (res.data.code == 0) {
        that.setData({
          teacherData: res.data.data,
          hotshidden: false,
          hidden: true

        })
      }
    });

  },
  scrolltolower: function (e) {

    if (this.data.loadingMore) return;
    var that = this;
    // 加载更多 loading
    that.setData({
      hotshidden: false
    })
    that.setData({ loadingMore: true });
    that.data.pgstart++;
    util.Ajax('v2/app/dance/category', {
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
          teacherData: that.data.teacherData.concat(res.data.data),
          loadingMore: false
        })

      }
    });

  },
  onShareAppMessage: function () {
    return {
      title: '交谊舞',
      desc: '99广场舞 - 专业广场舞视频教学网站',
      path: 'page/999d/dancing/dancing'
    }
  }

})


