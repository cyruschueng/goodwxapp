const { mysql } = require('../qcloud')
const path = require('path')
const fs = require('fs')
const uuid = require('node-uuid')

/**
  * 数据迁移 接龙
  */
module.exports = async ctx => {
  var sequenceFilePath = path.join(__dirname, '../lean/Sequence.json')
  var sequenceFile = await fs.readFileSync(sequenceFilePath, 'utf8')
  var sequenceData = await JSON.parse(sequenceFile.toString())
  for (var i = 0; i < sequenceData.results.length; i++) {
    var item = sequenceData.results[i]
    if (item.creator != null && item.lastIdiomCreator != null) {
      if (item.creator.id == "597db43bfe88c20057d4c596") {
        item.creator.id = "o_nsO0aL8wtalk_U4qycn5XQWsRg"
      } else {
        var creatorResult = await mysql("cSessionInfo").select("open_Id").where({ leanId: item.creator.id }).first()
        item.creator.id = creatorResult.open_Id
      }
      if (item.lastIdiomCreator.id == "597db43bfe88c20057d4c596") {
        item.lastIdiomCreator.id = "o_nsO0aL8wtalk_U4qycn5XQWsRg"
      } else {
        var lastIdiomCreatorResult = await mysql("cSessionInfo").select("open_Id").where({ leanId: item.lastIdiomCreator.id }).first()
        item.lastIdiomCreator.id = lastIdiomCreatorResult.open_Id
      }
      var sequence = {
        id: item.objectId,
        groupId: item.groupId,
        creatorId: item.creator.id,
        creator: await JSON.stringify(item.creator),
        lastIdiomCreatorId: item.lastIdiomCreator.id,
        lastIdiomCreator: await JSON.stringify(item.lastIdiomCreator),
        idiomCount: item.idiomCount,
        today: item.today,
        todayCount: item.todayCount,
        type: item.type,
        title: item.title,
        imgList: JSON.stringify(item.imgList),
        lastIdiom: item.lastIdiom,
        joinCount: item.joinCount,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt)
      }
      await mysql("Sequence").insert(sequence).catch(err => { console.log(err) })
    }
  }

  ctx.state.data = "OK"
}