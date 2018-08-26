// pages/shop/shop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ baseUrl: app.globalData.apiBase })
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    console.log('下拉刷新事件,功能占时不能用')
  },
  onReachBottom: function () {
    //console.log('上拉触底事件')
  },
  onShareAppMessage: function () {
  //  console.log('分享的消息')
    /**/return {
      title: '自定义转发标题',
      path: '/page/user?id=123'
    }
  },
  onPageScroll(){
   //console.log('滚动事件。')
  }
})