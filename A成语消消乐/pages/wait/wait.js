// pages/wait/wait.js
var app = getApp();
var util = require('../../utils/util.js');
import tips from '../../utils/tips.js';
var socketOpen = false;
var socketMsgQueue = [];
Page({
  data: {
    userInfo: wx.getStorageSync('userInfo'),
    socketOpen:false,
    otherImg:'http://iph.href.lu/80x80',
    otherName:'未知'
  },
  onLoad: function (options) {
    console.log('options', options);
    let that = this;
  },
  onReady: function () {

  },
  onShow: function () {
    let that = this;
    that.setData({
      userInfo: wx.getStorageSync('userInfo'),
    });
    // 请求登录密匙连接到socket
    wx.request({
      url: app.data.apiurl + "guessipk/go-socket?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
      data: {
        guess_type:'idiom'
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log('登录密匙', res);
        that.setData({
          key: res.data.data
        })
        var keyword = res.data.data;
        
          wx.connectSocket({
            url: 'wss://friend-guess.playonwechat.com/ws'
          })
          console.log(11111);
          // that.caozuo(that.data.key);
          wx.onSocketOpen(function (ress) {
            that.setData({
              socketOpen:true
            })
            console.log('ress:', ress);
            console.log('WebSocket连接已打开111！');
            console.log('已登录发起请求');
            that.sendSocketMessage(keyword);
          })
          wx.onSocketMessage(function (res) {
            console.log('收到服务器内容1：' + res.data);
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
              that.setData({
                wait:true
              })
              if (result.status == 1) {
                console.log('已登录发起请求');
                console.log(app.data.apiurl + "guessipk/create-pk?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid") + '&guess_type=idiom' + '&room_id=' + that.data.room_id)
                // 发起pk
                wx.request({
                  url: app.data.apiurl + "guessipk/create-pk?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid") + '&guess_type=idiom',
                  data: {
                    guess_type: 'idiom'
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  method: "GET",
                  success: function (res) {
                    console.log("创建房间:", res);
                    var keyword = res.data.data;
                    that.setData({
                      keyword: res.data.data
                    })
                    wx.sendSocketMessage({
                      data: keyword
                    })
                    console.log('是否发送');
                    that.sendSocketMessage(keyword);
                    wx.onSocketMessage(function (res) {
                      console.log('收到服务器内容2：' + res.data);
                      let result = JSON.parse(res.data);
                      console.log(result);
                      console.log(result.status);
                      if (result.status==2){
                        that.setData({  //双方进去房间
                          comeIn:true
                        })
                        var userInfo = that.data.userInfo;
                       // wx.setStorageSync(key, data);
                        if (result.member_info[0].mid != wx.getStorageSync('mid')){  //别人 
                        console.log(111)
                          that.setData({
                            otherImg: result.member_info[0].avatarurl,
                            otherName: result.member_info[0].wx_name,
                            othermid: result.member_info[0].mid,
                            houseImg: result.member_info[1].avatarUrl,
                            houseName: result.member_info[1].wx_name,
                            housemid: result.member_info[1].mid
                          })
                          wx.setStorageSync('otherName', result.member_info[0].avatarurl);
                          wx.setStorageSync('otherImg', result.member_info[0].wx_name);
                        }else { //other房主
                          console.log(222);
                          console.log(result.member_info[1].mid);
                          console.log(result.member_info[0].mid);
                            that.setData({
                              otherImg: result.member_info[1].avatarurl,
                              otherName: result.member_info[1].wx_name,
                              othermid: result.member_info[1].mid,
                              houseImg: result.member_info[0].avatarurl,
                              houseName: result.member_info[0].wx_name,
                              housemid: result.member_info[0].mid
                            })
                            wx.setStorageSync('otherName', result.member_info[1].avatarurl);
                            wx.setStorageSync('otherImg', result.member_info[1].wx_name);
                        }
                      } 
                      if (result.status == 0){
                        //tips.alert(result.msg);
                        that.setData({
                          bg:true
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
    })
  },
  // 游戏开始
  starTap(){
    let that = this;
    // 好友开始pk
    wx.request({
      url: app.data.apiurl + "guessipk/go-friend-pk?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
      data: {
        guess_type: 'idiom',
        room_id: wx.getStorageSync('mid')
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("好友开始pk:", res);
        var status = res.data.status;
        if (status == 1) {
          var keyword = res.data.data;
          that.setData({
            keyword: res.data.data
          })
         // if (socketOpen){
            console.log('开始答题')
            that.sendSocketMessage(keyword);
            wx.onSocketMessage(function (res) {
              //console.log('获取题目：' + res.data);
              let result = JSON.parse(res.data);
              console.log(result);
              if (result.status == 1) {
                wx.setStorageSync('question_list', result.question_list);
                console.log('../run/run?otherImg=' + that.data.otherImg + '&otherName=' + that.data.otherName + '&houseImg=' + that.data.houseImg + '&houseName=' + that.data.houseName + '&room_id=' + wx.getStorageSync('mid') + '&othermid=' + that.data.othermid + '&housemid=' + that.data.housemid);
                wx.reLaunch({
                  url: '../run/run?otherImg=' + that.data.otherImg + '&otherName=' + that.data.otherName + '&houseImg=' + that.data.houseImg + '&houseName=' + that.data.houseName + '&room_id=' + wx.getStorageSync('mid') + '&othermid=' + that.data.othermid + '&housemid=' + that.data.housemid
                })
              } else if (result.status == 0) {
                tips.alert(result.msg)
              }
              if (result.num) {
                if (result.mid == that.data.room_id) { //房主
                  console.log('room_id');
                  let houseInform = result;
                  that.setData({  //回答反馈
                    houseInform: result
                  })
                  wx.setStorageSync('houseInform', houseInform);
                } 
                if (result.mid != that.data.room_id) {  //other
                  console.log('otherInform');
                  let otherInform = result;
                  that.setData({  //回答反馈
                    otherInform: result
                  })
                  wx.setStorageSync('otherInform', otherInform);
                }

              }
            })
         // }
        } else {
          console.log(res.data.msg)
        }
      }
    })
  },
  caozuo: function (keyword){
    console.log("caozuo1111");
    let that = this;
    console.log('keyword:', keyword);
    var keyword = keyword;
    wx.onSocketOpen(function (res) {
      console.log('res:', res);
      console.log('WebSocket连接已打开！')
      that.sendSocketMessage(keyword);
      wx.hideToast()
      that.setData({
        socketOpen: true
      })
    })
    wx.onSocketError(function (res) {
      socketOpen = false
      console.log('WebSocket连接打开失败，请检查！')
      that.setData({
        socketOpen: false
      })
      wx.hideToast()
    })
   
    //wx.closeSocket()
    wx.onSocketMessage(function (res) {
      console.log('收到服务器内容3：' + res.data);
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
        if (result.status==1){
          console.log('已登录发起请求');
          console.log(app.data.apiurl + "guessipk/create-pk?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid") + '&guess_type=idiom')
          // 发起pk
          wx.request({
            url: app.data.apiurl + "guessipk/create-pk?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid") + '&guess_type=idiom',
            data: {
              guess_type:'idiom'
            },
            header: {
              'content-type': 'application/json'
            },
            method: "GET",
            success: function (res) {
              console.log("创建房间:", res);
              var keyword = res.data.data
              that.setData({
                keyword: res.data.data
              })
              console.log('是否发送');
              that.sendSocketMessage(keyword);
              wx.onSocketMessage(function (res) {
                console.log('收到服务器内容4：' + res.data)
              })
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
  sendSocketMessage: function (msg) {
    wx.sendSocketMessage({
      data: msg
    })
  },
  // 保存formid
  formSubmit(e) {
    let that = this;
    util.formSubmit(e);
  },
  // outTap退出
  outTap(e) {
    wx.closeSocket();
    wx.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！')
    })
    wx.reLaunch({
      url: '../indexs/indexs',
    })
  },
  // 等待
  waitTap(){
    this.setData({
      bg:false
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