const { mysql } = require('../qcloud')
const path = require('path')
const fs = require('fs')
const uuid = require('node-uuid')

/**
  * 数据迁移 成语
  */
module.exports = async ctx => {
  var idiomPath = path.join(__dirname, '../lean/Idiom.json')
  var idiomFile = await fs.readFileSync(idiomPath, 'utf8')
  var idiomData = await JSON.parse(idiomFile.toString())
  for (var i = 0; i < idiomData.results.length; i++) {
    var item = idiomData.results[i]
    if (item.creator != null && item.creator != undefined) {
      if (item.creator.id == "597db43bfe88c20057d4c596") {
        item.creator.id = "o_nsO0aL8wtalk_U4qycn5XQWsRg"
      } else {
        var creatorResult = await mysql("cSessionInfo").select("open_Id").where({ leanId: item.creator.id }).first()
        item.creator.id = creatorResult.open_Id
      }
      var idiom = {
        id: item.objectId,
        creatorId: item.creator.id,
        creator: await JSON.stringify(item.creator),
        idiomNum: item.idiomNum,
        likeCount: item.likeCount,
        unLikeCount: item.unLikeCount,
        pinyin: await JSON.stringify(item.pinyin),
        value: item.value,
        sequenceId: item.sequence.objectId,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt)
      }
      await mysql("Idiom").insert(idiom).catch(err => { console.log(err) })
    }
  }

  ctx.state.data = "OK"
}