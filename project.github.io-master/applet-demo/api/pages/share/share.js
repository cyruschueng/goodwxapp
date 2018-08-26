// pages/share/share.js
var config = require("../../utils/config.js");
var app =  getApp();
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
      wx.showShareMenu({
          withShareTicket: true,
          success: function(res) {
              console.log(res);
          },
          fail: function(res) {
              console.log(res);
          }
      })
      // wx.request({
      //     url: 'http://localhost/sign.php',
      //     header: {
      //         'content-type': 'application/json' // 默认值
      //     },
      //     success: function(res) {
      //         console.log(res.data)
      //     },
      //     fail: function(res){
      //         console.log(res.data)
      //     }
      // })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
      wx.showShareMenu({
          withShareTicket: true,
          success: function(res) {
              console.log(res);
          },
          fail: function(res) {
              console.log(res);
          }
      })
      return {
          title: '自定义转发标题',
          imageUrl: '/images/1.png',
          success: function(res) {
              console.log(res.shareTickets[0]);
              wx.getShareInfo({
                  shareTicket:res.shareTickets[0],
                  timeout:10000,
                  success:function(errMsg){
                      console.log('接口调用成功');
                      console.log(errMsg);
                      // //解密获取群对当前小程序的唯一ID
                      // wx.request({
                      //     url:'http://localhost/decrypt/demo.php',
                      //     header: {
                      //         'content-type': 'application/x-www-form-urlencoded'
                      //     },
                      //     method: "POST",
                      //     data:{
                      //         "appid":config.appid,
                      //         "sessionKey":app.globalData.session_key,
                      //         "encryptedData":errMsg.encryptedData,
                      //         "iv":errMsg.iv
                      //     },
                      //     success:function (res) {
                      //         console.log(res);
                      //     },
                      //     fail:function (res) {
                      //         console.log('解密失败');
                      //         console.log(res);
                      //     }
                      // });
                  },
                  fail:function(errMsg){
                      console.log('接口调用失败');
                      console.log(errMsg);
                  },
              });
          },
          fail: function(res) {
              console.log('转发失败'+res);
          }
      }
  }
})