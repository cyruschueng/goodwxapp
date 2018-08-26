/**
 * API -- device vibrate
 * 
 * 手机振动
 */

const TIP = require('../uis/tip')

module.exports = {
  /**
   * 手机振动类型，long: 400ms, short: 15ms
   * 
   * Tip: vibrateShort 仅在iPhone7/iPhone7Plus及Andriod机型生效
   */
  trigger(opts) {
    const _opts = {
      value: '振动类型，long or short',
      success(res) { },
      fail(res) { },
      complete(res) { }
    }

    if (!wx.vibrateLong || !wx.vibrateShort) {
      TIP.modal.show({ type: 'low_version' })
      return false
    }

    if (value === 'long') {
      // >= 1.2.0 使手机发生较长时间的振动（400ms）
      wx.vibrateLong({
        success, fail, complete
      })
    } else if (value === 'short') {
      //  >= 1.2.0 使手机发生较短时间的振动（15ms）
      wx.vibrateShort({
        success, fail, complete
      })
    }
  }
}
