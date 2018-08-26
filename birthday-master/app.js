//app.jsvar的作用于是函数作用于，而let是块级别（大括号括起来的内容）const声明的变量只可以在声明时赋值，不可随意修改，这是最大的特点。
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
    authSuccess: false
  },
  onLaunch: function (options) {
    const apiurl = 'https://friend-guess.playonwechat.com/';
    let that = this; 
    console.log("[onLaunch] 场景值:", options.scene);
    if (options.scene) {
      if (options.shareTicket){
        console.log("options.shareTicket", options.shareTicket);
        that.data.shareTicket = options.shareTicket;
        wx.setStorageSync('shareTicket', options.shareTicket); 
      }
      console.log(options.scene);
    }
    //调用API从本地缓存中获取数据
    let logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    let extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {};
    that.data.kid = extConfig.kid ? extConfig.kid : '123';//567
    wx.setStorageSync('kid', that.data.kid); 
    this.getAuth();
  },
  getAuth(cb) {
    const apiurl = 'https://friend-guess.playonwechat.com/';
    let that = this; 
    wx.login({
      success: function (res) {
        console.log(res);
        if (res.code) {
          //发起网络请求
          wx.request({
            url: apiurl + 'api/auth?code=' + res.code + '&operator_id=' + that.data.kid,
            data: {
              code: res.code
            },
            success: function (res) {
              console.log("成功");
              console.log(res);
              console.log("sign:", res.data.data.sign);
              that.data.sign = res.data.data.sign;
              that.data.loginData = res.data.data.sign;
              that.data.sharecode = res.data.data.sharecode;
              try {
                wx.setStorageSync('sign', res.data.data.sign);
                wx.setStorageSync('mid', res.data.data.mid);
                that.data.mobile = res.data.data.mobile;
                that.data.mid = res.data.data.mid;
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
                    that.data.username = nickName;
                    that.data.avatarUrl = avatarUrl;
                    userData = {
                      nickName: nickName,
                      avatarUrl: avatarUrl,
                      gender: gender,
                      province: province,
                      city: city,
                      country: country
                    };
                    wx.request({
                      url: apiurl + '/api/save-user-info?sign=' + that.data.sign + '&operator_id=' + that.data.kid,
                      method: 'POST',
                      data: {
                        info: userData
                      },
                      success: function (res) {
                        console.log("保存信息", res);
                        that.data.authSuccess = true
                        typeof cb == "function" && cb();
                      }
                    })
                  },
                  fail: function () {
                    console.log("用户拒绝授权");
                    wx.openSetting({
                      success: (res) => {
                        console.log(res);
                      }
                    })
                  },
                })
              } catch (e) {
                console.log("回话异常：" + e);

              }

            },
          })

        } else {
          console.log('获取用户登录态失败！' + res.errMsg);
        }
      }
    });
  },

  globalData: {
    userInfo: null,
    sign: ""
  }
})
