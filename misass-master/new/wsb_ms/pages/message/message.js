// pages/message/message.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgArr:[
      {'explain': '江纯与2018-01-18 18:20创建车牌号为粤132456粤A123456挂从"广东省-东莞市-南城区"到"广东省-广州市-花都区" ,货物价值为10000元的保单,保费为25元', 'number': 'WSB1000010001', 'state': '代付款', 'data':'2018-01-18 18:24'},
      {'explain': '江纯与2018-01-18 18:20创建车牌号为粤132456粤A123456挂从"广东省-东莞市-南城区"到"广东省-广州市-花都区" ,货物价值为10000元的保单,保费为15元', 'number': 'WSB1000010001', 'state': '已付款', 'data': '2018-01-25 18:24'},
      {'explain': '江纯与2018-01-18 18:20创建车牌号为粤132456粤A123456挂从"广东省-东莞市-南城区"到"广东省-广州市-花都区" ,货物价值为10000元的保单,保费为20元', 'number': 'WSB1000010001', 'state': '到付款', 'data': '2018-02-18 18:24' },
      {'explain': '江纯与2018-01-18 18:20创建车牌号为粤132456粤A123456挂从"广东省-东莞市-南城区"到"广东省-广州市-花都区" ,货物价值为10000元的保单,保费为35元', 'number': 'WSB1000010001', 'state': '已付款', 'data': '2018-03-18 18:24'}
      ]
  },

  massage_view:function(e){
    console.log(e.currentTarget.dataset);
    app.globalData.payTypeName = '查看详情';
    let payTypeName = app.globalData.payTypeName;
    wx.switchTab({
      url: '../list/list',
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