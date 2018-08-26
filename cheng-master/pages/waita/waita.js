// pages/wait/wait.js
var app = getApp();
var util = require('../../utils/util.js');
import tips from '../../utils/tips.js';
var socketOpen = false;
var socketMsgQueue = [];
Page({
  data: {
    userInfo: wx.getStorageSync('userInfo'),
    socketOpen: false,
    otherImg: 'http://iph.href.lu/80x80',
    otherName: '未知'
  },
  onLoad: function (options) {
    var that = this;
    console.log('options:', options);
    that.setData({
      room_id: options.room_id,
      otherName: options.otherName,
      otherImg: options.otherImg,
      houseImg: options.otherImg,
      houseName:options.otherName,
    })
    wx.setStorageSync('otherName', options.otherName);
    wx.setStorageSync('otherImg', options.otherImg);
    app.getAuth(function () { 
      // 加好友
      wx.request({
        url: app.data.apiurl + "guessipk/friend?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
        data: {
          friend_mid: that.data.room_id,
          guess_type: '	idiom',
        },
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log('加好友成功：',res)
          let status = res.data.status;
          if (status==1){
              console.log('加好友成功！')
          }
        }
      })
    })
  },
  onReady: function () {

  },
  onShow: function () {
    if (wx.openBluetoothAdapter) {
      wx.openBluetoothAdapter()
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
    let that = this;
    that.setData({
      userInfo: wx.getStorageSync('userInfo'),
    });
    // 请求登录密匙连接到socket
    app.getAuth(function () {
        wx.request({
          url: app.data.apiurl + "guessipk/go-socket?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
          data: {
            guess_type: '	idiom'
          },
          header: {
            'content-type': 'application/json'
          },
          method: "GET",
          success: function (res) {
            console.log('登录密匙', res);
            let keyword = res.data.data;
            that.setData({
              keyword: res.data.data
            })
            if (!socketOpen) {
             
              wx.connectSocket({
                url: 'wss://friend-guess.playonwechat.com/ws'
              })
              console.log(11111);
              wx.onSocketOpen(function (ress) {
                console.log('ress:', ress);
                console.log('WebSocket连接已打开111！');
                console.log('已登录发起请求');
                that.sendSocketMessage(keyword);
              })
              wx.onSocketMessage(function (res) {
                console.log('收到服务器内容：' + res.data);
                let result = JSON.parse(res.data);
                console.log(result);
                console.log(result.status);
                if (result.status == 0) {
                  // 登录失败
                  if (result.msg == '未登陆服务器，请登陆后重试') {
                    console.log('未登陆服务器，请登陆后重试');
                  }
                  tips.alert(result.msg);
                  that.setData({
                    inform: result.msg
                  })
                } else {
                  console.log(result);
                  if (result.status == 1) {
                    console.log('已登录发起请求');
                    console.log(app.data.apiurl + "guessipk/enter-friend-room?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid") + '&guess_type=idiom' + '&room_id=' + that.data.room_id)
                    // 发起pk
                    wx.request({
                      url: app.data.apiurl + "guessipk/enter-friend-room?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
                      data: {
                        guess_type: 'idiom',
                        room_id: that.data.room_id
                      },
                      header: {
                        'content-type': 'application/json'
                      },
                      method: "GET",
                      success: function (res) {
                        console.log("发起pk链接websocket:", res);
                        var keyword = res.data.data;
                        that.setData({
                          keyword: res.data.data
                        })
                        console.log('是否发送');
                        that.sendSocketMessage(keyword);
                        wx.onSocketMessage(function (res) {
                          console.log('收到服务器内容：' + res.data);
                          let result = JSON.parse(res.data);
                          console.log(result);
                          console.log(result.status);
                          if (result.status == 2) {
                            that.setData({  //双方进去房间
                              comeIn: true
                            })
                            console.log(result.member_info);
                            if (result.member_info[0].mid == wx.getStorageSync('mid')) {  //myself
                              that.setData({
                                otherImg1: result.member_info[0].avatarurl,
                                otherName1: result.member_info[0].wx_name,
                              })
                              wx.setStorageSync('otherName', result.member_info[0].avatarurl);
                              wx.setStorageSync('otherImg', result.member_info[0].wx_name);
                            } else { //other别人
                              that.setData({
                                otherImg1: result.member_info[1].avatarurl,
                                otherName1: result.member_info[1].wx_name,
                              })
                              wx.setStorageSync('otherName', result.member_info[1].avatarurl);
                              wx.setStorageSync('otherImg', result.member_info[1].wx_name);
                            }
                          }
                          if (result.status == 1 && result.question_list) {
                            wx.setStorageSync('question_list', result.question_list)
                            wx.reLaunch({
                              url: '../run/run?question_list=' + result.question_list + '&otherImg=' + that.data.otherImg1 + '&otherName=' + that.data.otherName1 + '&houseImg=' + that.data.houseImg + '&houseName=' + that.data.houseName + '&room_id=' + that.data.room_id + '&housemid=' + that.data.room_id+'&othermid='+wx.getStorageSync('mid'),
                            })
                          }
                          if (result.status == 0) {
                            tips.alert(result.msg);
                            that.setData({
                              bg: true
                            })
                          }
                        })
                      }
                    })
                  }

                }
              })
              wx.onSocketError(function (res) {
                socketOpen = false
                console.log('WebSocket连接打开失败，请检查！')
                that.setData({
                  socketOpen: false
                })
                wx.hideToast()
              })
              
            }
          }
        })
        
    })
  },
  caozuo: function (keyword) {
    let that = this;
    console.log('keyword:', keyword);
    var keyword = keyword;
    wx.onSocketError(function (res) {
      socketOpen = false
      console.log('WebSocket连接打开失败，请检查！')
      that.setData({
        socketOpen: false
      })
      wx.hideToast()
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')
      that.sendSocketMessage(keyword);
      wx.hideToast()
      that.setData({
        socketOpen: true
      })
    })
    //wx.closeSocket()
    wx.onSocketMessage(function (res) {
      console.log('收到服务器内容：' + res.data);
      let result = JSON.parse(res.data);
      console.log(result);
      console.log(result.status);
      if (result.status == 0) {
        // 登录失败
        if (result.msg == '未登陆服务器，请登陆后重试') {
          console.log('未登陆服务器，请登陆后重试');
          that.sendSocketMessage(keyword);

        }
        tips.alert(result.msg);
        that.setData({
          inform: result.msg
        })
      } else {
        console.log(result);
        if (result.status == 1) {
          console.log('已登录发起请求')
          // 进入发起pk
          wx.request({
            url: app.data.apiurl + "guessipk/enter-friend-room?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
            data: {
              guess_type:'idiom',
              room_id: that.data.room_id
            },
            header: {
              'content-type': 'application/json'
            },
            method: "GET",
            success: function (res) {
              console.log("发起pk链接websocket:", res);
              let status = res.data.status;
              if (status==1){
                that.setData({
                  keyword: res.data.data
                })
                that.caozuo(that.data.keyword)
              }else{
                  tips.alert(res.data.msg);
              }
              
            }
          })
        }
      }
    })

    wx.onSocketClose(function (res) {
      tips.alert('好友正在对战或者离开房间');
      console.log('WebSocket 已关闭！')
      wx.hideToast()
      that.setData({
        socketOpen: false,
        bg:true
      })
    })
  },
  // 保存formid
  formSubmit(e) {
    let that = this;
    util.formSubmit(e);
  },

  sendSocketMessage: function (msg) {
    wx.sendSocketMessage({
      data: msg
    })
  },
  // outTap退出
  outTap(e){
    wx.closeSocket();
    wx.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！')
    })
    wx.reLaunch({
      url: '../indexs/indexs',
    })
  },
  // 等待
  waitTap() {
    this.setData({
      bg: false
    })
  },
   // 退出
  onHide() {
    wx.closeSocket();
    wx.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！')
    })
  },
  onUnload() {
    wx.closeSocket();
  }
})