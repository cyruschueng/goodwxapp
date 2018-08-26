// pages/battle/battle.js
var app = getApp();
var util = require('../../utils/util.js');
import tips from '../../utils/tips.js'
Page({
  data: {
    userInfo: wx.getStorageSync('userInfo'),
    second:1,
    show:false,
    bg:false
  },
  onLoad: function (options) {
    console.log('options:', options);
      this.setData({
        usepoint: options.usepoint,
        rank_id: options.rank_id*1 + 1,
        order:options.order
      })
  },
  onReady: function () {

  },
  onShow: function () {
    let that = this;
    wx.setStorageSync('type', 'paiwei');
    that.setData({
      userInfo: wx.getStorageSync('userInfo'),
      bg: false
    })
    console.log('--------------------------------------------------------------------------------------connectSocket');
    wx.connectSocket({
      url: 'wss://w.kuaiduodian.com/wss'
    })
    let inter = setInterval(function () {
      let second = that.data.second;
      second++;
      if (second > 5){
          that.setData({
            show:true
          })
      }
      if (second > 20) {
        that.setData({
          bg: true
        })
        clearInterval(inter);
        return;
      }
      that.setData({
        second
      })
    },1000)
    // 获取关卡入场费
    wx.request({
      url: app.data.apiurl2 + "guessmc/get-gate-gold?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
      data: {
        guess_type: 'music',
        order: that.data.order
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("获取关卡入场费", res);
        var status = res.data.status;
        if (status == 1) {
          that.setData({
            gold: res.data.data.gold
          })
        } else {
          console.log(res.data.msg);
        }
      }
    })
    
    // 监听WebSocket连接
    wx.onSocketOpen(function (ress) {
      console.log('WebSocket连接已打开1！');
      // 登录
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
            console.log('keyword登录:', keyword);
            that.sendSocketMessage(keyword);
            
          } else {
            console.log(res.data.msg);
          }
        }
      })
    })
    // 监听是否错误
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！');
    })
    // 监听是否断开
    wx.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！')
      that.setData({
        bg: true
      })
    })
    // 收到内容
    wx.onSocketMessage(function (res) {
      console.log('收到WebSocket内容：' + res.data);
      let result = JSON.parse(res.data);
      console.log(result);
      if (result.status==0){
          that.setData({
            bg:true
          })
      } else if (result.status == 1){
        if (result.action=='go-socket'){ //已登录 // 匹配
          wx.request({
            url: app.data.apiurl2 + "guessmc/match?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
            data: {
              guess_type: 'music',
              rank_id: that.data.order
            },
            header: {
              'content-type': 'application/json'
            },
            method: "GET",
            success: function (res) {
              console.log("匹配", res);
              var status = res.data.status;
              if (status == 1) {
                var keyword = res.data.data;
                console.log('keyword:', keyword);
                that.sendSocketMessage(keyword);
                console.log('发送keywordmatch');
                that.resultTab();
              } else {
                console.log(res.data.msg);
              }
            }
          })
        } else{
          console.log(result.member_info[0].mid,'1111111111');
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
            wx.setStorageSync('question_list', result.question_list);
            console.log('result.robot_sign', result.robot_sign);
            wx.setStorageSync('room_id', result.room_id);
            wx.setStorageSync('robot_sign', result.robot_sign);
            wx.setStorageSync('partner_is_robot', result.partner_is_robot);
            wx.setStorageSync('otherName', result.member_info[0].wx_name);
            wx.setStorageSync('otherImg', result.member_info[0].avatarurl);
            wx.setStorageSync('houseName', result.member_info[1].wx_name);
            wx.setStorageSync('houseImg', result.member_info[1].avatarurl);
            wx.setStorageSync('room_id', result.member_info[1].mid);
            console.log('otherName', result.member_info[0].wx_name);
            console.log('houseName', result.member_info[1].wx_name);
            console.log('room_id', result.member_info[1].mid);
            console.log('otherName', result.member_info[0].avatarurl);
            console.log('houseName', result.member_info[1].avatarurl);
            setTimeout(function () {
              wx.redirectTo({
                url: '../pipei/pipei',
              })
            }, 1000)
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
            wx.setStorageSync('question_list', result.question_list);
            console.log('result.robot_sign', result.robot_sign);
            wx.setStorageSync('room_id', result.room_id);
            wx.setStorageSync('robot_sign', result.robot_sign);
            wx.setStorageSync('partner_is_robot', result.partner_is_robot);
            wx.setStorageSync('houseName', result.member_info[0].wx_name);
            wx.setStorageSync('houseImg', result.member_info[0].avatarurl);
            wx.setStorageSync('otherName', result.member_info[1].wx_name);
            wx.setStorageSync('robot_sign', result.robot_sign);
            wx.setStorageSync('otherImg', result.member_info[1].avatarurl);
            wx.setStorageSync('room_id', result.member_info[0].mid);
            console.log('houseName', result.member_info[0].wx_name);
            console.log('otherName', result.member_info[1].wx_name);
            console.log('houseImg', result.member_info[0].avatarurl);
            console.log('otherImg', result.member_info[1].avatarurl);
            console.log('room_id', result.member_info[0].mid);
            setTimeout(function () {
              wx.redirectTo({
                url: '../pipei/pipei',
              })
            }, 1000)
          }
        }
      }
    })
    
  },
  resultTab(){
    let that = this;
    wx.onSocketMessage(function (res) {
      console.log('收到WebSocket内容match-pk：' + res.data);
      let result = JSON.parse(res.data);
      console.log(result);
      //if (result.action =='match-pk'){
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
        wx.setStorageSync('question_list', result.question_list);
        console.log('result.robot_sign', result.robot_sign);
        wx.setStorageSync('room_id', result.room_id);
        wx.setStorageSync('robot_sign', result.robot_sign);
        wx.setStorageSync('partner_is_robot', result.partner_is_robot);
        wx.setStorageSync('otherName', result.member_info[0].wx_name);
        wx.setStorageSync('otherImg', result.member_info[0].avatarurl);
        wx.setStorageSync('houseName', result.member_info[1].wx_name);
        wx.setStorageSync('houseImg', result.member_info[1].avatarurl);
        wx.setStorageSync('room_id', result.member_info[1].mid);
        console.log('room_id', result.member_info[1].mid);
        console.log('otherName', result.member_info[0].otherName);
        console.log('houseName', result.member_info[1].otherName);
        setTimeout(function () {
          wx.redirectTo({
            url: '../pipei/pipei',
          })
        }, 1000)
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
        console.log('houseName', result.member_info[0].wx_name);
        console.log('otherName', result.member_info[1].wx_name);
        console.log('houseImg', result.member_info[0].avatarurl);
        console.log('otherImg', result.member_info[1].avatarurl);
        console.log('room_id', result.member_info[0].mid);
        wx.setStorageSync('question_list', result.question_list);
        wx.setStorageSync('robot_sign', result.robot_sign);
        wx.setStorageSync('partner_is_robot', result.partner_is_robot);
        console.log('result.robot_sign', result.robot_sign);
        setTimeout(function () {
          wx.redirectTo({
            url: '../pipei/pipei',
          })
        }, 1000)
      }
      

      //}
    }) 
  },
  // Socket发布信息
  sendSocketMessage: function (msg) {
    wx.sendSocketMessage({
      data: msg
    })
  },
  // 重新匹配
  newReady(){
    wx.closeSocket();
    wx.navigateBack({
      url: '../mine/mine',
    })
  },
  // outTap退出
  outTap(e) {
    wx.closeSocket();
    wx.onSocketClose(function (res) {
      console.log('battleoutTap WebSocket 已关闭！')
    })
    wx.reLaunch({
      url: '../index/index',
    })
  },
  onHide(){
    console.log('onhide');
  }
  

})