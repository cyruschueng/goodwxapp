
var app = getApp();

function formatDate(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  var second = time

  return ([hour, minute, second]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}



function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


/**
 * 过滤HTML标签
 */
function htmlFilter(content) {
  let regExp = new RegExp("</?[^>]*>");
  let regExp2 = new RegExp("</[^>]*>");
  content = content.replace(regExp2,"")
  return content.replace(regExp,"")
}

module.exports = {
  "formatTime": formatTime,
  "htmlFilter":htmlFilter,
}

