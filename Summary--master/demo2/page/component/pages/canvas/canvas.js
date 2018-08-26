Page({
  data: {},
  track: [],
  dirty: false,
  onReady() {
    this.context = wx.createCanvasContext('canvas')
    this.drawInternal = setInterval(_ => {
      if (!this.dirty) return
      for (var i in this.track) {
        let touch = this.track[i]
        this.drawBall(touch.x, touch.y)
      }
      wx.drawCanvas({
        canvasId: 'canvas',
        actions: this.context.getActions()
      })
      this.dirty = false
    }, 50)
  },
  clear() {
    this.track.length = 0
    this.dirty = true
  },
  onMove(e) {
    var touch = e.touches[0]
    this.track.push(touch)
    this.dirty = true
  },
  drawBall(x, y) {
    let context = this.context
    context.beginPath(0)
    context.arc(x, y, 2, 0, Math.PI * 2)
    context.setFillStyle('#eb6587')
    context.setStrokeStyle('rgba(1,1,1,0)')
    context.fill()
    context.stroke()
  },
  onUnload() {
    clearInterval(this.drawInternal)
  }
})
