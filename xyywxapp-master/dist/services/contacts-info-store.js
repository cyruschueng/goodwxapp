import Promise from '../utils/npm/bluebird.min'
import wxStorageP from 'wx-storage-promise'

import { concat, uniqWith, isEqual, reverse, remove } from '../utils/npm/lodash-wx'

const Category_Contacts_info = 'ReservedDate'

export default {
  save(key, value) {
    return wxStorageP.set(Category_Contacts_info, key, value)
  },

  get(key) {
    return wxStorageP.get(Category_Contacts_info, key)
      .then((result) => {
        console.log('wx setStorage res: Category_Contacts_info' + JSON.stringify(result));
        return reverse(result)
      })
  },

  clear(key) {
    return wxStorageP.remove(Category_Contacts_info, key)
  },

  remove(key, predicate) {
    return wxStorageP.get(Category_Contacts_info, key)
      .then((result) => {
        let removed = remove(result, predicate)
        return result
      }).catch((error) => {
        return []
      }).then((result) => {
        return wxStorageP.set(Category_Contacts_info, key, result)
      })
  }
}
