// pages/scanresult/index.js
var app = getApp()
var utilMd5 = require('../../utils/md5.js');
var timestamp = new Date().getTime();
var user_id = app.globalData.user_id;
var token = app.globalData.token;
Page({
  data:{
    time: 9,
    bike_code: '',
    ride_time: 0,
    order_money: 0.0
  },
// 页面加载
  onLoad:function(options){
    wx.getStorage({
      key: 'userInfo',
      // 能获取到则显示用户信息，并保持登录状态，不能就什么也不做
      success: (res) => {
        user_id = res.data.userInfo.user_id;
        token = res.data.userInfo.token;
      }
    });
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    console.log(user_id)
    console.log(timestamp)
    console.log(token)
    console.log(utilMd5.hexMD5("user_id=" + user_id + "|timestamp=" + timestamp + "|token=" + token + "|owner_id=1008"))
    
    var si = setInterval(function () {
      //循环执行代码  
      wx.request({

        url: 'https://qiyingli.cn/share/api_and/ridestate',
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
          if (res.data.status == 0) {
            clearInterval(si)
            wx.redirectTo({
              url: '../login/index',
            })
          } else {
            if (res.data.data.ride_status == 1) {
              that.setData({
                bike_code: res.data.data.bike_code,
                ride_time: Math.ceil(res.data.data.ride_time/60),
                order_money: res.data.data.order_money
              })
            }
            if (res.data.data.ride_status == 2) {
              app.globalData.money = res.data.data.order_money;
              clearInterval(si)
              wx.redirectTo({
                url: '../qxresult/index',
              })
            }
          }
        },
        fail: function (res) {
          console.log("error res=")
          console.log(res.data)
        }
      })
    }, 5000)

    
  },
// 点击去首页报障
  moveToWarn: function(){
    clearInterval(this.timer)
    wx.redirectTo({
      url: '../index/index'
    })
  }
})