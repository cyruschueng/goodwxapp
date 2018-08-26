var app = getApp()
Page({
  data: {
    motto: '你好！',
    userInfo: {},
    shopId: '',
    busname: '',
    memberId: ''
  },
  //
  toLogin: function () {
    app.ZZtoLogin()
  },
  onShow: function () {
    this.setData({
      memberId: app.globalData.memberId
    })
  },
  onLoad: function () {
    var that = this

      wx.getUserInfo({
        success:function(res){
          console.log(res)
          that.setData({
            userInfo: res.userInfo
          })
        }
      })
  },

})