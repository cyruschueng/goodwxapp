const { mysql } = require('../qcloud')

/**
  * 获取今日用户排行榜
  */
module.exports = async ctx => {
  var date = new Date()
  var today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  var userList = await mysql("cSessionInfo").where("today", today).andWhere("todayCount", ">", 0).orderBy("todayCount", "desc").limit(10)
  userList.forEach(user => {
    user.userInfo = JSON.parse(user.user_info)
  })
  ctx.state.data = userList
}