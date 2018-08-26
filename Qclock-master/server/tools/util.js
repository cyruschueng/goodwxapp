
function getShowDate(rawDate) {
  var date = rawDate
  let str = date.toLocaleDateString()
  console.log(str)
  str = str.replace(/\//g, '-')
  let dateArray = str.split('-')
  console.log(dateArray)
  let showDate = dateArray[0] + '年' + fix(dateArray[1], 2) + '月' + fix(dateArray[2], 2) + '日'
  return showDate
}

function getShowTime(rawDate) {
  var date = rawDate
  let time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
  let timeArray = time.split(':')
  let showTime = fix(timeArray[0], 2) + ':' + fix(timeArray[1], 2) + ':' + fix(timeArray[2], 2)
  if (timeArray[0] < 12) {
    showTime = '上午 ' + showTime
  } else {
    showTime = '下午 ' + fix(parseInt(timeArray[0]) - 12, 2) + ':' + fix(timeArray[1], 2) + ':' + fix(timeArray[2], 2)
  }
  return showTime
}

function fix(num, length) {
  return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
}

module.exports = {
  getShowDate,
  getShowTime
}