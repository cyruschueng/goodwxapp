// pages/createnotice/createnotice.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   xiaoyouid:'',
   noticeid: '',
   notice:'',
   is_zhiding: false,
   files: [],
   delimg: app.globalData.imgpath + 'del.png',
   images: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    if(options.xiaoyouid){
      _this.setData({
        xiaoyouid: options.xiaoyouid,
      })
    }
    if (options.id) {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      wx.request({
        url: app.globalData.url + 'getNotice',
        data: { id: options.id},
        success: function(res){
          wx.hideLoading();
          if(res.data){
            _this.setData({
              notice: res.data,
            })
            if (res.data.zhidingNum != '0' && res.data.zhidingNum != 0){
              _this.setData({
                is_zhiding: true,
              })
            }
            if (res.data.images != '' && res.data.images != null){
              var images = new Array();
              var fileImages = new Array();
              images = res.data.images.split(",");
              for(var i=0;i<images.length;i++){
                fileImages.push(app.globalData.acimg + images[i]);
              }
              _this.setData({
                files: fileImages,
                images: images
              })
            }
          }
        }
      })
      _this.setData({
        noticeid: options.id,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 创建公告
   */
  formSubmit: function (e) {
    var _this = this;
    var openid = app.globalData.openid;
    var acinfo = e.detail.value;
    if (acinfo.title == '' || acinfo.title == null){
      wx.showModal({
        title: '',
        content: '您还没有输入公告标题',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    if (acinfo.content == '' || acinfo.content == null) {
      wx.showModal({
        title: '',
        content: '您还没有输入公告内容',
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    var zhiding = 0;
    if (acinfo.zhiding){
      zhiding = 1;
    }
    var notice = '';
    var imagesrc = '';
    if (_this.data.images != '' && _this.data.images.length > 0){
      imagesrc = _this.data.images.join(',');
    }
    if (_this.data.noticeid == '' || _this.data.noticeid == undefined){
      notice = {
        title: acinfo.title,
        content: acinfo.content,
        zhiding: zhiding,
        openid: openid,
        xiaoyou_id: _this.data.xiaoyouid,
        images: imagesrc
      }
    }else{
      notice = {
        id: _this.data.noticeid,
        title: acinfo.title,
        content: acinfo.content,
        zhiding: zhiding,
        images: imagesrc
      }
    }
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    wx.request({
      url: app.globalData.url + 'addNotice',
      data: notice,
      method: 'POST',
      success: function (res) {
        wx.hideLoading();
        if (res.data != 'error'){
          wx.showModal({
            title: '',
            content: '创建成功',
            showCancel: false,
            confirmText: '知道了',
            success: function (res) {
              // wx.redirectTo({
              //   url: '/pages/alumnipage/alumnipage?id=' + _this.data.xiaoyouid,
              //   success: function (res) {
              //     wx.hideLoading();
              //   },
              //   fail: function (res) {
              //   }
              // })
              // wx.switchTab({
              //   url: '../alumnilist/alumnilist',
              // })
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }else{
          wx.showModal({
            title: '',
            content: '创建失败，服务器错误',
            showCancel: false,
            confirmText: '知道了',
          })
        }
      }
    })
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths[0])
        });
        wx.showLoading({
          title: '加载中',
          mask: true
        })
        wx.uploadFile({
          url: app.globalData.url + 'saveImg',//仅为示例，非真实的接口地址
          filePath: res.tempFilePaths[0],
          name: 'file',
          success: function (res) {
            wx.hideLoading();
            var data = res.data;
            if(data){
              var imgs = JSON.parse(data);
              that.setData({
                images: that.data.images.concat(imgs.imgsrc),
              });
            }
            //do something
          }
        })
      }
    })
  },
  previewImage: function (e) {
    //所有图片
    var files = this.data.files;
    wx.previewImage({
      //当前显示图片
      current: e.currentTarget.id,
      //所有图片
      urls: files
    })
  },
  // 删除图片
  deleteImg: function (e) {
    var files = this.data.files;
    var images = this.data.images;
    var index = e.currentTarget.dataset.index;
    files.splice(index, 1);
    images.splice(index, 1);
    this.setData({
      files: files,
      images: images
    });
  }
})