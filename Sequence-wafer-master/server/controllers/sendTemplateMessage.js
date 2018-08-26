const http = require('axios')
const { mysql } = require('../qcloud')
const moment = require('moment')

/**
  * 发送模板消息
  */
module.exports = async function (openid, sequenceId, data) {
  var now = new Date()
  // 01:00 - 06:00 不推送
  if ((now.getHours() > 1 && now.getHours() < 6)) {
    return
  }
  // 获取 formId
  var user = await mysql("cSessionInfo").where({ open_id: openid }).first()
  if (user == null || user.formId == null || user.formId.length == 0) {
    return
  }
  // 获取用户更新时间，30 秒内不发推送，避免频繁发送
  var userVisitTime = new Date(user.last_visit_time)
  if ((now.getTime() - userVisitTime.getTime()) / 1000 < 30) {
    return
  }
  // 获取 access_token
  var access_token
  var info = await mysql("Info").first()
  if (info == null) {
    access_token = await getAccessToken(true)
  } else {
    var updatedAt = new Date(info.updatedAt)
    if ((now.getTime() - updatedAt.getTime()) / 1000 > info.expires_in / 2) {
      access_token = await getAccessToken(false)
    } else {
      access_token = info.access_token
    }
  }
  // 发送模板消息
  var res = await http({
    url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + access_token,
    method: 'POST',
    data: {
      touser: openid,
      template_id: "Zepqi3hK8RC1ccmmPSFjvUu25w2YyOwzUJzCoCrC_nA",
      page: "pages/idiom-list/idiom-list?id=" + sequenceId,
      form_id: user.formId,
      data: data,
      emphasis_keyword: "keyword1.DATA"
    }
  })
  if (res.data.errcode != 0) {
    console.log(moment().format('YYYY-MM-DD HH:mm:ss'))
    console.log(res.data)
  }
}

var getAccessToken = async function (isInsert) {
  var res = await http({
    url: 'https://api.weixin.qq.com/cgi-bin/token',
    method: 'GET',
    params: {
      grant_type: "client_credential",
      appid: "wxf89dd63594281828",
      secret: "1ad95ad3c0e3443581aaf17ffc004faf"
    }
  })
  if (res.data.access_token) {
    var info = res.data
    info.updatedAt = new Date()
    if (isInsert) {
      console.log(info)
      await mysql("Info").insert(info)
    } else {
      await mysql("Info").update(info)
    }
    return res.data.access_token
  } else {
    return ""
  }
}