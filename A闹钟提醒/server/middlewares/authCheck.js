const { mysql } = require('../qcloud')

module.exports = async function (ctx, next) {
  const { 'x-wx-skey': skey } = ctx.req.headers
  console.log('ctx.req.headers, skey', skey)
  if(skey) {
    try {
      let session = await getUserInfoBySKey(skey)
      if(session.length == 0) {
        ctx.state.code = -2
        ctx.state.data = {
          msg: '需要登录'
        }
        return
      }
      console.log(session)
      ctx.state.userSession = session[0]
      await next()
    } catch (err) {
      console.log('发生了错误:', err)
    }
  } else {
    ctx.state.code = -2
    ctx.state.data = {
      msg: '需要登录'
    }
  }
}

async function getUserInfoBySKey(skey) {
  if (!skey) throw new Error('skey 为空')
  return mysql('cSessionInfo').select('*').where({
    skey: skey
  })
}