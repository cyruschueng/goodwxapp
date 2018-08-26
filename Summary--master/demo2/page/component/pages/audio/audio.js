Page({
  data: {
    playing:false,
    audio: {
      current:0,
      duration:0,
      poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
      name: '此时此刻',
      author: '许巍',
      src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
    }
  },
  onReady(e) {
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  onPlay(){
    this.setData({
      "playing": true
    })
  },
  onStop() {
    this.setData({
      "playing": false
    })
  },
  seek(e){
    var cur = Math.round(e.detail.value)
    // console.log(cur)
    this.audioCtx.seek(cur)
  },
  onTimeUpdate(e){
    this.setData({
      "audio.current": Math.round(e.detail.currentTime),
      "audio.duration": Math.round(e.detail.duration)
    })
  },
  play() {
    var playing = this.data.playing
    if (playing){
      this.audioCtx.pause()
    }else{
      this.audioCtx.play()
    }
  },
  restart() {
    this.audioCtx.play()
    this.audioCtx.seek(0)
  }
})