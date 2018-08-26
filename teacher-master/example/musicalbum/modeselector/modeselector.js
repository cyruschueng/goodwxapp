var util = require("../../../utils/util.js")
var app = getApp();
const config = require('../../../config')
var that;
Page({
    data: {
        musicmodes:[]
    },
    onLoad: function (options) {
      that=this;
      var cid = options.cid;
      var gid = options.gid;
      var albumWidth = parseInt((app.globalData.winWidth / 2) * 0.75);
      that.setData({ albumWidth: albumWidth})
      that.initMusicMode();
    },


    initMusicMode: function () {
      wx.showLoading({
        title: '加载中..',
      })
      app.getImprint(function (imprint) {

        util.AJAX1(config.getConfigJsonValue, { "key": "musicmode"}, "post", { imprint: imprint }, function (res) {
          var result = res.data.value;
          console.log(res)
          wx.hideLoading();
          var musicmodes=[];
          result.forEach(function(item){
            item.cover = config.aliyunOssUrl.replace("{url}", item.cover);
            musicmodes.push(item)
          });
          that.setData({ musicmodes: musicmodes,winWidth: app.globalData.winWidth, winHeight: app.globalData.winHeight})
          
          // console.log(result);
          // photosUrl.push(config.aliyunOssUrl.replace("{url}", url))
          // if (result.status == 'ok') {
          //   that.setData({gid:gid, cid: cid, allAlbums: result.allAlbums, myAlbums: result.myAlbums, loaded: true })
          // }
        });
      });
    },


    navigate: function (e) {
      var id=e.currentTarget.id;
      var music_album_mode="";
      that.data.musicmodes.forEach(function(item){
         if(item.id==id){
           music_album_mode=item;
         }
      });
      app.globalData.music_album_mode = music_album_mode;
      console.log(music_album_mode)
      wx.navigateBack({})
    },
});
