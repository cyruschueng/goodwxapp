
var util = require('../../../util/util.js');
Page({
  data: {
    
    video: {
      empty: {
        isshow: false,
        title: '还没有收藏视频记录哦!'
      },
      ishistory: false,
    },
    song: {
      empty: {
        isshow: false,
        title: '还没有收藏舞曲记录哦!'
      },
      ishistory: false,
    },
    collectData: {},
    songCollectData: {},
    tabhideen: true,//tab切换
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      collectData: util.sortObj(wx.getStorageSync('collectData')) || {}
    })
    if (JSON.stringify(this.data.collectData) == "{}") {
      this.setData({
        'video.ishistory': true
      })
    }

    this.setData({
      songCollectData: util.sortObj(wx.getStorageSync('songCollectData')) || {}
    })
    if (JSON.stringify(this.data.songCollectData) == "{}") {
      this.setData({
        'song.ishistory': true
      })
    }

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
  deleteVideo: function (event) {
    
    let id = event.target.dataset.id;
    let collectData = wx.getStorageSync('collectData');
    for (var key in collectData) {

      if (collectData[key][id]) {
        delete collectData[key][id];
        if (JSON.stringify(collectData[key]) == "{}") {
          delete collectData[key];
        }
      }

    }

    if (JSON.stringify(collectData) == "{}") {
      this.setData({
        'video.ishistory': true
      })
    }
    wx.setStorageSync('collectData', collectData);
    this.setData({
      collectData: collectData,
    })
  },
  deleteSong:function(event) {
    let id = event.target.dataset.id;
    let songCollectData = wx.getStorageSync('songCollectData');
    for (var key in songCollectData) {

      if (songCollectData[key][id]) {
        delete songCollectData[key][id];
        if (JSON.stringify(songCollectData[key]) == "{}") {
          delete songCollectData[key];
        }
      }

    }

    if (JSON.stringify(songCollectData) == "{}") {
      this.setData({
        'song.ishistory': true
      })
    }
    wx.setStorageSync('songCollectData', songCollectData);
    this.setData({
      songCollectData: songCollectData,
    })
  },
  toSong:function(event) {
    let id = event.target.dataset.id;
    let songCollectData = wx.getStorageSync('songCollectData');
    for (var key in songCollectData) {

      if (songCollectData[key][id]) {
        var url = '?play_url=' + encodeURIComponent(songCollectData[key][id]['play_url']) + '&download_url=' + encodeURIComponent(songCollectData[key][id]['download_url']) + '&title=' + songCollectData[key][id]['title'] + '&singer=' + songCollectData[key][id]['singer'] + '&album_id=' + songCollectData[key][id]['album_id'] + '&thumb=' + encodeURIComponent(songCollectData[key][id]['thumb']) + '&duration=' + songCollectData[key][id]['duration'] + '&id=' + songCollectData[key][id]['id'];

        wx.navigateTo({
            url: '../music/songplay' + url
        })

        return;
      }

    }


        

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})