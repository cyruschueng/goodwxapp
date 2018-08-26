const app = getApp();
const common = require('../../common.js');
const apiurl = 'https://friend-guess.playonwechat.com/';
let sign = wx.getStorageSync('sign');
import tips from '../../utils/tips.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      idol_id: options.idol_id
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
    let that = this;
    let sign = wx.getStorageSync('sign');
    wx.showLoading({
      title: '加载中',
    });
    // 安利路人
    wx.request({
      url: apiurl + "birth/share-with?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        idol_id: that.data.idol_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("安利路人 :", res);
        var status = res.data.status;
        if (status == 1) {
          that.setData({
            imgUrl: res.data.data
          })
        } else {
          console.log(res.data.msg)
        }
      }
    })
    wx.hideLoading()
  },


  // 预览海报
  prewImg: function () {
    var that = this;
    wx.previewImage({
      current: '' + that.data.imgUrl + '', // 当前显示图片的http链接
      urls: ['' + that.data.imgUrl + ''] // 需要预览的图片http链接列表
    })
  },

  // 海报下载
  downLoad: function () {
    var that = this;
    console.log(that.data.imgUrl);
    wx.downloadFile({
      url: '' + that.data.imgUrl + '', //仅为示例，并非真实的资源
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
})