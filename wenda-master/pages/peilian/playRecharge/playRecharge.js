import { server, imgServer, wxappServer } from '../../../libs/config.js';
var APP = getApp();
var APP_BASE = wxappServer;
var mta = require('../../../libs/mta_analysis.js');

Page({
  data: {
  
  },
  onShow: function () {
    APP.login(this.gainAll, this);
  },
  chooseNum(e) {
    if (this.data.btnNum == e.currentTarget.dataset.num) {
      this.setData({
        num: 0,
        btnNum: 0
      })
    } else {
      this.setData({
        num: e.currentTarget.dataset.num,
        btnNum: e.currentTarget.dataset.num
      })
    }
  },
  gainAll() {
    this.gainData();
  },
  gainData() {},
  removeEv(e) {
    this.setData({
      btnNum: 0,
      num: e.detail.value,
      inputNum: e.detail.value
    })
  },
  confirmEv() {
    if (this.data.lock) {
      return
    }
    mta.Event.stat("playclickrecharge", {});
    this.setData({
      lock: true
    })
    setTimeout(() => {
      this.setData({
        lock: false
      })
    }, 2000)
    let num = 0;
    if (this.data.inputNum === '0') {
      this.showTipEv('充值金额不能小于1元');
      return
    } else if (!this.data.inputNum && !this.data.num) {
      this.showTipEv('请选择充值金额');
      return
    } else if (this.data.inputNum > 5000 )  {
      this.showTipEv('充值金额不能大于5000元');
    } else if (this.data.inputNum) {
      num = this.data.inputNum;
    } else {
      num = this.data.num;
    }
    wx.request({
      url: APP_BASE + `help/user/wallet/recharge`,
      data: {
        sid: APP.globalData.sid,
        amount: num * 100,
        payType: 5,
        fromTarget: 1
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        let data = res.data;
        if (data.suc === '200') {
          this.payMoney(data.data.wxpay);
        } else {
          this.showTipEv('支付失败请重试');
          this.setData({
            lock: false
          })
        }
      }
    })
  },
  showTipEv(str) {
    wx.showToast({
      title: str,
      duration: 2000
    })
  },
  payMoney(obj) {
    let This = this;
    wx.requestPayment({
      timeStamp: obj.timeStamp,
      nonceStr: obj.nonceStr,
      package: obj.pack,
      signType: obj.signType,
      paySign: obj.sign,
      success: (res) => {
        mta.Event.stat("playrechargesuc", {});
        wx.redirectTo({
          url: '../waitOrder/waitOrder?orderId=' + this.data.orderId,
        })
      },
      fail: function (res) {
        wx.showToast({
          title: "支付失败请重试",
          duration: 2000
        })
      },
      complete: function (res) {
        // complete
      }
    })
  },
  showRule() {
    this.setData({
      blackShow: true
    })
  },
  hideRule() {
    this.setData({
      blackShow: false
    })
  }
})