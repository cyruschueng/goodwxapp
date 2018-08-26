// pages/self/index/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
       shop_id:"",
       avatarUrl:"",
       nickName:"",
       order_total:0,//今日成交总额
       views: 0,//今日访客
       orderNum: 0,//今日订单
       dialogmsg: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("店铺id是" + options.shop_id);
    this.setData({
      avatarUrl: app.globalData.userinfo.avatarUrl,
      nickName: app.globalData.userinfo.nickName,
      shop_id: options.shop_id
    })
    if (options.shop_id>0) {

      this.setData({
        shop_id: options.shop_id
      })
        this.refreshShopInfo(this.data.shop_id);
    } else {
      this.setData({
        dialogmsg: false
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //刷新店铺信息
  refreshShopInfo: function (shop_id){
    var that = this;
    wx.request({
      url: app.globalData.url +'/shop/shop/getShopInfo',
      method: 'get',
      data: {
        shop_id: shop_id,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var resdata = res.data.data;
        that.setData({
          order_total: resdata.order_total,//今日成交额
          views: resdata.views,//今日访客
          order_num: resdata.order_num//今日订单
         
        })


      }
    })

  },
  
  publishGoods: function (e) {
    var that = this;
    var shop_id = that.data.shop_id;
    wx.navigateTo({
      url: '/pages/myCenter/shop/publish/publish?shop_id=' + shop_id
    })
  },

  viewOrders: function (e) {
    var that = this;
    var shop_id = that.data.shop_id;
    wx.navigateTo({
      url: '/pages/myCenter/shop/order/order?shop_id=' + shop_id
    })
  },
  ShopSetData:function(){
    var that = this;
    var shop_id = that.data.shop_id;
    wx.navigateTo({
      url: '/pages/myCenter/shop/shopset/shopset?shop_id=' + shop_id
    })
  },
  GoodsAdmin:function(){
    wx.navigateTo({
      url: '/pages/myCenter/shop/GoodsAdmin/GoodsAdmin?shop_id=' + this.data.shop_id
    })
  }
})