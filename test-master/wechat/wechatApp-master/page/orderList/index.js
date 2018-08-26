var app = getApp()
Page({
  data: {
    shopId: '',
    busname: '',
    memberId: ''
  },
  onShow: function () {
    var that = this;
    this.setData({
      memberId: app.globalData.memberId
    })
    
  },
  //
  toLogin: function () {
    app.ZZtoLogin()
  },
  
})