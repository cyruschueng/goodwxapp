const formatTime = timestamps => {
  let d = new Date(timestamps * 1000)

  let
    year = d.getFullYear(),
    month = (d.getMonth() + 1),
    date = d.getDate(),
    hours = d.getHours(),
    minutes = d.getMinutes(),
    seconds = d.getSeconds()

  hours = hours < 10 ? "0" + hours : hours
  minutes = minutes < 10 ? "0" + minutes : minutes
  seconds = seconds < 10 ? "0" + seconds : seconds

  return {
    year,
    month,
    date,
    hours,
    minutes,
    seconds,
  }
}

const isToday = target => {
  let d = new Date()
  let t = new Date(target * 1000)
  return t.getDate() == d.getDate() && t.getMonth() == d.getMonth() && t.getFullYear() == d.getFullYear()
}

const getTodayTimestampFromZero = () => {
  let d = new Date()
  d.setHours(0)
  d.setMinutes(0)
  d.setSeconds(0)
  d.setMilliseconds(0)
  let unixTimeStamp = Math.floor(d.getTime() / 1000)
  return unixTimeStamp
}


const debounce = (func, wait, immediate) => {
  var timeout, args, context, timestamp, result

  var later = function() {
    var last = Date.now() - timestamp

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function() {
    context = this
    args = arguments
    timestamp = Date.now()
    var callNow = immediate && !timeout
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

module.exports = {
  formatTime,
  isToday,
  getTodayTimestampFromZero,
  debounce,
}