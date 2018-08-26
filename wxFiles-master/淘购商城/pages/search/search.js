// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    like: '#',
    list: [],
    loading: false,
    record: [],
    showRecord: false,
    pageModel: {
      pageIndex: 1,
      pageSize: 10,
      recordCount: 1
    }

  },
  searchInput: function (e) {
    var key = e.detail.value;
    if (key == '') {
      key = '#'
    }
    this.setData({
      like: key
    })
    this.getRecord();
    this.getGoods(0);
  },
  focus() {
    this.setData({ showRecord: true })
  },
  blur() {
    this.setData({ showRecord: false })
  },
  clearRecord: function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '清空将无法找回记录，是否继续?',
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync("record", []);
          that.getRecord()
        }
      }
    })
  },
  recSearch(e) {
    this.setData({ like: e.currentTarget.dataset.item })
    this.getGoods(0)
  },
   //获得历史记录
  getRecord: function (e) {
    if (wx.getStorageSync("record")) {
      this.setData({
        record: wx.getStorageSync("record")
      })
    }
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