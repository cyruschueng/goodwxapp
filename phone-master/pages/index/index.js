const app = getApp();
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
    console.log("options:", options);
    if (options.pw_id) {
      setTimeout(function () {
        wx.switchTab({
          url: '../indexs/indexs?pw_id=' + options.pw_id,
        })
      }, 3000)
    }else{
      setTimeout(function () {
        wx.switchTab({
          url: '../indexs/indexs',
        })
      }, 3000)
    }
    
  },
  onShow() {
    let that = this;
    let kid = wx.getStorageSync('kid')
    wx.request({
      url: "https://unify.playonweixin.com/site/get-advertisements",
      success: function (res) {
        console.log(res);
        if (res.data.status) {
          var advers = res.data.adver.advers;
          var head_adver = res.data.adver.head_adver;
          var broadcasting = res.data.adver.broadcasting;
          wx.setStorageSync("advers", advers);
          wx.setStorageSync("broadcasting", broadcasting);
          that.setData({
            head_adver
          })
        }
      }
    })
  }


})