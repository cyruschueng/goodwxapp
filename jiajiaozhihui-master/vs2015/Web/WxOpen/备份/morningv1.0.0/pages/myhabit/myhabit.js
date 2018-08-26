var app=getApp();
var wxRequest = require("../../utils/wxRequest.js");
var wxApi = require("../../utils/wxApi.js");
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
        var that=this;
        app.checkSessionId(function(){
          that.load();
        });
    },
    onShow:function(){
        var refresh=this.data.refresh;
        console.log(refresh);
        if(refresh==false){
            this.setData({
                refresh:true
            })
        }else{
            var that=this;
            app.checkSessionId(function(){
              that.load();
            });
        }
    },
    load:function(){
        var that=this;
        var host=app.globalData.host;
        var sessionid= wx.getStorageSync("sessionId");
        var data=JSON.stringify({
            sessionid:sessionid
        });
        wx.request({
          url: host+'/api/habit/my/list',
          data: data,
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
            console.log(res);
            if(res.data.success==true){
                that.setData({
                    habits:res.data.list
                })
            } else if (res.data.success == false && res.data.sourse == "session") {
                app.checkSessionId(function () {
                  that.load();
                });
            }
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complet
          }
        })
    }
})