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

//显示加载提示框
function showLoading() {
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
  hideLoading: hideLoading
}
