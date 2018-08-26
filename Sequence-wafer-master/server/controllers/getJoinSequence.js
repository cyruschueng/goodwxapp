const { mysql } = require('../qcloud')

/**
  * 获取参与的接龙
  * 传入 userId、page
  */
module.exports = async ctx => {
  var params = ctx.query
  var pageSize = 10
  var page = 1
  if (params.page != null) {
    page = Number(params.page)
  }
  var sequenceList = await mysql("Sequence").select("Sequence.*").innerJoin("UserSequenceMap", "Sequence.id", "UserSequenceMap.SequenceId").where({ userId: params.userId, joinStatus: 1 }).orderBy("Sequence.updatedAt", "desc").limit(pageSize).offset(pageSize * (page - 1))
  sequenceList.forEach(sequence => {
    sequence.creator = JSON.parse(sequence.creator)
    sequence.lastIdiomCreator = JSON.parse(sequence.lastIdiomCreator)
    if (sequence.imgList.length > 0) {
      sequence.imgList = JSON.parse(sequence.imgList)
    }
  })
  ctx.state.data = sequenceList
}