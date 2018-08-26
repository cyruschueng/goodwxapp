const { mysql } = require('../qcloud')
const path = require('path')
const fs = require('fs')
const uuid = require('node-uuid')

/**
  * 数据迁移 用户、成语关系
  */
module.exports = async ctx => {
  var uiPath = path.join(__dirname, '../lean/UserIdiomMap.json')
  var uiFile = await fs.readFileSync(uiPath, 'utf8')
  var uiData = await JSON.parse(uiFile.toString())
  for (var i = 0; i < uiData.results.length; i++) {
    var item = uiData.results[i]
    var userResult = await mysql("cSessionInfo").select("open_Id").where({ leanId: item.user.objectId }).first()
    var userId = userResult.open_Id
    var likeStatus
    if (item.like) {
      likeStatus = 1
    } else {
      likeStatus = 2
    }
    var ui = {
      id: item.objectId,
      userId: userId,
      idiomId: item.idiom.objectId,
      likeStatus: likeStatus,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt)
    }
    await mysql("UserIdiomMap").insert(ui).catch(err => { console.log(err) })
  }

  ctx.state.data = "OK"
}