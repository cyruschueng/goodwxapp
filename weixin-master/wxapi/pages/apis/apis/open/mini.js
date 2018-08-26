/**
 * API -- 微信小程序
 * 
 * v1.3.0
 */

module.exports = {
  /**
   * iOS 6.5.9开始支持，Andriod 6.5.10即将开始支持
   */
  open(opts) {
    const _opts = {
      appId: 'String, required',
      path: 'String, 打开的页面路径，如果为空则打开首页',
      extraData: 'Object, 需要传递给目标小程序的数据，目标小程序可在App.onLaunch, App.onShow中获取到这份数据',
      envVersion: 'String, 要打开的小程序版本，有效值：develop, trail(体验版), release，仅当小程序为开发版或体验版时此参数有效',
      success(res) {
        const _res = {
          errMsg: ''
        }
      },
      fail() {},
      complete() {}
    }
  },

  back(opts) {
    const _opts = {
      extraData: 'Object',
      success(res) {
        errMsg: 'String'
      },
      fail() {},
      complete() {}
    }
  }
}