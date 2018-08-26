const host = require('../../utils/data.js').host;
const app_recover_share_icon = require('../../utils/data.js').app_recover_share_icon;

const app = getApp();
Page({
  data: {
    avatarUrl:wx.getStorageSync('avatarUrl'),
    nickName:wx.getStorageSync('nickName'),
    resultShow:true,
    qaIndex:""
  },
  onLoad(e) {
    wx.showShareMenu({
      withShareTicket: true
    })
    new app.WeToast();//加载错误提示框
    console.log(e)
    var qaIndex = e.qaIndex;
    this.setData({
      qaIndex:qaIndex
    })

    wx.playBackgroundAudio({
      dataUrl: 'http://7xq41n.com1.z0.glb.clouddn.com/%E5%A4%B1%E8%B4%A5%20%E9%9F%B3%E6%95%88%20%E5%8A%A0%E9%80%9F%E8%BF%87%E7%9A%84%20%E7%94%A8%E8%BF%99%E4%B8%AA.mp3',
      title: '',
      coverImgUrl: ''
    })
  },
  returnIndex:function(){
    wx.switchTab({
      url:"/pages/index/index"
    })
  },
  continue:function(){
    wx.showLoading();
    var param={
      'openId':wx.getStorageSync('openId')
    }
    wx.request({
      url: host + '/api/getChallengeInfo', // 目标服务器 url
      dataType: 'json',
      method: 'POST',
      data: param,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token':wx.getStorageSync('token')
      },
      success: (res) => {
        var res = res.data;
        var challengeHaveCount = res.data.challengeHaveCount;
        if(challengeHaveCount>0){
          wx.redirectTo({
            url: '/pages/ready/ready'
          })
        }else{
          this.wetoast.toast({
              title: "今天挑战机会已用完，请明天再来！",
              duration: 2000
          })
        }
      },
      fail: (res) => {

      },
      complete: (res) => {
        wx.hideLoading();
      }
    });
  },
  findGzh:function(){
    this.setData({
      dialog_gzhShow:true
    })
  },
  hideDialog:function(){
    this.setData({
      dialog_gzhShow:false
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
