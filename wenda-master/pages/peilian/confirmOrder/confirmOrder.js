// confirmOrder.js
import { server, imgServer, wxappServer } from '../../../libs/config.js';
var APP = getApp();
var APP_BASE = wxappServer;
var mta = require('../../../libs/mta_analysis.js');


Page({
  data: {
    price: 7,
    region: '微信大区',
    levelName: '白金',
    show: false,
    modalShow: false,
    reduceSrc: '../../../images/minusgray.png',
    addSrc: '../../../images/plus.png',
    perPrice: 7.0,
    show: false,
    time: 300,
    plusOne: 1,
    plusTwo: 2,
    friendNum: 0,
    friendNumOld: 1,
    oldPrice: 7,
    cardValue: 0,
    friendImage1: '../../../images/chooseblue.png',
    friendImage2: '../../../images/unchosed.png',
    payType: 5,
    srcWx: '../../../images/chooseBlue.png',
    srcWallet: '../../../images/unchosed.png',
    ifWallet: true
  },
  onLoad(options) {
    this.setData({
      orderId: options.orderId
    })
    if (options.cardId) {
      this.setData({
        cardId: options.cardId,
        cardValue: options.cardValue || 0,
        cardName: Math.floor(options.cardValue / 100) + '元' + decodeURIComponent(options.cardName)
      })
    }
  },
  onShow() {
    if (wx.getStorageSync('orderId')) {
      this.setData({
        orderId: wx.getStorageSync('orderId'),
        time: wx.getStorageSync('time')
      })
    }
    APP.login(this.gainAll, this);
  },
  gainAll() {
    this.gainData();
  },
  gainData() {
    wx.request({
      url: APP_BASE + `help/training/order/detail`,
      data: {
        sid: APP.globalData.sid,
        orderId: this.data.orderId
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        let data = res.data
        if (data.suc === '200') {
          let level = data.data.training.level;          
          if (data.data.training.gameRegion === 2) {
            this.setData({
              region: 'QQ大区'
            })
          }
          this.setData({
            oldPrice: data.data.amount / 100,
            price: data.data.amount / 100,
            levelName: level.name,
            gameNumber: data.data.training.gameNumber,
            plusOne: level.plusOne / 100,
            plusTwo: level.plusTwo / 100,
            wallet: data.data.walletBalance / 100
          })
          if (data.data.training.gamePersons == 3) {
            this.setData({
              oldPrice: this.data.price - this.data.plusTwo,
              price: this.data.price - this.data.plusTwo
            })
          } else if (data.data.training.gamePersons == 2) {
            this.setData({
              oldPrice: this.data.price - this.data.plusOne,
              price: this.data.price - this.data.plusOne
            })
          }
          if (wx.getStorageSync('friendShow')) {
            this.setData({
              friendShow: wx.getStorageSync('friendShow')
            })
          }
          if (this.data.friendShow == true) {
            this.setData({
              friendNum: wx.getStorageSync('friendNum')
            })
          }
          if (this.data.friendShow) {
            if (this.data.friendNum == 1) {
              this.setData({
                price: this.data.price + this.data.plusOne
              })
            } else if (this.data.friendNum == 2) {
              this.setData({
                price: this.data.price + this.data.plusTwo, 
                friendImage2: '../../../images/chooseblue.png',
                friendImage1: '../../../images/unchosed.png',
              })
            }
          }
          this.gainCard();
        }
      }
    })
  },
  gainCard() {
    wx.request({
      url: APP_BASE + `help/coupon/recommend`,
      data: {
        sid: APP.globalData.sid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        let data = res.data
        if (data.suc === '200') {
          if (!this.data.cardId && data.data) {
            this.setData({
              cardId: data.data.id,
              cardValue: data.data.value,
              cardName: Math.floor(data.data.value / 100) + '元' + data.data.name
            })
          }
          if (!this.data.cardId) {
            this.setData({
              cardName: '暂无可用优惠券',
              cardValue: 0
            })
          } else if (this.data.cardId == 'none') {
            this.setData({
              cardName: '不使用优惠券',
              cardValue: 0
            })
          }
          this.ifWalletEv();
          this.timeEv();
        }
      }
    })
  },
  confirmEv() {
    if (this.data.payLock) {
      return;
    }
    this.setData({
      payLock: true
    })
    setTimeout(() => {
      this.setData({
        payLock: false
      })
    }, 2000)
    if (this.data.cardId == 'none' || !this.data.cardId) {
      this.setData({
        cardId: ''
      })
    }
    wx.request({
      url: APP_BASE + `help/training/order/pay`,
      data: {
        sid: APP.globalData.sid,
        orderId: this.data.orderId,
        payType: this.data.payType,
        couponId: this.data.cardId,
        plusPersons: this.data.friendNum
      },
      success: (res) => {
        let data = res.data;
        if (data.suc === '200') {
          mta.Event.stat("playconfirmorder", {});
          if (data.data.isPaid == 1) { 
            wx.clearStorage();
            wx.redirectTo({
              url: '../waitOrder/waitOrder?orderId=' + this.data.orderId,
            })
          } else {
            this.payMoney(data.data.wxpay);
          }
        } else {
          wx.showToast({
            title: "支付失败请重试",
            duration: 2000
          })
          this.Modal.init({ type: 'tip', content: "支付失败请重试" });
          setTimeout(() => {
            this.setData({
              payLock: false
            })
          }, 2000)
        }
      }
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
  hideRuleEv() {
    this.setData({
      modalShow: false
    })
  },
  showRuleEv() {
    this.setData({
      modalShow: true
    })
  },
  reduceEv() {
    console.log(1)
    if (this.data.numLock) {
      return
    }
    this.setData({
      numLock: true
    })
    setTimeout(() => {
      this.setData({
        numLock: false
      })
    }, 300);
    let now = this.data.gameNumber;
    if (now > 1) {
      now -= 1;
      if (now === 2) {
        this.setData({
          addSrc: '../../../images/plus.png'
        })
      } else if (now === 1) {
        this.setData({
          reduceSrc: '../../../images/minusgray.png'
        })
      }
      this.setData({
        price: (now * this.data.perPrice).toFixed(1).toString(),
        gameNumber: now
      })
    }
  },
  addEv() {
    console.log(1)
    if (this.data.numLock) {
      return
    }
    this.setData({
      numLock: true
    })
    setTimeout(() => {
      this.setData({
        numLock: false
      })
    }, 300);
    let now = this.data.gameNumber;
    if (now < 3) {
      now += 1;
      if (now === 3) {
        this.setData({
          addSrc: '../../../images/plusgray.png'
        })
      } else if (now === 2) {
        this.setData({
          reduceSrc: '../../../images/minus.png'
        })
      }
      this.setData({
        price: (now * this.data.perPrice).toFixed(1).toString(),
        gameNumber: now
      })
    }
  },
  toCard() {
    wx.setStorageSync('orderId', this.data.orderId);
    wx.setStorageSync('time', this.data.time);
    wx.setStorageSync('friendShow', this.data.friendShow);
    wx.setStorageSync('friendNum', this.data.friendNum);
    mta.Event.stat("confirmtocard", {});
    wx.navigateTo({
      url: '../playCoupon/playCoupon?from=true&id=' + this.data.cardId,
    })
  },
  timeEv() {
    clearInterval(this.inter);
    this.setData({
      hour: Math.floor(this.data.time / 60),
      min: this.doubleDate(this.data.time % 60),
      show: true
    })
    this.inter = setInterval(() => {
      this.setData({
        time: --this.data.time
      })
      if (this.data.time == 0) {
        clearInterval(this.inter);
        wx.clearStorage();
        wx.switchTab({
          url: '../playIndex/playIndex?orderId=' + this.data.orderId,
        })
      }
      this.setData({
        hour: Math.floor(this.data.time / 60),
        min: this.doubleDate(this.data.time % 60)
      })
    }, 1000)
  },
  doubleDate: function (num) {
    return num < 10 ? '0' + num : num
  },
  switchEv(e) {
      if (e.detail.value) {
        mta.Event.stat("openfriend", {});
        this.setData({
          friendShow: true,
          friendNum: this.data.friendNumOld
        })
        if (this.data.friendNum == 1) {
          this.setData({
            price: this.data.oldPrice + this.data.plusOne
          })
        } else if (this.data.friendNum == 2) {
          this.setData({
            price: this.data.oldPrice + this.data.plusTwo
          })
        }
      } else {
        if (this.data.friendNum) {
          this.setData({
            friendNumOld: this.data.friendNum
          })
        }
        this.setData({
          friendShow: false,
          friendNum: 0,
          price: this.data.oldPrice
        })
      }
      this.ifWalletEv();
  },
  chooseFriendEv(e) {
    if (this.data.friendNum == e.currentTarget.dataset.num) {
      return
    }
    this.setData({
      friendNum: e.currentTarget.dataset.num
    })
    if (e.currentTarget.dataset.num == 1) {
      this.setData({
        friendImage1: '../../../images/chooseblue.png',
        friendImage2: '../../../images/unchosed.png',
        price: this.data.oldPrice + this.data.plusOne
      })
    } else if(e.currentTarget.dataset.num == 2) {
      this.setData({
        friendImage2: '../../../images/chooseblue.png',
        friendImage1: '../../../images/unchosed.png',
        price: this.data.oldPrice + this.data.plusTwo
      })
    }
    this.ifWalletEv();
  },
  toQuestionEv() {
    wx.setStorageSync('orderId', this.data.orderId);
    wx.setStorageSync('time', this.data.time);
    wx.setStorageSync('friendShow', this.data.friendShow);
    wx.setStorageSync('friendNum', this.data.friendNum);
    wx.navigateTo({
      url: '../playQuestion/playQuestion',
    })
  },
  ifWalletEv() {
    if (this.data.wallet >= (this.data.price - this.data.cardValue / 100)) {
      this.setData({
        payType: 6,
        srcWallet: '../../../images/chooseBlue.png',
        srcWx: '../../../images/unchosed.png',
        ifWallet: true
      })
    } else {
      this.setData({
        payType: 5,
        srcWx: '../../../images/chooseBlue.png',
        srcWallet: '../../../images/unchosed.png',
        ifWallet: false
      })
    }
  },
  choosePayWay(e) {
    if (this.data.payType == e.currentTarget.dataset.num || (e.currentTarget.dataset.num == 6 && !this.data.ifWallet)) {
      return
    }
    if (e.currentTarget.dataset.num == 5) {
      this.setData({
        payType: 5,
        srcWx: '../../../images/chooseBlue.png',
        srcWallet: '../../../images/unchosed.png',
      })
    } else if (e.currentTarget.dataset.num == 6) {
      this.setData({
        payType: 6,
        srcWallet: '../../../images/chooseBlue.png',
        srcWx: '../../../images/unchosed.png',
      })
    }
  }
})