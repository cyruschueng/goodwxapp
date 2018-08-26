import utils from '../../utils/index'

Page({
  onLogin
})

function onLogin() {
  const login = utils.promisify(wx.login)
  const getUserInfo = utils.promisify(wx.getUserInfo)

  login()
    .then(res => {
      console.log('[login] code', res.code)
      return getUserInfo()
    })
    .then(res => {
      console.log('[getUserInfo] res: ', res)
    })
    .catch(err => {
      console.error(err)
    })
}
