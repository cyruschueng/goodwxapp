// pages/money/money.js
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
    // 我的余额
    wx.request({
      url: apiurl + "birth/my-balance?sign=" + sign + '&operator_id=' + app.data.kid,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("我的余额:", res);
        var status = res.data.status;
        if (status == 1) {
          that.setData({
            money: res.data.data
          })
          wx.setStorageSync('money', res.data.data);
        } else {
          console.log(res.data.msg)
        }
      }
    })
    wx.hideLoading()
  }

  

  
})