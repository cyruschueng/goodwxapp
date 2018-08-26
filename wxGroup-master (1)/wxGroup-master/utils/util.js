function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


function getNowFormatDate(time) {
  var date = new Date();
  if(time){
    date = date.getTime()+time;
    date = new Date(date);
  }
  var seperator1 = "-";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
  return currentdate;
}

function getNowFormatTime(time) {
  var date = new Date();
  if (time) {
    date = date.getTime() + time;
    date = new Date(date);
  }
  var hour = date.getHours();
  var minute = date.getMinutes();
  if(date.getHours() <= 9){
    hour = "0"+date.getHours();
  }
  if (date.getMinutes() <= 9) {
    minute = "0" + date.getMinutes();
  }
  var seperator2 = ":";
  var currentdate = hour + seperator2 + minute;
  return currentdate;
}


function convertDateFromString(dateString) {
  if (dateString) {
    var arr1 = dateString.split(" ");
    var sdate = arr1[0].split('-');
    var stime = arr1[1].split(':');
    var date = new Date(sdate[0], sdate[1] - 1, sdate[2]);
    date = date.getTime() + parseInt(stime[0]) * 60 * 60 * 1000 + parseInt(stime[1]) * 60 * 1000 + parseInt(stime[1]) * 1000;
    return date;
  }
}


module.exports = {
  formatTime: formatTime,
  getNowFormatDate: getNowFormatDate,
  getNowFormatTime: getNowFormatTime,
  convertDateFromString: convertDateFromString
}



