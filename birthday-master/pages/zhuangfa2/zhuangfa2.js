// pages/zhuangfa2/zhuangfa2.js
const app = getApp();
const common = require('../../common.js');
const apiurl = 'https://friend-guess.playonwechat.com/';
let sign = wx.getStorageSync('sign');
import tips from '../../utils/tips.js'
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
    let invite_mid = options.invite_mid;
    this.setData({
      invite_mid: invite_mid
    })
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
    let that = this;
    // 回调
    app.getAuth(function () {
      let userInfo = wx.getStorageSync('userInfo');
      let sign = wx.getStorageSync('sign');
      // wx.showLoading({
      //   title: '加载中',
      // });
      // 详情
      wx.request({
        url: apiurl + "birth/being-invited?sign=" + sign + '&operator_id=' + app.data.kid,
        data:{
          invite_mid: that.data.invite_mid
        },
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("转发详情:", res);
          var status = res.data.status;
          if (status == 1) {
            that.setData({
              birth_info: res.data.data.birth_info,
              birth_day: res.data.data.birth_info.birth_day,
              birth_month: res.data.data.birth_info.birth_month,
              birth_year: res.data.data.birth_info.birth_year,
              phone: res.data.data.birth_info.phone
            })
          } else {
            console.log(res.data.msg)
          }
        }
      })
    });
    wx.hideLoading()
  },
  // 手机号
  bindPhoneInput(e){
    this.setData({
      phone: e.detail.value
    })
  },
  // 生日
  bindDateChange: function (e) {
    console.log(e.detail.value);
    let date = e.detail.value;
    var strs = new Array(); //定义一数组 
    strs = date.split("-"); //字符分割 
    this.setData({
      birth_year: strs[0],
      birth_month: strs[1],
      birth_day: strs[2]
    })
  },
  // 确定告诉他
  sendShare(){
    let that = this;
    let sign = wx.getStorageSync('sign');
    if (!that.data.phone){
        tips.alert('手机号不能为空！')
    }
    if (!that.data.birth_day){
      tips.alert('生日不能为空！')
    }

    let birthday = that.data.birth_year + '-' + that.data.birth_month + '-' + that.data.birth_day
    wx.request({
      url: apiurl + "birth/make-friend?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        invite_mid: that.data.invite_mid,
        birthday: birthday,
        phone: that.data.phone
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("互相加好友:", res);
        var status = res.data.status;
        if (status == 1) {
          tips.success('已通知好友');
        } else {
          console.log(res.data.msg);
          tips.success(res.data.msg);
        }
      }
    })
  }
 
})