//index.js
var util = require('../../utils/util.js');

//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isShowPop: false, // 是否显示pop
    packet: {},
    balance: 0,
    intervalId: null,
    refresh: true,
    createBtnDisabled: false,
    ignoreBalance: false,
  },
  linkToVideo: function () { // 跳转到换视频
    wx.navigateTo({
      url: '../video/video'
    })
  },
  linkToPraise: function () { // 跳转到赞美红包页
    wx.navigateTo({
      url: '../praise/praise'
    })
  },
  linkToRecord: function () { // 跳转到记录页面
    wx.navigateTo({
      url: '../record/record'
    })
  },
  linkToMoney: function () { // 跳转到提现页面
    wx.navigateTo({
      url: '../money/money'
    })
  },
  linkToMine: function () { // 跳转到我的页面
    console.log("userInfo=" + JSON.stringify(this.data.userInfo));


    wx.navigateTo({
      url: '../mine/mine'
    })
  },
  handleInput: function (e) {
    console.log(e.target.dataset.key + "," + e.detail.value)
    let obj = {};
    obj[e.target.dataset.key] = e.detail.value;
    this.setData(obj)
    console.log(JSON.stringify(this.data))
  },

  onShow: function () {
    if (!this.data.refresh) {
      this.setData({
        refresh: true
      })
      return;
    }

    wx.showLoading({
      title: '初始化中...',
      mask: true
    })

    var reqCounter = 0;
    var interval = setInterval(func => {
      reqCounter++;
      if (app.globalData.jsessionid) {
        this.getRedPacketVideo();
        this.getAccount();
        wx.hideLoading();
        clearInterval(interval);
      } else {
        if (reqCounter > 100) {
          clearInterval(interval);
          wx.navigateBack({
            delta: 0
          });
        }
      }
    }, 100);
    this.setData({
      intervalId: interval
    })
  },

  onHide: function () {
    clearInterval(this.data.intervalId);
  },

  onLoad: function () {

    wx.getSystemInfo({
      //获取系统信息成功，将系统窗口的宽高赋给页面的宽高
      success: res => {
        console.log("res=" + JSON.stringify(res));
      }
    })
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


  },
  getUserInfo: function (e) { // 获取用户信息
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  openRedPacket: function () {
    this.setData({
      isShowPop: false
    })
  },

  onPopclose: function () {
    this.setData({
      isShowPop: false,
      packet: null
    })
  },

  playVideo: function () {
    //TODO
    this.setData({
      refresh: false
    })
    wx.navigateTo({
      url: '/pages/video/preview/index?videoUrl=' + this.data.packet.video_url + "&imgUrl=" + this.data.packet.mg_url,
    })
  },

  getRedPacketVideo: function () {
    var sessionid = app.globalData.jsessionid;
    wx.request({
      url: app.globalData.baseUrl + '/p1/redpacket_video?jsessionid=' + sessionid,
      success: result => {
        console.log("getRedPacketVideo=" + JSON.stringify(result.data));
        if (!result.data || !result.data.data) {
          return;
        }

        if (result.data.data.redpacket_amount == 0) {
          result.data.data.redpacket_amount = null
        }
        if (result.data.data.redpacket_number == 0) {
          result.data.data.redpacket_number = null
        }

        result.data.data.redpacket_title = null

        if (result.data.status == 51000) {
          this.setData({
            packet: result.data.data,
            isShowPop: true
          })
        } else if (result.data.status == 50001) {
          this.setData({
            packet: result.data.data,
          })
        } else if (result.data.status == 50003) {
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

  //创建视频红包
  createVideoPacket: function () {

    if (this.data.packet.redpacket_title) {
      if (this.data.packet.redpacket_title.length > 10 || this.data.packet.redpacket_title.length < 2) {
        app.showMsg('祝福语的长度在2-10个之间');
        return;
      }
    }


    if (!this.data.packet.redpacket_amount || this.data.packet.redpacket_amount < 1) {
      app.showMsg('红包的赏金最小为1元');
      return;
    }

    if (this.data.packet.redpacket_amount > 2000) {
      app.showMsg('您的红包太大了，消化不了');
      return;
    }


    if (this.data.packet.redpacket_number < 1) {
      app.showMsg('请输入红包个数');
      return;
    }

    console.log(this.data.packet.redpacket_amount / this.data.packet.redpacket_amount)
    if (this.data.packet.redpacket_type == 1) {
      if (this.data.packet.redpacket_amount < 50 && (this.data.packet.redpacket_amount / this.data.packet.redpacket_number) < 1) {
        app.showMsg('请保证红包的赏金人均不低于1元');
        return;
      }
    }
    var amount = util.roundFun(this.data.packet.redpacket_amount, 2);
    var number = util.roundFun(this.data.packet.redpacket_number, 0);
    this.setData({
      'packet.redpacket_amount': amount,
      'packet.redpacket_number': number
    });

    if (!this.data.packet.video_id || this.data.packet.video_id == '') {
      app.showMsg('请选择个视频先');
      return;
    }


    if (this.data.packet.redpacket_type == 1) {
      if (!this.data.ignoreBalance && amount > this.data.balance) {
        app.showMsg('余额不足，请先充值');
        //TODO
        var fee = amount * 100 - this.data.balance * 100;
        fee = util.roundFun(fee, 0);
        console.log("余额不足=" + amount + "," + this.data.balance + "," + fee);
        this.preorder(fee);
        return;
      }
    }

    if (!this.data.packet.redpacket_type) {
      this.data.packet.redpacket_type = 1;
    }

    this.setData({
      createBtnDisabled: true
    });

    var sessionid = app.globalData.jsessionid;
    var redpacket_title = this.data.packet.redpacket_title;
    if (!redpacket_title) {
      redpacket_title = '恭喜发财新年快乐'
    }
    wx.request({
      url: app.globalData.baseUrl + '/p1/redpacket_video/create?jsessionid=' + sessionid,
      method: 'POST',
      header: {
        //'content-type': 'application/json' // 默认值
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        "redpacket_title": redpacket_title,
        "video_id": this.data.packet.video_id,
        "redpacket_type": this.data.packet.redpacket_type,
        "redpacket_amount": amount,
        "redpacket_number": number
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
            url: '../index/share/share?packetId=' + result.data.data.redpacket_id + "&type=" + this.data.packet.redpacket_type,
          })
        } else {
          app.showMsg(result.data.error);
          //重新初始化红包创建
          this.getRedPacketVideo();
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
    wx.showLoading({
      title: '正在检查充值结果...',
      mask: true
    })
    var counter = 5;
    var intervalId = setInterval(func => {
      if (counter < 1) {
        wx.hideLoading()
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
            })
            this.createVideoPacket();
            this.setData({
              ignoreBalance: false
            })
            this.getAccount();
            wx.hideLoading()
            clearInterval(intervalId);
          }
        }
      })
      counter--;
    }, 1000);


  },

})

