/**
 * @author Sky
 * @email lihaizh_cn@foxmail.com
 * @create date 2018-01-06 06:35:34
 * @modify date 2018-01-06 06:35:34
 * @desc app.json配置文件
*/

const prod = process.env.NODE_ENV === 'production'

// 路由（每一个对象代表一个分包，第一个对象为主包）
const routes = [
  // 主包目录
  {
    // 主页/登录页
    index: 'pages/index'
  }
  // 分包目录
]

// 窗口样式
const $window = {
  // 导航栏背景颜色
  navigationBarBackgroundColor: '#fff',
  // 导航栏标题颜色，仅支持black/white
  navigationBarTextStyle: 'black',
  // 导航栏标题文字内容
  navigationBarTitleText: 'Cool Music',
  // 窗口的背景色
  backgroundColor: '#fff',
  // 下拉背景字体、loading图的样式，仅支持dark/light
  backgroundTextStyle: 'light',
  // 是否开启下拉刷新
  enablePullDownRefresh: false,
  // 页面上拉触底事件触发时距页面底部距离，单位为px
  onReachBottomDistance: 50
}

// 菜单栏
const $tabBar = {
  // tab上的文字默认颜色
  color: '#666',
  // tab上的文字选中时的颜色
  selectedColor: '#0f0',
  // tab的背景色
  backgroundColor: '#fff',
  // tabbar上边框的颜色，仅支持black/white
  borderStyle: 'black',
  // tabBar的位置，仅支持bottom/top，当设置为top时，icon不显示
  position: 'bottom',
  // tabBar只能配置最少2个，最多5个tab
  list: [
    {
      pagePath: routes[0].index,
      text: '首页',
      iconPath: '',
      selectedIconPath: ''
    },
    {
      pagePath: routes[0].index,
      text: 'todos',
      iconPath: '',
      selectedIconPath: ''
    }
  ]
}

// 网络超时
const $networkTimeout = {
  // wx.request的超时时间，单位ms
  request: 15000,
  // wx.connectSocket的超时时间，单位ms
  connectSocket: false,
  // wx.uploadFile的超时时间，单位ms
  uploadFile: 30000,
  // wx.downloadFile的超时时间，单位ms
  downloadFile: 30000
}

// console信息：Page的注册、页面路由、数据更新、事件触发
const $debug = !prod

module.exports = {
  routes,
  $window,
  $tabBar,
  $networkTimeout,
  $debug
}
