// pages/toubu/toubu.js
var app = getApp()
var token;

Page({
  data:{
    width:null,
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    scrollTop : 0,
    scrollHeight:0
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    token = options.token;
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
              width:res.screenWidth,
              height:res.screenWidth * 1.8233,
              scrollHeight:res.windowHeight,
              id:token,
          });
      }
    })
  },
  bindDownLoad:function(e){
    // console.log("底部了");
    //   该方法绑定了页面滑动到底部的事件
      var that = this;
      
  },
  refresh:function(){

  },
  scroll:function(){
    
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
      title: "共享餐饮招聘机会",
      desc: "",
      path: '/pages/toubu/toubu?token=' + token

    }
  }
})