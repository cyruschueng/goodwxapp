const { mysql } = require('../qcloud')

/**
  * 获取总用户排行榜
  */
module.exports = async ctx => {
  var userList = await mysql("cSessionInfo").where("idiomCount", ">", 0).orderBy("idiomCount", "desc").limit(10)
  userList.forEach(user => {
    user.userInfo = JSON.parse(user.user_info)
  })
  ctx.state.data = userList
}