// pages/shop/shop.js
var app = getApp();
var util = require('../../utils/util.js');
import tips from '../../utils/tips.js'
Page({
  data: {
  
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
  
  },
  onShow: function () {
    let that = this;
    wx.request({
      url: app.data.apiurl + "guessipk/recharge-list?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
      data: {
        guess_type: 'idiom'
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("充值列表:", res);
        var status = res.data.status;
        if (status == 1) {
          that.setData({
            list: res.data.data
          })
        } else {
          console.log(res.data.msg)
        }
      }
    })
  },
  // 充值
  rechargeTap(e){
    let that = this;
    let recharge_id = e.currentTarget.dataset.id;
    wx.request({
      url: app.data.apiurl + "guessipk/recharge?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
      data: {
        guess_type: 'idiom',
        recharge_id: recharge_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("充值:", res);
        var status = res.data.status;
        console.log("status:", status);
        if (status == 1) {
          // 调用支付
          wx.requestPayment({
            timeStamp: res.data.data.data.timeStamp,
            nonceStr: res.data.data.data.nonceStr,
            package: res.data.data.data.package,
            signType: res.data.data.data.signType,
            paySign: res.data.data.data.paySign,
            success: function (res) {
              tips.success('支付成功！');
            },
            fail: function (res) {
              console.log(res);
              tips.success('支付失败！');
            }
          })

        } else {
          console.log(res.data.msg);
        }
      }
    })
  }
 
})