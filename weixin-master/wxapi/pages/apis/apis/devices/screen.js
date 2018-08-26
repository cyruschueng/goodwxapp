/**
 * API -- device screen
 * 
 * 手机屏幕配置
 */
const TIP = require('../uis/tip')

module.exports = {
  /**
   * 调整手机亮度
   * 
   * Tip: 
   *  1. getScreenBrightness 接口若安卓系统设置开启了自动调节亮度，则屏幕亮度根据光线自动调整，
   *  该接口仅能获取自动调节亮度之前的值，而非实时的亮度值
   */
  bright(opts) {
    const _opts = {
      value: 'String/Object/Array, required, 配置属性值',
      success(res) {
        // for set
        const _res = {
          value: 'Number, 屏幕高度值，范围0~1，0 最暗， 1 最亮'
        }
      },
      fail(res) { },
      complete(res) { }
    }

    const {
      value, success = () => { }, fail = () => { }, complete = () => { }
    } = opts
    if (typeof opts.value === 'undefined' || !opts.value) {
      if (!wx.getScreenBrightness) {
        TIP.modal.show({ type: 'low_version' })
        return false
      }
      // >= 1.2.0
      wx.getScreenBrightness({ success, fail, complete })
      return false
    }

    if (!wx.setScreenBrightness) {
      TIP.modal.show({ type: 'low_version' })
      return false
    }
    
    // >= 1.2.0
    wx.setScreenBrightness({ value, success, fail, complete })
    return true
  }
}