/**
 * API -- UI Canvas
 * 
 * 绘图
 * 
 * 所有在 <canvas/> 中的绘图必须用 js 完成
 * 
 * 实例模版：<canvas canvas-id="myCanvas" style="border: 1px solid;"/>
 * 
 * 下面的实例js代码均在onLoad中完成
 * 
 * 不推荐使用的canvas api：
 * 1. wx.createContext
 * 2. wx.drawCanvas
 */

const TIP = require('./tip')

module.exports = {

  /**
   * 创建canvas绘图上下文。
   * 
   * 在自定义组件下，scope为组件实例this，用来操作组建内的<canvas/>组件，表示
   * 在这个自定义组件下查找拥有canvasId的<canvas/>，如果省略则不再任何自定义组件
   * 内查找
   */
  create(canvasId, scope) {
    return wx.createCanvasContext(canvasId, scope)
  },

  /**
   * 把当前画布指定区域的内容导出生成指定大小的图片，并返回文件路径 
   * 
   * Tip: 在draw回调里调用该方法才能保证图片导出成功
   */
  toPath(opts, scope) {
    const _opts = {
      canvasId: 'String, 画布标识，传入<canvas/>的canvas-id',
      success(res) { },
      fail(res) { },
      complete(res) { },
      // 1.2.0
      x: 'Number, dft: 0',
      y: 'NUmber, dft: 0',
      width: 'Number, dft: 画布宽度 - x',
      heigth: 'Number, dft: 画布高度 - y',
      destWidth: 'Number, 输出图片宽度，dft:width',
      destHeight: 'Number, 输出图片高度，dft: height',
      // 1.7.0
      fileType: 'String, 目标文件类型，只支持jpg/png.默认png',
      quality: 'Number, 图片质量，取值(0 ~ 1)，不在范围内时当做1.0处理'
    }

    wx.canvasToTempFilePath(opts, scope)
  },

  /**
   * 返回一个数组，用来描述canvas区域隐含的像素信息
   * 
   * 1.9.0
   */
  getImgData(opts) {
    const _opts = {
      canvasId: 'String, required, 画布标识，传入<canvas/>的canvas-id',
      x: 'Number, required, 将要被提取的图像数据矩形区域的左上角x坐标',
      y: 'Number, required, 将要被提取的图像数据矩形区域的左上角y坐标',
      width: 'Number, required, 将要被提取的图像数据矩形区域的宽度',
      height: 'Number, required, 将要被提取的图像数据矩形区域的高度',
      success(res) {
        const _res = {
          errMsg: 'String',
          width: 'Number, 图像数据矩形的宽度',
          height: 'Number, 图像数据矩形的高度',
          data: 'Uint8ClampedArray, 图像像素点数据，一维数组，每四项表示一个像素点的rgba'
        }
      },
      fail(res) { },
      complete(res) { }
    }

    if (!wx.canvasGetImageData) {
      TIP.modal.show({ type: 'low_version' })
      return false
    }

    wx.canvasGetImageData(opts)
  },

  /**
   * 将像素数据绘制到画布的方法
   * 
   * 1.9.0
   */
  putImgData(opts) {
    const _opts = {
      canvasId: 'String, required, <canvas/>的id',
      data: 'Uint8ClampedArray, required, 像素数据',
      x: 'Number, required, 输出到画布的x坐标',
      y: 'Number, required, 输出到画布的y坐标',
      width: 'Number, required, 源图像数据矩形区域宽度',
      height: 'Number,required, 原图像数据矩形区域的高度',
      success(res) { },
      fail(res) { },
      complete(res) { }
    }

    if (!wx.canvasPutImageData) {
      TIP.modal.show({ type: 'low_version' })
      return false
    }

    wx.canvasPutImageData(opts)
  }
}