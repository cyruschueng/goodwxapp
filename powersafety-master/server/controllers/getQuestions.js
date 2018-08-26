module.exports = async (ctx, next) => {
  let query = ctx.query;
  if (ctx.state.$wxInfo.loginState === 1) {
    const { mysql } = require('../qcloud')
    await mysql('question_detail').select('*').where({sort_id: query.sortId}).limit(5).then(res => {
      ctx.state.data = res;
    })
  } else {
    ctx.state.code = -1
  }
}