// pages/detail/ivList.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ivList:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var cate_id = options.id;
      wx.request({
        url: app.globalData.apiDomain+'/smallContent/ivList',
        data: { 'id': cate_id, 'token': wx.getStorageSync('token') },
        success: res => {
           this.setData({'ivList':res.data.msg})
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
  
  },
  jumpToNewPage: function (e) {
    //console.log(e)
    var id = e.currentTarget.id
    //console.log(id)
    wx.navigateTo({
      url: '/pages/detail/interview?id=' + id
    })
  },
})