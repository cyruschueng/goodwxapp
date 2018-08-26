let app = getApp();
Page({
  data: {
    timeNum: 5,
  },
  onLoad() {
    if(app.globalData.userInfo){
      wx.redirectTo({
        url: '/pages/themePage/themePage',
      })
    }
  }
})