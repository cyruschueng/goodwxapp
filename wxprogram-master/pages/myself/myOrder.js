var app = getApp()
Page({
  data: {
    orders: [],
    currentTab: 0,
    count: 15
  },
  onLoad: function () {
    const self = this;
    wx.request({
      url: app.globalData.apiURL + '/order/list?pageNumber=1&pageSize=20',
      header: {
        memberId: wx.getStorageSync('memberid'),
        token: wx.getStorageSync('token'),
      },
      success: function (res) {
        //console.log(res)
        self.setData({
          orders: res.data.result.list,
          count: res.data.result.list.length
        })
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        self.setData({
          clientHeight: res.windowHeight
        });
      }
    });
    wx.setNavigationBarTitle({
      title: '我的订单'
    })
  },
  checksuccess: function (e) {
    wx.navigateTo({
      url: '../payticket/paySuccess?orderId=' + e.currentTarget.id
    })
  },
  gopay: function (e) {
    wx.navigateTo({
      url: 'orderDetail?orderId=' + e.currentTarget.id + '&shopId=' + e.currentTarget.dataset.shopid
    })
  },
  buyagain: function (e) {
    wx.navigateTo({
      url: '../payticket/orderDetail?shopid='+e.currentTarget.id
    })
  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})
