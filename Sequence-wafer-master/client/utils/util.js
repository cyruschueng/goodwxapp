const config = require('../config')

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

//是否全是汉字
function isChinese(str) {
  var reg = new RegExp("^[\u4E00-\u9FA5]+$")
  return reg.test(str)
}

function httpGet(url, params, success, fail, showLoading) {
  var that = this
  if (showLoading) {
    this.showLoading()
  }
  wx.request({
    url: url,
    data: params,
    method: 'GET',
    success(res) {
      that.hideLoading()
      if (res.data.code == 0) {
        typeof success == "function" && success(res.data.data)
      } else {
        typeof fail == "function" && fail(res)
        wx.showToast({
          title: "网络请求失败",
          image: '/images/error.png'
        })
      }
    },
    fail(err) {
      that.hideLoading()
      typeof fail == "function" && fail(err)
      wx.showToast({
        title: "网络请求失败",
        image: '/images/error.png'
      })
    }
  })
}

function httpPost(url, params, success, fail, showLoading) {
  var that = this
  if (showLoading) {
    this.showLoading()
  }
  wx.request({
    url: url,
    data: params,
    method: 'POST',
    success(res) {
      that.hideLoading()
      if (res.data.code == 0) {
        typeof success == "function" && success(res.data.data)
      } else {
        typeof fail == "function" && fail(res)
        wx.showToast({
          title: "网络请求失败",
          image: '/images/error.png'
        })
      }
    },
    fail(err) {
      that.hideLoading()
      typeof fail == "function" && fail(err)
      wx.showToast({
        title: "网络请求失败",
        image: '/images/error.png'
      })
    }
  })
}

//显示加载提示框
function showLoading() {
  this.hideLoading()
  if (wx.showLoading) {
    wx.showLoading({
      title: "加载中",
      mask: true
    })
  }
}

//隐藏加载提示框
function hideLoading() {
  if (wx.hideLoading) {
    wx.hideLoading()
  }
}

module.exports = {
  formatTime: formatTime,
  isChinese: isChinese,
  showLoading: showLoading,
  hideLoading: hideLoading,
  httpGet: httpGet,
  httpPost: httpPost
}
