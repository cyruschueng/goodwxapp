const { mysql } = require('../qcloud')
const uuid = require('node-uuid')

/**
  * 保存成语点赞状态
  * 传入userId、idiomId、likeStatus
  */
module.exports = async ctx => {
  var params = ctx.request.body
  var userId = params.userId
  var idiomId = params.idiomId
  var likeStatus = params.likeStatus
  var updatedAt = new Date()
  var isLikeChange = false
  var userIdiomMap = await mysql("UserIdiomMap").where({ userId, idiomId }).first()
  if (userIdiomMap == null) {
    userIdiomMap = {
      id: uuid.v1(),
      userId: userId,
      idiomId: idiomId,
      likeStatus: likeStatus,
      updatedAt: updatedAt
    }
    await mysql("UserIdiomMap").insert(userIdiomMap)
  } else if (userIdiomMap.likeStatus != likeStatus) {
    isLikeChange = true
    await mysql("UserIdiomMap").update({ likeStatus, updatedAt }).where({ id: userIdiomMap.id })
  }
  // 更新点赞、点踩数量
  if (likeStatus == 1 || isLikeChange) {
    var like = await mysql("UserIdiomMap").count("* as count").where({ idiomId, likeStatus: 1 }).first()
    await mysql("Idiom").update({ likeCount: like.count, updatedAt }).where({ id: idiomId })
  }
  if (likeStatus == 2 || isLikeChange) {
    var unLike = await mysql("UserIdiomMap").count("* as count").where({ idiomId, likeStatus: 2 }).first()
    await mysql("Idiom").update({ unLikeCount: unLike.count, updatedAt }).where({ id: idiomId })
  }
  ctx.state.data = "OK"
}