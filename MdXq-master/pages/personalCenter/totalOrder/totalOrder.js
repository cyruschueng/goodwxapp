// pages/personalCenter/totalOrder/totalOrder.js
var app=getApp();
var baseUrl = app.globalData.baseUrl;
var imgUrl = app.globalData.imgUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topNavInfoArr: [
      {
        topNavInfoName: '待付款'
      },
      {
        topNavInfoName: '待发货'
      },
      {
        topNavInfoName: '待收货'
      },
      {
        topNavInfoName: '全部订单'
      }
    ],
    currentID:0,
    customer_id:0,
    orderListInfo:[],
    orderDetail:[],
    orderDetailLength:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that=this;
      wx.getStorage({
        key: 'orderDetailsID',
        success: function(res) {
          that.setData({
            currentID:res.data
          })
          wx.getStorage({
            key: 'customer_id',
            success: function (res) {
              that.setData({
                customer_id: res.data
              })
              if (that.data.currentID == 0) {
                // 获取待付款
                var orderListUrl = baseUrl + '/api/order/query-list?_query.customer_id=' + that.data.customer_id + '&_query.payment_state=2' + '&_query.order_state=1';
                that.getOrderListInfo(orderListUrl)
              } else if (that.data.currentID == 1) {
                // 获取待发货
                var orderListUrl = baseUrl + '/api/order/query-list?_query.customer_id=' + that.data.customer_id + '&_query.payment_state=1&_query.logistics_state=3';
                that.getOrderListInfo(orderListUrl)
              } else if (that.data.currentID == 2) {
                // 获取待收货
                var orderListUrl = baseUrl + '/api/order/query-list?_query.customer_id=' + that.data.customer_id + '&_query.payment_state=1&_query.logistics_state=1';
                that.getOrderListInfo(orderListUrl)
              } else {
                // 获取全部订单列表
                var orderListUrl = baseUrl + '/api/order/query-list?_query.customer_id=' + that.data.customer_id;
                that.getOrderListInfo(orderListUrl)
              }
            },
          })
        },
      })
  },
  // 待付款页面取消订单
  cancleOrder(e){
    console.log(e)
    var that=this;
    var order_id = e.currentTarget.dataset.order_id
    var url = baseUrl + '/api/order/cancel?order_id=' + order_id
    wx.request({
      url: url,
      success(res) {
        console.log(res)
        if (res.data.success) {
          // 获取待付款
          var orderListUrl = baseUrl + '/api/order/query-list?_query.customer_id=' + that.data.customer_id + '&_query.payment_state=2' + '&_query.order_state=1';
          that.getOrderListInfo(orderListUrl)
        } else {
          wx.showToast({
            title: '取消订单失败',
          })
        }
      }
    })
    
  },
  // 提醒发货点击事件
  goRemind(e){
    var that=this;
    var order_id = e.currentTarget.dataset.order_id
    var RemindUrl = baseUrl + '/api/order/remind?order_id=' + order_id;
    wx.request({
      url: RemindUrl,
      success(res) {
        console.log(res)
        if (res.data.success) {
            // 获取待发货
          var orderListUrl = baseUrl + '/api/order/query-list?_query.customer_id=' + that.data.customer_id + '&_query.payment_state=1&_query.logistics_state=3';
            that.getOrderListInfo(orderListUrl)
        }
      }
    })
  },
  // 待付款页面付款点击事件
  pay(e){
    console.log(e)
  },
  // 待收货确认收货点击事件
  confirmReceipt(e){
    console.log(e)
    var that=this;
    var order_id = e.currentTarget.dataset.order_id
    var url = baseUrl + '/api/order/confirm-receipt?order_id=' + order_id
    wx.request({
      url: url,
      success(res){
        console.log(res)
        if(res.data.success){
          // 获取待收货
          var orderListUrl = baseUrl + '/api/order/query-list?_query.customer_id=' + that.data.customer_id + '&_query.payment_state=1&_query.logistics_state=1';
          that.getOrderListInfo(orderListUrl)
        }else{
          wx.showToast({
            title: '确认收货失败',
          })
        }
      }
    })
  },
  // 点击导航事件
  goSelectNav: function (e) {
    var currentID = e.currentTarget.dataset.currentid;
    var that=this;
    this.setData({
      currentID: currentID,
      orderListInfo:[]
    })
    if (this.data.currentID==3){
      // 获取全部订单列表
      var orderListUrl = baseUrl + '/api/order/query-list?_query.customer_id=' + that.data.customer_id;
      this.getOrderListInfo(orderListUrl)
    } else if (this.data.currentID == 2){
      // 获取待收货
      var orderListUrl = baseUrl + '/api/order/query-list?_query.customer_id=' + that.data.customer_id +'&_query.payment_state=1&_query.logistics_state=1';
      this.getOrderListInfo(orderListUrl)
    } else if (this.data.currentID == 1) {
      // 获取待发货
      var orderListUrl = baseUrl + '/api/order/query-list?_query.customer_id=' + that.data.customer_id + '&_query.payment_state=1&_query.logistics_state=3';
      this.getOrderListInfo(orderListUrl)
    }else{
      // 获取待付款
      var orderListUrl = baseUrl + '/api/order/query-list?_query.customer_id=' + that.data.customer_id + '&_query.payment_state=2' + '&_query.order_state=1';
      // console.log(orderListUrl)
      this.getOrderListInfo(orderListUrl)
    }
  },
  // 获取订单列表信息方法
  getOrderListInfo(url){
    var that=this;
    wx.request({
      url: url,
      success(res){
        if(res.data.success){
          // console.log(res.data)
          var data = res.data.result.rows;
          for(var i=0;i<data.length;i++){
            for (var j = 0; j < data[i].orderDetail.length;j++){
              data[i].orderDetail[j].mallProduct.exhibition = imgUrl + data[i].orderDetail[j].mallProduct.exhibition;
              that.setData({
                orderDetail: data[i].orderDetail,
                orderDetailLength: that.data.orderDetail.length
              })
            }
          }
          // console.log(that.data.orderDetail)
          that.setData({
            orderListInfo: data
          })
          // console.log(that.data.orderListInfo)
        }else{
          // wx.showModal({
          //   title: '提示',
          //   content: '暂无数据',
          // })
        }
      },
      fail(error){
        console.log(error)
      }
    })
  },
  // 取消订单点击事件
  cancleOrder(e) {
    var that=this;
    var order_id = e.currentTarget.dataset.order_id
    var url = baseUrl + '/api/order/cancel?order_id=' + order_id
    wx.request({
      url: url,
      success(res) {
        console.log(res)
        if (res.data.success) {
          // 获取待付款
          var orderListUrl = baseUrl + '/api/order/query-list?_query.customer_id=' + that.data.customer_id + '&_query.payment_state=2' + '&_query.order_state=1';
          that.getOrderListInfo(orderListUrl)
        }
      }
    })
  },
  // 点击去订单详情
  goOrderDetail(e){
    // console.log(e)
    var order_id = e.currentTarget.dataset.order_id;
    var currentID = e.currentTarget.dataset.currentid;
    var state = e.currentTarget.dataset.state;
    // console.log(currentID)
    wx.navigateTo({
      url: '../orderDetail/orderDetail?order_id=' + order_id + '&currentID=' + currentID + '&state=' + state
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
  
  }
})