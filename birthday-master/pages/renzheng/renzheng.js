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
    let sign = wx.getStorageSync('sign');
    wx.showLoading({
      title: '加载中',
    });
    //获取我的手机号码
    wx.request({
      url: apiurl + "birth/get-my-phone?sign=" + sign + '&operator_id=' + app.data.kid,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("获取我的手机号码:", res);
        var status = res.data.status;
        if (status == 1) {
            that.setData({
               phone:res.data.data
            })
        } else {
          console.log(res.data.msg);
        }
      }
    })
    wx.hideLoading()
  },
  // 验证码
  bindKeyCode(e){
    this.setData({
      _code: e.detail.value
    })
  },
  // 输入手机号
  bindKeyInput(e){
    let that = this;
    let sign = wx.getStorageSync('sign');
    wx.showLoading({
      title: '加载中',
    })
    that.setData({
      phone: e.detail.value
    })
    wx.request({
      url: apiurl + "birth/change-phone?sign=" + sign + '&operator_id=' + app.data.kid,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("修改手机号码:", res);
        var status = res.data.status;
        if (status == 1) {
          wx.setStorageSync('certification', true);
          
        } else {
          console.log(res.data.msg)
        }
      }
    })
    wx.hideLoading()
  },
  //获取验证码
  code(){
    let that = this;
    let sign = wx.getStorageSync('sign');
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: apiurl + "birth/auth-phone?sign=" + sign + '&operator_id=' + app.data.kid,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("获取验证码:", res);
        var status = res.data.status;
        if (status == 1) {
          tips.success('验证码已发送至您的手机！');
        } else {
          console.log(res.data.msg);
          tips.alert(res.data.msg);
          if (res.data.msg == "已认证") {
            wx.setStorageSync('certification', true);
          }
        }
      }
    })
    wx.hideLoading()
  },
  // 认证
  renzheng(){
    let that = this;
    let sign = wx.getStorageSync('sign');
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: apiurl + "birth/validate-auth-code?sign=" + sign + '&operator_id=' + app.data.kid,
      data:{
        code: that.data._code
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("认证验证码:", res);
        var status = res.data.status;
        if (status == 1) {
          tips.success('成功绑定手机号');
          wx.setStorageSync('certification', true);
          // 返回
          wx.navigateBack({
            url: '../my/my'
          })

        } else {
          console.log(res.data.msg);
          tips.alert(res.data.msg);
          if (res.data.msg == "已认证"){
            wx.setStorageSync('certification', true);
          }
        }
      }
    })
    wx.hideLoading()
  }
  
  
})