const { mysql } = require('../qcloud')

/**
  * 获取总接龙排行榜
  */
module.exports = async ctx => {
  var sequenceList = await mysql("Sequence").where("idiomCount", ">", 0).orderBy("idiomCount", "desc").limit(10)
  sequenceList.forEach(sequence => {
    sequence.creator = JSON.parse(sequence.creator)
    sequence.lastIdiomCreator = JSON.parse(sequence.lastIdiomCreator)
    if (sequence.imgList.length > 0) {
      sequence.imgList = JSON.parse(sequence.imgList)
    }
  })
  ctx.state.data = sequenceList
}