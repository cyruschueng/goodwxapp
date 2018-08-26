/**
 * API -- device network
 * 
 * 网络相关
 */

const TIP = require('../uis/tip')

module.exports = {
  getType(opts) {
    const _opts = {
      success(res) {
        const _res = {
          networkType: '网络类型，常见值：wifi/2g/3g/4g/unknown/none(无网络)'
        }
      },
      fail(res) { },
      complete(res) { }
    }

    wx.getNetworkType(opts)
  },

  on: {
    netStatusChange(callback) {
      const _callback = res => {
        const _res = {
          isConnected: 'Boolean, 网络是否已连接',
          networkType: 'String, 网络类型'
        }
      }

      if (!wx.onNetworkStatusChange) {
        TIP.modal.show({ type: 'low_version' })
        return false
      }

      wx.onNetworkStatusChange(res => {
        if (callback) {
          callback(res || _res)
        }
      })
    }
  }
}