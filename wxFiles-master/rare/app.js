App({
  onLaunch: function () {
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  load: function (that) {
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          innerHeight: res.screenHeight,
          innerWidth: res.windowWidth
        })
      },
    })
  },
  url: 'https://www.medusachina.com/rare/',
  bgurl: 'https://www.medusachina.com/imgbg/rare/',
  getUserInfo: function () {
    // var appid = 'wx0172a9bd552efbd5';
    // var secret = 'ccbb86678dbfb310496b4df1d268c766';
    var that = this
    wx.login({
      success: function (res) {
        //获取js_code
        var code = res.code
        console.log('--- getUserInfo: wx.login code ---')
        console.log(code)
        //解析openid接口 
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxa75115dccbe8ecec&secret=193c497589ddb70f1953f685cc1199c9' + '&js_code=' + code + '&grant_type=authorization_code',
          method: 'POST',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          success: function (res) {
            console.log('--- getUserInfo: wx.login wx.request openid success ---')
            console.log(res)
            var openid = res.data.openid;
            that.globalData.openid = res.data.openid;
            //登录到服务器
            wx.request({
              url: that.url + 'WxUserL/sopenid',
              method: 'get',
              data: {
                openid: openid
              },
              method: 'POST',
              header: { 'content-type': 'application/x-www-form-urlencoded' },
              success: function (res) {
                console.log('--- getUserInfo: wx.login wx.request WxUserL/sopenid success ---')
                console.log(res)

                if (res.data.code == 0) {
                  wx.getUserInfo({
                    success: function (res) {
                      console.log('--- getUserInfo: wx.login wx.request WXUserLoginAdd wx.getUserInfo success ---')
                      console.log(res)
                      var userInfo = res.userInfo
                      //注册
                      wx.request({
                        url: that.url + 'WxUserL/WXUserLoginAdd',
                        method: 'post',
                        data: {
                          openid: openid,
                          nickname: res.userInfo.nickName,
                          avatarurl: res.userInfo.avatarUrl,
                          flag: 0,
                          isdelete: 0,
                          name: '0',
                          password: '0',
                          realname: '0',
                          integral:0 , 
                          countintegral:0,
                          usermsg:'test'
                        },
                        header: {
                          'content-type': 'application/x-www-form-urlencoded' 
                        },
                        success: function (res) {
                          console.log('--- getUserInfo: wx.login wx.request WXUserLoginAdd success ---')
                          console.log(res)
                          if (res.data.code == 100) {
                            wx.setStorageSync('openid', openid);
                            wx.setStorageSync('avatarurl', userInfo.avatarUrl);
                            wx.setStorageSync('nickname', userInfo.nickName);
                          } else {
                            wx.showToast({
                              title: '注册失败',
                              image: '/img/60.png',
                              duration: 2000
                            })
                          }

                        },
                        fail: function (res) {
                          console.log('--- getUserInfo: wx.login wx.request WXUserLoginAdd success ---')
                          console.log(res)
                          wx.showToast({
                            title: '注册请求超时',
                            image: '/img/60.png',
                            duration: 2000
                          })
                        }
                      })
                    },
                    fail: function (res) {
                      console.log('--- getUserInfo: wx.login wx.request WXUserLoginAdd wx.getUserInfo fail ---')
                      console.log(res)
                      wx.request({
                        url: that.url + 'WxUserL/WXUserLoginAdd',
                        method: 'get',
                        data: {
                          openid: openid,
                          nickname: 'rare用户',
                          avatarurl: 'def',
                          flag: 0,
                          isdelete: 0
                        },
                        header: {
                          'content-type': 'application/x-www-form-urlencoded' 
                        },
                        success: function (res) {
                          console.log('--- getUserInfo: wx.login wx.request WXUserLoginAdd success ---')
                          console.log(res)
                          if (res.data.code == 100) {
                            wx.setStorageSync('openid', openid);
                            wx.setStorageSync('avatarurl', userInfo.avatarUrl);
                            wx.setStorageSync('nickname', userInfo.nickName);
                            that.globalData.avatarUrl = res.data.rows.avatarurl
                            that.globalData.nickName = res.data.rows.nickname
                          } else {
                            wx.showToast({
                              title: '注册失败',
                              image: '/img/60.png',
                              duration: 2000
                            })
                          }

                        },
                      })
                    }
                  })
                } else {
                  console.log('--- getUserInfo: wx.login wx.request WxUserL/sopenid success code=100 ---')
                  console.log(res)
                  wx.setStorageSync('openid', res.data.rows.openid);
                  wx.setStorageSync('avatarurl', res.data.rows.avatarurl);
                  wx.setStorageSync('nickname', res.data.rows.nickname);
                  wx.setStorageSync('wxuserId', res.data.rows.wxuserId);
                  that.globalData.avatarUrl = res.data.rows.avatarurl
                  that.globalData.nickName = res.data.rows.nickname
                  
                }
                wx.request({
                  url: that.url + 'WxUserL/selectbyopenid',
                  data:{
                    openid: res.data.rows.openid
                  },
                  success: function (res) {
                    console.log(res)
                    that.globalData.userid = res.data.object.userid
                  }
                })
                wx.request({
                  url: that.url + 'WxUserL/wxselectin',
                  data: {
                    openid: res.data.rows.openid
                  },
                  success: function (res) {
                    console.log(res)
                    that.globalData.integral = res.data.object.integral
                    that.globalData.countintegral = res.data.object.countintegral
                  }
                })
              },
              fail: function (res) {
                console.log('--- getUserInfo: wx.login wx.request WxUserL/sopenid fail ---')
                console.log(res)
                wx.showToast({
                  title: '登录请求超时',
                  image: '/img/60.png',
                  duration: 2000
                })
              }
            })
          },
          fail: function (res) {
            console.log('--- getUserInfo: wx.login wx.request login fail ---')
            console.log(res)
            wx.showToast({
              title: '服务器请求超时',
              image: '/img/60.png',
              duration: 2000
            })
          }
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '服务器维护中...',
          image: '/img/60.png',
          duration: 2000
        })
      }
    })
    
  },
  globalData: {
    userInfo: null,
    openid:'',
    avatarUrl:'',
    nickName:'',
    integral:0,
    countintegral:0,
    lv1:1000,
    lv2:2500,
    lv3:5000
  }
})