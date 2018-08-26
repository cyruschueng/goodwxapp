//app.js
App({
  data:{
    nickName:"",
    dataUrl: "https://qncdn.playonwechat.com/music/hello.mp3",
    music_play: true,
    apiurl: 'https://friend-check.playonwechat.com/v1/',
  },
  onLaunch: function () {
    this.getUserInfo();

    let extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {};
    // extConfig.kid = 103;
    extConfig.kid = 103;
    console.log(extConfig.kid)
    this.data.operator_id = extConfig.kid;
    this.data.operator_id = 103;
    wx.setStorageSync("operator_id", 103);
  },
  onShow:function(){
    var that = this;
    var dataUrl = that.data.dataUrl;

    wx.onBackgroundAudioStop(function () {
      console.log("音乐停止，自动循环");
      wx.playBackgroundAudio({
        dataUrl: dataUrl
      })
    });

    wx.playBackgroundAudio({
      dataUrl: dataUrl
    })
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        console.log(res.brand)
        console.log(res.model)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        console.log(res.platform)
        wx.setStorageSync('brand', res.brand);
        wx.setStorageSync('model', res.model)
      }
    })
    

    wx.getSystemInfo({
      success: function (res) {
        // console.log("设备信息", res.platform)
        if (res.platform == "ios") {
          that.data.music_play = true;
          console.log("ios",that.data.music_play);
          that.data.platform = "ios";
        } else if (res.platform == "android") {
          that.data.music_play = false;
          that.data.platform = "android";
        }
      }
    })


  },
  getUserInfo:function(cb){
    
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
          console.log(res);
          if(res.code){
            wx.request({
              url: that.data.apiurl+'api/new-auth?code=' + res.code + '&operator_id=' + wx.getStorageSync("operator_id"),
              success: function(res){
                console.log("授权",res);
                var sign = res.data.data.sign;
                var uid = res.data.data.uid;
                var sharecode = res.data.data.sharecode;
                var set_number = res.data.data.set_number;

                that.data.sign = sign;
                that.data.uid = uid;
                that.data.sharecode = sharecode;
                wx.setStorageSync("sign", sign);
                wx.setStorageSync("uid", uid);
                wx.setStorageSync("set_number", set_number);
                var nickName = wx.getStorageSync("nickName");
                var avatarUrl = wx.getStorageSync("avatarUrl");
              
                typeof cb == "function" && cb(that.globalData.userInfo)
              }
            })
          }   
          
        }
      })
    }
  },
  globalData:{
    userInfo:null
  },
  
  onHide:function(){
    wx.pauseBackgroundAudio();
    wx.stopBackgroundAudio()
    //wx.clearStorageSync()
  }
})