export default {
  // 金额格式化
  fmoney (s, n) {
    n = n > 0 && n <= 20 ? n : 2
    s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + ''
    let l = s.split('.')[0].split('').reverse()
    let r = s.split('.')[1]
    let t = ''
    for (let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
    }
    return t.split('').reverse().join('') + '.' + r
  },
  // 合并global参数
  mergeBaseData(data, globalData, baseData) {
    if (typeof baseData !== 'undefined') {
      baseData.forEach(function (item, index) {
        data[item] = globalData[item]
      })
    }
    data.token = globalData.token
    return data
  },
  // 格式化data
  FormatDate () {
    Array.prototype.indexOf = function (obj) {
      for (var i = 0; i < this.length; i++) {
        if (this[i] === obj) {
          return i
        }
      }
      return -1
    }
   /*  dateString += ''
    if (!dateString) return ''
    var time =  dateString === undefined || dateString === '' || dateString === 'undefined' ? new Date() : new Date($.trim(dateString.replace(/-/g, '/').replace(/T|Z/g, ' ')))
    if (/^([0-9]+)$/.test(dateString)) {
      time.setTime(dateString)
    } */
    Date.prototype.FormatDate = function(format) {
      var o = {
        'M+': this.getMonth() + 1, // 月份
        'd+': this.getDate(), // 日
        'h+': this.getHours(), // 小时
        'm+': this.getMinutes(), // 分
        's+': this.getSeconds(), // 秒
        'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
        'S': this.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
          format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return format
    }
  }
}
