/**
 * API -- UI Animation
 * 
 * 动画
 * 
 * Bug: iOS/Andriod 6.3.30 通过 step() 分隔动画，只有第一步动画能生效
 */

const TIP = require('./tip')

module.exports = {
  data: {
    animationData: {}
  },
  // 模拟animation实例，由create创建返回，方法支持链式调用
  instance: {
    /** 方法：样式 */
    // value: 透明度，0 ~ 1
    opacity(value) {},
    backgroundColor(color) {},
    // 如果传入Number则默认使用px，也可传入其他自定义的单位的长度值
    width(length) {},
    height(length) {},
    top(length) {},
    left(length) {},
    bottom(length) {},
    right(length) {},

    /** 方法：旋转 deg: -180 ~ 180 */
    // 从原点顺时针旋转一个deg角度
    rotate(deg) {},
    rotateX(deg) {},
    rotateY(deg) {},
    rotateZ(deg) {},
    // 同 transform-function rotate3d
    rotate3d(x, y, z, deg) {},

    /** 方法：缩放 */
    // 一个参数时表示x,y轴同时缩放sx倍数，两个参数表示x轴缩放sx倍数，y轴缩放sy倍数
    scale(sx, [sy]) {},
    scaleX(sx) {},
    scaleY(sy) {},
    scaleZ(sz) {},
    scale3d(sx, sy, sz) {},

    /** 方法：偏移(px) */
    translate(tx, [ty]) {},
    translateX(tx) {},
    translateY(ty) {},
    translateZ(tz) {},
    translate3d(tx, ty, tz) {},

    /** 方法：倾斜 -180 ~ 180 */
    skew(ax, [ay]) {},
    skewX(ax) {},
    skewY(ay) {},

    /** 方法：矩阵变形 */
    // 同 transform-function matrix
    matrix(a, b, c, d, tx, ty) {},
    // 同 transform-function matrix3d
    matrix3d() {}
  },

  /**
   * 创建一个动画实例animiation，调用实例的方法来描述动画。
   * 最后通过动画的实例的export方法导出动画数据传递给组件的animation属性
   * 
   * TIP: export方法每次调用后会清除掉之前的动画操作
   */
  create(opts) {
    const _opts = {
      duration: 'Integer, default: 400, 动画持续时间(ms)',
      /**
       * linear, ease, ease-in, ease-in-out, ease-out
       * 
       * step-start: 动画第一帧就跳至结束状态直到结束
       * step-end: 动画一直保持开始状态，最后一帧跳到结束状态
       */
      timeingFunction: 'String, linear, 定义动画效果',
      delay: 'Integer, 0, ms',
      transformOrigin: 'String, (50%, 50%, 0), 设置transform-origin'
    }

    wx.createAnimation(opts)
  },

  /**
   * 动画实例，实现一个动画步骤
   * 0. 组件animation绑定动画数据（页面data中定义，用来保存动画配置）
   * 1. 创建动画实例
   * 2. 调用动画方法
   * 3. 调用step完成动画组
   * 4. 调用export导出动画配置
   */
  example() {
    // 0. 组件绑定动画属性
    // <view animation="{{animationData}}"></view>

    // 1. 创建动画实例
    const animation = this.create({
      duration: 1000,
      timingFunction: 'ease'
    })

    this.animation = animation

    // 2. 调用动画方法组合一个完整的动画配置
    animation.scale(2, 2).rotate(45).step()

    // 3. 调用step完成动画组，如果上面调用了就不需要重复调用
    // 4. 导出动画配置
    /* 演示用，页面Page()里面才有 this.setData
    this.setData({
      animationData: animation.export()
    }) */
    this.animationData = animation.export()
    
  }
}