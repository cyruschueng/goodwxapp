/**
 * API -- 加载，拉起，启动
 */

module.exports = {
  /**
   * launchApp 不能直接调用
   * <button open-type="launchApp" app-parameter="wechat" binderror="launchAppError">打开APP</button>
   */
  app(opts) {

    Page({
      launchAppEror: function(e) {
        console.log(e.detail.errMsg)
      }
    })
  }
}