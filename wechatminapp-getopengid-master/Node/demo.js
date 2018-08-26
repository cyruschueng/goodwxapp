var WXBizDataCrypt = require('./WXBizDataCrypt')

var appId = ''
var sessionKey = ''
var encryptedData = ''
var iv = ''

var pc = new WXBizDataCrypt(appId, sessionKey)

var data = pc.decryptData(encryptedData , iv)

console.log('解密后 data: ', data)
/* appId：你的小程序 App ID，请在公众平台获取
 * sessionKey：相应用户的 session_key
 * encryptedData：加密后的数据，可以在 wx.getShareInfo 的参数中获取到
 * iv：某种神奇的解密参数，可以在 wx.getShareInfo 的参数中获取到
 */