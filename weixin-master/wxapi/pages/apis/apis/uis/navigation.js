/**
 * API -- UI navigation bar
 * 
 * 导航条
 */

const TIP = require('./tip')

module.exports = {
  setBarTitle(opts) {
    const _opts = {
      title: 'String, required, 页面标题',
      success(res) {},
      fail(res) {},
      complete(res) {}
    }
  },
  
  setBarColor(opts) {
    const _opts = {
      frontColor: 'String, required, 前景颜色值，包括按钮，标题，状态栏的颜色，仅支持#ffffff和#000000',
      backgroundColor: 'String, required, 背景颜色值，有效值为16进制颜色',
      // Object, 动画效果
      animation: {
        duration: 'Number, 动画变化时间，默认：0，单位：ms',
        // 有效值：linear, easeIn, easeOut, easeInOut
        timingFunc: 'String, 动画变化方式，默认：linear'
      },
      success(res) {
        const _res = {
          errMsg: 'String, 调用结果'
        }
      },
      fail(res) {},
      complete(res) {}
    }
  },

  showBarLoading(opts) {
    wx.showNavigationBarLoading()
  },

  hideBarLoading(opts) {
    wx.hideNavigationBarLoading()
  }
}