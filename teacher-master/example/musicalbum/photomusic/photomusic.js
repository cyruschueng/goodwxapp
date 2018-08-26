
var util = require("../../../utils/util.js")
var app = getApp();
var that;
const config = require('../../../config');
var ctx = null;

Page({
  data: {
    w:0,
    h:0,
    album_id:'',
    loaded:false
  },
  onLoad(option) {
    console.log(option)
    that=this;
    var album_id = option.album_id;
    var music_album_mode = option.music_album_mode;
    var viewmode = option.viewmode;
    if(!viewmode){
      viewmode=0;
    }
    
    app.getImprint(function (imprint) {
      that.setData({ album_id: album_id, music_album_mode: music_album_mode, imprint: imprint, loaded: true, viewmode: viewmode })
    });
    
  },
  message1:function(e){   
    console.log(e)
  },



  // onShareAppMessage: function (options) {


  //   var path = '/example/photos/photos?album_id=' + that.data.album_id;
  //   var title = album.class_name + "的班级相册(" + album.name + ")";


  //   path = 'example/musicalbum/photomusic/photomusic?album_id=' + that.data.album_id + '&viewmode=1';
  //   title = album.class_name + "的班级音乐相册(" + album.name + ")";
  //   var imageUrl = config.aliyunOssUrl.replace("{url}", album.cover);
  //   return {
  //     title: title,
  //     path: path,
  //     imageUrl: imageUrl,
  //     success: function (res) {

  //     },
  //     fail: function (res) {
  //       // 分享失败
  //       console.log(res)
  //     }
  //   }
  // },





})
