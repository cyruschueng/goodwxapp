import { About } from './about-model.js';
var about = new About();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 38.882356,
    longitude: 115.476353,
    markers: [{
      latitude: 38.882356,
      longitude: 115.476353,
      title: '万博广场',
      iconPath: '/images/icon/location.png',
      width: 30,
      height: 30
    }],
    storeInfo: {
      location: '河北省保定市朝阳北大街99号',
      phoneNumber: 10105188
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var params = {
      data: {
        wxSid: wx.getStorageSync('wxSid'),
        storeNo: wx.getStorageSync('storeNo')
      }
    }
    about.getStoreInfo(params, res => {
      if (res.status) {
        that.setData({
          storeInfo: res.data
        });
      }
    })
  },

  getLocation() {
    var that = this;
    wx.getLocation({
      success: function (res) {
        wx.openLocation({
          latitude: that.data.latitude,
          longitude: that.data.longitude,
        })
      },
    })
  },
  call() {
    wx.makePhoneCall({
      phoneNumber: '10105188',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})