import { base64_encode, base64_decode } from 'base64';
import md5 from 'md5';
var util = {};

util.base64Encode = function (str) {
  return base64_encode(str)
};

util.base64Decode = function (str) {
  return base64_decode(str)
};

util.md5 = function (str) {
  return md5(str)
};

/*
* 获取链接某个参数
* url 链接地址
* name 参数名称
*/
function getUrlParam(url, name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
  var r = url.split('?')[1].match(reg);  //匹配目标参数  
  if (r != null) return unescape(r[2]); return null; //返回参数值  
}
/**
 * 获取签名 将链接地址的所有参数按字母排序后拼接加上token进行md5
 * url 链接地址
 * date 参数{参数名1 : 值1, 参数名2 : 值2} *
 * token 签名token 非必须
 */
function getSign(url, data, token) {
  var _ = require('underscore.js');
  var md5 = require('md5.js');
  var querystring = '';
  var sign = getUrlParam(url, 'sign');
  if (sign || (data && data.sign)) {
    return false;
  } else {
    if (url) {
      querystring = getQuery(url);
    }
    if (data) {
      var theRequest = [];
      for (let param in data) {
        if (param && data[param]) {
          theRequest = theRequest.concat({
            'name': param,
            'value': data[param]
          })
        }
      }
      querystring = querystring.concat(theRequest);
    }
    //排序
    querystring = _.sortBy(querystring, 'name');
    //去重
    querystring = _.uniq(querystring, true, 'name');
    var urlData = '';
    for (let i = 0; i < querystring.length; i++) {
      if (querystring[i] && querystring[i].name && querystring[i].value) {
        urlData += querystring[i].name + '=' + querystring[i].value;
        if (i < (querystring.length - 1)) {
          urlData += '&';
        }
      }
    }
    token = token ? token : getApp().siteInfo.token;
    sign = md5(urlData + token);
    return sign;
  }
}

util.getSign = function (url, data, token) {
  return getSign(url, data, token);
};

/**
	二次封装微信wx.request函数、增加交互体全、配置缓存、以及配合微擎格式化返回数据

	@params option 弹出参数表，
	{
		url : 同微信,
		data : 同微信,
		header : 同微信,
		method : 同微信,
		success : 同微信,
		fail : 同微信,
		complete : 同微信,
		cachetime : 缓存周期，在此周期内不重复请求http，默认不缓存
    cachekey:缓存键值,默认MD5url
	}
*/
util.request = function (option) {
  console.log(option);
  //var _ = require('underscore.js');
  var md5 = require('md5.js');
  var app = getApp();
  var option = option ? option : {};
  option.cachetime = option.cachetime ? option.cachetime : 0;
  option.showLoading = typeof option.showLoading != 'undefined' ? option.showLoading : true;

  //var sessionid = wx.getStorageSync('userInfo').sessionid;
  var url = option.url;
  if (!url) {
    return false;
  }
  wx.showNavigationBarLoading();
  if (option.showLoading) {
    util.showLoading();
  }
  if (option.cachetime) {
    var cachekey = option.cachekey ? option.cachekey : md5(url);
    var cachedata = wx.getStorageSync(cachekey);
    var timestamp = Date.parse(new Date());

    if (cachedata && cachedata.data) {
      if (cachedata.expire > timestamp) {
        if (option.complete && typeof option.complete == 'function') {
          option.complete(cachedata);
        }
        if (option.success && typeof option.success == 'function') {
          option.success(cachedata);
        }
        //console.log('cache:' + url);
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        return true;
      } else {
        wx.removeStorageSync(cachekey)
      }
    }
  }

  wx.request({
    'url': url,
    'data': option.data ? option.data : {},
    'header': option.header ? option.header : {},
    'method': option.method ? option.method : 'GET',
    'header': {
      'content-type': 'application/x-www-form-urlencoded'
    },
    'success': function (response) {
      wx.hideNavigationBarLoading();
      wx.hideLoading();
      //console.log(response)
      if (response.data.errno) {
        if (response.data.errno == '41009') {
          wx.setStorageSync('userInfo', '');
          util.getUserInfo(function () {
            util.request(option)
          });
          return;
        } else {
          if (option.fail && typeof option.fail == 'function') {
            option.fail(response);
          } else {
            if (response.data.message) {
              if (response.data.data != null && response.data.data.redirect) {
                var redirect = response.data.data.redirect;
              } else {
                var redirect = '';
              }
              app.util.message(response.data.message, redirect, 'error');
            }
          }
          return;
        }
      } else {
        if (option.success && typeof option.success == 'function') {
          option.success(response);
        }
        //写入缓存，减少HTTP请求，并且如果网络异常可以读取缓存数据
        if (option.cachetime) {
          var cachedata = { 'data': response.data, 'expire': timestamp + option.cachetime * 1000 };
          wx.setStorageSync(cachekey, cachedata);
        }
      }
    },
    'fail': function (response) {
      wx.hideNavigationBarLoading();
      wx.hideLoading();

      //如果请求失败，尝试从缓存中读取数据
      var md5 = require('md5.js');
      var cachekey = md5(url);
      var cachedata = wx.getStorageSync(cachekey);
      if (cachedata && cachedata.data) {
        if (option.success && typeof option.success == 'function') {
          option.success(cachedata);
        }
        console.log('failreadcache:' + url);
        return true;
      } else {
        if (option.fail && typeof option.fail == 'function') {
          option.fail(response);
        }
      }
    },
    'complete': function (response) {
      // wx.hideNavigationBarLoading();
      // wx.hideLoading();
      if (option.complete && typeof option.complete == 'function') {
        option.complete(response);
      }
    }
  });

}
/*
 * 提示信息
 * type 为 success, error 当为 success,  时，为toast方式，否则为模态框的方式
 * redirect 为提示后的跳转地址, 跳转的时候可以加上 协议名称  
 * navigate:/we7/pages/detail/detail 以 navigateTo 的方法跳转，
 * redirect:/we7/pages/detail/detail 以 redirectTo 的方式跳转，默认为 redirect
*/
util.message = function (title, redirect, type) {
  if (!title) {
    return true;
  }
  if (typeof title == 'object') {
    redirect = title.redirect;
    type = title.type;
    title = title.title;
  }
  if (redirect) {
    var redirectType = redirect.substring(0, 9), url = '', redirectFunction = '';
    if (redirectType == 'navigate:') {
      redirectFunction = 'navigateTo';
      url = redirect.substring(9);
    } else if (redirectType == 'redirect:') {
      redirectFunction = 'redirectTo';
      url = redirect.substring(9);
    } else {
      url = redirect;
      redirectFunction = 'redirectTo';
    }
  }
  //console.log(url)
  if (!type) {
    type = 'success';
  }

  if (type == 'success') {
    wx.showToast({
      title: title,
      icon: 'success',
      duration: 2000,
      mask: url ? true : false,
      complete: function () {
        if (url) {
          setTimeout(function () {
            wx[redirectFunction]({
              url: url,
            });
          }, 1800);
        }

      }
    });
  } else if (type == 'error') {
    wx.showModal({
      title: '信息提示',
      content: title,
      showCancel: false,
      complete: function () {
        if (url) {
          wx[redirectFunction]({
            url: url,
          });
        }
      }
    });
  }
}

/*
* 获取用户信息
*/
util.getUserInfo = function (cb) {
  const openIdUrl = require('../config').config.openIdUrl;
  const userinfoUrl = require('../config').config.userinfoUrl
  //console.log(openIdUrl);
  var login = function () {
    //console.log('start login');
    var userInfo = {
      'sessionid': '',
      'openid': '',
      'user': '',
      'lv': '', //等级
      'speed': '', //进度
      'score': ''  //积分
    };
    wx.login({
      success: function (res) {
        console.log(res.code);
        wx.request({
          url: openIdUrl,
          data: { code: res.code },
          method: 'POST',
          header: {
            'content-type': 'application/json',
          },
          success: function (res) {
            var arr = res.data
            console.log(arr);
            if (arr.code == 1) {
              userInfo.sessionid = arr.sessionid
              userInfo.openid = arr.openid
              userInfo.lv = arr.lv
              userInfo.speed = arr.speed
              userInfo.score = arr.score
              wx.setStorageSync('userInfo', userInfo);
              /*
                 wx.getUserInfo({
                   success: function (user) {
                     //console.log(user);
                     userInfo.user = user.userInfo
                     wx.setStorageSync('userInfo', userInfo);
                     var sessionid = wx.getStorageSync('userInfo').sessionid;
                     wx.request({
                       url: userinfoUrl,
                       data: {
                         signature: user.signature,
                         rawData: user.rawData,
                         iv: user.iv,
                         encryptedData: user.encryptedData
                       },
                       method: 'POST',
                       header: {
                         'content-type': 'application/json',
                         'sessionid': sessionid
                       },
                       success: function (res) {
                         var arr = res.data
                         if (arr.code == 1) {
                           userInfo.userData = arr.data.data;
                           wx.setStorageSync('userInfo', userInfo);
                           var user = wx.getStorageSync(userInfo);
                           console.log(user);
                           debugger;
                         }
                         typeof cb == "function" && cb(userInfo);
                       }
                     })
                   },
                   fail: function () {
                     typeof cb == "function" && cb(userInfo);
                   },
                   complete: function () {
                   }
                 })
      */
            }
          },
        })
      },
      fail: function () {
        wx.showModal({
          title: '获取信息失败',
          content: '请允许授权以便为您提供给服务',
          success: function (res) {
            if (res.confirm) {
              util.getUserInfo();
            }
          }
        })
      }
    });
  };

  var app = wx.getStorageSync('userInfo');
  //console.log(app);
  if (app.sessionid) {
    wx.checkSession({
      success: function () {
        typeof cb == "function" && cb(app);
      },
      fail: function () {
        app.sessionid = '';
        console.log('relogin');
        wx.removeStorageSync('userInfo');
        login();
      }
    })
  } else {
    //调用登录接口
    login();
  }
}
util.user = util.getUserInfo;

//封装微信等待提示，防止ajax过多时，show多次
util.showLoading = function () {
  var isShowLoading = wx.getStorageSync('isShowLoading');
  if (isShowLoading) {
    wx.hideLoading();
    wx.setStorageSync('isShowLoading', false);
  }

  wx.showLoading({
    title: '加载中',
    complete: function () {
      wx.setStorageSync('isShowLoading', true);
    },
    fail: function () {
      wx.setStorageSync('isShowLoading', false);
    }
  });
}
util.showImage = function (event) {
  var url = event ? event.currentTarget.dataset.preview : '';
  if (!url) {
    return false;
  }
  wx.previewImage({
    urls: [url]
  });
}
/**
 * 转换内容中的emoji表情为 unicode 码点，在Php中使用utf8_bytes来转换输出
*/
util.parseContent = function (string) {
  if (!string) {
    return string;
  }

  var ranges = [
    '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
    '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
    '\ud83d[\ude80-\udeff]'  // U+1F680 to U+1F6FF
  ];
  var emoji = string.match(
    new RegExp(ranges.join('|'), 'g'));

  if (emoji) {
    for (var i in emoji) {
      string = string.replace(emoji[i], '[U+' + emoji[i].codePointAt(0).toString(16).toUpperCase() + ']');
    }
  }
  return string;
}

util.date = function () {
	/**
	 * 判断闰年
	 * @param date Date日期对象
	 * @return boolean true 或false
	 */
  this.isLeapYear = function (date) {
    return (0 == date.getYear() % 4 && ((date.getYear() % 100 != 0) || (date.getYear() % 400 == 0)));
  }

	/**
	 * 日期对象转换为指定格式的字符串
	 * @param f 日期格式,格式定义如下 yyyy-MM-dd HH:mm:ss
	 * @param date Date日期对象, 如果缺省，则为当前时间
	 *
	 * YYYY/yyyy/YY/yy 表示年份  
	 * MM/M 月份  
	 * W/w 星期  
	 * dd/DD/d/D 日期  
	 * hh/HH/h/H 时间  
	 * mm/m 分钟  
	 * ss/SS/s/S 秒  
	 * @return string 指定格式的时间字符串
	 */
  this.dateToStr = function (formatStr, date) {
    formatStr = arguments[0] || "yyyy-MM-dd HH:mm:ss";
    date = arguments[1] || new Date();
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    str = str.replace(/yyyy|YYYY/, date.getFullYear());
    str = str.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100));
    str = str.replace(/MM/, date.getMonth() > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1));
    str = str.replace(/M/g, date.getMonth());
    str = str.replace(/w|W/g, Week[date.getDay()]);

    str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
    str = str.replace(/d|D/g, date.getDate());

    str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
    str = str.replace(/h|H/g, date.getHours());
    str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
    str = str.replace(/m/g, date.getMinutes());

    str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
    str = str.replace(/s|S/g, date.getSeconds());

    return str;
  }


	/**
	* 日期计算  
	* @param strInterval string  可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒  
	* @param num int
	* @param date Date 日期对象
	* @return Date 返回日期对象
	*/
  this.dateAdd = function (strInterval, num, date) {
    date = arguments[2] || new Date();
    switch (strInterval) {
      case 's': return new Date(date.getTime() + (1000 * num));
      case 'n': return new Date(date.getTime() + (60000 * num));
      case 'h': return new Date(date.getTime() + (3600000 * num));
      case 'd': return new Date(date.getTime() + (86400000 * num));
      case 'w': return new Date(date.getTime() + ((86400000 * 7) * num));
      case 'm': return new Date(date.getFullYear(), (date.getMonth()) + num, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
      case 'y': return new Date((date.getFullYear() + num), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
    }
  }

	/**
	* 比较日期差 dtEnd 格式为日期型或者有效日期格式字符串
	* @param strInterval string  可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒  
	* @param dtStart Date  可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒
	* @param dtEnd Date  可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒 
	*/
  this.dateDiff = function (strInterval, dtStart, dtEnd) {
    switch (strInterval) {
      case 's': return parseInt((dtEnd - dtStart) / 1000);
      case 'n': return parseInt((dtEnd - dtStart) / 60000);
      case 'h': return parseInt((dtEnd - dtStart) / 3600000);
      case 'd': return parseInt((dtEnd - dtStart) / 86400000);
      case 'w': return parseInt((dtEnd - dtStart) / (86400000 * 7));
      case 'm': return (dtEnd.getMonth() + 1) + ((dtEnd.getFullYear() - dtStart.getFullYear()) * 12) - (dtStart.getMonth() + 1);
      case 'y': return dtEnd.getFullYear() - dtStart.getFullYear();
    }
  }

	/**
	* 字符串转换为日期对象 // eval 不可用
	* @param date Date 格式为yyyy-MM-dd HH:mm:ss，必须按年月日时分秒的顺序，中间分隔符不限制
	*/
  this.strToDate = function (dateStr) {
    var data = dateStr;
    var reCat = /(\d{1,4})/gm;
    var t = data.match(reCat);
    t[1] = t[1] - 1;
    eval('var d = new Date(' + t.join(',') + ');');
    return d;
  }

	/**
	* 把指定格式的字符串转换为日期对象yyyy-MM-dd HH:mm:ss
	* 
	*/
  this.strFormatToDate = function (formatStr, dateStr) {
    var year = 0;
    var start = -1;
    var len = dateStr.length;
    if ((start = formatStr.indexOf('yyyy')) > -1 && start < len) {
      year = dateStr.substr(start, 4);
    }
    var month = 0;
    if ((start = formatStr.indexOf('MM')) > -1 && start < len) {
      month = parseInt(dateStr.substr(start, 2)) - 1;
    }
    var day = 0;
    if ((start = formatStr.indexOf('dd')) > -1 && start < len) {
      day = parseInt(dateStr.substr(start, 2));
    }
    var hour = 0;
    if (((start = formatStr.indexOf('HH')) > -1 || (start = formatStr.indexOf('hh')) > 1) && start < len) {
      hour = parseInt(dateStr.substr(start, 2));
    }
    var minute = 0;
    if ((start = formatStr.indexOf('mm')) > -1 && start < len) {
      minute = dateStr.substr(start, 2);
    }
    var second = 0;
    if ((start = formatStr.indexOf('ss')) > -1 && start < len) {
      second = dateStr.substr(start, 2);
    }
    return new Date(year, month, day, hour, minute, second);
  }


	/**
	* 日期对象转换为毫秒数
	*/
  this.dateToLong = function (date) {
    return date.getTime();
  }

	/**
	* 毫秒转换为日期对象
	* @param dateVal number 日期的毫秒数 
	*/
  this.longToDate = function (dateVal) {
    return new Date(dateVal);
  }

	/**
	* 判断字符串是否为日期格式
	* @param str string 字符串
	* @param formatStr string 日期格式， 如下 yyyy-MM-dd
	*/
  this.isDate = function (str, formatStr) {
    if (formatStr == null) {
      formatStr = "yyyyMMdd";
    }
    var yIndex = formatStr.indexOf("yyyy");
    if (yIndex == -1) {
      return false;
    }
    var year = str.substring(yIndex, yIndex + 4);
    var mIndex = formatStr.indexOf("MM");
    if (mIndex == -1) {
      return false;
    }
    var month = str.substring(mIndex, mIndex + 2);
    var dIndex = formatStr.indexOf("dd");
    if (dIndex == -1) {
      return false;
    }
    var day = str.substring(dIndex, dIndex + 2);
    if (!isNumber(year) || year > "2100" || year < "1900") {
      return false;
    }
    if (!isNumber(month) || month > "12" || month < "01") {
      return false;
    }
    if (day > getMaxDay(year, month) || day < "01") {
      return false;
    }
    return true;
  }

  this.getMaxDay = function (year, month) {
    if (month == 4 || month == 6 || month == 9 || month == 11)
      return "30";
    if (month == 2)
      if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0)
        return "29";
      else
        return "28";
    return "31";
  }
	/**
	*	变量是否为数字
	*/
  this.isNumber = function (str) {
    var regExp = /^\d+$/g;
    return regExp.test(str);
  }

	/**
	* 把日期分割成数组 [年、月、日、时、分、秒]
	*/
  this.toArray = function (myDate) {
    myDate = arguments[0] || new Date();
    var myArray = Array();
    myArray[0] = myDate.getFullYear();
    myArray[1] = myDate.getMonth();
    myArray[2] = myDate.getDate();
    myArray[3] = myDate.getHours();
    myArray[4] = myDate.getMinutes();
    myArray[5] = myDate.getSeconds();
    return myArray;
  }

	/**
	* 取得日期数据信息  
	* 参数 interval 表示数据类型  
	* y 年 M月 d日 w星期 ww周 h时 n分 s秒  
	*/
  this.datePart = function (interval, myDate) {
    myDate = arguments[1] || new Date();
    var partStr = '';
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    switch (interval) {
      case 'y': partStr = myDate.getFullYear(); break;
      case 'M': partStr = myDate.getMonth() + 1; break;
      case 'd': partStr = myDate.getDate(); break;
      case 'w': partStr = Week[myDate.getDay()]; break;
      case 'ww': partStr = myDate.WeekNumOfYear(); break;
      case 'h': partStr = myDate.getHours(); break;
      case 'm': partStr = myDate.getMinutes(); break;
      case 's': partStr = myDate.getSeconds(); break;
    }
    return partStr;
  }

	/**
	* 取得当前日期所在月的最大天数  
	*/
  this.maxDayOfDate = function (date) {
    date = arguments[0] || new Date();
    date.setDate(1);
    date.setMonth(date.getMonth() + 1);
    var time = date.getTime() - 24 * 60 * 60 * 1000;
    var newDate = new Date(time);
    return newDate.getDate();
  }
};

module.exports = util;
/*
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function doShare(user_id) {
  console.log(user_id);
}
function pointtoNum(str) {

}
//图片等比例缩放
function imageUtil(e) {
  var imageSize = {};
  var originalWidth = e.detail.width;//图片原始宽 
  var originalHeight = e.detail.height;//图片原始高 
  var originalScale = originalHeight / originalWidth;//图片高宽比 
  //console.log('originalWidth: ' + originalWidth)
  //console.log('originalHeight: ' + originalHeight)
  //获取屏幕宽高 
  wx.getSystemInfo({
    success: function (res) {
      var windowWidth = res.windowWidth;
      var windowHeight = res.windowHeight;
      var windowscale = windowHeight / windowWidth;//屏幕高宽比 
      //console.log('windowWidth: ' + windowWidth)
      //console.log('windowHeight: ' + windowHeight)
      if (originalScale < windowscale) {//图片高宽比小于屏幕高宽比 
        //图片缩放后的宽为屏幕宽 
        imageSize.imageWidth = windowWidth;
        imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;
      } else {//图片高宽比大于屏幕高宽比 
        //图片缩放后的高为屏幕高 
        imageSize.imageHeight = windowHeight;
        imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;
      }

    }
  })
  //console.log('缩放后的宽: ' + imageSize.imageWidth)
  //console.log('缩放后的高: ' + imageSize.imageHeight)
  return imageSize;
}

module.exports = {
  formatTime: formatTime,
  doShare: doShare,
  pointtoNum: pointtoNum,
  imageUtil: imageUtil 
}
*/