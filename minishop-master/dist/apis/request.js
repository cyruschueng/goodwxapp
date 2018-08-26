import Promise from '../modules/es6-promise/index.js'
import { noop } from '../utils/index.js'
import { getSid } from './sid'
import config from '../config/index.js'
import { Observable } from '../modules/rxjs/index.js'

const appid = config.appid

export function request (options) {
  let {
    fail = noop,
    success = noop,
    data = {}
  } = options

  return new Promise((resolve, reject) => {
    getSid().then((sid) => {
      data.sid = sid
      data.appid = appid

      options.success = (res) => {
        success(res.data)
        resolve(res.data)
      }

      options.fail = (err) => {
        fail(err)
        reject(err)
      }

      options.data = data
      wx.request(options)
    }).catch((err) => {
      fail(err)
      reject(err)
    })
  })
}

export const requestRetry = (options, number = 1) =>
  Observable.of(options)
    .switchMap(request)
    .retry(number)
    .toPromise()

export default request
