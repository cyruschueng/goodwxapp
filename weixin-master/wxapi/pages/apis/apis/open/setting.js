/**
 * API -- 设置界面
 * 
 * v1.1.0
 */

module.exports = {
  open(opts) {
    const _opts = {
      success(res) {
        const _res = {
          authSetting: 'Object, 用户授权结果，其中key为scope值，value为bool值，表示用户是否允许授权'
        }
      },
      fail() {},
      complete() {}
    }

    if (!wx.openSetting) {
      return false
    }

    wx.openSetting(opts)

    return true
  },

  /** v1.2.0 */
  _get(opts) {
    const _opts = {
      success(res) {
        const _res = {
          authSetting: 'Object, ...'
          /**
           * 比如： {
           *  "scope.userInfo": true,
           *  "scope.userLocation": true
           * }
           */
        }
      },
      fail() {},
      complete() {}
    }

    if (!wx.getSetting) {
      return false
    }

    wx.getSetting(opts)
    return true
  }
}