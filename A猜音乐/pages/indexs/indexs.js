//index.js
//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');
import tips from '../../utils/tips.js'

Page({
  data: {
    userInfo: wx.getStorageSync('userInfo'),
    hasUserInfo: false,
    width:30,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    let that = this;
   
  },
  onShow(){
    wx.setStorageSync('sound', true)
    wx.removeStorageSync('share');
    wx.removeStorageSync('winner_info');
    wx.removeStorageSync('loser_info');
    wx.removeStorageSync('otherNum');
    wx.removeStorageSync('result');
    wx.removeStorageSync('houseNum');
    wx.removeStorageSync('otherNum');
    wx.removeStorageSync('otherInform');
    wx.removeStorageSync('houseInform');
    let that = this;
    if(wx.getStorageSync('sign')){
        // 积分信息
        wx.request({
          url: app.data.apiurl2 + "guessmc/get-user-data?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
          data: {
            guess_type: 'music',
          },
          header: {
            'content-type': 'application/json'
          },
          method: "GET",
          success: function (res) {
            console.log("积分信息:", res);
            var status = res.data.status;
            if (status == 1) {
              wx.setStorageSync('point', res.data.data);
              that.setData({
                point: res.data.data,
              })
            } else {
              console.log(res.data.msg)
            }
          }
        })
        // share
        wx.request({
          url: app.data.apiurl2 + "guessmc/share?sign=" + wx.getStorageSync('sign') + '&operator_id=654321',
          data: {
            guess_type: 'music'
          },
          header: {
            'content-type': 'application/json'
          },
          method: "GET",
          success: function (res) {
            console.log("分享海报:", res);
            var status = res.data.status;
            if (status == 1) {
              that.setData({
                imgUrl: res.data.data
              })
              wx.setStorageSync('imgUrl', res.data.data);
            } else {
              console.log(res.data.msg)
            }
          }
        })
    }else{
      app.getAuth(function () {
        // 积分信息
        wx.request({
          url: app.data.apiurl2 + "guessmc/get-user-data?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
          data: {
            guess_type: 'music',
          },
          header: {
            'content-type': 'application/json'
          },
          method: "GET",
          success: function (res) {
            console.log("积分信息:", res);
            var status = res.data.status;
            if (status == 1) {
              wx.setStorageSync('point', res.data.data);
              that.setData({
                point: res.data.data,
              })
            } else {
              console.log(res.data.msg)
            }
          }
        })
        setTimeout(function () {
          that.setData({
            userInfo: wx.getStorageSync('userInfo')
          })
         }, 2000)
      });
    }
    that.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
    
  },
  getUserInfo: function (cb) {
    var that = this
    if (wx.getStorageSync('userInfo')) {
      console.log(111111111111);
    } else {
      util.auth(function () {
        that.setData({
          userInfo: wx.getStorageSync('userInfo')
        })
      })
    }
  },
  ranking(){
    if (!wx.getStorageSync('userInfo') || wx.getStorageSync('userInfo').length < 2) {
      this.getUserInfo();
      return;
    } else {
        wx.navigateTo({
          url: '../ranking/ranking',
        })
    }
  },
  morePlay(){
    wx.navigateTo({
      url: '../more/more',
    })
  },
  people(){
    if (!wx.getStorageSync('userInfo') || wx.getStorageSync('userInfo').length < 2) {
      this.getUserInfo();
      return;
    } else {
      wx.navigateTo({
        url: '../music/music',
      })
    }
    
  },
 
  paiwei(){
    let that = this;
    if (!wx.getStorageSync('userInfo') || wx.getStorageSync('userInfo').length < 2) {
      this.getUserInfo();
      return;
    }else{
      that.setData({
        userInfo: wx.getStorageSync('userInfo')
      })
      wx.navigateTo({
        url: '../paiwei/paiwei',
      })
    }
    
  },
  // 好友对战
  friends(){
    wx.navigateTo({
      url: '../pipeis/pipeis',
    })  
  },
  // 分享
  onShareAppMessage: function (res) {
    if (!wx.getStorageSync('userInfo') || wx.getStorageSync('userInfo').length < 2) {
      this.getUserInfo();
      return;
    }else{
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
    }
  },
})
