var util = require("../../../utils/util.js")
var app = getApp();
const config = require('../../../config')
var that;
Page({
    data: {
        musics:[]
    },
    onLoad: function (options) {
      that=this;
      var cid = options.cid;
      var gid = options.gid;
      var albumWidth = parseInt((app.globalData.winWidth / 2) * 0.75);

      that.initMusics();
    },


    initMusics: function () {
      wx.showLoading({
        title: '加载中..',
      })
      app.getImprint(function (imprint) {

        util.AJAX1(config.getConfigJsonValue, { "key": "musicmode_musics"}, "post", { imprint: imprint }, function (res) {
          var result = res.data.value;
          console.log(res)
          wx.hideLoading();
          var musics=[];
          result.forEach(function(item){
            item.cover = config.aliyunOssUrl.replace("{url}", item.cover);
            musics.push(item)
          });
          that.setData({ musics: musics,winWidth: app.globalData.winWidth, winHeight: app.globalData.winHeight})
          
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
      var music_album_background="";
      that.data.musics.forEach(function(item){
         if(item.id==id){
           music_album_background=item;
         }
      });
      app.globalData.music_album_background = music_album_background;
      console.log(music_album_background)
      wx.navigateBack({})
    },
});
