Page({
  onLoad: function(options) {
    console.log(options)
    this.setData({
      title: options.title
    })
    wx.navigateTo({
      url: 'newpage?id=1',
      success: res => { },
      fail: err => { },
      complete: _ => { }
    })
  }
})
