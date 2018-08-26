// pages/order-details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_state_img:'/image/noPay.png',
    order_state_title:'待付款',
    order_state_explain:'请与24小时内付款，超时订单将自动关闭',
    logistics:'暂无物流信息',


    address_empty: false,
    name: '张三李四',
    phone: '110110110',

    goods_list_title: '商品信息',
    items: [
      { url: '/image/2.jpg', goods_title: '酒店名称208', goods_price: '20.00', sale_volume: '22' },
      { url: '/image/2.jpg', goods_title: '酒店名称337', goods_price: '20.00', sale_volume: '22' },
    ],
    hotel_time:'2017-12-12 12:10:20',
    leave_time: '2017-12-12 12:10:20',
    goods_totalPrice: '40.88',
    discount:'0',
    totalPrice: '40.88',
    remarks:'备注内容备注内容'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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