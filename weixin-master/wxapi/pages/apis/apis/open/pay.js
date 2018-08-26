/**
 * API -- 微信支付接口
 * 
 */

module.exports = {
  /**
   * Bug: 6.5.2及之前版本，用户取消支付不会触发fail回调，只会触发complete回调，errMsg: requestPayment:cancel
   */
  request(opts) {
    const _opts = {
      timeStamp: 'String, required, 时间戳从1970-1-1 00:00:00至今的秒数，即当前的时间',
      nonceStr: 'String, required, 随机字符串，长度为32个字符以下',
      package: 'String, required, 统一下单接口返回的prepay_id参数值，提交格式如：preplay_id=*',
      signType: 'String, required, 签名算法，暂支持MD5',
      paySign: 'String, required, 签名，具体签名方案参见：https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_7&index=3',
      success(res) {
        const _res = {
          errMsg: 'requestPayment:ok'
        }
      },
      fail(res) {
        const _res = {
          errMsg: 'requestPayment:fail cancel, 或requestPayment:fail(detail message)'
        }
      },
      complete() {}
    }
  }
}