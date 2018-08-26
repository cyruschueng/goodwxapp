export default {
  // App的配置项
  app: {
    lifecycleHooks: ['onInit', 'onLaunch', 'onShow', 'onHide', 'onError']
  },

  // Page的配置项
  page: {
    lifecycleHooks: [
      'onInit',
      'onLoad',
      'onReady',
      'onShow',
      'onHide',
      'onUnload',
      'onPullDownRefresh',
      'onReachBottom'
    ]
  }
}
