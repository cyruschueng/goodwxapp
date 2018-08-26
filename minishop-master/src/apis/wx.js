import Promise from 'es6-promise'
import { assign } from 'utils'

export const promisify = (api) => {
  return (options, ...params) => {
    return new Promise((resolve, reject) => {
      api(assign({}, options, { success: resolve, fail: reject }), ...params)
    })
  }
}

export const login = () => new Promise((resolve, reject) => {
  wx.login({
    success ({ code, errMsg }) {
      if (code) {
        resolve(code)
      } else {
        reject(new Error(errMsg))
      }
    },
    fail: reject
  })
})

export const getUserInfo = promisify(wx.getUserInfo)

export const getUserInfoByLogin = () => login().then(() => getUserInfo({ withCredentials: true }))

export const getShareInfo = promisify(wx.getShareInfo)

export const findShareInfo = shareTickets => Promise.all(shareTickets.map(ticket => getShareInfo({ shareTicket: ticket })))
