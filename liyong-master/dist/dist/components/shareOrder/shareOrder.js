Component({
  properties: {
    shareOrder: {
      type: Object
    }
  },

  methods: {
    previewImage (event) {
      const { index } = event.target.dataset
      const { imgs } = this.data.shareOrder.shareOrder
      wx.previewImage({
        current: imgs[index], // 当前显示图片的http链接
        urls: imgs // 需要预览的图片http链接列表
      })
    }
  }
})
