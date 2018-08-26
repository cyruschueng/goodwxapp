// postcard.js
const app = getApp();

Page({
  data: {
    postcard: {},
  },
  postcardDetail: function (event) {
    wx.navigateTo({
      url: 'postcardDetail?pic=' + event.currentTarget.dataset.pic + '&info=' + event.currentTarget.dataset.info + '&mark=' + this.data.postcard.postmark
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    //getcityid TBD
    const self = this
    wx.request({
      url: app.globalData.apiURL + '/postcard/list?cityId=' + app.globalData.cityid,
      success: function (res) {
        // console.log(res)
        //console.log(res.data.result.postcardList)
        self.setData({
          postcard: res.data.result,
        })
      }
    })
    wx.setNavigationBarTitle({
      title: '明信片'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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