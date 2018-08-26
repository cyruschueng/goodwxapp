var app = getApp();
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
      app.checkSessionId(function () {
        that.init();
      })
    },
    init:function(){
        var that=this;
        var host=app.globalData.host;
        var sessionid= wx.getStorageSync("sessionId");
        var habitid=this.data.habitId;
        wx.request({
            url:host+"/api/punchcard/today/"+habitid+"/"+sessionid,
            method:"GET",
            success:function(res){
                if(res.data.success==true && res.data.isPunch==true){
                    that.setData({
                        btn:1
                    });
                    that.setData({
                        info:{
                            habitTitle:res.data.habitTitle,
                            finishDay:res.data.finishDay
                        }
                    })
                    wx.setNavigationBarTitle({
                        title:res.data.habitTitle
                    })
                }else if(res.data.success==false && res.data.sourse=="session"){
                  app.checkSessionId(function(){
                    that.init();
                  })
                }
            }
        })        
    },
    punchCard:function(){
        var that=this;
        var sessionid= wx.getStorageSync("sessionId");
        var habitid=this.data.habitId;
        var host=app.globalData.host;
        wx.request({
            url:host+"/api/punchcard/today",
            method:"POST",
            data:JSON.stringify({sessionid:sessionid,habitid:habitid}),
            success:function(res){
                if(res.data.success==true){
                    that.setData({
                        btn:1
                    });
                }else if(res.data.success==false && res.data.sourse=="session"){
                  app.checkSessionId(function () {
                    that.init();
                  })
                }
            }
        })         
    },
    
    addComment:function(e){
        console.log(e);
        wx.navigateTo({
            url: '/pages/comment/comment?habitid='+this.data.habitId,
            fail:function(res){
                console.log("fail");
                console.log(res);
            },
            success:function(res){
                console.log("success");
                console.log(res);
            }
        })
    },
    onShareAppMessage:function(res){
        return{
            title:'我坚持'+this.data.info.habitTitle+'已经'+this.data.info.finishDay+'天',
            path:'/pages/detail/detail?habitid='+this.data.habitId,
            success:function(res){
                console.log(res);
            },fail:function(res){
                console.log(res);
        }
    }
  },
  onShow:function(){
        var refresh=this.data.refresh;
        console.log(refresh);
        if(refresh==false){
            this.setData({
                refresh:true
            })
        }else{
            this.exist(this.init);
        }
    },



    
    checkSession:function(cb){
        var userInfo=wx.getStorageSync('userInfo');
        console.log(userInfo);
        wx.checkSession({
            success:function(){
                if(userInfo=='' || wx.getStorageSync('sessionId')==''){
                    console.log("login....");
                    app.login(cb);
                }else{
                    typeof cb == "function" && cb()
                }
            },fail:function(){
                app.login();
            }
        })
    }
});