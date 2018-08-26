/**
 * API -- UI Tab
 * 
 * Tab Bar
 * 
 * >= 1.9.0
 */

const TIP = require('./tip')

module.exports = {
  /**
   * 为tabBar某一项的右上角添加文本
   */
  setBadge(opts) {
    const _opts = {
      index: 'Number, required, tabBar的哪一项，从左边算起',
      text: 'String, required, 显示的文本，超过3个字符则显示成“...”',
      success(res) {},
      fail(res) {},
      complete(res) {}
    }

    if (!wx.setTabBarBadge) {
      TIP.modal.show({ type: 'low_version' })
      return false
    }

    wx.setTabBarBadge(opts)
  },

  /**
   * 移除tabBar某一项右上角的文本
   */
  removeBadge(opts) {
    const _opts = {
      index: 'Number, required',
      success(res) {},
      fail(res) {},
      complete(res) {}
    }

    if (!wx.removeTabBarBadge) {
      TIP.modal.show({ type: 'low_version' })
      return false
    }

    wx.removeTabBarBadge()
  },

  /**
   * 显示tabBar某一项的右上角红点
   */
  showRedDot(opts) {
    const _opts = {
      success(res) {},
      fail(res) {},
      complete(res) {}
    }

    if (!wx.showTabBarRedDot) {
      TIP.modal.show({ type: 'low_version' })
      return false
    }

    wx.showTabBarRedDot(opts)
  },

  /**
   * 隐藏tabBar某一项的右上角的红点
   */
  hideRedDot(opts) {
    const _opts = {
      success(res) {},
      fail(res) {},
      complete(res) {}
    }

    if (!wx.hideTabBarRedDot) {
      TIP.modal.show({ type: 'low_version' })
      return false
    }

    wx.hideTabBarRedDot(opts)
  },

  /**
   * 动态设置tabBar整体样式
   */
  setStyle(opts) {
    const _opts = {
      color: 'HexColor, tab上的文字默认颜色',
      selectedColor: 'HexColor, tab上的文字选中时的颜色',
      backgroundColor: 'HexColor, tab的背景色',
      borderStyle: 'String, tabbar上的边框颜色，仅支持black/white',
      success(res) {},
      fail(res) {},
      complete(res) {}
    }

    if (!wx.setTabBarStyle) {
      TIP.modal.show({type: 'low_version'})
      return false
    }

    wx.setTabBarStyle(opts)
  },

  /**
   * 动态设置tabbar某一项的内容
   */
  setItem(opts) {
    const _opts = {
      index: 'Number, required, tabbar的哪一项，从左边算起',
      text: 'String, tab上按钮文字',
      iconPath: 'String, 图片路径，icon大小限制40kb, 建议尺寸为81px*81px,当position为top时，此参数无效，不支持网络图片',
      selectedIconPath: 'String, 选中时图片路径，同上.',
      success(res) {},
      fail(res) {},
      complete(res) {}
    }

    if (!wx.setTabBarItem) {
      TIP.modal.show({ type: 'low_version' })
      return false
    }

    wx.setTabBarItem(opts)
  },

  /**
   * 显示tabBar
   */
  show(opts) {
    const _opts = {
      animaition: 'Boolean',
      success(res) {},
      fail(res) {},
      complete(res) {}
    }

    if (!wx.showTabBar) {
      TIP.modal.show({ type: 'low_version' })
      return false
    }

    wx.showTabBar(opts)
  },

  /**
   * 隐藏tabbar
   */
  hide(opts) {
    const _opts = {
      animation: 'Boolean',
      success(res) {},
      fail(res) {},
      complete(res) {}
    }

    if (!wx.hideTabBar) {
      TIP.modal.show({ type: 'low_version' })
      return false
    }

    wx.hideTabBar(opts)
  },

  /**
   * 设置置顶栏文字内容，只有当小程序被置顶时生效，设置成功之后，需间隔
   * 5s才能再次调用该接口，如果5s内再次调用会触发回调fail, errMsg: 
   * 'setTopBarText: fail invoke too frequently'
   */
  setTopText(opts) {
    const _opts = {
      text: 'String, required, 置顶栏的文字内容',
      success(res) {},
      fail(res) {},
      complete(res) {}
    }

    if (!wx.setTopBarText) {
      TIP.modal.show({ type: 'low_version' })
      return false
    }

    wx.setTopBarText(opts)
  }
}