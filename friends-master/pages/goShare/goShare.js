// pages/goShare/goShare.js
var common = require('../../common.js');
var sign = wx.getStorageSync("sign");
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    that.setData({
      title: options.title,
      g_id: options.g_id
    })
    //回调
    common.getSign(function () {
      var sign = wx.getStorageSync('sign');
    })
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
    var sign = wx.getStorageSync("sign");
    var that = this;
    wx.request({
      url: "https://friend-guess.playonwechat.com/guess/do-you-uns-me?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        g_id: that.data.g_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("我的分享:", res);
        that.setData({
          imgurl: res.data.data
        })
      }
    })
  },
  // 预览海报
  prewImg: function () {
    var that = this;
    wx.previewImage({
      current: '' + that.data.imgurl + '', // 当前显示图片的http链接
      urls: ['' + that.data.imgurl + ''] // 需要预览的图片http链接列表
    })
  },

  // 保存二维码
  downLoad: function () {
    var that = this;
    console.log(that.data.imgurl,"0000");
    var imgurl = that.data.imgurl;
    wx.downloadFile({
      url: that.data.imgurl, //仅为示例，并非真实的资源
      success: function (res) {
        console.log(res);
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            //console.log(res);
            wx.showToast({
              title: '海报下载成功，请去相册查看',
              icon: 'success',
              duration: 800
            })
          }
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
 


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    return {
      title: "朋友猜猜",
      path: '/pages/goShare/goShare?g_id=' + that.data.g_id,
      success: function (res) {
        console.log(res);
        // 转发成功
      },
      fail: function (res) {
        console.log(res);
        // 转发失败
      }
    }
  }
})