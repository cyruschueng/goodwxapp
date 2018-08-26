import Promise from '../utils/npm/bluebird.min';

export default {
  storedKey(category, key) {
    return category + '-' + key
  },
  get(category, key) {
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key: this.storedKey(category, key),
        success(res) {
//          console.log('wx getStorage res: ' + JSON.stringify(res))
          return resolve(res.data)
        },
        fail(err) {
          console.log('wx getStorage Error: ' + JSON.stringify(err))
          return reject(err)
        }
      })
    })
  },

  set(category, key, value) {
    return new Promise((resolve, reject) => {
      wx.setStorage({
        key: this.storedKey(category, key),
        data: value,
        success(res) {
          console.log('wx setStorage res: ' + JSON.stringify(res))
          resolve(value)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  },

  remove(category, key) {
    return new Promise((resolve, reject) => {
      wx.removeStorage({
        key: this.storedKey(category, key),
        success(res) {
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  },

  setE(category, key, val, exp) {
    return wx.setStorageAsync({
      key: this.storedKey(category, key),
      data: { val, exp, time: Date.now() }
    })
  },
  getE(category, key) {
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key: this.storedKey(category, key),
        success(res) {
          if (!res.data) {
            return resolve(null)
          }
          if (Date.now() - res.data.time > res.data.exp) {
            return resolve(null)
          }
          return resolve(res.data.val)
        },
        fail(err) {
          console.log('wx getStorage Error: ' + JSON.stringify(err))
          return reject(err)
        }
      })
    })
  }
}
