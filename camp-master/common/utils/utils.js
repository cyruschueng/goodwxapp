var handle,
    sysInfo = wx.getSystemInfoSync(),
    navigateLock = false,//wx.navigateTo锁，防止重复点击false允许点击 true不允许点击
    loadingTimmer;

handle = {

  toPx : function( num ) {//rpx to px
  	return num / ( 750 / sysInfo.windowWidth )
  },
  toRpx : function( num ) {//px to rpx
  	return num * 750 / sysInfo.windowWidth;
  },
  createDateObj : function( time ) {//将给定时间转成日期对象
    var date = new  Date();
    date.setTime( time );
    return {
      year : date.getFullYear(),
      month : handle.addZero( date.getMonth() + 1, 2 ),
      day : handle.addZero( date.getDate(), 2 ),
      hours : handle.addZero( date.getHours(), 2 ),
      minutes : handle.addZero( date.getMinutes(), 2),
      seconds : handle.addZero( date.getSeconds(), 2)
    }
  },



  /**
 * 比较时间
 */
 compareDate:function(d1, now) {
    if (now == undefined) now = ''
    console.info(d1, now)
  
    d1 = new Date(Date.parse(d1.replace(/-/g, "/")));
  
    if (now == '') {
      now = new Date();
    } else {
      now = new Date(Date.parse(now.replace(/-/g, "/")));
    }
  
    return now - d1;
  },
  
  /**
   * 是否获取用户信息并更新
   */
   updateUserInfo:function() {
    return true;
  },
  
  /**
   * 获取随机数
   */
   guid:function(withHyphen) {
    if (withHyphen == undefined) withHyphen = true
    var hyphen = '_'
  
    if (!withHyphen) {
      hyphen = ''
    }
  
    return s4() + s4() + hyphen + s4() + hyphen + s4() + hyphen +
      s4() + hyphen + s4() + s4() + s4()
  },
  
   s4:function() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  },
  
  /**
   * 生成随机字符串
   */
   randomString:function(len, type) {
    len = len || 20;
    type = type || 'numbers_uppercases_lowercases';
  
    var strings = {
      numbers: '0123456789',
      uppercases: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercases: 'abcdefghiklmnopqrstuvwxyz'
    },
      choise = '',
      ret = '',
      types = type.split('_'),
      i;
  
    for (i = 0; i < types.length; i++) {
      if (strings[types[i]]) {
        choise += strings[types[i]];
      }
    }
  
    if (!choise) {
      choise = strings.numbers + strings.lowercases + strings.uppercases;
    }
  
    for (i = 0; i < len; i++) {
      ret += choise[Math.floor(Math.random() * choise.length)];
    }
  
    return ret;
  },
  
  /**
   * 删除所有storage
   */
   removeAllStorage:function(callback) {
    try {
      wx.removeStorageSync('key')
      wx.removeStorageSync('created_at')
      wx.removeStorageSync('userid')
  
      callback()
  
    } catch (e) {
      console.error(e)
    }
  },
  
  /**
   * 设置storage
   */
   setAllStorage:function(data, callback, key) {
    if (key == undefined) key = null
  
    try {
      if (key == null) {
        wx.setStorageSync('key', data.session_id)
        wx.setStorageSync('created_at', data.created_at)
        wx.setStorageSync('userid', data.userid)
      } else {
        wx.setStorageSync(key, data[key])
      }
  
      callback()
  
    } catch (e) {
      console.error(e)
    }
  },
  
  /**
   * 获取所有的storage
   */
   getAllStorage:function(callback) {
    try {
      callback({
        key: wx.getStorageSync('key'),
        created_at: wx.getStorageSync('created_at'),
        userid: wx.getStorageSync('userid')
      })
    } catch (e) {
      console.error(e)
    }
  },
  
  /**
   * 指定url是否显示loading
   */
   showLoadingUrl:function(url) {
    if (url == 'front/userinfo' || url == 'front/stats' || url == 'front/login') {
      return false;
    }
  
    return true;
  },
  
  /**
   * 日期格式化
   */
   formateDate:function(fmt, afterDay, afterHours, afterMinute, afterMonth) {
    if (afterDay == undefined) afterDay = 0
    if (afterHours == undefined) afterHours = 0
    if (afterMinute == undefined) afterMinute = 0
    if (afterMonth == undefined) afterMonth = 0
  
    var d = new Date()
  
    var months = d.getMonth() + 1
    var days = d.getDate() + afterDay
    var hours = d.getHours() + afterHours
    var minutes = d.getMinutes() + afterMinute
  
    d.setDate(days)
    d.setHours(hours)
    d.setMinutes(minutes)
    d.setMonth(months)
  
    var o = {
      "M+": d.getMonth() + 1 + afterMonth,
      "d+": d.getDate(),
      "h+": d.getHours(),
      "m+": d.getMinutes(),
      "s+": d.getSeconds(),
      "q+": Math.floor((d.getMonth() + 3) / 3),
      "S": d.getMilliseconds()
    }
  
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  },
  
  /**
   * 宽度自适应100%时候的高度
   */
   autoHeight:function() {
    var systemInfo = wx.getSystemInfoSync();
    console.info(systemInfo)
  
    var ratio = 4 / 5;
    return {
      autoHeight: systemInfo.windowWidth * ratio,
      dialogMaxHeight: systemInfo.windowHeight - 300
    }
  },
  
  /**
   * 是否数字
   */
   isNumber:function(obj) {
    return typeof obj === 'number'
  },
  
  /**
   * modal
   */
   showModal:function(contents, title, showCancel, onConfirm, onCancel, cancelText, confirmText) {
    if (title == undefined || title == '') title = '提示'
    if (showCancel == undefined) showCancel = false
    if (onConfirm == undefined) onConfirm = null
    if (onCancel == undefined) onCancel = null
    if (cancelText == undefined) cancelText = '取消'
    if (confirmText == undefined) confirmText = '确定'
  
    wx.showModal({
      title: title,
      content: contents,
      showCancel: showCancel,
      cancelText: cancelText,
      confirmText: confirmText,
      success: function (res) {
        if (res.confirm) {
          if (onConfirm != null) onConfirm()
        } else if (res.cancel) {
          if (onCancel != null) onCancel()
        }
      }
    })
  },
  
  /**
   * 微信版本过低提示
   */
   tooLowVersion:function() {
    showModal('当前微信版本过低, 将导致部分功能无法使用, 请及时升级到最新微信版本')
  },
  
  /**
   * 等待
   */
   sleep:function(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  },
  
  
  /**
   * 根据参数名获取query值
   * 主要代码可以用 require('querystring').parse() 语句完成
   *
   * @param query
   * @param search
   * @param trimSlash
   *  移除斜杠后边的内容
   * @returns {*}
   */
   getUrlParam:function(query, search, trimSlash) {
    const args = {};
    if (trimSlash == undefined) trimSlash = true
  
    if (!!query === false) return '';
  
    const pairs = query.split('&');
    for (let i = 0; i < pairs.length; i += 1) {
      const pos = pairs[i].indexOf('=');
      if (pos === -1) return;
  
      const argname = pairs[i].substring(0, pos);
      let value = pairs[i].substring(pos + 1);
      value = decodeURIComponent(value);
  
      args[argname] = value;
    }
  
    const result = args[search] === undefined ? '' : args[search];
    return trimSlash ? result.replace(/\/(.*)$/g, '') : result;
  },
  
  /**
   * 解析扫描二维码进入时候的scene
   */
   parseScene:function(scene) {
    var sceneObj = scene.split('@')
    var id = sceneObj[0]
    var x = sceneObj[1]
  
    return {
      id: id,
      x: x,
      url: `id=${id}&x=${x}`,
      query: { id: id, x: x }
    }
  },
  
  /**
   * 字符串trim(包括全角)
   */
   trim:function(x) {
    x = x.replace(/^\s+|\s+$/gm, '')
    x = x.replace(/\s+/gm, '')
    x = x.replace(/　+/gm, '')
  
    return x
  },
  
  /**
   * 换行
   */
   parseNewLine:function(data) {
    if (data) {
      data = data.split("\n")
    }
  
    return data
  },
  
  /**
   * object是否为空
   */
   isEmptyObject:function(obj) {
    if (obj == null) return true;
  
    for (var key in obj) {
      return false
    }
  
    return true;
  }
}

module.exports = handle;