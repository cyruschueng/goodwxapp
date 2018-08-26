var app=getApp();

var wxRequest = require("../../utils/wxRequest.js");
var wxApi = require("../../utils/wxApi.js");

Page({
    data:{
        habits:[],
        refresh:false,
        userInfo:{},
        group:{
          state:''
        }
    },
    onLoad:function(options){
      

      var that=this;
      
      app.ready(function(){
        that.init();
        
        app.getUserInfo(function (userInfo) {
          that.setData({
            userInfo: userInfo
          })
        },null)
        
      })
      console.log("app.globalData.groupId"); 
      console.log(app.globalData.groupId); 
    },
    onShow:function(){
      var that=this;
        var refresh=this.data.refresh;
        console.log(refresh);
        if(refresh==false){
            this.setData({
                refresh:true
            })
        }else{
          app.checkSessionId(function(){
            that.init();
          },function(){
            that.errorHandle();
          });
        }
    },
    init:function(){
        var that=this;
        this.showToast();
        var url = app.globalData.host + '/api/habit/my/list';
        var data = JSON.stringify({
          sessionid: wx.getStorageSync("sessionId")
        });  
        wxRequest.postRequest(url,data).then(res=>{
          if (res.data.success == false && res.data.sourse == "session"){
            that.errorHandle();
          }
          if (res.data.success == true){
            that.setData({
              habits:res.data.list
            })
          }
        }).finally(function (res) {
          wx.hideToast()
        });
    },
    gotoHabit: function () {
      wx.navigateTo({
        url: '/pages/habits/habits'
      });
    },
    showToast:function(){
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 10000
      });
    },
    errorHandle: function () {
      wxApi.wxRedirectTo('/pages/error/error', { 'path': '/pages/myhabit/myhabit', 'opentype': 'switchTab' });
    }
    
})
