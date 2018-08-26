// pages/star/star.js
const app = getApp()
const common = require('../../common.js');
const apiurl = 'https://friend-guess.playonwechat.com/';
let sign = wx.getStorageSync('sign');
import tips from '../../utils/tips.js'
modules: [];//模板
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  onLoad: function (options) {
      //回调
      let that = this;
      common.getSign(function() {})
      setTimeout(function () {
        wx.switchTab({
          url: '../index/index',
        })
        wx.setStorageSync("navto", 0)
      }, 3000)
    },
    onShow(){
      // wx.request({
      //   url: apiurl + "red/start-ad?sign=" + sign + '&operator_id=' + app.data.kid,
      //   header: {
      //     'content-type': 'application/json'
      //   },
      //   method: "GET",
      //   success: function (res) {
      //     console.log("adimg:", res);
      //     var status = res.data.status;
      //     if (status == 1) {
      //       that.setData({
      //         allMoney: res.data.data
      //       })

      //     } else {
      //       //tips.alert(res.data.msg);
      //     }
      //   }
      // })
      var that = this;
      wx.request({
        url: "https://unify.playonweixin.com/site/get-advertisements?kid=" + app.data.kid,
        success: function (res) {
          console.log(res);
          if (res.data.status) {
            var advers = res.data.adver.advers;
            var head_adver = res.data.adver.head_adver;
            wx.setStorageSync("advers", advers);
            that.setData({
              head_adver
            })
          }
        }
      })
    }

})