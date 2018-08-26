/**
 * API -- Storage
 * 
 * 本地缓存接口
 */


module.exports = {
  _set(opts, sync) {
    const _opts = {
      key: 'String, required, 本地缓存中的key',
      data: '[Object, String], required，要缓存的内容',
      success(res) {},
      fail(res) {},
      complete() {}
    }

    let _sync = sync
    if (typeof _sync === 'undefined' || !_sync) {
      wx.setStorage(_opts || opts)
      return true
    }

    try {
      wx.setStorageSync(opts.key, opts.data)
    } catch (error) {
      console.log('/storage/get/sync/error', error)
    }
    return false
  },
  _get(opts, sync) {
    const _opts = {
      key: 'String, required, 本地缓存中的key',
      success(res) {
        const _res = {
          data: 'String, key的对应内容'
        }
      },
      fail(res) { },
      complete() { }
    }

    let _sync = sync
    if (typeof _sync === 'undefined' || !_sync) {
      wx.getStorage(_opts || opts)
      return true
    }

    try {
      const res = wx.getStorageSync(opts.key)
      if (opts.callback) {
        opts.callback(res)
      }
      return res
    } catch (error) {
      console.log('/storage/get/sync/error', error)
    }
    return false
  },
  info(opts, sync) {
    const _otps = {
      success(res) {
        const _res = {
          keys: 'String Array, 当前storage中所有的key',
          currentSize: 'Number, 当前占有的空间大小，单位：kb',
          limitSize: 'Number, 限制的空间大小，单位：kb'
        }
      },
      fail(res) {},
      complete(res) {}
    }

    if (typeof sync === 'undefined' || !sync) {
      return wx.getStorageInfo(opts || _opts)
    }

    try {
      const res = wx.getStorageInfoSync()
      if (opts.callback) {
        opts.callback(res)
      }
      return res
    } catch (error) {
      console.log()
    }

    return false
  },
  remove(opts, sync) {
    const _opts = {
      key: 'String, required',
      success(res) {},
      fail(res) {},
      complete(res) {}
    }

    if (typeof sync === 'undefined' || !sync) {
      wx.removeStorage(opts || _opts)
      return true
    }

    try {
      wx.removeStorageSync(opts.key)
    } catch (error) {
      console.log('/storage/remove/sync/error', error)
    }

    return false
  },
  clear(sync) {
    if (typeof sync === 'undefined' || !sync) {
      wx.clearStorage()
      return true
    }

    try {
      wx.clearStorageSync()
    } catch (error) {
      console.log('/storage/clear/sync/error', error)
    }

    return false
  }
}
