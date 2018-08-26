Page({
  data: {},
  onReady(e) {
    var ctx = wx.createCanvasContext('firstCanvas')
    ctx.moveTo(10, 10)
    ctx.lineTo(100, 10)
    ctx.lineTo(100, 100)
    ctx.fill()
    ctx.draw()
  }
})
