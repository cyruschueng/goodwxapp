const { mysql } = require('../qcloud')
const moment = require('moment')

/**
  * 获取接龙成语列表
  * 传入 userId、sequenceId、page
  */
module.exports = async ctx => {
  var params = ctx.query
  var userId = ""
  if (params.userId != null) {
    userId = params.userId
  }
  var sequenceId = params.sequenceId
  var pageSize = 10
  var page = 1
  if (params.page != null) {
    page = Number(params.page)
  }
  var idiomList = await mysql("Idiom").select("Idiom.*", "UserIdiomMap.likeStatus").leftJoin(function () {
    this.select("*").from("UserIdiomMap").where({ userId }).as("UserIdiomMap")
  }, "Idiom.id", "UserIdiomMap.idiomId").where({ sequenceId }).orderBy("Idiom.idiomNum", "desc").limit(pageSize).offset(pageSize * (page - 1))
  idiomList.reverse()
  moment.locale('zh-cn')
  idiomList.forEach(idiom => {
    var date
    var now = moment()
    var createdAt = moment(idiom.createdAt)
    var yearDiff = now.format('YYYY') - createdAt.format('YYYY')
    if (yearDiff > 0) {
      date = createdAt.format('YYYY-MM-DD HH:mm')
    } else {
      var dayDiff = now.format('DDD') - createdAt.format('DDD')
      if (dayDiff > 1) {
        date = createdAt.format('MM-DD HH:mm')
      } else if (dayDiff > 0) {
        date = "昨天 " + createdAt.format('HH:mm')
      } else {
        var date = createdAt.fromNow()
      }
    }
    idiom.date = date
    idiom.creator = JSON.parse(idiom.creator)
    idiom.pinyin = JSON.parse(idiom.pinyin)
  })
  ctx.state.data = idiomList
}