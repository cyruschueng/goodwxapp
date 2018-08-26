//app.js
//const backgroundAudioManager = wx.getBackgroundAudioManager()
App({
  data: {
    loginData: null,
    sign: "",
    mobile: "",
    username: "",
    mid: "",
    sharecode: "",
    authStatic: false,
    loginStatic: false,
    authSuccess: false,
    dataUrl: "",
    music_play: true,
    apiurl:'https://friend-guess.playonwechat.com/v1/',
    apiurl1: 'https://friend-guess.playonwechat.com/',
    apiurl2: 'https://friend-guess.playonwechat.com/v2/',
    apiurl3: 'https://friend-guess.playonwechat.com/v3/'
  },
  onUnload: function () {
     wx.removeStorageSync('activity');
  },
  onLaunch: function () {
    let that = this;
    let extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {};
    that.data.kid = extConfig.kid ? extConfig.kid : '4321';
    //that.data.kid = 123; //123 464
    wx.setStorageSync('kid', that.data.kid); //that.data.kid
    this.getAuth();
  },

  onShow: function () {
    console.log("appshow");
    var that = this;
    var dataUrl = that.data.dataUrl;
    wx.onBackgroundAudioStop(function () {
      console.log("音乐停止，自动循环");
      wx.playBackgroundAudio({
        dataUrl: dataUrl
      })
    });
    wx.setStorageSync('music_play', that.data.music_play);
    if (that.data.music_play==true){
      wx.playBackgroundAudio({
        dataUrl: that.data.dataUrl
      })
    }else{
      wx.pauseBackgroundAudio();
    }

  },
  getAuth(cb) {
    // var that = this;
    const apiurl = 'https://friend-guess.playonwechat.com/';
    let kid = wx.getStorageSync("kid");
    wx.login({
      success: function (res) {
        console.log(res);
        if (res.code) {
          //发起网络请求
          wx.request({
            url: apiurl + 'api/auth?code=' + res.code + '&operator_id=' + kid,
            data: {
              code: res.code
            },
            success: function (res) {
              console.log(res);
              console.log("sign:", res.data.data.sign);
              var sign = res.data.data.sign;
              // try {
                wx.setStorageSync('sign', sign);
                wx.getUserInfo({
                  success: function (res) {
                    console.log("微信信息");
                    // console.log(res);
                    let userData = {};
                    let userInfo = res.userInfo
                    let nickName = userInfo.nickName
                    let avatarUrl = userInfo.avatarUrl
                    let gender = userInfo.gender //性别 0：未知、1：男、2：女
                    let province = userInfo.province
                    let city = userInfo.city
                    let country = userInfo.country;
                    wx.setStorageSync('userInfo', userInfo);//缓存存用户信息
                    userData = {
                      nickName: nickName,
                      avatarUrl: avatarUrl,
                      gender: gender,
                      province: province,
                      city: city,
                      country: country
                    };
                    wx.request({
                      url: apiurl + '/api/save-user-info?sign=' + sign + '&operator_id=' + kid,
                      method: 'POST',
                      data: {
                        info: userData
                      },
                      success: function (res) {
                        console.log("保存信息", res);
                        // that.data.authSuccess = true;
                        typeof cb == "function" && cb();
                      }
                    })
                  },
                  fail: function () {
                    console.log("用户拒绝授权");
                    wx.showModal({
                      title: '警告',
                      content: '您点击了拒绝授权，将无法正常使用体验。请10分钟后再次点击授权，或者删除小程序重新进入。',
                      success: function (res) {
                        if (res.confirm) {
                          console.log('用户点击确定');
                        }
                      }
                    })
                    wx.openSetting({
                      success: (res) => {
                        console.log(res);
                      }
                    })
                  },
                })
              // } catch (e) {
              //   console.log("回话异常：" + e);

              // }
             
            },
          })

        } else {
          console.log('获取用户登录态失败！' + res.errMsg);
        }
      }
    });
  },
  globalData: {
    baseUrl: 'https://friend-guess.playonwechat.com/'
  },
  // 音乐
  bindPlay: function () {
    var that = this;
    let music_play = app.data.music_play;
    console.log('music_play:', music_play);
    if (music_play == true) {
      wx.pauseBackgroundAudio();//暂停
      app.data.music_play = false;
      that.setData({
        music_play: false
      })
    } else {
      wx.playBackgroundAudio({ //播放
        dataUrl: app.data.dataUrl
      })
      app.data.music_play = true;
      that.setData({
        music_play: true
      })
    }
  },
  showLoading: function (title) {
    if (!title) {
      title = '正在加载图片中';
    }
    wx.showLoading({
      title: title
    });
  },
  hideLoading: function () {
    wx.hideLoading();
  },
  onHide: function () {
    wx.stopBackgroundAudio();
    console.log('stop music');
  }
  
})