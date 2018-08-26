/**
 * API -- 调试
 * 
 * v1.4.0
 */

module.exports = {
  enable(opts) {
    const _opts = {
      enableDebug: 'Boolean, required',
      success(res) {
        const _res = {
          errMsg: ''
        }
      },
      fail() {},
      complete() {}
    }

    if (!wx.setEnableDebug) {
      return false
    }

    wx.setEnableDebug(opts)
    return true
  }
}