import { getQQMap } from '../utils/index.js'
import Promise from '../modules/es6-promise/index.js'
// 缓存同一个数据的请求
const geocoderMap = {}

// 根据地址获取地址的经纬度
export const geocoder = (address) => new Promise((resolve, reject) => {
  const qqmap = getQQMap()
  if (geocoderMap[address]) {
    return resolve(geocoderMap[address])
  }
  // 请求腾讯地图api
  qqmap.geocoder({
    address: address,
    success (res) {
      if (res.status === 0) {
        geocoderMap[address] = res.result
        resolve(res.result)
      } else {
        reject(new Error('[qqmap:geocoder]获取地址的经纬度失败，' + res.message))
      }
    },
    fail: reject
  })
})
