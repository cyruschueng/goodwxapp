const app = getApp()

Page({
  data: {
    geters: [],
    edit: false,
    editText: '编辑',
    current: true
  },
  addUser: function () {
    wx.navigateTo({
      url: 'addUser'
    })
  },
  modify: function (e) {
    var self = this
    wx.navigateTo({
      url: 'addUser?id=' + e.currentTarget.id + '&x=' + e.currentTarget.dataset.x + '&m=' + e.currentTarget.dataset.m + '&phone=' + e.currentTarget.dataset.phone + '&email=' + e.currentTarget.dataset.email
    })
  },
  del: function (e) {
    var self = this
    wx.request({
      url: app.globalData.apiURL + '/buyer/del',
      header: {
        memberId: wx.getStorageSync('memberid'),
        token: wx.getStorageSync('token'),
      },
      data: { buyerId: e.currentTarget.id },
      method: 'POST',
      success: function (res) {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 1000
        })
        self.onLoad()
      }
    })
  },
  onLoad: function (options) {
    var self = this
    wx.request({
      url: app.globalData.apiURL + '/buyer/list',
      header: {
        memberId: wx.getStorageSync('memberid'),
        token: wx.getStorageSync('token'),
      },
      success: function (res) {
        self.setData({
          geters: res.data.result,
        })
      }
    })
    wx.setNavigationBarTitle({
      title: '取票人信息'
    })
  },
  editUser: function () {
    if (this.data.editText == '编辑') {
      this.setData({
        edit: true,
        editText: '取消'
      })
    } else {
      this.setData({
        edit: false,
        editText: '编辑'
      })
    }
  },
  choosegeter: function (e) {
    if (!this.data.edit) {
      wx.setStorageSync('geter', e.currentTarget.dataset.info)
      app.globalData.geter = e.currentTarget.dataset.info
      let pages = getCurrentPages();
      let j = 0
      for (var i=pages.length-2; i>=0; i--) {
        j += 1
        if (pages[i].route == "pages/payticket/orderDetail") { break }
      }
      wx.navigateBack({ delta: j })
    }
  }
})
