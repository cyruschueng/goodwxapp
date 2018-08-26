// pages/niceimg/niceimg.js
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
    niceImg: [
      "nice/1.jpg",
      "nice/2.jpg",
      "nice/3.jpg",
      "nice/4.jpg",
      "nice/5.jpg",
      "nice/6.jpg",
      "nice/7.jpg",
      "nice/8.jpg",
      "nice/9.jpg",
      "nice/10.jpg",
      "nice/11.jpg",
      "nice/12.jpg",
      "nice/13.jpg",
      "nice/14.jpg",
      "nice/15.jpg",
      "nice/16.jpg",
      "nice/17.jpg",
      "nice/18.jpg",
      "nice/19.jpg",
      "nice/20.jpg",
      "nice/21.jpg",
      "nice/22.jpg",
      "nice/23.jpg",
      "nice/24.jpg",
      "nice/25.jpg",
      "nice/26.jpg",
      "nice/27.jpg",
      "nice/28.jpg",
      "nice/29.jpg",
      "nice/30.jpg",
      "nice/31.jpg",
      "nice/32.jpg",
      "nice/33.jpg"
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})