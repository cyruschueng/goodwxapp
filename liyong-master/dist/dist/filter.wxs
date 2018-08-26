// use es5 syntax

module.exports = {
  toFixed: function (v, len = 2) {
    return Number(v).toFixed(len)
  },

  replace: function (v, substr, newSubstr) {
    var regexp = getRegExp(substr, 'g')
    return v.replace(regexp, newSubstr)
  },

  zero: function (s) {
    return s < 10 ? '0' + s : s
  },

  // Suffix: function (imgUrl, suffix) {
  //   var arr = ["!s", "!o"]
  //   if (!~arr.indexOf(suffix)) throw Error("param suffix must in array [" + arr + "]")
  //   return imgUrl.includes("upaiyun") ? "" + imgUrl + suffix : imgUrl
  // }

  includes: function (arr, v) {
    return arr.indexOf(v) > -1
  },

  isNowBetweenIn: function (startTime, endTime) {
    var now = Date.now()
    var _startTime = Date.parse(startTime)
    var _endTime = Date.parse(endTime)
    return now > _startTime && now < _endTime
  },

  diffWithNow: function (endTime) {
    var _end = Date.parse(endTime)
    var _start = Date.now()
    return ~~((_end - _start) / 1000)
  },

  fixHTML: function (html) {
    html += ''
    // fix img tag add `width="100%"`
    var regexp = getRegExp('(<img)', 'img')
    return html.replace(regexp, '$1 width="100%"')
  }
}
