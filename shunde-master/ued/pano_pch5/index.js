export function env () {
  const host = document.location.host
  let env = 'test'
  if (/show.vb.com.cn/.test(host)) {
    env = 'online'
  } else if (/show.vizen.cn/.test(host)) {
    env = 'online'
  } else if (/show.dev.vizen.cn/.test(host)) {
    env = 'dev'
  } else if (/localhost|127.0.0.1|192.168.1|test.com/g.test(host)) {
    env = 'local'
  } else if (/pre.visualbusiness.cn/.test(host)) {
    env = 'pre'
  } else if (/show.dev.vizen.cn/.test(host)) {
    env = 'dev'
  }
  // return dev
  return env
}
// var hostUrl = {
//   local: `${document.location.protocol}//${document.location.host}`,
//   dev: `${document.location.protocol}//${document.location.host}`,
//   test: `${document.location.protocol}//${document.location.host}`,
//   online: `${document.location.protocol}//${document.location.host}`,
//   pre: `${document.location.protocol}//show.pre.visualbusiness.cn`
// }
// var shotUrl = {
//   local: `//${document.location.hostname}:8001`,
//   dev: `//${document.location.hostname.replace('show', 'shot')}`,
//   test: `//${document.location.hostname.replace('show', 'shot')}`,
//   online: `//${document.location.hostname.replace('show', 'shot')}`,
//   pre: '//shot.pre.visualbusiness.cn'
// }
// var aliveUrl = {
//   local: `${document.location.protocol}//test.visualbusiness.cn/cemp/admin/main.html`,
//   dev: `${document.location.protocol}//test.visualbusiness.cn/cemp/admin/main.html`,
//   test: `${document.location.protocol}//test.visualbusiness.cn/cemp/admin/main.html`,
//   online: `${document.location.protocol}//cemp.visualbusiness.cn/admin/main.html`,
//   pre: `${document.location.protocol}//test.visualbusiness.cn/cemp/admin/main.html`
// }
// var showUrl = {
//   local: `${document.location.protocol}//localhost/hotel/src/index.html`,
//   dev: `${document.location.protocol}//mob.visualbusiness.cn/hotel-debug/index.html`,
//   test: `${document.location.protocol}//mob.visualbusiness.cn/hotel-debug/index.html`,
//   online: `${document.location.protocol}//mob.visualbusiness.cn/hotel/index.html`,
//   pre: `${document.location.protocol}//mob.visualbusiness.cn/hotel-debug/index.html`
// }
// var showAlbumUrl = {
//   local: `${document.location.protocol}//localhost/tuji/src/index.html`,
//   dev: `${document.location.protocol}//mob.visualbusiness.cn/tuji-debug/index.html`,
//   test: `${document.location.protocol}//mob.visualbusiness.cn/tuji-debug/index.html`,
//   online: `${document.location.protocol}//mob.visualbusiness.cn/tuji/index.html`,
//   pre: `${document.location.protocol}//mob.visualbusiness.cn/tuji-debug/index.html`
// }
// var showCustomUrl = {
//   local: `${document.location.protocol}//localhost/entity/src/index.html`,
//   dev: `${document.location.protocol}//mob.visualbusiness.cn/entity-debug/index.html`,
//   test: `${document.location.protocol}//mob.visualbusiness.cn/entity-debug/index.html`,
//   online: `${document.location.protocol}//mob.visualbusiness.cn/entity/index.html`,
//   pre: `${document.location.protocol}//mob.visualbusiness.cn/entity-debug/index.html`
// }
// var showInfoPageUrl = {
//   local: `${document.location.protocol}//mob.visualbusiness.cn/vizen_h5_tpl_debug/common/index.html`,
//   dev: `${document.location.protocol}//mob.visualbusiness.cn/vizen_h5_tpl_debug/common/index.html`,
//   test: `${document.location.protocol}//mob.visualbusiness.cn/vizen_h5_tpl_debug/common/index.html`,
//   online: `${document.location.protocol}//mob.visualbusiness.cn/vizen_h5_tpl/common/index.html`,
//   pre: `${document.location.protocol}//mob.visualbusiness.cn/vizen_h5_tpl/common/index.html`
// }
//
// var worksPreview = {
//   local: '//mob.visualbusiness.cn/tuji-debug/index.html?photographerId=',
//   dev: '//mob.visualbusiness.cn/tuji-debug/index.html?photographerId=',
//   test: '//mob.visualbusiness.cn/tuji-debug/index.html?photographerId=',
//   pre: '//mob.visualbusiness.cn/tuji/index.html?photographerId=',
//   online: '//mob.visualbusiness.cn/tuji/index.html?photographerId='
// }

// export const hostName = hostUrl[env()]
// export const aliveHostName = aliveUrl[env()]
// export const showName = showUrl[env()]
// export const showAlbumName = showAlbumUrl[env()]
// export const showCustomName = showCustomUrl[env()]
// export const showInfoPageName = showInfoPageUrl[env()]
// export const shotName = shotUrl[env()]
// export const worksPreviewUrl = worksPreview[env()]
// export const entityType = {
//   hotel: '酒店',
//   scene: '景区',
//   album: '相册',
//   custom: '实体'
// }

export const validate = {
  userName: /^[a-zA-Z0-9\u4e00-\u9fa5]{2,20}$/,
  trueName: /^[\u4e00-\u9fa5]{2,10}$/,
  password: /^[a-zA-Z0-9''#@%$&^*!-=+_~`./\\]{8,16}$/,
  msgCode: /^\d{6}$/,
  mobile: /^1[34578]\d{9}$/,
  phone: /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/,
  email: /^[\u4E00-\u9FA5a-zA-Z0-9][\u4E00-\u9FA5a-zA-Z0-9._-]{0,80}[\u4E00-\u9FA5a-zA-Z0-9]{0,1}@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+){1,3}$/,
  idCard: /(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$)|(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)/,
  cardCode: /^[a-zA-Z0-9]{1,50}$/, // TODO:员工编号
  inviteCode: /^\d{6}$/,
  check (type, value) {
    if (this[type].test(value)) {
      return true
    }
    return false
  }
}

export function formatDate (date, format) {
  if (!date) {
    return date
  }
  if (!format) {
    format = 'yyyy-MM-dd hh:mm'
  }
  let dateTime
  if (/^\d{10}$/.test(date)) {
    dateTime = new Date(date * 1000)
  } else {
    dateTime = new Date(date)
  }

  var o = {
    'M+': dateTime.getMonth() + 1, // month
    'd+': dateTime.getDate(), // day
    'h+': dateTime.getHours(), // hour
    'm+': dateTime.getMinutes(), // minute
    's+': dateTime.getSeconds(), // second
    'q+': Math.floor((dateTime.getMonth() + 3) / 3), // quarter
    'S': dateTime.getMilliseconds() // millisecond
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (dateTime.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}

export const Cookie = {
  install (Vue) {
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
        let userInfo = 0
        if (data.userInfo) {
          userInfo = 1
        }
        var company = 0
        if (data.companyId > 0) {
          company = 1
        }
        if (remindMe === 1) {
          this.set('userinfo', userInfo, this.exp)
          this.set('company', company, this.exp)
          this.set('username', data.name, this.exp)
          this.set('admin', data.isAdmin, this.exp)   // 代表是不是管理员
          this.set('auditStatus', data.auditStatus, this.exp)  // 代表是否认证
          this.set('phone', data.phone, this.exp)
          this.set('type', data.type, this.exp) // 代表是公司还是个人
          this.set('identification', data.identification, this.exp)
        } else {
          this.set('userinfo', userInfo)
          this.set('company', company)
          this.set('username', data.name)
          this.set('admin', data.isAdmin)
          this.set('auditStatus', data.auditStatus)
          this.set('phone', data.phone)
          this.set('type', data.type)
          this.set('identification', data.identification)
        }
      },
      delCookies: function () {
        this.del('userinfo')
        this.del('company')
        this.del('username')
        this.del('admin')
        this.del('auditStatus')
        this.del('phone')
        this.del('type')
        this.del('identification')
      }
    }
  }
}
export const objectURLFun = {
  getObjectURL (file) {
    var url = null
    if (window.createObjectURL !== undefined) { // basic
      url = window.createObjectURL(file)
    } else if (window.URL !== undefined) { // mozilla(firefox)
      url = window.URL.createObjectURL(file)
    } else if (window.webkitURL !== undefined) { // webkit or chrome
      url = window.webkitURL.createObjectURL(file)
    }
    return url
  },
  revokeURL (obj) {
    if (window.createObjectURL !== undefined) { // basic
      window.revokeObjectURL(obj)
    } else if (window.URL !== undefined) { // mozilla(firefox)
      window.URL.revokeObjectURL(obj)
    } else if (window.webkitURL !== undefined) { // webkit or chrome
      window.webkitURL.revokeObjectURL(obj)
    }
  }
}

/**
 * 获取全景缩略图的图片
 * @param {*} coverId
 */
export function getPanoThubnail (coverId) {
  let panoCoverHost = env() !== 'online' ? '//tilestest.pano.visualbusiness.cn' : '//tiles.pano.visualbusiness.cn'
  return panoCoverHost + `/${coverId}/flat/thumb1.jpg`
}

