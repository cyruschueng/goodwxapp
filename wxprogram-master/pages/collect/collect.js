const app = getApp()
Page({
  data: {
      selected: [],
      showedit: true,
      confirmdiag: false,
      noalert: false
  },
  select: function (event) {
    var key = event.currentTarget.id
    if (this.data.showedit) {
      wx.navigateTo({
        url: '../detail/viewDetail?id=' + key,
      })
      return 1
    }
    var news = this.data.selected
    var found = false
    for (var i in news) {
      if (key == news[i]) {
        news.splice(i,1)
        found = true
        break
      }
    }
    if (!found) {
      news.push(key)
    }
    //console.log(news)
    this.setData({
      selected: news
    })
  },
  edit: function () {
    this.setData({
      showedit: false,
    })
  },
  cancel: function () {
    this.setData({
      selected: [],
      showedit: true,
    })
  },
  selectall: function () {
    var news = []
    if (this.data.selected.length == 0) {
      for (var i in this.data.collect) {
        news.push(this.data.collect[i].shop.shopId)
      }
    }
    //console.log(news)
    this.setData({
      selected: news,
    })
  },
  removeCollect: function () {
    if (this.data.noalert) {
      this.sureRemove()
    } else {
      this.setData({
        confirmdiag: true
      })
    }
  },
  cancelDialog: function () {
    this.setData({
      confirmdiag: false
    })
  },
  sureRemove: function () {
    var self = this
    //console.log("removeing..." + self.data.selected)
    wx.request({
      url: app.globalData.apiURL + '/collect/del',
      method: 'POST',
      header: {
        memberId: wx.getStorageSync('memberid'),
        token: wx.getStorageSync('token'),
      },
      data: { "shopId": self.data.selected },
      success: function (res) {
        self.setData({
          selected: [],
          confirmdiag: false,
          showedit: true,
        })
        wx.showToast({title: '删除成功'})
        self.onShow()
      }
    })
  },
  checked: function () {
    let that = this;
    this.setData({
      noalert: !that.data.noalert
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    const self = this
    wx.request({
      url: app.globalData.apiURL + '/collect/list',
      header: {
        memberId: wx.getStorageSync('memberid'),
        token: wx.getStorageSync('token'),
      },
      success: function (res) {
        //console.log(res.data.result)
        self.setData({
          collect: res.data.result,
        })
      }
    })
    wx.setNavigationBarTitle({
      title: '我的收藏'
    })  
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