var util = require('../../../util/util.js');
Page({
  data: {
    hidden: false,
    show: true,//搜索结果
    title: '',
    dancingData: {
      lid: 0,
      data: [],
      pgoffset: 20,
      pgstart: 0,
      hotshidden: false, // 显示加载更多 loading
      hothidden: true,
      loadingMore: false, //是否正在加载
    }
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      title: options.name,
      'dancingData.lid': options.lid
    })

    dancingAjax(that.data.dancingData, function (data) {
      that.setData({
        'dancingData.data': data,
        'dancingData.hotshidden': true
      })
    })

  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.title
    })
  },
  scrolltolower: function (e) {

    var that = this;
    var dancingData = that.data.dancingData;
    if (dancingData.loadingMore) return;
    dancingData.pgstart++;

    that.setData({
      'dancingData.hotshidden': false,
      'dancingData.loadingMore': true
    })

    dancingAjax(dancingData, function (data) {
      if (data.length < dancingData.pgoffset) {
        that.setData({
          'dancingData.hothidden': false
        })

      }
      that.setData({
        'dancingData.data': (dancingData.data).concat(data),
        'dancingData.loadingMore': false
      })

    })

  },
  onShareAppMessage: function () {
    return {
      title: this.data.title,
      desc: '99广场舞 - 专业广场舞视频教学网站',
      path: 'page/999d/dancing/dancinglist?lid='+this.data.lid + '&name='+ this.data.title
    }
  }

})

function dancingAjax(data, callback) {

  util.Ajax('v2/app/video/categoryList', {
    pgoffset: data.pgoffset,
    pgstart: data.pgstart,
    category_id: data.lid
  }, function (res) {
    if (res.data.code == 0) {
      callback && callback(res.data.data);
    }
  });

}
