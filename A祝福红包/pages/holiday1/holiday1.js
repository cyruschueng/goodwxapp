//index.js
var UTIL = require('../../utils/util.js');
var GUID = require('../../utils/GUID.js');
var NLI = require('../../utils/NLI.js');

const appkey = require('../../config').appkey
const appsecret = require('../../config').appsecret
//微信小程序新录音接口，录出来的是aac或者mp3，这里要录成mp3
const mp3Recorder = wx.getRecorderManager()
const mp3RecoderOptions = {
  duration: 60000,
  sampleRate: 16000,
  numberOfChannels: 1,
  encodeBitRate: 48000,
  format: 'mp3',
  //frameSize: 50
}

var app = getApp()
Page({
  data: {
    isPlay: false,
    isSpeaking: false,
    animationDataA1: {},
    animationDataA2: {},
    animationDataB1: {},
    animationDataB2: {},
    showView: false,
    showView1: true,
    showView3: false,
    showView4: true,
    j: 1,//帧动画初始图片 
    currentAni: 1,
    aniTimer: null,
  },
  globalData: {
    returnMoney: "",
    tempFilePath: ""
  },
  //事件处理函数
  sendEnvelop: function () {
    wx.navigateTo({
      url: '../sendEnvelop/sendEnvelop'
    })
  },
  //音乐图片的切换
  toPause: function () {
    var _this = this;
    this.setData({
      showView3: true,
      showView4: false
    })
    wx.pauseBackgroundAudio()
  },

  toStart: function () {
    var _this = this;
    this.setData({
      showView3: false,
      showView4: true
    })
    wx.playBackgroundAudio()
  },

  //限制字符长度
  word_length: function (e) {
    var price = e.detail.value;
    //console.log(price)
    var arrPrice = price.split(".");
    if (e.detail.value > 1000) {
      price = 1000
      this.setData({
        tel: price
      })
      wx.showModal({
        title: '单笔最大金额为1000元',
        content: '请点击确定重新输入',
        showCancel: false,
        success: function (res) { },
      })
    }
    if (arrPrice[1] != null && arrPrice[1].length > 2) {
      price = Math.floor(price * 100) / 100;
    } else {
      var rgpoint = new RegExp('^\\d{1,5}(\\.\\d{0,2})?$', 'g');//判断用户输入的是否为小数点
      var rgpoint = rgpoint.exec(e.detail.value);
      if (!rgpoint) {
        if (e.detail.value.length > 5) {
          price = Math.floor(price / 10);
        } else {
          return ""
        }
      }
    }
    this.setData({
      tel: price
    })
  },
  //红包数量限制
  word_length2: function (e) {
    var price = e.detail.value;
    //console.log(price)
    var arrPrice = price.split(".");
    if (e.detail.value > 1000) {
      price = 1000
      this.setData({
        tel2: price
      })
      wx.showModal({
        title: '单笔最大数量为1000个',
        content: '请点击确定重新输入',
        showCancel: false,
        success: function (res) { },
      })
    }
    if (arrPrice[1] != null && arrPrice[1].length > 2) {
      price = Math.floor(price * 100) / 100;
    } else {
      var rgpoint = new RegExp('^\\d{1,5}(\\.\\d{0,2})?$', 'g');//判断用户输入的是否为小数点
      var rgpoint = rgpoint.exec(e.detail.value);
      if (!rgpoint) {
        if (e.detail.value.length > 5) {
          price = Math.floor(price / 10);
        } else {
          return ""
        }
      }
    }
    this.setData({
      tel2: price
    })
  },

  //获取input的值，判断生成条件
  formSubmit: function (e) {
    console.log(e.detail.value.input_money)
    var _this = this
    if (e.detail.value.input_money.length == 0 || e.detail.value.input_count.length == 0) {
      wx.showToast({
        title: '缺少必要条件',
        icon: "loading",
        duration: 1000,
      });
    }
    else if (e.detail.value.input_money < 0.01 || (e.detail.value.input_money / e.detail.value.input_count) < 0.01) {
      wx.showToast({
        title: '赏金最小0.01元',
        icon: "loading",
        duration: 1000,
      });
    }
    else if (e.detail.value.input_key.length > 20) {
      wx.showToast({
        title: '字数需小于20',
        icon: "loading",
        duration: 1000,
      });
    }
    else if (e.detail.value.input_count == 0) {
      wx.showToast({
        title: '数量不能为0',
        icon: "loading",
        duration: 1000,
      });
    }
    else {
      if (this.data.showView1) {
        //请求余额接口返回对比信息余额信息上传文字
        wx.request({
          url: 'https://www.mqtp8.cn/wishis/pay/payMoney', //余额接口
          method: 'POST',
          header: {
            'Content-Type': 'application/json'
          },
          data: {//这里写你要请求的参数
            openId: getApp().globalData.openId,
            input_money: e.detail.value.input_money,
          },
          success: function (res) {
            // console.log(res)
            var returnMoney = res.data.money
            getApp().globalData.returnMoney = res.data.money
            console.log(getApp().globalData.returnMoney)
            if (returnMoney <= 0) {
              var that = this
              wx.showModal({
                title: '确认操作',
                content: '是否请求余额支付',
                success: function (res) {
                  if (res.confirm) {
                    wx.request({
                      url: 'https://www.mqtp8.cn/wishis/pay/fasong',
                      data: {
                        openId: getApp().globalData.openId,
                        input_key: e.detail.value.input_key,
                        input_money: e.detail.value.input_money,
                        input_count: e.detail.value.input_count,
                        tid: 2,
                        type: 1
                      },
                      method: 'GET',
                      header: {
                        'Content-Type': 'application/json'
                      },
                      success: function (res) {
                        wx.showToast({
                          title: '支付成功',
                          icon: '',
                          duration: 1000,
                          mask: true,
                        })
                        // console.log(res.data.hid)
                        var hid = res.data.hid
                        _this.setData({
                          hid: res.data.hid
                        })
                        getApp().globalData.id = res.data.hid,
                          // console.log(getApp().globalData.id)
                          wx.redirectTo({
                            url: '../receiveDetails/receiveDetails?hid=' + hid + '&openid=' + getApp().globalData.openId
                          })
                      },
                    })
                  } else {
                    wx.showToast({
                      title: '取消支付',
                      icon: 'loading',
                      duration: 1000,
                      mask: true,
                    })
                  }
                },
              })
            } else {
              wx.showModal({
                title: '确认操作',
                content: '是否请求支付(已优先使用余额)',
                success: function (res) {
                  if (res.confirm) {
                    wx.request({
                      url: 'https://www.mqtp8.cn/wishes/zfpay.php',
                      data: {
                        openId: getApp().globalData.openId,
                        input_money: getApp().globalData.returnMoney,
                      },
                      method: 'GET',
                      header: {
                        'Content-Type': 'application/json'
                      },
                      success: function (res) {
                        // getApp().globalData.package = res.data.package;
                        // console.log(getApp().globalData.package)
                        console.log(res)
                        wx.requestPayment({
                          'appId': res.data.appId,
                          'timeStamp': res.data.timeStamp,
                          'nonceStr': res.data.nonceStr,
                          'package': res.data.package,
                          'signType': 'MD5',
                          'paySign': res.data.paySign,
                          success: function (res) {
                            wx.showToast({
                              title: '支付成功'
                            });
                            wx.request({
                              url: 'https://www.mqtp8.cn/wishis/pay/fasong',
                              data: {
                                openId: getApp().globalData.openId,
                                input_key: e.detail.value.input_key,
                                input_money: e.detail.value.input_money,
                                input_count: e.detail.value.input_count,
                                tid: 2,
                                type: 1
                                // prepay_id: getApp().globalData.package,
                              },
                              method: 'POST',
                              header: {
                                'Content-Type': 'application/json'
                              },
                              success: function (res) {
                                //  console.log(res.data.hid)
                                var hid = res.data.hid
                                _this.setData({
                                  hid: res.data.hid
                                })
                                getApp().globalData.id = res.data.hid,
                                  // console.log(getApp().globalData.id)
                                  wx.redirectTo({
                                    url: '../receiveDetails/receiveDetails?hid=' + hid + '&openid=' + getApp().globalData.openId
                                  })
                              }
                            })
                          },
                        });
                      }
                    })

                  } else {
                    wx.showToast({
                      title: '取消支付',
                      icon: 'loading',
                      duration: 1000,
                      mask: true,
                    })
                  }
                }
              })
            }
          },
        })
      } else {
        //请求余额接口返回对比信息余额信息语音上传
        wx.request({
          url: 'https://www.mqtp8.cn/wishis/pay/payMoney', //余额接口
          method: 'POST',
          header: {
            'Content-Type': 'application/json'
          },
          data: {//这里写你要请求的参数
            openId: getApp().globalData.openId,
            input_money: e.detail.value.input_money,
          },
          success: function (res) {
            // console.log(res)
            var returnMoney = res.data.money
            getApp().globalData.returnMoney = res.data.money
            //console.log(getApp().globalData.returnMoney)
            if (returnMoney <= 0) {
              var that = this
              wx.showModal({
                title: '确认操作',
                content: '是否请求余额支付',
                success: function (res) {
                  if (res.confirm) {
                    wx.request({
                      url: 'https://www.mqtp8.cn/wishis/pay/fasong',
                      data: {
                        openId: getApp().globalData.openId,
                        input_key: getApp().globalData.vurl,
                        input_money: e.detail.value.input_money,
                        input_count: e.detail.value.input_count,
                        tid: 2,
                        type: 2
                      },
                      method: 'GET',
                      header: {
                        'Content-Type': 'application/json'
                      },
                      success: function (res) {
                        wx.showToast({
                          title: '支付成功',
                          icon: '',
                          duration: 1000,
                          mask: true,
                        })
                        // console.log(res.data.hid)
                        var hid = res.data.hid
                        _this.setData({
                          hid: res.data.hid
                        })
                        getApp().globalData.id = res.data.hid,
                          // console.log(getApp().globalData.id)
                          wx.redirectTo({
                            url: '../receiveDetails/receiveDetails?hid=' + hid + '&openid=' + getApp().globalData.openId
                          })
                      },
                    })
                  } else {
                    wx.showToast({
                      title: '取消支付',
                      icon: 'loading',
                      duration: 1000,
                      mask: true,
                    })
                  }
                },
              })
            } else {
              wx.showModal({
                title: '确认操作',
                content: '是否请求支付(已优先使用余额)',
                success: function (res) {
                  if (res.confirm) {
                    wx.request({
                      url: 'https://www.mqtp8.cn/wishes/zfpay.php',
                      data: {
                        openId: getApp().globalData.openId,
                        input_money: getApp().globalData.returnMoney,
                      },
                      method: 'GET',
                      header: {
                        'Content-Type': 'application/json'
                      },
                      success: function (res) {
                        // getApp().globalData.package = res.data.package;
                        // console.log(getApp().globalData.package)
                        console.log(res)
                        wx.requestPayment({
                          'appId': res.data.appId,
                          'timeStamp': res.data.timeStamp,
                          'nonceStr': res.data.nonceStr,
                          'package': res.data.package,
                          'signType': 'MD5',
                          'paySign': res.data.paySign,
                          success: function (res) {
                            wx.showToast({
                              title: '支付成功'
                            });
                            wx.request({
                              url: 'https://www.mqtp8.cn/wishis/pay/fasong',
                              data: {
                                openId: getApp().globalData.openId,
                                input_key: getApp().globalData.vurl,
                                input_money: e.detail.value.input_money,
                                input_count: e.detail.value.input_count,
                                tid: 2,
                                type: 2
                                // prepay_id: getApp().globalData.package,
                              },
                              method: 'POST',
                              header: {
                                'Content-Type': 'application/json'
                              },
                              success: function (res) {
                                //  console.log(res.data.hid)
                                var hid = res.data.hid
                                _this.setData({
                                  hid: res.data.hid
                                })
                                getApp().globalData.id = res.data.hid,
                                  // console.log(getApp().globalData.id)
                                  wx.redirectTo({
                                    url: '../receiveDetails/receiveDetails?hid=' + hid + '&openid=' + getApp().globalData.openId
                                  })
                              }
                            })
                          },
                        });
                      }
                    })

                  } else {
                    wx.showToast({
                      title: '取消支付',
                      icon: 'loading',
                      duration: 1000,
                      mask: true,
                    })
                  }
                }
              })
            }
          },
        })
      }

    }
  },
  onLoad: function () {
    //请求音乐接口
    wx.request({
      url: 'https://www.mqtp8.cn/wishis/getmoney/music', //余额接口
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: {//这里写你要请求的参数
        id: 2,
      },
      success: function (res) {
        wx.playBackgroundAudio({
          dataUrl: res.data.music,
          title: '',
          coverImgUrl: ''
        })
      }
    })
    //请求余额接口数据
    wx.request({
      url: 'https://www.mqtp8.cn/wishis/pay/mycount', //余额接口
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: {//这里写你要请求的参数
        openId: getApp().globalData.openId,
      },
      success: function (res) {
        var res = res;
        that.setData({
          myCount: res.data.count.toFixed(2),
          return_num: res.data.num
        })
        getApp().globalData.myCount = res.data.count.toFixed(2)
        getApp().globalData.return_num = res.data.num
        console.log(getApp().globalData.return_num);
      },
    })
    var that = this;
    //onLoad中为录音接口注册两个回调函数，主要是onStop，拿到录音mp3文件的文件名（不用在意文件后辍是.dat还是.mp3，后辍不决定音频格式）
    mp3Recorder.onStart(() => {
      UTIL.log('mp3Recorder.onStart()...')
    })
    mp3Recorder.onStop((res) => {
      UTIL.log('mp3Recorder.onStop() ' + res)
      var tempFilePath = res.tempFilePath
      getApp().globalData.RTtempFilePath = res.tempFilePath;
      // var urls = "https://api.happycxz.com/wxapp/mp32asr";
      console.log('dsafasdfasdfasdfasdfasf:' + getApp().globalData.RTtempFilePath)
      processFileUploadForAsr(tempFilePath, this);
    })
    this.setData({
      name: app.globalData.nickName,
      imgUrl: app.globalData.avatarUrl,
    });
    var that = this;
    that.showAni();
    if (this.data.aniTimer == null) {
      this.data.timer = setInterval(function (obj) {
        that.showAni();
      }, 5200);
    }
  },

  touchdown: function () {
    //touchdown_mp3: function () {
    UTIL.log("mp3Recorder.start with" + mp3RecoderOptions)
    var _this = this;
    speaking.call(this);
    wx.pauseBackgroundAudio()
    this.setData({
      isSpeaking: true,
      showView3: true,
      showView4: false
    })
    mp3Recorder.start(mp3RecoderOptions);
  },
  touchup: function () {
    //touchup_mp3: function () {
    UTIL.log("mp3Recorder.stop")
    this.setData({
      isSpeaking: false,
      // isPlay:true
    })
    mp3Recorder.stop();
  },

  //语音播放
  // playVoice: function (e) {
  //   var id = e.currentTarget.dataset.openid;
  //   var vurl = e.currentTarget.dataset.vurl
  //   var _this = this;
  //   play.call(this);
  //   wx.playBackgroundAudio({
  //     dataUrl: e.currentTarget.dataset.vurl,
  //     success: function (res) {
  //       wx.onBackgroundAudioStop(
  //         function () {
  //           _this.setData({
  //             isPlay: false
  //           })
  //         }
  //       )
  //     },
  //   })
  //   this.setData({
  //     isPlay: id
  //   })
  // },



  //点击切换类
  word: function () {
    var that = this;
    that.setData({
      showView: true,
      showView1: false,
    })
  },
  voice: function () {
    var that = this;
    that.setData({
      showView: false,
      showView1: true,
    })
  },

  slideUp: function () {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: "linear",
    })

    this.animation = animation

    animation.translateY(-430).step();

    this.setData({
      animationData: animation.export()
    })
  },


  slideDown: function () {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: "linear",
    })

    this.animation = animation

    animation.translateY(430).step();

    this.setData({
      animationData: animation.export()
    })
  },


  showAni: function () {
    //console.log("showAni");

    var height = wx.getSystemInfoSync().windowHeight;
    var animation1 = wx.createAnimation({
      timingFunction: "linear",
    })

    //图1
    animation1.translateY(height * 2).step({ duration: 10000 });
    animation1.translateY(0).step({ duration: 0 });

    if (this.data.currentAni == 1) {
      this.setData({
        animationDataA1: animation1.export()
      })
    } else {
      this.setData({
        animationDataB1: animation1.export()
      })
    }

    //图2
    var animation2 = wx.createAnimation({
      timingFunction: "linear",
    })

    animation2.translateY(height * 2).step({ duration: 8000 });
    animation2.translateY(0).step({ duration: 0 });

    if (this.data.currentAni == 1) {
      this.setData({
        animationDataA2: animation2.export()
      })
    } else {
      this.setData({
        animationDataB2: animation2.export()
      })
    }

    var i = 1;
    if (this.data.currentAni == 1) {
      i = 2;
    } else {
      i = 1;
    }
    this.setData({
      currentAni: i
    })
  }
})

function processFileUploadForAsr(filePath, _this) {
  wx.uploadFile({
    url: 'https://www.mqtp8.cn/applet/getvoice/getvoice',
    filePath: filePath,
    name: 'file',
    success: function (res) {
      console.log(res.data)
      getApp().globalData.vurl = res.data;
    }
  })
}


//麦克风帧动画 
function speaking() {
  var _this = this;
  //话筒帧动画 
  var i = 1;
  this.timer = setInterval(function () {
    i++;
    i = i % 5;
    _this.setData({
      j: i
    })
  }, 200);
}