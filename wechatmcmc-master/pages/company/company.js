// pages/company/company.js
var app=getApp()

var token;
var title;
var des;
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
  data:{
    info:{},
    map:{},
    zhiwei:{},
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    var app = getApp()
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
   
    // 页面初始化 options为页面跳转所带来的参数
    token = options.token
    qqmapsdk = new QQMapWX({
      key: 'A22BZ-WBDRU-FAWVY-BG2AK-TC5CK-DHBZV'
        });
    // 加载数据
    wx.showToast({
        title: '数据加载中…',
        icon: 'loading',
        duration: 10000
    });
    // 获取数据
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=company', //真实的接口地址
      data: {
        'token':token,
      },
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
          that.setData({
            info: res.data,
            zhiwei:res.data.zhiwei
          })
          title = res.data.title;
          des = res.data.gongsijieshao;

          qqmapsdk.geocoder({
            address: res.data.dizhi,
            success: function(res) {
                // console.log(res);
                 that.setData({
                  map: res.result.location,
                })
            },
            fail: function(res) {
                // console.log(res);
            },
            complete: function(res) {
            }
        });

          // 隐藏提示
          wx.hideToast()
      },
      // 接口调用失败
      fail:function(){

      },
      complete:function(){
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  // 分享
  onShareAppMessage: function () {
    return {
      title: "只为餐饮人提供机会",
      desc: "",
      path: '/pages/company/company?token='+token

    }
  }
})