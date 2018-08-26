var app = getApp();
var wxRequest = require("../../utils/wxRequest.js");
Page({
    data:{
        habits:[]
    },
    onLoad:function(){
        this.init();
    },
    init:function(){
        var that=this;
        var host=app.globalData.host;
        var url = host +'/api/habit/list';
        wxRequest.getRequest(url,null).then(res=>{
          if (res.data.success == true) {
            that.setData({
              habits: res.data.list
            })
          }
        })
    }
});