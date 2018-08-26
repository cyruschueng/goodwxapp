// pages/notice/notice.js
const app = getApp()

Page({
  data: {
    userInfo: { 
      //如果没有没有用户授权,默认给出
      //avatarUrl:'/img/timg.jpg',
      nickName:"马上发财" 
    },
    hasuserInfo:false

  },
  //事件处理函数

  onLoad: function () {
    var thiz =this;
    wx.showShareMenu({
      withShareTicket: true //要求小程序返回分享目标信息
    })
    console.log('1')
      if (app.globalData.userInfo) {
       
          thiz.setData({
            userInfo: app.globalData.userInfo,
            hasuserInfo: true
          })  
        
     
      }
  },

  // 其他的页面函数、生命周期函数等
  onShareAppMessage() {
    return {
      title: '本群排行榜在此，第一竟然是？',
      path: '/pages/index/index',
      success(res) {
        console.log(res.shareTickets[0])   
      }
    }
  },
})