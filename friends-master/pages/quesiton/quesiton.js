// pages/quesiton/quesiton.js
var common = require('../../common.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listQue: [],
    quesition:[],
    is_set: '',
    g_id: '',
    right:false,
    ok:false,
    no: false, 
    listask:[],
    rightnum:'',
    actives:false,
    quesitionIndex:1,
    score:0,//得分
    _score:''//分值
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    var sign = wx.getStorageSync('sign');
    var scene = options.scene;//这是一字符串
    var strs = new Array(); //定义一数组 
    strs = scene.split("_"); //字符分割 
    console.log(strs);
    console.log("friend_mid1:", strs[2]);
    console.log("g_id1:", strs[3]);
    var friend_mid = strs[2];
    var g_id = strs[3];
    that.setData({
      friend_mid: friend_mid,
      g_id : g_id
    })
    //回调
    common.getSign(function () {
      var sign = wx.getStorageSync('sign');
      that.setData({
        sign: sign
      })
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
    wx.showLoading({
      title: '加载中',
    });
    // 判断是否猜过朋友此类型的猜猜
    wx.request({
      url: "https://friend-guess.playonwechat.com/guess/is-guess?sign=" + sign + '&operator_id=' + app.data.kid,
      data:{
        g_id: that.data.g_id,
        friend_mid: that.data.friend_mid
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("是否猜过朋友此类型:", res);
        var status = res.data.status;
        if (status == 1){
          console.log("flag",res.data.data.flag);
          var flag = res.data.data.flag;
          if (flag){
            wx.navigateTo({
              url: '../result/result?r_id=' + res.data.data.flag + '&g_id=' + that.data.g_id + '&friend_mid=' + that.data.friend_mid
            })
          }else{
              // 未答过获取好友问题
              wx.request({
                url: "https://friend-guess.playonwechat.com/guess/get-friend-guess-detail?sign=" + sign + '&operator_id=' + app.data.kid,
                data: {
                  g_id: that.data.g_id,
                  friend_mid: that.data.friend_mid
                },
                header: {
                  'content-type': 'application/json'
                },
                method: "GET",
                success: function (res) {
                  var status = res.data.status;
                  console.log("问题列表:", status);
                  if (status == 0) {
                    console.log(res.data.msg);
                    that.setData({
                      quesition: false
                    })
                  } else {
                    console.log("问题列表:", res);
                    // console.log("每道题得分：",100 / res.data.data.length);
                    that.setData({
                      quesition: res.data.data,
                      _score: 100 / res.data.data.length
                    })
                  }
                }
              })
          }
        }else{
            console.log(res)
        }
      }
    })
    
   wx.hideLoading()
  },

  // 选择题目答案
  checked(e){
    let that = this;
    //console.log(e)
    let quesitionIndex = that.data.quesitionIndex;
    let quesition = that.data.quesition;
    let anwer = e.currentTarget.dataset.checked;
    let anwerIndex = e.currentTarget.dataset.index;
    let c_id = e.currentTarget.dataset.c_id;
    let listask = that.data.listask;
    let str = quesitionIndex + "|" + c_id;
    let _score = that.data._score; 
    let score = that.data.score;
    listask.push(str);
    that.setData({
      listask
    })
    console.log(listask)
    // anwer == quesition[quesitionIndex].choices[anwerIndex]
    if(anwer){
      score += _score;
      console.log("scoreall:", score);
       that.setData({
         right:true,
         score
       })
    }else{
      that.setData({
         actives:true
      })
      quesition[quesitionIndex-1].choices[anwerIndex].active = true;
      that.setData({
        quesition
      })
    }
    //console.log(anwer)
    if (quesitionIndex < that.data.quesition.length){
      setTimeout(function(){
        quesitionIndex += 1;
        that.setData({
          quesitionIndex,
          actives: false,
          right: false
        })
      },1000)
      
    }else{
      wx.showLoading({
        title: '加载中',
      });
      var form_id = "form_id" + Math.random();
      var point = that.data.score;//分值
      var sign = wx.getStorageSync('sign');
      var a = that.data.listask.join();
      var right = '"'+a +'"';
      console.log(right);
      // 提交答案
      wx.request({
        url: "https://friend-guess.playonwechat.com/guess/to-guess?sign=" + sign + '&operator_id=' + app.data.kid,
        data: {
          g_id: that.data.g_id,
          friend_mid: that.data.friend_mid,
          right: right,
          form_id: form_id,
          point: point
        },
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("提交答案:", res);
          var status = res.data.status;
          if (status==1){
          wx.navigateTo({
            url: '../result/result?g_id=' + that.data.g_id + '&friend_mid=' + that.data.friend_mid + '&right=' + that.data.listask + '&form_id=' + form_id + '&point=' + point + '&r_id=' + res.data.data.r_id
                })
          }else{
            wx.showToast({
              title: res.data.msg,
              icon: 'warn',
              duration: 800
            })
          }
        }
      })
      wx.hideLoading()
      
    }
    
  },

  onHide: function () {
  
  },

  onUnload: function () {
  
  },

  onPullDownRefresh: function () {
  
  },

  onReachBottom: function () {
  
  },

  onShareAppMessage: function () {
  
  }
})