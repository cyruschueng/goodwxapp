/**
 * API -- device compass
 * 
 * 罗盘
 * 1. on.compassChange(cb) 监听罗盘数据
 * 2. start(opts) 开始监听
 * 3. stop(opts) 停止监听
 */

const TIP = require('../uis/tip')

module.exports = {
  stop(opts) {
    const _opts = {
      success(res) { },
      fail(res) { },
      complete(res) { }
    }

    if (!wx.stopCompass) {
      TIP.modal.show({ type: 'low_version' })
      return false
    }

    wx.stopCompass(opts)
  },

  start(opts) {
    const _opts = {
      success(res) { },
      fail(res) { },
      complete(res) { }
    }

    if (!wx.startCompass) {
      TIP.modal.show({ type: 'low_version' })
      return false
    }

    wx.startCompass(opts)
  },

  on: {
    // 监听罗盘数据，频率：5次/秒，调用后会自动开始监听
    compassChange(callback) {
      const _callback = res => {
        const _res = {
          direction: 'Number, 面对的方向度数'
        }
      }

      wx.onCompassChange(res => {
        if (callback) {
          callback(res)
        }
      })
    }
  }
}