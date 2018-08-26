//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    playlists: [],
    topPlaylists: []
  },
  onLoad: function () {
    wx.request({
      url: app.config.host + '/top/playlist?limit=30&order=hot',
      dataType: 'json',
      success: (res) => {
        let data = res.data;
        if (typeof data === 'string') {
          data = JSON.parse(res.data);
        }
        this.setData({
          playlists: data.playlists
        });
      }
    })
    wx.request({
      url: app.config.host + '/top/playlist/highquality?limit=5',
      dataType: 'json',
      success: (res) => {
        let data = res.data;
        if (typeof data === 'string') {
          data = JSON.parse(res.data);
        }
        this.setData({
          topPlaylists: data.playlists
        });
      }
    });
  },
  playlistDetail: function (e) {
    wx.navigateTo({
      url: '../playlist/playlist?id=' + e.currentTarget.dataset.id
    })
  }
})
