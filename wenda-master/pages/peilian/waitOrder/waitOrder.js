import { server, imgServer, wxappServer } from '../../../libs/config.js';
var APP = getApp();
var APP_BASE = wxappServer;
var mta = require('../../../libs/mta_analysis.js');

Page({
  data: {
    numGrouth: 0,
    show: false,
    time: 120,
    src1: '../../../images/now.png',
    src2: '../../../images/wait.png',
    src3: '../../../images/wait.png',
    src4: '../../../images/wait.png',
    src5: '../../../images/wait.png',
  },
  onLoad(options) {
    this.setData({
      orderId: options.orderId
    })
  
  },
  onShow() {
    APP.login(this.gainAll, this);
  },
  gainAll() {
    this.gainData();
  },
  gainData() {
    wx.request({
      url: APP_BASE + `help/training/order/simple`,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        sid: APP.globalData.sid,
        orderId: this.data.orderId
      },
      success: (res) => {
        let data = res.data;
        if (data.suc === '200') {
          let num = data.data.deadline + 3;
          if (num > data.data.maxTime) {
            num = data.data.maxTime;
          }
          this.timeEv(num);
          this.setData({
            show: true
          })
        }
      }
    })
  },
  timeEv(num) {
    this.setData({
      time: num
    })
    let i = 0;
    let numGrouth = Math.floor(Math.random() * 151 + 50);
    let timer = setInterval(() => {
      num--;
      i++;
      this.setData({
        time: num
      })
      switch (i) {
        case 1:
          this.setData({
            src1: '../../../images/done.png',
            src2: '../../../images/now.png'
          })
          break;
        case 4:
          this.setData({
            src2: '../../../images/done.png',
            src3: '../../../images/now.png'
          })
          break;
        case 9:
          this.setData({
            src3: '../../../images/done.png',
            src4: '../../../images/now.png'
          })
          this.numGrouth(numGrouth);
          break;
        case 20:
          this.setData({
            src4: '../../../images/done.png',
            src5: '../../../images/now.png'
          })
          break;
        default:
          break;

      }
      if (i % 2 === 0) {
        wx.request({
          url: APP_BASE + `help/training/order/status`,
          data: {
            sid: APP.globalData.sid,
            orderId: this.data.orderId
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: (res) => {
            let data = res.data;
            if (data.data.isReceived === 1) {
              clearInterval(timer);
              this.setData({
                src1: '../../../images/done.png',
                src2: '../../../images/done.png',
                src3: '../../../images/done.png',
                src4: '../../../images/done.png',
                src5: '../../../images/done.png',
                numGrouth
              })
              wx.switchTab({
                url: '../playIndex/playIndex?orderId=' + this.data.orderId,
              })
            }
          }
        })
      }
      if (num === 0) {
        clearInterval(timer);
        this.setData({
          modalShow: true
        })
      }
    }, 1000)
  },
  numGrouth(num) {
    var i = 1;
    let timerNum = setInterval(() => {
      if (i < num) {
        this.setData({
          numGrouth: i
        })
        i += (i + 3);
      }
      else {
        clearInterval(timerNum);
      }
    }, 200)
  },
  ifCancelEv() {
    wx.showModal({
      title: '确认取消订单吗',
      success: (res) => {
        if (res.confirm) {
          this.cancelEv();
        }
      }
    })
  },
  cancelEv() {
    wx.request({
      url: APP_BASE + 'help/training/order/cancel',
      data: {
        sid: APP.globalData.sid,
        orderId: this.data.orderId
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        let data = res.data;
        if (data.suc == 200) {
          mta.Event.stat("playcancelorder", {});
          wx.switchTab({
            url: '../playIndex/playIndex?orderId=' + this.data.orderId,
          })
        } else {
          wx.showToast({
            title: '取消失败请重试',
          })
        }
      }
    })
  },
  hideModal() {
    this.setData({
      modalShow: false
    })
    wx.switchTab({
      url: '../playIndex/playIndex?orderId=' + this.data.orderId,
    })
  }
})