// pages/me/children/order/order.js
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
     titles: [
       { id: 0, title: '全部' },
       { id: 1, title: '待付款' },
       { id: 2, title: '已付款' },
       { id: 3, title: '待收货' },
       { id: 4, title: '待评价' },
     ],
     tabList:[
       { id: 0, isHaveData: true },
       { id: 1, isHaveData: true },
       { id: 2, isHaveData: false },
       { id: 3, isHaveData: false },
       { id: 4, isHaveData: false }
     ],
    // 当前选中的标签
     currentTab:0,
    // 页面高度
     screenHeight:0
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    //系统信息
    wx.getSystemInfo({
      success: function(res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        that.setData({
          screenHeight:clientHeight * rpxR - 90,
        })
      },
    })

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

  // tab点击
  switchTab: function (e) {
    var id = e.currentTarget.dataset.id;
    that.setData({
      currentTab:id
    })
  },

  // 滑动
  switchTabContent: function (e) {
    that.setData({
      currentTab:e.detail.current
    })
  },
  
  //订单详情
  orderDetailAction(){
     wx.navigateTo({
       url: '../orderDetail/orderDetail',
     })
  }
})