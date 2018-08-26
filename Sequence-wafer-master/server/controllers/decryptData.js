var WXBizDataCrypt = require('./WXBizDataCrypt')
const { mysql } = require('../qcloud')

/**
  * 解密数据
  * 传入 userId、encryptedData、iv
  */
module.exports = async ctx => {
  var params = ctx.request.body
  var appId = "wxf89dd63594281828"
  var userId = params.userId
  var encryptedData = params.encryptedData
  var iv = params.iv
  var user = await mysql("cSessionInfo").select("session_key").where({ open_id: userId }).first()
  var sessionKey = user.session_key
  var pc = new WXBizDataCrypt(appId, sessionKey)
  var data = pc.decryptData(encryptedData, iv)
  ctx.state.data = data
}