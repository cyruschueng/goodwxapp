// pages/payHtml/payHtml.js
var util = require('../../utils/util.js');  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address_empty:false,
    name:'张三李四',
    phone:'110110110',
    address:'北京故宫四合院中南海天路1号',

    goods_list_title:'洛可可主题酒店',
    items:[
      { url: '/image/2.jpg', goods_title: '经典性餐车', goods_price: '20.00', sale_volume: '22' },
      { url: '/image/2.jpg', goods_title: '经典性餐车', goods_price: '20.00', sale_volume: '22' },
    ],
    freight:'快递包邮',
    goods_totalPrice:'40.88',
    totalPrice:'40.88'
  },


  add_address: function () {
    wx.navigateTo({
      url: '/pages/address-add/address-add',
      success: function (res) { },
    })
  },
  select_address:function(){
    wx.navigateTo({
      url: '/pages/address/address',
      success: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用函数时，传入new Date()参数，返回值是日期和时间  
    var date = util.formatDate(new Date());
    var dateF = util.formatDateF(new Date());
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      time: time,
      date: date,
      dateF: dateF
    }); 
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