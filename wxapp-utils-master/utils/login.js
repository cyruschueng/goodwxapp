import promisify from './promisify'

const showModal = promisify(wx.showModal)
const wxLogin = promisify(wx.login)
const wxGetUserInfo = promisify(wx.getUserInfo)
const openSetting = promisify(wx.openSetting)
const key = 'scope.userInfo'

/** 获取 code */
function getCode() {
  return wxLogin().then(res => res.code)
}

/** 获取用户信息 */
function getUserInfo() {
  let code
  return getCode().then(rawcode => {
    code = rawcode
    return wxGetUserInfo()
  })
    .then(res => {
      return { ...res, code }
    })
    .catch(err => getUserInfoErrorHandler(err))
}

/** 若不允许获取用户昵称，则弹出设置界面 */
function getUserInfoErrorHandler() {
  return prompt()
    .then(confirm => {
      if (confirm) {
        return openSetting()
      } else {
        return getUserInfoErrorHandler()
      }
    })
    .then(res => {
      const { authSetting } = res
      if (authSetting && authSetting[key] === false) {
        return getUserInfoErrorHandler()
      } else {
        return getUserInfo()
      }
    })
}

function prompt() {
  const params = {
    title: '温馨提示',
    content: '无法获取您的信息，小程序工作异常',
    cancelText: '拒绝授权',
    confirmText: '授权'
  }
  return showModal(params)
    .then(res => res.confirm)
    .catch(err => {
      console.error(err)
    })
}

export default {
  getCode,
  getUserInfo
}
