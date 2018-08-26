// common.js
const app = getApp()

const check_init_done = () => {
  if (app.globalData.login_done && app.globalData.init_data_done) {
    wx.hideLoading()
    return true
  }
  return false
}

module.exports = {
  check_init_done: check_init_done
}