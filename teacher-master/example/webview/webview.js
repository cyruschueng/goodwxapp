var util = require("../../utils/util.js")
const config = require('../../config');
var app = getApp();
var that=null;
Page({
  data: {
    
  },
  onLoad(option) {
    
    that=this;
    var href = option.href;
    console.log(href)
    var b = new util.Base64();
    var href = b.decode(href);
    href = href.replace(/(^\s*)|(\s*$)/g, "");
    console.log(href+"==")
    app.getImprint(function (imprint) {
      that.setData({ href: href, imprint: imprint, loaded: true,})
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
