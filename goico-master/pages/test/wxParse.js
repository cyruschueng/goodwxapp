// pages/test/wxParse.js
var WxParse = require('../../vendor/wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: `
      < !DOCTYPE HTML >
      <div style="margin-top:10px;">
        <h3 style="color: #000;">支持的标签ul/li</h3>
        <blockquote>带有内联的li</blockquote>
        <div style="margin-top:10px;">
          <ul>
            <li style="color: red;">我是li 红色</li>
            <li style="color: blue;">我是li 蓝色</li>
            <li style="color: yelloe;">我是li 黄色</li>
          </ul>
        </div>
      </div>

      <div style="margin-top:10px;">
        <h3 style="color: #000;">支持内联样式style</h3>
        <blockquote>wxParse可以渲染原html带有的style样式</blockquote>
        <div style="margin-top:10px;">
          <span>span标签</span>
          <strong>strong标签</strong>
        </div>
      </div>

      <div>
        <div style="font-size: 26rpx; color: grey">凉茶 网易体育 2017-08-16 14:25</div>
      </div>
    `
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =  this
    WxParse.wxParse('detail', 'md', this.data.article, that, 0)
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