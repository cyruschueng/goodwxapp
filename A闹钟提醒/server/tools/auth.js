const http = require('axios')
const sha1 = require('./sha1')
const uuidGenerator = require('uuid/v4')
const moment = require('moment')
const { mysql } = require('../qcloud')
var secret = require('../secret.js')
//由用户的登陆code换取session
async function getSessionKey(code) {
  const appid = secret.appId
  const appsecret = secret.appSecret

  return http({
    url: 'https://api.weixin.qq.com/sns/jscode2session',
    method: 'GET',
    params: {
      appid: secret.appID,
      secret: secret.appSecret,
      js_code: code,
      grant_type: 'authorization_code'
    }
  }).then(res => {
    res = res.data
    if (res.errcode || !res.openid || !res.session_key) {
      throw new Error(JSON.stringify(res))
    } else {
      return res
    }
  })
}

async function saveUserInfo(userInfo) {
  const uuid = uuidGenerator()
  const create_time = moment().format('YYYY-MM-DD HH:mm:ss')
  const last_visit_time = create_time
  const open_id = userInfo.openid
  const session_key = userInfo.session_key
  const skey = sha1(session_key)
  const user_info = JSON.stringify({
    openId: open_id
  })

  // 查重并决定是插入还是更新数据
  return mysql('cSessionInfo').count('open_id as hasUser').where({
    open_id
  }).then(res => {
    // 如果存在用户则更新
    if (res[0].hasUser) {
      return mysql('cSessionInfo').update({
        uuid, skey, create_time, last_visit_time, session_key, user_info
      }).where({
        open_id
      })
    } else {
      return mysql('cSessionInfo').insert({
        uuid, skey, create_time, last_visit_time, open_id, session_key, user_info
      })
    }
  }).then(() => (
    {
    skey: skey
    }
  )).catch(e => {
    // debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
    throw new Error(e)
  })
}
// 登陆后返回用户 openid & skey
async function login (code) {
  let userInfo = await getSessionKey(code)
  return saveUserInfo(userInfo)
}

module.exports = {
  login
}

