let Promise = require('../assets/promise')

class Tools {

  constructor() {}

  /**
   * let wx.function use promise
   * @param  {Function} fn [description]
   * @return {Function}    [description]
   */
  wxPromise (fn) {
    return function (obj = {}) {
      return new Promise((resolve, reject) => {
        obj.success = function (res) { resolve(res) }
        obj.fail = function (res) { reject(res) }
        fn(obj)
      })
    }
  }

  /**
   * @param  {Date}
   * @return {Y/M/D H:M:S}
   */
  formatTime (date) {
    let _Y = date.getFullYear()
    let _M = date.getMonth() + 1
    let _D = date.getDate()

    let _h = date.getHours()
    let _m = date.getMinutes()
    let _s = date.getSeconds()

    return [_Y, _M, _D].map(this.formatNumber).join('/') + ' ' + [_h, _m, _s].map(this.formatNumber).join(':')
  }

  /**
   * @param  {Date}
   * @return {Y-M-D}
   */
  formatDay (date) {
    let _Y = date.getFullYear()
    let _M = date.getMonth() + 1
    let _D = date.getDate()

    return [_Y, _M, _D].map(this.formatNumber).join('-')
  }

  /**
   * string completion
   * @param  {Number}
   * @return {String}
   */
  formatNumber (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }

  /**
   * 判断某个元素是否为undefined
   * @param  {undefined}  value 
   * @return {Boolean}       
   */
  isUndefined(value) {
    return typeof value === 'undefined'
  }

  /**
   * 判断某个元素是否为数组
   * @param  {Array}  value 
   * @return {Boolean}       
   */
  isArray(value) {
    return Array.isArray(value)
  }

  /**
   * 判断某个元素是否为对象
   * @param  {Obejct}  value 
   * @return {Boolean}       
   */
  isObject(value) {
    return value !== null && typeof value === 'object'
  }

  /**
   * 拼接URL
   * @param  {String} obj 
   * @param  {Object} obj 
   * @return {String} 
   */
  buildUrl(url, obj) {
    const serializedParams = this.paramSerializer(obj)
  if (serializedParams.length > 0) {
    url += ((url.indexOf('?') == -1) ? '?' : '&') + serializedParams
  }
  return url
  }

}

export default Tools