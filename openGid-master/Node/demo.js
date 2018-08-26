var WXBizDataCrypt = require('./WXBizDataCrypt')

var appId = 'wx8ae90cef0bbc5d10'
var sessionKey = 'oGK8O+YQCqxCuje88iXEzQ=='
var encryptedData = 'FYyiZ2ITxXMxGwZE7W/1vfzSlObV8fOqv/zrhJOTUzbjDzyt4HT7TtWFCRpbOD27Xh91/P5AoOURYXTQHAuVvtVfqTEhmFMHhYmafqjZDs9TH9KGhjAY7sm0lTZiOjLOMRoslHNAAX2p8fMMfjXUQg=='
var iv = 'uOgIi8o7fnkbtAn4NGl8aA=='

var pc = new WXBizDataCrypt(appId, sessionKey)

var data = pc.decryptData(encryptedData , iv)

console.log('解密后 data: ', data)
/* appId：你的小程序 App ID，请在公众平台获取
 * sessionKey：相应用户的 session_key
 * encryptedData：加密后的数据，可以在 wx.getShareInfo 的参数中获取到
 * iv：某种神奇的解密参数，可以在 wx.getShareInfo 的参数中获取到
 */
 
