module.exports = async (ctx, next) => {
  let query = ctx.query;
  let openId = query.openId;
  if (ctx.state.$wxInfo.loginState === 1) {
    const { mysql } = require('../qcloud')
    await mysql('cSessionInfo').where({
      open_id: openId
    }).select('score').then(scoreRes=>{
      let score = scoreRes[0].score;
      score = score + query.count * 10;
      mysql('cSessionInfo').where({
        open_id: openId
      }).update('score', score).then(res => {
        console.info(openId + '得分已更新:' + score)
      }, error => {
        //201803010019:此处添加数据库操作失败报错
        console.log(error)
      })
    });
    
    
  } else {
    ctx.state.code = -1
  }
}