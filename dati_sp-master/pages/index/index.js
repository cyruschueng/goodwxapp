//index.js
//获取应用实例
const app = getApp()
Page({
  onShareAppMessage: function (res) {
    // if (res.from === 'button') {
    //   // 来自页面内转发按钮
    //   console.log(res.target)
    // }
    return {
      title: '转发到群',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: function (res) {
            wx.request({
              url: app.globalData.server + '/api/Sp/wxDecryptData',
              data:{
                wxid: wx.getStorageSync('wxid'),
                encryptedData: res.encryptedData,
                iv: res.iv,
              },
              success:function(res){
                switch (res.data.msg) {
                  case 'success':
                    wx.navigateTo({
                      url: '/pages/apply/apply',
                    })
                    break;
                  case 'need_reg':
                    wx.navigateTo({
                      url: '/pages/reg/reg',
                    })
                    break;
                  case 'openGId_exists':
                    wx.showToast({
                      title: '此群已被分享',
                      icon:'none'
                    })
                    break;
                  case 'share_used':
                    wx.showToast({
                      title: '您已经获得过一次分享答题的机会',
                      icon: 'none'
                    })
                    break;
                  case 'error':
                    wx.showToast({
                      title: '请稍后重试',
                      icon: 'none'
                    })
                    break;
                }
              }
            })
          }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  
  data: {
    userInfo: {},
    hasUserInfo: false,
  },
  onLoad: function () { 
    wx.showShareMenu({
      withShareTicket: true,
    })
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
      hasUserInfo: wx.getStorageSync('hasUserInfo'),
    })
    // const ctx = wx.createCanvasContext('myCanvas');
    // util.countDown(this, ctx)
  },
  onShow: function () {
    wx.showShareMenu({
      withShareTicket: true,
    })
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
      hasUserInfo: wx.getStorageSync('hasUserInfo'),
    })
    // const ctx = wx.createCanvasContext('myCanvas');
    // util.countDown(this, ctx)
  },
  btnApplyQuestion:function(){
     wx.request({
       url: app.globalData.server + '/api/Sp/spcheck',
       success:function(res){
        console.log(res.data)
        if(res.data.msg == 'need_reg'){
          wx.navigateTo({
            url: '../apply/apply',
          })
        }
       }
     })
    // wx.redirectTo({
    //   url: '../apply/apply',
    // })
  }
})
