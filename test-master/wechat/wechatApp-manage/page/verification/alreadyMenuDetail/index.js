// page/verification/ alreadyMenuDetail/index.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalOrderId: '',
    orderMenuList:'',
    totalOrder:'',
    deskId:'',
    deskNo:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      totalOrderId: options.totalOrderId,
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
  onShow:function(){
    app.commonAjax('/shop/manage/order/selectTotalOrder', [], { totalOrderId: this.data.totalOrderId}, (res) =>    {
      if(res.data.code==0){
        var orderMenuList = res.data.data.orderMenuList
        var totalOrder = res.data.data.totalOrder
        var deskId = res.data.data.totalOrder.deskId
        var deskNo = res.data.data.totalOrder.deskNo
        var orderShopId = res.data.data.totalOrder.orderShopId
        this.setData({
          totalOrder: totalOrder,
          orderMenuList:orderMenuList,
          deskId: deskId,
          deskNo: deskNo
          
        })
      }
    }, app, 'post')  
  },
  gopay(){
    wx.navigateTo({ url: "/page/pay/index?deskId=" + this.data.deskId + "&deskNo=" + this.data.deskNo })
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