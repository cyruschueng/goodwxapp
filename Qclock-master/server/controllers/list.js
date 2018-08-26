const { mysql } = require('../qcloud')
const util = require('../tools/util.js')

async function send (ctx, next) {
  let openID = ctx.state.userSession.open_id
  console.log('openID', openID)
   try {
     let result = await mysql.select('id', 'time', 'title', 'detail', 'create_time', 'status').from('qAddClock').where({
       open_id: openID,
       is_delete: 0
     }).orderBy('time', 'desc')
     console.log(result)
     result = result.map(item => {
       item.create_time = util.getShowDate(item.create_time) + ' ' + util.getShowTime(item.create_time)
       item.time = util.getShowDate(item.time) + ' ' + util.getShowTime(item.time)
       if(item.status == 0) {
         item.status = '已创建'
       } else if (item.status == 1) {
         item.status = '待提醒'
       } else {
         item.status = '已提醒'
       }
       return item
     })
     console.log(result)
     ctx.state.data = result
   } catch (err) {
     ctx.state.code = -1
     ctx.state.data = {
       msg: err
     }
   }
}

async function receive(ctx, next) {
  let openID = ctx.state.userSession.open_id
  try {
    let result = await mysql.select('id', 'a_id', 'time', 'create_time', 'status').from('qReceiveClock').where({
      open_id: openID,
      is_delete: 0
    }).orderBy('time', 'desc')
    
    console.log(result)
    for(var i = 0; i < result.length; i ++) {
      let item = result[i]
      item.create_time = util.getShowDate(item.create_time) + ' ' + util.getShowTime(item.create_time)
      let clock = await getClockByID(item.a_id)
      item.time = util.getShowDate(item.time) + ' ' + util.getShowTime(item.time)
      item.title = clock[0].title
      item.detail = clock[0].detail
      if (item.status == 1) {
        item.status = '待提醒'
      } else {
        item.status = '已提醒'
      }
    }
    console.log(result)
    ctx.state.data = result
  } catch (err) {
    ctx.state.code = -1
    ctx.state.data = {
      msg: err
    }
  }
}

module.exports = {
  send,
  receive
}

async function getClockByID(id) {
  return mysql.select('title', 'detail').from('qAddClock').where({
    id: id
  })
}