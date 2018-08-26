import { assign } from './assign'
export function showLoading (options = { title: '加载中..', mask: true }) {
  if (wx.showLoading) {
    wx.showLoading(options)
  } else {
    wx.showToast(assign(options, { icon: 'loading', duration: 10000 }))
  }
}

export function hideLoading () {
  if (wx.hideLoading) {
    wx.hideLoading()
  } else {
    wx.hideToast()
  }
}

export function failToast (title) {
  wx.showToast({
    title: title,
    image: '/images/fail.png',
    duration: 2000
  })
}

export function getCurrentPage () {
  const pages = getCurrentPages()
  return pages[pages.length - 1]
}

export function getShareAppMessage (title) {
  return () => ({
    title
  })
}

export function failToastByNetworkType () {
  var networkType = wx.$store.getState().networkType
  if (['2g', 'none'].indexOf(networkType) > -1) {
    failToast('网络不畅')
  } else {
    failToast('数据加载失败')
  }
}
