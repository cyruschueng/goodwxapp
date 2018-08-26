const host = require('../../utils/data.js').host;
const app_recover_share_icon = require('../../utils/data.js').app_recover_share_icon;

const app = getApp();
Page({
  data: {

  },
  onLoad() {
    new app.WeToast();//加载错误提示框
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  receiptShareSuccess: function (ticket, iv, encryptedData) {
      var paramVal={
        'openId':wx.getStorageSync('openId')
      }
      if (ticket) {
        paramVal.groupOpenId = ticket
      }
      if (iv) {
        paramVal.iv = iv
      }
      if (encryptedData) {
        paramVal.encryptedData = encryptedData
      }

      var that = this;
      wx.request({
        url: host + '/api/fromShare', // 目标服务器 url
        dataType: 'json',
        method: 'POST',
        data: paramVal,
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'token':wx.getStorageSync("token")
        },
        success: (res) => {
          console.log(res);
          if(res.data.error == 0){
            that.wetoast.toast({
                title: res.data.msg,
                duration: 2000
            })
          }else{
            // 回执失败
            if (res.data.msg) {
              that.wetoast.toast({
                  title: res.data.msg,
                  duration: 2000
              })
            }
          }
        },
        fail: (res) => {

        },
        complete: (res) => {
          //wx.hideLoading();
        }
      });
    },
    onShareAppMessage: function () {
      var openId = wx.getStorageSync('openId');
      var that = this;
      var title = '['+wx.getStorageSync('nickName')+"@我"+']'+'你有一款王者荣耀皮肤可以免费领取！赶紧去领取!'
      return {
        title: title,
        imageUrl: app_recover_share_icon,
        path: '/pages/index/index?recommendOpenId=' + openId,
        success: function(res) {
          // 转发成功
          console.log(res)
          var tickets = res.shareTickets
          if (tickets.length>0) {
            var firstTicket = tickets[0]
            wx.getShareInfo({
              shareTicket: firstTicket,
              success: (res) => {
                console.log(res)
                that.receiptShareSuccess(firstTicket, res.iv, res.encryptedData)
              },
            })

          }
        },
        fail: function(res) {
          // 转发失败
          console.log(res)
        }
      }
    },
});
