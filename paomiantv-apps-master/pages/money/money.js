//index.js
var util = require('../../utils/util.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    balance: 0,
    fee: 0,
    amount: null,
    createBtnDisabled: false,
  },
  linkToAccount: function () { // 跳转至收支明细
    wx.navigateTo({
      url: 'account/account'
    })
  },
  handleInput: function (e) {
    console.log(e.target.dataset.key + "," + e.detail.value)
    let obj = {};
    obj[e.target.dataset.key] = e.detail.value;
    this.setData(obj)
    if (e.target.dataset.key == 'amount') {
      var amount = this.data.amount;
      var balance = this.data.balance;
      if (amount > balance) {
        app.showMsg("余额不足，不能提现");
        amount = balance
        var fee = util.roundFun(amount * 0.02, 2)
        this.setData({
          amount: balance,
          fee: fee
        })
      } else {
        var fee = util.roundFun(amount * 0.02, 2)
        this.setData({
          fee: fee
        })
      }
    }

  },

  onLoad: function () {
    this.getAccount()
  },
  getAccount: function () {
    var sessionid = app.globalData.jsessionid;
    wx.request({
      url: app.globalData.baseUrl + '/api/packet/account?jsessionid=' + sessionid,
      success: result => {
        console.log("getAccount=" + JSON.stringify(result.data));
        if (result.data && result.data.status == 0 && result.data.data) {
          this.setData({
            balance: result.data.data.amount
          })
        }
      }
    })
  },

  getCash: function () {
    var sessionid = app.globalData.jsessionid;
    var amount = this.data.amount;
    var balance = this.data.balance;
    if (amount > balance) {
      app.showMsg("余额不足，不能提现");
      return;
    }

    if (this.data.createBtnDisabled) {
      return;
    }

    this.setData({
      createBtnDisabled: true
    });

    wx.request({
      url: app.globalData.baseUrl + '/api/packet/cash?jsessionid=' + sessionid,
      method: 'POST',
      data: {
        amount: amount
      },
      header: {
        //'content-type': 'application/json' // 默认值
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: result => {
        this.setData({
          createBtnDisabled: false
        });
        if (result.data && result.data.status == 0) {
          app.showMsg("您的提现已经受理，1~5个工作日发送到您微信钱包");
          this.setData({
            amount: null,
            fee: 0
          })
          this.getAccount();
        } else {
          app.showMsg(result.data.error);
        }
      }
    })
  },

  allCash: function () {
    var fee = util.roundFun(this.data.balance * 0.02, 2)
    this.setData({
      amount: this.data.balance,
      fee: fee
    })
  },

})