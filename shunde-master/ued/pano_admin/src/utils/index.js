/**
 * 添加util方法
 * Vue.prototype.$utils
 */
import { previewUrl } from '../api/urlprovider.js'
import { on, off } from 'element-ui/src/utils/dom'

export default {
  install (Vue) {
    const uploadInput = document.createElement('input')
    uploadInput.setAttribute('type', 'file')
    uploadInput.setAttribute('multiple', 'multiple')
    const uploadStitchBatch = (callback) => {
      let _upload = () => {
        let res = {}
        if (!uploadInput.files) {
          callback(res)
          uploadInput.value = null
          return
        }
        Array.prototype.forEach.call(uploadInput.files, (item, index) => {
          let exec = /^0([1-9]).jpg$/i.exec(item.name)
          if (exec && exec[1]) {
            res[exec[1]] = item
          }
        })
        callback(res)
        uploadInput.value = null
      }
      uploadInput.onchange = _upload
      uploadInput.click()
    }
    Vue.prototype.$utils = {
      log (...arg) {
        console.log.apply(null, arg)
      },
      domOn (...value) {
        // element, event, handler
        on.apply({}, value)
      },
      domOff (...value) {
        // element, event, handler
        off.apply({}, value)
      },
      parseInt (value) {
        return window.parseInt(value)
      },
      parseFloat (value) {
        return window.parseFloat(value)
      },
      toType (obj) {
        return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
      },
      isEmpty (obj) {
        if (obj == null) {
          return true
        }
        let type = this.toType(obj)
        if (type === 'string') {
          return obj === ''
        }
      },
      // 对象的浅拷贝
      shallowCopy (src) {
        var dst = {}
        for (var prop in src) {
          if (src.hasOwnProperty(prop)) {
            dst[prop] = src[prop]
          }
        }
        return dst
      },
      // body的overflow为hidden
      hideBody () {
        document.getElementsByTagName('body')[0].style.overflow = 'hidden'
      },
      // body的overflow为visible
      showBody () {
        document.getElementsByTagName('body')[0].style.overflow = 'visible'
      },
      // 获取浏览器窗口的可视区域的宽度
      getViewPortWidth () {
        return document.documentElement.clientWidth || document.body.clientWidth
      },
      // 获取浏览器窗口的可视区域的高度
      getViewPortHeight () {
        return document.documentElement.clientHeight || document.body.clientHeight
      },

      // 获取浏览器窗口水平滚动条的位置
      getScrollLeft () {
        return document.documentElement.scrollLeft || document.body.scrollLeft
      },

      // 获取浏览器窗口垂直滚动条的位置
      getScrollTop () {
        return document.documentElement.scrollTop || document.body.scrollTop
      },
      format (date, fmt) {
        // 对Date的扩展，将 Date 转化为指定格式的String
        // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
        // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
        // 例子：
        // (new Date()).Format('yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
        // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
        let o = {
          'M+': date.getMonth() + 1,
          'd+': date.getDate(),
          'h+': date.getHours(),
          'm+': date.getMinutes(),
          's+': date.getSeconds(),
          'q+': Math.floor((date.getMonth() + 3) / 3),
          'S': date.getMilliseconds()
        }
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        for (let k in o) {
          if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
          }
        }
        return fmt
      },
      radianToAngle (radian) {
        // 弧度转角度
        return radian * 180 / Math.PI
      },
      angleToRadian (angle) {
        // 弧度转角度
        return angle * Math.PI / 180
      },
      objEqual (a, b) {
        for (var key in a) {
          if (a[key] !== b[key]) {
            return false
          }
        }
        return true
      },
      uploadStitchBatch: uploadStitchBatch,
      // 传入uri判断是否valid,默认true
      isUriPermission (context, uri) {
        if (context.$store.state.userPermissions.isValid) {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(context.$store.state.userPermissions.uriPattern[uri])
            })
          })
        } else {
          return new Promise((resolve, reject) => {
            context.$store.dispatch('fetchUserPermissions', context).then(() => {
              resolve(context.$store.state.userPermissions.uriPattern[uri])
            })
          })
        }
      },
      tagsJoin: (tagArr = []) => { // 合并标签
        return tagArr.join ? tagArr.join('#') : ''
      },
      tagsSplit: (str = '') => { // 拆分标签
        if (!str) {
          return []
        } else {
          return str.split ? str.split('#') : []
        }
      },
      // 预览全景
      /**
       * @param
       * panoId
       */
      previewPanoByPanoId (panoId) {
        window.open(`${previewUrl}${panoId}`, '_blank')
      }
    }
    Vue.prototype.$cookie = {
      exp: 5 * 24 * 60 * 60, // 5Days
      get: function (name) {
        var cookieStr = '; ' + document.cookie + '; '
        var index = cookieStr.indexOf('; ' + name + '=')
        if (index !== -1) {
          var s = cookieStr.substring(index + name.length + 3, cookieStr.length)
          return decodeURIComponent(s.substring(0, s.indexOf('; ')))
        } else {
          return null
        }
      },
      set: function (name, value, exp, domain) {
        var cookieStr = null
        var expires = null
        if (exp) {
          /* *
           * expires表示过期时间点
           * max-age表示以秒为单位的时间段
          var expTime = new Date(new Date().getTime() + exp)
          expires = '; expires=' + exp.toUTCString()
           */
          expires = '; max-age=' + exp
        } else {
          expires = ''
        }
        cookieStr = name + '=' + encodeURIComponent(value) + expires + '; path=/'
        if (domain) {
          cookieStr += ';domain=' + domain
        }
        document.cookie = cookieStr
      },
      del: function (name) {
        var exp = new Date(new Date().getTime() - 1)
        var s = encodeURIComponent(this.get(name))
        if (s != null) {
          document.cookie = name + '=' + s + ';expires=' + exp.toGMTString() + ';path=/'
        }
      },
      saveCookies: function (data, remindMe) {
        if (remindMe === 1) {
          this.set('password', data.password, this.exp)
          this.set('username', data.userName, this.exp)
        } else {
          this.set('password', data.password)
          this.set('username', data.userName)
        }
      },
      delCookies: function () {
        this.del('password')
        this.del('username')
      },
      saveRoleId: function (data, id) {
        this.set('roleId', data)
        this.set('userId', id)
      },
      delRoleId: function () {
        this.del('roleId')
        this.del('userId')
      }
    }
    Vue.prototype.$sessionStorage = {
      set (key, value) {
        return window.sessionStorage.setItem(key, value)
      },
      get (key) {
        return window.sessionStorage.getItem(key)
      },
      del (key) {
        return window.sessionStorage.removeItem(key)
      },
      clear () {
        return window.sessionStorage.clear()
      }
    }
  }
}
