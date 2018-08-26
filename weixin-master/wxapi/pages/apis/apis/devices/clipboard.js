/**
 * API -- device clipboard
 * 
 * 剪贴板 >= 1.1.0
 */

const TIP = require('../uis/tip')

module.exports = {
  setData(opts) {
    const _opts = {
      data: 'String, required, 需要设置的内容',
      success(res) { },
      fail(res) { },
      complete(res) { }
    }

    if (!wx.setClipboardData) {
      TIP.modal.show({ type: 'low_version' })
      return false
    }
    wx.setClipboardData(opts)
  },
  getData(opts) {
    const _opts = {
      success(res) {
        const _res = {
          data: 'String, 剪贴板内容'
        }
      },
      fail(res) { },
      complete(res) { }
    }

    if (!wx.getClipboardData) {
      TIP.modal.show({ type: 'low_version' })
      return false
    }

    wx.getClipboardData(opts)
  }
}