const config = require('../config')

var Promise = require('es6-promise_min.js')

Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,                 //月份 
    "d+": this.getDate(),                    //日 
    "h+": this.getHours(),                   //小时 
    "m+": this.getMinutes(),                 //分 
    "s+": this.getSeconds(),                 //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds()             //毫秒 
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res)
      }
      obj.fail = function (res) {
        reject(res)
      }
      fn(obj)
    })
  }
}

function queryBookInfo(isbn13, cb) {
  wx.request({
    url: 'https://api.douban.com/v2/book/isbn/' + isbn13,
    header: {
      "Content-Type": "json"
    },
    success: function (res) {
      typeof cb == "function" && cb(res.data)
    }
  })
}

// 判断书籍是否收藏
function checkBookInfo(isbn13, cb) {
  var app = getApp()
  wx.request({
    url: config.chkBookInfoUrl,
    method: 'POST',
    data: {
      openid: app.globalData.openid,
      isbn13: isbn13
    },
    success: function (res) {
      typeof cb == "function" && cb(res.data)
    }
  })
}

function addBookInfo(bookinfo, cb) {
  var app = getApp()

  // 调用后端服务新增书籍信息
  wx.request({
    url: config.ownedbooksUrl,
    method: 'PUT',
    data: {
      openid: app.globalData.openid,
      isbn13: bookinfo.isbn13,
      bookinfo: bookinfo
    },
    success: function (res) {

      // 若返回错误，则不进行新增操作
      if (res.data.retCode != 0) {
        cb(res.data)
        return
      }

      // 更新全局变量信息 
      app.globalData.bookListSize++

      // 放入书架时间
      bookinfo['addAt'] = res.data.addAt
      bookinfo['adddate'] = new Date(res.data.addAt).format("yyyy-MM-dd")

      var isbn13 = bookinfo.isbn13
      var bookList = app.globalData.bookList
      var newBookList = {}
      newBookList[bookinfo.isbn13] = bookinfo
      for (var isbn in bookList) {
        newBookList[bookList[isbn].isbn13] = bookList[isbn]
      }
      app.globalData.bookList = newBookList

      typeof cb == "function" && cb(res.data)
    }
  })
}

function delBookInfo(bookinfo, cb) {
  var app = getApp()

  // 调用后端服务新增书籍信息
  wx.request({
    url: config.ownedbooksUrl,
    method: 'DELETE',
    data: {
      openid: app.globalData.openid,
      isbn13: bookinfo.isbn13
    },
    success: function (res) {

      // 更新全局变量信息 
      app.globalData.bookListSize--

      var bookList = app.globalData.bookList
      delete bookList[bookinfo.isbn13];
      app.globalData.bookList = bookList

      typeof cb == "function" && cb(res.data)
    }
  })
}

function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  var second = time

  return ([hour, minute, second]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}

function formatLocation(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude)
    latitude = parseFloat(latitude)
  }

  longitude = longitude.toFixed(2)
  latitude = latitude.toFixed(2)

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.')
  }
}

module.exports = {
  wxPromisify: wxPromisify,
  queryBookInfo: queryBookInfo,
  checkBookInfo: checkBookInfo,
  addBookInfo: addBookInfo,
  delBookInfo: delBookInfo,
  formatTime: formatTime,
  formatLocation: formatLocation
}
