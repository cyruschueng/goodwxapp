// pages/test/extras/extras.js

var initData = 'this is first line \n this is second line'
var extraLine = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {

    /// icon
    iconSize: [20, 30, 40, 50, 60, 70],
    iconColor: [
      'red', 'orange', 'yellow', 'green', 'rgb(0,255,255)', 'blue', 'purple'
    ],
    iconType: [
      'success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search', 'clear'
    ],

    /// 文本
    text: initData,

    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px; color: red;'
      },
      children: [{
        type: 'text',
        text: 'Hello World!'
      }]
    }],
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
  
  },

  /// custom method
  /**
   * 添加一行文字
   */
  add: function (e) {
    extraLine.push("other line.")
    this.setData({
      text: initData + '\n' + extraLine.join('\n')
    })
  },

  /**
   * 移除一行文字
   */
  remove: function (e) {
    if (extraLine.length > 0) {
      extraLine.pop();
      this.setData({
        text: initData + '\n' + extraLine.join('\n')
      })
    }
  },
})