var util = require("../../utils/util.js")
var app = getApp();
var that;
const config = require('../../config')
var sliderWidth = 96; 
Page({
  data: {

    winWidth: 0,
    winHeight: 0,
    albumWidth:0,
    url:'',
    no_albums:true,
    cid:'',
    gid: '',
    loaded:false,
    tabs: ["最新上传","全部相册", "我的相册"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    myAlbums:[],
    allAlbums:[],
    role:'',
    aliyunVideoOssPreUrl:"",
    aliyunVideoCoverExt: "",
    aliyunImageOssPreUrl: ""
  },

  // aliyunVideoOssPreUrl: `http://campussharevideo.oss-cn-beijing.aliyuncs.com/`,
  // aliyunImageOssPreUrl: `http://campus002.oss-cn-beijing.aliyuncs.com/`,

  // aliyunVideoCoverExt: `?x-oss-process=video/snapshot,t_20000,f_jpg,w_800,h_600`,

  onShow:function(){
    var albumRefresh=app.globalData.albumRefresh;
    if (albumRefresh){
      that.initAlbum(that.data.cid);
    }
    app.globalData.albumRefresh=false;
  },

  onLoad: function (options) {
    that = this;
    var cid = "";
    var gid = "";
    var class_name = "";
    if (options.cid){
     cid = options.cid;
    }
    if (options.gid) {
      gid = options.gid;
    }
    if (options.class_name) {
      class_name = options.class_name;
    }
    var albumWidth = parseInt((app.globalData.winWidth / 2) * 0.75);
    that.setData({
      sliderLeft: (app.globalData.winWidth / that.data.tabs.length - sliderWidth) / 2,
      sliderOffset: app.globalData.winWidth / that.data.tabs.length * that.data.activeIndex,
      winWidth: app.globalData.winWidth, winHeight: app.globalData.winHeight, albumWidth: albumWidth,
      photoWidth: parseInt(app.globalData.winWidth / 3 - 20),
      role:app.globalData.role,
      gid: gid,
      class_name: class_name,
      aliyunVideoOssPreUrl: config.aliyunVideoOssPreUrl,
      aliyunImageOssPreUrl: config.aliyunImageOssPreUrl,
      aliyunVideoCoverExt: config.aliyunVideoCoverExt
    });
    var title = '班级相册';
    if(class_name){
      title = class_name + '班级相册';
    };
    wx.setNavigationBarTitle({
      title: title
    })
    that.initAlbum(cid);
     
  },

  initAlbum:function(cid){
    wx.showLoading({
      title: '加载中..',
    })
    app.getImprint(function (imprint) {
      var formdata = { "cid": cid }
      util.AJAX1(config.getAlbumsUrl, formdata, "post", { imprint: imprint }, function (res) {
        var result = res.data;
        wx.hideLoading();
        console.log(res)
        if (result.status == 'ok') {
          result.newPhotos.forEach(function (item) {
            item.role = util.GetFamilyRole(item.role);
            item.create_at = util.formatTime(item.create_at, 3)
          })
          that.setData({ cid: cid, allAlbums: result.allAlbums, myAlbums: result.myAlbums, newPhotos: result.newPhotos, loaded: true })
        }
      });
    });
  },


  action:function(e){
    var album_id = e.currentTarget.id;
    var owner = e.currentTarget.dataset.owner;

    if(!(owner||that.data.role=='teacher')){
      return;
    }
    console.log(e)
    var itemList = ['删除相册'];
    wx.showActionSheet({
      itemList: itemList,
      success: function (res) {

        if (app.globalData.isExpOpenid) {
          wx.showToast({
            title: '体验者无权限',
          })
          return;
        }
        if (res.tapIndex == 0) {
          wx.showModal({
            title: '提示',
            content: '确定要删除么',
            success: function (res) {
              if (res.confirm) {
                wx.showNavigationBarLoading()
                app.getImprint(function (imprint) {
                  var formdata = { album_id: album_id }
                  util.AJAX1(config.delAlbumUrl, formdata, "post", { imprint: imprint }, function (res) {
                    var result = res.data;
                    wx.hideLoading()
                    wx.hideNavigationBarLoading();
                    if (result.status == 'ok') {
                      var newAllAlbums = [];
                      var newMyAlbums = [];
                      that.data.allAlbums.forEach(function (item) {
                        if (item._id != album_id) {
                          newAllAlbums.push(item)
                        }
                      });
                      that.data.myAlbums.forEach(function (item) {
                        if (item._id != album_id) {
                          newMyAlbums.push(item)
                        }
                      });
                      that.setData({ allAlbums: newAllAlbums, myAlbums: newMyAlbums })
                    }
                  });
                });
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } 
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },




  previewPhoto: function (e) {

    var id = e.currentTarget.id;
    var photo_id = e.currentTarget.dataset.photoid;
    console.log(e)
    var photosUrl = [];
    var photos = that.data.newPhotos;
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



  createAlbum: function (e) {
    wx.navigateTo({
      url: '../createalbum/createalbum?cid=' + that.data.cid + '&gid=' + that.data.gid,
    })
  },

  chooseType: function (e) {
    var ext="";
    if(that.data.cid&&that.data.gid){
      ext = "&cid="+ that.data.cid + "&gid=" + that.data.gid
    }
    wx.showActionSheet({
      itemList: ['上传照片', '上传小视频'],
      success: function (res) {
       if(res.tapIndex==0){
         wx.navigateTo({
           url: '../uploadphoto/uploadphoto?type=0' + ext
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


  navigate: function (e) {
    var album_id = e.currentTarget.id;
    wx.navigateTo({
      url: '../photos/photos?album_id='+album_id+'&cid='+that.data.cid+'&gid='+that.data.gid,
    })
    
  },

  tabClick: function (e) {
    console.log(e)
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
});
