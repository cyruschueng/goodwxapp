import moment from './moment'

export const parseUrl = (url) => {
  if (!url) {
    return ''
  }

  url = decodeURIComponent(url)
// remove any preceding url and split
  url = url.substring(url.indexOf('?')+1).split('&');

  var params = {}, pair, d = decodeURIComponent;
  // march and parse
  for (var i = url.length - 1; i >= 0; i--) {
    pair = url[i].split('=');
    params[d(pair[0])] = d(pair[1] || '');
  }

  return params;
}

export const parseDateTime = (str) => {
  let temp = str.substring(11, str.length - 9)
  return temp
}

export const parseDate = (str) => {
  let temp = str.substring(0, str.length - 9)
  temp = temp.substring(5, temp.length)
  return temp
}

export const endDate = (str) => {
  let temp = str.substring(0, str.length - 9)
  temp = temp.substring(10, temp.length)
  return temp
}

export const createDate = (str) => {
  let temp = str.substring(0, str.length - 5)
  temp = temp.substring(0, temp.length)
  return temp
}

export const computeTwoDate = (str) => {
  let temp = str.substring(0, str.length - 3)
  temp = temp.substring(10, temp.length)
  return temp
}

// 24小时制  ’上午 08：00‘
export const startAtText = (str) => {
  let time = moment(str).toDate().pattern('HH:mm')
  let hour = parseInt(moment(str).toDate().pattern('HH'))
  let minute = parseInt(moment(str).toDate().pattern('mm'))

  if (hour < 9) {
      return "早上 " + time;
  } else if (hour < 11 && minute < 30) {
      return "上午 " + time;
  } else if (hour < 13 && minute < 30) {
      return "中午 " + time;
  } else if (hour < 18) {
      return "下午 " + time;
  } else {
      return "晚上 " + time;
  }
}

export const isUrl = (str) => {
　　var url = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i
　　return url.test(str);
}

export const setStorage = (obj = {}) => {
  wx.setStorage(obj)
}

export const setStorageSync = (obj = {}) => {
  const { key, data } = obj
  try {
    wx.setStorageSync(key, data)
  } catch (e) {
  }
}

export const getStorage = (key) => {
  try {
    return wx.getStorageSync(key)

  } catch (e) {
    return ''
  }
}

export const setEntities = (options = {}) => {
  const app = getApp()
  if (!options) {
    return
  }

  const { key, value, status } = options

  if (!key || !value) {
    return
  }

  app.globalData.entities[key] = value
}

export const getStorageUser = () => {
  let app = getApp()
  let user = null
  try {
    user = getStorage('current_user')
  } catch (e) {
    user = ''
  }
  if (user) {
    app.globalData.userInfo = user
  }

  return user
}

export const clrearLoginStatus = () => {
  let app = getApp()
  removeStorage('current_user')
  app.globalData.wechatInfo = null
  app.globalData.userInfo = null
  return app.getWechatInfo()
}

export const initData = () => {
  const api = require('./api')
  let app = getApp()
  const user = getStorageUser()

  return new Promise((resolve, reject) => {
    try {
      if (user == '') {
        app.globalData.callback = getUserProfile
        return
      }

      getUserProfile()
    } catch (e) {
      reject()
      console.log(e)
    }


    function getUserProfile () {
      const user = getStorageUser()
      return api.getUserProfile().then(res => {
        const { data, statusCode } = res

        if (statusCode == 401) {
          return clrearLoginStatus().then(resolve)
        }

        if (user) {
          resolve()
        }
      }, reject)
    }
  })
}

export const getCurrentUser = () => {
  let user = null
  try {
    user = getStorage('current_user')
  } catch (e) {
    user = ''
  }
  return user
}

export const clearStorage = () => {
  wx.clearStorage()
}

export const removeStorage = (key) => {
  try {
    wx.removeStorageSync(key)
  } catch (e) {
  // Do something when catch error
  }
}

export const handleError = (data, statusCode) => {
  switch (statusCode) {
    case 500:
    case 502:
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '服务器暂时发生错误，请稍候再试'
      })
      break
    default:
      break
  }
}

export const checkErrorMsg = (data, statusCode, isHideErrorMsg) => {
  if (!data || isHideErrorMsg) {
    return
  }
  let message = data._error && data._error.message
  if (message) {
    wx.showModal({
      title: '提示',
      showCancel: false,
      content: message
    })
    return
  }

  handleError(data, statusCode)
}

export const checkStatus = (res) => {
  if (!res) {
    return
  }

  const data = res.data
  const statusCode = res.statusCode || 200

  return new Promise((resolve, reject) => {
    switch (statusCode) {
      case 401:
        clrearLoginStatus().then(resolve.bind(null, res), reject)
        break
      case 403:
      case 422:
      case 400:
      case 402:
      case 500:
      case 502:
      case 404:
        checkErrorMsg(data, statusCode, res.isHideErrorMsg)
        reject(res)
        break
      case 200:
      case 204:
      case 201:
        resolve(res)
        break
    }
  })
}

/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * eg:
 * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.pattern=function(fmt) {
    var o = {
    "M+" : this.getMonth()+1, //月份
    "d+" : this.getDate(), //日
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
    "H+" : this.getHours(), //小时
    "m+" : this.getMinutes(), //分
    "s+" : this.getSeconds(), //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S" : this.getMilliseconds() //毫秒
    };
    var week = {
    "0" : "\u65e5",
    "1" : "\u4e00",
    "2" : "\u4e8c",
    "3" : "\u4e09",
    "4" : "\u56db",
    "5" : "\u4e94",
    "6" : "\u516d"
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f/u671f" : "\u5468") : "")+week[this.getDay()+""]);
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}

export const timesBlock = ((start,end) => {
  var time = []
  var count = end - start
  var currentStart = start
  for (let i = 1; i <= count; i++) {
    let st = fullZero(currentStart)
    let st_n  = fullZero(currentStart + 1)
    time.push({
        idT   : currentStart + '-' + '1',
        hour : currentStart,
        minutes: 0,
        name : st + ':' + '00',
        //name : st + ':' + '00' + '-' + st + ':' + '30',
        selectTime : st + ':' + '00' + '-' + st + ':' + '30',
        status : 'normal',
        recordTime : st + ':' + '00'
    })

    time.push({
      idT   : currentStart + '-' + '2',
      hour : currentStart,
      minutes: 30,
      name : st + ':' + '30',
      //name : st + ':' + '30' + '-' + st_n + ':' + '00',
      selectTime : st + ':' + '30' + '-' + st_n + ':' + '00',
      status : 'normal',
      recordTime : st + ':' + '30'
    })

    ++currentStart
  }

  function fullZero (number) {
    if (number <= 9) {
      return '0' + number
    }

    return number
  }

  return time

})(0,24)

export const MEETING_STATUS = {
   lastTime : 'last-time',
   reservationTime : 'reservation-time',
   normalTime : 'normalTime'
}

export const checkSystemUser = () => {
  let app = getApp()
  const user = getStorageUser()
  return new Promise((resolve, reject) => {
    if (user.id) {
      return resolve()
    }

    wx.navigateTo({
      url: '/src/login/login',
      success () {
        resolve('toLogin')
      },
      fail () {
        reject()
      }
    })
  })
}

// 确保用户是否登录
export const appLaunchCheck = (callback) => {
  const app = getApp()
  if (app.globalData.appLaunch) {
    callback()
    return
  }
  app.globalData.callback = callback
}

/**
* Base64 encode / decode
**/
const Base64 = {
  // private property
  _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

  // public method for encoding
  encode : function (input) {
      var output = "";
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      var i = 0;

      input = Base64._utf8_encode(input);

      while (i < input.length) {

          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);

          enc1 = chr1 >> 2;
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
          enc4 = chr3 & 63;

          if (isNaN(chr2)) {
              enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
              enc4 = 64;
          }

          output = output +
          this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
          this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

      }

      return output;
  },

  // public method for decoding
  decode : function (input) {
      var output = "";
      var chr1, chr2, chr3;
      var enc1, enc2, enc3, enc4;
      var i = 0;

      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

      while (i < input.length) {

          enc1 = this._keyStr.indexOf(input.charAt(i++));
          enc2 = this._keyStr.indexOf(input.charAt(i++));
          enc3 = this._keyStr.indexOf(input.charAt(i++));
          enc4 = this._keyStr.indexOf(input.charAt(i++));

          chr1 = (enc1 << 2) | (enc2 >> 4);
          chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
          chr3 = ((enc3 & 3) << 6) | enc4;

          output = output + String.fromCharCode(chr1);

          if (enc3 != 64) {
              output = output + String.fromCharCode(chr2);
          }
          if (enc4 != 64) {
              output = output + String.fromCharCode(chr3);
          }

      }

      output = Base64._utf8_decode(output);

      return output;

  },

  // private method for UTF-8 encoding
  _utf8_encode : function (string) {
      string = string.replace(/\r\n/g,"\n");
      var utftext = "";

      for (var n = 0; n < string.length; n++) {

          var c = string.charCodeAt(n);

          if (c < 128) {
              utftext += String.fromCharCode(c);
          }
          else if((c > 127) && (c < 2048)) {
              utftext += String.fromCharCode((c >> 6) | 192);
              utftext += String.fromCharCode((c & 63) | 128);
          }
          else {
              utftext += String.fromCharCode((c >> 12) | 224);
              utftext += String.fromCharCode(((c >> 6) & 63) | 128);
              utftext += String.fromCharCode((c & 63) | 128);
          }

      }

      return utftext;
  },

  // private method for UTF-8 decoding
  _utf8_decode : function (utftext) {
      var string = "";
      var i = 0;
      var c = c1 = c2 = 0;

      while ( i < utftext.length ) {

          c = utftext.charCodeAt(i);

          if (c < 128) {
              string += String.fromCharCode(c);
              i++;
          }
          else if((c > 191) && (c < 224)) {
              c2 = utftext.charCodeAt(i+1);
              string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
              i += 2;
          }
          else {
              c2 = utftext.charCodeAt(i+1);
              c3 = utftext.charCodeAt(i+2);
              string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
              i += 3;
          }

      }

      return string;
  }

}

export const getCurrentLocation = () => {
  const app = getApp()
  return app.globalData.entities.currentLocation
}

export const track = (eventName = 'NotName') => {
  const api = require('./api')
  const constnats = require('./constants')
  const user = getStorageUser()

  try {
    const space_id = constnats.SPACE_ID
    const space_msg = 'space_id_' + space_id
    const user_msg = user.id ? 'user_id_' + user.id : 'null'
    const wx_user_msg = user.wechat_id ? 'wechat_id_' + user.wechat_id : ''
    const distinct_id = (user_msg || wx_user_msg) + space_msg
    const extConfig = wx.getExtConfigSync? wx.getExtConfigSync(): {}

    const base64 = Base64.encode(JSON.stringify({
      event : eventName,
      properties : {
        distinct_id : distinct_id,
        user_id : user_msg,
        wx_id : wx_user_msg,
        space_id : space_msg,
        environment : extConfig.host ? 'production' : 'developer',
        // token : '9c0370c8b02cd3f0b53f9ad98f8f8ebf',
        token : 'c4e602fbc8f69378d8f96e960523d18d',
        "Referred By": "wechat"
      }
    }))
    api.apiTrack({
      data : {
        data : base64
      },
      isHiddenError : true
    })
  } catch (e) {
    console.log(e)
  }
}

// 获取当前用户位置
export const getLocation = () => {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      success (res) {
        resolve(res)
      },
      fail (err) {
        reject(err)
      }
    })
  })
}

export const saveUserInfo = (res) => {
  let app = getApp()
  const data = Object.assign({}, res.data.wechat_user, res.data.user, res.data)
  const wechatId = data.result.Openid
  if(app.globalData.wechatInfo){
    app.globalData.wechatInfo.wechat_id = wechatId
  }

  if (data) {
    app.globalData.userInfo = data
    setStorageSync({
      key : 'current_user',
      data
    })
  }
}

export const toPay = (res) => {
  let app = getApp()
  const data = res.wxapp
  app.globalData.wechatPay = data

  return new Promise((resolve, reject) => {
    wx.requestPayment({
      timeStamp : data.timeStamp,
      nonceStr  : data.nonceStr,
      package   : data.package,
      signType  : data.signType,
      paySign   : data.sign,
      success (res) {
        wx.showToast({
          title: '支付成功！',
          icon: 'success',
          duration: 2000
        })
        setTimeout(() => {
          resolve(res)
        }, 1000)
      },
      fail (error) {
        wx.showToast({
          title: '支付失败！',
          icon: 'success',
          duration: 2000
        })
        reject(error)
      },
      complete () {

      }
    })
  })
}

// 在Call api之前storage取一次
export const checkEntities = ({ key, api, params }) => {
  let app = getApp()

  const data = app.globalData.entities[key]

  return new Promise((resolve, reject) => {
    if (data) {
      return resolve(data)
    }

    api(params).then(res => {
      const data = res.data
      app.globalData.entities[key] = data
      resolve(data)
    }, reject)
  })
}

export const initSystemInfo = () => {

  return new Promise((resolve, reject) => {
    wx.getSystemInfo({
      success: function(res) {
        resolve(res)
      },
      fail (err) {
        reject(err)
      }
    })
  })
}

export const WXshare = (callback) => {
  wx.getSystemInfo({
      success: function(res) {
        const { version } = res
        let versionNum = version.split('.')
        if(versionNum[0] > 6){
          return
        }
        if(versionNum[0] == 6 && versionNum[1] > 5){
          return
        }
        if(versionNum[0] == 6 && versionNum[1] == 5 && versionNum[2] && versionNum[2] >= 8){
          return
        }
        callback && callback()
      }
    })
}

export const getSpaceSetting = (callback) => {
  let app = getApp()
  const { space } = app.globalData.entities
  const space_settings = space && space.space_settings || {}
  const { virtual_currency_name, point_show_rate_setting } = space_settings
  return Object.assign({},{virtual_currency_name: virtual_currency_name}, { point_show_rate_setting: point_show_rate_setting })
}

export const isSysTemUser = () => {
  let app = getApp()
  const userInfo = app.globalData.userInfo || {}

  return userInfo.id
}

export const isMeetingRoom = (area) => {
  if (area.area_type != 'meeting_room') {
    return false
  }
  return true
}

export const getPrintFileName = (name) => {
  let file_name = name
  let index = name.lastIndexOf('.')
  if (index != -1) {
    return name.substr(0, index)
  }

  if (name.lastIndexOf('-') == -1) {
    return name
  }

  file_name = name.split('-') && name.split('-')[1]
  file_name = file_name ? file_name.substr(1, file_name.length) : ''

  return file_name
}

export const seats_true = (data) => {
  let seat_imgs = []
  for(let i = 0; i < data; i++){
    seat_imgs.push({
      img: '../../images/icon_seat_have@3x.png',
    })
  }
  return seat_imgs
}

export const seats_false = (data) => {
  let seat_imgs = []
  for(let i = 0; i < data; i++){
    seat_imgs.push({
      img: '../../images/icon_seat@3x.png',
    })
  }
  return seat_imgs
}

export const seats = (data) => {
  let array = []
  for(let i = 0; i < data; i++){
    array.push({
			number: i + 1,
			type: false
		})
  }
  return array
}

export const prices = (data) => {
  let prices = []
  for(let i = 1; i <= data * 2; i++){
    prices.push(i)
  }
  return prices
}
