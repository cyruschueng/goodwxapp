// pages/chongzhiyajin/index.js
var app = getApp()
var utilMd5 = require('../../utils/md5.js');
var timestamp = new Date().getTime();
var user_id = app.globalData.user_id;
var token = app.globalData.token;
var openid = '';
var money = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // overage: 299.0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '押金充值'
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

  //响应去充值按钮事件
  toCharge: function () {
    
    var that = this;
    console.log(user_id)
    console.log(token)
    console.log(timestamp)
    console.log(utilMd5.hexMD5("user_id=" + user_id + "|timestamp=" + timestamp + "|token=" + token + "|owner_id=1008"))
    console.log(openid + "123")

    wx.request({
      url: 'https://qiyingli.cn/share/api_and/deposit',//改成你自己的链接 
      data: {
        'paysrc': '5',
        'openid': openid,
        'type': '1'
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        userid: user_id,
        ownerid: "1008",
        timestamp: timestamp,
        sign: utilMd5.hexMD5("user_id=" + user_id + "|timestamp=" + timestamp + "|token=" + token + "|owner_id=1008")
      },
      method: 'POST',
      success: function (res) {
        if (res.data.status == 0) {
          wx.redirectTo({
            url: '../login/index',
          })
        }
        console.log(res.data);
        console.log('时间戳' + res.data.data.param.timeStamp);
        console.log('随机字符串' + res.data.data.param.nonceStr);
        console.log('package' + res.data.data.param.package);
        console.log('sign' + res.data.data.param.paySign);
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

            wx.setStorage({
              key: 'userInfo',
              data: {
                userInfo: {
                  deposit_state: '1'
                }
              },
              success: function (res) {
                console.log("存储成功")
                wx.redirectTo({
                  url: '../chongzhichenggong/index'
                })
              }
            })
            
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})