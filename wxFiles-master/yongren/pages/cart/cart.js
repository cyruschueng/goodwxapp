// pages/cart/cart.js
Page({
  data: {
    selectDefAll: true,
    selectCliAll: false,
    clickDel: false,
  },
  selectAll: function () {
    if (this.data.selectDefAll == true) {
      this.setData({ selectDefAll: false, selectCliAll: true })
    } else {
      this.setData({ selectDefAll: true, selectCliAll: false })
    }
  },
  bindDel: function () {
    if (this.data.clickDel == true) {
      this.setData({ clickDel: false })
    } else {
      this.setData({ clickDel: true })
    }
  },
  delCart: function () {
    wx.showModal({
      title: '提示',
      content: '您确定要移除这件商品？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})