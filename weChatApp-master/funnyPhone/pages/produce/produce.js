// pages/produce/produce.js
const { Field, extend } = require('../../zanui-weapp/dist/index');
var  recorderManager = "" ;
var upload = require("../../utils/upload.js");
const app = getApp();
var weixin = {}

// var app = getApp() 
var utils = require('../../utils/util.js')
var api = require('../../api.js')
// var upload = require('../../../../utils/upload.js')
var Zan = require('../../zanui/index');
var weixin = {}
var user={}
var addType

Page(extend({}, Field, {
  // 输入框内容更改时触发
  handleZanFieldChange({ componentId, detail }) {
    /*
     * componentId 即为在模板中传入的 componentId
     * 用于在一个页面上使用多个 tab 时，进行区分
     * detail 即输入框中的内容
     */
    /*
     * 处理函数可以直接 return 一个字符串，将替换输入框的内容。
     */
  },
  // 输入框聚焦时触发
  handleZanFieldFocus({ componentId, detail }) { },
  // 输入框失焦时触发
  handleZanFieldBlur({ componentId, detail }) { },


  /**
   * 页面的初始数据
   */
  data: {
    startTape:false,
    onTape:true,
    tapeMessage:"开始录音",
    workInfo:{},
    tempFilePath:'',
    weixin:"",
    limitTime:"",
    time:"0:00"

  },

 // onLoad: function (options) {
 //    addType = options.addType;
 //  },
   onLoad: function (options) {
    // addType = options.addType;
    
    var that = this;
     wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          var image = res.userInfo.avatarUrl;
          var name = res.userInfo.nickName;
          var workInfo = {
            image:image,
            name:name
          }
         wx.setStorageSync("weixin", workInfo);
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            workInfo:workInfo,
          })
        }
    })
  },
  onShow: function (options) {
    
      var that = this
      weixin  = wx.getStorageSync('weixin');
      if(weixin){
        console.log("weixin")
        console.log(weixin)
        var image = weixin.image;
        var name = weixin.name;
        var workInfo ={"image":image,"name":name};
        that.setData({
            workInfo:workInfo
        })
      }
    // console.log("options")
    // console.log(options)
  },

afterchoose: function (localPics) {
        var that = this
        // for (var i=0;i<localPics.length;i++){
            var workInfo={"image":'http://icons.maiyizhi.cn/uploading.png',"name":''}
        // }

        that.setData({
            workInfo:workInfo
        });
        that.setData({ disabled: true });
        wx.setStorageSync("weixin", workInfo);
        that.startUpload(localPics);

    },
    startUpload: function (localPics) {

        var that = this;
        if(localPics.length) {

            upload.uploadSingleB({path: localPics[0], state: 1}, function (pic) {

                if(pic){
                   
                    var workInfo2 = {"image":pic.url+"?imageView2/1/w/150/h/150","name":''}
                    localPics = localPics.splice(1, localPics.length)
                    console.log("workInfo")
                    console.log(workInfo2)
                    that.setData({
                        workInfo:workInfo2
                    });
                    wx.setStorageSync("weixin", workInfo2);

                    that.onUploadComplete(localPics);
                    if (!localPics.length) {
                        that.setData({disabled: false});
                    }
                }else{
                    that.showZanToast('上传失败，请稍后再试呢');
                }
            });
        }
    },
    onUploadComplete: function (localPics) {
       
        if(localPics.length){
            this.startUpload(localPics);
        }
    },

  chooseImage: function (e) {
        var that = this;
        // this.getSetting();
        wx.showActionSheet({
            itemList: ['选择我自己','选择系统人物','上传图片','随机'],
            success: function(res) {
                if(res.tapIndex==0){
                    wx.getUserInfo({
                        success: res => {
                          app.globalData.userInfo = res.userInfo;
                          var image = res.userInfo.avatarUrl;
                          var name = res.userInfo.nickName;
                          var workInfo = {
                            image:image,
                            name:name
                          }
                          that.setData({
                            userInfo: res.userInfo,
                            hasUserInfo: true,
                            workInfo:workInfo,
                          })
                           wx.setStorageSync("weixin", workInfo);
                        }
                    })
                }else if(res.tapIndex==1){
                    wx.navigateTo({
                        url: "/pages/selectUser/selectUser?from=weixin-qunliao"
                    })
                }else if(res.tapIndex==2){
                    wx.chooseImage({
                        sizeType: ['original', 'compressed'],
                        sourceType: ['album', 'camera'],
                        count:10,
                        success: function (res) {
                         
                          console.log(res.tempFilePaths)
                            that.afterchoose(res.tempFilePaths)
                        }
                    })
                }else if(res.tapIndex==3){

                    // wx.showNavigationBarLoading();
                    wx.showToast({
                        title: 'Loading……',
                        duration:2000,
                        icon: 'loading'
                    })
                    api.random(function(res) {
                        console.log(res)
                        console.log(1)
                        var _user = {"image":res.user.avatar,"name":res.user.name}
                        var workInfo=_user;

                        // wx.setStorageSync('temp_jietu_select_user', _user);

                        that.setData({
                            workInfo: workInfo
                        })
                        wx.setStorageSync("weixin", _user);
                        wx.hideToast()
                        // wx.hideNavigationBarLoading();
                    });
                }
            },
            fail: function(res) {
            }
        })
    },


 startTape(){
  var that =this;
  
  if(!wx.getRecorderManager){
    wx.showToast({
      title: '微信版本过低',
      icon: 'success',
      duration: 1000
    })
    console.log("微信版本过低")
    return;
  }
  recorderManager = wx.getRecorderManager();
   recorderManager.start({
      duration: 60000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'mp3',
      frameSize: 50
   });
  recorderManager.onStart(() => {
    console.log('recorder start')
    that.setData({
        startTape:!that.data.startTape,
        tapeMessage:"00:00",
        limitTime:"(60s)"
      });

    var number = 0;
    that.tapeTimer = setInterval(function(){
        number++;
        console.log(number)
        var time;
        var minute = Math.floor(number/60);
        var second = number%60;
        console.log(second)
        if(second<10){
          time = "0"+minute+":"+"0"+second;
          that.setData({
            tapeMessage:time
          })
          console.log(time)
        }else if(second>=10){
          time = "0"+minute+":"+second;
          that.setData({
            tapeMessage:time
          })
        }
    },1000)

  })
   
   

   },
 
 onTape(){
  var that = this;
  if(this.data.tapeMessage!="正在录音"){

      recorderManager.stop();
      recorderManager.onStop((res) => {
        clearInterval(that.tapeTimer);
        that.setData({
          onTape:false,
          
        })
        console.log('recorder stop', res)
        const { tempFilePath } = res
        wx.showLoading({
          title: '上传中',
        })

        
        upload.uploadVideo(res,function(result){
          console.log("result")
          console.log(result.url)
          setTimeout(function(){
            wx.hideLoading();
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 500
            })
          },500)

          that.setData({
            tempFilePath:result.url
          })
        })

      },function(){
        console.log("fail")
      })

    this.setData({
      onTape:false,
      
    })

  }
  
 },
 goPreview(){
  var tempFilePath = this.data.tempFilePath;
  var workInfo = this.data.workInfo;
  console.log(112)
  console.log(workInfo)
  var image = workInfo.image;
  var name = workInfo.name;
  // var workInfo = JSON.stringify(this.data.workInfo);
  // var workInfo = encodeURIComponent(this.data.workInfo);
  var url='../preview/preview?name='+name +'&'+'image=' + image +'&' + 'tempFilePath='+ tempFilePath
  console.log("url")
  console.log(url)
     wx.navigateTo({
      url: url  
    })
},
 goResult(){
    wx.navigateTo({
      url: '../result/result'
    })
 },


  /**
   * 用户点击右上角分享
   */
 
   onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }

    var tempFilePath = this.data.tempFilePath;
    var workInfo = this.data.workInfo;
    var image = workInfo.image;
    var name = workInfo.name;

    return {
      title: '',
      path: 'pages/calling/calling?name='+name +'&'+'image=' + image +'&' + 'tempFilePath='+ tempFilePath,
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },

  cancel(){
      var that = this;
      that.setData({
        startTape:false,
        onTape:true,
        tapeMessage:"开始录音",
      })
   },

getSetting(){
  wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      },
      fail(){
        return
      }
    })
},
writeComplete(e){
  // console.log("detail")
  // console.log(e.detail)
  var that = this
  var workInfo = that.data.workInfo
  // var newWorkInfo = e.detail.value
  var newWorkInfo ={image:workInfo.image,name:e.detail.value}
  that.setData({
    workInfo:newWorkInfo
  })
  wx.setStorageSync("weixin", workInfo);
  // console.log(this.data.workInfo)
}

}));

