//index.js
//获取应用实例
var api = require('../../api.js')
var app = getApp()
Page({
  data: {
  },
    onShareAppMessage: function () {
        var shareText = '免费起名，生辰八字起名，宝宝起名。名字打分，三才配置解析和五格命理分析';
        return {
            title: shareText,
            path: "/pages/index/index"
        }
    },
  onLoad: function (options) {
      let lName = options.lName;
      var that = this;
      wx.showNavigationBarLoading();
      wx.showToast({
          title: 'Loading……',
          duration:2000,
          icon: 'loading'
      })

      let fName = wx.getStorageSync('fName')
      let gender = wx.getStorageSync('gender')
      let flag = wx.getStorageSync('flag')
      let timeType = wx.getStorageSync('timeType')
      let year = wx.getStorageSync('year')
      let month = wx.getStorageSync('month')
      let day = wx.getStorageSync('day')
      let hour = wx.getStorageSync('hour')
      let min = wx.getStorageSync('min')

      api.detail(fName,lName,year,month,day,hour,min,timeType,gender,flag,function(res) {
          console.log(res)
          wx.hideToast()
          wx.hideNavigationBarLoading();

          if(res.baziInfo&&res.baziInfo.your_desc){
              res.baziInfo.your_desc = res.baziInfo.your_desc.replace("农历","公历")
          }

          res.scoreInfo.wenan = res.scoreInfo.wenan.replace('打分分数取自好名字、美名腾、易奇八字三家网站平均分。','')

          that.setData({
            data:res
          });
      },function (res) {
          wx.hideToast()
          wx.hideNavigationBarLoading();
          wx.showToast({
            image:'../../styles/info_icon.png',
              title: '系统繁忙，请稍后再试',
              duration: 2000
          });
      });
  }
})
