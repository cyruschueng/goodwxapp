var app = getApp();
var common = require("../../utils/util.js");
Page({
    data:{
        day:7,
        array: [7, 21, 56, 100,365],
        index:0,
        exist:false,
        btnName:"我要加入",
        refresh:false,
        habitId:0
    },
    onLoad:function(options){
        var that=this;

        this.setData({
          habitId: options.habitid
        })
        app.checkSessionId(function () {
          that.initData();
        })
    },
    bindPickerChange: function(e) {
        this.setData({
            index: e.detail.value
        })
    },
    initData:function(){
        var sessionId=wx.getStorageSync('sessionId');
        var host=app.globalData.host;
        var habitId=this.data.habitId;
        var that=this;
        wx.request({
            url:host+"/api/habit/my/info",
            method:"POST",
            data:JSON.stringify({
                habitid:habitId,
                sessionid:sessionId
            }),
            success:function(res){
                console.log(res);
                if(res.data.success==true){
                    console.log(res);
                    if(res.data.exist==true){
                        console.log(res);
                        that.setData({
                            exist:true,
                            btnName:"更新",
                            index:common.findArryIndex(that.data.array,res.data.value)
                        })
                    }
                }else if(res.data.success==false && res.data.sourse=="session"){
                    app.checkSessionId(function () {
                      that.initData();
                    });
                }
            }
        });
    },
    updateHabit:function(e){
        var sessionId=wx.getStorageSync('sessionId');
        var host=app.globalData.host;
        var habitId=this.data.habitId;
        var target=e.currentTarget.dataset.target;
        var that=this;
        console.log(e);
        wx.request({
            url:host+"/api/habit/my/set",
            method:"POST",
            data:JSON.stringify({
                habitid:habitId,
                sessionid:sessionId,
                target:target
            }),
            success:function(res){
                if(res.data.success==true){
                    that.setData({
                        exist:true,
                        btnName:"更新",
                        index:common.findArryIndex(that.data.array,target)
                    })
                }else if(res.data.success==false && res.data.sourse=="session"){
                    app.checkSessionId(function () {
                        that.initData();
                    });
                }
            }
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
            this.initData();

        }
    }
})
