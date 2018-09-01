const { mysql } = require('../qcloud')
const moment = require('moment')
const http = require('axios')
const getToken = require('../tools/schedule.js')
const schedule = require('node-schedule');
const util = require('../tools/util.js')

let now = new Date()
mysql.select('id', 'a_id', 'form_id', 'open_id', 'time').from('qReceiveClock').where({
  status: 1,
  is_delete: 0
}).andWhere('time', '>', now).then(clocks => {
  return clocks.map((clock) => {
    return {
      a_id: clock.a_id,
      r_id: clock.id,
      time: clock.time,
      r_open_id: clock.open_id,
      r_form_id: clock.form_id,
    }
  })
}).then(clockIDs => {
  for(let i = 0; i < clockIDs.length; i ++) {
    reAddClock2Schedule(clockIDs[i])
  }
})

function reAddClock2Schedule (clock) {
  console.log(clock)
  mysql.select('title', 'detail').from('qAddClock').where({
    id: clock.a_id
  }).then(aClock => {
    console.log(aClock)
    addSchedule(clock.time, aClock[0].title, aClock[0].detail, clock.r_form_id, clock.r_open_id, clock.a_id, clock.r_id)
  })
}
//添加闹钟
async function addClockNew(ctx, next) {
  console.log(ctx.state.userSession)
  // parse body
  const { clock_type, date, title, detail, form_id } = ctx.request.body
  console.log('收到date', date)
  try {
    let newDate = new Date(date)
    let currentDate = new Date()
    let aWeekLaterDate = new Date()
    aWeekLaterDate.setHours(aWeekLaterDate.getHours() + 24 * 7)
    if (newDate < currentDate) {
      console.log(newDate, currentDate)
      throw new Error('闹钟时间不可比当前时间早')
      // return
    } else if (newDate > aWeekLaterDate) {
      throw new Error('时间要设定在一周之内哦')
      // return
    }
    //添加数据库
    let openID = ctx.state.userSession.open_id
    let clockID = await addClock2DB(clock_type, newDate, title, detail, form_id, openID)

    ctx.state.data = {
      'msg': '添加成功',
      'clockID': clockID[0]
    }
  } catch (err) {
    ctx.state.code = -3
    ctx.state.data = {
      msg: err && err.message ? err.message : '出错了'
    }
  }
}

//添加闹钟
async function addClock (ctx, next)  {
  console.log(ctx.state.userSession)
  // parse body
  const { clock_type, date, title, detail, time, form_id } = ctx.request.body
  console.log(date, time)
  let newDate = configNewDate(date, time)
  try {
    let currentDate = new Date()
    let aWeekLaterDate = new Date()
    aWeekLaterDate.setHours(aWeekLaterDate.getHours() + 24 * 7)
    if(newDate < currentDate) {
      console.log(newDate, currentDate)
      throw new Error('闹钟时间不可比当前时间早')
      // return
    } else if (newDate > aWeekLaterDate) {
      throw new Error('时间要设定在一周之内哦')
      // return
    }
    //添加数据库
    let openID = ctx.state.userSession.open_id
    let clockID = await addClock2DB(clock_type, newDate, title, detail, form_id, openID)

    ctx.state.data = {
      'msg': '添加成功',
      'clockID': clockID[0]
    }
  } catch (err) {
    ctx.state.code = -3
    ctx.state.data = {
      msg: err && err.message ? err.message : '出错了'
    }
  }
}

//获取闹钟，返回客户端
async function getClock (ctx, next) {
  const { id, de } = ctx.query
  let openID = ctx.state.userSession.open_id
  let clocks = await getClockByID(id)
  let clock = clocks[0]
  console.log(id, clock)
  if(de == 1) {
    let r_clocks = await mysql.select('id', 'status').from('qReceiveClock').where({
      a_id: id,
      open_id: openID
    })
    console.log(r_clocks)
    if(r_clocks.length > 0) {
      clock.status = r_clocks[0].status
    } else {
      clock.status = 0
    }
  } else {
    clock.status = 0
  }
  ctx.state.data = clock
}
/**
 * 确认闹钟
 */
async function confirmClock(ctx, next) {
  let openID = ctx.state.userSession.open_id
  const { id, form_id } = ctx.request.body
  let clocks = await getClockByID(id)
  if(clocks.length == 0) {
    throw new Error('该闹钟已经被删除')
    return
  }
  let clock = clocks[0]
  if(clock.type == 0) {
    await updateClock2DB(id, form_id, 1)
    let receives = await addReceivedClock2DB(id, form_id, openID, clock.time)
    addSchedule(clock.time, clock.title, clock.detail, form_id, openID, clock.id, receives[0])
  }
  ctx.state.data = clock[0]
}
/**
 * 好友接受闹钟
 */
async function acceptClock(ctx, next) {
  let openID = ctx.state.userSession.open_id
  const { id, form_id } = ctx.request.body
  let clocks = await getClockByID(id)
  if (clocks.length == 0) {
    throw new Error('该闹钟已经被删除')
    return
  }
  let clock = clocks[0]
  if (clock.type == 1) {
    await updateClock2DB(id, null, 1)
    let receives = await addReceivedClock2DB(id, form_id, openID, clock.time)
    addSchedule(clock.time, clock.title, clock.detail, form_id, openID, clock.id, receives[0])
  }
  ctx.state.data = clock[0]
}

module.exports = {
  addClock,
  addClockNew,
  getClock,
  confirmClock,
  acceptClock
}

//客户端选择的时间创建日期对象
function configNewDate(date, time) {
  let dateArray = date.split('-')
  let timeArray = time.split(':')
  dateArray.push(timeArray[0])
  dateArray.push(timeArray[1])
  dateArray.push('00')
  console.log(dateArray)
  return new Date(dateArray[0], parseInt(dateArray[1]) - 1, dateArray[2], dateArray[3], dateArray[4], dateArray[5])
}
//添加闹钟到数据库
async function addClock2DB(clock_type, newDate, title, detail, form_id, openID) {
  return mysql('qAddClock').insert({
    time: newDate,
    title: title,
    detail: detail,
    type: clock_type,
    add_form_id: form_id,
    open_id: openID,
    status: 0,
    is_delete: 0
  })
}
//更新确认的formID到数据库
async function updateClock2DB(id, form_id, status) {
  let value = {
    status: status
  }
  if(form_id) {
    value.con_form_id = form_id
  }
  return mysql('qAddClock').update(value).where({
    id: id
  })
}
//添加接受闹钟到数据库
async function addReceivedClock2DB(a_id, form_id, openID, time) {
  return mysql('qReceiveClock').insert({
    a_id: a_id,
    form_id: form_id,
    open_id: openID,
    time: time,
    status: 1,
    is_delete: 0
  })
}
async function updateReceivedClock2DB(id, status) {
  return mysql('qReceiveClock').update({
    status: status
  }).where({
    id: id
  })
}
//添加闹钟到数据库
async function getClockByID(id) {
  return mysql.select('id', 'time', 'title', 'detail', 'type').from('qAddClock').where({
    id: id
  })
}
//添加提醒事件
function addSchedule(newDate, title, detail, form_id, openID, clockID, receiveID) {
  schedule.scheduleJob(newDate, async function () {
    let token = await getToken()
    await updateClock2DB(clockID, null, 2)
    await updateReceivedClock2DB(receiveID, 2)
    http.post('https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + token, {
      "touser": openID,
      "template_id": "biWw4QNjW2ROOhls9lR1uU1UT2YxYyilnRa-brnNieM",
      "page": "pages/detail/detail?enterType=3&clockID=" + clockID,
      "form_id": form_id,
      "data": {
        "keyword1": {
          "value": title,
          "color": "#FF0000"
        },
        "keyword2": {
          "value": detail,
          "color": "#173177"
        },
        "keyword3": {
          "value": util.getShowDate(newDate) + ' ' + util.getShowTime(newDate),
          "color": "#173177"
        }
      },
      "emphasis_keyword": "keyword1.DATA"
    })
  });
}

