var app = getApp();
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
    path: 'pages/index/index?scene=53e5ba17d89c401a03ed56b7a8791083',
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
// 保存formid
function formSubmit(e) {
  let that = this;
  let form_id = e.detail.formId;
  wx.request({
    url: "https://friend-guess.playonwechat.com/api/save-form?sign=" + wx.getStorageSync('sign') + '&operator_id=' + app.data.kid,
    data: {
      form_id: form_id
    },
    header: {
      'content-type': 'application/json'
    },
    method: "GET",
    success: function (res) {
      
    }
  })
}

module.exports = {
  formatTime,
  jump,
  formSubmit
}
