const { mysql } = require('../qcloud')
const path = require('path')
const fs = require('fs')

/**
  * 获取数据数量
  */
module.exports = async ctx => {
  var data = new Object()

  // var userFilePath = path.join(__dirname, "../lean/_User.json")
  // var userFile = await fs.readFileSync(userFilePath, "utf8")
  // var userData = await JSON.parse(userFile.toString())
  // data.oldUserCount = userData.results.length
  var userCountResult = await mysql("cSessionInfo").count("* as count").first()
  data.userCount = userCountResult.count

  // var sequenceFilePath = path.join(__dirname, "../lean/Sequence.json")
  // var sequenceFile = await fs.readFileSync(sequenceFilePath, "utf8")
  // var sequenceData = await JSON.parse(sequenceFile.toString())
  // data.oldSequenceCount = sequenceData.results.length
  var sequenceCountResult = await mysql("Sequence").count("* as count").first()
  data.sequenceCount = sequenceCountResult.count

  // var idiomFilePath = path.join(__dirname, "../lean/Idiom.json")
  // var idiomFile = await fs.readFileSync(idiomFilePath, "utf8")
  // var idiomData = await JSON.parse(idiomFile.toString())
  // data.oldIdiomCount = idiomData.results.length
  var idiomCountResult = await mysql("Idiom").count("* as count").first()
  data.idiomCount = idiomCountResult.count

  // var usFilePath = path.join(__dirname, "../lean/UserSequenceMap.json")
  // var usFile = await fs.readFileSync(usFilePath, "utf8")
  // var usData = await JSON.parse(usFile.toString())
  // data.oldUsCount = usData.results.length
  var usCountResult = await mysql("UserSequenceMap").count("* as count").first()
  data.usCount = usCountResult.count

  // var uiFilePath = path.join(__dirname, "../lean/UserIdiomMap.json")
  // var uiFile = await fs.readFileSync(uiFilePath, "utf8")
  // var uiData = await JSON.parse(uiFile.toString())
  // data.oldUiCount = uiData.results.length
  var uiCountResult = await mysql("UserIdiomMap").count("* as count").first()
  data.uiCount = uiCountResult.count

  ctx.state.data = data
}