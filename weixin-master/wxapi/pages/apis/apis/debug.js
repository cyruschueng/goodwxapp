/**
 * API -- 调试接口
 * 
 * 1.4.0
 * 
 * wx.setEnableDebug，设置是否打开调试开关，该开关对正式版也能生效
 */

module.exports = {
  enable(opts) {
    const _opts = {
      enableDebug: 'Boolean, required, 是否打开调试',
      success(res) {
        const _res = {
          errMsg: 'String, 调用结果'
        }
      },
      fail(res) {},
      complete(res) {}
    }
  }
}

