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
function jump() {
  wx.navigateToMiniProgram({
    appId: 'wx22c7c27ae08bb935',
    path: 'pages/index/index?scene=92c8a0964d1c6e8f0a33daf3a42798a5',
    envVersion: 'release',
    success(res) {
      // 打开成功
      console.log(res);
    },
    fail(res) {
      console.log(res);
    }
  })
}
module.exports = {
  formatTime,
  jump
}
