var util = require("../../../utils/util.js")
var app = getApp();
var that;
const config = require('../../../config')

Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    albumWidth: 0,

    selectedImgs: [],
    album_id: '',
    musicmode: '',
    loaded: false,
    album: "",
    music_album_photos: []
  },
  onLoad: function (options) {
    that = this;
    var cid = options.cid;
    var gid = options.gid;
    var album_id = options.album_id;
    var album_name = options.album_name;
    that.setData({ album_id: album_id, cid: cid, winWidth: app.globalData.winWidth, winHeight: app.globalData.winHeight, photoWidth: parseInt(app.globalData.winWidth / 3 - 20), role: app.globalData.role, gid: gid })
    that.initPhotos(album_id)
  },

  initPhotos: function (album_id, fn) {
    app.getImprint(function (imprint) {
      var formdata = { "album_id": album_id }
      wx.showLoading({
        title: '加载中',
      })
      util.AJAX1(config.getPhotosUrl, formdata, "post", { imprint: imprint }, function (res) {
        var result = res.data;
        console.log(result)
        wx.hideLoading()
        if (result.status == 'ok') {
          var music_album_photos = [];
          result.photos.forEach(function (item) {
            item.urls.forEach(function (i) {
              music_album_photos.push({ url: i, desc: '' })
            })
            // urls=urls.concat(item.urls)
          })
          that.setData({ music_album_photos: music_album_photos, album: result.album, loaded: true })
        }
      });
    });
  },

  onShow: function (e) {
    console.log(e)
    if (app.globalData.music_album_mode) {
      that.setData({ music_album_mode: app.globalData.music_album_mode });
      app.globalData.music_album_mode = "";
    }
    if (app.globalData.music_album_background) {
      that.setData({ music_album_background: app.globalData.music_album_background });
      app.globalData.music_album_background = "";
    }
  },

  photoDescBlur: function (e) {
    console.log(e)
    var desc = e.detail.value;
    var id = e.target.id;
    var music_album_photos = that.data.music_album_photos;
    music_album_photos.forEach(function (item) {
      if (item.url == id) {
        item.desc = desc;
      }
    });
    that.setData({ music_album_photos: music_album_photos })
  },





  // 提交 TODO
  submit: function (event) {
    console.log("sadfsda")
    if (app.globalData.isExpOpenid) {
      wx.showToast({
        title: '无权限操作',
      })
      return;
    }
    var album_id = that.data.album_id;
    var music_album_desc = event.detail.value.music_album_desc;
    var music_album_photos = that.data.music_album_photos;
    var music_album_background = that.data.music_album_background;
    var music_album_mode = that.data.music_album_mode;
    if (!music_album_background){
      wx.showToast({
        title: '缺少背景音乐',
      })
      return;
    }
    if (!music_album_mode) {
      wx.showToast({
        title: '请选择模板',
      })
      return;
    }

    wx.showLoading({
      title: '提交中....',
    });
    var formdata = { album_id: album_id, music_album_desc: music_album_desc, music_album_photos: music_album_photos, music_album_background: music_album_background.id, music_album_mode: music_album_mode.id };
    console.log(formdata)
    app.getImprint(function (imprint) {
      util.AJAX1(config.createMusicAlbumUrl, formdata, "post", { imprint: imprint }, function (res) {
        var result = res.data;
        console.log(result)
        wx.hideLoading()
        if (result.status == 'ok') {
          wx.navigateTo({
            url: '../photomusic/photomusic?album_id=' + that.data.album_id + '&music_album_mode=' + music_album_mode.id + '&imprint='+imprint,
            })
        }
      });
    });

  },

  removephotos: function (event) {
    var id = event.currentTarget.id;
    console.log(id)
    var imgs = that.data.music_album_photos;
    for (var i = 0; i < imgs.length; i++) {
      if (imgs[i].url == id) {
        imgs.splice(i, 1)
        break;
      }
    }
    that.setData({
      music_album_photos: imgs
    })
  },



  uploadPic: function (tmpfiles, formdata, fn) {
    if (tmpfiles.length > 0) {
      var that = this;
      app.getImprint(function (imprint) {
        wx.uploadFile({
          url: config.uploadPhotoUrl,
          filePath: tmpfiles.pop(),
          name: 'file',
          header: { imprint: imprint }, // 设置请求的 header
          formData: formdata, // HTTP 请求中其他额外的 form data
          success: function (res) {
            var result = JSON.parse(res.data);
            if (result.status == "ok" && result.photo) {
              if (tmpfiles.length > 0) {
                formdata.photo_id = result.photo._id;
                that.uploadPic(tmpfiles, formdata, fn)
              } else {
                fn();
              }
            }
          },
          fail: function (msg) {
            console.log(msg)
          },
          complete: function () { // 重置数据
          }
        })
      });
    } else {
      fn();
    }
  },







});
