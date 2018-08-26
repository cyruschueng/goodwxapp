import Promise from 'es6-promise'
import { noop } from 'utils'
import { getSid } from './sid'
import config from 'config'
import { Observable } from 'rxjs'

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
