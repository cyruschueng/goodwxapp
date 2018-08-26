/**
 * API -- Sport, Run, 微信运动
 * 
 * v1.2.0
 */

module.exports = {
  getWeRunData(opts) {
    const _opts = {
      success(res) {
        const _res = {
          errMsg: '',
          // 解密后： { stepInfoList: { timestamp: Number, step: Number }}
          encryptedData: '',
          iv: ''
        }
      }
    }

    if (!wx.getWeRunData) {
      return false
    }

    wx.getWeRunData(opts)
    return true
  }
}