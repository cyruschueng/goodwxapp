const { mysql } = require('../qcloud')
const path = require('path')
const fs = require('fs')
const uuid = require('node-uuid')

/**
  * 数据迁移 用户
  */
module.exports = async ctx => {
  var userFilePath = path.join(__dirname, '../lean/_User.json')
  var userFile = await fs.readFileSync(userFilePath, 'utf8')
  var userData = await JSON.parse(userFile.toString())
  for (var i = 0; i < userData.results.length; i++) {
    var item = userData.results[i]
    var userInfo = {
      openId: item.authData.lc_weapp.openid,
      nickName: item.nickName,
      gender: item.gender,
      language: item.language,
      city: item.city,
      province: item.province,
      country: item.country,
      avatarUrl: item.avatarUrl
    }
    var info = {
      open_id: item.authData.lc_weapp.openid,
      user_info: JSON.stringify(userInfo),
      idiomCount: item.idiomCount,
      today: item.today,
      todayCount: item.todayCount,
      create_time: new Date(item.createdAt),
      last_visit_time: new Date(item.updatedAt),
      uuid: uuid.v1(),
      leanId: item.objectId
    }
    await mysql("cSessionInfo").insert(info).catch(err => { console.log(err) })
  }

  ctx.state.data = "OK"
}