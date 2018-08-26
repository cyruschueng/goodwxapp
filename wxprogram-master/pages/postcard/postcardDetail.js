const app = getApp();
Page({
  data: {
    pic: "",
    info: "",
    day: "",
    mon: "",
    mark: "",
    userInfo: '',
    isEdit: false,
    isShare: true
  },
  editText: function () {
    this.setData({
      isEdit: true
    })
  },
  postcardShare: function (e) {
    if (this.data.isShare) {
      this.setData({
        isShare: false
      })
      var fr = 'foo'//e.detail.value.from
      var to = 'bar'//e.detail.value.to
      var content = e.detail.value.content
      var pic = e.detail.value.pic
      var mark = e.detail.value.mark
      const self = this
      wx.request({
        url: app.globalData.apiURL + '/memberPostcard/add',
        header: {
          memberId: wx.getStorageSync('memberid'),
          token: wx.getStorageSync('token'),
        },
        data: {
          pic: pic,
          postmark: mark,
          detail: content,
          fr: fr,
          t: to
        },
        method: 'POST',
        success: function (res) {
          wx.navigateTo({
            url: 'postcardShare?pic=' + res.data.result
          })
        }
      })
      wx.showLoading({
        title: "正在生成中...",
        success: function () {
          setTimeout(function () {
            wx.hideLoading({
              success: function () { }
            })
          }, 10000)
        }
      })
    }  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    // console.log(option.pic);
    const self = this
    var t = new Date()
    self.setData({
      userInfo: app.globalData.userInfo,
      mark: option.mark,
      pic: option.pic,
      info: option.info,
      day: t.getDate(),
      mon: t.getMonth()+1 + "." + t.getFullYear()
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