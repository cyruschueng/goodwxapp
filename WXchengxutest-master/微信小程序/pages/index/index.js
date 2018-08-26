//index.js
//获取应用实例
var app = getApp();
var utilMd5 = require('../../utils/md5.js');
var timestamp = new Date().getTime();
var user_id = "";
var token = "";
Page({
  data: {
    scale: 18,
    latitude: 0,
    longitude: 0
  },
// 页面加载
  onLoad: function (options) {

    wx.login({
      success: function (res) {
        if (res.code) {       //发起网络请求       
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx62158801420fb5d7&secret=5f787c3e09d2c83a536a17067972218b&js_code=' + res.code + '&grant_type=authorization_code',
            data: {
              code: res.code
            },
            success: function (response) {
              console.log(response); 
              console.log(response.data.openid);
              wx.setStorage({
                key: 'openidInfo',
                data: {
                  openidInfo: {
                    openid: response.data.openid
                  }
                },
                success: function (res) {
                  console.log("存储成功openid")
                }
              })
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });

    // 2.获取并设置当前位置经纬度
    wx.getLocation({
      type: "gcj02",// 坐标系类型
      success: (res) => {// es6 箭头函数，可以解绑当前作用域的this指向，使得下面的this可以绑定到Page对象
        this.setData({// 为data对象里定义的经纬度默认值设置成获取到的真实经纬度，这样就可以在地图上显示我们的真实位置
          longitude: res.longitude,
          latitude: res.latitude
        })
      }
    });

    // 3.设置地图控件的位置及大小，通过设备宽高定位
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          controls: [{
            id: 1,
            iconPath: '/images/location.png',
            position: {
              left: 20,
              top: res.windowHeight - 80,
              width: 50,
              height: 50
            },
            clickable: true
          },
          {
            id: 2,
            iconPath: '/images/use.png',
            position: {
              left: res.windowWidth/2 - 45,
              top: res.windowHeight - 100,
              width: 90,
              height: 90
            },
            clickable: true
          },
          {
            id: 3,
            iconPath: '/images/warn.png',
            position: {
              left: res.windowWidth - 70,
              top: res.windowHeight - 80,
              width: 50,
              height: 50
            },
            clickable: true
          },
          {
            id: 4,
            iconPath: '/images/marker.png',
            position: {
              left: res.windowWidth/2 - 11,
              top: res.windowHeight/2 - 45,
              width: 22,
              height: 45
            },
            clickable: true
          },
          {
            id: 5,
            iconPath: '/images/avatar.png',
            position: {
              left: res.windowWidth - 68,
              top: res.windowHeight - 155,
              width: 45,
              height: 45
            },
            clickable: true
          }]
        })
      }
    });

    // // 4.请求服务器，显示附近的单车，用marker标记
    // wx.request({
    //   url: 'https://www.easy-mock.com/mock/59098d007a878d73716e966f/ofodata/biyclePosition',
    //   data: {},
    //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   // header: {}, // 设置请求的 header
    //   success: (res) => {
    //       this.setData({
    //         markers: res.data.data
    //       })
    //   },
    //   fail: function(res) {
    //     // fail
    //   },
    //   complete: function(res) {
    //     // complete
    //   }
    // })
  },
// 页面显示
  onShow: function(){
    // 1.创建地图上下文，移动当前位置到地图中心
    this.mapCtx = wx.createMapContext("UcMap");
    this.movetoPosition()
  },
// 地图控件点击事件
  bindcontroltap: function(e){
    var that = this;
    // 判断点击的是哪个控件 e.controlId代表控件的id，在页面加载时的第3步设置的id
    switch(e.controlId){
      // 点击定位控件
      case 1: this.movetoPosition();
        break;
      // 点击立即用车，判断当前是否正在计费
      case 2:
        wx.getStorage({
          key: 'userInfo',
          // 能获取到则显示用户信息，并保持登录状态，不能就什么也不做
          success: (res) => {
            user_id = res.data.userInfo.user_id;
            token = res.data.userInfo.token;
            console.log(token)
          }
        });
      wx.getStorage({
        key: 'userInfo',
        success: function(res) {
          if (res.data.userInfo.deposit_state == '0'){
            wx.showModal({
            title: "提示！",
            content: '您还没有充值押金',
            confirmText: "充押金",
            cancelText: "取消",
            success: (res) => {
              if (res.confirm) {
                  // 跳转到押金充值页面
                  wx.navigateTo({
                    url: '../chongzhiyajin/index',
                    // url: '../login/index',
                  })
                } else {
                  console.log("back")
                  wx.navigateBack({
                    delta: 1 // 回退前 delta(默认为1) 页面
                  })
                }
              }
            })
          } else if (res.data.userInfo.check_idcard == '0'){
            wx.showModal({
              title: "提示！",
              content: '您还没有实名认证',
              confirmText: "去认证",
              cancelText: "取消",
              success: (res) => {
                if (res.confirm) {
                  // 跳转到实名认证页面
                  wx.navigateTo({
                    url: '../shimingrenzheng/index',
                    // url: '../login/index',
                  })
                } else {
                  console.log("back")
                  wx.navigateBack({
                    delta: 1 // 回退前 delta(默认为1) 页面
                  })
                }
              }
            })
          }else {
          // 没有在计费就扫码
            wx.request({
              url: 'https://qiyingli.cn/share/api_and/userinfo',
              data: {},
              header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                userid: user_id,
                ownerid: "1008",
                timestamp: timestamp,
                sign: utilMd5.hexMD5("user_id=" + user_id + "|timestamp=" + timestamp + "|token=" + token + "|owner_id=1008")
              },
              success: function (res) {
                console.log(res)
                //判断是否为登录状态
                if (res.data.status == 0) {
                  wx.navigateTo({
                    url: '../login/index',
                  })
                } else if (res.data.data.state == 1 || res.data.data.state == 2){
                  wx.navigateTo({
                    url: '../scanresult/index',
                  })
                }else {
                  //登录就扫码
                  wx.scanCode({
                    success: (res) => {
                      console.log(res)
                      console.log(user_id)
                      console.log(timestamp)
                      console.log(token)
                      console.log(utilMd5.hexMD5("user_id=" + user_id + "|timestamp=" + timestamp + "|token=" + token + "|owner_id=1008"))
                      wx.showLoading({
                        title: '开锁中',
                      })
                      wx.request({

                        url: 'https://qiyingli.cn/share/api_and/ride',
                        method: 'POST',
                        data: {
                          'key_code': res.result,
                          'lon': that.data.longitude,
                          'lat': that.data.latitude
                        },
                        header: {
                          'Content-Type': 'application/x-www-form-urlencoded',
                          userid: user_id,
                          ownerid: "1008",
                          timestamp: timestamp,
                          sign: utilMd5.hexMD5("user_id=" + user_id + "|timestamp=" + timestamp + "|token=" + token + "|owner_id=1008")
                        },
                        success: function (res) {
                          console.log(res)
                          if (res.data.status == 0) {
                            wx.hideLoading();
                            wx.navigateTo({
                              url: '../login/index',
                            })
                          } else {

                            wx.hideLoading();
                            wx.navigateTo({
                              url: '../scanresult/index',
                            })
                          }
                        },
                        fail: function (res) {
                          console.log("error res=")
                          console.log(res.data)
                        }
                      })
                    }
                  })
                }
              },
              fail: function (res) {
                console.log("error res=")
                console.log(res.data)
              }
            })
        // 当前已经在计费就回退到计费页  
            
          }
        },
        fail: function(res) {
          wx.navigateTo({
            url: '../my/index',
          })
        }
      })
        break;
      // 点击保障控件，跳转到报障页
      case 3: wx.navigateTo({
          url: '../shimingrenzheng/index'
        });
        break;
      // 点击头像控件，跳转到个人中心
      case 5: wx.navigateTo({
          url: '../my/index'
        });
        break; 
      default: break;
    }
  },
// 地图视野改变事件
  bindregionchange: function(e){
    // 拖动地图，获取附件单车位置
    if(e.type == "begin"){
      // wx.request({
      //   url: 'https://www.easy-mock.com/mock/59098d007a878d73716e966f/ofodata/biyclePosition',
      //   data: {},
      //   method: 'GET', 
      //   success: (res) => {
      //     this.setData({
      //       _markers: res.data.data
      //     })
      //   }
      // })
    // 停止拖动，显示单车位置
    }else if(e.type == "end"){
        this.setData({
          markers: this.data._markers
        })
    }
  },
// 地图标记点击事件，连接用户位置和点击的单车位置
  bindmarkertap: function(e){
    console.log(e);
    let _markers = this.data.markers;
    let markerId = e.markerId;
    let currMaker = _markers[markerId];
    this.setData({
      polyline: [{
        points: [{
          longitude: this.data.longitude,
          latitude: this.data.latitude
        }, {
          longitude: currMaker.longitude,
          latitude: currMaker.latitude
        }],
        color:"#FF0000DD",
        width: 1,
        dottedLine: true
      }],
      scale: 18
    })
  },
  createNonceStr: function () {
    return Math.random().toString(36).substr(2, 15)
  },
// 定位函数，移动位置到地图中心
  movetoPosition: function(){
    this.mapCtx.moveToLocation();
  }
})
