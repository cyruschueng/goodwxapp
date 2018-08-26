// pages/chong/chong.js
let tcity = require("../../utils/citys.js");
let app = getApp();
let sign = wx.getStorageSync('sign');
let common = require('../../common.js');
let apiurl = 'https://friend-guess.playonwechat.com/';
import tips from '../../utils/tips.js' 
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
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      let that = this;
      let sign = wx.getStorageSync('sign');
      wx.showLoading({
        title: '加载中',
      });
      
      wx.hideLoading()
  },
  bindKeyInput(e){
    this.setData({
      _money: e.detail.value
    })
  },
  recharge(){
    let that = this;
    let sign = wx.getStorageSync('sign');
    if (!that.data._money){
        tips.alert("请输入有效的金额");
        return false;
    }
    wx.showLoading({
      title: '加载中',
    });
    // 充值
    wx.request({
      url: apiurl + "birth/recharge?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        money: that.data._money
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("充值:", res);
        var status = res.data.status;
        if (status == 1) {
          // 调用支付
          wx.requestPayment({
            timeStamp: res.data.data.timeStamp,
            nonceStr: res.data.data.nonceStr,
            package: res.data.data.package,
            signType: res.data.data.signType,
            paySign: res.data.data.paySign,
            success: function (res) {
              console.log(res);
              tips.success('充值成功！');
              that.setData ({
                _money: ''
              })
              // 返回
              wx.navigateBack({
                url: '../money/money'
              })
            },
            fail: function (res) {
              console.log(res);
              tips.error('支付失败！');
            }
          })
        } else {
          console.log(res.data.msg);
          tips.alert(res.data.msg);
        }
      }
    })
    wx.hideLoading()
  }

 
  
})