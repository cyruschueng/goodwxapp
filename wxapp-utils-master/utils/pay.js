import promisify from './promisify'

const wxPay = promisify(wx.requestPayment)

/**
 * 唤起微信支付
 * 具体可以参见微信小程序文档 https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-pay.html#wxrequestpaymentobject
 *
 * @param {object} params
 * @param {string} params.timeStamp - 时间戳从1970年1月1日00:00:00至今的秒数,即当前的时间
 * @param {string} params.nonceStr - 随机字符串，长度为32个字符以下
 * @param {string} params.package - 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*
 * @param {string} params.signType - 签名算法，暂支持 MD5
 * @param {string} params.paySign - 签名
 */
function pay(params) {
  const { timeStamp, nonceStr, signType, paySign } = params
  return wxPay({
    timeStamp,
    nonceStr,
    /** 由于 package 在严格模式下是关键词，所以需要作为字符串单独处理 */
    'package': params['package'],
    signType,
    paySign
  })
}

export default pay
