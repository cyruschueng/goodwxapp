// pages/share/share.js
var app = getApp();
var util = require('../../utils/util.js');
import tips from '../../utils/tips.js'
Page({
  data: {
    url:'../image/good.png',
    imgUrl: wx.getStorageSync('imgUrl')
  },
  onLoad: function (options) {
    console.log('options:', options);
    this.setData({
      otherMid: options.otherMid
    })
    
  },
  onShow: function () {
    let that = this;
    that.setData({
      imgUrl: wx.getStorageSync('imgUrl'),
      inform: wx.getStorageSync('inform')
    })
    
    if (that.data.otherMid){
      wx.request({
        url: app.data.apiurl2 + "guessmc/share?sign=" + that.data.otherMid + '&operator_id=654321',
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
          } else {
            console.log(res.data.msg)
          }
        }
      })
    }else{
      wx.request({
        url: app.data.apiurl2 + "guessmc/share?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
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
          } else {
            console.log(res.data.msg)
          }
        }
      })
    }
  },
  // backHome
  backHome(){
    wx.reLaunch({
      url: '../index/index',
    })
  },
  onShareAppMessage: function (res) {
    let that = this;
    return {
      title: '猜猜音乐',
      path: '/pages/shareMusic/shareMusic?friend_mid=' + wx.getStorageSync('mid') + '&num=' + that.data.inform.num,
      success: function (res) {
        // 转发成功
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
            console.log("求助加积分:", res);
            var status = res.data.status;
            if (status == 1) {
              tips.success('积分' + wx.getStorageSync('jifen').share_add_point + '')
              that.setData({
                point: res.data.data.point,
              })
            } else {
              console.log(res.data.msg)
            }
          }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  // poster
  savePoster(e) {
      var that = this;
      console.log(that.data.imgUrl);
      wx.downloadFile({
        url: '' + that.data.imgUrl + '', //仅为示例，并非真实的资源
        success: function (res) {
          console.log(res);
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) {
              //console.log(res);
              wx.showToast({
                title: '海报下载成功，请去相册查看',
                icon: 'success',
                duration: 800
              })
            }
          })
        },
        fail: function (err) {
          console.log(err)
        }
      })
  }
})