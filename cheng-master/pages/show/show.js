// pages/show/show.js
var app = getApp();
var util = require('../../utils/util.js');
import tips from '../../utils/tips.js'
Page({
  data: {
    segment:'铂金贡士',
    userInfo: wx.getStorageSync('userInfo'),
    allPoint: wx.getStorageSync('allPoint')
  },
  onLoad: function (options) {
    wx.updateShareMenu({
      withShareTicket: true,
    })
  },
  onReady: function () {
  
  },
  onShow: function () {
    let that = this;
    that.setData({
      userInfo: wx.getStorageSync('userInfo'),
    })
    wx.request({
      url: app.data.apiurl + "guessipk/share?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
      data: {
        guess_type: 'idiom',
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("海报:", res);
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
  },
  // 保存formid
  formSubmit(e) {
    console.log(e);
    let that = this;
    util.formSubmit(e);
  },
  // 保存想册
  saveImg(){
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
  },
  // 分享加金币
  shareFriends(res){
    let that = this;
    wx.getShareInfo({
      shareTicket: res.shareTickets[0],
      complete(res) {
        console.log(res, '请求加金币接口');
        if (res.encryptedData) { //分享群加积分
          wx.request({
            url: app.data.apiurl + "guessipk/share-add-point?sign=" + wx.getStorageSync('sign') + '&operator_id=' + app.data.kid,
            data: {
              guess_type: 'idiom'
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
                wx.setStorageSync('point', res.data.data.point + that.data.allPoint.share_point)
                tips.success('积分+' + that.data.allPoint.share_point);
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
    console.log(res);
    let type = res.target.dataset.type; //1发起挑战 2分享海报
    let that = this;
    let userInfo = that.data.userInfo;
    if (type==1){
      return {
        title: '不服来战',
        path: '/pages/waita/waita?room_id=' + wx.getStorageSync('mid') + '&otherName=' + userInfo.nickName + '&otherImg=' + userInfo.avatarUrl,
        success: function (res) {
          that.shareFriends(res);
          wx.navigateTo({
            url: '../wait/wait',
          })
        },
        fail: function (res) {
          // 转发失败
        }
      }
    }else{
      return {
        title: '不服来战',
        path: '/pages/show/show',
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