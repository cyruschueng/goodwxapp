var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
var app = getApp();
var that;
var util = require('../../utils/util.js');
var grids = [
  { "name": "失物招领", "ico": "foundlost.png", "url": "../otherpages/foundlost/index" },
  { "name": "学号绑定 ", "ico": "home_bind.png", "url": "../login/login" },
  { "name": "成绩查询", "ico": "knowledge_icon.png", "url": "../otherpages/score/score" },
  { "name": "服务加盟", "ico": "home_join.png", "url": "joinad/joinad" },
  { "name": "打卡查询", "ico": "home_xiaopic.png", "url": "../otherpages/queryzaocao/queryzaocao" },
  { "name": "解除绑定", "ico": "home_unbind.png", "url":"../login/unBind/unBind"},
  { "name": "打开APP", "ico": "home_app.png", "url": "../otherpages/developmenting/developmenting" },
  { "name": "课表查询", "ico": "home_timetable.png", "url": "../timetable/timetable" },
];
Page({
  data: {
    userInfo: {},
    grids: grids,
  },
  onLoad: function () {
    wx.clearStorage()
    var that = this
    wx.showShareMenu({
      withShareTicket: true //要求小程序返回分享目标信息
    })
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      console.log(userInfo)
      //更新数据
      that.setData({
        userInfo: userInfo
      })
      
      //提交打开记录
      wx.request({
        url: getApp().data.openLogUrl,
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        method: "POST",
        data: {
          name: that.data.userInfo.nickName,
          city: that.data.userInfo.city,
          url: that.data.userInfo.avatarUrl,
          time: util.formatTime(new Date())
        },
        success: function (res) {
          console.log(res)

        }
      })
    })

  },
  autuLogin: function () {
    //common.showModal("App.js实现小程序访问则将数据写入系统User表，具体代码请查看App.js。")
  },
  onShow: function () {
    var that = this
    //获取基本信息
    wx.request({
      url: getApp().data.basicInfo,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        wx.setStorage({
          key: 'kaixueriqi',
          data: res.data[0].kaixueriqi.replace(/\s+/g, ''),
          success: function (s) {
            console.log('异步保存成功kaixueriqi:' + res.data[0].kaixueriqi.replace(/\s+/g, ''))
          }
        })
      }
    })
    //获取openid
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          console.log(res.code)
          Bmob.User.requestOpenId(res.code, {
            success: function (result) {
              wx.setStorage({
                key: 'openid',
                data: result.openid,
                success: function (s) {
                  console.log('异步保存成功openid:' + result.openid)
                }
              })
              console.log(result)
              //获取是否绑定信息
              wx.request({
                url: getApp().data.isBindInfoUrl,
                header: {
                  'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                method: "POST",
                data: {
                  openid: result.openid
                },
                success: function (res) {
                  console.log(res)
                  //缓存数据
                  wx.setStorage({
                    key: 'isBindFlag',
                    data: res.data.flag,
                    success: function (s) {
                      console.log('异步保存成功flag:' + res.data.flag)
                    }
                  })
                  if (res.data.flag == 1) {
                    wx.setStorage({
                      key: 'xh',
                      data: res.data.xh,
                      success: function (s) {
                        console.log('异步保存成功xh:' + res.data.xh)
                      }
                    })
                    wx.setStorage({
                      key: 'pwd',
                      data: res.data.pwd,
                      success: function (s) {
                        console.log('异步保存成功pwd:' + res.data.pwd)
                      }
                    })
                    wx.setStorage({
                      key: 'name',
                      data: res.data.name,
                      success: function (s) {
                        console.log('异步保存成功name:' + res.data.name)
                      }
                    })
                  }
                 
                }
              })
            },
            error: function (error) {
              // Show the error message somewhere
              console.log("Error: " + error.code + " " + error.message);
            }
          });
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
          common.showTip('获取用户登录态失败！', 'loading');
        }
      }
    });

  },
  onShareAppMessage: function (res) {
    var that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'FY掌上大学',
      path: 'pages/index/index',
      success: function (res) {
        // 转发成功
        console.log('成功', res)

        wx.getShareInfo({
          shareTicket: res.shareTickets,
          success(res) {

            var user = new Bmob.User();//开始注册用户
            var iv = res.iv;
            var encryptedData = res.encryptedData;

            wx.login({
              success: function (res) {
                user.loginWithWeapp(res.code).then(function (user) {
                  var sessionKey = user.get("authData").weapp.session_key;
                  console.log(user);
                  var data = {
                    "sessionKey": sessionKey,
                    "encryptedData": encryptedData,
                    "iv": iv
                  }
                  console.log(data);
                  Bmob.Cloud.run('getPhone', data, {
                    success: function (result) {
                      that.setData({
                        "shareInfo": result
                      });
                      console.log(result);
                    },
                    error: function (error) {
                    }
                  })

                });
              }
            });


          }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
})