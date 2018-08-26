/**
 * API -- do login
 * 
 * 1. wx.login
 * 2. wx.checkSession
 * 
 * Bug: iOS/Andriod 6.3.30 在 App.onLaunch调用 wx.login 会出现异常
 * 
 * 签名加密：https://mp.weixin.qq.com/debug/wxadoc/dev/api/signature.html
 */


module.exports = {

  /**
   * 调用接口获取登录凭证（code），进而换取用户登录状态信息，包含：
   * 
   * 1. 唯一标识（openid）
   * 2. 本次登录的会话秘钥（session_key）
   * 
   * 用户数据的加解密通讯需要依赖会话密钥完成
   * 
   * Tip: login 会引起登录态的刷新，之前的 sessionkey 可能会失效
   */
  do(opts) {
    const _opts = {
      success() {
        const _opts = {
          errMsg: '',
          code: 'String, 用户登录凭证（有效期5分钟），开发者需要在开发者服务器后台调用api，使用code换取openid和session_key等信息'
        }
      },
      fail() {},
      complete() {}
    }
  },

  getSessionKey(code) {
    // https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
    const _reqObj = {
      appid: 'required',
      secret: 'required, 小程序的app secret',
      js_code: 'required, 登录时获取的code',
      grant_type: 'required, 填写为 authorization_code'
    }

    const _resObj = {
      openid: '用户唯一标识',
      session_key: '会话秘钥',
      unionid: '用户在开放平台的唯一标识符，本字段在满足一定条件情况下返回。'
    }

    // TODO request
  },

  /**
   * 检测当前登录态的时效性，如果当前登录已无效，需要调用 wx.login 重新登录
   */
  checkSession(opts) {
    const _opts = {
      success(res) {},
      fail() {
        // if failed, to login again
        wx.login()
      },
      complete() {}
    }

    wx.checkSession(opts)
  }
}