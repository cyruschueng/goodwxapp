// pages/result/result.js
var common = require('../../common.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    finish: false,//猜过的
    guess:false //猜中的
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    var sign = wx.getStorageSync('sign');
    var r_id = options.r_id;
    //var scene = options.scene;//默认参数
    //回调
    common.getSign(function () {
      var sign = wx.getStorageSync('sign');
    })
    that.setData({
      g_id: options.g_id,
      r_id: options.r_id,
      friend_mid:options.friend_mid
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
    var that = this;
    var sign = wx.getStorageSync('sign');
    var userInfo = wx.getStorageSync('userInfo');
    console.log(userInfo,"userInfo");
    that.setData({
      userInfo: userInfo
    })
    // 懂我排行榜
    wx.request({
      url: "https://friend-guess.playonwechat.com/guess/most-uns-me-rank?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        g_id: that.data.g_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("懂我排行榜:", res);
        console.log(res.data.data);
        that.setData({
          listAll:res.data.data
        })
      }
    })
    //排行榜第一名
    wx.request({
      url: "https://friend-guess.playonwechat.com/guess/most-uns-me-first?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        g_id: that.data.g_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("懂我排行榜第一名:", res);
        that.setData({
          firstList: res.data.data
        })
      }
    })
    //可以去猜的类型
     wx.request({
       url: "https://friend-guess.playonwechat.com/guess/wait-guess?sign=" + sign + '&operator_id=' + app.data.kid,
      data:{
        friend_mid: that.data.friend_mid
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("可以去猜的类型:", res);
        that.setData({
          askok:res.data.data
        })
      }
    })
    
     //更多我已猜过的
     wx.request({
       url: "https://friend-guess.playonwechat.com/guess/have-guess?sign=" + sign + '&operator_id=' + app.data.kid,
       data: {
         friend_mid: that.data.friend_mid
       },
       header: {
         'content-type': 'application/json'
       },
       method: "GET",
       success: function (res) {
         console.log("已猜过的:", res);
         that.setData({
            oldask:res.data.data
         })
       }
     })
    // 打败
    wx.request({
      url: "https://friend-guess.playonwechat.com/guess/beat-other?sign=" + sign + '&operator_id=' + app.data.kid,
      data:{
        r_id: that.data.r_id  //r_id chage g_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("打败:", res);
        that.setData({
          wing:res.data.data
        })
      }
    })
  },
  //查看猜对的答案
  seeque: function () {
    var sign = wx.getStorageSync('sign');
    var that = this;
    that.setData({
      guess: true
    })
    wx.request({
      url: "https://friend-guess.playonwechat.com/guess/get-right-detail?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        r_id: that.data.r_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("猜中的答案:", res);
        console.log(res.data.data);
        that.setData({
          wingque: res.data.data
        })
      }
    })
  },
  // 更多猜题目
  nextque: function (e) {
    var that = this;
    var g_id = e.currentTarget.dataset.g_id;
    // 答题
    wx.navigateTo({
      url: '../quesiton/quesiton?g_id=' + g_id + '&friend_mid=' + that.data.friend_mid
    })
  },
  //更多我已猜过的
  more:function(){
    var that = this;
    that.setData({
      finish:true
    })
  },
  closefinish: function () {
    var that = this;
    that.setData({
      finish: false
    })
  },
  closeguess:function(){
    var that = this;
    that.setData({
      guess: false
    })
  },
  //返回首页
  backhome:function(){
    wx.navigateTo({
      url: '../index/index'
    })
  },
  //炫耀成绩
  result:function(){
    var that = this;
    wx.navigateTo({
      url: '../wing/wing?r_id=' + that.data.r_id
    })
  },
  // 查看其它猜过的
  result1:function(e){
    var g_id = e.currentTarget.dataset.g_id;
    var r_id = e.currentTarget.dataset.r_id;
    var friend_mid = e.currentTarget.dataset.friend_mid;
    // console.log(g_id, r_id, friend_mid)
    this.setData({
     // finish: false
    })
    wx.navigateTo({
      url: '../result1/result1?r_id=' + r_id + '&g_id=' + g_id + '&friend_mid=' + friend_mid
    })
  }
  

})