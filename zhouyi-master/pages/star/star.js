// pages/star/star.js
var app = getApp();
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
    setTimeout(function () {
        wx.switchTab({
          url: '../index/index', 
        })
        wx.setStorageSync("navto", 0)
    }, 3000)
  },
  onShow(){
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
  },
  // tap() {
  //   wx.switchTab({
  //     url: '../index/index',
  //   })
  //   wx.setStorageSync("navto", 0)
  // },


})