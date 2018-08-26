function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatTimeStamp(timestamp) {
  if (!timestamp) {
    return ''
  }
 
  var date = new Date(Number(timestamp))
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  console.log(timestamp + ' formatTimeStamp:' + date)
  return [year, month, day].map(formatNumber).join('/')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatTimeStamp: formatTimeStamp
}
