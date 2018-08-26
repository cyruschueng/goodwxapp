//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');
import tips from '../../utils/tips.js'

Page({
  data: {
    userInfo: wx.getStorageSync('userInfo'),
    otherName: wx.getStorageSync('otherName'),
    otherImg: wx.getStorageSync('otherImg'),
    houseName: wx.getStorageSync('houseName'),
    houseImg: wx.getStorageSync('houseImg'),
    question_list: wx.getStorageSync('question_list'),
    room_id: wx.getStorageSync('room_id'),
  },
  onLoad: function () {

  },
  onShow: function () {
   let that = this;
   that.setData({
     userInfo: wx.getStorageSync('userInfo'),
     otherName: wx.getStorageSync('otherName'),
     otherImg: wx.getStorageSync('otherImg'),
     houseName: wx.getStorageSync('houseName'),
     houseImg: wx.getStorageSync('houseImg'),
     question_list: wx.getStorageSync('question_list'),
     room_id: wx.getStorageSync('room_id'),
   })
   setTimeout(function () {
    //  wx.setStorageSync('robot_sign', 'af81c00c06022ab800d1be95c9934c63');
    //  wx.redirectTo({
    //    url: '../robotpk/robotpk',
    //  })
    //  return;
     if (wx.getStorageSync('robot_sign')){
       wx.redirectTo({
         url: '../robotpk/robotpk',
       })
     }else{
       wx.redirectTo({
         url: '../musicpk/musicpk',
       })
     }
      
   },2000)
    // 解束匹配
    // wx.request({
    //   url: app.data.apiurl2 + "guessmc/end-pk?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
    //   data: {
    //     guess_type: 'music',
    //     room_id: that.data.room_id
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   method: "GET",
    //   success: function (res) {
    //     console.log("结束匹配", res);
    //     var status = res.data.status;
    //     if (status == 1) {
    //       var keyword = res.data.data;
    //       console.log('keyword结束匹配:', keyword);
    //       that.sendSocketMessage(keyword);

    //     } else {
    //       console.log(res.data.msg);
    //     }
    //   }
    // })
    // 收到内容
    wx.onSocketMessage(function (res) {
      console.log('收到WebSocket内容：' + res.data);
      let result = JSON.parse(res.data);
      console.log(result);
    })
  },
  // Socket发布信息
  sendSocketMessage: function (msg) {
    wx.sendSocketMessage({
      data: msg
    })
  },
  // 卸载
  onUnload() {
    console.log('pipeionUnload');
  },
 

})
