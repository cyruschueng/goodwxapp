// pages/shareImg/shareImg.js
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
    let imgUrl = wx.getStorageSync('imgUrl');
    this.setData({
      imgUrl: imgUrl
    })
  },
  onShow: function () {
    let that = this;
  },

  // 预览海报
  prewImg() {
    wx.previewImage({
      current: '' + this.data.imgUrl + '', // 当前显示图片的http链接
      urls: ['' + this.data.imgUrl + ''] // 需要预览的图片http链接列表
    })
  },
  // 保存图片
  save: function () {
    let that = this;
    wx.downloadFile({
      url: '' + that.data.imgUrl + '', 
      success: function (res) {
        console.log(res);
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showToast({
              title: '图片保存成功，请去相册查看',
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
  }


 })