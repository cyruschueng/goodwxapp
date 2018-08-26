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

//去左空格;
function ltrim(s){
  return s.replace(/(^\s*)/g, "");
}

//去右空格;
function rtrim(s) {
  return s.replace(/(\s*$)/g, "");
}

//去左右空格;
function trim(s) {
  return s.replace(/(^\s*)|(\s*$)/g, "");
}

module.exports = {
  formatTime: formatTime,
  ltrim: ltrim,
  rtrim: rtrim,
  trim: trim
}
