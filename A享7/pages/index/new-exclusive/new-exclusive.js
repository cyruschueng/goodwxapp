//index.js 
// import Api from '/../../utils/config/api.js';
// import { GLOBAL_API_DOMAIN } from '/../../utils/config/config.js';
// var utils = require('../../utils/util.js')
// let app = getApp()
Page({
  data: {
    isNew: 0
  },
  onLoad: function (options) {
    
  },
  onReady: function () {
    
  },
  onShow: function () {
    
  },
  onHide: function () {
    
  },
  isNewUser: function () {   //判断是否新用户
    let that = this;
    let _parms = {
      userId: app.globalData.userInfo.userId
    };
    Api.isNewUser(_parms).then((res) => {
      if (res.data.code == 0) {
        that.setData({
          isNew: 1
        });
      }
    })
  },
  toReceive: function() {  //点击领取新人专享
    if(this.data.isNew == 1) {
      wx.navigateTo({
        url: '/pages/index/consume-qibashare/consume-qibashare',
      })
    } else if (this.data.isNew == 0) {
      wx.showToast({
        title: '您已不是新用户！',
        icon: 'none'
      })
    }
  }
})