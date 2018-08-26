var util = require("../../utils/util.js")
var app = getApp();
var that;

const config = require('../../config')
var fileSize=0;
Page({
  data: {
    showTopTips: false,
    class_items: [],
    select_cid:"",
    select_gid: "",
    album_name:"选择相册",
    album_id:"",
  
    btn_disable: false,
    btn_loadding: false,
    loaded: false,
    selectedImgs:[],
    winWidth:'',
    winHeight:''
  },

  onLoad: function (options) {

    app.globalData.notifyReload = 1;
    // 页面初始化 options 为页面跳转所带来的参数
    that = this;
  
    var type=0;
    if(options.type){
      type=options.type;
    }
    if(type==0){
      that.chooseImage();
    }else if(type==1){
      that.chooseVideo();
    }
    var init_gid="";
    var init_cid="";
    var init_album_id="";
    if(options.gid&&options.cid){
      init_gid = options.gid;
      init_cid = options.cid;
    }else{
      that.initClass();
    }

    if(options.album_id){
      init_album_id = options.album_id;
    }
    init_cid = options.cid;
    that.setData({ winWidth: app.globalData.winWidth, winHeight: app.globalData.winHeight, type: type, init_cid: init_cid, init_gid: init_gid, init_album_id: init_album_id, role: app.globalData.role});

  
  },

  onShow: function (obj) {
    var album = app.globalData.currentAlbumPublish;
    if (album) {
      that.setData({ album_name: album.name, album_id: album.id });
      app.globalData.currentAlbumPublish = ""
    }
  },

  initClass:function(){
    wx.showLoading({
      title: '加载中....',
    });
    app.getImprint(function (imprint) {
      util.AJAX1(config.ClassByImprintUrl, {}, "post", { imprint: imprint }, function (res) {
        console.log(res)
        wx.hideLoading();
        if (res.data.status == "ok" && res.data && res.data.classes) {
          var classes = res.data.classes;
          var teacher_name = res.data.teacher_name;
          var class_items = Array();
          var select_cid = "";
          var select_gid = "";
          classes.forEach(function (item) {
            class_items.push({ name: item.class_name, gid: item.open_gid, value: item._id });
          });
          if (class_items.length>0){
            class_items[0].checked=true;
            select_cid = class_items[0].value;
            select_gid = class_items[0].gid;
          }
          that.setData({ loaded: true, role: app.globalData.role, class_items, class_items, select_cid: select_cid, select_gid: select_gid})
        }
      });
    });
  },

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var class_items = this.data.class_items;
    var select_cid = e.detail.value;
    var select_gid=""
    for (var i = 0, len = class_items.length; i < len; ++i) {
      class_items[i].checked = class_items[i].value == e.detail.value;
      if (class_items[i].checked ){
        select_gid = class_items[i].gid
      }
    }

    this.setData({
      class_items: class_items,
      select_cid: select_cid,
      select_gid: select_gid,
      album_name: "请选择相册",
      album_id: "",
    });
  },

  removeImg: function (event) {
    console.log(event)
    var id = event.currentTarget.id;
    var imageType = event.currentTarget.dataset.type;
    if (imageType == 1) {
      var imgs = that.data.selectedAnswerImgs;
      for (var i = 0; i < imgs.length; i++) {
        if (imgs[i] == id) {
          imgs.splice(i, 1)
          break;
        }
      }
      that.setData({
        selectedAnswerImgs: imgs
      })
    } else {
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
    }
  },

  removeVideo: function (event) {
    that.setData({tmp_video:""})
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
    if(that.data.tmp_video){
      files.push(that.data.tmp_video);
    }
    fileSize=files.length;
    var album_id = that.data.album_id;
    var cid = that.data.select_cid;
    var gid = that.data.select_gid;

    if(that.data.init_cid&&that.data.init_gid){
      cid = that.data.init_cid;
      gid = that.data.init_gid;
    }

    if (that.data.init_album_id) {
      album_id = that.data.init_album_id;
    }


    var desc = event.detail.value.desc;
    var role = that.data.role;
    if(!album_id){
      wx.showToast({
        title: '请选择相册',
      })
      return;
    }
    wx.showLoading({
      title: '提交中....',
      mask: true
    });
    if (files.length > 0) {
      var formdata = { album_id: album_id, cid: cid, desc: desc, gid: gid, role: role };
      console.log(formdata)
       that.uploadPic(files, formdata, function () {
        wx.hideLoading();
        wx.showToast({
          title: '上传成功',
          icon: 'success',
          duration: 1000
        });
        setTimeout(function () {
          wx.redirectTo({
            url: '../photos/photos?album_id=' + album_id + '&cid=' + cid + '&gid=' +gid,
          })
        }.bind(this), 1000);
        // that.setData({ selectedImgs: [] });
        // that.initPhotos(album_id, function () {
        //   wx.showToast({
        //     title: '上传成功',
        //   })
        // });
        // app.globalData.albumRefresh = true;
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
      console.log(fileSize)
      if(fileSize>1){
        var title = "上传第" + (fileSize - tmpfiles.length+1) + "张..";
        wx.showLoading({
          title: title,
          mask: true
        });
      }
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
   



  chooseVideo: function () {
    wx.showModal({
      title: '温馨提示',
      content: '由于微信的限制,视频的长度需要在60秒以内',
      showCancel: false,
      success: function (res) {
        wx.chooseVideo({
          sourceType: ['album', 'camera'],
          maxDuration: 60,
          camera: 'back',
          success: function (res) {
            if (res.duration > 60) {
              wx.showToast({
                title: '长度超过60s',
                icon: "none"
              })
            } else {
              that.setData({
                tmp_video: res.tempFilePath
              })
            }
          }
        })
      }
    })


  },



  chooseImage: function (e) {
  
    wx.chooseImage({
      count: 10,
      sizeType: [ 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var selectedImgs = that.data.selectedImgs.concat(res.tempFilePaths);
        if (selectedImgs.length > 10) {
          selectedImgs = selectedImgs.slice(0, 10);
          wx.showToast({
            title: '最多4张图片',
          })
        }
        that.setData({
          selectedImgs: selectedImgs
        });
      }
    })
  },
  previewImage: function (e) {
    var imageType = e.currentTarget.dataset.type;
    if (imageType == 1) {
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.data.selectedAnswerImgs // 需要预览的图片http链接列表
      })
    } else {
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.data.selectedImgs // 需要预览的图片http链接列表
      })
    }

  },


});