// pages/wallet/index.js
var app = getApp()
var utilMd5 = require('../../utils/md5.js');
var timestamp = new Date().getTime();
var user_id = app.globalData.user_id;
var token = app.globalData.token;
Page({
  data:{
    overage: 0,
    ticket: 0
  },
// 页面加载
  onLoad:function(options){
     wx.setNavigationBarTitle({
       title: '我的钱包'
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
  },
// 页面加载完成，更新本地存储的overage
  onReady:function(){
    var that = this;
    console.log(user_id)
    console.log(token)
    console.log(timestamp)
    console.log(utilMd5.hexMD5("user_id=" + user_id + "|timestamp=" + timestamp + "|token=" + token + "|owner_id=1008"))
    wx.request({
      url: 'https://qiyingli.cn/share/api_and/userinfo',
      data: {},
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        userid: user_id,
        ownerid: "1008",
        timestamp: timestamp,
        sign: utilMd5.hexMD5("user_id=" + user_id + "|timestamp=" + timestamp + "|token=" + token + "|owner_id=1008")
      },
      success: function (res) {
        console.log(res)
        if(res.data.status == 0){
          wx.redirectTo({
            url: '../login/index',
          })
        }else{
          that.setData({
            overage: res.data.data.money,
            ticket: res.data.data.card_count
          })
        }
      },
      fail: function (res) {
        console.log("error res=")
        console.log(res.data)
      }
    })
  },
// 页面显示完成，获取本地存储的overage
  onShow:function(){
    // wx.getStorage({
    //   key: 'overage',
    //   success: (res) => {
    //     this.setData({
    //       overage: res.data.overage
    //     })
    //   }
    // }) 
  },
// 余额说明
  overageDesc: function(){
    wx.showModal({
      title: "",
      content: "充值余额0.00元+活动赠送余额0.00元",
      showCancel: false,
      confirmText: "我知道了",
    })
  },
// 跳转到充值页面
  movetoCharge: function(){
    // 关闭当前页面，跳转到指定页面，返回时将不会回到当前页面
    wx.redirectTo({
      url: '../charge/index'
    })
  },
// 用车券
  // showTicket: function(){
  //   wx.showModal({
  //     title: "",
  //     content: "你没有用车券了",
  //     showCancel: false,
  //     confirmText: "好吧",
  //   })
  // },
// 关于ofo
  showInvcode: function(){
    wx.showModal({
      title: "U程单车",
      content: "微信服务号：U程单车,网址: www.urides7.com,联系电话：4006587778",
      showCancel: false,
      confirmText: "好的"
    })
  }
})