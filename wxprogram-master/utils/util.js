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

// var Promise = require('bluebird.min.js')
// function wxPromisify(fn) {
//   return function (obj = {}) {
//     return new Promise((resolve, reject) => {
//       obj.success = function (res) { resolve(res) }
//       obj.fail = function (res) { reject(res) }
//       fn(obj)
//     })
//   }
// }

module.exports = {
  formatTime: formatTime,
  formatNumber: formatNumber,
  // wxPromisify: wxPromisify
}
