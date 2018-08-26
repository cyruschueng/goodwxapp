var WXBizDataCrypt = require('./WXBizDataCrypt')
const { mysql } = require('../qcloud')

/**
  * 保存分享信息
  * 传入 userId、encryptedData、iv、sequenceId
  */
module.exports = async ctx => {
  var params = ctx.request.body
  var appId = "wxf89dd63594281828"
  var userId = params.userId
  var encryptedData = params.encryptedData
  var iv = params.iv
  var sequenceId = params.sequenceId
  // 解密数据
  var user = await mysql("cSessionInfo").select("session_key").where({ open_id: userId }).first()
  var sessionKey = user.session_key
  var pc = new WXBizDataCrypt(appId, sessionKey)
  var data = pc.decryptData(encryptedData, iv)
  // 保存数据
  var updateSequence = {
    groupId: data.openGId,
    updatedAt: new Date()
  }
  var sequence = await mysql("Sequence").update(updateSequence).where({ id: params.sequenceId })
  ctx.state.data = data.openGId
}