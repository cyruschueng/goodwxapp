const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000
})

// 显示成功提示
var showSuccess = (text, callback) => {
  wx.showToast({
    title: text,
    icon: 'success',
    duration: 1500,
    complete: function () {
      console.log('测试')
      if (callback) {
        setTimeout(callback, 1500)
      } 
    }
  })
  
}

var showError = (text, callback) => {
  wx.showToast({
    title: text,
    image: '/images/error.png',
    duration: 1500,
    complete: function () {
      console.log('测试')
      if (callback) {
        setTimeout(callback, 1500)
      } 
    }
  })
  
}

// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();
  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  })
}

var hideModel = () => {
  wx.hideToast();
}

var mergeJsonObject = (jsonbject1, jsonbject2) => {
  var resultJsonObject = {};
  for (var attr in jsonbject1) {
    resultJsonObject[attr] = jsonbject1[attr];
  }
  for (var attr in jsonbject2) {
    resultJsonObject[attr] = jsonbject2[attr];
  }
  return resultJsonObject;
}


function getShowDate(rawDate) {
  var date = new Date(rawDate)
  let str = date.toLocaleDateString()
  console.log('日期', str)
  str = str.replace(/\//g, '-')
  let dateArray = str.split('-')
  console.log('日起数组', dateArray)
  let showDate = dateArray[0] + '年' + fix(dateArray[1], 2) + '月' + fix(dateArray[2], 2) + '日'
  return showDate
}

function getShowTime(rawDate) {
  var date = new Date(rawDate)
  let time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
  let timeArray = time.split(':')
  let showTime = fix(timeArray[0], 2) + ':' + fix(timeArray[1], 2) + ':' + fix(timeArray[2], 2)
  if (timeArray[0] < 12) {
    showTime = '上午 ' + showTime
  } else {
    showTime = '下午 ' + fix(parseInt(timeArray[0]) - 12, 2) + ':' + fix(timeArray[1], 2) + ':' + fix(timeArray[2], 2)
  }
  return showTime
}

function fix(num, length) {
  return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
}


module.exports = {
  formatTime, showBusy, showSuccess, showError, showModel, hideModel, mergeJsonObject, getShowDate, getShowTime 
  }
