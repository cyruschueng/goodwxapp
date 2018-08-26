const { mysql } = require('../qcloud')
const path = require('path')
const fs = require('fs')
const uuid = require('node-uuid')

/**
  * 数据迁移 用户、接龙关系
  */
module.exports = async ctx => {
  var usPath = path.join(__dirname, '../lean/UserSequenceMap.json')
  var usFile = await fs.readFileSync(usPath, 'utf8')
  var usData = await JSON.parse(usFile.toString())
  for (var i = 0; i < usData.results.length; i++) {
    var item = usData.results[i]
    if (item.user != null && item.user != undefined) {
      var userResult = await mysql("cSessionInfo").select("open_Id").where({ leanId: item.user.objectId }).first()
      var userId = userResult.open_Id
      var joinStatus = 0
      if (item.join) {
        joinStatus = 1
      } else {
        joinStatus = 2
      }
      var us = {
        id: item.objectId,
        userId: userId,
        sequenceId: item.sequence.objectId,
        joinStatus: joinStatus,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt)
      }
      await mysql("UserSequenceMap").insert(us).catch(err => { console.log(err) })
    }
  }

  ctx.state.data = "OK"
}