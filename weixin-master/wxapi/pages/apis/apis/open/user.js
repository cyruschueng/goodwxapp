/**
 * API -- related with users
 * 
 * 1. wx.getUserInfo
 * 2. wx.getPhoneNumber
 * 3. UnionID机制说明
 */


module.exports = {
  /**
   * 需要用户授权：scope.userInfo
   */
  getInfo(opts) {
    const _opts = {
      /**
       * true: 要求此前有吊用过wx.login且登录态尚未过期，此时返回的
       * 数据会包含 encryptedData, iv等敏感信息。
       */
      withCredentials: 'Boolean, 是否带上登录态信息, 1.1.0',
      lang: 'String, 指定返回用户信息的语言， zh_CN简体中文，zh_TW繁体中文，en应为，默认en',
      success(res) {
        const _res = {
          userInfo: {
            // 用户信息对象，不包含openid等敏感信息
            nickName: 'String',
            avatarUrl: 'String, 最后一个数字代表正方形头像大小(值：0/46/64/96/132, 0表示640*640的正方形头像)',
            gender: 'String, 1-男性，2-女性，0-未知',
            city: 'String',
            province: 'String',
            country: 'String',
            language: 'String'
          },
          rawData: 'String, 不包括敏感信息的原始数据字符串，用于计算签名',
          signature: 'String, 使用sha1(rawData + sessionKey)得到的字符串，用于校验用户信息',
          encryptedData: 'String, 包含敏感数据在内的完整用户信息的加密数据',
          iv: 'String, 加密算法的初始向量'
        }
      },
      fail() {},
      complete() {}
    }

    wx.getUserInfo(opts)
  },

  /**
   * 获取用户绑定的手机号，需先 wx.login 登录
   */
  getPhoneNo(opts) {
    /// wx.getPhoneNumber(opts)

    // 不能直接调用，需要将 <button open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber"></button>
    // 用户点击并同意后，可以通过 bindgetphonenumber 事件回调获取到微信服务器返回的加密数据
    // 然后在第三方服务器端结婚session_key和app_id进行解密获取手机号

    // 返回参数
    const _res = {
      encryptedData: 'String',
      iv: 'String'
    }
  }
}