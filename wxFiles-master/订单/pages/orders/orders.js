// pages/orders/orders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkedAll:false,
    barList:[
      {label:'待付款',value:1,active:true},
      { label: '待发货', value: 2, active: false },
      { label: '待收货', value: 3, active: false },
      { label: '退货', value: 4, active: false },
      { label: '已完成', value: 5, active: false },
    ]
  },
  //初始化导航栏
  inintNavBar: function () {
    for (var item in this.data.barList){
      this.data.barList[item].active = false;
    }
  },
  //更换导航栏
  changeBar: function (e){
    this.inintNavBar();
    var that = this;
    that.data.barList[e.currentTarget.dataset.value].active = true;
    that.setData({
      barList: that.data.barList
    })
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