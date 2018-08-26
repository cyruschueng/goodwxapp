var app=getApp();
Page({
    data:{
        habits:[]

    },
    onLoad:function(){
        var that=this;
        app.checkSessionId(function () {
          that.init();
        })
    },
    init:function(){
        var that=this;
        var host=app.globalData.host;
        wx.request({
          url: host+'/api/habit/list',
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(res){
            // success
            console.log(res);
            if(res.data.success==true){
                that.setData({
                    habits:res.data.list
                })
            }else if(res.data.success==false && res.data.sourse=="session"){
              app.checkSessionId(function () {
                that.init();
              })
            }
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    }
});