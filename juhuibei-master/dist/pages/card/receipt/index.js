import api from '../../../api/api_v1.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wedding_list: [],
    sum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let card_id = options.card_id;
    if (card_id) {
      this.getWeddingList(card_id);
    }
    
  },

  getWeddingList: function (card_id) {
    var that = this;
    api.getWeddingList({
      query: {
        card_id: card_id
      },
      success: (res) => {
        if (res.data.res === 0) {
          that.setData({
            wedding_list: res.data.data.wedding_list,
            sum: res.data.data.sum
          })
        }
      }
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