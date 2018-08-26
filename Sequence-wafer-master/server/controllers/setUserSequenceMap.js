const { mysql } = require('../qcloud')
const uuid = require('node-uuid')

/**
  * 设置用户接龙关系
  * 传入userId、sequenceId、joinStatus
  */
module.exports = async ctx => {
  var params = ctx.request.body
  var userId = params.userId
  var sequenceId = params.sequenceId
  var joinStatus = params.joinStatus
  var sequenceType = params.sequenceType
  var date = new Date()
  if (joinStatus != 1 && joinStatus != 2) {
    ctx.state.code = -1
    return
  }
  var userSequenceMap = await mysql("UserSequenceMap").where({ userId, sequenceId }).first()
  if (userSequenceMap != null) {
    userSequenceMap.joinStatus = joinStatus
    await mysql("UserSequenceMap").update({ joinStatus, updatedAt: date }).where({ userId, sequenceId })
  } else {
    userSequenceMap = {
      id: uuid.v1(),
      userId: userId,
      sequenceId: sequenceId,
      joinStatus: joinStatus,
      updatedAt: new Date()
    }
    await mysql("UserSequenceMap").insert(userSequenceMap)
  }
  // 更新接龙数据
  if (joinStatus == 1) {
    var sequence = await mysql("Sequence").where({ id: sequenceId }).first()
    if (sequence == null) {
      ctx.state.data = userSequenceMap
      return
    }
    var join = await mysql("UserSequenceMap").count("* as count").first().where({ sequenceId: params.sequenceId, joinStatus: 1 })
    var updateSequence = {
      joinCount: join.count,
      updatedAt: date
    }
    // 更新1v1接龙头像
    var imgList = new Array()
    if (sequence.imgList.length > 0) {
      imgList = JSON.parse(sequence.imgList)
    }
    if (sequence.type = "two" && imgList.length < 2) {
      var user = await mysql("cSessionInfo").select("user_info").where({ open_id: userId }).first()
      if (user != null && user.user_info != null) {
        var userInfo = JSON.parse(user.user_info)
        imgList.push(userInfo.avatarUrl)
        updateSequence.imgList = JSON.stringify(imgList)
      }
    }
    await mysql("Sequence").update(updateSequence).where({ id: sequenceId })
  }
  ctx.state.data = userSequenceMap
}