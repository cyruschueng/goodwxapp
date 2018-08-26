// pages/self/order/order.js
const app = getApp();
var pages = 1;
Page({
  data: {
    orderlist:[],
    shop_id:0,
    tabindex:5,
    msgtext: true,
    ordershow:false,
    ordersum:0,
  },
  onLoad: function (options) {
    this.setData({
      shop_id: options.shop_id
    })
    this.getUserOrderInfo(pages, this.data.tabindex);
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
      pages=1;
      this.getUserOrderInfo(pages, this.data.tabindex,true);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      // pages++;
      // this.getUserOrderInfo(pages, this.data.tabindex);
  },
  changeType: function (e) {
      this.getUserOrderInfo(pages, e.currentTarget.dataset.index);
      this.setData({
        tabindex: e.currentTarget.dataset.index
      })
  },
  //获取用户订单信息
  getUserOrderInfo: function (page,stat,msg) {
      /*
          @ stat:5 //全部
          @ stat:0 //待付款
          @ stat:1 //支付成功
          @ stat:2 //待发货
          @ stat:3 //退款
      */
      var that = this;
      wx.request({
          url: app.globalData.url + '/ordermanage/orders/myorders',
          method: 'get',
          data: {
            user_id: app.globalData.user_id,
            page: page,
            shop_id: that.data.shop_id,
            status: stat,//订单状态
            size: 30,
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            if (res.data.errcode == 0) {
              if (res.data.data.length != 0){
                for (var i = 0; i < res.data.data.arr.length;i++){
                    that.setData({
                      ordersum: res.data.data.arr[i].goods_info.length
                    })
                }
                that.setData({
                    orderlist: res.data.data.arr,
                    ordershow:false,
                    msgtext:true,
                })
              }else{
                that.setData({
                    ordershow: true,
                    msgtext:false,
                })
              }
              if (msg==true){
                setTimeout(function () {
                  that.viewmsg("刷新成功");
                  wx.stopPullDownRefresh();
                }, 1000)
              }
            }else{
                that.viewmsg("网络错误");
            }
          }
      })
    
  },
  //删除订单
  delorder:function(e){
      var that = this;
      wx.request({
        url: app.globalData.url + '/ordermanage/orders/delorders',
        method: 'post',
        data: {
          order_id: e.currentTarget.dataset.id,
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res){
            if (res.data.errcode==0){
                that.viewmsg("删除成功");
                this.getUserOrderInfo(pages, this.data.tabindex);
            }
        }
      })
  },
  viewmsg:function(e){
    wx.showToast({
      title: e,
      icon: 'success',
      duration: 1000
    })
  }
})