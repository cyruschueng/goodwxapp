const { mysql } = require('../qcloud')
const util = require('../tools/util.js')

module.exports = async function (ctx, next) {
  const { text } = ctx.request.body
  let openID = ctx.state.userSession.open_id
  let feedID = await addFeedback(text, openID)
  ctx.state.data = {
    msg: '反馈成功'
  }
}

async function addFeedback (text, openID) {
  return mysql('feedback').insert({
    text: text,
    open_id: openID
  })
}