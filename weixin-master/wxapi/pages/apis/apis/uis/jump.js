/**
 * API -- UI Page Jump
 * 
 * 页面跳转，切换
 */

const TIP = require('./tip')

module.exports = {
  /**
   * 保留当前页面，跳转到应用内的某个页面， 使用 wx.navigateBack 返回原页面
   * 
   * 参数可在跳转后的页面的 onLoad 的参数 option.query 中读取
   * 
   * onLoad: option => console.log(option.query)
   * 
   * TIP: 目前页面路径最多只能十层
   */
  navigateTo(opts) {
    const _opts = {
      url: 'String, required, 需要跳转的应用内非tabbar得页面路径，路径可带参数，如：path?key=value&key2=value2',
      success(res) {},
      fail(res) {},
      complete(res) {}
    }

    wx.navigateTo(opts)
  },

  /**
   * 关闭当前页面，跳转到应用内某个页面
   */
  redirectTo(opts) {
    const _opts = {
      url: 'String, required, 需要跳转的应用内非tabbar得页面路径，路径可带参数，如：path?key=value&key2=value2',
      success(res) {},
      fail(res) {},
      complete(res) {}
    }

    wx.redirectTo(opts)
  },

  /**
   * 跳转到tabBar页面，并关闭其他所有非tabBar页面
   * 
   * 示例：
   * 
   * app.json {
   *  "tabBar": {
   *    "list": [{
   *      "pagePath": "index",
   *      "text": "首页"
   *    }]
   *  }
   * }
   * 
   * 使用：wx.switchTab({ url: '/index' })
   */
  switchTab(opts) {
    const _opts = {
      url: 'String, required, 需要跳转的tabBar页面路径（需在app.json的tabBar字段定义的页面），路径后不能带参数',
      success(res) {},
      fail(res) {},
      complete(res) {}
    }

    wx.switchTab(opts)
  },

  /**
   * 关闭当前页面，返回上一页面或多级页面。可通过getCurrentPages()获取当前页面栈，决定返回几层
   * 
   * 当前 A 页面
   * wx.navigateTo({url: 'B?id=1'})  把 A 压入页面栈
   * wx.navigateTo({url: 'C?id=1'})  把 B 压入页面栈
   * wx.navigateBack({delta: 2})  则会返回到A页面
   */
  navigateBack(opts) {
    const _opts = {
      delta: 'Number, defalt: 1, 返回的页面数，如果大于现有页面数，则返回首页'
    }

    wx.navigateBack(opts)
  },

  /**
   * 关闭所有页面，打开到应用内的某个页面
   * 
   * >= 1.1.0
   */
  reLaunch(opts) {
    const _opts = {
      url: 'String, required, 需要跳转的应用内非tabbar得页面路径，路径可带参数，如：path?key=value&key2=value2',
      success(res) {},
      fail(res) {},
      complete(res) {}
    }

    if (!wx.relaunch) {
      TIP.modal.show({ type: 'low_version' })
      return false
    }

    wx.relaunch(opts)
  }
}