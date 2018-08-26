/**
 * API -- UI Scroll
 * 
 * 页面滚动 
 * 
 * >= 1.4.0
 */

const TIP = require('./tip')

module.exports = {
  /**
   * 将页面滚动到目标位置
   */
  to(opts) {
    const _opts = {
      scrollTop: 'Number, required, 滚动到页面的目标位置（px）',
      duration: 'Number, 滚动动画的时长，默认300ms，单位ms'
    }

    if (!wx.pageScrollTo) {
      TIP.modal.show({ type: 'low_version' })
      return false
    }

    wx.pageScrollTo(opts)
  }
}