//index.js
var util = require('../../utils/util.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    balance: 0.00, // 余额
    titleIndex: -1,
    levelIndex: -1,
    levelItem: ['普通', '困难'],
    ignoreBalance: false,
  },
  changeTitle: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      titleIndex: e.detail.value
    })
  },
  changeLevel: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      levelIndex: e.detail.value
    })
  },
  handleInput: function (e) {
    console.log(e.target.dataset.key + "," + e.detail.value)
    let obj = {};
    obj[e.target.dataset.key] = e.detail.value;
    this.setData(obj)
    console.log(JSON.stringify(this.data))
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    this.initPraisePacket();
    this.getAccount();
  },
  getUserInfo: function (e) { // 获取用户信息
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  initPraisePacket: function () {
    var sessionid = app.globalData.jsessionid;
    wx.request({
      url: app.globalData.baseUrl + '/p1/redpacket_praise?jsessionid=' + sessionid,
      success: result => {
        console.log("getRedPacketVideo=" + JSON.stringify(result.data));
        if (!result.data || !result.data.data) {
          return;
        }
        if (result.data.status == 50004) {
          if (result.data.data.redpacket_amount == 0) {
            result.data.data.redpacket_amount = null
          }
          if (result.data.data.redpacket_number == 0) {
            result.data.data.redpacket_number = null
          }

          this.setData({
            packet: result.data.data,
          })
        }
      }
    })
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

  createPraisePacket: function () {
    //TODO   
    if (!this.data.packet.redpacket_amount || this.data.packet.redpacket_amount < 1) {
      app.showMsg('红包的赏金最小为1元');
      return;
    }
    if (!this.data.packet.redpacket_number || this.data.packet.redpacket_number < 1) {
      app.showMsg('红包的个数最小为1个');
      return;
    }

    var amount = util.roundFun(this.data.packet.redpacket_amount, 2);
    var number = util.roundFun(this.data.packet.redpacket_number, 0);
    this.setData({
      'packet.redpacket_amount': amount,
      'packet.redpacket_number': number
    });

    console.log(this.data.packet.redpacket_amount / this.data.packet.redpacket_number)
    if (this.data.packet.redpacket_amount < 50 && (this.data.packet.redpacket_amount / this.data.packet.redpacket_number) < 1) {
      app.showMsg('请保证红包的赏金人均不低于1元');
      return;
    }

    if (!this.data.titleIndex || this.data.titleIndex < 0) {
      app.showMsg('请选个主题先');
      return;
    }
    if (!this.data.levelIndex || this.data.levelIndex < 0) {
      app.showMsg('请选个难度先');
      return;
    }

    if (this.data.packet.redpacket_amount>2000){
      app.showMsg('您的红包太大了，消化不了');
      return;
    }

    if (!this.data.ignoreBalance && this.data.packet.redpacket_amount > this.data.balance) {
      app.showMsg('余额不足，请先充值');
      //TODO
      var fee = amount * 100 - this.data.balance * 100;
      fee = util.roundFun(fee, 0);
      this.preorder(fee);
      return;
    }

    this.setData({
      createBtnDisabled: true
    });

    var sessionid = app.globalData.jsessionid;
    wx.request({
      url: app.globalData.baseUrl + '/p1/redpacket_praise/create?jsessionid=' + sessionid,
      method: 'POST',
      header: {
        //'content-type': 'application/json' // 默认值
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        "redpacket_title": this.data.packet.redpacket_title[this.data.titleIndex],
        "redpacket_level": this.data.packet.redpacket_level[this.data.levelIndex],
        "redpacket_type": 3,
        "redpacket_amount": this.data.packet.redpacket_amount,
        "redpacket_number": this.data.packet.redpacket_number
      },
      success: result => {
        this.setData({
          createBtnDisabled: false,
          refresh: true
        });
        console.log(JSON.stringify(result.data));
        if (result.data && result.data.status == 0) {
          app.showMsg("创建成功");
          wx.navigateTo({
            url: '../praise/share/share?packetId=' + result.data.data.redpacket_id + "&type=3",
          })
        } else {
          app.showMsg(result.data.error);
          //重新初始化红包创建
          this.initPraisePacket();
        }
      }
    })
  },

  preorder: function (amount) {

    var sessionid = app.globalData.jsessionid;
    wx.request({
      url: app.globalData.baseUrl + '/api/packet/preorder?jsessionid=' + sessionid,
      method: 'POST',
      header: {
        //'content-type': 'application/json' // 默认值
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        amount: amount,
      },
      success: result => {
        console.log("payment=" + JSON.stringify(result.data));
        if (result.data && result.data.status == 0) {
          this.setData({
            refresh: false,
          })

          var payment = result.data.data.payment;
          wx.requestPayment({
            timeStamp: payment.timeStamp,
            nonceStr: payment.nonceStr,
            package: payment.package,
            signType: payment.signType,
            paySign: payment.sign,
            success: res => {
              console.log("payment res=" + JSON.stringify(res));
              if (res.errMsg == 'requestPayment:ok') {
                //支付成功
                this.payCheck(result.data.data.orderId);
              } else {
                //支付失败
              }
            },
            fail: res => {
              //系统错误
              console.log("payment res=" + JSON.stringify(res));
              if (res.errMsg == 'requestPayment:fail cancel') {
                app.showMsg("您取消了支付");
              }
            },
          });


        } else {
          app.showMsg(result.data.error);
        }
      }
    })
  },

  payCheck: function (orderId) {
    var counter = 5;
    var intervalId = setInterval(func => {
      if (counter < 1) {
        app.showMsg("正在到账中，请稍后查看")
        clearInterval(intervalId);
        return;
      }
      var sessionid = app.globalData.jsessionid;
      console.log("sessionid=" + sessionid + ", orderId=" + orderId);
      wx.request({
        url: app.globalData.baseUrl + '/api/packet/order/status?jsessionid=' + sessionid + "&orderId=" + orderId,
        success: res => {
          if (!res.data) {
            return;
          }
          if (res.data.data) {
            this.setData({
              ignoreBalance: true
            });
            this.createPraisePacket();
            this.setData({
              ignoreBalance: false
            });
            this.getAccount();
            clearInterval(intervalId);
          }
        }
      })
      counter--;
    }, 1000);
  },
})
