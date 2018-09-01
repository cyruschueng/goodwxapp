module.exports = {
  set: function (skey) {
    wx.setStorageSync('session', skey)
  },
  get: function () {
    let session = wx.getStorageSync('session') || null
    if (session) {
      return session.skey
    } else {
      return null
    }
  },
  clear: function () {
    wx.clearStorageSync('session')
  }
}