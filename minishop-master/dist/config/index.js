export * from './busKey'
const domain = 'https://shoplet-test.wuage.com/wx'
export default {
  // 在storage定义的key,避免冲突
  storageKeys: {
    sid: 'sid'
  },
  // apis请求地址
  urls: {},
  systemInfo: getSystemInfo(),
  isIOS: /ios/.test(getSystemInfo().system.toLowerCase())
}

let systemInfo
function getSystemInfo () {
  if (systemInfo) return systemInfo
  systemInfo = wx.getSystemInfoSync ? wx.getSystemInfoSync() : {}
  return systemInfo
}
