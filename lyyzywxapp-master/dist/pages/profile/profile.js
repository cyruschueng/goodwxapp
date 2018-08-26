// profile.js
import * as HotelDataService from '../../services/hotel-service';

Page({
  data: {
    userInfo: {},
  },
  onLoad: function (options) {
  
    var me = this;
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        me.setData({
          userInfo: userInfo
        })
        wx.setStorage({
          key: 'userinfo',
          data: userInfo,
        })
      }
    })


    HotelDataService.queryProfileBgImg().then((result) => {

      this.setData({
        profileBgimg: result
      })

    }).catch((error) => {
      console.log(error);
    })

  },

  bindMessageTap () {
    wx.navigateTo({
      url: '../message/messageListView',
    })
  },

  // 跳转
  goChangeSchedulePage () {
    wx.navigateTo({
      url: '../calculate/changeSchedule',
    })
  },
  goFeedbackPage () {
    wx.navigateTo({
      url: 'feedback',
    })
  },
  goHistoryOrderPage () {
    wx.navigateTo({
      url: 'historyorder',
    })
  },
  goMyorderPage () {
    wx.navigateTo({
      url: 'myorder',
    })
  }

  

})