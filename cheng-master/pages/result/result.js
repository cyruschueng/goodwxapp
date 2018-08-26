// pages/wait/wait.js
var app = getApp();
var util = require('../../utils/util.js');
import tips from '../../utils/tips.js'
Page({
  data: {
    userInfo: wx.getStorageSync('userInfo'),
  },
  onLoad: function (options) {
    wx.updateShareMenu({
      withShareTicket: true,
    })
  },
  onReady: function (options) {
    console.log('options', options);
      this.setData({
        room_id: options.room_id
      })
  },
  onShow: function () {
    let that = this;
    that.setData({
      userInfo: wx.getStorageSync('userInfo'),
    })
    // 好友结束PKfriend-end-pk
    wx.request({
      url: app.data.apiurl + "guessipk/friend-end-pk?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
      data: {
        room_id: that.data.room_id,
        guess_type: 'idiom'
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("提示信息:", res);
        var status = res.data.status;
        if (status == 1) {
          that.setData({
            list: res.data.data
          })
        } else {
          console.log(res.data.msg)
        }
      }
    })
  },
  // 保存formid
  formSubmit(e) {
    let that = this;
     util.formSubmit(e);
  },
  // 继续游戏
  starTap(){
      wx.navigateTo({
        url: '../indexs/indexs',
      })
  },
  // 转发群加金币 个人不加
  onShareAppMessage() {
    let that = this;
    let sign = wx.getStorageSync("sign");
    return {
      title: '不服来战',
      path: '/pages/show/show',
      success(res) {
        console.log("shareTickets:", res);
        console.log("shareTickets:", res.shareTickets[0]) // 奇怪为什么 shareTickets 是个数组？这个数组永远只有一个值。
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          complete(res) {
            console.log(res, '分享群请求加金币接口');
            if (res.encryptedData){
              wx.request({
                url: app.data.apiurl + "guessipk/share-add-point?sign=" + sign + '&operator_id=' + app.data.kid,
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
                      point: res.data.data.point + 50
                    })
                    wx.setStorageSync('point', res.data.data.point + 50)
                    tips.success('积分+50');
                  } else {
                    //console.log(res.data.msg)
                    //tips.error(res.data.msg)
                  }
                }
              })
            }
          }

        })
      }
    }
  },
  // show
  resultTap(){
      wx.reLaunch({
        url: '../show/show',
      })
  }

})