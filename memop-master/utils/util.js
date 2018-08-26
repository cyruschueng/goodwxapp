const LOGIN_URL = 'https://www.rightright.xyz/api/login'
const POST_USER_INFO_URL = 'https://www.rightright.xyz/api/post_user_info'
const GET_GROUP_MEMO_URL = 'https://www.rightright.xyz/api/get_group_memo'
const GET_MEMO_LIST_URL = 'https://www.rightright.xyz/api/get_memo_list'
const POST_MEMO_URL = 'https://www.rightright.xyz/api/post_memo'
const DELETE_MEMO_URL = 'https://www.rightright.xyz/api/delete_memo'

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatDate = date => {
  var m = date.getMonth() + 1
  return date.getFullYear() + '年' + m + '月' + date.getDate() + '日'
}

const ymdDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

const getLocalSeconds = date => {
  return Date.parse(date) / 1000 - 8 * 3600
}

const sameDay = (date,to) => {
  if (date.getFullYear() == to.getFullYear() 
      && date.getMonth() == to.getMonth()
      && date.getDate() == to.getDate())
  {
    return true
  }
  return false
}

/*
 * if date is early than ts, return true
 */
const pastDay = (date,to) => {
  if (date.getFullYear() < to.getFullYear()) {
    return true
  }
  if (date.getFullYear() > to.getFullYear()) {
    return false
  }
  if (date.getMonth() < to.getMonth()) {
    return true
  }
  if (date.getMonth() > to.getMonth()) {
    return false
  }
  if (date.getDate() < to.getDate()) {
    return true
  }
  return false
}

/*
 * if date is late than to, return true
 */
const futureDay = (date,to) => {
  if (!sameDay(date, to) && !pastDay(date, to)) {
    return true
  }
  return false
}

const weekDay = date => {
  var week = {
    0: '星期天',
    1: '星期一',
    2: '星期二',
    3: '星期三',
    4: '星期四',
    5: '星期五',
    6: '星期六'
  }
  return week[date.getDay()]
}

const getDayStartSecs = date => {
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date.getTime() / 1000 - 8 * 3600
}

module.exports = {
  formatTime: formatTime,
  getLocalSeconds: getLocalSeconds,
  sameDay: sameDay,
  pastDay: pastDay,
  futureDay: futureDay,
  weekDay: weekDay,
  formatDate: formatDate,
  getDayStartSecs: getDayStartSecs,
  ymdDate: ymdDate,

  LOGIN_URL: LOGIN_URL,
  POST_USER_INFO_URL: POST_USER_INFO_URL,
  GET_GROUP_MEMO_URL: GET_GROUP_MEMO_URL,
  GET_MEMO_LIST_URL: GET_MEMO_LIST_URL,
  POST_MEMO_URL: POST_MEMO_URL,
  DELETE_MEMO_URL: DELETE_MEMO_URL,
}
