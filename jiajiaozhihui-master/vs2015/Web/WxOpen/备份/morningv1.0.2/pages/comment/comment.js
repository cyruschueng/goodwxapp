var app=getApp();
var common = require("../../utils/util.js");
var wxRequest = require("../../utils/wxRequest.js");
Page({
    data:{
        notes:"",
        habitId:0,
        tempFilePaths:[],
        valid:{
            length:false
        }
    },
    onLoad:function(options){
        var that=this;
        this.setData({
          habitId: options.habitid
        })
    },
    addDetail:function(e){
        var that=this;
        var url = app.globalData.host +'/api/card/detail';
        var data={
          habitid: this.data.habitId,
          sessionid: wx.getStorageSync("sessionId"),
          notes: e.detail.value.notes
        };
        wxRequest.postRequest(url,data).then(res=>{
          if (res.data.success == true) {
            var filePath = that.data.tempFilePaths[0];
            if (filePath == undefined || filePath == "") {
              wx.switchTab({
                url: "/pages/myhabit/myhabit"
              });
            } else {
              that.uploadFile(res.data.index);
            }
          } else if (res.data.success == false && res.data.sourse == "session") {
            that.errorHandle();
          }
        })
    },
    chooseImage:function(){
        var that=this;
        wx.chooseImage({
            count: 1,
            sizeType:['compressed'],
            sourceType:['album', 'camera'],
            success:function(res){
                console.log(res);
                that.setData({
                    tempFilePaths:res.tempFilePaths
                });
            },fail:function(){
                that.setData({
                    tempFilePath:[]
                });
            }
        });
    },
    uploadFile:function(id){
        var host=app.globalData.host;
        var  filePath=this.data.tempFilePaths[0];
        console.log("filePath:"+filePath);
        console.log("url:"+host+"/api/card/"+id+"/uploadfile");

        console.log("filePath:"+filePath);

        wx.uploadFile({
            url:host+"/api/card/"+id+"/uploadfile",
            filePath:filePath,
            header:{
                "content-type":"multipart/form-data"
            },
            name:"wxImg",
            success:function(res){
                console.log(res);
                wx.switchTab({
                    url:"/pages/myhabit/myhabit"
                });
            },fail:function(err){
                console.log(err);
            },complete:function(){
                
            }
        });
    },
    bindinput:function(e){
        if(common.trim(e.detail.value).length>0){
            this.setData({
                'valid.length':true
            })
        }else{
            this.setData({
                'valid.length':false
            })
        }
    },
    showToast: function () {
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 10000
      });
    },
    errorHandle: function () {
      wxApi.wxRedirectTo('/pages/error/error', { 'path': '/pages/comment/comment?habitid='+this.data.habitId, 'opentype': 'switchTab' });
    }
})