function setTime(futureTime){
  //设置未来时间
  var Ftime = new Date(futureTime);
  var FtimeMs = Ftime.getTime();
  //获取本地时间
  var Ltime = new Date();
  var LtimeMs = Ltime.getTime();

  //获取时间差的秒数
  var diff = (FtimeMs - LtimeMs)/1000;
  if(diff < 0){
    return {
      hours:'0'+0,
      mins:'0'+0,
      secs:'0'+0
    };
  }
  //获取时间差的天
  var day = Math.floor(diff / (24*60*60));
  //获取时间差的时
  var hour = parseInt(diff /(60*60) %24);
  //获取时间差的分
  var min = getTwo(parseInt(diff/60%60));
  //获取时间差的秒
  var sec = getTwo(parseInt(diff % 60));

  //处理个位数
  function getTwo(num){
    return num < 10? '0' + num : num
  }
  var hours = getTwo(day*24 + hour)
  return {
    hours:hours,
    mins:min,
    secs:sec
  }
}

module.exports = {
  setTime:setTime
}
