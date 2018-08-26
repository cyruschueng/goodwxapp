var util = require('../../../util/util.js');

Page({
  data: {
    hidden: false,
    show: true,//搜索结果
    tabhideen: true,//tab切换
    title: '',
    newData: {
      tid: 0,
      data: [],
      pgoffset: 20,
      pgstart: 0,
      type: 'getNewVideoList',
      hotshidden: false, // 显示加载更多 loading
      hothidden: true,
      loadingMore: false, //是否正在加载
    },
    hotData: {
      tid: 0,
      data: [],
      pgoffset: 20,
      pgstart: 0,
      type: 'getHotVideoList',
      hotshidden: false, // 显示加载更多 loading
      hothidden: true,
      loadingMore: false, //是否正在加载
    }
  },
  onLoad: function (options) {
    
    var that = this;
    that.setData({
      title: options.name,
      'newData.tid': options.tid,
      'hotData.tid': options.tid
    })

    tearcherAjax(that.data.newData, function (data) {
      that.setData({
        'newData.data': data,
        'newData.hotshidden': true
      })
    })
    tearcherAjax(that.data.hotData, function (data) {
      that.setData({
        'hotData.data': data,
        'hotData.hotshidden': true
      })
    })


  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.title
    })
  },
  handleTap: function (event) {
    if (event.target.dataset.index == 1) {
      this.setData({
        tabhideen: true
      })
    } else {
      this.setData({
        tabhideen: false
      })
    }
  },
  scrolltolower: function (e) {

    var that = this;
    var tabhideen = that.data.tabhideen;
    //true->最新 false->最热
    if (tabhideen) {
      var teachData = that.data.newData;
    } else {
      var teachData = that.data.hotData;
    }
    if (teachData.loadingMore) return;
    teachData.pgstart++;

    if (tabhideen) {
      that.setData({
        'newData.hotshidden': false,
        'newData.loadingMore': true
      })
    } else {
      that.setData({
        'hotData.hotshidden': false,
        'hotData.loadingMore': true
      })
    }

    tearcherAjax(teachData, function (data) {
      if (data.length < teachData.pgoffset) {
        if (tabhideen) {
          that.setData({
            'newData.hothidden': false
          })
        } else {
          that.setData({
            'hotData.hotshidden': false,
          })
        }

      }
      if (tabhideen) {
        that.setData({
          'newData.data': (teachData.data).concat(data),
          'newData.loadingMore': false
        })
      } else {
        that.setData({
          'hotData.data': (teachData.data).concat(data),
          'hotData.loadingMore': false
        })
      }


    })




  },
  onShareAppMessage: function () {
    return {
      title: this.data.title + '广场舞',
      desc: '99广场舞 - 专业广场舞教学网站',
      path: 'page/999d/teacher/teacherlist?tid=' + this.data.newData.tid + '&name=' + this.data.title
    }
  }

})

function tearcherAjax(data, callback) {

  util.Ajax('v2/app/teacher/' + data.type, {
    pgoffset: data.pgoffset,
    pgstart: data.pgstart,
    tid: data.tid
  }, function (res) {
    if (res.data.code == 0) {
      callback && callback(res.data.data);
    }
  });




}
