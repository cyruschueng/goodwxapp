function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
var wait = 60;
function getCodeTime(o){
  if (wait == 0) {
    o.setData({
      disable:false,
      btn_code_text:'获取'
    })
    wait = 60;
  } else {
    o.setData({
      disable: true,
      btn_code_text: wait + "s"
    })
    wait--;
    setTimeout(function () {
      getCodeTime(o)
    }, 1000)
  }
}
function circleCountDown(o,ctx) {
  const endAngle = o.data.endAngle;
  const xAngle = o.data.xAngle;
  var tempAngle = o.data.tempAngle;
  var startAngle = o.data.startAngle;
  var num = o.data.num;
    if (tempAngle >= endAngle) {
      return;
    } else if (tempAngle + xAngle > endAngle) {
      tempAngle = endAngle;
    } else {
      tempAngle += xAngle;
    }
    ctx.beginPath();
    ctx.setLineWidth(1)
    ctx.arc(50, 50, 50, startAngle, tempAngle);
    ctx.setFontSize(30)
    ctx.fillText(num, 42, 60);
    ctx.setStrokeStyle('lightgray');
    ctx.stroke();
    ctx.closePath();
    ctx.draw()
    o.setData({
      tempAngle: tempAngle,
    })
    setTimeout(function () {
      circleCountDown(o, ctx)
    }, 1)
}
function countDown(o,ctx) {
  var second = o.data.second
  var minute = o.data.minute
  var num = o.data.num
  o.setData({
    second: formatNumber(second),
    minute: formatNumber(minute)
  })
  second--;
  if (minute >=1 ){
    if (second == -1){
    second = 59
    minute--
  }
  }else if(minute == 0){
    if(second == -1)
     return;
  }else{
    return;
  }
  o.setData({
    second: formatNumber(second),
    minute: formatNumber(minute)
  })
  if (minute == 0){
    if (second > 0 && second <= 5) {
      // if (o.data.tempAngle >= o.data.endAngle){
        o.setData({
          // tempAngle: -(1 / 2 * Math.PI),
          num: o.data.num - 1,
          circle_status: true
        })
    // }
      // circleCountDown(o, ctx)
        ctx.beginPath();
        ctx.setLineWidth(2)
        ctx.arc(50, 50, 40, o.data.startAngle, o.data.endAngle);
        ctx.setFontSize(30)
        ctx.fillText(num, 42, 60);
        ctx.setStrokeStyle('lightgray');
        ctx.stroke();
        ctx.closePath();
        ctx.draw()
      o.setData({
       time_status: false
      })
    }else if(second == 0){
      o.setData({
        // tempAngle: -(1 / 2 * Math.PI),
        circle_status: false,
        time_status:false,
        start_status: true,
      })
    }else{

    }
  }
  
  setTimeout(function () {
    countDown(o,ctx)
  }, 1000)
}

module.exports = {
  formatTime: formatTime,
  formatNumber: formatNumber,
  getCodeTime: getCodeTime,
  countDown: countDown,
}

