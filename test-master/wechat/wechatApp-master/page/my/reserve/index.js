var app = getApp()
Page({
  data: {
    ReserveList:{}
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.getReserveList()
  },

  //获取预约列表
  getReserveList:function(){
      var that = this;
      var subdata = { shopId: 6, memberId: 1 };
      wx.request({
        url: 'https://lingju360.natappvip.cc/miniapp/cat/reserve/queueList',
        data: subdata,
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        method: 'post',
        success: function (res) {
          console.log('--------------返回数据')
          console.log(res.data.data)
          that.setData({
            ReserveList:res.data.data
          })
          wx.hideLoading()
        }
      })
  },

  //跳转到详情页
  gominiReserve: function (e) {
    var dataset = e.currentTarget.dataset;
    wx.navigateTo({
      url: '/page/order/miniDetail/index?id=' + dataset.id
    })
  }
  
})