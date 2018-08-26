function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
function formatTime2(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-') 
}
function formatTime4(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()+2

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-')
}
function formatTime3(date) {
  var hour = date.getHours()
  var minute = date.getMinutes()
  return [hour, minute].map(formatNumber).join(':')
}
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 秒转换成时间 MM:SS
function durationFormat(time) {

  let second = Math.floor(time / 1000);// 总秒
  let min = 0;// 分
  let sec = 0;// 秒
  if (second > 60) {
    min = Math.floor(second / 60);
    sec = Math.floor(second % 60);
  } else {
    sec = second;
  }
  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  return min + ':' + sec;
}
function formatDate(time) {
  var timer = null;
  var myDate = new Date(time);
  var year = myDate.getFullYear();
  var month = myDate.getMonth() + 1;
  var day = myDate.getDate();
  var hour = myDate.getHours();
  var minute = myDate.getMinutes();
  var second = myDate.getSeconds();
  var hms = '';
  hms += forma(hour) + ":";
  hms += forma(minute) + ":";
  hms += forma(second);
  var rtime = '';
  rtime += year + "-";
  rtime += month + "-";
  rtime += day + "  ";
  var d = Math.floor((new Date().getTime()) / (1000 * 60 * 60 * 24)) - Math.floor(myDate.getTime() / (1000 * 60 * 60 * 24));
  switch (d) {
    case 0: timer = '今天  ' + hms; break;
    case 1: timer = '昨天  ' + hms; break;
    case 2: timer = '前天  ' + hms; break;
    default: timer = rtime + hms;;
  }
  return timer;

}
function forma(time) {
  return time < 10 ? '0' + time : time;
}
module.exports = {
  formatTime: formatTime,
  formatTime2: formatTime2,
  formatTime4: formatTime4,
  formatTime3: formatTime3,
  durationFormat: durationFormat,
  formatDate: formatDate
}
