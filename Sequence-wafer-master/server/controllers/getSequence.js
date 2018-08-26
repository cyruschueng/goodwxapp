const { mysql } = require('../qcloud')

/**
  * 获取接龙
  * 传入 userId、sequenceId
  */
module.exports = async ctx => {
  var params = ctx.query
  var userId = ""
  if (params.userId != null) {
    userId = params.userId
  }
  var sequenceId = params.sequenceId
  var sequence = await mysql("Sequence").select("Sequence.*", "UserSequenceMap.joinStatus").leftJoin(function () {
    this.select("*").from("UserSequenceMap").where({ userId, sequenceId }).as("UserSequenceMap")
  }, "Sequence.id", "UserSequenceMap.sequenceId").where({ "Sequence.id": sequenceId }).first()
  sequence.creator = JSON.parse(sequence.creator)
  sequence.lastIdiomCreator = JSON.parse(sequence.lastIdiomCreator)
  if (sequence.imgList.length > 0) {
    sequence.imgList = JSON.parse(sequence.imgList)
  }
  ctx.state.data = sequence
}