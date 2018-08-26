// 微信必须支持的API,否则请用户更新微信
var apis = ['getExtConfigSync']
export function checkWXVerion () {
  for (var i = 0; i < apis.length; i++) {
    if (wx[apis[i]] == null) {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
      break
    }
  }
}
