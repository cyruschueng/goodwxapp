// pages/shimingrenzheng/index.js
var app = getApp()
var utilMd5 = require('../../utils/md5.js');
var timestamp = new Date().getTime();
var user_id = app.globalData.user_id;
var token = app.globalData.token;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 设置本页导航标题
    wx.setNavigationBarTitle({
      title: '实名认证'
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
  //获取姓名
  phone: function (e) {
    console.log(e.detail.value)
    var name = e.detail.value;
    this.setData({
      name: name
    })
  },
  //获取身份证
  blurTel: function (e) {
    console.log(e.detail.value)
    var idcard = e.detail.value;
    this.setData({
      idcard: idcard
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  //提交按钮
  listenerLogin: function(){
    var name = this.data.name;
    var idcard = this.data.idcard;
    wx.request({
      url: 'https://qiyingli.cn/share/api_and/authorize',
      method: 'POST',
      data: {
        'author_id': idcard,
        'author_name': name
      },
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
          wx.redirectTo({
            url: '../login/index',
          })
        }
        wx.setStorage({
          key: 'userInfo',
          data: {
            userInfo: {
              check_idcard: '1'
            }
          },
          success: function (res) {
            console.log("存储成功")
          }
        })
        wx.redirectTo({
          url: '../index/index',
        })
      },
      fail: function (res) {
        console.log("error res=")
        console.log(res.data)
      }
    })
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