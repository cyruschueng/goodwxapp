//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    var that=this;
    logs.unshift(Date.now())
    this.login();
  },
  login: function () {
    var user = wx.getStorageSync('user');//登录过后，用户信息会缓存
    var fail = arguments[1] ? arguments[1] : function () { };//登录失败的回调
    if (!user) {
      wx.login({
        success: function (res) {
          var code = res.code;
          wx.request({
            url: 'https://www.tongke.cn/xdf/getWxOpenId',
            data: {
              code: res.code
            },
            success: function (res) {
              var openId = res.data.data.openid;
              wx.setStorageSync('openId', res.data.data.openid)
              console.log("请求成功了" + openId);
              //获取用户信息
              wx.getUserInfo({
                success: function (res) {
                  var userInfo = res.userInfo
                  var nickName = userInfo.nickName
                  var avatarUrl = userInfo.avatarUrl
                  var gender = userInfo.gender //性别 0：未知、1：男、2：女 
                  var province = userInfo.province
                  var city = userInfo.city
                  var country = userInfo.country
                  console.log(userInfo);
                  //获取用户信息成功 请求接口更新头像
                  wx.request({
                    //上线接口地址要是https测试可以使用http接口方式
                    url: 'https://www.tongke.cn/xdf/updateUserInfo',
                    data: {
                      openid: openId,
                      nickname: nickName,
                      avatarUrl: avatarUrl,
                      gender: gender,
                    },
                    method: 'GET',
                    header: {
                      //设置参数内容类型为x-www-form-urlencoded
                      'content-type': 'application/x-www-form-urlencoded',
                      'Accept': 'application/json'
                    },
                    success: function (res) {
                      console.log("更新信息成功" + res.data);
                    },
                    fail: function ({ errMsg }) {
                      console.log('request fail 更新信息失败', errMsg)
                    }
                  })
                },
                fail: function ({ errMsg }) {
                  console.log("获取用户信息失败", errMsg);
                  wx.showModal({
                    title: '提示',
                    content: '授权登录失败，部分功能将不能使用，是否重新登录？',
                    showCancel: true,
                    cancelText: "否",
                    confirmText: "是",
                    success: function (res) {
                      if (res.confirm) {
                        if (wx.openSetting) {// 当前微信的版本 ，是否支持openSetting
                          wx.openSetting({
                            success: function () {
                              //如果用户重新同意了授权登录
                              if (res.authSetting["scope.userInfo"]) { 
                                //获取用户信息
                                wx.getUserInfo({
                                  success: function (res) {
                                    var userInfo = res.userInfo
                                    var nickName = userInfo.nickName
                                    var avatarUrl = userInfo.avatarUrl
                                    var gender = userInfo.gender //性别 0：未知、1：男、2：女 
                                    var province = userInfo.province
                                    var city = userInfo.city
                                    var country = userInfo.country
                                    console.log(userInfo);
                                    //获取用户信息成功 请求接口更新头像
                                    wx.request({
                                      //上线接口地址要是https测试可以使用http接口方式
                                      url: 'https://www.tongke.cn/xdf/updateUserInfo',
                                      data: {
                                        openid: openId,
                                        nickname: nickName,
                                        avatarUrl: avatarUrl,
                                        gender: gender,
                                      },
                                      method: 'GET',
                                      header: {
                                        //设置参数内容类型为x-www-form-urlencoded
                                        'content-type': 'application/x-www-form-urlencoded',
                                        'Accept': 'application/json'
                                      },
                                      success: function (res) {
                                        console.log("更新信息成功" + res.data);
                                      },
                                      fail: function ({ errMsg }) {
                                        console.log('request fail 更新信息失败', errMsg)
                                      }
                                    })
                                  },
                                  fail: function ({ errMsg }) {
                                    console.log("获取用户信息失败", errMsg)
                                  }
                                })
                              }
                            }
                          })
                        }
                      } else {
                        //用户还是拒绝
                        fail()
                      }
                    }, fail: function () {
                      wx.showModal({
                        content: "授权登录失败，请重新授权",
                        confirmText: "确定",
                        cancelText: "取消"
                      })
                    }
                  });
                }
              })
            }, fail: function () {
              console.log("请求失败了");
            }
          })
        },
        fail: function () {
          console("登陆失败");
        }
      })
    }  
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登陆接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              debugger
              var userInfo = res.userInfo
              var nickName = userInfo.nickName
              var avatarUrl = userInfo.avatarUrl
              var gender = userInfo.gender //性别 0：未知、1：男、2：女 
              var province = userInfo.province
              var city = userInfo.city
              var country = userInfo.country
              console.log(userInfo);
              //获取用户信息成功 请求接口更新头像
              wx.request({
                //上线接口地址要是https测试可以使用http接口方式
                url: 'https://www.tongke.cn/xdf/updateUserInfo',
                data: {
                  openid: openId,
                  nickname: nickName,
                  avatarUrl: avatarUrl,
                  gender: gender,
                },
                method: 'GET',
                header: {
                  //设置参数内容类型为x-www-form-urlencoded
                  'content-type': 'application/x-www-form-urlencoded',
                  'Accept': 'application/json'
                },
                success: function (res) {
                  console.log("更新信息成功" + res.data);
                },
                fail: function ({ errMsg }) {
                  console.log('request fail 更新信息失败', errMsg)
                }
              })
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    openId:null
  },
  onHide() {
    wx.setStorage({
      key: 'kk',
      data: 'this is a test',
    })
  }
  /*
  根据自己需要修改下单时候的模板消息内容设置，可增加关闭订单、收货时候模板消息提醒；
  1、/pages/to-pay-order/index.js 中已添加关闭订单、商家发货后提醒消费者；
  2、/pages/order-details/index.js 中已添加用户确认收货后提供用户参与评价；评价后提醒消费者好评奖励积分已到账；
  3、请自行修改上面几处的模板消息ID，参数为您自己的变量设置即可。  
   */
    
})