var utils = require("utils/util.js");
import { get_sessionKey } from 'url.js';

App({
  onLaunch: function () {
    //判断网络状况
    wx.onNetworkStatusChange(res => {
      if (res.isConnected) {
        let curpage = getCurrentPages()[0];
        wx.reLaunch({
          url: "/" + curpage.route
        })
      } else {
        wx.showToast({
          title: '网络异常',
          icon: "none",
          duration: 2000
        });
      }
    })
  },
  
  globalData: {
    userInfo: wx.getStorageSync("userInfo")
  }

})