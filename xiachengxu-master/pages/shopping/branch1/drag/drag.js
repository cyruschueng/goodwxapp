// pages/shopping/branch1/drag/drag.js
var app = getApp();
import qiniuUploader from '../../../common/js/qiniuUploader.js';
import { Config } from '../../../../utils/config.js';
Page({
  data: {
    files: [],
    showModalStatus: false,
    indicatorDots: true,
    autoplay: false,
    interval: 2000,
    duration: 1000,
    circular: true,
    showView: true
  },
  onLoad: function () {
    var that = this;
    wx.setStorage({
      key: "goodsUrl",
      data: []
    })
    wx.getStorage({
      key: "files",
      success: function (res) {
        that.setData({
          files: res.data
        })
      }
    })
  },
  chooseImage: function (e) {
    var that = this;
    var wxUid = wx.getStorageSync('wxUid');
    var wxSid = wx.getStorageSync('wxSid');
    wx.chooseImage({
      count: 9 - that.data.files.length,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths),
          tempFiles: res.tempFilePaths
        });
        if (that.data.files.length >= 9) {
          that.setData({
            showView: (!that.data.showView)
          })
        }
        //调用七牛上传图片
        that.batchUpload(res.tempFilePaths);
      }
    })
  },

  validFileType: function (type, typeList) {
    return typeList.includes(type);
  },

  //预览图片
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  //删除图片
  deleteImg: function (e) {
    var that = this;
    var imgs = this.data.files;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      files: imgs
    });
    if (that.data.files.length < 9) {
      that.setData({
        showView: true
      })
    }
    wx.setStorage({
      key: 'files',
      data: '',
    })
  },
  //上传到七牛
  batchUpload: function (tempFiles) {
    var that = this;
    var wxUid = wx.getStorageSync('wxUid');
    var wxSid = wx.getStorageSync('wxSid');
    var goodsUrl = [];
    for (var i = 0; i < tempFiles.length; i++) {
      var filePath = tempFiles[i];
      var imgName = tempFiles[i].substr(30, 50) + '.png';
      qiniuUploader.upload(filePath, (res) => {
        //上传成功，上传成功一张图片，进入一次这个方法，也就是返回一次
        goodsUrl.push(res.imageURL);
        if (goodsUrl.length == tempFiles.length) {
          wx.setStorage({
            key: "goodsUrl",
            data: goodsUrl
          })
        }
      },
        (error) => {
          //图片上传失败，可以在七牛的js里面自己加了一个err错误的返回值
          console.log('error: ' + error)
        },
        {
          region: 'NCN',
          domain: 'p1az9gcpw.bkt.clouddn.com', // bucket 域名
          uptokenURL: Config.restUrl + '/wxserver/imgUpload/upload?wxUid=' + wxUid + '&wxSid=' + wxSid,
          uploadURL: 'https://up-z1.qbox.me',//华东
          key: imgName, // 自定义文件 key
        });
    }

  },
  button: function (e) {
    var that = this;
    wx.setStorage({
      key: "files",
      data: that.data.files
    });
    wx.navigateBack({

    })
  },

});