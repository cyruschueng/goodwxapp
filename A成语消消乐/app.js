//app.js
App({
  data:{
    kid:100,
    apiurl:'https://friend-guess.playonwechat.com/v1/'
  },
  onLaunch: function () {
    let that = this;
    that.data.kid = '100';
    wx.setStorageSync("kid",'100');
    // 音乐
    that.AppMusic = wx.createInnerAudioContext();
    that.AppMusic.autoplay = true;
    that.AppMusic.loop = true;
    that.AppMusic.src ='http://ovhvevt35.bkt.clouddn.com/chengyu/Various%20Artists%20-%20Give%20It%20Up.mp3';
    that.AppMusic.onPlay(() => {
      console.log('开始播放')
    })
    that.AppMusic.onEnded(() => {
      console.log('播放结束事件')
    })
    that.AppMusic.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
  getAuth(cb) {
    var that = this;
    const apiurl = 'https://friend-guess.playonwechat.com/';
    let kid = wx.getStorageSync("kid");
    wx.login({
      success: function (res) {
        console.log(res);
        if (res.code) {
          //照片墙发起网络请求
          wx.request({
            url: apiurl + 'api/auth?code=' + res.code + '&operator_id=' + that.data.kid,
            data: {
              code: res.code
            },
            success: function (res) {
              console.log(res, '授权成功');
              console.log("sign:", res.data.data.sign);
              wx.setStorageSync('sign', res.data.data.sign);
              wx.setStorageSync('mid', res.data.data.mid);
              var sign = res.data.data.sign;
              var openid = res.data.data.openid;
              wx.setStorageSync('openid', openid);
              wx.getUserInfo({
                success: function (res) {
                  console.log("保存信息");
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
                    url: apiurl + 'api/save-user-info?sign=' + sign + '&operator_id=' + kid,
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
                  // wx.showModal({
                  //   title: '警告',
                  //   content: '您点击了拒绝授权，将无法正常使用体验。请10分钟后再次点击授权，或者删除小程序重新进入。',
                  //   success: function (res) {
                  //     if (res.confirm) {
                  //       console.log('用户点击确定');
                  //     }
                  //   }
                  // })
                  wx.openSetting({
                    success: (res) => {
                      console.log(res);
                    }
                  })
                },
              })
            },
          })

        } else {
          console.log('获取用户登录态失败！' + res.errMsg);
        }
      }
    });
  },
  
})