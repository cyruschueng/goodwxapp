
var util = require('../../../util/util.js');
Page({
  data: {
    newData: {
      data: [],
      type: 'new',
      page: 1,
      hotshidden: false, // 显示加载更多 loading
      hothidden: true,
      loadingMore: false, //是否正在加载
    },
    recommendData: {
      data: [],
      type: 'recommend',
      page: 1,
      hotshidden: false, // 显示加载更多 loading
      hothidden: true,
      loadingMore: false, //是否正在加载
    },
    tabhideen: true,//tab切换
  },
  onLoad: function () {

    var that = this;
    songAjax(that.data.newData, function (data) {
      that.setData({
        'newData.data': data.response,
        'newData.hotshidden': true
      })
    })
    songAjax(that.data.recommendData, function (data) {
      that.setData({
        'recommendData.data': data.response,
        'recommendData.hotshidden': true
      })
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
    //true->最新 false->最热
    var tabhideen = that.data.tabhideen;

    if (tabhideen) {
      var songData = that.data.newData;
    } else {
      var songData = that.data.recommendData;
    }

    if (songData.loadingMore) return;
    songData.page++;

    if (tabhideen) {
      that.setData({
        'newData.hotshidden': false,
        'newData.loadingMore': true
      })
    } else {
      that.setData({
        'recommendData.hotshidden': false,
        'recommendData.loadingMore': true
      })
    }

    songAjax(songData, function (data) {

      if (data.response.length < data.page.pagesize) {
        if (tabhideen) {
          that.setData({
            'newData.hotshidden': false
          })
        } else {
          that.setData({
            'recommendData.hotshidden': false,
          })
        }

      }
      if (tabhideen) {
        that.setData({
          'newData.data': (songData.data).concat(data.response),
          'newData.loadingMore': false
        })
      } else {
        that.setData({
          'recommendData.data': (songData.data).concat(data.response),
          'recommendData.loadingMore': false
        })
      }


    })




  }, onShareAppMessage: function () {
    return {
      title: '99广场舞 - 舞曲',
      desc: '99广场舞,人人都是舞蹈家',
      path: 'page/999d/music/music'
    }
  }

});

function songAjax(song, callback) {
  util.Ajax('v2/app/song_album/list', {
    sort: song.type,
    page: song.page
  }, function (res) {
    if (res.data.errno == 0) {
      callback && callback(res.data);
    }
  });
}

