var app = getApp()
Page({


  data: {
    data:{
      cash:0,
      order:0,
      pack:0
    }
  },

  
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单中心',
    })
  },


  onShow: function () {
    this.setData({
      userphone: app.globalData.userphone,
      memberId: app.globalData.memberId
    })
    this.getcountPending()
  },

  onHide: function () {
  
  },

  toLogin: function () {
    wx.navigateTo({
      url: '/page/login/index',
    })
  },

  //待处理会员订单数
  getcountPending(){
    app.commonAjax('/miniapp/cat/order/countPending', ['memberId'], {}, (res) => {

      this.setData({
        data:res.data.data
      })

      

    }, app.globalData, 'get')
  }
})