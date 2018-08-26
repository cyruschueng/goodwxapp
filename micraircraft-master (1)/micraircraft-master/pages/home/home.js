// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      tempImage:'/images/xiaofeiji.png',
      srcUser:'wation',
      content:'每个孩子\n都有一个飞翔的梦想!\n你真的懂了吗？',
      money:1.5,
      waitTime:5
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //   this.updateTimer()
  },
  updateTimer:function() {
      console.log('updateTimer')
      if (this.data.waitTime <= 0) {
          console.log('页面跳转')
          this.switchTab()
          return;
      }
      var _this = this;

      setTimeout(function () {
          _this.setData({
              waitTime: _this.data.waitTime - 1
          })
          _this.updateTimer()
    }, 1000)
  },
  switchTab: function() {
      wx.switchTab({
          url: '/pages/index/index'
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
      return {
          title: '转发', // 转发标题（默认：当前小程序名称）
          path: '/pages/home/home', // 转发路径（当前页面 path ），必须是以 / 开头的完整路径
          success(e) {
              // shareAppMessage: ok,
              // shareTickets 数组，每一项是一个 shareTicket ，对应一个转发对象
              // 需要在页面onLoad()事件中实现接口
              wx.showShareMenu({
                  // 要求小程序返回分享目标信息
                  withShareTicket: true
              });
          },
          fail(e) {
              // shareAppMessage:fail cancel
              // shareAppMessage:fail(detail message) 
          },
          complete() { }
      }
  }
})