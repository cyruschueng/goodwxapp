
import Promise from '../utils/npm/bluebird.min'
import wxStorageP from 'wx-storage-promise'

import { concat, uniqWith, isEqual, reverse, remove } from '../utils/npm/lodash-wx'

const Category_Shopping_car = 'ShoppingCar'

export default {
  save(key, value) {
    // return wxStorageP.get(Category_Shopping_car, key)
    //   .then((historyResult) => {
    //     let allResult = concat(historyResult, queryResult)
    //     return uniqWith(allResult, isEqual)
    //   }).catch((error) => {
    //     return queryResult
    //   }).then((result) => {
    //     console.log('set');
    //     return wxStorageP.set(Category_Shopping_car, key, result)
    //   })
    return wxStorageP.set(Category_Shopping_car, key, value).then((result) => {
      wx.showToast({
        title: '操作成功',
        icon: 'success',
        duration: 2000
      })
      return reverse(result)
    })
  },

  get(key) {
    return wxStorageP.get(Category_Shopping_car, key)
      .then((result) => {
        // console.log('get store');
        return reverse(result)
      })
  },

  clear(key) {
    return wxStorageP.remove(Category_Shopping_car, key)
  },

  remove(key, predicate) {
    return wxStorageP.get(Category_Shopping_car, key)
      .then((result) => {
        let removed = remove(result, predicate)
        return result
      }).catch((error) => {
        return []
      }).then((result) => {
        return wxStorageP.set(Category_Shopping_car, key, result)
      })
  }
}
