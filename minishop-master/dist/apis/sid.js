import Promise from '../modules/es6-promise/index.js'
import store from '../store/index'
import { updateSid } from '../store/actions/index.js'
import { login } from './wx'

import config from '../config/index.js'
const sidKey = config.storageKeys.sid
const appid = config.appid

let sid = null
let requesting = false
let resolves = []
let rejects = []
// 获取sid
export function getSid () {
  return new Promise((resolve, reject) => {
    if (sid) {
      return resolve(sid)
    }

    // let _sid = wx.getStorageSync(sidKey)
    // if (_sid) {
    //   sid = _sid
    //   store存储
    //   store.dispatch(updateSid(sid))
    //   return resolve(sid)
    // }

    resolves.push(resolve)
    rejects.push(reject)
    if (requesting) return
    requesting = true

    const _resolve = sid => {
      while (resolves.length) {
        resolves.shift()(sid)
      }
      rejects = []
      requesting = false
    }

    const _reject = e => {
      while (rejects.length) {
        rejects.shift()(e)
      }
      resolves = []
      requesting = false
    }

    login().then((code) => get3rdSessionId(code))
      .then((_sid) => {
        sid = _sid
        wx.setStorage({
          key: sidKey,
          data: sid
        })
        // store存储
        store.dispatch(updateSid(sid))
        _resolve(sid)
      })
      .catch(_reject)
  })
}

// 清除sid
export function clearSid () {
  sid = null
  return new Promise((resolve, reject) => {
    wx.removeStorage({
      key: sidKey,
      success: resolve,
      fail: reject
    })
  })
}

// 检查session是否过期，没有返回值
export function checkSession () {
  wx.checkSession({
    fail () {
      clearSid()
    }
  })
}

// 获取第三方sid
export const get3rdSessionId = (code) => new Promise((resolve, reject) => {
  wx.request({
    url: config.urls.get3rdSessionId,
    data: {
      code: code,
      appid
    },
    success: function ({ statusCode, data }) {
      if (statusCode === 200 && data.success) {
        resolve(data.data)
      } else {
        reject(new Error('获取sid失败'))
      }
    },
    fail: reject
  })
})
