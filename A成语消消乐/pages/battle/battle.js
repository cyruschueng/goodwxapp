// pages/battle/battle.js
var app = getApp();
var util = require('../../utils/util.js');
import tips from '../../utils/tips.js'
Page({
  data: {
    userInfo: wx.getStorageSync('userInfo'),
  },
  onLoad: function (options) {
    console.log('options:', options);
      this.setData({
        usepoint: options.usepoint,
        rank_id: options.rank_id
      })
  },
  onReady: function () {
  
  },
  onShow: function () {
      let that = this;
      that.setData({
        userInfo: wx.getStorageSync('userInfo'),
      })
      // 请求登录密匙连接到socket
      wx.request({
        url: app.data.apiurl + "guessipk/go-socket?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
        data: {
          guess_type: 'idiom'
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
              socketOpen: true
            })
            console.log('ress:', ress);
            console.log('WebSocket连接已打开111！');
            console.log('已登录发起请求');
            that.sendSocketMessage(keyword);
          })
          wx.onSocketMessage(function (res) {
            let result = JSON.parse(res.data);
            console.log('收到服务器内容：',result);
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
                console.log(app.data.apiurl + "guessipk/create-pk?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid") + '&guess_type=idiom' + '&room_id=' + that.data.room_id)
                // 排位赛
                wx.request({
                  url: app.data.apiurl + "guessipk/match?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
                  data: {
                    guess_type: 'idiom',
                    rank_id: that.data.rank_id
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  method: "GET",
                  success: function (res) {
                    console.log("创建房间:", res);
                    let status = res.data.data;
                    if (status==0){
                      that.setData({
                        wait: true
                      })
                        //tips.alert(res.data.msg)
                    }else{  //获取到keyword
                        var keyword = res.data.data;
                        console.log("keyword:", keyword);
                        that.setData({
                          keyword: res.data.data
                        })
                        wx.sendSocketMessage({
                          data: keyword
                        })
                        console.log('是否发送');
                        that.sendSocketMessage(keyword);
                        wx.onSocketMessage(function (res) {
                          
                          let result = JSON.parse(res.data);
                          console.log('收到服务器内容：',result);
                          console.log(result.status);
                          if (result.status == 1) {
                            that.setData({  //双方进去房间
                              comeIn: true
                            })
                            var userInfo = that.data.userInfo;
                            // wx.setStorageSync(key, data);
                            if (result.member_info[0].mid != result.room_id) {  //别人 
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
                            } else { //other房主
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
                            wx.setStorageSync('question_list', result.question_list);
                            that.setData({
                              question_list: result.question_list
                            })
                            //console.log('../run/run?otherImg=' + that.data.otherImg + '&otherName=' + that.data.otherName + '&houseImg=' + that.data.houseImg + '&houseName=' + that.data.houseName + '&room_id=' + wx.getStorageSync('mid') + '&othermid=' + that.data.housemid + '&housemid=' + that.data.housemid);
                            wx.reLaunch({
                              url: '../run/run?otherImg=' + that.data.otherImg + '&otherName=' + that.data.otherName + '&houseImg=' + that.data.houseImg + '&houseName=' + that.data.houseName + '&room_id=' + wx.getStorageSync('mid') + '&othermid=' + that.data.housemid + '&housemid=' + that.data.housemid
                            })
                          }
                          if (result.status == 0) {
                            if (result.msg == '超时'){
                                that.setData({
                                  bg:true
                                })
                            }
                            tips.alert(result.msg)
                          }
                        })
                    }
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
  // Socket发布信息
  sendSocketMessage: function (msg) {
    wx.sendSocketMessage({
      data: msg
    })
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
  waitTap() {
    this.setData({
      bg: false
    })
    wx.reLaunch({
      url: '../indexs/indexs',
    })
  },
  // 退出
  onHide() {
    wx.closeSocket();
    wx.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！')
    })
  }
})