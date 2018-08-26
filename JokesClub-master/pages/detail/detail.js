// pages/detail/detail.js
Page({
  data: {
  
  },
  onLoad: function (options) {
    console.log("wozai dandudainji")
    console.log(options)
    this.setData({
      url:options.url,
      height:options.height,
      width:options.width
    })
  },
})