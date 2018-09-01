 //index.js 
//获取应用实例 
var app = getApp()
var UTIL = require('../../utils/util.js');
var GUID = require('../../utils/GUID.js');
var NLI = require('../../utils/NLI.js');
const appkey = require('../../config').appkey
const appsecret = require('../../config').appsecret
//弹幕定时器
var timer;
var pageSelf = undefined;
var doommList = [];
class Doomm {
  constructor() {
    this.text = UTIL.getRandomItem(getApp().globalData.news);
    this.top = Math.ceil(Math.random() * 40);
    this.time = Math.ceil(Math.random() * 8 + 6);
    this.color = getRandomColor();
    this.display = true;
    let that = this;
    setTimeout(function () {
        doommList.splice(doommList.indexOf(that), 1);
        doommList.push(new Doomm());
        pageSelf.setData({
          doommData: doommList
        })
      }, this.time * 1000)
  }
}
function getRandomColor() {
  let rgb = []
  for (let i = 0; i< 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({
  data: {
    doommData: [],
    returnMoney:""
    // voices: [],//音频数组 
  },
  initDoomm: function () {
    doommList.push(new Doomm());
    doommList.push(new Doomm());
    doommList.push(new Doomm());
    this.setData({
      doommData: doommList
    })
  },
  globalData: {
    count: '',
  },
  onLoad: function (res) {
    pageSelf = this;
    this.initDoomm();
    this.setData({
      name: app.globalData.nickName,
      imgUrl: app.globalData.avatarUrl,
    });
    //上传登录信息至服务器
    wx.request({
      url: 'https://www.mqtp8.cn/applet/onlogin/userData',
      method: 'POST',
      data: {
        openId: getApp().globalData.openId,
        nickName: getApp().globalData.nickName,
        avatarUrl: getApp().globalData.avatarUrl,
        city: getApp().globalData.city,
        country: getApp().globalData.country,
        gender: getApp().globalData.gender,
        language: getApp().globalData.language,
        province: getApp().globalData.province,
      },
      success: function (res) {
        //console.log("返回成功的数据:" + res.data) //返回的会是对象，可以用JSON转字符串打印出来方便查看数据  
        // console.log("返回成功的数据:" + JSON.stringify(res.data)) //这样就可以愉快的看到后台的数据啦  
      },
    })
  },

  
  //点击跳转到我的记录
  MyRecord: function () {
    wx.navigateTo({
      url: '../MyRecord/MyRecord'
    })
  }, 
  //点击跳转到余额提现
  ReturnMoney: function () {
    wx.navigateTo({
      url: '../ReturnMoney/ReturnMoney'
    })
  },
  //点击跳转到排行榜
  list: function () {
    wx.navigateTo({
      url: '../list/list'
    })
  },
  //点击跳转到常见问题
  NormalProblem: function () {
    wx.navigateTo({
      url: '../NormalProblem/NormalProblem'
    })
  },

  check: function (e) {  
    var vul= e. detail.value;
    var regLowerCase = new RegExp('[a-z]', 'g');//判断用户输入的是否为小写字母
    var regCapitalLetter = new RegExp('[A-Z]', 'g');//判断用户输入的是否为大写字母
    var regNum = new RegExp('[0-9]', 'g');//判断用户输入的是否为数字
    var regchar = new RegExp('^[\u4E00-\u9FFF]+$', 'g');//判断用户输入的是否为中文
    var rsLowerCase = regLowerCase.exec(e.detail.value);
    var rsCapitalLetter = regCapitalLetter.exec(e.detail.value);
    var rsNum = regNum.exec(e.detail.value);
    var regchar = regchar.exec(e.detail.value);
    if (rsLowerCase) {
      return ""
    } else if (rsCapitalLetter) {
      return ""
    } else if (rsNum) {
      return ""
    }
    else if (!regchar) {
      return ""
    } else {
      this.setData({
        result: vul
      })
    }
  },
  
  word_length:function(e){
    var price  = e.detail.value;
    var arrPrice = price.split(".");
    if (e.detail.value > 500) {
      price = 500
      this.setData({
        tel: price
      })
      wx.showModal({
        title: '单笔赏金最大为500元',
        content: '请点击确定重新输入',
        showCancel: false,
        success: function (res) {

        },
      })
    }
    if (arrPrice[1] != null && arrPrice[1].length > 2) {
      price = Math.floor(price * 100) / 100;
    }else{
      var rgpoint = new RegExp('^\\d{1,5}(\\.\\d{0,2})?$', 'g');//判断用户输入的是否为小数点
      var rgpoint = rgpoint.exec(e.detail.value);
      if(!rgpoint) { 
        if (e.detail.value.length > 5){
          price = Math.floor(price / 10);
        }else{
          return ""
        }        
} 
    } 
    this.setData({
      tel: price
    })
        
  },

  count_length: function (e) {
    var price = e.detail.value;
    if (e.detail.value > 1000) {
      price = 1000
      this.setData({
        value: price
      })
      wx.showModal({
        title: '红包数量最大为1000个',
        content: '请点击确定重新输入',
        showCancel: false,
        success: function (res) {
        },
      })
    }
  },
  //获取input的值，判断生成条件
  formSubmit: function (e) {
    // wx.setClipboardData({
    //   data: "XNagur60A5",
    //   success: function (res) {
    //     wx.getClipboardData({
    //       success: function (res) {
    //       }
    //     })
    //   }
    // })
    var _this = this
    if (e.detail.value.input_key.length == 0 || e.detail.value.input_money.length == 0 || e.detail.value.input_count.length == 0) {
      wx.showToast({
        title: '缺少必要条件',
        icon:"loading",
        duration: 1000,
      });
    }
    else if (e.detail.value.input_money < 0.01 || (e.detail.value.input_money / e.detail.value.input_count)<0.01){
      wx.showToast({
        title:'赏金最小0.01元',
        icon: "loading",
        duration: 1000,
      });
    }
    else if (e.detail.value.input_key.length > 10) {
      wx.showToast({
        title: '字数需小于10',
        icon: "loading",
        duration: 1000,
      });
    }
    else if (e.detail.value.input_count == 0) {
      wx.showToast({
        title: '数量不能为0',
        icon: "loading",
        duration:1000,
      });
    }
    else{  
      //请求余额接口返回对比信息余额信息
      wx.request({
        url: 'https://www.mqtp8.cn/applet/pay/payMoney', //余额接口
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
          // console.log(getApp().globalData.returnMoney)
          if (returnMoney <= 0) {
            var that = this
            wx.showModal({
              title: '确认操作',
              content: '是否请求余额支付',
              success: function (res) {
                if (res.confirm) {
                  wx.request({
                    url: 'https://www.mqtp8.cn/applet/pay/fasong',
                    data: {
                      openId: getApp().globalData.openId,
                      input_key: e.detail.value.input_key,
                      input_money: e.detail.value.input_money,
                      input_count: e.detail.value.input_count,
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
                        url: '../receiveMoney/receiveMoney'
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
                    url: 'https://www.mqtp8.cn/appletpay/pay.php',
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
                            url: 'https://www.mqtp8.cn/applet/pay/fasong',
                            data: {
                              openId: getApp().globalData.openId,
                              input_key: e.detail.value.input_key,
                              input_money: e.detail.value.input_money,
                              input_count: e.detail.value.input_count,
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
                              url: '../receiveMoney/receiveMoney'
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
}, 
})
