// pages/inform/inform.js
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
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userInfo: userInfo,
      red_id: options.red_id
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      let that = this;
      let sign = wx.getStorageSync('sign');
      wx.request({
        url: apiurl + "red/red-detail?sign=" + sign + '&operator_id=' + app.data.kid,
        data:{
          red_id: that.data.red_id
        },
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("红包详情:", res);
          that.setData({
             informList:res.data.data,
             member_info: res.data.data.member_info,
             receive_info: res.data.data.receive_info, 
             red_info: res.data.data.red_info,
             red_status: res.data.data.red_status
          })
        }
      })
  },
  money(){

  },
  share(e){
    wx.navigateTo({
      url: '../share/share?red_id=' + this.data.red_id
    })
  },
  // 预览拼图图片
  prewImg() {
    wx.previewImage({
      current: '' + this.data.red_info.content + '', // 当前显示图片的http链接
      urls: ['' + this.data.red_info.content + ''] // 需要预览的图片http链接列表
    })
  },
  onShareAppMessage: function () {
  
  }
})