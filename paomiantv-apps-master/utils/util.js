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

function roundFun(value, n) {
  console.log(value, n);
  return Math.ceil(value * Math.pow(10, n)) / Math.pow(10, n);
}

module.exports = {
  formatTime: formatTime,
   roundFun: roundFun
}



