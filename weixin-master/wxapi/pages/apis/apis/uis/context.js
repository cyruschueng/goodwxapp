/**
 * API --  UI Canvas Context
 * 
 * 该对象为 wx.createCanvasContext 返回的 canvasContext 画布上下文对象
 * 
 * 此处仅做记录用。
 */

module.exports = {
  // 设置填充色，默认black
  setFillStyle() { },
  // 设置边框色，默认 black
  setStrokeStyle() { },
  // 设置阴影样式
  setShadow() {
    const _arguments = {
      offsetX: 'Number, 阴影相对于形状在水平方向的偏移',
      offsetY: 'Number, 阴影相对于形状在竖直方向的偏移',
      blur: 'Number, 0 ~ 100, 阴影的模糊级别，数值越大越模糊',
      color: 'Color, 阴影颜色'
    }
  },
  // 创建一个线性的渐变颜色
  createLinearGradient() {
    const _arguments = {
      x0: 'Number, 起点的x坐标',
      y0: 'Number, 起点的y坐标',
      x1: 'Number, 终点的x坐标',
      y1: 'Number, 终点的y坐标'
    }

    // 示例：
    const ctx = wx.createCanvasContext('myCanvas')
    const grd = wx.createLinearGradient(0, 0, 200, 0)
    grd.addColorStop(0, 'red')
    grd.addColorStop(1, 'blue')
    // fill
    ctx.setFillStyle(grd)
    ctx.fillRect(10, 10, 150, 80)
    ctx.draw()
  },

  // 创建一个圆形的渐变色, 起点在圆心，终点在圆环，需要 addColorStop() 指定至少两个渐变点
  createCircularGradient() {
    const _arguments = {
      x: 'Number, 圆心坐标x',
      y: 'Number, 圆心坐标y',
      r: 'Number, 圆半径'
    }
  },

  // 创建一个颜色渐变点
  addColorStop() {
    const _arguments = {
      stop: 'Number, 0 ~ 1, 表示渐变点起点和终点中的位置',
      color: 'Color, 渐变色'
    }
  },

  // 设置线条的宽度
  setLineWidth() {
    const _arguments = {
      lineWidth: 'Number, px, 宽度'
    }
  },

  // 设置线条端点的样式
  setLineCap() {
    const _arguments = {
      lineCap: 'String, [butt, round, square]'
    }
  },

  // 设置线条交点样式
  setLineJoin() {
    const _arguments = {
      lineJoin: 'String, [bevel, round, miter]'
    }
  },

  // 设置线条宽度，1.6.0
  setLineDash() {
    const _arguments = {
      pattern: 'Array, 一组描述交替绘制线段和间距（坐标空间单位）长度的数字',
      offset: 'Number, 虚线偏移量'
    }
  },

  // 设置最大斜接长度(在两条线交汇处内角和外角之间的距离)
  // 当 setLineJoin 为 miter 时才生效。超过最大倾斜长度的，连接处
  // 将以 lineJoin 为 bevel 来显示
  setMiterLimit() {
    const _arguments = {
      miterLimit: 'Number, 最大斜接长度'
    }
  },

  // 绘制矩形
  rect(x, y, width, height) {
    const ctx = wx.createCanvasContext('myCanvas')
    ctx.rect(0, 0, 100, 200)
    ctx.setFillStyle('red')
    ctx.fill()
    ctx.draw()
  },

  // 填充矩形
  fillRect(x, y, width, height) {
    const ctx = wx.createCanvasContext('myCanvas')
    ctx.setFillStyle('red')
    ctx.fillRect(0, 0, 100, 200)
    ctx.draw()
  },

  // 画一个矩形（非填充）
  strokeRect(x, y, width, height) {
    const ctx = wx.createCanvasContext('myCanvas')
    ctx.setStrokeStyle('red')
    ctx.StokeRect(0, 0, 100, 200)
    ctx.draw()
  },

  // 清除画布上该区域内的内容
  clearRect(x, y, width, height) { },

  /**
   * 对当前路径中的内容进行填充，默认为黑色
   * 
   * 如果当前路径没有闭合，fill 会将起点和终点连接再填充
   * 
   * 填充路径从 beginPath 开始计算，但不会包含 fillRect 进去
   */
  fill() { },

  // 画出当前路径边框，从beginPath()开始，不包含strokeRect()
  stroke() { },

  /**
   * 开始创建路径，需要调用 fill or stroke 才会使用路径进行填充或描边
   * 
   * 在最开始相当于调用了一次 beginPath()
   * 
   * 同一路径内的多次调用 setFillStyle(), setStrokeStyle(), setLineWidth()以最后一次为准
   */
  beginPath() { },

  // 关闭路径，关闭路径会连接起点和终点，但是关闭后没调用 fill() 或 stoke()
  // 并开启了新路径，那之前的路径不会被渲染
  closePath() { },

  // 把路径移动到画布中的指定点，不创建线条，用 stroke() 来画线条
  moveTo(x, y) {
    const ctx = wx.createCanvasContext('mycanvs')
    ctx.moveTo(10, 10)
    ctx.lineTo(100, 10)

    ctx.moveTo(10, 50)
    ctx.lineTo(100, 50)
    ctx.stroke()
    ctx.draw()
  },

  // 增加一个新点，然后创建一条从上次指定点到目标点的线，用stroke来画线条
  lineTo(x, y) { },

  /**
   * 创建一条弧线
   * (x, y, r) 园坐标半径
   * sAngle 其实弧度，单位弧度（3点钟方向）
   * eAngle 终止弧度
   * counterclockwise Boolean 可选。指定弧度的方向是逆时针还是顺时针，默认 false(即顺时针)
   */
  arc(x, y, r, sAngle, eAngle, counterclockwise) { },

  // 创建三次方贝塞尔曲线路径
  bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) { },

  // 创建二次贝塞尔曲线路径
  quadraticCurveTo(cpx, cpy, x, y) { },

  // 在调用 scale 之后创建的路径其横纵左边会被缩放。多次调用，倍数会相乘
  scale(scaleWidth, scaleHeight) { },

  // 以原点为中心，原点可以用 translate 方法修改。顺时针旋转当前坐标轴。
  // 以弧度计：rotate(degrees * Math.PI / 180), degress: 0 ~ 360
  rotate(rotate) { },

  // 对当前坐标系的原点（0,0)进行变换，默认坐标系原点在页面左上角
  translate(x, y) { },

  /**
   * 从原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制
   * 在被剪切的区域内（不能访问画布上的其他区域），可以在使用clip()方法前通过使用
   * save()方法对当前的画布区域进行保存，并在以后任意时间对其恢复
   */
  clip() {
    const ctx = wx.createCanvasContext('myCanvas')

    wx.downloadFile({
      url: 'http://is5.mzstatic.com/image/thumb/Purple128/v4/75/3b/90/753b907c-b7fb-5877-215a-759bd73691a4/source/50x50bb.jpg',
      success: function (res) {
        ctx.save()
        ctx.beginPath()
        ctx.arc(50, 50, 25, 0, 2 * Math.PI)
        ctx.clip()
        ctx.drawImage(res.tempFilePath, 25, 25)
        ctx.restore()
        ctx.draw()
      }
    })
  },

  // 设置字体大小
  setFontSize(fontSize) { },

  // 绘制被填充的文本
  fillText(text, x, y) {
    const ctx = wx.createCanvasContext('myCanvas')
    ctx.setFontSize(20)
    ctx.fillText('hello', 20, 20)
    ctx.fillText('World', 100, 100)
    ctx.draw()
  },

  // 设置文字对齐, left, center, right
  setTextAlign(align) { },

  // 1.4.0, 设置文字的水平对齐, top/bottom/middle/normal
  setTextBaseLine(textBaseLine) { },

  /**
   * 绘制图像到画布
   * 
   * 参数有三种组合：
   * 
   * 1. drawImage(dx, dy)
   * 2. drawImage(dx, dy, dWidth, dHeight)
   * 3. drawImage(sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) // v1.9.0
   */
  drawImage(
    imageResource,  // String 图片资源
    dx, // Number, 图像左上角在canvas上x轴位置
    dy, // Number, 图像左上角在canvas上y轴位置
    dWidth, // Number, 在目标画布上绘制图像的宽度，允许对绘制的图像进行缩放
    dHeight, // Number, 在目标画布上绘制图像的高度，允许对绘制的图像进行缩放
    sx, // Number, 源图像的矩形选择框的左上角x坐标
    sy, // Number, 源图像的矩形选择框的左上角y坐标
    sWidth, // Number, 源图像的矩形选择框的宽度
    sHeight, // Number, 源图像的矩形选择框的高度
  ) {
  },

  // 设置全局画笔透明度, Number, 0 ~ 1
  setGlobalAlpha(alpha) { },

  // 保存当前绘制的上下文
  save() { },

  // 恢复之前保存的绘图上下文
  restore() { },

  /**
   * 绘制
   * 
   * 参数：
   * 1. reserve, Boolean, 可选。本次绘制是否接着上一次绘制，false即本次调用drawCanvas绘制之前
   * native层应先清空画布再继续绘制；若true，则保留当前画布内容，本次调用drawCanvas绘制的内容覆盖在上面，默认false.
   * 2. callback, Function, 绘制完成的回调
   */
  draw() { },

  // 返回绘图上下文的绘图动作，不推荐使用
  getActions() { },

  // 清空绘图上下文的绘图动作，不推荐使用
  clearActions() { }

}