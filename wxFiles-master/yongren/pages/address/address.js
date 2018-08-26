var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    uid:""
  },
  delAddress: function (e) {
    wx.showModal({
      title: '提示',
      content: '确定删除？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.api + 'deleteAddressForApp.do',
            data: {
              id: e.currentTarget.dataset.id,
            },
            success: function (res) {
              wx.redirectTo({
                url: '/pages/address/address',
              })
            }
          })
        } 
      }
    })
    
  },
  navToAddressAdd: function (e) {
    wx.navigateTo({
      url: '/pages/address/addressAdd/addressAdd?sets=' + e.currentTarget.dataset.sets,
    })
  },
  onLoad: function (options) {
    var that = this
    this.setData({
      uid: wx.getStorageSync("userInfo").data.id
    })
    
    var uid = that.data.uid
    console.log("uid"+ uid)
    if (that.data.uid == "") {
      uid = wx.getStorageSync("userInfo").data.id
    }
    wx.request({
      url: app.globalData.api + 'getAddressForApp.do',
      method: 'get',
      data: {
        uid: uid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          list: res.data
        })
      },
      fail: function (res) {

      }
    })
  },

  onReady: function () {

  },

  onShow: function () {
    var that = this
    
    
  },

  onHide: function () {

  },

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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  }
})