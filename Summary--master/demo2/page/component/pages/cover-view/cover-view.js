// page/component/pages/cover-view/cover-view.js
Page({
  data:{
    playing:false,
    playProgressText:"00:00"
  },
  play() {
    this.videoCtx.play()
  },
  pause() {
    this.videoCtx.pause()
  },
  onReady() {
    this.videoCtx = wx.createVideoContext('myVideo')
  },
  onPause() {
    this.setData({
      playing: false
    })
  },
  onPlay(){
    this.setData({
      playing: true
    })
  },
  onTimeUpdate(e){
    // console.log(e)
    // 直接拿到的currentTime单位是秒
    let cur = Math.round(e.detail.currentTime)+""
    let duration = Math.round(e.detail.duration)+""
    if (cur.length == 1) cur = "0"+cur
    if (duration.length == 1) duration = "0" + duration

    this.setData({
      playProgressText: cur+"/"+duration
    })
  }
})