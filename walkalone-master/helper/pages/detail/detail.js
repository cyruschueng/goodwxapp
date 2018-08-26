// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //console.log(options)
      var url = ''
      var id = options.id
      //console.log(id)
      switch(id){
        case 'php':
          url = 'https://docs.51tui.vip/php-chunked-xhtml/index.html';
          break;
        case 'java1.8':
          url = 'https://docs.51tui.vip/docs/';
          break;
        case 'java1.6':
          url = 'https://docs.51tui.vip/html/zh_CN/api/';
          break;
		    case 'mysql5.1':
		      url = 'https://docs.51tui.vip/mysql5.1_zh_CN/';
          break;
        case 'mysql5.7':
          url = 'https://docs.51tui.vip/mysql-5.7-en/';
          break;
        default:
          break;
      }
      //console.log(url)
      this.setData({
        src:url
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