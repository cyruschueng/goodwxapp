Page({
  data: {
    video_height: 0
  },
  onLoad(){
    this.setData({
      video_height: wx.getSystemInfoSync()
    })
  }
})
