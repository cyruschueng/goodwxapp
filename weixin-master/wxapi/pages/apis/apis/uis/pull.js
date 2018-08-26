/**
 * API -- UI Pull Trigger Refresh
 * 
 * 下拉触发刷新
 * 
 * Page.onPullDownRefresh(opts) 在 Page 中定义该事件的处理函数，监听页面用户下拉刷新事件
 * 注意点：
 * 1. 需要在 config 的 window 选项中开启 enablePullDownRefresh
 * 2. 当处理完数据刷新后， wx.stopPullDownRefresh 可以停止当前页面的下拉刷新
 * 
 * wx.startPullDownRefresh(opts) 1.5.0
 * 开始下拉刷新，调用后触发下拉刷新动画，效果和用户手动下拉刷新一致
 * 
 * wx.stopPullDownRefresh()
 * 停止当前页面下拉刷新
 * 
 * 示例：
 * 
 * Page({
 *  onPullDownRefresh: function() {
 *    wx.stopPullDownRefresh()
 *  }
 * })
 */

const TIP = require('./tip')

module.exports = {

  down: {
    // 监听下拉刷新事件
    onRefresh(opts) {

    },

    // 开始下拉刷新
    start(opts) {
      const _opts = {
        success(res) {
          const _res = {
            errMsg: 'String, 接口调用结果'
          }
        },
        fail(res) {},
        complete(res) {}
      }

      if (!wx.startPullDownRefresh) {
        TIP.modal.show({ type: 'low_version' })
        return false
      }

      wx.startPullDownRefresh(opts)
    },

    // 停止下拉刷新
    stop() {
      wx.stopPullDownRefresh()
    }
  }
}