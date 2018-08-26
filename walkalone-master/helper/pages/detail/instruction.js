// pages/detail/instruction.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    instruction:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type = options.type
    switch(type){
      case 'iv':
        this.setData({ 'instruction':'所有的面试宝典试题都转载自网络，并会在详情页上标明出处。如果您觉得该转载对您的权益造成了损害，请及时联系客服进行删除处理'})
        break;
      case 'tool':
        this.setData({ 'instruction': '所有的计算结果仅供参考' })
        break;
      default:
        break;
    }
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