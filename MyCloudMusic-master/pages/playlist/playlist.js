// pages/playlist/playlist.js
const app = getApp();
const utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    songlists: [],
    subscribedCount: '',
    coverImgUrl: null,
    backgroundUrl: null,
    name: '',
    nickname: '',
    avatarUrl: null,
    playCount: '',
    tags: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    });
    wx.showShareMenu({
      withShareTicket: true
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let id = this.data.id;
    wx.request({
      url: app.config.host + '/playlist/detail?id=' + id,
      dataType: 'json',
      success: (res) => {
        res.data.result.tracks.forEach((e) => {
          // 处理歌手数组
          let arr = [];
          let strings = e.artists.forEach((e) => {
            arr.push(e.name);
          })
          e.singers = arr.join('/');
          // 转换歌曲时长
          e.durationStr = utils.formatAudioProcess(e.duration / 1000);
        });
        this.setData({
          songlists: res.data.result.tracks,
          subscribedCount: res.data.result.subscribedCount.toLocaleString(),
          coverImgUrl: res.data.result.coverImgUrl,
          backgroundUrl: res.data.result.creator.backgroundUrl,
          name: res.data.result.name,
          nickname: res.data.result.creator.nickname,
          avatarUrl: res.data.result.creator.avatarUrl,
          playCount: res.data.result.playCount.toLocaleString(),
          tags: res.data.result.tags.join('，')
        });
      }
    });
  },
  play: function (e) {
    app.globalData.currentPos = e.currentTarget.dataset.id;
    app.globalData.tracks = this.data.songlists;
    wx.navigateTo({
      url: '../play/play'
    });
  },
  onShareAppMessage: function (res) {
    return {
      title: this.data.name,
      path: '/playlist/playlist?id=' + this.data.id,
      success: function (res) {
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success(res) {
            console.log(res.encryptedData)
            console.log(res.iv)
            // 后台解密，获取  
            // 可以通过openData组件显示群名称
          }
        });
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})