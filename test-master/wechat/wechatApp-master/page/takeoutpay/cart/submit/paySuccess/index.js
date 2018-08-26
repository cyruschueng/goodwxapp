// page/takeaway/submit/paySuccess/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:'',
    all:'',
    sumprice:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    console.log(option)
    this.setData({
      all:option.all,
      sumprice: option.sumprice
    })
    this.getData(option.id, option.deskId)
    this.print(option.id, option.deskId)
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
  
  },

//打印
  print: function (id, deskId){
    var that = this;
    var subdata = {};
    subdata.billsLogId = id
    subdata.deskId = deskId
    app.commonAjax('cat/print/printMiniBilllog', [], subdata, function (res) {


    }, app)
  },

//获取订单详情
  getData:function(id){
    var that = this;
    var subdata = {};
    subdata.billsLogId = id
    app.commonAjax('cat/bookMenu/order/miniDetail', [], subdata, function (res) {

      console.log(res.data.data)

      that.setData({
        list: res.data.data
      })

    },app)
  }
})