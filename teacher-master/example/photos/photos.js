var util = require("../../utils/util.js")
var app = getApp();
var that;
const config = require('../../config')
var is_preview = false;
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    albumWidth: 0,
    url: '',
    photos: '',
    cid: '',
    gid: '',
    selectedImgs: [],
    album_id: '',
    role: '',
    loaded: false,
    album: ""
  },
  onLoad: function (options) {
    that = this;
    var cid = options.cid;
    var gid = options.gid;
    var album_id = options.album_id;
    var album_name = options.album_name;
    that.setData({
      album_id: album_id, cid: cid, winWidth: app.globalData.winWidth, winHeight: app.globalData.winHeight, photoWidth: parseInt(app.globalData.winWidth / 3 - 20), role: app.globalData.role, gid: gid, aliyunVideoOssPreUrl: config.aliyunVideoOssPreUrl,
      aliyunImageOssPreUrl: config.aliyunImageOssPreUrl,
      aliyunVideoCoverExt: config.aliyunVideoCoverExt
    })
    that.initPhotos(album_id)
  },
  onShow: function (options) {
    if (!is_preview) {
      that.initPhotos(that.data.album_id)
    }
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
          result.photos.forEach(function (item) {
            if (fn) {
              fn();
            };
            item.role = util.GetFamilyRole(item.role);
            item.create_at = util.formatTime(item.create_at, 4)
          })
          that.setData({ photos: result.photos, album: result.album, loaded: true })
        }
      });
    });
  },




  musicMode: function (e) {
    is_preview = false
    wx.navigateTo({
      url: '../musicalbum/photomusic/photomusic?album_id=' + that.data.album_id + '&viewmode=1',
    })
  },



  chooseType: function (e) {
    var ext = "&cid=" + that.data.cid + "&gid=" + that.data.gid + "&album_id=" + that.data.album_id;
    wx.showActionSheet({
      itemList: ['上传照片', '上传小视频'],
      success: function (res) {
        if (res.tapIndex == 0) {
          wx.navigateTo({
            url: "../uploadphoto/uploadphoto?type=0" + ext
          })
        }
        else if (res.tapIndex == 1) {
          wx.navigateTo({
            url: '../uploadphoto/uploadphoto?type=1' + ext
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 5,
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var selectedImgs = that.data.selectedImgs.concat(res.tempFilePaths);
        if (selectedImgs.length > 5) {
          selectedImgs = selectedImgs.slice(0, 5);
          wx.showToast({
            title: '最多5张图片',
          })
        }
        that.setData({
          selectedImgs: selectedImgs
        });
      }
    })
  },

  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.selectedImgs // 需要预览的图片http链接列表
    })
  },

  previewPhoto: function (e) {

    is_preview = true;
    var id = e.currentTarget.id;

    var photo_id = e.currentTarget.dataset.photoid;
    console.log(e)
    var photosUrl = [];
    var photos = that.data.photos;
    var photo = "";
    var photoUrl = config.aliyunOssUrl.replace("{url}", id);
    photos.forEach(function (item) {
      if (item._id == photo_id) {
        var flag = false;
        item.urls.forEach(function (url) {
          if (id == url) {
            flag = true;
          }
          if (flag) {
            photosUrl.push(config.aliyunOssUrl.replace("{url}", url))
          }
        })
      }
    });

    wx.previewImage({
      current: photoUrl, // 当前显示图片的http链接
      urls: photosUrl // 需要预览的图片http链接列表
    })
  },

  action: function (e) {
    if (!that.data.album.is_owner) {
      return;
    }
    var itemList = ['设为封面', '删除本张相片', '删除本次发表'];
    var url = e.currentTarget.id;
    var owner = e.currentTarget.dataset.owner;
    var photo_id = e.currentTarget.dataset.photoid;
    var album_id = that.data.album_id;
    var formdata = { photo_id: photo_id, url: url, album_id: album_id }
    wx.showActionSheet({
      itemList: itemList,
      success: function (res) {

        if (app.globalData.isExpOpenid) {
          wx.showToast({
            title: '无权限操作',
          })
          return;
        }

        if (!(owner || that.data.role == 'teacher')) {
          wx.showToast({
            title: '权限不足',
          })
          return;
        }

        if (res.tapIndex == 0) {
          app.getImprint(function (imprint) {
            util.AJAX1(config.setCoverUrl, formdata, "post", { imprint: imprint }, function (res) {
              var result = res.data;
              wx.hideLoading();
              app.globalData.albumRefresh = true;
              if (result.status == 'ok') {
                wx.showToast({
                  title: '设置成功',
                })
              }
            });
          });
        } else {
          if (res.tapIndex == 2) {
            formdata.url = "";
          }
          wx.showLoading({
            title: '操作中',
          });
          app.getImprint(function (imprint) {
            util.AJAX1(config.delPhotoUrl, formdata, "post", { imprint: imprint }, function (res) {
              var result = res.data;
              wx.hideLoading()
              if (result.status == 'ok') {
                // wx.showToast({
                //   title: '操作成功',
                // })
                that.initPhotos(album_id);
              }
            });
          });
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  saveImgToPhotosAlbumTap: function (IMG_URL) {
    wx.downloadFile({
      url: IMG_URL,
      success: function (res) {
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            wx.showToast({
              title: '保存成功',
            })
          },
          fail: function (res) {
            console.log(res)
            console.log('fail')
          }
        })
      },
      fail: function () {
        console.log('fail')
      }
    })

  },

  removeImg: function (event) {
    var id = event.currentTarget.id;
    var imgs = that.data.selectedImgs;
    for (var i = 0; i < imgs.length; i++) {
      if (imgs[i] == id) {
        imgs.splice(i, 1)
        break;
      }
    }
    that.setData({
      selectedImgs: imgs
    })
  },

  cmd: function (event) {

    if (app.globalData.isExpOpenid) {
      wx.showToast({
        title: '体验者无权限',
      })
      return;
    }
    var id = event.currentTarget.id;
    if (id == "op") {
      var itemList = ['举报'];
      if (that.data.album.is_owner || that.data.role == 'teacher') {
        itemList = ['删除本相册', '举报'];
      }
      wx.showActionSheet({
        itemList: itemList,
        success: function (res) {
          if (res.tapIndex == 0 && (that.data.album.is_owner || that.data.role == 'teacher')) {
            wx.showModal({
              title: '提示',
              content: '确认要删除么',
              success: function (res) {
                if (res.confirm) {
                  wx.showNavigationBarLoading()
                  app.getImprint(function (imprint) {
                    var formdata = { album_id: that.data.album._id }
                    util.AJAX1(config.delAlbumUrl, formdata, "post", { imprint: imprint }, function (res) {
                      var result = res.data;
                      wx.hideLoading()
                      wx.hideNavigationBarLoading();
                      if (result.status == 'ok') {
                        app.globalData.albumRefresh = true;
                        wx.showToast({
                          title: '删除成功',
                          icon: 'success',
                          duration: 1000
                        });
                        setTimeout(function () {
                          wx.navigateBack({

                          })
                        }.bind(this), 1000);
                      }
                    });
                  });
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })


          } else {
            wx.showToast({
              title: '举报成功',
            })
          }
        }
      })
    } else if (id == "music") {
      is_preview = false;
      wx.navigateTo({
        url: '../musicalbum/musicalbumeidt/musicalbumeidt?album_id=' + that.data.album_id + '&cid=' + that.data.cid + '&gid=' + that.data.gid,
      })
    } else {
      wx.showToast({
        title: '暂不开放',
      })
    }
  },






  // 提交 TODO
  submit: function (event) {
    if (app.globalData.isExpOpenid) {
      wx.showToast({
        title: '无权限操作',
      })
      return;
    }
    var files = that.data.selectedImgs;
    var album_id = that.data.album_id;
    var cid = that.data.cid;
    var desc = event.detail.value.desc;
    var gid = that.data.gid;
    var role = that.data.role;
    wx.showLoading({
      title: '提交中....',
    });
    if (files.length > 0) {
      var formdata = { album_id: album_id, cid: cid, desc: desc, gid: gid, role: role };
      that.uploadPic(files, formdata, function () {
        wx.hideLoading();

        that.setData({ selectedImgs: [] });
        that.initPhotos(album_id, function () {
          wx.showToast({
            title: '上传成功',
          })
        });
        app.globalData.albumRefresh = true;
      });
    } else {
      wx.showToast({
        title: '没有图片',
      })
    }

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







  onShareAppMessage: function (options) {

    console.log(options)
    var id = options.target.id;
    console.log(id)


    var path = '/example/photos/photos?album_id=' + that.data.album_id;

    var album = that.data.album;
    var title = album.class_name + "的班级相册(" + album.name + ")";
    if (id == "sharemusicalbum") {
      path = 'example/musicalbum/photomusic/photomusic?album_id=' + that.data.album_id + '&viewmode=1';
      title = album.class_name + "的班级音乐相册(" + album.name + ")";
    }
    var imageUrl = config.aliyunOssUrl.replace("{url}", album.cover);
    return {
      title: title,
      path: path,
      imageUrl: imageUrl,
      success: function (res) {

      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }
  },







});
