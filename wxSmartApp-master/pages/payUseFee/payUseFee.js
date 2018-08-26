import { reToMainPage } from "../../libs/router";
let app = getApp();
let PATH = app.globalData.PATH;



let IMG_PATH = app.globalData.IMG_PATH;

let userInfoSync = wx.getStorageSync("userInfo");
var util = require('../../utils/util.js')
Page({
  data: {
    IMG_PATH: IMG_PATH,
    logs: []
  },
  onLoad: function () {
    let that = this;
    let payDataInfo = app.globalData.payDataInfo;
    that.setData({
        info: payDataInfo.data,
        payInfo: payDataInfo.data.payInfo,

        unpayCount: payDataInfo.data.unpayCount,
        totalDayCount: payDataInfo.data.totalDayCount,
        unpayFree: payDataInfo.data.unpayFree

    });
  },
  bindWechatPay: function () {

    wx.showToast({
      title: '加载中',
      icon: 'loading',
  
    })
    wx.request({
      url: PATH + '/resource-service/share/getShareList',
      method: 'get',
      header: {
        'Access-Token': app.globalData.accessToken,
      },
      data: {
        page: 1,
        perPage: 10,
        userId: app.globalData.userId
      },
      //post success
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200 && res.data.status == 211) {
          let payDataInfo = res;
          wx.request({
            url: PATH + '/resource-service/pay/payFree',
            method: 'POST',
            header: {
              'Access-Token': app.globalData.accessToken,
            },
            data: {
              eWalletLogid: payDataInfo.data.eWalletLogid
            },
            success: function (data) {
              console.log(data)
              wx.hideToast();
              if (data.statusCode == 200) {
                let payInfo = data.data.payInfo;
                wx.requestPayment({
                  'timeStamp': payInfo.timeStamp,
                  'nonceStr': payInfo.nonceStr,
                  'package': payInfo.payPackage,
                  'signType': 'MD5',
                  'paySign': payInfo.paySign,
                  'success': function (res) {
                    console.log(res);
                    wx.showModal({
                      title: "提示",
                      content: "使用费结算成功",
                      showCancel: false,
                      confirmText: "我知道了",
                      success: function () {
                        app.globalData.payDataInfo = {};
                        reToMainPage()
                      }
                    })
                  },
                  'fail': function (res) {
                    console.log(res);
                  }
                })
              }
            }
          })
        }
      }
    })
  }
})
