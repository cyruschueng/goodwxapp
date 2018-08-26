
/**
 * 验证用户是否登录
 * resolved:已完成
 * rejected:已失败
 */

function checkLogin() {

  return new Promise(function (resolve, reject) {
    checkSession().then(() => {
      if (!wx.getStorageSync('sid')) {
        reject();
      } else {
        resolve();
      }

    }).catch(() => {
      reject()

    })

  })
  

}
/**
 * 检测当前用户登录态是否有效
 */

function checkSession() {
  return new Promise(function (resolve, reject) {
    wx.checkSession({
      success: resolve,
      fail: reject
    })
  })

}

/**
 * 用户登录
 */
function loginIn() {


}

module.exports = {
  checkLogin: checkLogin

}


