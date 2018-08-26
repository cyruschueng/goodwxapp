Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderInfo: null,
    paymentType: 0
  },

  // /**
  //  * 订单信息
  //  */
  // orderInfo: {
  //   sender: null,
  //   receiver: null,
  //   commodity: null,
  //   commodityWeight: 1,
  //   remark: '',
  //   expressCompany: null
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // TODO 计算订单价格
    let order = JSON.parse(options.order);
    this.setData({
      orderInfo: order
    });
  },

  /**
   * 支付
   */
  payment: function (event) {
    let orderInfo = this.data.orderInfo;
    // TODO 
    // 1.根据用户身份，获取该用户的支付方式
    // 1.1 如果是在线支付，唤起微信支付组件
    // 1.2 如果是现结或月结，则更新订单状态为待支付-现结/月结，流转到提货环节

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {

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