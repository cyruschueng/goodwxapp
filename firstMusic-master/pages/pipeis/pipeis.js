//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');
import tips from '../../utils/tips.js'

Page({
  data: {
    userInfo: wx.getStorageSync('userInfo'),
    mid: wx.getStorageSync('mid'),
    comeIn:false,
    bg:false
  },
  onLoad: function (options) {
    console.log('mid:', wx.getStorageSync('mid'));
    console.log('options', options);
      let that = this;
      that.setData({
        room_id: options.room_id,
        _houseName: options.houseName,
        _houseImg: options.houseImg
      })
  },
  onShow: function () {
      let that = this;
      wx.setStorageSync('type', 'friend');
      console.log('--------------------------------------------------------------------------------------connectSocket');
      wx.connectSocket({
        url: 'wss://w.kuaiduodian.com/wss'//wss://w.kuaiduodian.com/ws
      })
      // 监听WebSocket连接
      wx.onSocketOpen(function (ress) {
        console.log('WebSocket连接已打开111！');
        // 登录websocket
        if (wx.getStorageSync('sign')) {
          console.log('登录：', app.data.apiurl2 + "guessmc/go-socket?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"))
          wx.request({
            url: app.data.apiurl2 + "guessmc/go-socket?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
            data: {
              guess_type: 'music'
            },
            header: {
              'content-type': 'application/json'
            },
            method: "GET",
            success: function (res) {
              console.log("登录", res);
              var status = res.data.status;
              if (status == 1) {
                var keyword = res.data.data;
                console.log('keyword:', keyword);
                that.sendSocketMessage(keyword);
              } else {
                console.log(res.data.msg);
              }
            }
          })
        } else {
          app.getAuth(function () {
            wx.request({
              url: app.data.apiurl2 + "guessmc/go-socket?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
              data: {
                guess_type: 'music'
              },
              header: {
                'content-type': 'application/json'
              },
              method: "GET",
              success: function (res) {
                console.log("登录", res);
                var status = res.data.status;
                if (status == 1) {
                  var keyword = res.data.data;
                  console.log('keyword:', keyword);
                  that.sendSocketMessage(keyword);
                  console.log('发送keyword');
                } else {
                  console.log(res.data.msg);
                }
              }
            })
          })
        }
      })
      // 监听是否错误
      wx.onSocketError(function (res) {
        socketOpen = false
        console.log('WebSocket连接打开失败，请检查！');
      })
      // 监听是否断开
      wx.onSocketClose(function (res) {
        console.log('WebSocket 已关闭！');
        that.setData({
          bg: true
        })  
      })
      if (that.data.room_id != wx.getStorageSync('mid')){
        that.friendsTap();
      }
      // 接收服务器信息
      wx.onSocketMessage(function (res) {
        let userInfo = that.data.userInfo;
        console.log('收到WebSocket内容：' + res.data);
        let result = JSON.parse(res.data);
        console.log(result);
        if (!that.data.room_id) { //self
          console.log('self');
          that.setData({
            houseImg: userInfo.avatarUrl,
            houseName: userInfo.nickName,
            otherImg: 'http://ovhvevt35.bkt.clouddn.com/music/user.png',
            otherName:'未知'
          })
          if (that.data._houseName == that.data.otherName){
                wx.reLaunch({
                  url: '../index/index',
                })
          }
          if (result.status == 0) {
              
          }else if (result.status == 1) {
            if (result.action == 'go-socket') { //已登录
              wx.request({
                url: app.data.apiurl2 + "guessmc/create-pk?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
                data: {
                  guess_type: 'music'
                },
                header: {
                  'content-type': 'application/json'
                },
                method: "GET",
                success: function (res) {
                  console.log("发起pk", res);
                  var status = res.data.status;
                  if (status == 1) {
                    var keyword = res.data.data;
                    console.log('keyword:', keyword);
                    that.sendSocketMessage(keyword);
                    console.log('发送keyword');
                  } else {
                    console.log(res.data.msg);
                  }
                }
              })
            } else if (result.action == 'go-friend-pk'){ 
              console.log('go-friend-pk1');
               wx.setStorageSync('question_list', result.question_list);
               wx.redirectTo({
                 url: '../musicpk/musicpk',
               })
            }
          } else if (result.status == 2) { //如果双方都进去房主点击开始比赛
              that.setData({
                comeIn:true
              })
              that.resultTap(result);
          }
        } else {  //friends
          console.log('friends');
          that.setData({
            houseImg: that.data._houseImg,
            houseName: that.data._houseName,
            otherImg: userInfo.avatarUrl,
            otherName: userInfo.nickName
          })
          if (that.data._houseName == that.data.otherName) {
            wx.reLaunch({
              url: '../index/index',
            })
          }
          if (result.status == 0) {

          } else if (result.status == 1) {
            if (result.action == 'go-socket') { //已登录
              wx.request({
                url: app.data.apiurl2 + "guessmc/enter-friend-room?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
                data: {
                  guess_type: 'music',
                  room_id: that.data.room_id
                },
                header: {
                  'content-type': 'application/json'
                },
                method: "GET",
                success: function (res) {
                  console.log("加入好友房间", res);
                  var status = res.data.status;
                  if (status == 1) {
                    var keyword = res.data.data;
                    console.log('keyword:', keyword);
                    that.sendSocketMessage(keyword);
                    console.log('发送keyword');
                    wx.onSocketMessage(function (res) {
                      console.log('加入好友房间' + res.data);
                      let result = JSON.parse(res.data);
                      console.log(result);
                      if(result.status == 2){
                        that.resultTap(result);
                      }
                      if (result.action =='go-friend-pk'){
                        console.log('go-friend-pk2')
                        wx.setStorageSync('question_list', result.question_list);
                        wx.setStorageSync('room_id', that.data.room_id);
                        
                        wx.redirectTo({
                          url: '../musicpk/musicpk',
                        })
                      }
                    })
                  } else {
                    console.log(res.data.msg);
                    if (res.data.msg=='房间已满'){
                        that.setData({
                          bg:true
                        })
                    }
                  }
                }
              })
            } else if (result.action == 'go-friend-pk') { 
              console.log('go-friend-pk2')
               wx.setStorageSync('question_list', result.question_list);
               wx.setStorageSync('room_id', that.data.room_id);
               if (that.data.room_id != wx.getStorageSync('mid')) {
                 that.friendsTap();
               }
               wx.redirectTo({
                 url: '../musicpk/musicpk',
               })
            }
          } else if (result.status == 2) { //如果双方都进去房主点击开始比赛
            that.setData({
              comeIn: true
            })
            that.resultTap(result);
          }
        }
      })
      
  },
  // send
  sendSocketMessage: function (msg) {
    wx.sendSocketMessage({
      data: msg
    })
  },
  matchTap(){
    let that = this;
    wx.request({
      url: app.data.apiurl2 + "guessmc/go-friend-pk?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
      data: {
        guess_type: 'music',
        room_id:wx.getStorageSync('mid')
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("发起pk", res);
        var status = res.data.status;
        if (status == 1) {
          var keyword = res.data.data;
          console.log('keyword:', keyword);
          that.sendSocketMessage(keyword);
          console.log('发送keyword');
          
        } else {
          console.log(res.data.msg);
        }
      }
    })  
  },
  friendsTap(){
    let that = this;
    wx.request({
      url: app.data.apiurl2 + "guessmc/friend?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
      data: {
        guess_type: 'music',
        friend_mid: that.data.room_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        var status = res.data.status;
        if (status == 1) {
          console.log('加好友成功');
        } else {
          console.log(res.data.msg);
        }
      }
    })
  },
  outTap(){
      wx.reLaunch({
        url: '../index/index',
      })
  },
  // 分享
  onShareAppMessage: function (res) {
    let that = this;
    let userInfo = that.data.userInfo;
    console.log('/pages/pipeis/pipeis?room_id=' + wx.getStorageSync('mid') + '&houseName=' + userInfo.nickName + '&houseImg=' + userInfo.avatarUrl);
    return {
      title: '不服来战',
      path: '/pages/pipeis/pipeis?room_id=' + wx.getStorageSync('mid') + '&houseName=' + userInfo.nickName + '&houseImg=' + userInfo.avatarUrl,
      success: function (res) {
        wx.navigateTo({
          url: '../pipeis/pipeis',
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  resultTap(result){
    let that = this;
    if (!that.data.room_id) {
      if (result.member_info[0].mid != wx.getStorageSync('mid')) {  //别人 
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
        wx.setStorageSync('houseName', result.member_info[1].avatarurl);
        wx.setStorageSync('houseImg', result.member_info[1].wx_name);
        wx.setStorageSync('room_id', result.member_info[1].mid);
        console.log('room_id', result.member_info[1].mid);
      } else { //other房主
        console.log(222);
        that.setData({
          otherImg: result.member_info[1].avatarurl,
          otherName: result.member_info[1].wx_name,
          othermid: result.member_info[1].mid,
          houseImg: result.member_info[0].avatarurl,
          houseName: result.member_info[0].wx_name,
          housemid: result.member_info[0].mid
        })
        wx.setStorageSync('houseName', result.member_info[0].wx_name);
        wx.setStorageSync('houseImg', result.member_info[0].avatarurl);
        wx.setStorageSync('otherName', result.member_info[1].wx_name);
        wx.setStorageSync('otherImg', result.member_info[1].avatarurl);
        wx.setStorageSync('room_id', result.member_info[0].mid);
        console.log('room_id', result.member_info[0].mid);
      }
    } else {
      if (result.member_info[0].mid != that.data.room_id) {  //别人 
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
        wx.setStorageSync('houseName', result.member_info[1].avatarurl);
        wx.setStorageSync('houseImg', result.member_info[1].wx_name);
        wx.setStorageSync('room_id', result.member_info[1].mid);
        console.log('room_id', result.member_info[1].mid);
      } else { //other房主
        console.log(222);
        that.setData({
          otherImg: result.member_info[1].avatarurl,
          otherName: result.member_info[1].wx_name,
          othermid: result.member_info[1].mid,
          houseImg: result.member_info[0].avatarurl,
          houseName: result.member_info[0].wx_name,
          housemid: result.member_info[0].mid
        })
        wx.setStorageSync('houseName', result.member_info[0].wx_name);
        wx.setStorageSync('houseImg', result.member_info[0].avatarurl);
        wx.setStorageSync('otherName', result.member_info[1].wx_name);
        wx.setStorageSync('otherImg', result.member_info[1].avatarurl);
        wx.setStorageSync('room_id', result.member_info[0].mid);
        console.log('room_id', result.member_info[0].mid);
      }
    }
  }
})
