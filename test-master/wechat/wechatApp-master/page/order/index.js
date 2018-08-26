var app = getApp()
Page({

  data: {
    OrderList:{},
    shopId: '',
    bizId: '',
    memberId: 0,
    thirdSession:''
    
  },
  onShow:function(){
    wx.setNavigationBarTitle({
      title: '全部订单'
    })
    var that = this;
    that.getOrderList()

    
  },

  //获取订单列表
  getOrderList:function(){
    var that = this;

    app.commonAjax('cat/bookMenu/order/list', ['shopId', 'memberId'], {}, function (res) {
      
      that.setData({
        OrderList: res.data.data
      })

    }, app)

  },

  //跳转到详情页
  gominiDetail: function(e){
    var dataset = e.currentTarget.dataset;
    wx.navigateTo({
      url: '/page/order/miniDetail/index?id=' + dataset.id + '&orderstatus=' + dataset.orderstatus 
    })
  }
})