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

const formatAudioProcess = s => {
  let t = '';
  if (s > -1) {
    let hour = Math.floor(s / 3600);
    let min = Math.floor(s / 60) % 60;
    let sec = s % 60;
    if (hour > 0) {
      if (hour < 10) {
        t = '0' + hour + ":";
      } else {
        t = hour + ":";
      }
    }

    if (min < 10) { t += "0"; }
    t += min + ":";
    if (sec < 10) { t += "0"; }
    t += sec.toFixed(0);
  }
  return t;
}

module.exports = {
  formatTime: formatTime,
  formatAudioProcess: formatAudioProcess
}
