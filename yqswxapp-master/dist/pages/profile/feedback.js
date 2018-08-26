// pages/profile/feedback.js

import * as hoteldata from '../../utils/hoteldata-format';
import * as HotelDataService from '../../services/hotel-service';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowWidth: '',
    textLangth: 150,
    textValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var me = this;
    wx.getSystemInfo({
      success: function (res) {
        me.setData({
          windowWidth: res.windowWidth
        })
      }
    })
  },

  bindTextInput (e) {
    console.log(JSON.stringify(e.detail.value))
    this.setData({
      textLangth: 150 - e.detail.value.length,
      textValue: e.detail.value
    })
  },
  bindCommitTap () {

    var textValue = this.data.textValue;
    var nickName = wx.getStorageSync('userinfo').nickName; 
    
    HotelDataService.uploadFeedback(nickName, textValue).then((result) => {
      console.log('uploadFeedback 。。 ' + JSON.stringify(result));

      wx.showToast({
        title: '发表成功!',
        icon: 'success',
        duration: 4000,
        success: function (res) {
          wx.navigateBack({
            delta: 1
          })
        }
      })

    }).catch((error) => {
      console.log(error);
    })

  }

})