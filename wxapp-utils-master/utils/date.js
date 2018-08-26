/**
 * 返回日期时间戳对应的字符串
 *
 * @param {number} time - UNIX 时间戳，以毫秒为单位
 */
function format(time) {
  const thedate = new Date(time)
  const year = thedate.getFullYear()
  const month = thedate.getMonth()
  const d = thedate.getDate()

  const hour = thedate.getHours()
  const minute = thedate.getMinutes()

  return `${p(month)}月${p(d)}日 ${p(hour)}:${p(minute)}`
}

/**
 * 返回日期时间戳对应的差值字符串，比如“1秒前”
 *
 * @param {number} time - UNIX 时间戳，以毫秒为单位
 * @return {string}
 */
function diff(time) {
  const now = Date.now()
  const diff_ts = now - time
  if (diff_ts <= 0) return '刚刚'

  const S = 1000
  const M = 60 * S
  const H = 60 * M
  const D = 24 * H
  const MM = 30 * D
  const Y = 12 * MM

  const [ds, dm, dh, dd, dmm, dy] = [S, M, H, D, MM, Y].map(item => Math.floor(diff_ts/item))
  if (ds < 60) return ds + '秒前'
  if (dm < 60) return dm + '分钟前'
  if (dh < 24) return dh + '小时前'
  if (dd < 30) return dd + '天前'
  if (dmm < 12) return dmm + '月前'
  return dy + '年前'
}

function p(value) {
  return value < 10 ? ('0'+value) : (value + '')
}

export default {
  format,
  diff
}
