const GET_GROUP_LIST_URL = 'https://www.rightright.xyz/api/get_group_list'
const GET_GROUP_INFO_URL = 'https://www.rightright.xyz/api/get_group_info'
const LOGIN_URL = 'https://www.rightright.xyz/api/login'
const POST_USER_INFO_URL = 'https://www.rightright.xyz/api/post_user_info'
const GET_NOTE_LIST_URL = 'https://www.rightright.xyz/api/get_note_list'
const GET_NOTE_DETAIL_URL = 'https://www.rightright.xyz/api/get_note_detail'
const POST_NOTE_URL = 'https://www.rightright.xyz/api/post_note'
const GET_COMMNET_LIST_URL = 'https://www.rightright.xyz/api/get_comment_list'
const POST_COMMENT_URL = 'https://www.rightright.xyz/api/post_note'
const THUMB_NOTE_URL = 'https://www.rightright.xyz/api/thumb_note'
const UNTHUMB_NOTE_URL = 'https://www.rightright.xyz/api/unthumb_note'


const formatTime = date => {
  const hour = date.getHours()
  const minute = date.getMinutes() 
  return [hour, minute].map(formatNumber).join(':')
}

const formatDate = date => {
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getIndexTime = str => {
  var d = new Date()
  var t = str.split(' ')

  var hm = t[1].split(':')
  var md = t[0].split('-')
  
  var curr_day = d.getDate()
  var curr_month = d.getMonth() + 1
  if (parseInt(md[1]) == curr_month && parseInt(md[2]) == curr_day) {
    return [hm[0], hm[1]].join(':')
  }
  return [md[1], md[2]].join('-')
}

const getNoteTime = str => {
  var t = str.split(' ')

  var hm = t[1].split(':')
  var md = t[0].split('-')

  return [md[1], md[2]].join('-') + ' ' + [hm[0], hm[1]].join(':')
}


module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  getIndexTime: getIndexTime,
  getNoteTime: getNoteTime,
  GET_GROUP_LIST_URL: GET_GROUP_LIST_URL,
  GET_GROUP_INFO_URL: GET_GROUP_INFO_URL,
  LOGIN_URL: LOGIN_URL,
  POST_USER_INFO_URL: POST_USER_INFO_URL,
  GET_NOTE_LIST_URL: GET_NOTE_LIST_URL,
  GET_NOTE_DETAIL_URL: GET_NOTE_DETAIL_URL,
  POST_NOTE_URL: POST_NOTE_URL,
  GET_COMMNET_LIST_URL: GET_COMMNET_LIST_URL,
  POST_COMMENT_URL: POST_COMMENT_URL,
  THUMB_NOTE_URL: THUMB_NOTE_URL,
  UNTHUMB_NOTE_URL: UNTHUMB_NOTE_URL
}
