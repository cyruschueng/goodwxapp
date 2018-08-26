const { mysql } = require('../qcloud')

/**
  * 获取今日接龙排行榜
  */
module.exports = async ctx => {
  var date = new Date()
  var today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  var sequenceList = await mysql("Sequence").where("today", today).andWhere("todayCount", ">", 0).orderBy("todayCount", "desc").limit(10)
  sequenceList.forEach(sequence => {
    sequence.creator = JSON.parse(sequence.creator)
    sequence.lastIdiomCreator = JSON.parse(sequence.lastIdiomCreator)
    if (sequence.imgList.length > 0) {
      sequence.imgList = JSON.parse(sequence.imgList)
    }
  })
  ctx.state.data = sequenceList
}