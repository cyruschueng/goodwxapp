import store from '@/store/index'
import '@/plugins/index'
import { getNetworkType } from 'actions'
setNetworkType()

// 设置网络类型
function setNetworkType () {
  wx.getNetworkType({
    success: function (res) {
      // 返回网络类型, 有效值：
      // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
      store.dispatch(getNetworkType(res.networkType))
    }
  })

  if (wx.onNetworkStatusChange) {
    wx.onNetworkStatusChange(function (res) {
      store.dispatch(getNetworkType(res.networkType))
    })
  }
}
