var app = getApp();
var wxApi = require("../../utils/wxApi.js");
var wxRequest = require("../../utils/wxRequest.js");
Page({
    data:{
        // 打卡按钮状态 0:未按压 1：按压
        btn: 0,
        btnPress: false,
        habitId:0,
        refresh:false,
        info:{
            habitTitle:'',
            finishDay:1
        }
    },
    onLoad: function (options) {
      var that = this;
      wx.showShareMenu({
        withShareTicket: true
      })
      that.setData({
        habitId: options.habitid
      })
      app.ready(function(){
        that.init();
      })
    },
    onShow: function () {
      var that=this;
      var refresh = this.data.refresh;
      if (refresh == false) {
        this.setData({
          refresh: true
        })
      } else {
        app.checkSessionId(function () {
          that.init();
        }, function () {
          that.errorHandle();
        });
      }
    },
    init:function(){
        var that=this;
        this.showToast()
        var url = app.globalData.host + '/api/punchcard/today/' + this.data.habitId + '/' + wx.getStorageSync("sessionId")
        wxRequest.getRequest(url,null).then(res=>{
          that.checkRequesResult(res);
          if (res.data.success == true && res.data.isPunch == true) {
            that.setData({
              btn: 1
            });
            that.setData({
              info: {
                habitTitle: res.data.habitTitle,
                finishDay: res.data.finishDay
              }
            })
            wx.setNavigationBarTitle({
              title: res.data.habitTitle
            })
          }
        }).finally(()=>{
          wx.hideToast()
        })     
    },
    punchCard:function(){
        var that=this;
        var url = app.globalData.host +'/api/punchcard/today';
        var data = JSON.stringify({ sessionid: wx.getStorageSync("sessionId"), habitid: this.data.habitId });
        wxRequest.postRequest(url,data).then(res=>{
          that.checkRequesResult(res);
          if (res.data.success == true) {
            that.setData({
              btn: 1
            });
          }
        })       
    },
    
    addComment:function(e){
        console.log(e);
        wx.navigateTo({
            url: '/pages/comment/comment?habitid='+this.data.habitId,
            fail:function(res){
                
            },
            success:function(res){
               
            }
        })
    },
    onShareAppMessage:function(res){
        return{
            title:'我坚持'+this.data.info.habitTitle+'已经'+this.data.info.finishDay+'天',
            path:'/pages/detail/detail?habitid='+this.data.habitId,
            success:function(res){
                
            },fail:function(res){
                
        }
    }
  },
  errorHandle: function () {
    wxApi.wxRedirectTo('/pages/error/error', { 'path': '/pages/punchard/punchard?habitid'+this.data.habitId, 'opentype': 'navigateTo' });
  },
  checkRequesResult: function (result) {
    if (result.data.success == false && result.data.sourse == 'session') {
      this.errorHandle();
    }
  },
  showToast: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });
  },
});