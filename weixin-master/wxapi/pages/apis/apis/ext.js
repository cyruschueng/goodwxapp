/**
 * API -- Third-party Platform
 * 
 * >= 1.1.0
 * 
 * 1. wx.getExtConfig(opts)
 * 
 * 2. wx.getExtConfigSync(opts)
 */

module.exports = {
  getConfig(opts) {
    const _opts = {
      success(res) {
        const _res = {
          errMsg: 'String, 调用结果',
          extConfig: 'Object, 第三方平台自定义的数据'
        }
      },
      fail(res) {},
      complete(res) {}
    }

    if (!wx.getExConfig) {
      return {}
    }

    wx.getExConfig(opts)
  },

  getConfigSync(opts) {
    return wx.getExConfigSync ? wx.getExConfigSync() : {}
  }
}