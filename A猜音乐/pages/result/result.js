// pages/wait/wait.js
var app = getApp();
var util = require('../../utils/util.js');
import tips from '../../utils/tips.js'
Page({
  data: {
    userInfo: wx.getStorageSync('userInfo'),
    allPoint: wx.getStorageSync('allPoint'),
  },
  onLoad: function (options) {
    console.log("options:", options);
    wx.updateShareMenu({
      withShareTicket: true,
    })
    wx.onSocketOpen(function (ress) {
      console.log('onSocketOpen');
    })
    wx.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！')
    })
  },
  onReady: function (options) {

  },
  onShow: function () {
    let that = this;
    console.log('AppMusic1', app.AppMusic1);
    if (wx.getStorageSync('winner_info').mid == wx.getStorageSync('mid')) {
      // 播放成功
      if (wx.getStorageSync('sound') == true) {
        app.AppMusic1.src = 'http://ovhvevt35.bkt.clouddn.com/chengyu/win.mp3';
        app.AppMusic1.play();
        console.log('AppMusic1', app.AppMusic1);
        app.AppMusic1.onPlay(() => {
          console.log('开始播放');
        })
      }
    } else if (wx.getStorageSync('loser_info').mid == wx.getStorageSync('mid')) {
      //播放失败
      if (wx.getStorageSync('sound') == true) {
        app.AppMusic1.src = 'http://ovhvevt35.bkt.clouddn.com/chengyu/false.mp3';
        app.AppMusic1.play();
        console.log('AppMusic1', app.AppMusic1);
        app.AppMusic1.onPlay(() => {
          console.log('开始播放');
        })
      }
    } else {
      if (wx.getStorageSync('sound') == true) {
        app.AppMusic1.src = 'http://ovhvevt35.bkt.clouddn.com/chengyu/false.mp3';
        app.AppMusic1.play();
      }
    }
    that.setData({
      userInfo: wx.getStorageSync('userInfo'),
      room_id: wx.getStorageSync('room_id'),
      houseImg: wx.getStorageSync('houseImg'),
      houseName: wx.getStorageSync('houseName'),
      otherImg: wx.getStorageSync('otherImg'),
      otherName: wx.getStorageSync('otherName'),
      type: wx.getStorageSync('type'),
      winner_info: wx.getStorageSync('winner_info'),
      loser_info: wx.getStorageSync('loser_info'),
      otherNum: wx.getStorageSync('otherNum'),
      houseNum: wx.getStorageSync('houseNum'),
      result: wx.getStorageSync('result'),
      mid: wx.getStorageSync('mid'),
    })
    console.log('mid:', that.data.mid);
    console.log(that.data.winner_info);
    console.log(that.data.winner_info.mid);
    console.log(that.data.winner_info.plus_point);
    console.log(that.data.loser_info);
    console.log(that.data.loser_info.mid);
    console.log(that.data.loser_info.minus_point);

  },
  // 保存formid
  formSubmit(e) {
    let that = this;
    util.formSubmit(e);
  },
  // 发送信息
  sendSocketMessage: function (msg) {
    wx.sendSocketMessage({
      data: msg
    })
  },
  // 继续游戏
  starTap() {
    wx.reLaunch({
      url: '../index/index',
    })
  },
  // 转发群加金币 个人不加
  // onShareAppMessage() {
  //   let that = this;
  //   let sign = wx.getStorageSync("sign");
  //   return {
  //     title: '不服来战',
  //     path: '/pages/show/show',
  //     success(res) {
  //       console.log("shareTickets:", res);
  //       console.log("shareTickets:", res.shareTickets[0]) // 奇怪为什么 shareTickets 是个数组？这个数组永远只有一个值。
  //       wx.getShareInfo({
  //         shareTicket: res.shareTickets[0],
  //         complete(res) {
  //           console.log(res, '分享群请求加金币接口');
  //           if (res.encryptedData){
  //             wx.request({
  //               url: app.data.apiurl + "guessipk/share-add-point?sign=" + sign + '&operator_id=' + app.data.kid,
  //               data: {
  //                 guess_type: 'idiom'
  //               },
  //               header: {
  //                 'content-type': 'application/json'
  //               },
  //               method: "GET",
  //               success: function (res) {
  //                 var status = res.data.status;
  //                 if (status == 1) {
  //                   that.setData({
  //                     point: res.data.data.point + 50
  //                   })
  //                   wx.setStorageSync('point', res.data.data.point + 50)
  //                   tips.success('积分+50');
  //                 } else {
  //                   //console.log(res.data.msg)
  //                   //tips.error(res.data.msg)
  //                 }
  //               }
  //             })
  //           }
  //         }

  //       })
  //     }
  //   }
  // },
  // show
  resultTap() {
    wx.reLaunch({
      url: '../show/show',
    })
  },
  onHide() {
    wx.closeSocket();
    wx.onSocketClose(function (res) {
      console.log('WebSocket 已关闭');
    })
  },
  onUnload() {
    wx.closeSocket();
  },
  // 分享加金币
  shareFriends(res) {
    let that = this;
    wx.getShareInfo({
      shareTicket: res.shareTickets[0],
      complete(res) {
        console.log(res, '请求加金币接口');
        if (res.encryptedData) { //分享群加积分
          wx.request({
            url: app.data.apiurl2 + "guessmc/after-share?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
            data: {
              guess_type: 'music'
            },
            header: {
              'content-type': 'application/json'
            },
            method: "GET",
            success: function (res) {
              var status = res.data.status;
              if (status == 1) {
                that.setData({
                  point: res.data.data.point + that.data.allPoint.share_point
                })
                tips.success('积分+30');
              } else {
                //console.log(res.data.msg)
                //tips.error(res.data.msg)
              }
            }
          })
        }
      }
    })
   
  },
  // 分享
  onShareAppMessage: function (res) {
    wx.setStorageSync('share',true);
    console.log(res);
    let type = res.target.dataset.type; //0炫耀 1分享
    let that = this;
    let userInfo = that.data.userInfo;
    if (type == 0) {
      return {
        title: '所向披靡，胜利原来这么简单！',
        path: '/pages/share/share?otherMid=' + wx.getStorageSync('sign'),
        success: function (res) {
          that.shareFriends(res);
        },
        fail: function (res) {
          // 转发失败
        }
      }
    } else if (type == 1) {
      return {
        title: '虽败犹荣，我还会回来的！',
        path: '/pages/share/share?otherMid=' + wx.getStorageSync('sign'),
        success: function (res) {
          that.shareFriends(res);
        },
        fail: function (res) {
          // 转发失败
        }
      }
    }

  },

})