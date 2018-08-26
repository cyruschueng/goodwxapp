
/**
 * 是否为Null
 * @param object
 * @returns {Boolean}
 */
function isNull(object) {
  if (object == null || typeof object == "undefined") {
    return true;
  }
  return false;
};


function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function formatduration(duration) {
  duration = new Date(duration);
  let mint = duration.getMinutes();
  let sec = duration.getSeconds();
  return formatNumber(mint) + ":" + formatNumber(sec);
}

module.exports = {
  formatTime: formatTime,
  formatduration: formatduration,
}


function getWeek(dateString) {
  var date;
  if (isNull(dateString)) {
    date = new Date();
  } else {
    var dateArray = dateString.split("-");
    date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
  }
  //var weeks = new Array("日", "一", "二", "三", "四", "五", "六");
  //return "星期" + weeks[date.getDay()];
  return "星期" + "日一二三四五六".charAt(date.getDay());
};

function formatTime(date, type) {
  type = type || 1;
  //type 1,完成输出年月日时分秒，2对比当前时间输出日期，或时分;
  var d = new Date(date)
  var year = d.getFullYear()
  var month = d.getMonth() + 1
  var day = d.getDate()

  var hour = d.getHours()
  var minute = d.getMinutes()
  var second = d.getSeconds();
  if (type == 1) {
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
  } else if (type == 2) {
    return [month, day].map(formatNumber).join('月') + '(' + "星期" + '日一二三四五六'.split("")[new Date().getDay()] + ')';
  } else {
    var current = new Date();
    var curtimes = current.getTime();
    var datetimes=d.getTime();
    if ((curtimes - datetimes) < 24 * 3600000) {
      if (curtimes - datetimes < 24 * 3600000) {
        return (new Date(curtimes - datetimes)).getSeconds() + "分钟前";
      }
      else {
        return [hour, minute].map(formatNumber).join(':');
      }
    } else if ((curtimes - datetimes) < 48 * 3600000) {
      return "昨天:" + [hour, minute].map(formatNumber).join(':');

    } else if (year != current.getFullYear()) {
      return year + "年" + month + "月" + day + "日"
    }
    else {
      return month + "月" + day + "日"
    }
  }
}

function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}

// 格式化时间戳
function getTime(timestamp) {
  var time = arguments[0] || 0;
  var t, y, m, d, h, i, s;
  t = time ? new Date(time * 1000) : new Date();
  y = t.getFullYear();    // 年
  m = t.getMonth() + 1;   // 月
  d = t.getDate();        // 日

  h = t.getHours();       // 时
  i = t.getMinutes();     // 分
  s = t.getSeconds();     // 秒

  return [y, m, d].map(formatNumber).join('-') + ' ' + [h, i, s].map(formatNumber).join(':');
}



function GetDateStr(AddDayCount) {
  var dd = new Date();
  dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1;//获取当前月份的日期
  var d = dd.getDate();
  return y + "-" + m + "-" + d;
}

module.exports = {

  formatTime: formatTime,
  getTime: getTime,

  addDate: function (date, days) {
    var d = new Date(date);
    d.setDate(d.getDate() + days);
    var m = d.getMonth() + 1;
    return d.getFullYear() + '-' + m + '-' + d.getDate();
  },


  getWeek: function(dateString) {
  var date;
  if (isNull(dateString)) {
    date = new Date();
  } else {
    var dateArray = dateString.split("-");
    date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
  }
  //var weeks = new Array("日", "一", "二", "三", "四", "五", "六");
  //return "星期" + weeks[date.getDay()];
  return "星期" + "日一二三四五六".charAt(date.getDay());
},


 getTimeEx:function(date1) {
  var today = GetDateStr(0);
  if (date1 == today) {
    return '今天';
  } else if (date1 == GetDateStr(1)) {
    return '明天'
  } else if (date1 == GetDateStr(2)) {
    return '后天'
  } else {
    return date1.split('-')[1] + "月" + date1.split('-')[2]+"日";
  }
},



Trim : function (t, c) {
     var rg = new RegExp("^" + c + "*");
     var str = t.replace(rg, '');
     rg = new RegExp(c);
     var i = str.length;
     while (rg.test(str.charAt(--i)));
     return str.slice(0, i + 1);
 } ,


 // 计算每月有多少天
 getThisMonthDays: function (year, month) {
   return new Date(year, month, 0).getDate();
 },
 getDayOfWeek(year, month, day) {
   return new Date(Date.UTC(year, month - 1, day)).getDay();
 },

  GetSubjectList: function () {
    var subjectArray = new Array();
    subjectArray.push("语文");
    subjectArray.push("数学");
    subjectArray.push("英语");
    subjectArray.push("化学");
    subjectArray.push("生物");
    subjectArray.push("物理");
    subjectArray.push("体育");
    subjectArray.push("美术");
    subjectArray.push("音乐");
    subjectArray.push("科学");
    subjectArray.push("历史");
    subjectArray.push("政治");
    subjectArray.push("地理");
    subjectArray.push("其他");
    return subjectArray;
  },


  GetFamilyRole: function (index) {
    if(index==-1){
      return "老师"
    }
    if (index==0){
     return "妈妈"
    } else if (index==1){
     return "爸爸"
   }else{
     return "家长"
   }
  },
  getFeedBackType:function(feedback_type_index){
    var feedback_type = "";
    switch (feedback_type_index) {
      case 0:
        feedback_type = "拍照反馈";
        break;
      case 1:
        feedback_type = "签名反馈";
        break;
      case 2:
        feedback_type = "语音反馈";
        break;
      case 3:
        feedback_type = "录音+拍照反馈";
        break;
      case 4:
        feedback_type = "视频反馈";
        break;
      default:
    }
    return feedback_type
  },

  AJAX: function (data = '', fn, method = "get", header = {}) {
    wx.request({
      url: "http://news-at.zhihu.com/api/4/" + data,
      method: method ? method : 'get',
      data: {},
      header: header ? header : { "Content-Type": "application/json" },
      success: function (res) {
        fn(res);
      }
    });
  },

  AJAX2: function (data = '', fn, method = "get", header = {}) {
    var url = data;
    if (url.indexOf('https') == -1) {
      url = "https://a.welife001.com/" + data
    }
    wx.request({
      url: url,
      method: method ? method : 'get',
      data: {},
      header: header ? header : { "Content-Type": "application/json" },
      success: function (res) {
        fn(res);
      }
    });
  },



  AJAX1: function (data = '', formdata = {}, method = "get", header = {}, fn) {
    var url=data;
    if(url.indexOf('https')==-1){
      url = "https://a.welife001.com/" + data
    }
    wx.request({
      url: url,
      method: method ? method : 'get',
      data: formdata,
      header: header,
      success: function (res) {
        fn(res);
      }
    });
  },

  AJAX2: function (data = '',tip='',formdata = {}, method = "get", header = {}, fn) {
    wx.showLoading({
      title: tip+"...",
    });
    var url = data;
    if (url.indexOf('https') == -1) {
      url = "https://a.welife001.com/" + data
    }
    wx.request({
      url: url,
      method: method ? method : 'get',
      data: formdata,
      header: header,
      success: function (res) {
       wx.hideLoading();
       
        fn(res);
      },
      fail:function(res){
        wx.hideLoading();
        wx.showToast({
          title: '数据处理失败...',
        })
      }
    });
  },

  Upload: function (url = '', filePath = "", formdata = {}, header = {}, fn) {
    wx.uploadFile({
      url: 'https://a.welife001.com/' + url,
      filePath: filePath,
      name: 'file',
      header: header, // 设置请求的 header
      formData: formdata, // HTTP 请求中其他额外的 form data
      success: function (res) {
        fn(res);
      },
      fail: function (msg) {
        console.log(msg)
      },
      complete: function () { // 重置数据

      }
    })
  },



  storageGetPostLike: function (posts) {
    try {
      var postlike = wx.getStorageSync('postlike')
      if (postlike) {
        posts.forEach(function (item) {
          if (postlike.split(item._id).length > 1) {
            item.is_like = true;
          } else {
            item.is_like = false;
          }
        })
      }
    } catch (e) {
    }
  },


  storageSavePostLike: function (id, key) {
    wx.getStorage({
      key: key,
      success: function (res) {
        var postlike = res.data
        if (postlike) {
          if (postlike.split(id).length == 1) {
            var aa = postlike.split("|")
            if (aa.length > 100) {
              aa.shift();
            }
            var postlikeStr = "";
            aa.push(id);
            aa.forEach(function (item) {
              if (postlikeStr.length > 0) {
                postlikeStr = postlikeStr + "|"
              }
              postlikeStr = postlikeStr + item;
            })
            wx.setStorage({
              key: key,
              data: postlikeStr
            })
          }
        }
      },
      fail: function (e) {
        wx.setStorage({
          key: key,
          data: id
        })
      }
    })
  },

  /**
   * 获取格式化日期
   * 20161002
   */
  getFormatDate: function (str) {

    // 拆分日期为年 月 日
    var YEAR = str.substring(0, 4),
      MONTH = str.substring(4, 6),
      DATE = str.slice(-2);

    // 拼接为 2016/10/02 可用于请求日期格式
    var dateDay = YEAR + "/" + MONTH + "/" + DATE;

    // 获取星期几
    var week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      day = new Date(dateDay).getDay();

    // 获取前一天日期 根据今天日期获取前一天的日期
    // var dateBefore = new Date( new Date( dateDay ) - 1000 * 60 * 60 * 24 ).toLocaleDateString();
    // var dateBefore = dateBefore.split('/');
    // if( dateBefore[1] < 10 ) {
    //     dateBefore[1] = '0' + dateBefore[1];
    // }
    // if( dateBefore[2] < 10 ) {
    //     dateBefore[2] = '0' + dateBefore[2];
    // }
    // dateBefore = dateBefore.join('');

    return {
      "dateDay": MONTH + "月" + DATE + "日 " + week[day]
    }

  },


  getSimpleDate: function (str) {
    var date = new Date(str);
    var month= date.getMonth()+1;
    var day= date.getDate();
    return month+"月"+day+"日"

  },

  Base64: function() {
 
  // private property
  var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  // public method for encoding
  this.encode = function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    input = _utf8_encode(input);
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
        _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
        _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
  }

  // public method for decoding
  this.decode = function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
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
    output = _utf8_decode(output);
    return output;
  }

  // private method for UTF-8 encoding
 var _utf8_encode = function (string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }

    }
    return utftext;
  }

  // private method for UTF-8 decoding
var  _utf8_decode = function (utftext) {
    var string = "";
    var i = 0;
    var c = 0;
    var c1 = 0;
    var c2 = 0;
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
    return string;
  }
},



  goWebView: function (href) {
     var b = new this.Base64();
    var href = b.encode(href)
    wx.navigateTo({
      url: '../webview/webview?href=' + href,
    })
  },
}
