// pages/charge/index.js
var app = getApp()
var utilMd5 = require('../../utils/md5.js');
var timestamp = new Date().getTime();
var user_id = app.globalData.user_id;
var token = app.globalData.token;
var openid = '';
var money = '';
Page({
  data:{
    inputValue: 0,
    // 复选框的value，此处预定义，然后循环渲染到页面
    itemsValue: [
      {
        checked: true,
        value: "0.04",
        color: "#ff6600",
        title: "充值￥200"
      },
      {
        checked: false,
        value: "0.03",
        color: "#ff6600",
        title: "充值￥100"
      },
      {
        checked: false,
        value: "0.02",
        color: "#ff6600",
        title: "充值￥50"
      },
      {
        checked: false,
        value: "0.01",
        color: "#ff6600",
        title: "充值￥10"
      }
    ]
  },
  // 勾选故障类型，获取类型值存入checkboxValue
  checkboxChange: function (e) {
    var that = this;
    console.log(e.detail.value);
    money = e.detail.value;
  },
// 页面加载
  onLoad:function(options){
    wx.setNavigationBarTitle({
      title: '充值'
    })
    // 获取本地数据-用户信息
    wx.getStorage({
      key: 'userInfo',
      // 能获取到则显示用户信息，并保持登录状态，不能就什么也不做
      success: (res) => {
        user_id = res.data.userInfo.user_id;
        token = res.data.userInfo.token;
      }
    });
    wx.getStorage({
      key: 'openidInfo',
      success: (res) => {
        openid = res.data.openidInfo.openid;
      }
    });
  },
// 存储输入的充值金额
  bindInput: function(res){
    this.setData({
      inputValue: res.detail.value
    })  
  },
// 充值
  charge: function(){
    // 必须输入大于0的数字
      var that = this;
      console.log(user_id)
      console.log(token)
      console.log(timestamp)
      console.log(utilMd5.hexMD5("user_id=" + user_id + "|timestamp=" + timestamp + "|token=" + token + "|owner_id=1008"))
      console.log(openid+"123")
      
      wx.request({
        url: 'https://qiyingli.cn/share/api_and/recharge',//改成你自己的链接 
        data: {
          'paysrc': '5',
          'openid': openid,
          'total_fee': money
        } ,
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          userid: user_id,
          ownerid: "1008",
          timestamp: timestamp,
          sign: utilMd5.hexMD5("user_id=" + user_id + "|timestamp=" + timestamp + "|token=" + token + "|owner_id=1008")
        },
        method: 'POST',
        success: function (res) {
          console.log(res.data);
          console.log('时间戳'+res.data.data.param.timeStamp);
          console.log('随机字符串' + res.data.data.param.nonceStr);
          console.log('package'+res.data.data.param.package);
          console.log('sign'+res.data.data.param.paySign);
          console.log('调起支付');
          wx.requestPayment({
            'timeStamp': res.data.data.param.timeStamp,
            'nonceStr': res.data.data.param.nonceStr,
            // 'package': "prepayid=" + res.data.data.param.prepayid,
            'package': res.data.data.param.package,
            'signType': 'MD5',
            'paySign': res.data.data.param.paySign,
            'success': function (res) {
              console.log('success');
              wx.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 2000
              });
            },
            'fail': function (res) {
              console.log('fail');
            },
            'complete': function (res) {
              console.log('complete');
            }
          });
        },
        fail: function (res) {
          console.log(res.data)
        }
      });
      // wx.request({

      //   url: 'https://api.angledog.net/share/api_and/recharge',
      //   method: 'POST',
      //   data: {
      //     'paysrc': '2',
      //     'total_fee': '0.10'
      //   },
      //   header: {
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //     userid: user_id,
      //     ownerid: "1008",
      //     timestamp: timestamp,
      //     sign: utilMd5.hexMD5("user_id=" + user_id + "|timestamp=" + timestamp + "|token=" + token + "|owner_id=1008")
      //   },

      //   success: function (res) {
      //     console.log(res)
      //     console.log('prepayid=' + res.data.data.param.prepayid)
      //     wx.requestPayment(
      //       {
      //         'appId': 'wx62158801420fb5d7',
      //         'timeStamp': res.data.data.param.timestamp,
      //         'nonceStr': res.data.data.param.noncestr,
      //         'package': 'prepayid='+res.data.data.param.prepayid,
      //         'signType': 'MD5',
      //         'paySign': res.data.data.param.sign,
      //         'success': function (res) {
      //           console.log(success)
      //          },
      //         'fail': function (res) {
      //           console.log("error res=")
      //           console.log(res)
      //          },
      //         'complete': function (res) { }
      //       }) 
      //     // console.log(res.data.status)
      //     // console.log(timestamp)
      //   },
      //   fail: function (res) {
      //     console.log("error res=")
      //     console.log(res.data)
      //   }
      // });
      // wx.redirectTo({
      //   url: '../wallet/index',
      //   success: function(res){
      //     wx.showToast({
      //       title: "充值成功",
      //       icon: "success",
      //       duration: 2000
      //     })
      //   }
      // })
  },
// 页面销毁，更新本地金额，（累加）
  onUnload:function(){
    wx.getStorage({
      key: 'overage',
      success: (res) => {
        wx.setStorage({
          key: 'overage',
          data: {
            overage: parseInt(this.data.inputValue) + parseInt(res.data.overage)
          }
        })
      },
      // 如果没有本地金额，则设置本地金额
      fail: (res) => {
        wx.setStorage({
          key: 'overage',
          data: {
            overage: parseInt(this.data.inputValue)
          },
        })
      }
    }) 
  }
})