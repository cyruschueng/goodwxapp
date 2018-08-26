//index.js
//获取应用实例
var common = require('../../common.js');
const app = getApp()
var sign = wx.getStorageSync("sign");
Page({
  data: {
    popup1: false,
    popup2: false,
    userInfo: {},
    hasUserInfo: false,
    listQue:[],
    is_set:'',
    g_id:'',
    nowTitle:''//最新title好友
  },
  //事件处理函数
  newFriend: function() {
    var that = this;
    that.setData({
      popup1: true
    })
  },
  friendsAsk: function (e) {
    console.log(e);
    var r_id = e.currentTarget.dataset.r_id;
    console.log(r_id);
    var that = this;
    that.setData({
      popup2: true
    })
    wx.request({
      url: "https://friend-guess.playonwechat.com/guess/get-right-detail?sign=" + sign + '&operator_id=' + app.data.kid,
      data:{
        r_id: r_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("猜对的答案:", res);
        that.setData({
          friendsAsk: res.data.data,
        })
      }
    })
  },
  closenewFriend:function(){
    var that = this;
    that.setData({
      popup1: false
    })
  },
  closeonlyFriend: function () {
    var that = this;
    that.setData({
      popup2: false
    })
  },
  // 时间
  whattime:function(e){
    console.log(e);
    var that = this;
    var inx = e.currentTarget.dataset.index;
    var tips = 'tips' +inx;
    that.setData({
      tips : true
    })
  },
  onLoad: function () {
    var that = this;
    var sign = wx.getStorageSync('sign');
    var userInfo = wx.getStorageSync('userInfo');
    that.setData({
        sign: sign,
        userInfo: userInfo
    })
    //回调
    common.getSign(function () {
      var sign = wx.getStorageSync('sign');
     // console.log('commonsign:', sign);
      that.setData({
        sign: sign
      })
    })
  },
  onShow:function(){
      var that = this;
      var sign = wx.getStorageSync('sign');
      var userInfo = wx.getStorageSync('userInfo');
      that.setData({
        userInfo: userInfo
      })
      var g_id = "";
      console.log("sign:", sign);
      wx.showLoading({
        title: '加载中',
      });
      // 问题列表
      wx.request({
        url: "https://friend-guess.playonwechat.com/guess/get-guess-setting?sign=" + sign + '&operator_id=' + app.data.kid,
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("我的列表:",res);
          var g_id = res.data.data[0].g_id;
          // 最新懂我好友
          wx.request({
            url: "https://friend-guess.playonwechat.com/guess/most-uns-me?sign=" + sign + '&operator_id=' + app.data.kid,
            data: {
              g_id: g_id
            },
            header: {
              'content-type': 'application/json'
            },
            method: "GET",
            success: function (res) {
              console.log("最新好友:", res);
              that.setData({
                listNew: res.data.data
              })
            }
          })
          that.setData({
            listQue: res.data.data,
            nowTitle: res.data.data[0].title
          })
         }
      })
     
      // 最近访问
      wx.request({
        url: "https://friend-guess.playonwechat.com/guess/my-visitors?sign=" + sign + '&operator_id=' + app.data.kid,
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("最近访问:", res);
          that.setData({
            nearest: res.data.data,
          })
        }
      })
     wx.hideLoading()
  },
  //切换排行榜最新懂我好友
  newfriends:function(e){
    wx.showLoading({
      title: '加载中',
    });
    var that = this;
    var _g_id = e.target.dataset.id;
    var friend_content = e.target.dataset.friend_content;
    that.setData({
      nowTitle: e.target.dataset.friend_content
    })
    wx.request({
      url: "https://friend-guess.playonwechat.com/guess/most-uns-me?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        g_id: _g_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("最新好友:", res);
        that.setData({
          listNew: res.data.data,
          popup1: false
        })
      }
    })
    wx.hideLoading()
  },
  shareque:function(e){
    var g_id = e.currentTarget.dataset.id;
    console.log("e", g_id);
    wx.navigateTo({
      url: '../goShare/goShare?g_id=' + g_id
    })
  },
  
  //本人设置或编辑
  tapKeyWorld: function (e) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    var g_id = e.currentTarget.dataset.id;
    var title = e.currentTarget.dataset.id;
    
    var have_set_answer = false;

    for (var i in that.data.listQue)
    {
      if (g_id == that.data.listQue[i].g_id)
      {
        have_set_answer = that.data.listQue[i].is_set;
      }
    }

    wx.navigateTo({
      url: '../setting/setting?g_id=' + g_id + '&title=' + title + '&is_set=' + have_set_answer
    })

    console.log("g_id:", g_id);
    
    wx.hideLoading()
  },
  //猜中详情
  informList:function(e){

  }
})
