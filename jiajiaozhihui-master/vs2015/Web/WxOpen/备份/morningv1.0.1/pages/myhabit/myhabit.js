var app=getApp();

var wxRequest = require("../../utils/wxRequest.js");
var wxApi = require("../../utils/wxApi.js");
var wxRequest = require("../../utils/wxRequest.js");

Page({
    data:{
        habits:[],
        refresh:false

    },
    gotoHabit:function(){
        wx.navigateTo({
            url:'/pages/habits/habits'
        });
    },
    onLoad:function(options){
      console.log("options");
      console.log(options);
      this.checkAndGroup();
      this.checkAndLoad();
      
    },
    onShow:function(){
        var refresh=this.data.refresh;
        console.log(refresh);
        if(refresh==false){
            this.setData({
                refresh:true
            })
        }else{
          this.checkAndLoad();
        }
    },
    init:function(){
        wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 10000
        });

        var that=this;
        var host = app.globalData.host;
        var url = host + '/api/habit/my/list';
        var data=JSON.stringify({
          sessionid: wx.getStorageSync("sessionId")
        });
        wxRequest.postRequest(url,data).then(res=>{
          if (res.data.success == false && res.data.sourse == "session"){
            wxApi.wxRedirectTo('/pages/error/error', { 'path': '/pages/myhabit/myhabit', 'opentype': 'switchTab' });
          }
          if (res.data.success == true){
            that.setData({
              habits:res.data.list
            })
          }
        }).finally(function (res) {
          console.log('finally~')
          wx.hideToast()
        });
    },
    checkAndLoad:function(){
      var that = this;
      if (app.check() == false) {
        app.login(function () {
          that.init();
        });
      } else {
        this.init();
      }
    },
    checkAndGroup:function(){
      var that = this;
      if (app.check() == false) {
        app.login(function () {
          that.shareModel();
        });
      } else {
        this.shareModel();
      }
    },
    shareModel:function(){
      var groupData = wx.getStorageSync("group");
      console.log("groupData");
      console.log(groupData);
      if (groupData){
        console.log("groupDataxxxxxxxxxx");
        wxApi.wxGetShareInfo(groupData.shareTicket).then(res => {
          var host = app.globalData.host;
          var url = host + '/api/habit/group/groupid';
          var data = JSON.stringify({
            encryptedData: res.encryptedData,
            iv: res.iv,
            sessionid: wx.getStorageSync('sessionId')
          });
          return wxRequest.postRequest(url, data);
        }).then(res => {
          console.log("myhabit groupdata");
          console.log(res);
          
        })
      }
    }
})
