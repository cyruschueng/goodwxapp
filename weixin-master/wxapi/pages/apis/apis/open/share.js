/**
 * API -- 转发和分享
 * 
 * 1. Page.onShareAppMessage
 * 
 * v1.1.0 
 * 
 * 2. wx.showShareMenu
 * 3. wx.hideShareMenu
 * 4. wx.updateShareMenu
 * 5. wx.getShareInfo
 */

module.exports = {
  showMenu(opts) {
    const _opts = {
      withShareTicket: 'Boolean, 是否使用带shareTicket的转发详情',
      success() {},
      fail() {},
      complete() {}
    }

    if (!wx.showShareMenu) {
      return false
    }

    wx.showShareMenu(opts)
  },

  hideMenu(opts) {
    const _opts = {
      success() {},
      fail() {},
      complete() {}
    }

    if (!wx.hideShareMenu) {
      return false
    }

    wx.hideShareMenu(opts)
  },

  /**
   * v1.2.0
   */
  updateMenu(opts) {
    const _opts = {
      withShareTicket: 'Boolean, 是否使用带shareTicket',
      success(res) {},
      fail() {},
      complete() {}
    }

    if (!wx.updateShareMenu) {
      return false
    }

    wx.updateShareMenu(opts)
  },

  /**
   * v1.1.0 获取转发详细信息
   */
  getInfo(opts) {
    const _opts = {
      shareTicket: 'String, required',
      success(res) {
        const _res = {
          errMsg: 'String, 错误信息',
          // 解密后： { openGId: '群对当前小程序的我已id' }
          encryptedData: 'String',
          iv: 'String'
        }
      },
      fail() {},
      complete() {}
    }
  }
}