// pages/index/audio.js
Page({
data:{
  x:0,
  y:0,
  hidden:true,
  hiddens:false,
  hiddend:true
},
  refresh:function(e){
    wx.startPullDownRefresh()
    this.setData({
      hiddens:true,
      hiddend:false
    })
  },
  stoprefresh:function(e){
    wx.stopPullDownRefresh()
    this.setData({
      hiddens: false,
      hiddend: true
    })

  },
  /**
   * 页面的初始数据
   */
start:function(e){
  this.setData({
    hidden:false,
    x:e.touches[0].x,
    y:e.touches[0].y
  })
},
move:function(e){
  this.setData({
    x:e.touches[0].x,
    y:e.touches[0].y
  })
},
end:function(e){
  this.setData({
    hidden:true
  })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
   
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const ctx = wx.createCanvasContext('myCanvas')
    /*const grd=ctx.createLinearGradient(0,0,100,0)
    grd.addColorStop(0,'red')
    grd.addColorStop(0.2,'blue')
    grd.addColorStop(0.4,'green')
    grd.addColorStop(0.6,'white')
    grd.addColorStop(1,'yellow')
    ctx.setFillStyle(grd)
    ctx.fillRect(10, 10, 100, 75)
    ctx.draw()*/
   
    const grd1 = ctx.createCircularGradient(190,50,40)
    grd1.addColorStop(0,'red')
    grd1.addColorStop(0.2, 'pink')
    grd1.addColorStop(0.4, 'yellow')
    grd1.addColorStop(0.6, 'blue')
    grd1.addColorStop(0.8, 'orange')
    grd1.addColorStop(1, 'white')
    
    ctx.setStrokeStyle('pink')
    ctx.beginPath()
    ctx.setLineCap('round')
    ctx.setLineWidth(10)
    ctx.moveTo(10, 10)
    ctx.lineTo(150, 10)
    ctx.stroke()


    ctx.setFillStyle(grd1)
    ctx.setShadow(10,10,50,'blue')
    ctx.fillRect(150,10,100,80)
    ctx.setLineDash([10, 20], 5);

    ctx.beginPath();
    ctx.moveTo(0, 100);
    ctx.lineTo(400, 100);
    ctx.stroke();
    ctx.draw()
  },
  bindCanvas:function(){
   wx.canvasToTempFilePath({
     canvasId: 'myCanvas',
     x:0,
     y:0,
    destWidth:300,
    destHeight:400,
    fileType:'jpg',
    quality:0.8,
    success:function(res){
      console.log(res.tempFilePath)
    },
    fail:function(res){
      console.log('出错了',res)
    }
   })
   wx.canvasGetImageData({
     canvasId: 'myCanvas',
     x: 0,
     y: 0,
     width: 100,
     height: 100,
     success(res) {
       console.log(res.width) // 100
       console.log(res.height) // 100
       console.log(res.data instanceof Uint8ClampedArray) // true
       console.log(res.data.length) // 100 * 100 * 4
     }
   })
   const data = new Uint8ClampedArray([255, 0, 0, 1])
   wx.canvasPutImageData({
     canvasId: 'myCanvas',
       x: 0,
     y: 0,
     width: 1,
     data: data,
     success:function(res) { 
       console.log('hjgfh',res)
     }
   })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
 const ctx=wx.createCanvasContext('mycan')
 ctx.setFillStyle('red')
 ctx.fillRect(0,0,150,200)
 ctx.setFillStyle('blue')
 ctx.fillRect(150,0,150,200)
 ctx.clearRect(60,10,150,75)

 /*ctx.moveTo(10, 10)
 ctx.lineTo(100, 10)
 ctx.lineTo(100, 100)
 ctx.stroke()*/


 ctx.moveTo(10, 10)
 ctx.lineTo(100, 10)
 ctx.lineTo(100, 100)
 ctx.closePath()
 ctx.stroke()
 
 ctx.draw()

 const ctr=wx.createCanvasContext('mycans')
 ctr.arc(100,75,50,0,2*Math.PI)
 ctr.setFillStyle('#EEEEEE')
 ctr.fill()

 ctr.beginPath()
 ctr.moveTo(40,75)
 ctr.lineTo(160,75)
 ctr.moveTo(100,15)
 ctr.lineTo(100,135)
 ctr.setStrokeStyle('#AAAAAA')
 ctr.stroke()

 ctr.setFontSize(12)
 ctr.setFillStyle('black')
 ctr.fillText('0',165,78)
 ctr.fillText('0.5*PI',83,145)
 ctr.fillText('1*PI',15,78)
 ctr.fillText('1.5*PI',83,10)

 //Draw points
 ctr.beginPath()
 ctr.arc(100,75,2,0,2*Math.PI)
 ctr.setFillStyle('lightgreen')
 ctr.fill()

 ctr.beginPath()
 ctr.arc(100,25,2,0,2*Math.PI)
 ctr.setFillStyle('blue')
 ctr.fill()

 ctr.beginPath()
 ctr.arc(150,75,2,0,2*Math.PI)
 ctr.setFillStyle('red')
 ctr.fill()

 //Draw arc
 ctr.beginPath()
 ctr.arc(100,75,50,0,1.5*Math.PI)
 ctr.setStrokeStyle('#333333')
 ctr.stroke()

 ctr.draw()

 const ctrs = wx.createCanvasContext('mycans1')
 //Draw points
 ctrs.beginPath()
 ctrs.arc(20, 20, 2, 0, 2 * Math.PI)
 ctrs.setFillStyle('red')
 ctrs.fill()

 ctrs.beginPath()
 ctrs.arc(200, 20, 2, 0, 2 * Math.PI)
 ctrs.setFillStyle('lightgreen')
 ctrs.fill()

 ctrs.beginPath()
 ctrs.arc(20, 100, 2, 0, 2 * Math.PI)
 ctrs.arc(200, 100, 2, 0, 2 * Math.PI)
 ctrs.setFillStyle('blue')
 ctr.fill()

 ctrs.setFillStyle('black')
 ctrs.setFontSize(12)

 // Draw guides
 ctrs.beginPath()
 ctrs.moveTo(20, 20)
 ctrs.lineTo(20, 100)
 ctrs.lineTo(150, 75)

 ctrs.moveTo(200, 20)
 ctrs.lineTo(200, 100)
 ctrs.lineTo(70, 75)
 ctrs.setStrokeStyle('#AAAAAA')
 ctrs.stroke()

 // Draw quadratic curve
 ctrs.beginPath()
 ctrs.moveTo(20, 20)
 ctrs.bezierCurveTo(20, 100, 200, 100, 200, 20)
 ctrs.setStrokeStyle('black')
 ctrs.stroke()

 ctrs.draw()
 const ctrd = wx.createCanvasContext('mycans2')
    ctrd.setFontSize(20)
    ctrd.fillText('Hello', 20, 20)
    ctrd.strokeRect(100, 10, 150, 100)
    ctrd.rotate(20 * Math.PI / 180)
    ctrd.translate(0,10)
    ctrd.strokeRect(100, 10, 150, 100)
    ctrd.rotate(20 * Math.PI / 180)
    ctrd.translate(0, 10)
    ctrd.strokeRect(100, 10, 150, 100)

    ctrd.draw()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})